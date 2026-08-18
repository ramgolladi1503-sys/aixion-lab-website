# AIXION LAB — Immersive Experience Authority

Status: **LOCKED FOR IMPLEMENTATION**

Date: 2026-08-19

This document freezes the current public-website experience direction approved by the user.

It **supersedes the old dark/black website palette and old hero-layout requirements** in `docs/BRAND_AUTHORITY.md`.

It does **not** supersede any immutable brand-asset rule. The official logo, company name, and tagline remain governed by `docs/BRAND_AUTHORITY.md`.

## 1. Locked identity

Brand: **AIXION LAB**

Tagline: **END IS THE NEW BEGINNING**

Official visual asset:

`/public/brand/aixion-lab-primary.png`

The asset must not be regenerated, recolored, traced, vectorized, geometrically modified, or substituted.

## 2. Locked visual world

The website is no longer a dark dashboard, black AI landing page, or aged beige editorial site.

The approved experience is a **bright, calm, immersive warm-ivory world** with:

- luminous warm ivory rather than grey, brown, sepia, or antique beige
- cloud-white highlights with enough contrast to preserve form
- pale aqua / sea-glass surfaces as the main secondary visual material
- restrained champagne-gold structural lines and small details
- dark graphite/navy typography
- floating architectural islands with meaningful spatial hierarchy
- translucent aqua information planes
- visible atmospheric depth, cloud banks, water/glass reflections, and fine architecture
- precise editorial typography
- generous but intentional negative space
- richer informational density after the opening hero
- a sense of peace, clarity, freshness, and engineered control

### Exposure / palette rule

The visual references approved by the user are intentionally **brighter and fresher** than the first implemented Three.js pass.

Do not deliberately darken the ivory background to make it look “premium.”
Do not shift the palette toward tan, brown, sepia, parchment, or vintage beige.
Do not wash the scene into pure white either.

The correct target is a luminous ivory atmosphere with pale aqua depth and fine gold structure.

The approved visual should feel sophisticated and immersive without becoming fantasy art, a game UI, a crypto dashboard, or generic SaaS glassmorphism.

## 3. Experience thesis

The website should feel like **one environment that changes state**, not a stack of unrelated sections.

Core journey:

`OVERVIEW -> SYSTEMS -> EVIDENCE -> PRINCIPLES -> FOUNDER -> CONTACT`

The visual world remains coherent while camera position, architecture, information planes, text, and section emphasis evolve.

The first viewport can be selective. The pages/chapters that follow must contain enough real context to match the information richness of the approved references without inventing claims.

## 4. Home experience

Primary headline:

**Intelligence in Control.**

Safe supporting language:

**AIXION LAB builds systems for controlled execution, runtime reliability, and evidence-backed software operations — designed for the point where AI-assisted work begins to affect real systems.**

The home scene should contain one coherent procedural 3D world, not fake dashboards or telemetry.

### Visual composition

The approved hero composition contains:

- editorial headline and concise context on the left
- the large immersive world as the primary visual protagonist
- architectural islands arranged around a pale-aqua central intelligence plane
- mountain / dome / spire details to give the world scale and identity
- translucent information planes that reinforce the system story
- a restrained chapter rail / scroll cue
- no fake operational status required to make the scene feel alive

### Scroll motion

The visitor uses native vertical scrolling.

The world responds with:

- subtle camera travel
- small parallax from pointer movement
- slow island breathing/floating motion
- restrained ring/line motion
- soft glass-plane movement
- progressive reveal of the Systems gateway
- continuity into richer Systems / Evidence / Principles / Founder / Contact chapters

The motion must remain calm and weighted.

No scroll hijacking.
No forced snap.
No horizontal wheel capture.
No bouncing.
No fake loading sequence.
No animation may overlap or obscure important copy.

## 5. Information density and progressive disclosure

The opening hero remains concise, but the complete experience must not become visually empty or context-starved.

Required public story areas:

- AIXION LAB thesis / why
- Aixion Control Tower with evidence-bounded current capability context
- TradeBot Reliability Lab as applied systems research
- Research Directions as early research
- engineering evidence cases with explicit problem / response / validation / boundary
- engineering principles
- Ram Golladi founder journey using only factual, supportable information
- contact methods that are actually configured / approved

Detailed information may expand on demand, but every page should have enough context to answer what the work is, why it exists, what exists now, and what is not yet proven.

## 6. Sound

Ambient sound is optional.

Default state: **muted**.

