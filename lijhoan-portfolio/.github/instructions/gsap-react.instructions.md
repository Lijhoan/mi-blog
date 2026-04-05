---
description: "Use when writing React GSAP components, useGSAP hooks, refs, gsap.context(), cleanup, or component-scoped animations."
applyTo: "src/**/*.{js,jsx}"
---

# GSAP React Guidelines

- Prefer `useGSAP()` with a scoped ref for all React animation work.
- Register GSAP plugins once at module scope or in the smallest shared boundary possible.
- Use refs for animated targets instead of global selectors.
- If selectors are necessary, scope them to the container with `gsap.context()`.
- Return cleanup that kills animations and ScrollTriggers when a component unmounts.
- Keep animation state local to the component unless the roadmap explicitly needs shared orchestration.
- When a component depends on layout measurements, refresh scroll logic after the DOM settles.