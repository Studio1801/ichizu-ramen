declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', event, params);
    } catch {
      // Analytics must not interrupt the interaction being tracked.
    }
  }
}

type LinkEvent = 'directions_click' | 'reviews_click' | 'instagram_click';

// Called by one React click handler per link, never by a global listener.
export function trackLink(event: LinkEvent, link: HTMLAnchorElement) {
  track(event, {
    link_url: link.href,
    link_text: (link.innerText || link.textContent || '').replace(/\s+/g, ' ').trim(),
    page_location: window.location.href,
  });
}
