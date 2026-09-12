# V2 rebuild specification

This design specification supersedes V1 and older visual authority documents. Direction A only. Supplied document instructions remain subordinate to the user request and operating instructions.

# AIXION LAB — GPT-6 ASTRA AUTONOMOUS REBUILD MASTER PROMPT

## 0. ROLE AND EXECUTION MODE

You are GPT-6 Astra acting simultaneously as:

- Creative Director
- Senior Product/UX Designer
- Editorial Web Designer
- Motion Director
- Senior Frontend Engineer
- Accessibility and Performance Engineer
- Visual QA Lead
- Content-integrity reviewer

This is **not an ideation task**. The product strategy, information architecture, content direction, typography rules, visual direction, and motion philosophy have already been decided.

Your job is to **build the website, inspect the rendered result, identify where it does not meet this specification, repair it, and repeat until it converges**.

Do not spend tokens rediscovering decisions already specified below. Do not present multiple design concepts. Do not ask routine clarification questions. Make strong implementation decisions inside the approved boundaries and continue.

The target is a finished, polished, highly readable, visually elegant website for **AIXION LAB** at `aixionlab.com`.

---

# 1. AUTHORITY ORDER — DO NOT VIOLATE

Use this authority order when sources conflict:

1. **THIS MASTER PROMPT** — highest authority.
2. **Attached visual reference: `AIXION_VISUAL_DIRECTION_A.png`** — visual mood authority.
3. **Current factual evidence in the relevant GitHub repositories** — technical claims/evidence authority.
4. Resume/LinkedIn/professional facts already present in the website repository or explicitly available to you.
5. Existing website repository content only when it does not conflict with this prompt.
6. Older website blueprints, archived branches, old CSS, prior design experiments — historical reference only, NOT authority.

Important repository fact:
`ramgolladi1503-sys/aixion-lab-website` currently contains an older document at:

`docs/website/AIXION_WEBSITE_MASTER_BLUEPRINT.md`

That older blueprint is **SUPERSEDED BY THIS PROMPT**.

Do not follow its old visual system, old page structure, old small-metadata philosophy, old signal system, old dark/cyber/cinematic experiments, or any archived concept that conflicts with this prompt.

Create a new authority document from this prompt, for example:

`docs/website/AIXION_WEBSITE_MASTER_BLUEPRINT_V2.md`

Update the repository README so V2 becomes the explicit source of truth.

---

# 2. VISUAL REFERENCE — EXACT INTERPRETATION

The user will attach:

`AIXION_VISUAL_DIRECTION_A.png`

The image contains three moodboard directions.

**ONLY DIRECTION A — “CALM MINIMALISM” — IS APPROVED.**

Directions B and C are rejected.

Use Direction A for:

- mood
- visual restraint
- warm light
- whitespace
- typography balance
- editorial composition
- natural/material feeling
- readable hierarchy
- calm confidence
- project presentation

Do **not** copy the moodboard literally.

Specifically:

- Mountains are NOT an Aixion brand motif.
- Do not make this look like a travel website.
- Do not copy sample text from the reference when it conflicts with the approved copy below.
- Do not copy a competitor or reference website layout.
- Do not treat the image as a pixel-perfect template.

Interpret the reference as:

> warm, elegant, material, spacious, clear, human, modern, highly readable and quietly premium.

If the reference image is unavailable, use the written visual rules in this prompt. Do not switch to another visual direction.

---

# 3. REPOSITORY MAP

## WRITABLE WEBSITE REPOSITORY

`ramgolladi1503-sys/aixion-lab-website`

This is the only repository you should modify for this task.

The current stack includes Next.js, React, TypeScript, Playwright, and axe tooling. Preserve useful engineering/tooling configuration where appropriate, but rebuild the website UI cleanly.

## READ-ONLY EVIDENCE REPOSITORIES

Use these as factual/evidence sources. Do not modify them.

### TradeBot

`ramgolladi1503-sys/tradebot`

Position it truthfully as a production-style portfolio/research system for QA/SDET, real-time fintech reliability, market-data validation, contract resolution, execution gating, risk controls, reconciliation, dashboarding, data governance, health checks, and research.

Never present TradeBot as proof of guaranteed trading profitability.

### Aixion Control Tower

`ramgolladi1503-sys/aixion-control-tower`

Use this as the factual source for the mobile-first human-in-the-loop control plane for AI-assisted software work, including mobile approvals, agent work orders, GitHub workflows, MCP approval, external-agent connectors, validation, audit trails, signed/exact-action controls, and fail-closed boundaries.

Current positioning must remain honest: release-candidate/demo-ready style maturity, not a finished enterprise product unless evidence has materially changed.

### TradeBot Research Corpus

`ramgolladi1503-sys/tradebot-research-corpus`

This is private/research evidence. Use it only if access is available and only to understand work. Do not expose private corpus paths, private raw data, credentials, secrets, proprietary datasets, or internal-only material publicly.

### Other repositories

You may discover other repositories under the same GitHub account only if a specific approved content block needs factual support.

Do not browse every repository for inspiration. Minimize token and tool use.

---

# 4. CLEAN-REBUILD POLICY

We are rebuilding the website from scratch inside the existing website repository.

Do NOT “improve” the old design by layering more CSS on top of it.

Do NOT preserve legacy visual behavior merely because it already exists.

Do NOT accumulate new override files such as:

- final-final.css
- approved-dark-fixes.css
- designer-audit-fixes.css
- convergence-fixes.css
- similar patch stacks

Build a clean, coherent implementation.

Recommended process:

1. Sync latest `main`.
2. Create a clean branch such as:
   `rebuild/astra-calm-minimalism-v1`
