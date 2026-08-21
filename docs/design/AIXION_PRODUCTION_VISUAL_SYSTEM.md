# AIXION LAB — PRODUCTION VISUAL SYSTEM

**Authoritative Design & Layout Architecture Specification**

---

## 1. CORE VISUAL PHILOSOPHY

Aixion Lab communicates **serious engineering, applied AI, quality engineering, market intelligence, research rigor, observability, evidence, and systems thinking**.

The visual language is restrained, technical, precise, and editorial.

### Rejecting Anti-Patterns
- **NO** giant 100px+ hero text placed over empty space to create fake drama.
- **NO** floating cards on soft multi-colored gradients.
- **NO** solar-system planetary orbits of empty glowing circles.
- **NO** repeating single diagram components across unrelated pages with re-labeled nodes.
- **NO** decorative text collisions, unreadable small body fonts next to massive headlines, or asymmetric gaps caused by bad alignment.

---

## 2. RESPONSIVE GRID & ALIGNMENT ARCHITECTURE

### Desktop (1440px / 1728px / 1920px)
- **Grid Systems**: 12-column responsive fluid grid with fixed maximum container width (`--content: 1480px`).
- **Outer Gutters**: `--gutter: clamp(24px, 4vw, 68px)`.
- **Vertical Rhythm**: Section padding `--section-pv: clamp(64px, 8vh, 120px)`.
- **Text Anchor**: Primary text content anchors to explicit grid columns (Columns 1–7 or Columns 5–12). No single headline or paragraph is permitted to float past column boundaries without intentional balance.

### Mobile & Tablet (390px / 430px / 768px)
- **Viewport Containment**: 100% horizontal scroll containment (`scrollWidth <= innerWidth`).
- **Touch Boundaries**: Minimum touch hit-target size 44x44px.
- **Node Hub Scale**: Mobile radial hub constrained to max `340px x 340px` with clear, unclipped touch nodes and labels.

---

## 3. EDITORIAL TYPOGRAPHY SYSTEM

Typography uses a tight contrast ratio based on editorial hierarchy, avoiding giant display text.

```css
:root {
  --display: "Bricolage Grotesque", "Avenir Next", system-ui, sans-serif;
  --body: "DM Sans", Inter, system-ui, sans-serif;
  --mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
}
```

| Type Role | Font Family | Size Range | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Heading** | Display | `clamp(42px, 5.2vw, 76px)` | 560 | `1.02` | `-0.05em` |
| **Section Heading** | Display | `clamp(28px, 3.4vw, 52px)` | 540 | `1.08` | `-0.04em` |
| **Body Copy** | Body | `clamp(15px, 1.2vw, 18px)` | 400 | `1.72` | `-0.01em` |
| **Eyebrow / Kicker** | Mono | `11px - 13px` | 500 | `1.25` | `+0.12em` |
| **System Metadata** | Mono | `9px - 11px` | 400 | `1.40` | `+0.16em` |

---

## 4. BRAND COLOR & CONTRAST AUTHORITY

- **Background**: Deep technical dark `#020305` (with subtle `#07090d` soft panels).
- **Aixion Red**: Signal accent `#ff3946` / `#ff5460`.
- **Foreground Text**: Primary `#f5f7fa`, Secondary Muted `rgba(233, 238, 244, 0.68)`, Meta Quiet `rgba(233, 238, 244, 0.38)`.
- **Structural Lines**: Subtle borders `rgba(239, 244, 250, 0.12)`, Active bounds `rgba(255, 57, 70, 0.45)`.

---

## 5. PAGE-SPECIFIC VISUAL MECHANISMS

Each major route features a custom, purpose-built visual interactive system:

1. **Home**: Aixion Signal Universe — 8 dynamic evidence/signal trajectories originating from the central Aixion Core emblem with interactive node focus states, radial rotor, and computational field overlay.
2. **About**: Multi-Discipline Convergence Matrix — Interactive visual artifact representing how software quality, automation, AI, and observability converge.
3. **Journey**: Timeline & Milestone Evolution System — Stepwise progression visual showing system maturation from initial testing to governed AIXION architecture.
4. **Projects**: System Architecture Portfolio & Flagship Gateway — Technical card grid with deep link to TradeBot case study.
5. **TradeBot**: Flagship 5-Stage Governed Pipeline — Sticky visual progression (`INGEST` → `RESEARCH` → `GOVERN` → `OBSERVE` → `PROVE`) demonstrating public research boundaries vs. private execution logic.
6. **Research**: Outcome-Blind Experimentation Matrix — Visual representation of causal cutoffs, holdouts, and retained negative controls.
7. **Evidence**: Proof & Provenance Network — Artifact provenance grid displaying exact commit authority, rerun manifests, and fail-closed gates.
8. **Control Tower**: Operational Observability Surface — Public-safe system health, authority states, and runtime process topology.
9. **Stack**: Grouped Tooling & Infrastructure Architecture — Purpose-based layered cards (Quality, Research & Runtime, Workflow & Product).
10. **Contact**: Quiet Editorial Gateway — Compact, direct email contact surface with GitHub proof link and crisp CTAs.
11. **Deep Space (Core)**: 3D Warp Field & Kinetic Sequence — Continuous depth-based typography sequence (`END IS THE NEW BEGINNING`).

---

## 6. MOTION & PERFORMANCE GOVERNANCE

- **Route Transitions**: Fast, directional portal sweep (180ms–350ms in normal motion; 120ms fade in reduced motion).
- **Scroll Animations**: GPU-accelerated `transform` and `opacity` properties using GSAP ScrollTrigger. Zero text collisions.
- **Idle Motion**: Low-overhead compositor loops.
- **Frame Pacing Contract**: P95 frame gap `< 50ms` and max frame gap `< 150ms`.
- **Reduced Motion**: Full support respecting `prefers-reduced-motion: reduce`.
