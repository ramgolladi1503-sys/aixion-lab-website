# Aixion motion and route audit

Date: 2026-09-06

## Scope

The audit covers every current public route, including system detail pages, all research detail pages, the résumé, and the not-found route.

| Dimension | Coverage |
|---|---:|
| Routes | 16 |
| Devices | 2 (1440px desktop, 393px mobile) |
| Repeated passes | 10 |
| Rendered captures | 320 |
| Horizontal-overflow failures | 0 |
| Reveal-settlement failures | 0 |
| Carousel-state failures | 0 |
| Mobile-menu failures | 0 |

## Verified behavior

- Hero carousel changes through explicit Previous, Next, and indicator controls; automatic rotation is intentionally disabled because the previous auto-scrolling cards were distracting.
- Carousel content pauses while focused or hovered and remains static when reduced motion is preferred.
- Section reveals settle as sections enter the viewport; every route was scrolled through before capture.
- Scroll progress and scroll-to-top controls remain available across long routes.
- Mobile navigation opens from the compact menu and exposes all route targets.
- The 404 route returns HTTP 404 and still renders the redesigned dark 404 experience.
- All pages retain the dark graphite canvas, Poppins-based sans hierarchy, mono metadata labels, restrained amber/lavender/cyan gradient actions, and high-contrast supporting text.

## Reference boundary

The public Innocito site was audited as a black-box reference for route topology, hero carousel behavior, navigation, CTA placement, dark palette, typography contrast, and motion principles. Exact source-level timelines, easing curves, hidden CMS routes, authenticated states, and proprietary implementation details are not publicly verifiable. Aixion therefore mirrors the observable interaction model and pacing without claiming source-identical implementation.
