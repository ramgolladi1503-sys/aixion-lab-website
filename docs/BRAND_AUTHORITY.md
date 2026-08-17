# AIXION LAB — Immutable Brand Authority

This file is a hard design contract for Google AI Studio and any other AI-assisted website builder.

## 1. Brand source of truth

The official brand is exactly:

**AIXION LAB**

**END IS THE NEW BEGINNING**

The supplied metallic forged-knot logo image is the authoritative visual asset.

Expected canonical asset path:

`/public/brand/aixion-lab-primary.png`

If that exact asset is missing, STOP and request the original supplied logo file. Do not generate, redraw, trace, approximate, reinterpret, vectorize, stylize, or substitute the logo.

## 2. Non-negotiable logo rules

AI Studio MUST NOT:

- generate a new AIXION logo
- redraw the icon with CSS, SVG, canvas, WebGL, or AI image generation
- alter the knot geometry
- alter the metallic texture
- change AIXION LAB to AIXION LABS
- change the tagline
- crop the icon or wordmark in a way that changes the identity
- place gradients, colors, glow, bevels, borders, or filters over the logo asset
- recolor the logo
- animate individual parts of the logo
- create alternate marks without explicit approval

AI Studio MAY:

- scale the original asset proportionally
- place the original asset on dark backgrounds
- use `object-fit: contain`
- adjust surrounding whitespace
- use the full lockup in hero/header/footer where appropriate

## 3. Exact visual language

The website must use a restrained premium black/silver engineering aesthetic.

### Core colors

```css
--aixion-black: #050608;
--aixion-black-2: #0A0A0A;
--aixion-charcoal: #121212;
--aixion-gunmetal: #2A2A2A;
--aixion-silver: #C0C0C0;
--aixion-light-silver: #E6E6E6;
--aixion-white: #F5F5F5;
--aixion-muted: rgba(255,255,255,0.62);
--aixion-soft: rgba(255,255,255,0.38);
--aixion-line: rgba(255,255,255,0.10);
--aixion-line-strong: rgba(255,255,255,0.22);
```

### Backgrounds

Allowed:

- near-black solid backgrounds
- extremely subtle charcoal gradients
- faint engineering grids
- restrained radial silver/white glow at very low opacity
- subtle metallic/noise texture if performance-safe

Forbidden:

- purple AI gradients
- blue/cyan neon themes
- rainbow gradients
- bright SaaS illustration palettes
- heavy glassmorphism everywhere
- colorful particle storms

## 4. Typography

Primary feel: wide, geometric, technical, premium, sparse.

Do not depend on an unlicensed proprietary font.

Preferred web-safe/open alternatives:

- headings/brand-adjacent display: `Rajdhani`, `Space Grotesk`, or `Inter`
- body: `Inter`, system-ui, sans-serif

Typography rules:

- headings: light/regular weight, tight tracking for large statements
- labels: uppercase, small size, generous letter spacing
- body: high readability, 1.6–1.9 line height
- avoid overly rounded consumer-SaaS typography

## 5. UI geometry

```css
--aixion-radius-xl: 32px;
--aixion-radius-lg: 22px;
--aixion-radius-md: 16px;
--aixion-max-width: 1180px;
```

Preferred components:

- thin silver/white borders
- dark panels with subtle elevation
- pill or softly rounded CTA buttons
- minimal icons
- restrained hover movement (1–3px maximum)
- subtle 150–250ms transitions

Do not make the website look like a gaming UI.

## 6. Primary CTA style

```css
.aixion-button-primary {
  background: #F5F5F5;
  color: #050608;
  border: 1px solid #F5F5F5;
  border-radius: 999px;
  min-height: 48px;
  padding: 0 22px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 11px;
  font-weight: 700;
}

.aixion-button-secondary {
  background: transparent;
  color: rgba(255,255,255,0.78);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 999px;
  min-height: 48px;
  padding: 0 22px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 11px;
}
```

## 7. Logo component contract

Use the original file directly:

```jsx
export function AixionBrand({ className = "" }) {
  return (
    <img
      src="/brand/aixion-lab-primary.png"
      alt="AIXION LAB — End is the new beginning"
      className={className}
      draggable="false"
    />
  );
}
```

Recommended CSS:

```css
.aixion-brand {
  display: block;
  width: auto;
  max-width: 100%;
  height: auto;
  object-fit: contain;
  filter: none;
  transform: none;
}
```

Never rebuild the logo as HTML/CSS shapes.

## 8. Hero design contract

The hero should feel cinematic but controlled.

Required:

- dark near-black canvas
- official AIXION LAB lockup visible
- headline: `Human control for AI systems that can actually change things.`
- short factual supporting copy
- at most two CTAs
- a product/system visual grounded in actual product concepts such as approval, audit, runtime security, evidence, or validation

Do not use fake live metrics or fabricated system activity.

## 9. Product status visual language

Use small status labels such as:

- FLAGSHIP BUILD
- PRODUCT / MVP
- PLATFORM / PROTOTYPE
- RESEARCH

Status labels are evidence labels, not decoration. Never upgrade maturity because it looks better in the UI.

## 10. Brand personality

The website should communicate:

- disciplined
- technical
- evidence-driven
- ambitious but not exaggerated
- security-conscious
- human-controlled AI
- founder-built
- engineering-first

It must NOT communicate:

- crypto project
- trading signal service
- generic AI agency
- futuristic gaming product
- fake enterprise corporation
- hype-first startup

## 11. Final enforcement instruction to AI Studio

Before changing any visual component, compare the change against this document.

If a requested design conflicts with this brand contract, preserve this contract and explicitly report the conflict.

The official logo asset and this file outrank generated design suggestions.

`BRAND_RECREATION_AUTHORITY=false`

`BRAND_ASSET_SUBSTITUTION_AUTHORITY=false`

`LOGO_GEOMETRY_CHANGE_AUTHORITY=false`

`TAGLINE_CHANGE_AUTHORITY=false`

`BRAND_NAME_CHANGE_AUTHORITY=false`
