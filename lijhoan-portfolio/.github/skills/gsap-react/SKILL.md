---
name: gsap-react
description: "Use when animating React components with GSAP, useGSAP, refs, gsap.context(), scoped selectors, cleanup, or SSR-safe setup."
---

# GSAP with React

## When to Use

- Use for any animation work inside React components or Next.js client components.

## Rules

- Prefer `useGSAP()` with a scoped ref.
- If `useGSAP()` is unavailable, use `gsap.context()` and revert on cleanup.
- Do not create tweens before the DOM exists.
- Do not use selector strings without a container scope.
- Register plugins once before use.

## Minimal Pattern

1. Create a container ref.
2. Scope selectors or target refs inside the component.
3. Clean up every animation instance on unmount.