# AIXION LAB — Google AI Studio Build Brief

## Objective
Continue the existing AIXION LAB website. Do not replace it with a generic AI startup template.

## Source of truth
- Repository: `ramgolladi1503-sys/aixion-lab-website`
- Authority branch: `main`
- Existing frontend: React + Vite under `frontend/`
- Brand asset: `frontend/public/brand/aixion-lab-brand-lockup.webp`

## Brand authority
The uploaded forged-metal mark and its lockup are authoritative.

Display name:

`AIXION LAB`

Brand line:

`END IS THE NEW BEGINNING`

Do not redraw, replace, reinterpret, or generate a different logo unless explicitly instructed.

## Company positioning
AIXION LAB is an independent AI product and research studio focused on controlled, testable, evidence-driven systems.

Primary themes:
- AI agent governance and human approval
- runtime/MCP security
- software quality and QA intelligence
- evidence and verification systems
- automation and real-time reliability
- applied technical research

Do not describe the company as an algorithmic-trading business.

## Product hierarchy
### Flagship build
Aixion Control Tower
- Human-in-the-loop control plane for AI-assisted software work
- Approval, validation, audit, mobile review, and controlled execution

### AI security
MCP Shield
- Runtime security gateway for AI agents and MCP tools
- Observe, explain, approve, audit, or block risky tool calls

### Evidence system
Veriforge
- Maps claims to tests, decisions, failures, architecture, demos, and proof

### Research
Financial Systems Research Lab
- Experimental financial-systems engineering and research environment
- Focus on data quality, market microstructure, replay, reliability, risk controls, and decision infrastructure
- Do not present as investment advice, a trading recommendation service, an algo for sale, or guaranteed/proven profitability

## Founder positioning
Include a restrained founder section for Ram Golladi.

Positioning:
- Founder / AI systems builder
- Background in software quality and QA
- Building toward AI systems engineering, agent governance, security, automation, and applied research
- AI-assisted development should be described transparently as directed, reviewed, tested, corrected, and governed work

Do not invent credentials, customers, funding, employee count, revenue, partnerships, awards, or production claims.

## Visual direction
Keep the existing premium dark identity.

Required characteristics:
- near-black background
- silver/white forged-metal brand asset
- restrained monochrome palette
- large editorial typography
- subtle grid and glow treatments
- technical control-surface visuals
- high information hierarchy
- generous whitespace
- responsive desktop/mobile layouts

Avoid:
- generic purple/blue AI gradients
- stock photography
- robot-head imagery
- fake testimonials
- fake customer logos
- excessive glassmorphism
- crypto/trading aesthetics
- hype copy

## Site architecture
Build the public experience around:
1. Home
2. Systems / capabilities
3. Work / products and research
4. Product detail experiences
5. Proof / evidence
6. Founder / journey
7. Build log / changelog
8. Contact
9. Legal / privacy placeholders where appropriate

The first version may remain a single-page experience, but structure components so these can become routes later.

## Hero
Preserve the brand lockup prominently.

Current core headline can be refined but should stay in this territory:

`Human control for AI systems that can actually change things.`

The hero must communicate in under 10 seconds:
- what AIXION LAB is
- what it builds
- why control/evidence matter
- where to see the actual work

## Interactive product storytelling
Improve the site with real, non-deceptive interaction:
- Control Tower approval-state visualization
- MCP Shield safe/blocked tool-call demonstration
- Veriforge claim-to-evidence visualization
- Financial Systems Research Lab architecture/research timeline

These should be representative visual demos unless backed by a real API. Clearly distinguish demo state from live system state.

## Evidence rules
Every strong claim should be traceable to repository evidence or explicitly labeled as direction/research.

Use labels such as:
- Built
- Prototype
- Research
- In validation
- Planned

Never turn missing evidence into a success claim.

## Security
Do not expose:
- source-code secrets
- API tokens
- broker credentials
- internal runtime data
- private research datasets
- private architecture details that create security risk

If Gemini features are added, keep API keys server-side and use AI Studio secrets rather than browser code.

## Technical rules
- Preserve React/Vite unless there is a concrete reason to migrate.
- Keep components maintainable rather than generating one giant file.
- Split the current `main.jsx` into components as the site grows.
- Add semantic HTML and accessibility states.
- Keep mobile responsiveness.
- Avoid unnecessary backend/database complexity for static content.
- Any AI-backed feature must have explicit purpose; do not add a chatbot merely to claim the site uses AI.

## First AI Studio task
1. Inspect the imported repository before editing.
2. Run `npm install` and `npm run build` from `frontend/` and identify any build/runtime errors.
3. Preserve the AIXION LAB brand lockup exactly.
4. Refactor the single-file frontend into clean reusable components without changing the visual identity.
5. Upgrade the Work section into four premium product/research cards with detail drawers or routes.
6. Add a founder/journey section and evidence/status labels.
7. Make the page feel like a real technical product studio rather than a portfolio template.
8. Verify desktop and mobile layouts.
9. Do not add invented metrics, customers, revenue, testimonials, trading performance, or legal-company claims.
10. Show a concise change summary and list any unsupported claims you removed or refused to add.
