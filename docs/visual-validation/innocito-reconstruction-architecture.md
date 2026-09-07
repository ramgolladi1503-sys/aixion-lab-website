# Reference reconstruction architecture

This is the implementation model used by the Aixion redesign. It reproduces the public behavior observable in Innocito's browser assets while keeping inaccessible server behavior explicit.

| Observable reference primitive | Recreated Aixion boundary | State/timing |
| --- | --- | --- |
| Embla-style autoplay plugin | `components/hero-carousel.tsx` | 3000ms component cadence; generic 4000ms default recorded |
| Autoplay interaction flags | hero pause/focus handlers | hover/focus pause is retained for accessibility |
| Presence-style slide change | hero `selectSlide` controller | `ready → switching → entering → ready`; guarded 120ms handoff |
| Motion variants | `lib/motion-config.ts` + `app/aixion-fresh.css` | public premium/luxe curves; 700ms/200ms card contract |
| IntersectionObserver reveal | `components/motion-enhancer.tsx` | one-shot observer, reference root margin, scroll fallback |
| Content reveal keyframe | `.reveal-on-scroll` | opacity + 4px blur + 20px vertical offset |
| Mega-menu reveal/exit | mobile menu CSS | ±10px vertical offset; 500ms open, 300ms close |
| Route shell transition | `components/route-motion.tsx` | route `entering/ready`, 500ms settle |
| CMS-backed collection state | `lib/content-state.ts` | local primary, fallback, empty, error-capable envelope |
| Reduced-motion branch | CSS media query + carousel media listener | animations disabled and state settles immediately |

## Deliberate fidelity boundary

The public site does not expose its private CMS schema, server-side content loaders, unpublished timeline constants, source maps, or original component source. The local implementation therefore uses explicit contracts with equivalent observable states. It does not claim identity with the private implementation.

## Evidence refresh

```sh
node scripts/audit-innocito-public-assets.mjs
node scripts/verify-innocito-public-contract.mjs
npm run typecheck
npm run build
npm run visual -- --workers=1 tests/interactions.spec.ts
```
