# Approved Visual Authority — Aixion Lab

Status: LOCKED FOR REDESIGN QA

The approved visual authority is the user-approved cinematic mobile gallery board: deep navy / blue-black field, restrained bronze-gold frame language, ivory editorial typography, cinematic sci-fi environmental imagery, small human-scale figures, high contrast blue light, and consistent device-like framing across the complete public route set.

## Locked visual rules
- AIXION LAB° wordmark remains the primary mark.
- Use deep navy / blue-black surfaces; do not return to pale sage, white SaaS cards, generic dark dashboards, or teal cyberpunk neon.
- Use thin bronze/gold dividers and borders as restraint, not decoration.
- Use high-contrast serif display typography with small uppercase sans/mono support text.
- Cinematic artwork should carry page identity while UI text remains accessible live HTML/CSS.
- Do not bake labels, navigation, metrics, performance claims, or decorative chapter numbering into generated artwork.
- Decorative page numbering from the reference board is intentionally omitted per explicit user override.
- Maintain truthful public/private evidence boundaries and system states.

## Generated asset implementation
A text-free cinematic scene atlas is stored at:
`/public/images/cinematic/aixion-scene-atlas.webp`

The atlas contains route-specific scenes for Home, About, Systems, Research, Pulse, Journey, Career, Collaborate, Contact, TradeBot, Control Core, Automation, Analytics, the four public research notes, and a mean-reversion research scene. The 404 source tile with baked text was deliberately excluded from use as an asset.

`app/generated-scene-atlas.css` maps atlas cells to the approved gallery and inner-route hero surfaces. System and research detail pages expose slug-specific hero classes so each route receives its own artwork.

## Deployment boundary
This redesign remains branch-only until explicit user approval to merge/deploy. Production must remain unchanged during visual QA.
