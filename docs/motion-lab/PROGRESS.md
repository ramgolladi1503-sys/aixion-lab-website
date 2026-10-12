# Motion Lab Progress

## Scope and current state

- Goal: an original, isolated `/motion-lab` experience. The public homepage, shared navigation and other production routes remain unchanged.
- Branch: `ram/aixion-motion-lab`, based on PR #16 head `a4339dba69a4cf5184683c952e4cee796e8708d6`.
- Implemented: one shared Canvas, Arrival sculpture, scroll-morphed engineering graph, four-cluster applied-systems scene, semantic chapter content and links, native reversible scroll progress, responsive layout, reduced-motion and failure fallbacks.
- GitHub PR #16 was rechecked on 2026-10-13: open, unmerged, head `a4339dba69a4cf5184683c952e4cee796e8708d6`. Draft PR #17 is open and unmerged at `https://github.com/ramgolladi1503-sys/aixion-lab-website/pull/17`, based on that exact head. Its current head is `488b5b189de7e2081425d5702f386906849f6996`; GitHub reports it mergeable. A direct PR to `main` would include PR #16's existing redesign diff. No merge or deployment has occurred.
- PR #17 has no GitHub Actions workflow run or commit status check: `website-ci.yml` is configured to trigger only on pull requests targeting `main`. This is a missing run, not a passing CI check. See `INTEGRATION.md` for exact-base handling and rollout boundaries.
- The abandoned broad homepage experiment remains preserved at `/Users/madhuram/aixion-active-theory-pr` and is not part of this branch.

## Execution gates

| Gate | State | Evidence / remaining work |
|---|---|---|
| A — renderer | PASS on Apple M1 Metal | Original sculpture rendered on native M1 Metal-backed Chromium at 1440×900; pointer controls and fallback paths also pass focused checks. Mobile-sized Metal emulation is captured separately. |
| B — choreography | PASS on Apple M1 Metal | One deterministic native-scroll progress value drives all three connected scenes and reverses. Desktop and mobile-emulated screenshots show Arrival, Engineering and Applied Systems; the focused suite also captured reverse scroll. |
| C — interaction | PASS in desktop/mobile emulation | Semantic links, keyboard view controls, mobile touch anchor, reduced-motion and no-WebGL paths pass focused browser checks. Physical phone input has not been spot-checked. |
| D — quality | PASS for M1 desktop and mobile-sized emulation; physical-phone check outstanding | Native ARM64 Chromium confirmed `ANGLE Metal Renderer: Apple M1`. At 1440×900, each scene delivered about 60 FPS with median and p95 frame intervals of 16.7 ms. At 390×844, device scale factor 3 (canvas 526×1139), each scene also delivered about 60 FPS with no horizontal overflow. All six runs recorded zero `pageerror` events. The samples ran for four seconds per scene and are refresh-capped observations, not maximum-throughput or sustained thermal tests. Injected WebGL context loss switches to the static fallback while retaining content. A live route transition removed the Canvas on `/systems`; browser-back restored exactly one Canvas in `ready` state. React Three Fiber 9.8.1 unmount teardown disposes the root scene/renderer and calls `forceContextLoss()`. A physical phone/GPU run remains outstanding. |
| E — regression | PASS (headless suite) | `npx next build --webpack` passes and typechecking completed in the build. The focused motion-lab run after the 319×664 adjustment: 23 passed, 1 expected desktop-only skip. The earlier full serial run completed: 163 passed, 5 skipped, 0 failed in 5.7 minutes. The earlier isolated timeout did not recur. |
| F — review | PARTIAL | `git diff --check` passes and the production homepage/shared-layout files have no changes. Draft PR #17 is open, mergeable and stacked on PR #16's exact head. The configured Website CI workflow did not run because its pull-request trigger only accepts base `main`; local build and browser evidence are documented, but no remote CI pass is claimed. Physical-device performance and owner visual review remain outstanding. No merge or deployment has occurred. |

## Visual evidence

Renderer details for each screenshot are stated by capture group below; the earlier journey captures use software rendering, while the M1 captures use native Metal:

