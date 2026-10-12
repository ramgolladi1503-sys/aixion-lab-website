# Motion Lab — Scene 1: Arrival

## Visual target

One continuous folded metal form hangs in a near-black field. A broad, asymmetrical bronze tube folds through itself around a dark graphite core; one fine, pale-bronze orbit crosses its silhouette. The object is large enough to read at a distance and sits just right of center on desktop, leaving a quiet text column at left. On narrow mobile, it moves above the headline. Warm key light reveals the machined surface while a cool, low-intensity edge light separates the far side. A sparse field of tiny warm points gives depth without becoming a generic starfield.

The form turns slowly by a few degrees over time. Pointer movement adds a clamped, damped pitch and yaw response; keyboard-operable HTML controls provide the same view changes and a recenter action. No content is embedded only in the renderer. No sound, scroll lock, camera jumps, copied Active Theory assets or brand marks are used.

## Technical constraints

- One route-local React Three Fiber Canvas, dynamically loaded from a Client Component because the renderer needs browser APIs and is not SSR-safe.
- Procedural geometry and shader-generated detail; no external scene assets or network requests.
- Device pixel ratio capped at 1.35; a static view is used for reduced motion, data saver, low-resource devices and WebGL failure.
- Rendering is mounted only while the route is visible. Canvas and event listeners unmount with the route; R3F-owned geometries/materials follow its disposal lifecycle, while externally-created resources are disposed explicitly.
- Context loss switches to the static view and exposes an explicit retry action. Semantic text and controls remain HTML.

## Gate A review checklist

- [x] Browser renders WebGL2 and the sculpture is visually legible at desktop size in Chromium with SwiftShader.
- [x] Pointer and keyboard view controls work; the browser interaction recording is retained.
- [x] Static export includes the heading and poster before client JavaScript runs.
- [x] Reduced-motion and missing-WebGL fallbacks leave the route readable and navigable.
- [x] Desktop, mobile, short-mobile, reduced-motion and fallback screenshots are captured with the browser/rendering backend recorded in `PROGRESS.md`.
- [ ] Context-loss behavior has source handling but still needs runtime failure-injection verification.
- [ ] Physical desktop and mobile GPU profiling is pending; do not infer it from SwiftShader results.
