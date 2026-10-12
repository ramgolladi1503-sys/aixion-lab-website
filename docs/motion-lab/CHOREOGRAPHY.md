# Motion Lab — Scroll Choreography

## Input and progress

- Use native document scrolling; never pin the document or translate scroll input into a synthetic scroll position.
- Normalize route progress from the motion-lab wrapper's top and scrollable height, clamped to `[0, 1]`.
- Keep the live value in a ref and update the shared Canvas from its single render loop. Update diagnostic DOM attributes at most once per animation frame.
- The same progress value maps to the same visual state in either direction. Scrolling backward must retrace the same morph.
- The three semantic chapters remain ordinary HTML sections with native anchors. Their links must work without WebGL.

## Scene mapping

- Arrival occupies the first scroll interval. Keep the folded bronze form legible and responsive to bounded pointer/keyboard input.
- Engineering intelligence occupies the middle interval. Points begin on the folded form, move into a connected graph, and reveal lines between explicit states. The form fades only as those same points resolve into the graph.
- Applied systems occupies the final interval. The graph routes into four separated clusters and frames; links in the semantic section point to the existing Systems, Research, Automation and Analytics routes.
- Use smoothstep interpolation at scene boundaries. Avoid step changes, auto-advancing timers, and scroll snapping.

## Failure and access behavior

- Reduced motion, data saver, low-resource selection and WebGL failure retain readable HTML and the still poster. Native scrolling and route links remain available.
- Keep keyboard-operable view controls in the first chapter. Touch uses native scrolling; it does not require dragging the canvas.
- Preserve focus visibility and do not rely on labels rendered by WebGL.
- Keep fallback status truthful. Do not report performance or completion state as if it were renderer telemetry.
