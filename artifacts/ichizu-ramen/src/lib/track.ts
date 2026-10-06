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
