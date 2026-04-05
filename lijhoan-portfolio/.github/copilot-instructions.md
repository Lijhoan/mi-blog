# Copilot guidance for this workspace

## Source of truth

- Treat `Docs/Plan.md` as the target architecture for this repository.
- Do not optimize around the legacy Vite app structure unless the task explicitly asks for legacy compatibility.
- Prefer implementation guidance that is portable to the planned Next.js 15 + React 19 + TypeScript stack.

## Animation rules

- Use GSAP for timelines, scroll-linked motion, pinning, and orchestrated UI transitions.
- In React, prefer `useGSAP()` from `@gsap/react` with a scoped ref.
- If `useGSAP()` is unavailable, use `gsap.context()` and always return `ctx.revert()` on cleanup.
- Never create selectors without a scope when the code lives inside a component.
- Register plugins once before first use.
- Prefer transforms and `autoAlpha` over layout-affecting properties.

## Scroll and responsiveness

- Use `gsap.matchMedia()` for breakpoint-specific behavior and reduced-motion support.
- For scroll-driven scenes, call `ScrollTrigger.refresh()` after layout or content changes.
- Keep pinning and horizontal scrollytelling logic isolated in dedicated components or hooks.

## Performance

- Avoid layout thrashing and repeated DOM reads inside animation frames.
- Keep WebGL, scroll, and UI animation concerns separated.
- Prefer lazy loading for heavy animation sections when it preserves the first render.

## Output expectations

- Favor concise, working code over broad architecture advice.
- When generating examples, use the minimum dependencies required for the task.
- Keep examples aligned with the roadmap in `Docs/Plan.md`.