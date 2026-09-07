# Aixion Website Expert Audit Prompt

Act as a senior subject-matter expert in:

- Digital product design
- Visual design systems
- UX and interaction design
- Editorial web composition
- Responsive frontend behavior
- Accessibility
- Motion design
- Content hierarchy
- Conversion and navigation design
- Cinematic agency and portfolio websites

Audit my website at:

<http://localhost:3000/>

Do not assume the website is good because it renders. Do not fabricate passes. If something is incomplete, confusing, visually weak, repetitive, inaccessible, or unlike the intended design direction, mark it as a failure.

The website is an Aixion applied-intelligence engineering lab. Its intended direction is a refined, dark, editorial, cinematic website inspired by Innocito, but it must remain original to Aixion.

## Routes to inspect

- `/`
- `/systems`
- `/systems/tradebot`
- `/systems/control-core`
- `/systems/automation`
- `/systems/analytics`
- `/research`
- `/research/opening-session-market-structure`
- `/research/rec-md-structural-interaction`
- `/research/mean-reversion-candidate`
- `/research/evidence-bound-autonomy`
- `/pulse`
- `/journey`
- `/about`
- `/contact`
- `/resume`
- An invalid route such as `/does-not-exist`

## Viewports

Inspect every route at minimum at:

- Desktop: `1440 × 900`
- Laptop: `1280 × 800`
- Mobile: `390 × 844`
- Tablet, if available

## Interaction audit

For every route, inspect:

1. Initial page load
2. Header and navigation
3. Contextual navigation
4. Dropdown and mobile menu
5. Hover states
6. Keyboard focus states
7. CTA behavior
8. Link destinations
9. Back and forward navigation
10. Reload behavior
11. Scroll position preservation
12. Scroll-to-top behavior
13. Carousels and controls
14. Filters and tabs
15. Evidence drawers or modals
16. Reduced-motion behavior
17. Loading and reveal states
18. Mobile layout
19. Horizontal overflow
20. Footer or intentional page closure
21. Typography readability
22. Content hierarchy
23. Color contrast
24. Repeated visual patterns
25. Animation timing and distraction

## Design goals

Compare the site against these goals:

- One dominant message per viewport
- Clear editorial pacing
- One main action per section
- Distinct visual roles for identity, evidence, state, and human context
- Dark cinematic composition without excessive visual noise
- Artwork must not overpower important content
- No large unexplained black gaps
- No content hidden behind animation
- No overly dense metadata
- No repeated cards or imagery that make pages feel templated
- Navigation must be easy to understand
- Mobile layouts must feel intentionally designed, not merely stacked
- Animations should explain state or guide attention
- Reduced-motion mode must preserve the complete hierarchy
- The visual direction should feel polished and original, not like legacy styles

## Six-pillar scoring

Score each pillar from 1 to 4:

- `1` = materially broken
- `2` = needs significant work
- `3` = good but incomplete
- `4` = release quality

Score:

1. Content hierarchy
2. Visual composition
3. Brand identity
4. Typography and readability
5. Spacing and responsive layout
6. Motion and interaction design

## Required output

### A. Executive verdict

State whether the site is:

- `BLOCKED`
- `NEEDS MAJOR REVISION`
- `NEEDS POLISH`
- `READY FOR AUDIT`
- `READY FOR RELEASE`

Do not use “pass” unless the evidence supports it.

### B. Route-by-route audit table

For each route, include:

- Visual quality
- Content quality
- Interaction quality
- Mobile quality
- Motion quality
- Severity
- Main issue
- Recommended fix

### C. Findings grouped by severity

Use:

- `P0` = release blocker
- `P1` = major design or UX issue
- `P2` = important polish issue
- `P3` = minor improvement

Every finding must include:

- Route
- Exact visible problem
- Why it matters
- Recommended fix
- How to verify the fix

### D. Content audit

Identify:

- Naive or vague copy
- Repeated messaging
- Missing context
- Overly technical wording
- Weak CTAs
- Sections that should be shortened
- Sections that need stronger proof
- Content that belongs on another page

### E. Visual audit

Identify:

- Weak hierarchy
- Repeated imagery
- Inconsistent visual roles
- Poor contrast
- Bad spacing
- Excessive card usage
- Unexplained empty areas
- Typography scale problems
- Visual elements competing with the main message

### F. Motion audit

For every animation or transition, determine:

- What moves
- When it moves
- Whether it helps comprehension
- Whether it is too slow, too fast, or distracting
- Whether it works on mobile
- Whether it works with reduced motion
- Whether content is visible before animation completes

### G. Behavior matrix

Create a matrix covering:

- Initial load
- Hover
- Focus
- Selection
- Scroll
- Reload
- Back navigation
- Forward navigation
- Mobile menu
- Carousel state
- Filter state
- Modal/drawer state
- Reduced motion
- Cross-page continuity

Mark each item:

- `PASS`
- `FAIL`
- `PARTIAL`
- `NOT TESTED`

Never mark something PASS merely because you did not notice a problem.

### H. Fix plan

Provide a prioritized implementation plan:

#### Phase 1: Release blockers

#### Phase 2: Structural design fixes

#### Phase 3: Typography and content fixes

#### Phase 4: Motion and interaction refinement

#### Phase 5: Final responsive and accessibility verification

For each fix, provide:

- File, component, or route likely affected
- Exact change needed
- Expected visual or behavioral result
- Verification method

### I. Final release checklist

Include a checklist for:

- All routes
- Desktop
- Tablet
- Mobile
- Accessibility
- Typography
- Content
- Navigation
- Motion
- Reduced motion
- Performance
- Broken links
- Console errors
- Horizontal overflow
- Final screenshots

## Audit rules

- Audit the rendered website, not only source code.
- Inspect the complete page by scrolling from top to bottom.
- Do not stop after checking the homepage.
- Do not assume existing tests cover visual quality.
- Do not give generic advice.
- Be specific and evidence-based.
- If you cannot inspect something, mark it `NOT TESTED`.
- Never fake a pass.
- Explain exactly what should be fixed and how.
