# Pixel-side-by-side verification record

Audit date: 2026-09-07

## Captured comparisons

The redesign was compared against the live public Innocito site at matching desktop and mobile viewports for:

- Home hero and first editorial transition
- About hero and content panel
- Systems Registry hero and registry rows
- TradeBot system detail hero and architecture panel
- Research index and research detail hero
- Contact hero and CTA panel
- Journey, Pulse, Resume, and terminal footer states
- Scroll checkpoints at 0px, 600px, and 1200px where the reference content was reliably loaded

## Runtime matrix

The current Aixion implementation completed:

- 92 Playwright visual, interaction, and accessibility checks passed
- 4 intentional skips
- 10-pass route audit: 16 routes × 2 devices × 10 passes = 320 screenshots
- 0 ten-pass audit failures
- No horizontal overflow across the audited routes
- Carousel autoplay, hover/focus pause, reduced motion, mobile menu, route continuity, and scroll-to-top verified

## Public-reference boundary

The public Innocito implementation contract was also checked from its browser-visible assets:

- 24 assets inspected
- 8 easing values
- 17 keyframes
- 4 IntersectionObservers
- Required public easing/keyframe/autoplay flags present

This proves observable behavior and visual-system alignment. It does not prove identity with Innocito's private source code, CMS state, analytics conditions, server timelines, or hidden transition implementation.

## Known intentional adaptations

Aixion keeps its own evidence-led information architecture and content. Agency-specific Innocito sections such as awards, testimonials, client logos, and service-selling copy are translated into systems, research, pulse, journey, and evidence surfaces rather than copied as unsupported content.