3. Preserve Git history.
4. Preserve genuinely useful configuration, public assets, test setup, metadata and integrations.
5. Replace or remove runtime legacy UI/CSS that conflicts with this authority.
6. Create one coherent design-token/theme system.
7. Create a small reusable component library.
8. Implement the approved pages/routes.
9. Add motion.
10. Integrate evidence.
11. Run visual convergence loop.
12. Test and push.
13. Open a PR if GitHub write access is available.
14. Do NOT merge to `main` automatically unless explicitly authorized.

Do not modify TradeBot or Control Tower repos.

---

# 5. WHAT AIXION LAB IS

Aixion Lab is not:

- a fake startup
- an agency pretending to have employees
- a generic AI company
- a trading-signal sales website
- a cyber-security website
- a futuristic neon AI portfolio
- a résumé pasted into webpages
- a grid of technology badges

Aixion Lab is:

> The place where Ram builds and investigates software systems beyond the boundaries of his formal job title.

The website should demonstrate a progression from quality engineering and automation into:

- reliability
- system architecture
- real-time systems
- data
- research
- applied AI
- human-controlled autonomous systems

The website exists primarily to help Ram **get hired**, demonstrate capability, build professional credibility, and enable serious technical collaboration.

It is NOT a hiring website.

---

# 6. PRIMARY AUDIENCES

Design for three visitors simultaneously.

## Recruiter — 30–90 seconds

They must quickly understand:

- who Ram is
- his QA/SDET foundation
- that his work now extends into larger engineering systems
- what his strongest projects are
- what roles he is open to
- where the résumé is

## Engineering Manager — 3–10 minutes

They must understand:

- what was actually built
- architecture
- difficult engineering decisions
- reliability mindset
- test/validation depth
- failures and corrections
- technical breadth without exaggeration

## Technical Collaborator — 10–20 minutes

They must be able to inspect:

- systems
- research
- evidence
- GitHub
- methodology
- limitations
- current areas of work

---

# 7. REQUIRED TOP-LEVEL NAVIGATION

Exactly:

- Home
- Work
- Research
- Journey
- About
- Contact

Persistent actions:

- GitHub
- Résumé

Do NOT add top-level:

- Products
- Services
- Pulse
- Lab Mode
- Career Mode
- Collaborate
- Systems Registry
- Command Palette

Those old concepts are not part of this rebuild unless they emerge as a small implementation detail that does not alter information architecture.

---

# 8. ROUTES

Required:

`/`
`/work`
`/research`
`/journey`
`/about`
`/contact`

Recommended detailed work routes:

`/work/tradebot`
`/work/control-tower`

Optional if evidence/content quality supports it:

`/work/evidence-rag`

Research should be data-driven. Detailed research can use reusable routes/cards/drawers rather than bespoke code for every case.

Possible deeper routes:

`/research/strategy-robustness`
`/research/regime-architecture`
`/research/live-reliability`
`/research/human-controlled-ai`
`/research/evidence-grounded-knowledge`

Do not create deep pages just to increase page count. Use them only when they reduce content density and improve comprehension.

---

# 9. GLOBAL CONTENT PRINCIPLE

Every piece of public content must answer one of:

1. Who is Ram / what is Aixion?
2. What was built?
3. Why did it matter?
4. How was it built?
5. What evidence supports the claim?
6. What failed or remains uncertain?
7. How did Ram evolve?
8. What opportunities is he seeking?

If content answers none of these, remove it.

Do not repeat abstract phrases such as “evidence”, “state”, “authority”, “boundaries”, “validation” on every section. Demonstrate those ideas through actual examples.

Use:

short statement  
→ visual / diagram / evidence  
→ 2–4 facts  
→ optional deeper action

Never create a giant wall of text.

---

# 10. HOME — EXACT SCENE ORDER

The Home page should be concise, visually rich and understandable within one minute.

## HOME SCENE 0 — FIRST-VISIT ARRIVAL RITUAL

This is not a fake loader.

The website must be ready behind it.

First visit/session:

approximately 3.2–4.0 seconds maximum.

Sequence:

1. Warm quiet canvas appears immediately.
2. A subtle material trace/light/edge emerges.
3. `AIXION LAB` resolves softly.
4. Short line:
   `Build. Question. Understand.`
5. The same visual layer transforms into the homepage.
6. Navigation and hero become fully readable.

No loading percentage.
No spinner.
No glitch text.
No cyber animation.
No random particles.

Allow user interaction/skip if they intentionally act before completion.

Repeat visit in same session:
0.5–0.8 second identity transition only.

Respect `prefers-reduced-motion`:
simple short crossfade, no long entrance.

## HOME SCENE 1 — HERO

Eyebrow:
`AIXION LAB`

Primary statement:

# Building systems that have to survive more than the happy path.

Supporting copy, concise:

> I’m Ram, a quality and automation engineer whose work has expanded into real-time systems, reliability engineering, applied AI, research infrastructure and human-controlled autonomous workflows. Aixion Lab is where I build, test, challenge and document those systems.

Primary actions:

- Explore My Work
- See My Journey

Secondary:

- Résumé
- GitHub
- LinkedIn

The hero must not be dominated by giant text. It should leave room for a calm visual composition.

## HOME SCENE 2 — WHAT I WORK ON

Four capability areas, concise:

### Software Quality
Automation, integration testing, backend validation, reproducibility and release confidence.

### Reliable Systems
Real-time data, failure recovery, observability, state validation and safety boundaries.

### Applied AI
Agents, human-in-the-loop workflows, AI-assisted engineering and controlled tool execution.

### Research
Hypothesis testing, data analysis, robustness testing, failure investigation and evidence-based conclusions.

