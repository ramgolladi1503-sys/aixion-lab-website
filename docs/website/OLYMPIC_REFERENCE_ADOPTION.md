# Aixion Lab — Olympic Reference Adoption

**Status:** USER-APPROVED VISUAL DIRECTION
**Date:** 2026-10-12
**Reference:** [Olympic Subsea](https://www.olympic.no/)
**Scope:** Visual language, editorial rhythm and motion only

## Direction

Use Olympic Subsea's current website as a reference for a cinematic, image-led company story: a full-bleed opening, short chapter navigation, confident editorial headlines, alternating photographic stories, selected work and a clear closing contact invitation. Apply that rhythm to Aixion Lab's real systems and engineering narrative.

The homepage opens with four manually selected chapters: Systems, Research, Automation and Analytics. TradeBot is the lead system within the Systems chapter. Every interior route uses the same high-quality image hero, editorial typography, concise metadata and alternating story sections, while keeping page content specific to its subject.

## Aixion visual treatment

- Full-bleed photography with restrained dark overlays for hero readability.
- A recurring combination of deep ink blue, paper ivory, cool gray and muted teal.
- Large editorial serif headlines, clear sans-serif body copy and monospace labels only for states and evidence.
- Alternating image and copy compositions, generous spacing and a compact shared navigation/footer.
- Newly created Aixion editorial imagery; do not reuse legacy Aixion website imagery or Olympic assets, marks, text or maritime content.

## Motion

- Chapter changes crossfade and settle the new image/copy in response to explicit user input.
- Section and image reveals happen once as they enter view; image scale and hover changes stay restrained.
- Do not autoplay chapters, hijack scrolling, add sound or use decorative WebGL/particle effects.
- Respect `prefers-reduced-motion`; content stays visible without animation.

## Content and evidence boundaries

- The master blueprint remains authoritative for page purposes, factual project descriptions, maturity, private/public boundaries and prohibited claims.
- Use `lib/site-data.ts`, `content/lab-state.json` and the documented case-study material as the existing public-safe content source.
- Do not add unsupported performance, accuracy, latency, uptime, ROI, customer or deployment claims.
- Pulse must identify its source timestamp and must not imply a live feed.
- Rejected and frozen research remain visible with their actual state.
