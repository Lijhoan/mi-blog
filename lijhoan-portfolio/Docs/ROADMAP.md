# Roadmap de implementación — Portfolio Lijhoan

Documento único de planificación. Reemplaza todos los planes, roadmaps y bitácoras previos. Para el sistema de diseño ver [`DESIGN.md`](DESIGN.md); para el contenido fuente ver [`cv.md`](cv.md).

## Objetivo

Portfolio personal inmersivo, enfocado y mantenible sobre **Next.js 16**: narrativa por capítulos con motion premium (GSAP + Lenis + Framer Motion) y capa WebGL atmosférica, priorizando **legibilidad y performance** sobre efectos decorativos. Sin capa empresarial de datos/BI. Meta de calidad: pulido nivel Awwwards con base técnica estable.

## Stack real

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) + React 19 |
| Lenguaje | TypeScript 6 (núcleo aún en JS/JSX) |
| Estilos | Tailwind CSS v4 (vía `@tailwindcss/postcss`) |
| Motion | GSAP 3.14 + ScrollTrigger + Lenis 1.3 + Framer Motion 12 |
| WebGL | three + @react-three/fiber 9 + @react-three/drei 10 |
| UI | Radix UI + shadcn/ui + lucide-react |
| Paquetería | pnpm 10 |

**Arquitectura:** Next.js sirve un catch-all `'use client'` (`app/[[...slug]]/page.tsx`) que envuelve el SPA `src/App.jsx` (7 secciones). No hay backend; el contenido vive tipado en `src/content/`.

## Puerta de calidad (cada fase)

`pnpm lint` (0 errores) · `pnpm typecheck` (0 errores) · `pnpm build` (exitoso) · `git status` revisado antes de commit.

---

## Fases

### ✅ Fase 0 — Baseline
Verificado que dev/build corren; migración Vite→Next.js commiteada como punto de partida limpio.

### ✅ Fase 1 — Limpieza estructural
Eliminado el residuo de Vite (`main.jsx`, `index.html`, `vite.config.js`, `index.css`, `vite-env.d.ts`, `dist/`, svgs) y componentes huérfanos (`Lanyard`, `ProfileCard`, `professionalContent.ts`). Config consolidada en Next.js: devDeps de Vite fuera, `tsconfig` sin `vite/client`, `src/types/assets.d.ts` para declaraciones de assets, `process` global en ESLint.

### ✅ Fase 2 — Remover capa de datos/backend
Eliminados `features/telemetry/`, `features/data-activation/`, `features/proof/BiEmbedReadinessShell.tsx` + `biActivationContract.ts` y el subproyecto `backend-spine/`. Desacoplado el widget BI del `FlagshipProofPanel` (sigue siendo sección visible). Recortado el contrato `dataProofLayer` de `flagshipProof.data.ts`.

### ✅ Fase 3 — Consolidación documental
De ~40 `.md` contradictorios a **cuatro piezas vivas**: `README.md`, `Docs/ROADMAP.md`, `Docs/DESIGN.md`, `Docs/cv.md` (fuente de contenido). Eliminado `.github/` (instrucciones/skills de agentes obsoletas) y bitácoras dispersas.

### ⏳ Fase 4 — Consistencia técnica (puerta de estabilidad)
- Extender ESLint para cubrir `.ts/.tsx` (añadir `typescript-eslint`).
- Endurecer `tsconfig` (`noUnusedLocals`/`noUnusedParameters`) sin romper el build.
- Normalizar imports con extensión explícita mezclada en `App.jsx` (cosmético).
- **Puerta dura:** lint + typecheck + build en verde. Aquí el proyecto queda estable.
- *(Convertir el núcleo JS/JSX → TS es opcional y se difiere.)*

### Fase 5 — Pulido visual/motion (prioridad #1 hacia Awwwards)
- Transiciones entre secciones/rutas (`AnimatePresence` / GSAP) coherentes con el sistema de capítulos.
- Suavizar narrativa entre capítulos (identity → proof → trust → cta) y sus mood tokens.
- Pase tipográfico y editorial (jerarquía, espaciado, ritmo) — mayor impacto pendiente.
- Microinteracciones (hover, cursor, loading states, feedback táctil).
- Optimizar la capa WebGL (`MinimalWebGLLayer`, chunk ~865 KB) con tiers de performance y lazy real.
- Ver gaps detallados en [`DESIGN.md`](DESIGN.md) §9.

### Fase 6 — Performance, accesibilidad y producción
- `next/image` + WebP/srcset (corrige además el contrato `StaticImageData` de los imports de PNG, hoy tratados como string — ver `src/types/assets.d.ts`).
- `next.config.js`: optimización de imágenes/headers/redirects.
- Accesibilidad: `prefers-reduced-motion`, contraste, teclado, foco visible.
- Auditoría Lighthouse (target 90+ Performance).
- Opcional: CI (GitHub Actions), tests (Vitest/Playwright), docs de despliegue.

---

## Decisiones cerradas

| Decisión | Resultado |
|---|---|
| Framework | **Next.js 16 App Router** (Vite eliminado) |
| Capa de datos/BI/backend | **Removida** (sobre-ingeniería para un portfolio) |
| Manejo de legacy | **Borrado directo** (git conserva historial) |
| Documentación | **4 piezas**: README + ROADMAP + DESIGN + cv.md |
| Prioridad post-estabilización | **Pulido visual/motion** |
