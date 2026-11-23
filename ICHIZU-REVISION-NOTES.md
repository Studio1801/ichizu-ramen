# Ichizu prelaunch revisions

Base: Studio1801/ichizu-ramen, eb1cbc87839ca1f6eb3e697df496eb6b988cd027.
Prepared locally on November 23, 2026. Not pushed, merged, or deployed.

## Changes

- Added Mike's supplied story across the existing Story and Craftsmanship sections, retaining his first-person voice.
- Added his supplied menu introduction before the existing menu categories.
- Removed the unsupported placeholder biography and policy-led introduction. Removed the same unconfirmed policy claims from search/social descriptions and Restaurant schema description.
- Changed both Reserve buttons to Visit Us and removed reservation-style click tracking.
- Added link_url, link_text, and page_location to tracked Maps, Instagram, and review actions. Both website Maps links use directions_click. Each link has one React handler, with no global click listeners.
- Preserved one Ichizu GA4 loader and config. Excluded local preview hostnames while retaining the existing embedded-preview exclusion.
- Added preview noindex metadata and Vercel response headers. Removed premature canonical, social-image domain URLs, schema domain URLs, and sitemap. Retained the social-image asset.
- Added reduced-motion behavior, visible keyboard focus, keyboard-operable logo navigation, Escape-to-close mobile navigation, and mobile background scroll locking.
- Preserved section order, typography, photography, menu content, prices, hours, phone, and existing destinations. Hour punctuation now uses ordinary hyphens.

## Verification

- Restaurant frontend TypeScript check: passed.
- Restaurant frontend production build: passed.
- Automated prelaunch checks: six passed, zero failed.
- Responsive iframe viewport checks at outer widths 320, 390, 768, 1024, and 1440 pixels: no horizontal document overflow. Browser scrollbars reduce the content viewport by 15 pixels in this test environment.
- Visual inspection: phone Story and Menu content, desktop hero. Mobile navigation opens, Escape closes it, and Visit Us positions the Visit section below the fixed header.
- Local/framed previews contained no Google tag loader. This is not proof of event receipt in the authenticated GA4 property.
- Menu source SHA-256 matches the uploaded base exactly: 221f898b535c1f40b04e9e5de53c2d174c3546817941b195bc48eb7e3c6c6d4c.

## Remaining

Follow ICHIZU-LAUNCH.md for production activation. Account settings, current menu accuracy, current GBP business data, real GA4 receipt, domain access, backups, and monitoring remain outside this local verification.

No Terms page was invented because business policies and legal terms have not been supplied. Review whether one is needed for the final site's actual functions. The existing privacy page remains unchanged.