- `evidence/journey-arrival.png` — 1440×900 Arrival, ANGLE/SwiftShader.
- `evidence/journey-engineering.png` — engineering graph at scroll progress 0.451, ANGLE/SwiftShader.
- `evidence/journey-applied-systems.png` — four-cluster composition at scroll progress 0.951, ANGLE/SwiftShader.
- `evidence/journey-reverse-engineering.png` — reverse scroll returned to the same graph at 0.451, ANGLE/SwiftShader.
- `evidence/journey-applied-390.png` and `evidence/journey-applied-320.png` — responsive applied-systems views, ANGLE/SwiftShader.
- `evidence/m1-metal-arrival-1440x900.png`, `evidence/m1-metal-engineering-1440x900.png` and `evidence/m1-metal-applied-1440x900.png` — native Apple M1 Metal Chromium captures at desktop viewport size.
- `evidence/m1-metal-mobile-arrival-390x844.png`, `evidence/m1-metal-mobile-engineering-390x844.png` and `evidence/m1-metal-mobile-applied-390x844.png` — 390×844 mobile viewport emulation on the Apple M1 Metal renderer (1170×2532 capture pixels at device scale factor 3).
- `evidence/narrow-arrival-319x664.png` — Arrival after the narrow-screen control-panel adjustment; the status fits in the captured viewport.
- `evidence/scroll-journey.webm` — forward and reverse chapter transitions.
- `evidence/arrival-interaction.webm` — pointer and view-control interaction.
- `evidence/fallback-reduced-motion.png`, `evidence/fallback-reduced-motion-mobile.png`, `evidence/fallback-no-webgl.png`, `evidence/fallback-no-webgl-mobile.png` and `evidence/fallback-320-mobile.png` — still/fallback coverage.

The live in-app browser inspection observed the arrival composition at 1440×900, then used the chapter links to inspect Engineering (progress 0.451) and Applied Systems (progress 0.951). At 390×844 it confirmed no horizontal overflow and inspected both later scenes; the four destination links had 55 px row heights and remained within the viewport. Route navigation to `/systems` removed the Canvas from the document; browser-back restored the motion route and exactly one Canvas in `ready` state. At 319×664, the earlier inspection exposed the Arrival controls/status overflow; after adjustment, the captured view and focused regression test confirm the panel fits below the Explore link. The page inspection API does not expose the active renderer or device GPU, so no hardware-renderer or physical-device FPS claim is made from that inspection.

Initial software-renderer baseline (ANGLE/SwiftShader) at 1440×900 measured Arrival 25.1 FPS (median 33.4 ms, p95 50.1 ms), Engineering 23.0 FPS (median 33.4 ms, p95 50.1 ms), and Applied Systems 27.4 FPS (median 33.3 ms, p95 50.0 ms). At 390×844 it measured 46.1, 50.3 and 45.1 FPS respectively (median 16.7 ms, p95 33.4 ms). These are retained as software-renderer reference values.

Native Apple M1 Metal sample (ARM64 Chromium, `ANGLE (Apple, ANGLE Metal Renderer: Apple M1, Unspecified Version)`), four seconds per scene:

| Viewport | Arrival | Engineering | Applied Systems | Errors / overflow |
|---|---:|---:|---:|---|
| 1440×900, DPR 1 | 59.9 FPS; median/p95 16.7 ms | 59.9 FPS; median/p95 16.7 ms | 60.0 FPS; median/p95 16.7 ms | 0 page errors |
| 390×844, emulated DPR 3, Canvas 526×1139 | 59.9 FPS; median/p95 16.7 ms | 60.0 FPS; median/p95 16.7 ms | 59.8 FPS; median/p95 16.7 ms | 0 page errors; no horizontal overflow |

The headless Metal samples were refresh-capped near 60 Hz. They demonstrate this M1 workload kept pace with the browser's frame cadence over the sample window; they do not establish peak throughput, long-session thermals, or performance on a physical mobile GPU. The native browser's physical display was asleep during this test.

## Build and preview notes

- `npx next build --webpack` passes and statically exports `/motion-lab`; build typechecking passed.
- Next emits environment warnings: native `@next/swc-darwin-x64` is truncated, so it falls back to WASM; x64 Node is running under Rosetta on Apple Silicon. Build succeeded despite those warnings.
- The isolated local preview is `http://127.0.0.1:3073/motion-lab`.
- `out/` is retained locally for the preview and must not be committed. Build-generated `next-env.d.ts` and `tsconfig.json` were restored; no `tsconfig.tsbuildinfo` remains.

## Next work

1. Obtain a physical-phone interaction and GPU frame-time check; the existing mobile result is browser emulation on an Apple M1, not a mobile GPU.
2. Request owner visual review of draft PR #17. If PR #16 changes disposition, reassess the stacked base and exact-head CI requirements before any retargeting.