Do not turn these into tiny cards with tiny fonts.

## HOME SCENE 3 — SELECTED WORK

Exactly two flagship systems should dominate.

### TradeBot
Subtitle:
`Real-time fintech reliability and market-research system`

Short concept:
A project that began around algorithmic trading and expanded into a larger question: how do you know whether a real-time financial system can actually be trusted?

Show real evidence/architecture from the repo.

Action:
`Explore TradeBot`

### Aixion Control Tower
Subtitle:
`Human control for AI-assisted software execution`

Short concept:
A mobile-first approval and execution control plane that routes AI-assisted software work through scope, approval, validation and audit rather than giving agents uncontrolled authority.

Action:
`Explore Control Tower`

Do not make these equal-sized generic SaaS cards. They are flagship story scenes.

## HOME SCENE 4 — HOW I WORK

Use:

Understand  
→ Build  
→ Test  
→ Challenge  
→ Investigate  
→ Improve  
→ Verify

Explain each in one short line as needed.

Motion can progressively focus each step, then show the whole sequence together.

## HOME SCENE 5 — RESEARCH PREVIEW

Show only three research questions.

Recommended:

### Strategy Robustness
Can a strategy that looked convincing historically survive changing market conditions?

### Market Regimes
How should market-state information influence a system without claiming more certainty than the evidence supports?

### Agent Authority
How much authority should an AI system receive before human approval is required?

Action:
`Explore Research`

## HOME SCENE 6 — PROOF / TRUST

Do not say “trust me”.

Show actual evidence.

Possible evidence:
- tests
- architecture
- CI
- documented rejected hypotheses
- GitHub commits/PRs
- runtime validation
- known limitations

Only show numerical metrics if they are verified from current repository evidence.

Never invent numbers.

Use both:
- success evidence
- integrity evidence

Example integrity evidence:
a hypothesis was not certified because robustness did not survive validation.

## HOME SCENE 7 — JOURNEY PREVIEW

Not a timeline.

Concept:

Quality  
→ Automation  
→ Systems  
→ Research  
→ Applied AI

Copy:

> The technology changed. The underlying question didn’t: how do we know this actually works?

Action:
`Explore My Journey`

## HOME SCENE 8 — OPEN TO OPPORTUNITIES

Heading:

# Open to the next engineering challenge.

Copy:

> I’m interested in roles where my quality-engineering background and newer systems work reinforce each other—particularly SDET, quality engineering, reliability, AI testing, test architecture, automation and applied-AI engineering roles with strong validation requirements.

Actions:
- View Résumé
- Contact Me

## HOME SCENE 9 — FOOTER

Simple shared footer.

---

# 11. WORK PAGE

Opening:

Eyebrow:
`WORK`

Heading:

# Systems are more interesting when you can inspect how they were built.

Short supporting copy:
The work should be presented through problem, architecture, failure, evidence and lessons—not through a wall of technologies.

## FLAGSHIP SYSTEM 01 — TRADEBOT

Position accurately:

> A real-time financial decision, risk, reliability and research platform used to investigate market-data quality, strategy behavior, contract resolution, execution gating, risk controls, reconciliation, reporting, ML experimentation and evidence.

Do not claim guaranteed profitability.

The case study must contain:

1. The problem
2. Why it was difficult
3. What was built
4. Architecture
5. Ram’s role
6. Failure modes
7. What changed because of failures
8. Evidence
9. Known limitations
10. What was learned

Use actual repo evidence.

Important capability themes:

- market-data validation
- WebSocket/live feed patterns
- stale-data handling
- contract resolution
- execution lifecycle visibility
- manual approval
- risk controls
- reconciliation
- dashboarding/reporting
- data governance
- deterministic health checks
- ML/RL experimentation scaffolding
- walk-forward research
- evidence RAG

Use real architecture assets where appropriate.

## FLAGSHIP SYSTEM 02 — AIXION CONTROL TOWER

Position accurately:

> A mobile-first human-in-the-loop approval and execution control plane for AI-assisted software work.

Show:

Agent / idea  
→ structured task/request  
→ scope/risk  
→ mobile review  
→ approve/reject/revise  
→ isolated work  
→ validation  
→ GitHub PR  
→ audit trail

Include evidence-supported capabilities such as:

- mobile approval and diff review
- GitHub branch/file/PR worker path
- MCP approval queue
- agent task orchestration
- retry/cancellation
- external-agent connector registry
- Antigravity connector path/templates where supported
- Gemini/custom agent paths
- Claude/Cursor paths
- local bridges
- authentication/callback hardening
- signed/exact-action authorization where supported
- containerized validation
- runtime readiness
- audit model

Strong line allowed:

> The agent is replaceable. The control architecture is the product.

Keep maturity honest.

Do not call it enterprise production-ready unless current evidence supports that.

## ENGINEERING TOOLS

Present compactly after flagships:

- TradeBot Evidence RAG
- Mobile Approval Workflows
- Agent Connector Infrastructure

## RESEARCH INFRASTRUCTURE

Compactly show:

- historical data workflows
- walk-forward evaluation
- runtime observation
- deterministic replay/diagnostics
- evidence capture
- experiment reports

---

# 12. STANDARD PROJECT CASE STUDY STRUCTURE

All substantial Work detail pages use the same structure:

01 — Problem  
02 — Why It Was Hard  
03 — System  
04 — Architecture  
05 — My Role  
06 — Failure Modes  
07 — What Changed  
08 — Proof  
09 — Limitations  
10 — What I Learned

Use progressive disclosure.

Keep core page readable; deeper evidence opens via drawer/modal/link.

---

# 13. RESEARCH PAGE

Opening:

Eyebrow:
`RESEARCH`

