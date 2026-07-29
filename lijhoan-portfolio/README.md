# Lijhoan Machaca — Portfolio Inmersivo

Portafolio profesional con experiencia narrativa por capítulos, scrollytelling horizontal y capa atmosférica WebGL. Prioriza legibilidad y performance sobre efectos decorativos.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) + React 19 |
| Lenguaje | TypeScript 6 |
| Estilos | Tailwind CSS v4 |
| Motion | GSAP 3.14 + ScrollTrigger + Lenis 1.3 + Framer Motion 12 |
| WebGL | three + @react-three/fiber 9 + @react-three/drei 10 |
| UI | Radix UI + shadcn/ui + lucide-react |
| Paquetería | pnpm 10 |

Es un SPA de cliente: Next.js sirve un catch-all `'use client'` (`app/[[...slug]]/page.tsx`) que monta `src/App.jsx` (7 secciones navegables por URL). El contenido vive tipado en `src/content/`; no hay backend.

## Comandos

```bash
pnpm install      # instalar dependencias
pnpm dev          # servidor de desarrollo
pnpm build        # build de producción
pnpm start        # servidor de producción
pnpm lint         # ESLint
pnpm typecheck    # TypeScript (tsc --noEmit)
```

## Estructura

```
app/                      # cascarón Next.js (layout + catch-all route)
src/
  App.jsx                 # SPA raíz (7 secciones)
  components/             # ui (shadcn), layout (scroll providers)
  content/                # capa de datos tipada (perfil, proyectos, skills…)
  features/
    experience/           # sistema de capítulos narrativos + atmósfera
    scrollytelling/       # sección horizontal de proyectos
    navigation/           # NavigationShell
    motion/               # scroll runtime (GSAP + Lenis)
    graphics/             # MinimalWebGLLayer (R3F)
    proof/                # FlagshipProofPanel
  lib/                    # utilidades
Docs/                     # ROADMAP.md · DESIGN.md · cv.md
```

## Despliegue

El sitio se publica en **Azure Static Web Apps** (`mi-blog-lijhoan`) mediante SWA CLI. GitHub se usa solo para control de versiones: **`git push` no despliega automáticamente**.

Procedimiento completo: [`Docs/DEPLOY_AZURE_STATIC_WEB_APP.md`](Docs/DEPLOY_AZURE_STATIC_WEB_APP.md)

## Documentación

- [`Docs/ROADMAP.md`](Docs/ROADMAP.md) — plan de implementación por fases y estado actual.
- [`Docs/DESIGN.md`](Docs/DESIGN.md) — sistema de diseño y experiencia.
- [`Docs/DEPLOY_AZURE_STATIC_WEB_APP.md`](Docs/DEPLOY_AZURE_STATIC_WEB_APP.md) — procedimiento de despliegue.
- [`Docs/cv.md`](Docs/cv.md) — contenido fuente del CV (source of truth).
