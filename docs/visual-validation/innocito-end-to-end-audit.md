# Innocito — End-to-End Reference Audit

**Audit date:** 2026-09-05  
**Reference:** https://innocito.com/  
**Purpose:** establish which Innocito behaviors are suitable reference material for the Aixion redesign

## Audit status

**Partial but evidence-backed live audit.** The public routes, shared navigation, page text, color output, animation presence, and responsive entry points were inspected. Third-party implementation details, hidden CMS routes, source-level animation timelines, and authenticated/form submission behavior are not available for verification.

This report does not claim that a static Dribbble shot proves live behavior. It is based on the live Innocito website and a same-origin crawl of its publicly discoverable routes.

## Route inventory

The following public routes were discovered from the live homepage and footer:

| Route | Title observed | Result |
|---|---|---|
| `/` | Innocito \| AI Native - Digital and Quality Engineering | Loaded; hero content appeared after an initial empty/black loading state. |
| `/about` | About Us - Our Story & Mission \| Innocito | Loaded; shared shell/footer present. |
| `/careers` | Careers - Join Our Team of Digital Engineers \| Innocito | Loaded; shared shell/footer present. |
| `/contact` | Contact Us - Get in Touch with Our Team \| Innocito | Loaded; shared shell/footer present. |
| `/services` | Innocito \| AI Native - Digital and Quality Engineering | Loaded, but title is generic and page content is comparatively sparse in the crawl. |
| `/resources` | Resources - Insights, Articles & Industry Knowledge \| Innocito | Loaded; awards/recognition content and shared footer present. |

The main navigation exposes About Us, Services, Products, Resources, Careers, and Contact Us. Services, Products, and Resources are expandable controls rather than simple links. The footer repeats key routes and adds social links, locations, legal links, and service shortcuts.

## Navigation audit

### Desktop shell

Observed:

- brand link returns to `/`;
- About Us is a direct route;
- Services is a dropdown control;
- Products is a dropdown control;
- Resources is a dropdown control;
- Careers is a direct route;
- Contact Us is a persistent primary CTA;
- footer provides a second navigation topology;
- scroll-to-top control exists.

Strengths:

- commercial intent is immediately clear;
- primary CTA remains discoverable;
- service taxonomy is separated from company/content routes;
- footer is treated as a full navigation surface.

Risks:

- multiple dropdowns increase interaction and focus complexity;
- the public crawl did not expose all dropdown child routes without interaction;
- the navigation is appropriate for an agency, not automatically for Aixion’s evidence-led lab model;
- the cookie overlay can obscure lower-page content and action targets.

### Aixion translation

Use a shorter top-level shell:

```text
Systems · Research · Pulse · Journey · About · Contact
```

Use expandable navigation only for System categories or Research filters if it improves discovery. Do not copy Innocito’s agency service tree.

## Homepage audit

### Verified structure

The loaded homepage contains:

- hero headline: “AI NATIVE DIGITAL ENGINEERING”;
- supporting proposition about building, modernizing, and scaling enterprises;
- Schedule a Call CTA;
- Know More CTA;
- rotating/interactive hero content covering Quality Engineering, Technology Advisory, and Success Stories;
- Who are we? section;
- client-centric content;
- large footer with locations and social links.

### Motion observations

- initial page state can be visibly black/empty before hero content appears;
- hero content is presented as a rotating content area with Previous slide and Next slide controls;
- visual hero assets are part of each content state;
- page includes scroll-to-top behavior;
- computed style scan found animated/transitioned elements on the homepage and all scanned routes.

### Adaptation for Aixion

Keep:

- staged hero storytelling;
- content states with explicit controls;
- strong primary CTA;
- section-based progression;
- intentional footer/navigation closure.

Change:

- do not block the visitor behind a blank intro state;
- use Aixion systems/research states instead of agency marketing slides;
- ensure carousel content is keyboard-accessible and does not auto-advance unpredictably;
- provide visible state indicators and pause/reduced-motion behavior;
- use evidence and boundaries instead of enterprise claims or conversion metrics.