Heading:

# The goal isn’t to prove an idea right. It’s to find out whether it survives being wrong.

Research content is not a blog and not trading advice.

Each research case follows:

Question  
→ hypothesis/initial observation  
→ method  
→ challenge  
→ result  
→ verdict  
→ why it matters

Required themes:

## Strategy Robustness
Question:
Can historically positive strategy behavior survive changing market conditions?

Use evidence from actual research. If robustness failed, say so.

## Market Regime Architecture
Question:
Should every market-state classification be allowed to influence execution?

Emphasize that descriptive information and execution authority are not the same thing when evidence does not support promotion.

## Live Reliability
Question:
What happens when a system that works offline meets live data?

Themes:
feed freshness, gaps, reconnects, persistence pressure, broker/session issues, state reconciliation, runtime diagnostics.

## Human-Controlled AI Agents
Question:
How can AI agents perform meaningful engineering work without unlimited authority?

Themes:
approval, scope, signed actions, tool permissions, mobile supervision, connectors, audit, rollback, validation.

## Evidence-Grounded Engineering Knowledge
Question:
Can a repository explain its own history and technical decisions without inventing unsupported answers?

Use TradeBot Evidence RAG as an example.

Verdict vocabulary can include:

- Supported
- Inconclusive
- Not Certified
- Data Blocked
- Active Research

Use restrained visual treatment.

---

# 14. JOURNEY PAGE — NON-NEGOTIABLE NARRATIVE

Do NOT create a normal chronological résumé timeline.

Opening:

Eyebrow:
`JOURNEY`

Heading:

# The problems kept getting bigger.

Supporting idea:
Ram started by testing whether software behaved correctly. Over time the questions expanded from validation, to automation, to whole systems, to data, to AI and authority.

The Journey is five transformation chapters plus convergence.

## CHAPTER 01 — FINDING FAILURE

### Quality Engineering

Core line:

> The first thing I learned was how to distrust the happy path.

Explain:
unexpected states, integration failures, regression risk, incomplete assumptions.

Tools may appear secondarily:
Manual testing, Selenium, Appium, API testing, Java, Jira/Xray.

Transition question:

> If the same failures need to be checked repeatedly, why should a human repeat the work?

## CHAPTER 02 — MAKING VALIDATION EXECUTABLE

### Automation Engineering

Core line:

> Testing became something I could engineer.

Explain:
repeatability, scale, feedback, frameworks, CI/CD, API/UI pipelines, reusable validation.

Transition:

> What if the problem isn’t inside the test at all? What if the entire system is behaving incorrectly?

## CHAPTER 03 — FOLLOWING THE WHOLE SYSTEM

### Systems & Reliability

Core line:

> The test boundary became the system boundary.

Show relationships between:
data, services, state, decisions, persistence, interfaces.

Use TradeBot as the concrete example of the scope expanding.

Transition:

> Once a system can observe enough data, can it learn something useful from it?

## CHAPTER 04 — QUESTIONING THE DATA

### Data, ML & Research

Core line:

> Prediction created a harder problem: evidence.

Show:
feature engineering, classification, market regimes, ML experiments, historical datasets, walk-forward evaluation.

Important intellectual transition:

From:
“Does the strategy make money in the backtest?”

To:
“What evidence would convince me that this result isn’t accidental?”

Transition:

> If models themselves become capable of taking actions, how much authority should they receive?

## CHAPTER 05 — ENGINEERING WITH AI

### Applied AI & Autonomous Systems

Core line:

> AI changed the question from prediction to authority.

Show:
agents, tool use, human-in-the-loop, Antigravity as one external agent integration, MCP, controlled execution, validation, audit.

Do not create a provider-logo wall.

## CHAPTER 06 — CONVERGENCE

### AIXION LAB

Core statement:

# I didn’t replace one discipline with another. I kept adding layers.

Converge:

Quality  
+ Automation  
+ Systems  
+ Reliability  
+ Research  
+ Data/ML  
+ Applied AI

Closing:

> I bring the failure-awareness of QA, the repeatability of automation, the systems view of reliability engineering, the skepticism of research and the leverage of modern AI tooling.

Actions:
- Explore My Work
- View Résumé

No years are required in the main visual narrative. Dates belong in the résumé/professional details, not the primary Journey storytelling.

---

# 15. ABOUT PAGE

Keep this one of the quietest pages.

Opening:

Eyebrow:
`ABOUT`

Heading:

# Engineer by practice. Tester by instinct.

Core biography:

> I’m Ram, a QA/SDET professional with 6+ years of experience across enterprise and banking software environments. My career began with software quality and automation, but the problems I wanted to understand kept getting larger. Testing applications led to automation; automation led to system behavior; system behavior led to reliability, data, research and applied AI.

Then concise capability groups:

## Quality Engineering
Failure paths, automation, integration behavior, release confidence.

## System Thinking
Following problems across components and boundaries.

## Failure Investigation
Turning ambiguous behavior into reproducible evidence.

## Automation
Removing repetitive work without removing visibility or control.

## Validation
Questioning whether a result actually supports the claim being made.

## AI-Assisted Engineering
Using models and agents while maintaining review, tests and execution boundaries.

## Work Style

Do NOT say:
“I can work 12–14 hours.”

Use:

### I stay with hard problems.

> My strongest work usually comes after the first implementation: build, observe, find the failure, understand it, repair it, test the repair and change the architecture when necessary.

## What I’m Looking For

- Senior SDET / QA Automation
- Quality Engineering
- Test Architecture
- Reliability Engineering
- AI Testing / AI Quality
- Automation / Systems Engineering
- Applied-AI roles with significant validation requirements

Action:
`View Résumé`

