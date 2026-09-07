# Screen-recording audit fixes

Source recording: 105 seconds, 2880×1800, captured from the local preview.

## Findings addressed

- Removed the excessive homepage hero minimum-height that created a dead gap before Lab Pulse.
- Reduced the hero-to-pulse spacing to a deliberate 38px relationship.
- Raised navigation and brand-supporting text contrast and size.
- Raised system-card body-copy contrast.
- Replaced the ambiguous floating circle with a labeled `Back to top` control.
- Replaced automatic hero rotation with explicit Previous/Next and dot selection so long-form content does not move unexpectedly.

## Evidence

- `npm run visual -- --workers=1 tests/interactions.spec.ts tests/visual.spec.ts`: 55 passed, 3 intentional skips.
- Homepage regression asserts hero-to-pulse separation is below 90px.
- Interaction regression asserts the scroll control contains `Back to top`.
- The full ten-pass audit remains the final cross-route gate.
