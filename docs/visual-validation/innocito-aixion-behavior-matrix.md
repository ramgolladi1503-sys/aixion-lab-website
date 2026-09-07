# Innocito / Aixion behavior matrix

Audit date: 2026-09-06

Reference: [Innocito](https://innocito.com/)

## Comparison

| Behavior | Innocito observed | Aixion implementation | Status |
|---|---|---|---|
| Initial load | Dark shell, compact header, hero content and visual state; content continues through multiple sections | Dark shell, sticky header, hero content/visual and continuous long-form sections | Matched at interaction level |
| Hover | CTA/card/link emphasis and subtle motion | CTA lift, card surface/border changes, link motion, menu-link movement | Matched in principle |
| Keyboard focus | Navigation and carousel controls are exposed as interactive controls | Header links, carousel controls, indicators, CTA, menu, drawer, and scroll-top are keyboard-addressable | Matched and tested |
| Text selection | Native page selection remains available | Native selection retained with explicit cyan selection token | Matched and tested |
| Scroll position | Long continuous page; sticky/mobile shell and scroll-to-top control | Long continuous page; reveal-on-entry, scroll progress, scroll-to-top | Matched in principle and tested |
| Reload | Same route reloads with the shell and route content restored | Same route reloads with route shell, route motion and reveal initialization restored | Matched and tested |
| Back/forward | Browser history returns to the previous route state | Client navigation, back, forward, and reload verified | Matched and tested |
| Mobile menu | Compact menu control opens the mobile navigation surface | Compact details menu opens animated full-width mobile navigation | Matched in principle and tested |
| Hero carousel | Hero has stateful cards, navigation controls, and slide content | Hero has Previous/Next, indicators, stateful copy/visual, hover/focus pause, autoplay | Matched in principle and tested |
| Additional carousels | Innocito also uses carousels for partner/result/testimonial/content groups | Aixion uses its own evidence lists and system panels rather than unrelated testimonial/logo carousels | Deliberately adapted to content |
| Reduced motion | Reference behavior is publicly observable only at the browser level; exact source policy is unavailable | All reveal, route, carousel and transition motion is disabled/settled under `prefers-reduced-motion` | Verified locally |
| Cross-page continuity | Shared brand shell/footer and route-level content continuity | Shared header/footer, route transition wrapper, and route-aware reveal reinitialization | Fixed and verified |

## Per-route coverage

The current Aixion route inventory was exercised at desktop and mobile widths:

- `/`
- `/systems`
- `/systems/tradebot`
- `/systems/control-core`
- `/systems/automation`
- `/systems/analytics`
- `/research`
- all four `/research/[slug]` pages
- `/pulse`
- `/journey`
- `/about`
- `/resume`
- a deliberate unknown route for the 404 experience

The full Playwright matrix completed with 87 passing tests and 3 intentional desktop-only skips. The separate ten-pass route runner completed 320 page captures with no overflow, reveal-settlement, carousel-state, or mobile-menu failures.

## Fidelity boundary

This is a behavioral mirror of the publicly observable interaction model, not a claim of pixel/source identity. Innocito’s private implementation, exact easing curves, hidden routes, CMS states, analytics-driven conditions, and source-level transition timelines cannot be recovered from the public black-box site. Aixion keeps its own content, evidence model, and system-specific information architecture while matching the reference’s dark continuous canvas, stateful navigation, restrained motion, and long-form interaction rhythm.