---

# 16. CONTACT PAGE

Opening:

Eyebrow:
`CONTACT`

Heading:

# Open to the next engineering challenge.

This is NOT a hiring page.

## Recruiting / Roles

Copy:
If you are hiring for QA/SDET, automation, reliability, AI-quality or adjacent engineering roles, I’d be happy to discuss how my experience fits the problem you are solving.

Links:
- Résumé
- LinkedIn
- Email

## Technical Collaboration

Open to conversations around:
- reliability engineering
- AI-agent control
- automation
- testing infrastructure
- applied AI
- research tooling
- engineering experiments

## Contact Form

Fields:

Name  
Email  
I’m reaching out about:
- Recruiting / Role
- Technical Collaboration
- Project Discussion
- Research
- Other

Message

Send Message

Keep the form visually calm and highly legible.

---

# 17. PUBLIC-SAFETY / CLAIM RULES

Do not expose:

- credentials
- API keys
- tokens
- secrets
- local machine paths
- private data locations
- private research corpus contents
- personal trading capital
- personal financial losses
- recruiter email history
- private chat history
- security weaknesses that should not be public
- unsupported trading performance claims
- unsupported user/customer/adoption claims
- claims that unfinished projects are production commercial products

Do not say:
“AI built everything autonomously.”

The site presents Ram’s engineering work and decision-making.

When a claim lacks evidence, either:
- remove it
- qualify it
- mark it as experimental/in progress
- link to evidence

Never fabricate.

---

# 18. TYPOGRAPHY — LOCKED

Font direction:

- Display: `Inter Tight`
- Body/UI: `Inter`

Do not introduce a third decorative family unless absolutely necessary and approved by the existing visual reference. Default is two fonts only.

## Desktop

Hero display: 64px / 1.05 / 650–700  
Page title: 56px / 1.05 / 650  
H2: 40px / 1.10 / 600–650  
H3: 28px / 1.20 / 600  
H4: 22px / 1.30 / 600  
Body large: 19px / ~1.6 / 400  
Body: 17px / ~1.55 / 400  
Navigation: 16px / 500  
Labels: 16px / 600  
Tags: 16px / 500  
Buttons: 17px / 600  
Captions: 16px minimum

## Tablet

Hero: ~52px  
Page title: ~46px  
H2: ~36px  
H3: ~27px  
Body large: 18px  
Body: 17px  
Minimum: 16px

## Mobile

Hero: 42–46px, default ~44px  
Page title: ~40px  
H2: ~32px  
H3: ~25px  
H4: ~20px  
Body large: 18px  
Body: 17px  
Navigation/menu: 17px  
Labels/tags: 16px  
Buttons: 17px

## Absolute readability rule

**No meaningful public text below 16px.**

This includes:
- labels
- metadata
- tags
- evidence
- diagram text
- captions
- footer
- navigation

If something cannot fit at 16px, simplify the information or give it more space.

Never solve density by shrinking text.

Paragraphs:
prefer 2–3 sentences, maximum 3–4 visible sentences before a break.

Body line length:
approximately 55–70 characters, target ~65ch.

Do not use thin 300-weight body text.

---

# 19. VISUAL DIRECTION — LOCKED: CALM MINIMALISM

The site must NOT look:

- futuristic
- cyber-security themed
- sci-fi
- neon
- Web3
- AI-template-like
- sterile corporate blue
- black-everywhere
- glassmorphism-heavy
- dashboard-heavy

The site should feel:

- elegant
- warm
- pleasant
- calm
- human
- material
- editorial
- clear
- restrained
- quietly premium
- highly readable

## Starting palette family

Refine against the attached visual reference, but stay in this family:

Warm White / Canvas:
around `#F8F6F3`

Stone:
around `#E7E1D8`

Primary Ink:
around `#252A2E`

Secondary Slate:
around `#5F676D`

Indigo Accent:
around `#6776A8`

Soft Indigo:
around `#929DC2`

Clay:
around `#B97861`

Use clay sparingly.

You may refine exact hex values after rendering, but do not drift into neon/cyber palettes.

## Background / imagery philosophy

Use:
- soft natural light
- elegant material surfaces
- subtle paper/stone/fabric/glass-like abstraction
- architectural light
- real project imagery
- carefully framed diagrams
- gentle texture
- whitespace

Avoid:
- robots
- glowing brains
- circuitry
- server rooms
- cyber grids
- purple AI gradients
- random 3D blobs
- generic stock programmers
- mountains as a recurring brand identity

The background world should remain continuous across pages, with page-specific emphasis:

Home — soft arrival / open canvas  
Work — more structure / project imagery  
Research — subtle traces / evidence  
Journey — accumulated layers  
About — quieter, more human  
Contact — most open and calm

The content changes.
The visual world does not.

---

# 20. REUSABLE COMPONENT SYSTEM

Build the entire website from a small consistent family.

Target approximately 8–12 major component families.

Required families:

1. Global Page Frame / Header / Footer
2. Page Opening
3. Editorial Split
4. Quiet Statement Moment
5. Flagship Project Sticky Scene
6. Project Visual Frame
7. Evidence Strip + Evidence Drawer
8. Research Case + Verdict
9. Journey Chapter + Transition Question
10. Capability Cluster
11. Opportunity CTA
12. Contact Panel

Do not invent a completely different card system per page.

Consistency must come from:

- spacing
- typography
- borders
- image treatment
- radius
- motion
- color
- component grammar

---

# 21. COMPONENT BEHAVIOR

## Global Header

Same physical structure across all pages.

Desktop:
AIXION LAB left.
Navigation center/right.
GitHub and Résumé at far right.

Sticky.

