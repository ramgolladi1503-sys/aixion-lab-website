# AIXION LAB — Production Convergence V4

## Status

This branch is the production-convergence iteration of the Aixion Lab immersive website. It remains a draft PR and must not be merged until owner visual review accepts the actual render.

## What V4 changes

V4 stops layering temporary visual patches and converges the experience onto one React + GSAP + CSS design/motion system.

- `frontend/main.jsx` owns routing, Deep Space, pointer behavior, scroll choreography and runtime interaction.
- `frontend/styles.css` is the single visual design-system authority.
- Temporary `emblem.css`, `visual-convergence.css` and `runtime-contracts.js` layers are removed.
- Entry/Core use a source-derived emblem crop from the authoritative `aixion-lab-brand-lockup.webp`, not reconstructed vector paths.
- Home spokes and orbital nodes share one polar-coordinate geometry and one rotating parent, eliminating independent alignment drift.
- Route changes use one GSAP portal timeline instead of independent CSS/timeouts.
- Internal pages use a sticky spatial artifact plus scroll-led editorial sections inspired by the interaction principles discussed from Feed, Unseen and Dropify without copying their brand or layouts.
- TradeBot is a five-stage engineering narrative: INGEST → RESEARCH → GOVERN → OBSERVE → PROVE.
- Deep Space is an endless forward warp with sequential depth travel: END → IS → THE → NEW → BEGINNING.
- Contact uses a real mail surface instead of a placeholder form.

## Typography lock

- Display: Bricolage Grotesque
- Body: DM Sans
- Technical metadata: IBM Plex Mono

The type scale is bounded so internal pages remain readable and recruiter-facing rather than becoming oversized art direction.

## Public/private boundary

TradeBot may expose architecture, engineering methodology, failure modes, validation strategy, sanitized operational evidence and lessons. It must not expose credentials, private endpoints, proprietary signal logic, private thresholds, write controls, sensitive datasets or private code.

## Production gates

The branch is not production-ready merely because Vite compiles. Required gates now include:

- production `vite build`
- production `vite preview` browser tests
- Chromium normal-motion interaction coverage
- Chromium reduced-motion coverage
- WebKit interaction coverage
- normal-motion route choreography checks
- Deep Space motion checks
- responsive overflow checks
- browser back / Home return checks
- five-stage TradeBot scroll-state checks
- real Contact surface validation
- normal-motion visual evidence capture

## Visual acceptance still required

Automated gates cannot certify art direction. Owner render review must still accept:

1. source-derived emblem crop and header lockup fidelity,
2. exact wheel/spoke alignment during rotation,
3. route portal speed and continuity,
4. background energy and readability,
5. typography hierarchy and text density,
6. TradeBot pinned-story pacing,
7. Deep Space word depth timing,
8. tablet/mobile composition.

Do not merge until those visual acceptance points are reviewed from the current exact branch head.
