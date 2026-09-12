# Aixion Lab — Visual Recovery Pass

Status: active on `ram/astra-calm-minimalism-v1`.

This pass exists because the first Calm Minimalism implementation met structural and engineering requirements but did not converge closely enough to the approved Direction A reference.

The recovery pass keeps the approved information architecture, content model, accessibility work, responsive behavior, evidence grounding and motion infrastructure. It changes only the visual art direction and compositional treatment until the rendered site is visibly in the same family as the approved reference.

## Hard visual gate

- Warm editorial canvas and natural-light feeling
- Strong image-led composition rather than abstract technical UI
- Generous but purposeful whitespace
- Large, readable editorial typography
- Project imagery before architecture diagrams on overview surfaces
- Fewer borders, numbered labels and technical boxes
- No futuristic, cyber, dashboard or generic AI-template treatment
- Home must pass first at 1440px before the same grammar is propagated across other routes

## Verification loop

Implement → CI render → inspect screenshots → compare to Direction A → repair the largest mismatches → repeat.

No merge to `main` until the visual gate passes.
