> Estado documental: ASPIRACIONAL / EN PAUSA.
> Esta migración no se ha ejecutado. El frontend permanece en Vite.
> Se ha agregado BrowserRouter (react-router-dom) como paso intermedio.
> La decisión de migrar a Next.js 15 App Router está en evaluación.
> Ver Docs/ROADMAP_CURRENT.md para el estado actual.

# Vite to Next App Router Motion Migration

## Goal

Preserve the motion shell contract while moving the portfolio to Next.js 15 App Router with Server Components by default.

## What Will Not Change

- `SmoothScrollProvider` remains the Lenis + GSAP clock owner.
- `ScrollyTellingContainer` remains the pin + horizontal translation shell.
- The content section remains separate from the motion runtime.
- Reduced-motion fallback behavior remains in place.

## What Will Change

- The provider will move from `src/main.jsx` into a route layout boundary.
- The route layout will decide whether the immersive shell wraps the whole route or only the immersive segment.
- The page/segment will become the place where feature sections are composed.
- Client boundaries will be explicit in Next with `'use client'` only on motion-specific components.

## Migration Order

1. Create the Next App Router shell.
2. Move the motion provider into the immersive layout boundary.
3. Move the projects section into a route component.
4. Preserve the `children` contract of `SmoothScrollProvider`.
5. Preserve the `children` and `className` contract of `ScrollyTellingContainer`.
6. Validate reduced-motion and fallback states in the Next runtime.

## Stable Interface To Preserve

```text
SmoothScrollProvider(children)
ScrollyTellingContainer(children, className?)
```

## Important Notes

- The Vite workspace uses a client entry point, so the migration must replace that root boundary with an App Router layout boundary.
- The scroll shell should remain route-scoped unless the entire site becomes one immersive route.
- The R3F/WebGL layer should be added as a sibling scene later, not by changing the motion shell contract.