# Aixion Lab — 27-Issue UI/UX UAT Remediation Matrix

Status legend: **REPAIRED** = implementation changed and a regression gate exists where automatable. **VISUAL RECHECK** = must still be confirmed in a fresh rendered capture before merge.

| # | Issue | Repair | Status |
|---|---|---|---|
| 1 | Research intro copy too small | Intro body raised to ~19px+ with darker contrast | REPAIRED |
| 2 | Research card question text too small | Card summaries raised to 16px; titles strengthened | REPAIRED |
| 3 | Selected research contrast weak | Selected burgundy card secondary copy uses high-opacity white | REPAIRED |
| 4 | Research topics all equal | 5 primary themes + 6 supporting themes, no tab taxonomy | REPAIRED |
| 5 | Research detail center gap too large | Reveal grid changed to 5/7 with tighter gap | REPAIRED |
| 6 | Systems intro duplicated | Removed second editorial intro before flagships | REPAIRED |
| 7 | Flagship body copy too small | Flagship descriptor raised to ~18px | REPAIRED |
| 8 | Control Tower imagery basic | New project-specific premium Control Tower teaser + hero art | REPAIRED / VISUAL RECHECK |
| 9 | Automation imagery documentation-like | New project-specific premium Automation teaser + hero art | REPAIRED / VISUAL RECHECK |
| 10 | Burgundy statement too large | Section made content-driven, two-column, no viewport-height block | REPAIRED |
| 11 | About hero body too small | About lede raised to ~19px | REPAIRED |
| 12 | About center gap too large | Hero changed to balanced 6/6 grid with controlled gap | REPAIRED |
| 13 | About subheading oversized | Section serif capped to ~40–59px, body increased | REPAIRED |
| 14 | Principle descriptions too small | Principle body raised to ~16.3px, darker contrast | REPAIRED |
| 15 | Blank band before About direction | Closing spacing compressed; trailing padding removed | REPAIRED |
| 16 | Professional profile breaks design system | Resume rebuilt as editorial profile page | REPAIRED / VISUAL RECHECK |
| 17 | Collaborate hero body too small | Hero copy raised to ~19px | REPAIRED |
| 18 | Collaboration columns too empty | Cards compressed to ~285px minimum with denser copy | REPAIRED |
| 19 | Collaborate CTAs too weak | CTAs strengthened with burgundy, ~16px, medium weight | REPAIRED |
| 20 | Fit lists too small | List copy raised to ~16.6px | REPAIRED |
| 21 | Display/body scale too polarized | Hero displays capped at 88px desktop; body normalized upward | REPAIRED |
| 22 | Overuse of one split layout | Added grid, rows, media-led variants, 4-column and project-specific compositions | REPAIRED / VISUAL RECHECK |
| 23 | Excess horizontal whitespace | Column ratios/gaps tightened across editorial pages | REPAIRED |
| 24 | System imagery credibility gap | Four systems now use distinct premium teaser and hero visual grammars | REPAIRED / VISUAL RECHECK |
| 25 | Body contrast too weak | Body #3f3b39; secondary #625d59 | REPAIRED |
| 26 | Fixed status UI distracts | Status bar limited to Home, Systems, TradeBot | REPAIRED |
| 27 | Quality inconsistent across pages | Research/About/Collaborate/Profile/Systems normalized to shared editorial scale; system variants added | REPAIRED / VISUAL RECHECK |

## Automated UAT gates

`tests/visual.spec.ts` now checks:

- Entry scroll isolation
- Home → Systems explicit navigation only
- No horizontal overflow on core routes
- Desktop body-size minimums
- Display-size cap
- No blank trailing viewport on About/Collaborate
- Research primary/supporting hierarchy and single reveal
- Flagship vs experimental systems hierarchy
- Premium hero art paths for all four systems
- Interactive/readable architecture steps
- Desktop drawer maximum width
- Status bar absence on editorial pages
- Editorial professional-profile structure and canonical Aixion Control Tower naming

## Merge rule

Do not merge while the PR is draft. A new desktop + mobile rendered capture must be reviewed against this matrix. Any visual failure reopens the corresponding issue.
