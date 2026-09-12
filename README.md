# Aixion Lab

Ram Golladi’s engineering portfolio. The current design specification is [V2](docs/website/AIXION_WEBSITE_MASTER_BLUEPRINT_V2.md), which supersedes the V1 blueprint and legacy visual documents.

## Run

```sh
npm ci
npm run dev -- --port 3100
```

## Verify

```sh
npm run typecheck
npm run build
npm run visual
```

Playwright starts a dedicated static server on port 3100 and never reuses an unrelated server. Tests cover every major route at 390, 430, 768, 1280 and 1440px, plus interaction and reduced-motion behavior.

## Configuration and migration

- `NEXT_PUBLIC_MOTION_ENABLED=false` disables narrative motion. Rebuild after changing it.
- Public contact address lives in `lib/content.ts`. The contact form prepares a `mailto:` draft; no delivery service, tracking or personal-data storage is configured.
- `/resume` is a printable public profile. LinkedIn carries employment history; no unverified dates or employers are added.
- Static export remains enabled. Serve `out/`; Netlify uses `public/_redirects` for legacy links. The postbuild script also emits portable HTML redirects for known legacy routes on static hosts.
- Public project claims link to pinned revisions. They are documentation evidence, not a newly executed project test or live-runtime certificate.
- Fonts are locally served Inter and Inter Tight, under the adjacent OFL licenses.
- No backend or data migration. The old visual runtime is removed; Git history retains it. Rollback means redeploying the prior approved revision.
- Preview, review the contact handoff, then promote only with deployment authorization. Do not auto-merge.

For a complete local text export of the changed source and binary hashes, run `python3 scripts/source-review.py`; output is `artifacts/changed-source-review.md`.

See [validation report](docs/website/VALIDATION.md) for browser evidence and known limits.
