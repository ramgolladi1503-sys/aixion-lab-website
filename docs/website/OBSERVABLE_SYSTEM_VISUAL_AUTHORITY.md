# Aixion Lab — Observable System Visual Authority

Status: LOCKED

## Core direction

The selected visual authority is the dark Observable Temporal State Field concept approved for Aixion Lab.

The website is not decorated with an abstract background. The background is an explanatory system layer derived from public-safe state.

Primary thesis:

> Systems should be able to explain their state, their evidence and their limits.

## Visual grammar

- Deep mineral / near-black canvas, never generic glossy SaaS black.
- Editorial serif thesis typography paired with compact sans/mono system labels.
- Temporal bands representing system state across past, present and next work.
- State colors are semantic, not decorative:
  - validating: lime/sage
  - building: blue/teal
  - research/exploring: violet
  - analytics/building: amber
  - rejected/failed research: muted red
- Thin evidence lines, nodes and traces may animate slowly only when motion is allowed.
- Rejected work remains visible as a trace rather than disappearing.
- No fake telemetry, fake completion percentages, fabricated evidence counts, invented performance metrics or private strategy details.

## Behavioral rule

The field may react to public site state, but it must never become authority for navigation, evidence, lifecycle state or execution. Content and structured data remain authoritative.

If JavaScript, animation or the visual field fails, the page must remain readable and usable.

## Locked content boundaries

The new visual system must not disturb:

- current page architecture and routes
- Lab / Career modes
- Search behavior
- Evidence Drawer semantics
- TradeBot and Control Core maturity and authority boundaries
- public/private evidence boundaries
- Pulse/worklog source-of-truth content
- recruiter handoff and printable career snapshot
- footer manifesto treatment
- Control Core first-load centering fix
- mobile navigation behavior
- reduced-motion support
- accessibility and static-export requirements

## Implementation strategy

Phase 1: homepage adopts the full Observable Temporal State Field and dark shell.

Phase 2: system detail pages inherit restrained dark-state surfaces and system-specific field fragments only after homepage regression and visual review pass.

Phase 3: Research and Pulse may use richer state-history/rejected-path visualizations when they can be bound to real public-safe data.

## Acceptance gates before production deployment

1. TypeScript passes.
2. Next production build passes.
3. Static export passes.
4. All production routes load without browser errors.
5. Existing search, navigation, Evidence Drawer, footer and Control Core regressions remain green.
6. New observable field contains no invented metrics or private evidence.
7. Mobile has no horizontal overflow and preserves content priority.
8. Reduced-motion removes continuous field animation.
9. Axe accessibility scan passes.
10. Desktop/mobile visual artifacts are reviewed before Netlify deployment.

No Netlify deployment is authorized by this document alone. Production deployment requires a fully green release candidate and explicit release action.
