# Aixion Lab — Observable System Visual Concept

Status: SUPERSEDED AS SITE-WIDE VISUAL AUTHORITY — RETAINED AS INTERACTION CONCEPT

## Authority resolution

This document no longer overrides the locked light visual authority in:

- `docs/website/VISUAL_DESIGN_AUTHORITY.md`
- `docs/website/AIXION_VISUAL_VISION_V2.md`

The approved site-wide direction remains the light soft-neutral / mineral editorial systems family. The observable-state idea remains useful only as a public-safe interaction and visualization concept that must be translated into that light authority.

## Core concept retained

The website may use explanatory system fields derived from public-safe state rather than decorative background art.

Primary thesis:

> Systems should be able to explain their state, their evidence and their limits.

## Visual grammar under the light authority

- Soft sage-greige / mineral canvas and pale semantic surfaces.
- Editorial serif thesis typography paired with readable sans/mono system labels.
- State-history or lifecycle bands may represent public-safe maturity, evidence and research traces.
- State colors are semantic, not decorative:
  - validating: sage
  - building: blue/teal or lavender
  - research/exploring: muted blue/lavender
  - analytics/building: warm mineral accents where appropriate
  - rejected research: muted red only when explicitly representing a research result
- Thin evidence lines, nodes and traces may animate slowly only when motion is allowed.
- Rejected work remains visible as research evidence rather than disappearing.
- No fake telemetry, fake completion percentages, fabricated evidence counts, invented performance metrics or private strategy details.

## Behavioral rule

The field may react to public site state, but it must never become authority for navigation, evidence, lifecycle state or execution. Content and structured data remain authoritative.

If JavaScript, animation or the visual field fails, the page must remain readable and usable.

## Truth-boundary rule

Observable graphics must distinguish between:

- current curated public state,
- conceptual system/state models,
- research-result states,
- and genuine live runtime telemetry.

Labels such as `LIVE`, `CONNECTED`, `CURRENT`, `VERIFIED`, `ACTIVE` or similar runtime-looking states must not be presented as current truth unless backed by an authoritative live source. Conceptual examples must be labelled as models or demos.

## Locked content boundaries

The observable concept must not disturb:

- current page architecture and routes
- Lab / Career modes
- Search behavior
- Evidence Drawer semantics
- TradeBot and Control Core maturity and authority boundaries
- public/private evidence boundaries
- Pulse/worklog source-of-truth content
- recruiter handoff and printable career snapshot
- mobile navigation behavior
- reduced-motion support
- accessibility and static-export requirements

## Implementation strategy

Phase 1: keep the observable-state idea only where it improves explanation and translate it into the light mineral system.

Phase 2: system detail pages receive system-specific state/architecture grammars only after homepage regression and visual review pass.

Phase 3: Research and Pulse may use richer state-history/rejected-path visualizations when they are bound to real public-safe data.

## Acceptance gates before production deployment

1. TypeScript passes.
2. Next production build passes.
3. Static export passes.
4. All production routes load without browser errors.
5. Existing search, navigation, Evidence Drawer, Career mode and mobile regressions remain green.
6. Observable graphics contain no invented runtime states, metrics or private evidence.
7. Mobile has no horizontal overflow and preserves content priority.
8. Reduced-motion removes continuous field animation.
9. Axe accessibility scan passes.
10. Desktop/mobile visual artifacts are reviewed before Netlify deployment.

No Netlify deployment is authorized by this document alone. Production deployment requires a fully green release candidate and explicit release action.
