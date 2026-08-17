# AIXION LAB — Google AI Studio Master Build Prompt

## Mandatory first read

Before changing any visual, layout, logo, color, typography, or brand element, read and obey:

`docs/BRAND_AUTHORITY.md`

That file is the immutable brand contract and outranks generated design suggestions. The exact supplied logo asset must be used directly. Do not recreate it with SVG, CSS, canvas, WebGL, tracing, image generation, or approximation.

Also import and use:

`src/brand.css`

for the canonical AIXION LAB design tokens and button treatments.

If the expected logo asset `/public/brand/aixion-lab-primary.png` is missing, STOP and request the original supplied file. Do not invent a replacement.

## Mission
Continue building the existing AIXION LAB website in this repository. Do not replace the project with an unrelated template. Treat this repository as the source of truth for the public website.

AIXION LAB is an independent AI product and research studio focused on controlled, testable, evidence-driven systems across AI agent governance, software quality, runtime security, automation, and applied research.

The site has two goals at the same time:
1. Present AIXION LAB as a credible emerging company/product studio.
2. Present Ram Golladi as the founder/builder behind the systems without turning the site into a generic personal portfolio.

## Brand authority
The official visual identity is the supplied metallic AIXION LAB lockup with the forged geometric mark and the title:

AIXION LAB
END IS THE NEW BEGINNING

Do not redesign, redraw, reinterpret, recolor, replace, or stylize the core logo without explicit approval. Preserve its black/silver premium identity. If the logo asset is not yet present in this imported project, stop and ask for the supplied logo image rather than inventing one.

The visual language should remain:
- near-black background
- silver/white typography
- subtle borders and grids
- restrained glow
- premium engineering/security aesthetic
- generous whitespace
- minimal motion
- no generic purple AI gradients
- no cartoon illustrations
- no stock photography
- no fake futuristic dashboards disconnected from the actual products

## Core positioning
Primary message:

Human control for AI systems that can actually change things.

Supporting idea:
AIXION LAB builds controlled, secure, auditable and evidence-driven systems for AI agents, QA automation, runtime security and high-accountability decision environments.

Never use empty marketing phrases such as "revolutionizing AI", "world-leading", "industry-leading", "guaranteed", or "enterprise-grade" unless repository evidence explicitly proves the claim.

## Product hierarchy
### 1. Aixion Control Tower — Flagship build
Position as a human-in-the-loop control plane for AI-assisted software work. It connects agent tasks, approvals, audit trails, mobile review, validation, risk controls and execution workers.

Do not claim fully autonomous production execution or enterprise readiness unless evidence exists.

### 2. MCP Shield — AI security
Position as a runtime security gateway for AI agents and MCP tools that can observe, explain, approve, audit or block risky tool calls before execution.

### 3. Veriforge — Evidence system
Position as a living proof system that maps claims to projects, tests, failures, architecture, decisions, demos and reviewable evidence.

### 4. Financial Systems Research Lab — Research only
This is the public framing for TradeBot-related work.

Describe it as an experimental financial-systems research environment used to study data quality, real-time pipelines, market microstructure, replay, risk controls, reliability and evidence-driven decision infrastructure.

Mandatory boundary:
- not investment advice
- not a trading advisory service
- not a signal-selling product
- not an automated trading service for customers
- do not publish profitability claims, win rates or expected returns without independently verified evidence

## Founder positioning
Include a concise founder section for Ram Golladi.

Positioning:
Founder / AI Systems Builder

Story direction:
- background in software quality and QA
- progressed from testing software to designing and governing AI-assisted systems
- builds products around control, evidence, safety, automation and real-world reliability
- uses AI-assisted engineering but directs, reviews, tests and validates the work
- values proof over claims

Do not fabricate employers, degrees, customers, awards, funding, revenue, team size or credentials.

## Required website information architecture
Build the site in this order unless a clearly better UX is justified:

1. Header
   - AIXION LAB logo lockup
   - Systems
   - Work
   - Proof
   - Founder
   - Contact

2. Hero
   - official logo/brand lockup
   - primary message: "Human control for AI systems that can actually change things."
   - short supporting copy
   - CTA: Explore the work
   - CTA: View proof / GitHub
   - compact visual representing approval, validation, audit and execution control

3. Why AIXION LAB exists
   Explain the gap between increasingly capable AI agents and weak control, validation, auditability and accountability.

4. Systems / capabilities
   - AI Agent Control
   - Runtime Security
   - Quality Intelligence
   - Real-Time Reliability

5. Products and research
   Give each project a maturity/status label such as:
   - FLAGSHIP BUILD
   - PRODUCT / MVP
   - PLATFORM / PROTOTYPE
   - RESEARCH

   Status labels must reflect repository evidence, not marketing ambition.

6. Product detail interactions
   Each product card should open a lightweight detail view or route with:
   - problem
   - what was built
   - architecture summary
   - current maturity
   - proof/evidence available
   - known limitations
   - what is next