The visitor may enable it through an always-visible sound/mute control.

The implementation uses a locally generated Web Audio soundscape rather than an unlicensed music file.

Sound rules:

- clearly audible after the visitor explicitly enables it, while remaining gentle
- atmospheric and harmonic, not foreground soundtrack music
- no repeated UI click sounds everywhere
- immediate mute/unmute
- no autoplay requirement
- no sound required to understand the site
- browser AudioContext suspension/resume must be handled correctly

`SOUND_CONTROL_VISIBLE=true`
`SOUND_DEFAULT_MUTED=true`
`SOUND_REQUIRES_USER_GESTURE=true`

## 7. Motion / rendering / performance contract

Motion must not overlap important copy or cause layout instability.

Required:

- native scroll remains authoritative
- main 3D scene pauses when offscreen/hidden
- adaptive device pixel ratio
- simplified mobile camera/world
- `prefers-reduced-motion` fallback
- no mandatory animation for comprehension
- no fake telemetry
- no fake live system status
- no invented operational metrics
- stable padding and safe text/world separation across target viewports
- WebGL material/exposure choices must preserve the bright approved reference character

The procedural scene is an implementation, not permission to drift from the reference art direction. If its geometry/materials make the result look crude, sparse, grey, muddy, or generic, refine the scene rather than weakening the visual target.

## 8. Footer

Primary navigation already exists in the persistent header.

The footer must **not repeat the full top navigation**.

Footer should remain minimal:

- AIXION LAB identity / tagline
- GitHub
- copyright
- compact financial-systems research disclaimer

No second site map is required.

## 9. Product/publication truth

The visual world is metaphorical presentation only.

It must never be interpreted as live product telemetry or operational proof.

Aixion Control Tower remains a flagship build / active development system according to current repository evidence.

TradeBot Reliability Lab remains applied systems research.

Research Directions remain early research.

No profitability, structural trading edge, customer automated trading, enterprise deployment, certification, security guarantee, customer count, deployment count, benchmark, or fake audit claim may be created for visual drama.

## 10. Public architecture

Primary routes:

- `/` (home experience)
- `#/why`
- `#/systems`
- `#/evidence`
- `#/principles`
- `#/founder`
- `#/contact`

The home experience may also preview the six chapters so the visitor understands the complete world before choosing deeper routes.

Technical depth belongs behind route navigation and progressive disclosure.

## 11. Typography

Primary UI/body: restrained modern sans.

Editorial headlines: elegant high-contrast serif.

Monospace is not a primary brand font and should only appear when real technical identifiers require it.

Main copy should use natural capitalization.

Tiny labels may use uppercase with restrained tracking.

## 12. Design-reference authority

Approved visual references should be stored under:

`docs/design-references/`

They define:

- palette / exposure
- composition
- spacing
- material language
- atmospheric depth
- information density
- section rhythm
- overall experiential ambition

They do **not** define factual website copy. Generated names, metrics, emails, operational statuses, customer-style statements, or fictional product claims visible inside concept art are non-authoritative and must not be copied into the public site.

## 13. Do not regress to

- dull brown / antique beige / sepia palette
- black hacker UI
- concentric HUD-first visual language
- generic AI orb
- neon blue/cyan network theme
- purple gradients
- fake dashboards
- terminal simulations
- dense generic SaaS card grids
- giant walls of copy
- heavy glass on every component
- excessive parallax
- particles for decoration alone
- motion that blocks input or navigation
- empty pages with too little explanatory context
- duplicated header navigation in the footer

## 14. Implementation authority

Current implementation branch:

`website/immersive-ivory-v1`

Current focus:

**bright reference alignment + richer home chapters + refined Three.js world + working optional sound + responsive/padding repair**.

Do not declare the entire website production-ready until rendered motion, responsive behavior, performance, truth claims, accessibility, links, domain/email, and deployment are independently reviewed.

`IMMERSIVE_IVORY_THEME_LOCKED=true`
`BRIGHT_IVORY_REFERENCE_LOCKED=true`
`BRAND_RECREATION_AUTHORITY=false`
`BRAND_ASSET_SUBSTITUTION_AUTHORITY=false`
`LOGO_GEOMETRY_CHANGE_AUTHORITY=false`
`SOUND_DEFAULT_MUTED=true`
`SCROLL_HIJACKING_AUTHORITY=false`
`FAKE_TELEMETRY_AUTHORITY=false`
`FOOTER_DUPLICATE_NAV_AUTHORITY=false`
