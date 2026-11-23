# Ichizu launch handoff

This working copy is a prelaunch preview. Do not publish it as the final website without completing the domain-dependent steps below.

## Prepared here

- Mike's supplied story and menu introduction replace placeholder claims.
- Visit Us scrolls to the Visit section; no reservation or order is implied.
- Both website Maps links use directions_click with link_url, link_text, and page_location.
- Instagram and review links use the same parameter structure, but are not restaurant conversion events.
- No global click listener or unsupported reservation, ordering, or phone event is installed.
- GA4 remains G-B5BQ9J2SD0, with one loader and one config call. Localhost previews and embedded presentations do not send analytics.
- Preview HTML and Vercel response headers specify noindex, nofollow. robots.txt permits crawling so crawlers can read noindex.
- Premature production canonical, social image URLs, schema URLs, and sitemap have been removed. public/og-image.jpg remains available for launch.

## Complete before launch

1. Verify existing domain configuration inside Vercel. Use Vercel's current required DNS values, not historical values from chat.
2. With GoDaddy delegation, export or record existing DNS. Change only necessary website records and preserve mail, verification, and unrelated records.
3. Connect the confirmed domain and www alternative. Choose one canonical hostname and redirect the other. Verify valid HTTPS on both.
4. Restore the canonical link using the confirmed production hostname. Set route-specific canonical and social URL metadata for home and privacy. Restore absolute og:image and twitter:image URLs, their image dimensions, and summary_large_image.
5. Restore Restaurant schema url and image using the final hostname. Recreate the sitemap for home and privacy, and restore its declaration in robots.txt.
6. Remove noindex from production HTML and X-Robots-Tag response headers. Keep development deployments non-indexable through a separate deployment configuration. Recheck the actual production responses.
7. Verify the existing GA4 property, stream, Enhanced Measurement, and Realtime. Update the stream URL, without creating a duplicate property or tag.
8. Test each supported event once in a clean test session. Confirm one custom event per action and its parameters. Generic Enhanced Measurement click events may also appear; do not count those as conversions.
9. Mark directions_click as a key event only after verifying it. Do not mark navigation, Instagram, review, page_view, scroll, or generic click events as key events. Do not infer completed visits from directions clicks.
10. Verify Search Console for the final domain, submit its sitemap, and inspect indexing and canonical selection.
11. Update the GBP website field only to the live final domain, using ?utm_source=google&utm_medium=organic&utm_campaign=gbp.
12. Update the clean client repository in a separate release. Do not overwrite client history or push the internal monorepo directly. Retain Mike's ownership and document the hosting access/control arrangement.

## Verification still required outside this source copy

- Check current GBP information and the latest client menu source against the existing hours, phone, dishes, and prices. Menu data and hours were deliberately preserved, not certified current.
- No verified working reservation destination is available. A discovered Toast page did not establish working ramen ordering, so no ordering button has been added.
- Review the existing privacy contact before launch. No new contact address or policy promise was invented.
- Domain delegation, GA4 admin settings, Search Console, Vercel account settings, backups, and monitoring cannot be confirmed by a source build alone.
- Official reporting begins with the first full calendar month after final-domain launch. Exclude development traffic.