7. Proof / evidence section
   This is a major differentiator.
   Show categories such as:
   - architecture
   - tests
   - release evidence
   - failures fixed
   - decisions
   - demonstrations
   - GitHub artifacts

   Do not expose private code, secrets, credentials, internal tokens, broker credentials or sensitive runtime data.

8. Principles
   Use concise principles:
   - Approval before action
   - Audit is not optional
   - Tests are contracts
   - Security starts disabled
   - Proof beats claims
   - Failure is evidence

9. Founder section
   Keep it professional and compact. The company remains the main subject.

10. Build journey / lab notes
   Add an optional section that shows selected milestones, lessons and failures over time. This should strengthen the founder story without pretending every experiment succeeded.

11. Contact
   Use contact@aixionlabs.com as the displayed contact address unless changed by the repository owner.

12. Footer
   AIXION LAB
   END IS THE NEW BEGINNING
   Do not append LLP, Pvt Ltd, Inc., or another legal suffix unless the repository owner explicitly confirms incorporation.

## Desired interaction design
The site should feel alive but restrained.

Good interaction examples:
- subtle hover elevation on system cards
- animated status pulse on the execution-control visual
- small transitions between product evidence tabs
- scroll-triggered fades under 300ms
- product detail drawers or dedicated routes

Bad interaction examples:
- constant particle storms
- large parallax effects
- autoplay video backgrounds
- fake live metrics
- fake customer activity
- excessive 3D rendering

Performance and readability outrank visual spectacle.

## AI features: only add if they serve a real purpose
Do not add a generic chatbot merely because this is an AI company website.

Two acceptable future AI features:
1. Veriforge Evidence Explorer — visitors ask about a project and receive answers grounded only in approved public evidence.
2. Architecture Explorer — controlled explanations of public architecture and design decisions without revealing private source code.

Any generative feature must:
- distinguish evidence from inference
- refuse unsupported claims
- never expose secrets or private repository content
- include clear source references where possible

Do not implement these until the static/public site is excellent.

## Technical direction
Use the existing React/Vite project unless there is a concrete reason to change it.

Preferred structure after cleanup:
- src/components/
- src/sections/
- src/data/
- src/styles/
- src/pages/ or a lightweight router only if product detail pages require it
- public/brand/

Avoid one giant JSX file.

Keep dependencies minimal. Do not introduce a heavyweight framework unless required.

The website must:
- run with npm install && npm run dev
- build with npm run build
- work on desktop, tablet and mobile
- have semantic HTML
- have accessible contrast
- have keyboard-accessible navigation
- include meta title and description
- have no console errors
- have no broken links

## Content truth rules
Never invent:
- customers
- revenue
- funding
- partnerships
- employees
- user counts
- testimonials
- performance metrics
- security certifications
- compliance certifications
- production deployments
- trading performance

When maturity is uncertain, use labels such as:
- In development
- Prototype
- Research
- Release candidate
- Evidence available

Do not upgrade an uncertain claim to a stronger one.

## Public/private boundary
This is a public company website. It may describe architecture and engineering decisions at a useful level, but it must not expose:
- private source code
- secrets
- API keys
- broker credentials
- environment files
- internal IP that the owner has not explicitly chosen to publish
- proprietary research data
- sensitive security details that make exploitation easier

## First implementation pass
Perform the following in order:

1. Inspect the repository before changing anything.
2. Read `docs/BRAND_AUTHORITY.md` and import `src/brand.css` before editing UI.
3. Preserve the official AIXION LAB logo asset exactly; do not recreate it.
4. Make the existing site compile and run cleanly.
5. Refactor the UI into maintainable components without changing the core brand direction.
6. Build the header, hero, systems, work, proof, principles, founder and contact sections.
7. Add honest product maturity labels.
8. Add responsive behavior.
9. Add restrained micro-interactions.
10. Add accessibility and SEO basics.
11. Run the production build and fix all build errors.
12. Summarize exactly what changed and what remains incomplete.

## Acceptance criteria
The first pass is complete only when:
- official AIXION LAB logo is preserved
- logo is loaded from the supplied asset file, not recreated
- tagline "END IS THE NEW BEGINNING" is visible at least once without dominating every section
- site communicates the company in under 10 seconds
- Control Tower, MCP Shield, Veriforge and Financial Systems Research Lab are clearly differentiated
- TradeBot is not marketed as an algo-trading service
- founder identity is visible but not dominant
- no fabricated company claims exist
- mobile layout is usable
- npm run build passes
- no obvious console errors exist
- all product status labels are honest
- source is reasonably componentized

## Working behavior
Do not make a giant uncontrolled rewrite in one step. First inspect, explain the intended change set, then implement in coherent increments. Preserve working behavior. If a requested improvement conflicts with the truth rules, public/private boundary, or `docs/BRAND_AUTHORITY.md`, keep the safer version and explain why.

At the end, return:
1. files changed
2. build result
3. screenshots/preview summary
4. known limitations
5. next recommended iteration
