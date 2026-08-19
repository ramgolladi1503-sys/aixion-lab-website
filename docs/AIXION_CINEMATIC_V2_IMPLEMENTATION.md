# AIXION LAB — Cinematic Immersive V2

## Locked implementation behavior

This branch implements the cinematic V2 direction for the public Aixion Lab experience.

### Landing
- No left-side hero essay or right-side preview card.
- The radial system is the landing-page hero.
- The authoritative Aixion brand is enlarged in the top-left.
- The center uses the Aixion brand mark cropped from the same authoritative lockup.
- Eight outer destinations orbit clockwise while their readable faces counter-rotate.
- Center orbital rings rotate anti-clockwise at independent speeds.
- Spokes behave as signal paths and react on hover.
- A Canvas computational field flows behind the navigation and reacts to focus.

### Navigation
- Outer-node clicks initiate a portal/tunnel transition rather than a simple card reveal.
- Internal pages remove the full radial wheel completely.
- Internal content is rendered directly into an atmospheric canvas rather than one large paper/card container.
- On Home the header control reads `Home`; on internal pages it morphs to the Aixion emblem and returns cinematically to Home.
- Browser history and direct routes remain supported.

### Aixion Core / Deep Space
- Single center click gives local feedback.
- Double click enters the neural-data space.
- Long press is the touch fallback.
- Enter is the keyboard fallback when the center control is focused.
- Deep Space renders a perspective neural/data field in Canvas.
- Any click or Escape returns to the landing hub.
- `/core` is supported as the Deep Space route.

### Internal worlds
- About: engineering philosophy and `Engineer → Challenge → Prove`.
- Journey: QA → automation → systems/reliability → applied AI → market intelligence → governed engineering → Aixion Lab.
- Projects: TradeBot is the flagship system; supporting programs remain visible.
- Research: hypothesis lanes and negative-result discipline.
- Evidence: validation, governance, reliability, and review.
- Control Tower: explicitly labeled demonstration/public-safe operational context; no fake live claims.
- Stack: tools grouped by engineering purpose rather than a logo wall.
- Contact: recruiter/collaboration positioning plus persistent GitHub access.
- TradeBot: public-safe architecture and engineering case study with explicit proprietary/private boundary.

### Public/private boundary
Never expose broker credentials, API tokens, private endpoints, proprietary signal thresholds, active entry/exit logic, production write controls, sensitive datasets, or private source code.

### Accessibility and performance
- `prefers-reduced-motion` disables continuous orbital/camera-style motion and simplifies portal effects.
- GitHub has an accessible label.
- Deep Space supports Escape/Enter and touch long-press.
- Canvas DPR is capped.
- No heavy 3D dependency was introduced for V2; the experience uses React, CSS/SVG/DOM behavior, and Canvas 2D.

## Render gate

Do not merge based only on CI. Render and visually inspect:

1. first entry
2. Home idle orbit
3. hover on Projects / Research / Evidence
4. Home → Projects portal
5. Projects → TradeBot
6. internal header emblem → Home reconstruction
7. center double-click → Deep Space → click/Escape Home
8. 1440×900, 1024×768, 768×1024, and 390×844
9. reduced motion
10. keyboard navigation

If the brand-mark crop does not isolate the authoritative emblem correctly in the center/header morph, fix the crop or add a dedicated emblem asset before considering V2 visually complete.
