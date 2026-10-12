# Motion Lab Integration Plan

## Current disposition

- `/motion-lab` is a standalone, non-indexed experiment with no homepage entry point.
- The homepage, shared navigation, and existing production routes are unchanged by this prototype.
- PR #16 is open and unmerged. Its head is `a4339dba69a4cf5184683c952e4cee796e8708d6`; this prototype branch is based on that head. A PR from this branch to `main` would include PR #16's existing redesign diff.
- While PR #16 remains open, the narrow review path is a draft stacked PR targeting `ram/aixion-olympic-motion-v1`. If PR #16 merges or closes, rebase or cherry-pick only the Motion Lab changes onto the intended `main` state before opening a focused PR.
- No merge or deployment has occurred.

## Validation and rollout

1. **Prototype review:** the three scenes, reverse scroll transition, keyboard/touch controls, reduced-motion mode, no-WebGL fallback, and context-loss fallback have browser and Playwright evidence. Keep `/motion-lab` unlinked from production navigation.
2. **Performance/device gap:** native ARM64 Chromium on Apple M1 Metal measured each scene at about 60 FPS for four seconds on 1440×900 desktop and 390×844 mobile viewport emulation. The mobile result is not a physical mobile GPU run. Software-renderer baselines are also recorded separately in `PROGRESS.md`.
3. **Review exact diff:** include only the isolated route, route-local components, focused tests, exact-pinned dependencies and lockfile, narrow authority/progress documentation, and captured evidence. Exclude generated `out/` and all homepage redesign files.
4. **Review PR:** keep the motion-lab change stacked on PR #16 while that PR remains open. The PR is for review only; do not merge or deploy without owner authorization.
5. **Homepage integration:** consider one deliberate link to `/motion-lab` only after review. Keep Canvas lazy-loaded on its own route; do not mount WebGL on the homepage or auto-start it for visitors. Review any entry-point change separately.

## Rollback

For a prototype-only rollback, remove the isolated route and supporting implementation:

- `app/motion-lab/`
- `components/motion-lab/`
- `tests/motion-lab.spec.ts`
- `docs/motion-lab/` (retain the rollback record if this is an integration PR)
- Remove the exact-pinned `@react-three/fiber`, `three`, and `@types/three` additions from `package.json` and regenerate `package-lock.json`.
- Revert only the Motion Lab WebGL allowance in `docs/website/AUTHORITY_LOCK.md` and `docs/website/OLYMPIC_REFERENCE_ADOPTION.md`.
- Do not remove or revert unrelated PR #16 changes. Do not commit the generated `out/` directory.

After rollback, run typecheck, production build, and the full visual suite; confirm `/motion-lab` returns the site's normal not-found route and existing homepage content is unchanged.

## Configuration and migration

- New configuration keys: none.
- Migration: none. This is a static route and adds no stored data or server-side state.
- Runtime dependencies are exact-pinned in `package.json` and `package-lock.json`; remove them only as part of a complete rollback.
- Preview: run `npm run dev` and open `/motion-lab`. The current local exported preview is `http://127.0.0.1:3073/motion-lab`.
