# AIXION LAB — AI Studio Reference-World Takeover

Fetch repository `ramgolladi1503-sys/aixion-lab-website` and branch `website/reference-world-takeover-v1`.

Do **not** restart the design and do **not** restore procedural cones/cylinders/discs/primitive GLB geometry as the primary world. This branch already contains the new reference-authored 2.5D scene system in `src/App.tsx`, `src/reference-world.css`, `src/reference-world-assets.ts`, and `src/main.tsx`.

I will upload these seven PDFs directly:

- `01_full_site_scroll_reference.pdf`
- `02_experience_lock_board.pdf`
- `03_home_world_reference.pdf`
- `04_systems_world_reference.pdf`
- `05_contact_horizon_reference.pdf`
- `06_principles_world_reference.pdf`
- `07_founder_world_reference.pdf`

Open them visually. They are the composition authority.

Create these files from the uploaded PDFs:

```text
public/reference-world/overview.webp
public/reference-world/systems.webp
public/reference-world/evidence.webp
public/reference-world/principles.webp
public/reference-world/founder.webp
public/reference-world/contact.webp
```

Mapping:

```text
overview.webp   <- 03_home_world_reference.pdf
systems.webp    <- 04_systems_world_reference.pdf
evidence.webp   <- Evidence chapter/crop from 01_full_site_scroll_reference.pdf
principles.webp <- 06_principles_world_reference.pdf
founder.webp    <- 07_founder_world_reference.pdf
contact.webp    <- 05_contact_horizon_reference.pdf
```

`02_experience_lock_board.pdf` governs global visual DNA. `01_full_site_scroll_reference.pdf` governs whole-page rhythm.

The artwork is visual authority only. Do not publish fictional names, metrics, email addresses, customers, certifications, uptime, deployment claims, performance claims, or founder credentials embedded in the concept art. Keep the evidence-safe DOM copy already present in the branch.

Priority is visual implementation only:

1. Overview
2. Systems
3. Evidence
4. Principles
5. Founder
6. Contact
7. full-scroll continuity

Do not spend this pass on PR polish, audio, final mobile optimization, or replacing the scene plates with 3D.

Run:

```bash
npm install
npm run lint
npm run build
```

Render at `1440x900` and compare each live scene against its PDF. If architecture, scale, density, depth, or composition remains materially wrong, keep implementing and return `MORE_IMPLEMENTATION_REQUIRED`.

Required report:

```text
FETCHED_BRANCH=
STARTING_HEAD=
REFERENCE_PDFS_OPENED=
SCENE_ASSETS_CREATED=
APP_TSX_TAKEOVER_PRESERVED=
REFERENCE_WORLD_CSS_PRESERVED=
PROCEDURAL_3D_REINSTATED=
LINT=
BUILD=
OVERVIEW_REFERENCE_ALIGNMENT=
SYSTEMS_REFERENCE_ALIGNMENT=
EVIDENCE_REFERENCE_ALIGNMENT=
PRINCIPLES_REFERENCE_ALIGNMENT=
FOUNDER_REFERENCE_ALIGNMENT=
CONTACT_REFERENCE_ALIGNMENT=
MAJOR_VISUAL_GAPS_REMAIN=
FINAL_HEAD=
FINAL_VERDICT=
```

Allowed verdicts: `REFERENCE_WORLD_READY_FOR_HUMAN_REVIEW`, `MORE_IMPLEMENTATION_REQUIRED`, `BLOCKED`.
