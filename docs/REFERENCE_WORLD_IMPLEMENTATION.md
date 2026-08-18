# AIXION LAB — Reference-Authored World Implementation

Status: IMPLEMENTATION PASS 1 — visual architecture takeover

## Objective

Stop trying to reproduce the approved AIXION LAB reference compositions from primitive runtime geometry. The approved references now directly drive the environmental composition through derived, cleaned 2.5D scene plates while factual/product copy stays in live DOM.

## Visual authority

Source references supplied by the user:

- `03_home_world_reference` → Overview
- `04_systems_world_reference` → Systems
- `01_full_site_scroll_reference` → Evidence crop / full-page rhythm
- `06_principles_world_reference` → Principles
- `07_founder_world_reference` → Founder
- `05_contact_horizon_reference` → Contact
- `02_experience_lock_board` → global visual DNA

The source images are visual/composition authority only. Fictional concept-art names, metrics, contact information, maturity statements, and operational status text are not publication authority.

## Runtime strategy

The primary website experience now uses:

1. reference-derived environmental plates under `public/reference-world/`
2. DOM typography and verified public copy
3. glass overlays that cover/repopulate concept panels with evidence-safe AIXION labels
4. small pointer-driven parallax for spatial presence
5. CSS atmospheric foreground/haze layers
6. native vertical scrolling and reduced-motion fallback

The legacy procedural Three.js/GLB work remains in the repository for now, but it is no longer the visual authority in `App.tsx`.

## Expected scene files

- `public/reference-world/overview.webp`
- `public/reference-world/systems.webp`
- `public/reference-world/evidence.webp`
- `public/reference-world/principles.webp`
- `public/reference-world/founder.webp`
- `public/reference-world/contact.webp`

`why` intentionally reuses the Overview world for the first pass.

## Code authority for this pass

- `src/App.tsx`
- `src/reference-world.css`
- `src/reference-world-assets.ts`
- `src/main.tsx`

The developer-only Reference Comparator is no longer mounted in the primary app.

## Truth boundaries preserved

- AIXION LAB brand retained.
- Official logo asset retained.
- Aixion Control Tower remains `FLAGSHIP BUILD`.
- TradeBot Reliability Lab remains `APPLIED RESEARCH`.
- Research Directions remains `EARLY RESEARCH`.
- No fake customers, uptime, profitability, certification, live telemetry, metrics, or email address are authorized.

## Next action

AI Studio should fetch `website/reference-world-takeover-v1`, receive the seven reference PDFs directly from the user, materialize the six WebP scene plates under `public/reference-world/`, render the site at 1440×900, and continue visual comparison. Do not restore primitive procedural geometry as the primary scene system.
