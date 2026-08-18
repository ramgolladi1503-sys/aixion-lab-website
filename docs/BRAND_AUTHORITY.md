# AIXION LAB — Immutable Brand Authority

This file is the hard brand-identity contract for AIXION LAB.

The current website visual/interaction system is governed by:

`docs/EXPERIENCE_AUTHORITY.md`

That experience authority supersedes older dark/black website palette and hero-layout directions. It does **not** supersede the immutable identity rules below.

## 1. Brand source of truth

The official brand is exactly:

**AIXION LAB**

**END IS THE NEW BEGINNING**

The supplied metallic forged-knot logo image is the authoritative visual asset.

Canonical asset path:

`/public/brand/aixion-lab-primary.png`

If that exact asset is missing, STOP and request the original supplied logo file. Do not generate, redraw, trace, approximate, reinterpret, vectorize, stylize, or substitute the logo.

## 2. Non-negotiable logo rules

AI-assisted tooling MUST NOT:

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

Allowed:

- scale the original asset proportionally
- place the original asset inside a neutral container when contrast requires it
- use `object-fit: contain`
- adjust surrounding whitespace
- use the full lockup in hero/header/footer where appropriate

## 3. Logo component contract

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

Recommended behavior:

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

Never rebuild the logo as HTML/CSS/3D geometry.

## 4. Product maturity language

Status labels are evidence labels, not decoration.

Current safe categories include:

- FLAGSHIP BUILD
- ACTIVE DEVELOPMENT
- APPLIED RESEARCH
- EARLY RESEARCH
- RESEARCH DIRECTION

Never upgrade maturity because stronger wording looks better in the interface.

## 5. Brand personality

The website should communicate:

- disciplined
- technically credible
- evidence-driven
- ambitious without exaggeration
- calm confidence
- precise systems thinking
- founder-built
- engineering-first
- visually distinctive

It must NOT communicate:

- crypto project
- trading signal service
- generic AI agency
- gaming interface
- fake enterprise corporation
- hype-first startup

## 6. Truth boundary

Do not invent:

- customers
- users
- revenue
- funding
- team size
- deployments
- benchmarks
- latency
- uptime
- certifications
- audits
- trading returns
- structural trading edge
- fake files
- fake evidence
- fake operational telemetry

Visual storytelling may be metaphorical. Public technical claims must remain bounded by actual evidence.

## 7. Current visual authority

For palette, typography, motion, sound, homepage world, scroll behavior, responsive behavior, and interaction design, follow:

`docs/EXPERIENCE_AUTHORITY.md`

The current approved direction is the warm-ivory immersive experience, not the superseded dark website style.

## 8. Enforcement

`BRAND_RECREATION_AUTHORITY=false`

`BRAND_ASSET_SUBSTITUTION_AUTHORITY=false`

`LOGO_GEOMETRY_CHANGE_AUTHORITY=false`

`TAGLINE_CHANGE_AUTHORITY=false`

`BRAND_NAME_CHANGE_AUTHORITY=false`