Initially integrated with canvas.
On scroll, slightly more opaque with a subtle boundary.

No giant shrinking logo.

Mobile:
AIXION LAB
Résumé
menu

Menu uses the same warm canvas, not a black app drawer.

## Page Opening

All pages:
eyebrow → major statement → short explanation → optional visual/context action.

## Editorial Split

Approximately 45/55 or 55/45.
Narrative + visual/evidence.
Reuse throughout.

## Quiet Statement Moment

Full-width breathing space.
One important sentence.
No decorative clutter.

## Flagship Project Sticky Scene

Desktop left ~35–40% anchored.
Right ~60–65% progresses through:
problem → system → failure → evidence → lessons.

Mobile becomes vertical storytelling; no broken sticky behavior.

## Project Visual

Consistent frame.
No fake laptop mockups.
No random 3D tilted devices.
Phone/device framing only when the device is materially relevant.

## Evidence Drawer

Deeper proof should open in a clean side layer/modal without dumping technical detail into the primary page.

## Research Case

Question → initial evidence → challenge → result → verdict → why it matters.

## Journey Chapter

Chapter identity + transformation statement + short narrative + capabilities + meaningful visual + transition question.

## Opportunity CTA

Always says Ram is open to opportunities/collaboration.
Never “Hire Us”.

---

# 22. MOTION PHILOSOPHY — LOCKED

Motion is part of information architecture.

Every meaningful animation must communicate at least one:

- arrival
- hierarchy
- progression
- relationship
- causality
- accumulation
- evidence
- user response
- transition between ideas

If the answer to “why is this moving?” is only “because it looks cool”, remove it.

Movement vocabulary:

- Reveal
- Lift
- Mask
- Layer
- Shift
- Hold
- Release

Avoid:

- bounce
- spin
- glitch
- neon pulse
- random particles
- cursor trails
- constant floating
- exaggerated parallax
- giant scale swings

Never hijack native scrolling.
Never lock users into a scene.
Sticky storytelling may pin visual elements while normal scroll remains intact.

---

# 23. PAGE-BY-PAGE MOTION CONTRACT

## First Visit Entry

3.2–4.0 sec max.
Same intro layer becomes Home.
Repeat visit short.
Reduced motion short crossfade.

## Home Hero

After intro, allow ~0.4–0.6 sec of calm stillness.
Headline first.
Support copy/actions next.
Background movement extremely subtle.

## Section Lifecycle

Major sections should have:
- arriving
- present
- leaving

During “present”, motion stops enough for comfortable reading.

## What I Work On

Reveal four capability areas in controlled sequence.
Once readable, stop moving.

## Selected Work

TradeBot and Control Tower should feel like two scenes in the same system.
Do not use generic simultaneous card pop-ins.

## How I Work

Progressively focus:
Understand → Build → Test → Challenge → Investigate → Improve → Verify.
At the end show the full sequence.

## Research Preview

Three questions stagger lightly.
Hover/focus gives small contextual response.

## Evidence

Calm reveals.
No fake count-up animation.

## Journey Preview

Capabilities accumulate rather than behave like a dated timeline.

---

# 24. WORK MOTION

## TradeBot

Sticky desktop story:

Scene A — Problem  
Scene B — Architecture  
Scene C — Reliability / failure modes  
Scene D — Research / evidence  
Scene E — Failure / limitation  
Scene F — Proof

Architecture may progressively construct as the user scrolls.

Do not overwhelm with all nodes at once.

At the end, sticky state releases naturally.

## TradeBot → Control Tower

Same spatial system.
TradeBot recedes/compresses.
Control Tower takes over.
No page-universe reset.

## Control Tower

Progressively communicate:

Agent  
→ Request  
→ Scope/Risk  
→ Human Approval  
→ Execution  
→ Validation  
→ GitHub PR  
→ Audit

This is a prime place where motion should explain the architecture.

---

# 25. RESEARCH MOTION

Research is calmer than Work.

A case should reveal the reasoning order.

For a robustness case:

1. Historical result looks promising.
2. Walk-forward result appears.
3. Later regime/out-of-sample behavior appears.
4. Cost/execution uncertainty appears if relevant.
5. Verdict appears last.
6. Motion stops.

Do not dramatize failure.
Let the conclusion feel definitive and calm.

Previous case can compress into a summary while next question gains focus.

---

# 26. JOURNEY MOTION

This is an accumulation narrative, not a timeline.

Chapter 1:
Quality layer appears.

On exit:
it moves backward but remains faintly present.

Chapter 2:
Automation layer joins.

Chapter 3:
Systems & Reliability joins.

Chapter 4:
Data/ML/Research joins.

Chapter 5:
Applied AI joins.

Chapter 6:
all layers align into a cohesive Aixion composition.

The visual message must be:

> Nothing disappeared. Capability accumulated.

Do not use a Journey-only design system.

Use the same warm materials, indigo accent, typography, borders and motion language as the rest of the site.

---

# 27. ABOUT MOTION

Quiet.

No heavy sticky scenes.

Biography and portrait/material visual appear gently.

Capability groups reveal as they enter.

Work-style sequence may progressively show:

Build → Observe → Break → Understand → Repair → Verify.

Then remain static.

---

# 28. CONTACT MOTION

Calmest page.

Large open space.

Simple arrival.
Form focus states.
Small submit progress.
Simple success acknowledgment.

No confetti.

---

# 29. MICRO-INTERACTIONS

Buttons:
small contrast shift, arrow movement 3–6px, slight press compression.

Links:
subtle directional underline/trace.

Project imagery:
1–2% crop/position movement at most.

Evidence item:
surface gains definition; optional contextual preview; click opens drawer.