## Page audit

### About

The route is part of the core company navigation and inherits the same shell/footer. Aixion should make About more human and specific: Ram’s engineering path, principles, and actual scope. Avoid generic agency “who we are” language.

### Careers

The route exists as a first-class navigation item. Aixion’s equivalent should be Resume/Career and should represent an individual engineer’s path rather than a large-company hiring funnel.

### Contact

The route is exposed both through the primary CTA and footer. Aixion should preserve this discoverability, but use a minimal intent-led contact surface rather than a sales conversion form unless a form is actually required.

### Services

The route exists as a top-level category and is reachable from the footer. Aixion should not create a service catalog that implies agency offerings. Its equivalent is the Systems Registry and system detail model.

### Resources

The route is a top-level content destination. Aixion should translate this to Research, with explicit states, evidence, limitations, and links to system impact.

## Color and typography audit

The live computed style scan found a dominant black/near-black canvas with white text, gray secondary text, and light-gray surfaces. Observed output colors included:

- `rgb(0, 0, 0)` / black canvas;
- `rgb(255, 255, 255)` / primary text;
- `rgb(229, 229, 229)` and `rgb(245, 245, 245)` / light surfaces and text;
- `rgb(163, 163, 163)`, `rgb(133, 133, 133)`, and `rgb(65, 65, 65)` / secondary and muted text;
- translucent white/black overlays;
- gradient accent treatment visible in logo/CTA presentation.

The visual language is high-contrast, black-first, and accent-led. Aixion can adopt the contrast discipline and restrained accent logic, but should use its own cyan/mint/evidence state palette and not copy Innocito’s logo or exact gradient treatment.

## CTA audit

Observed CTA families:

- Contact Us / Let’s talk;
- Schedule a Call;
- Know More;
- Resources and case/story links;
- footer contact and social links;
- Next/Previous hero controls;
- Scroll to top.

Aixion CTA mapping:

| Innocito pattern | Aixion equivalent |
|---|---|
| Contact Us | Contact / Start a conversation |
| Schedule a Call | Explore systems / Read evidence |
| Know More | View system / Read research note |
| Success Stories | Evidence / Case record |
| Services | Systems Registry |
| Resources | Research |
| Next/Previous hero | View next system or research state |

## Accessibility and resilience observations

Positive:

- skip-to-main link exists;
- navigation controls have accessible names;
- carousel exposes Previous slide and Next slide controls;
- dropdowns are represented as buttons, not only hover targets;
- footer routes are repeated for discoverability.

Needs explicit verification before adopting the pattern:

- whether dropdown focus is trapped and restored correctly;
- whether carousel changes are announced to assistive technology;
- whether autoplay can be paused;
- whether the initial loading state is announced or merely visually empty;
- whether mobile menu focus and Escape behavior are correct;
- whether cookie consent blocks keyboard access to the page;
- whether all CTA destinations return successful responses.

## What will be mirrored in Aixion

- black-first editorial canvas;
- compact persistent navigation;
- one clear primary action;
- staged hero content;
- explicit previous/next controls when content changes;
- section-based storytelling;
- strong footer closure;
- controlled accent gradients;
- scroll-to-top affordance;
- mobile-first navigation hierarchy.

## What will not be mirrored

- Innocito branding, logo, copy, illustrations, or exact assets;
- enterprise-agency service taxonomy;
- unsupported client/result metrics;
- an obstructive blank loading state;
- unverified autoplay or motion behavior;
- cookie UI unless Aixion actually needs consent handling;
- exact layout duplication.

## Final reference decision

Innocito is a strong primary reference for Aixion’s new shell, hero storytelling, black canvas, accent treatment, CTA hierarchy, and footer closure. It is not a content or information-architecture template to copy directly.

The Aixion redesign should translate Innocito’s interaction principles into:

```text
Systems → Research → Pulse → Journey → About → Contact
```

with evidence-led content and truthful maturity states replacing agency services, client claims, and conversion-led case studies.
