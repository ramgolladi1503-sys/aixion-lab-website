# Rendered visual review

Reviewer: implementation agent. These are qualitative screenshot-based assessment scores, not independent user research, market validation or a formal accessibility certification.

Authority: the supplied Astra master brief and Direction A — Calm Minimalism moodboard. The brief's Inter Tight / Inter typography lock takes precedence over serif typography visible in some reference-board examples. Direction A is interpreted as warm, material, spacious, highly readable and quietly premium; mountains/travel imagery, cyber styling, generic AI gradients and dashboard-heavy presentation are deliberately excluded.

Reviewed implementation: `ram/astra-calm-minimalism-v1` at `0aa1c369c725d8d908447075076df21371411b6d`.

Technical evidence: GitHub Actions `Website CI` run **602** completed successfully for that exact commit. The generated visual bundle contains the route matrix at 390, 430, 768, 1280 and 1440 pixels plus motion, menu, evidence-drawer, sticky-story, Journey and local-performance states.

| Category | Score / 10 | Rendered basis |
| --- | ---: | --- |
| Direction A fidelity | 9.0 | Warm canvas, stone/material still life, restrained indigo and sage, natural light, substantial whitespace; no mountain/travel or cyber treatment |
| Cross-page continuity | 9.1 | Home, Work, Research, Journey, About and Contact share the same shell, typography, rule weights, evidence language, spacing and material world |
| Readability | 9.4 | Meaningful text remains at or above the 16px floor across the tested matrix; comfortable body measures and clear contrast are preserved |
| Content hierarchy | 9.1 | Identity → capabilities → flagship work → process → research → proof → journey → opportunity remains scannable; detail pages add depth without replacing the overview |
| Visual elegance | 8.8 | Calm custom material artwork, restrained project imagery, quiet surfaces and deliberate whitespace now carry more of the presentation than technical boxes |
| Information density | 8.7 | Flagship story scenes, Research investigation traces and Journey capability paths convert prose into inspectable structure without shrinking text |
| Motion purposefulness | 8.6 | The material arrival, section lifecycle, sticky project progression and Journey accumulation support the narrative and retain reduced-motion behavior |
| Scroll experience | 8.7 | Native scrolling, reversible sticky states and natural releases remain intact; no scroll lock or mandatory cinematic sequence |
| Mobile quality | 8.8 | 390/430 layouts preserve the visual hierarchy, align capability copy cleanly, stack flagship scenes naturally and turn traces into readable vertical/grid sequences |
| Recruiter scan clarity | 9.1 | Ram's QA/automation foundation, systems progression, two flagship systems, evidence posture and opportunity intent are visible without requiring deep navigation |
| Engineering credibility | 9.2 | Public-source evidence, explicit maturity labels, negative research results and limitations remain visible; the design does not imply trading profitability or enterprise maturity |
| Accessibility | 9.3 | Axe A/AA/2.1 AA checks, text-size floor, keyboard/focus behavior, reduced motion, no-JavaScript content and contrast repairs pass in the automated browser suite |
| Performance | 8.7 | Static export, local subset fonts, SVG/editorial imagery and no WebGL preserve a lightweight rendering model; local measurements remain observations rather than field claims |
| Originality | 8.8 | Purpose-built Aixion material language and evidence/story components avoid the common neon-AI, glassmorphism, SaaS-card and dashboard-template patterns |

## Reference comparison

The final screenshot pass explicitly checked the master-brief questions:

- Canvas is warm and pleasant rather than sterile white or dark/cyber.
- Whitespace is generous but the main screens still contain useful information.
- Inter Tight / Inter hierarchy is consistent and body text remains comfortably readable.
- Hero and About imagery read as architectural/material studies, not travel scenery or random futuristic blobs.
- Indigo is an accent rather than the dominant surface color.
- TradeBot and Control Tower are presented as two editorial flagship scenes rather than equal generic SaaS cards.
- Research now shows a qualitative investigation trace before its detailed evidence sequence; no fake chart metrics were introduced.
- Journey now visualizes each chapter's transformation path while retaining the shared cumulative capability stack.
- Home, Work, Research, Journey, About and Contact remain visibly one brand.

## Regression history for this convergence pass

The first stronger visual pass exposed AA contrast failures in muted metadata and one indigo surface. Those were repaired at shared palette-token level rather than bypassed. A later Journey refinement caused horizontal overflow only at 768px; the trace was changed to a two-column tablet layout while preserving the 16px text floor. The next exact-commit run passed the full browser/visual suite.

No visual or browser test was deleted or weakened to obtain this pass.

## Remaining scope limits

Contact prepares an email draft rather than sending through a backend service. Résumé is a printable public profile with LinkedIn for employment history. External project documentation is evidence of engineering work, not a live-runtime certificate. The automated browser matrix is Chromium-based and is not a substitute for independent physical-device testing or formal WCAG certification.

The pull request remains draft and no merge to `main` is implied by this scorecard.