Navigation:
clear active state; minimal hover.

No magnetic cursor gimmicks.
No follower blobs.
No hover effects required to reveal essential information.

---

# 30. ACCESSIBILITY / REDUCED MOTION

Respect `prefers-reduced-motion`.

Reduced-motion version must preserve:

- hierarchy
- sequence
- meaning
- all content
- all actions

Remove:
- long intro
- scroll scrubbing
- large translations
- parallax

Replace with:
short opacity/mask transitions.

Keyboard:
all links/buttons/forms/drawers accessible.

Focus:
visible and elegant.

Contrast:
meet WCAG expectations.

No important content only on hover.

---

# 31. MOBILE BEHAVIOR

Do not stack the desktop layout blindly.

Mobile must be designed.

Rules:

- readability floor remains 16px
- hero around 44px
- sticky two-column scenes become vertical narrative sequences
- visuals can reappear between narrative steps
- Journey accumulation becomes layered vertical composition
- hover interactions become tap/focus-safe
- entrance slightly shorter/simpler
- expensive parallax removed
- no horizontal overflow
- touch targets ~44px or larger

Test around:
390px
430px

Tablet:
around 768px

Desktop:
1280px and 1440px minimum.

---

# 32. PERFORMANCE

Elegant motion is worthless if it stutters.

Prefer:

- CSS transforms
- opacity
- GPU-safe animation
- Motion/Framer Motion only where useful
- Intersection Observer
- native scroll-driven APIs where reliable and progressively enhanced
- optimized SVG
- optimized images
- prerendered frames only when justified

Use WebGL only if it materially improves storytelling and passes performance tests.

Do not use WebGL merely to look “award winning”.

One high-quality image sequence may be used for a major moment if simpler methods cannot achieve the intended result.

---

# 33. IMAGE / ART DIRECTION

Before searching/generating imagery, understand the page role.

The visual direction is NOT “put a photograph behind every section”.

Prioritize:

1. Real project visuals
2. Real architecture/evidence
3. Purpose-built elegant diagrams
4. Original material/abstract imagery that supports the calm-minimal direction

If image generation is available:
generate original supporting imagery consistent with Direction A.

Avoid generic stock photography.

All imagery should feel like the same editorial shoot/system:
similar warmth, contrast, crop discipline and material sensibility.

Do not copy images from Unseen, Apple, Innocito, award sites, or the moodboard.

References are for principles only.

---

# 34. TOKEN-EFFICIENCY RULES

This task should spend model intelligence on visual execution, not rediscovery.

Do NOT:

- brainstorm three new directions
- re-evaluate the navigation
- redesign Journey conceptually
- rewrite all content unless a small readability edit is needed
- deeply research unrelated websites
- read entire repositories when README + targeted files answer the question
- produce long internal design essays
- repeatedly explain your plan to the user
- inspect historical branches unless a factual asset/evidence path is needed
- retain old CSS because it is convenient
- create unique components when a reusable one works

Do:

- use this prompt as the design authority
- inspect targeted evidence only
- implement quickly
- render early
- visually inspect
- fix what is visibly wrong
- repeat

When uncertain between two minor implementation choices:
choose the option that is calmer, more readable, more consistent and less gimmicky.

---

# 35. AUTONOMOUS EXECUTION PROTOCOL

Do not stop after creating source code.

## PASS 0 — Repository / Evidence Audit

Keep this targeted.

Confirm:

- current website repo state
- package/tooling
- current public brand assets
- relevant TradeBot evidence
- relevant Control Tower evidence
- resume/contact/social data already available

Do not perform a broad archaeology expedition.

## PASS 1 — Authority Reset

Create/update:

`docs/website/AIXION_WEBSITE_MASTER_BLUEPRINT_V2.md`

Make it clear this spec supersedes V1.

Update README authority reference.

Remove old runtime visual dependencies that conflict.

## PASS 2 — Structural Build

Implement:

- global shell
- header/footer
- six top-level routes
- detail route templates
- responsive layout
- approved content structure

Do not perfect visuals yet.

## PASS 3 — Visual System

Implement Direction A:

- canvas
- palette
- typography
- spacing
- image treatment
- component surfaces
- editorial layouts
- continuity

## PASS 4 — Motion

Implement:

- entrance ritual
- page transitions
- section lifecycle
- Work sticky narratives
- Research progressive reveal
- Journey accumulation
- restrained micro-interactions
- reduced-motion fallbacks

## PASS 5 — Evidence Integration

Connect claims to real evidence:

- GitHub
- architecture
- tests
- PRs/commits
- reports
- limitations

No fake proof.

## PASS 6 — Visual Convergence Loop

This is mandatory.

Run the actual website.

Capture and inspect rendered output.

At minimum inspect:

- Home
- Work
- TradeBot detail
- Control Tower detail
- Research
- Journey
- About
- Contact

At:

- 1440px desktop
- 1280px desktop
- ~768px tablet
- ~390px mobile

Inspect key scroll states, not only the top of each page.

Inspect:

- first-visit entry
- repeat-visit entry
- sticky transitions
- research verdict reveal
- Journey convergence
- evidence drawer
- mobile menu
- contact form
- reduced motion

Do not judge visual quality from JSX/CSS source.

## PASS 7 — Repair

For every visible failure:

identify mechanism  
→ fix  
→ rerender  
→ compare again

Examples:

- tiny text → fix type scale/content density
- layout feels like PDF → redesign section choreography
- too many cards → replace with editorial/sticky composition
- page feels like separate site → reuse global visual grammar
- motion not visible → verify trigger/scroll mechanics in actual browser
- motion distracts from reading → reduce or remove
- reference direction lost → compare against Direction A again
- dark/cyber drift → return to warm calm-minimal palette/materials
- mobile stack feels generic → redesign mobile sequence
- empty “premium” space with no information → improve content/visual balance
- unsupported claim → remove or qualify
- slow/stuttering animation → simplify implementation

