# Motion Lab Integration Plan

## Current disposition

- `/motion-lab` is a standalone, non-indexed experiment with no homepage entry point.
- The homepage, shared navigation, and existing production routes are unchanged by this prototype.
- PR #16 is open and unmerged. Its head is `a4339dba69a4cf5184683c952e4cee796e8708d6`; this prototype branch is based on that head. A PR from this branch to `main` would include PR #16's existing redesign diff.
- Draft PR #17 (`https://github.com/ramgolladi1503-sys/aixion-lab-website/pull/17`) stacks this prototype on `ram/aixion-olympic-motion-v1`. Its base SHA is the exact PR #16 head; its current head is `488b5b189de7e2081425d5702f386906849f6996`.
- PR #17 is open, unmerged, and GitHub reports it mergeable. It is for review only. No merge or deployment has occurred.
- `website-ci.yml` triggers only for pull requests targeting `main`, so the stacked PR #17 has no GitHub workflow run or commit status check. Local build and focused/full Playwright results are recorded in `PROGRESS.md`. If the PR base changes to `main`, require exact-head CI before treating checks as complete.

## Validation and rollout

1. **Prototype review:** the three scenes, reverse scroll transition, keyboard/touch controls, reduced-motion mode, no-WebGL fallback, and context-loss fallback have browser and Playwright evidence. Keep `/motion-lab` unlinked from production navigation.
2. **Performance/device gap:** native ARM64 Chromium on Apple M1 Metal measured each scene at about 60 FPS for four seconds on 1440×900 desktop and 390×844 mobile viewport emulation. The mobile result is not a physical mobile GPU run. Software-renderer baselines are also recorded separately in `PROGRESS.md`.
3. **Review exact diff:** include only the isolated route, route-local components, focused tests, exact-pinned dependencies and lockfile, narrow authority/progress documentation, and captured evidence. Exclude generated `out/` and all homepage redesign files.
4. **Review PR:** use draft PR #17 stacked on PR #16 while PR #16 remains open. Because this base does not trigger Website CI, rely on the recorded local evidence for this draft. Do not merge or deploy without owner authorization.
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
