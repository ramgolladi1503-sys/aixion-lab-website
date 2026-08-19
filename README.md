# AIXION LAB Website

Official public website source for **AIXION LAB**.

> END IS THE NEW BEGINNING

This repository is the website authority. It is intentionally separated from the historical `axiom` repository so company branding, public product stories, and Google AI Studio work do not mix with legacy TradeBot/Axiom application code.

## Current scope

- AIXION LAB brand and landing page
- Aixion Control Tower
- MCP Shield
- Veriforge
- Financial Systems Research Lab
- Founder story and engineering principles
- Google AI Studio governed continuation prompt

## Website authority

The root Vite app is authoritative:

```text
index.html
package.json
src/main.jsx
src/styles.css
docs/AI_STUDIO_MASTER_PROMPT.md
```

The `frontend/` directory is historical carry-over and is **not** the source Google AI Studio should extend. It can be removed after the root app is validated.

## Local development

```bash
npm install
npm run dev
```

Then open the Vite URL, normally `http://localhost:5173`.

## Production build

```bash
npm install
npm run build
```

## Google AI Studio

Import this GitHub repository and use `docs/AI_STUDIO_MASTER_PROMPT.md` as the governing build instruction. Tell AI Studio to inspect the current root app before making changes.

The official brand is **AIXION LAB** with the tagline **END IS THE NEW BEGINNING**. Preserve the supplied metallic logo lockup and do not invent a replacement logo.

## Truth boundary

Product maturity and company claims must remain evidence-based. Research projects must not be presented as commercial financial advice, signal-selling products, or automated trading services. No fabricated customers, revenue, partnerships, testimonials, certifications, performance metrics, or readiness claims.

## Current validation status

Repository structure: PRESENT
Production build: NOT YET INDEPENDENTLY VALIDATED
Brand asset migration into this repo: PENDING — the starter currently references the preserved brand asset from the historical public Axiom branch until the supplied logo image is copied into `public/brand/`.