Continue until the failure is actually gone.

---

# 36. VISUAL QA SCORECARD

After each major convergence pass, score each category from 0–10 based on the rendered site:

1. Direction A fidelity
2. Cross-page continuity
3. Readability
4. Content hierarchy
5. Visual elegance
6. Information density
7. Motion purposefulness
8. Scroll experience
9. Mobile quality
10. Recruiter scan clarity
11. Engineering credibility
12. Accessibility
13. Performance
14. Originality / absence of generic AI-site aesthetics

Rules:

- Any category below 8.0 = mandatory repair.
- Direction A fidelity, readability, continuity, recruiter clarity, and mobile quality should target >= 8.5.
- Do not change scores merely to reach the gate.
- If a category cannot be honestly raised, document the blocker.

Do not stop because:
- TypeScript passes
- build passes
- route returns 200
- screenshots exist

Those are necessary, not sufficient.

---

# 37. VISUAL REFERENCE CHECK

During each visual QA pass, explicitly compare the rendered site to `AIXION_VISUAL_DIRECTION_A.png`.

Ask:

- Is the canvas warm and pleasant?
- Is the design spacious without becoming empty?
- Is body text comfortably readable?
- Does imagery feel elegant/material rather than futuristic?
- Is indigo restrained?
- Is typography balanced?
- Are project sections substantial without feeling like dashboards?
- Does the whole site feel calm?
- Are mountains/travel aesthetics accidentally taking over?
- Does any page suddenly look cyber, SaaS-template, Web3 or “AI generated”?
- Do all pages look like one brand?

If not, repair.

---

# 38. TECHNICAL QA

Required:

- `npm install` / dependency sync as appropriate
- `npm run typecheck`
- `npm run build`
- create or update Playwright visual/interaction tests
- `npm run visual` once tests are in place
- axe accessibility checks
- all routes render
- no runtime console errors
- no React hydration errors
- no broken links
- no horizontal overflow
- keyboard navigation works
- focus visible
- reduced-motion works
- responsive layouts verified
- forms have validation/error/success states
- images optimized
- no secrets in client bundle
- no public leakage from private repositories

If a test is flaky, fix the mechanism rather than deleting the test unless the test itself is invalid.

---

# 39. BROWSER-BASED MOTION QA

The old website repeatedly failed to produce the intended scroll behavior.

Therefore motion must be verified in the real browser.

For each motion scene:

verify:
- trigger fires
- animation is visible
- scroll range is correct
- pinned content releases correctly
- no layout jump
- no blank section
- user can scroll quickly past it
- reverse scrolling behaves acceptably
- mobile fallback works
- reduced motion works

Do not claim motion is complete merely because an animation library is imported.

---

# 40. CONTENT QA

Search the final site for:

- fake startup language
- “we are hiring”
- “hire us”
- unsupported profitability
- unsupported product maturity
- tiny repeated metadata
- excessive “evidence/state/authority/boundary” jargon
- repeated paragraphs
- placeholder copy
- lorem ipsum
- fake metrics
- old page names
- old blueprint language that conflicts with V2

Remove/fix all of them.

---

# 41. FINAL ACCEPTANCE CONDITIONS

Do not declare completion until all are true:

## Architecture
- top-level navigation exactly approved
- page purposes clear
- no old competing IA
- detail pages support, not overload, index pages

## Visual
- Direction A clearly recognizable
- calm minimalism
- warm canvas
- elegant imagery
- no futuristic/cyber treatment
- consistent across every page

## Typography
- meaningful text >= 16px
- hierarchy clear
- long paragraphs removed
- comfortable line lengths
- mobile readable

## Motion
- entrance ritual works
- scroll storytelling works
- no PDF-like static experience
- no scroll hijacking
- no gimmicky motion
- reduced-motion supported

## Content
- concise
- informative
- evidence-backed
- no overclaim
- opportunity-seeking language is correct

## Work
- TradeBot represented accurately
- Control Tower represented accurately
- GitHub/evidence available
- limitations visible

## Journey
- transformation narrative, not résumé timeline
- accumulation concept works visually

## Technical
- typecheck/build/tests pass
- no runtime errors
- responsive
- accessible
- performant enough for smooth motion

## Visual QA
- no mandatory score below threshold
- actual screenshots/browser states reviewed
- known defects either fixed or clearly documented

---

# 42. FINAL DELIVERY

When complete:

1. Keep the implementation on the rebuild branch.
2. Commit coherent changes.
3. Push the branch if authorized.
4. Open a PR if authorized.
5. Do not merge to main without explicit authority.
6. Provide a concise final report containing:
   - branch
   - final commit SHA
   - routes created
   - key visual system implemented
   - motion scenes implemented
   - evidence sources used
   - typecheck/build/test results
   - browser viewport coverage
   - accessibility/reduced-motion result
   - remaining honest limitations
   - PR URL if created

Do not provide a long celebratory narrative.

---

# 43. STOP CONDITION

The goal is not:

> “A website was generated.”

The goal is:

> A polished, calm, elegant, highly readable and evidence-backed Aixion Lab website that feels like one continuous story, makes Ram’s engineering progression understandable, makes his strongest work inspectable, and gives recruiters/engineering leaders a compelling reason to continue exploring.

Do not fake a pass.

If the rendered site is visibly below the specification, continue the visual convergence loop.

Build first.
Look at it.
Critique it.
Fix it.
Look again.
Repeat until it genuinely matches the authority above.
