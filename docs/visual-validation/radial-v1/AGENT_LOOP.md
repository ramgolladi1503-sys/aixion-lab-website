# AIXION LAB — Autonomous Visual Convergence Loop

This protocol is for Codex / Antigravity / another implementation agent working on the current radial site. It exists to remove the owner from repetitive screenshot → explain → fix cycles.

## Operating authority

Read first:

1. `REFERENCE_AUTHORITY.md`
2. `LOCK_STATE.json`
3. `../../AIXION_CINEMATIC_V2_IMPLEMENTATION.md`
4. the current `frontend/main.jsx` and `frontend/styles.css`

Do not start by redesigning the site.

## Required loop

### A. Establish exact state

Record:

```text
BRANCH=
BASE_SHA=
WORKTREE_CLEAN=
NODE=
NPM=
```

If the working tree is dirty, preserve unrelated user changes. Do not reset them.

### B. Build and capture before editing

From `frontend/`:

```bash
npm install
npx playwright install chromium
npm run build
VISUAL_RUN_ID=baseline npm run visual:validate
```

The capture must exist before visual repairs begin.

### C. Compare against the right authority

Use:

- `radial-primary-composition.jpg` for Home composition / depth / hierarchy;
- `particle-love-motion-reference.jpg` only for field motion / atmosphere;
- actual Aixion copy and route contracts from the source/docs for content truth.

Never copy generic business copy, fake telemetry, or invented claims from concept art.

### D. Diagnose defects

For each defect record:

```text
ID=
SEVERITY=P0|P1|P2|P3
PAGE_OR_STATE=
OBSERVED=
EXPECTED=
ROOT_CAUSE=
MINIMAL_REPAIR=
FILES=
LOCKS_TOUCHED=
```

Priority:

`P0 → P1 → P2 → P3`

Examples:

- P1: the radial hub is materially smaller/flatter than the primary reference and no longer dominates the viewport.
- P2: selected spoke is visually weak, so the active node does not feel connected to the core.

### E. Make the smallest repair

Do not rewrite the whole app to fix a 20 px geometry error.

Prefer changing the smallest responsible layer. Preserve already-good locked areas.

### F. Rebuild and rerender

After each meaningful repair:

```bash
npm run build
VISUAL_RUN_ID=iteration-N npm run visual:validate
```

Compare `baseline` → `iteration-N` and the governing reference.

Keep a change only if it improves the targeted defect without regressing locked states.

### G. Lock improvements

When a component is visually accepted, update the run report as:

```text
LOCKED
```

Subsequent iterations may not redesign it unless a regression is demonstrated.

### H. Stop

Do not keep "improving" after convergence.

Stop only when:

- P0 = 0
- P1 = 0
- major P2 = 0
- Node 20 build passes
- Playwright interaction suite passes
- desktop/tablet/mobile screenshots exist
- visual review confirms the Home composition has the required weight/depth/hierarchy
- no locked state regressed

## Human review budget

The owner should see at most three meaningful review checkpoints:

1. geometry/composition approval;
2. motion/interaction approval;
3. final polish approval.

The agent may perform many internal iterations between those checkpoints.
