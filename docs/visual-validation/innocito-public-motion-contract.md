# Innocito public motion contract

This is the public, reproducible portion of the reference audit. It is not a claim about Innocito's private source or CMS.

## Values recovered from public assets

| Behavior | Public value | Aixion implementation |
| --- | --- | --- |
| Premium easing | `cubic-bezier(.33,1,.68,1)` | route transitions, content entry, carousel entry |
| Luxe easing | `cubic-bezier(.22,1,.36,1)` | reveals, menu, fine interaction motion |
| Content reveal | opacity `0` + blur `4px` + translateY `20px` to settled state | `.reveal-on-scroll` |
| Menu reveal | translateY `-10px` to `0` with opacity | mobile navigation |
| Menu timing | 500ms open, 300ms close | mobile navigation tokens |
| Dot and micro interaction timing | 300ms | carousel dots, controls, mobile links |
| CTA emphasis | 500ms overlay/border transition and 300ms icon/label transition | fresh CTA layer |
| Additional public curves | `cubic-bezier(.16,1,.3,1)` and standard `cubic-bezier(.4,0,.2,1)` | named in the motion config for component-level parity |
| Long reveal timing | 700ms and 1500ms utility durations appear in the public CSS | available as reference timings, not applied globally |
| Generic autoplay | 4000ms Embla autoplay default | recorded as the reference default |
| Main card carousel autoplay | 3000ms with `stopOnInteraction:false` | hero controller uses the observed 3000ms cadence while preserving accessible hover/focus pause |
| Card motion variant | `y:30`, 700ms, 200ms delay, `easeInOut` | available as the card-entry contract |

The reference bundles also show IntersectionObserver-driven one-shot reveals, smooth scroll containers, multiple stateful carousels, and route-scroll restoration managed by the application shell. Aixion now has the equivalent local state boundaries: route `entering/ready`, hero `entering/ready`, observer-settled sections, paused/playing carousel state, mobile menu state, and reduced-motion behavior.

The content boundary is explicit in `lib/content-state.ts`: primary data resolves to `ready`, configured fallback data resolves to `ready/fallback`, and an unavailable collection resolves to `empty`. This is the recreatable equivalent of a CMS-backed component boundary; it avoids coupling animation to an assumed successful fetch.

Carousel changes now use an explicit `ready → switching → entering → ready` lifecycle. The 120ms handoff is local orchestration glue: the public bundles expose separate carousel/autoplay and motion primitives, but do not expose a canonical private transition duration.

## Fidelity boundary

Private CMS schemas, unpublished timeline constants, server-side content fallbacks, and original source maps are not exposed by the public site. Those cannot be verified or copied literally. The local implementation therefore uses explicit data and state contracts rather than pretending to reproduce inaccessible internals.

## Verification

- `npm run typecheck`
- `npm run build`
- `npm run visual -- --workers=1 tests/accessibility.spec.ts tests/visual.spec.ts`
- `npm run visual -- --workers=1 tests/interactions.spec.ts`
- `node scripts/ten-pass-ui-audit.mjs`
- `node scripts/audit-innocito-public-assets.mjs`
- `node scripts/verify-innocito-public-contract.mjs`

The asset audit writes `innocito-public-asset-report.json`; its timestamp and asset list make the evidence refreshable rather than silently treating an old bundle as current.
