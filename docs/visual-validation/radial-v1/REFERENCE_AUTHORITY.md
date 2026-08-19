# AIXION LAB — Radial V1 Visual Reference Authority

**Status:** ACTIVE FOR `website/radial-immersive-v1`  
**Baseline source head:** `ae02867a87f4ebc87a32caf2b4ccc6de8587e062`  
**Purpose:** stop visual drift and make render/review/fix work evidence-driven.

## 1. Primary composition reference

File:

`docs/design-references/radial-primary-composition.jpg`

SHA-256:

`05171e91f45883edeea506a62b590ccae56e5728419e0eff6fa256236d97d576`

Dimensions:

`640 × 360`

This image governs the **landing-page composition and visual weight**, specifically:

- dark near-black environment;
- large AIXION LAB brand authority at top-left;
- dominant central Aixion emblem;
- eight clearly legible orbital destinations;
- strong circular hierarchy rather than ordinary circles joined by thin lines;
- depth through nested rings, local glow, active spokes, signal points, haze, and restrained particulate energy;
- clear foreground/background hierarchy;
- asymmetric but balanced viewport composition;
- a selected destination that feels materially connected to the core.

It does **not** govern factual content. Ignore the generated reference's generic labels, fake status text, generic business copy, services/products language, or any other invented claim.

The governed Aixion destinations remain:

1. About
2. Journey
3. Projects
4. Research
5. Evidence
6. Control Tower
7. Stack
8. Contact

Center: **AIXION CORE**.

## 2. Secondary motion / atmosphere reference

File:

`docs/design-references/particle-love-motion-reference.jpg`

SHA-256:

`33436dbda52f1e8d837579acd75e6663b9ca025bb01e73e0ceecb3042030f48a`

Dimensions:

`420 × 300`

This reference governs **atmospheric behavior only**:

- volumetric depth;
- field-like particle motion;
- pointer-reactive flow;
- the feeling that the visitor is inside a living environment;
- organic but controlled motion rather than a tiled starfield.

It does **not** govern page layout, typography, navigation structure, copy, or branding.

## 3. Current palette authority

The current radial branch and primary selected reference use the black + red Aixion direction. Treat any older instruction that says `black/green` as stale for this branch unless the owner explicitly changes the palette again.

Do not silently recolor the site during bug-fixing or visual-convergence work.

## 4. Locked experience rules

These rules are not optional redesign suggestions:

- Home is the full radial system; do not reintroduce a large left-side essay as the primary hero.
- The radial system appears as the dominant landing identity.
- The authoritative Aixion emblem is used in the core.
- Eight outer destinations remain present and readable.
- Outer orbital geometry may move, but labels/icons remain upright.
- Internal pages must not retain the full home wheel.
- Internal pages should read as spatial editorial worlds, not one giant bordered panel.
- GitHub remains persistently accessible.
- TradeBot remains public-safe: architecture/evidence may be shown; private code, credentials, signal thresholds, active write controls, and proprietary strategy logic may not.
- No fake live telemetry, fake customers, fake profitability, fake uptime, or unsupported certification claims.
- Reduced-motion and keyboard paths remain required.

## 5. What the automated harness proves

The Playwright harness captures deterministic-ish visual evidence and verifies key interaction contracts. It can prove that routes render, governed controls exist, responsive overflow is bounded, keyboard paths work, and screenshot evidence was produced.

It **cannot** prove beauty by itself. Concept-art comparison remains a model/human visual judgment. Do not turn a rough pixel-diff against concept art into a false quality metric.

## 6. Visual convergence order

Always repair in this order:

1. **Geometry** — composition, scale, spacing, clipping, overflow, hierarchy.
2. **Experience** — hover, route choreography, orbital behavior, background response.
3. **Polish** — typography, micro-alignment, glow restraint, easing, subtle depth, mobile refinement.

Do not add polish while a P0/P1 geometry or navigation defect remains.
