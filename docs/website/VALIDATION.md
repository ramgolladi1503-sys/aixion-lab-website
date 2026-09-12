# Rebuild validation — in progress

## Authority

- Branch: `ram/astra-calm-minimalism-v1`
- Clean base: `7ea7630`, fetched from main.
- Canonical dirty checkout was preserved. This rebuild is isolated.
- Design: supplied master prompt and Direction A from the supplied three-direction moodboard.

## Verified so far

- Production static build and TypeScript completed successfully.
- Browser suite after modal, tablet and About repairs: **54/54 passed**. Every route at 390, 430, 768, 1280 and 1440 pixels passed render status, internal links, meaningful text >=16px, horizontal overflow and axe WCAG checks. Full result retained at `artifacts/viewport-suite-54-passed.json`.
- Remaining modal focus failure was repaired with shared Tab/Shift-Tab wrapping. Both drawer and mobile-menu tests then passed (2/2).
- First/repeat/skip entry, native sticky advance/reverse/release, Journey accumulation/reversal, research verdict reveal, reduced motion, no-JavaScript hero, portable legacy redirect and contact draft states passed in the broad run.
- Rendered mobile openings, mobile middle sections, tablet openings, desktop openings, desktop middle sections and desktop footers have been inspected.

## Repairs from rendered review

- Preview server now resolves extensionless static routes correctly.
- Fonts reduced to roughly 124 KB of WOFF2.
- Mobile Journey shows capability names, not unexplained numbered tiles.
- Tablet hero composition widened for readable headline wrapping.
- About now uses its six specified capability groups instead of repeating Home's four groups.
- Motion-state screenshot review found faint narrative text during transitions. The source now keeps text opaque while retaining positional motion; rebuild verification is pending.

## Remaining acceptance work

- Focused rebuild verification for full-opacity motion, contact fallback, drawer and sticky/Journey regression: **5/5 passed**.
- Updated tablet hero and mobile About groups inspected; full viewport checks passed.
- Complete motion fidelity audit, including material continuity on entry and flagship handoffs; existing trigger checks alone are insufficient proof.
- Complete source/content and performance checks, and record an honest category-by-category visual scorecard.
- Produce complete changed-source review artifact, coherent commit, and final delivery report.

## Explicit limitations

- Contact prepares an addressed email draft. No server delivery service was supplied, so the site does not claim message delivery.
- Résumé is a printable public engineering profile. Employment dates and employers remain linked through LinkedIn; they have not been independently verified here.
- Project sources are pinned public documentation, not newly executed project tests or current live-runtime evidence.
- No deployment, main merge, or private evidence publication has occurred.
