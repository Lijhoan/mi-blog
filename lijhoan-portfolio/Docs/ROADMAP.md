# Roadmap de implementación — Portfolio Lijhoan

Documento único de planificación. Reemplaza todos los planes, roadmaps y bitácoras previos. Para el sistema de diseño ver [`DESIGN.md`](DESIGN.md); para el contenido fuente ver [`cv.md`](cv.md).

## Objetivo

Portfolio personal enfocado y mantenible sobre **Next.js 16** con dirección de arte **Nothing/spec-sheet** (ver [`DESIGN.md`](DESIGN.md)): monocromo + rojo señal, tipografía mono/dot-matrix, líneas de 1px, priorizando **legibilidad y performance** sobre efectos decorativos. Sin capa empresarial de datos/BI. Meta de calidad: nivel Awwwards con base técnica estable.

## Stack real

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, export estático) + React 19 |
| Lenguaje | TypeScript 6 (núcleo aún en JS/JSX) |
| Estilos | Tailwind CSS v4 (vía `@tailwindcss/postcss`) + tokens spec-sheet |
| Tipografía | Space Mono + Doto vía `next/font` |
| Motion | GSAP 3.14 + ScrollTrigger + Lenis 1.3 (scrollytelling horizontal) |
| UI | lucide-react (iconos); componentes propios, sin librería de UI |
| Tema | next-themes (oscuro/claro con `data-theme`) |
| QA visual | Playwright (`scripts/visual-qa.mjs`) |
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

### ✅ Fase 4 — Consistencia técnica (puerta de estabilidad)
ESLint extendido a `.ts/.tsx` con typescript-eslint (detectó y corrigió una violación real de rules-of-hooks). Lint + typecheck + build en verde como puerta permanente. *(Convertir el núcleo JS/JSX → TS sigue diferido como opcional.)*

### ✅ Fase 5 — Rediseño Nothing/spec-sheet (ejecutada, reemplazó al plan original de "pulido")
Pivot de dirección de arte a **Nothing/spec-sheet** (ver [`DESIGN.md`](DESIGN.md) §0):
- Fundamentos: tokens únicos (`--bg/--ink/--dim/--faint/--line/--card/--accent`), Space Mono + Doto vía `next/font`, modo oscuro/claro con next-themes.
- Todas las secciones restilizadas: hero ficha técnica, skills como ficha de especificaciones con iconos mínimos, timeline 1px, certificaciones con tiers e índices, contacto con email gigante Doto, nav pill fija.
- Eliminado el sistema antiguo completo (atmósfera/overlays/WebGL/mood tokens) y sus dependencias (three, react-three, leva, meshline) + componentes shadcn huérfanos.
- Proyectos reforzados: **diagramas de arquitectura SVG propios** (s10-lakehouse, tale-insight-analytics, tale-banking-admin, tale-jarvis-bank) en lugar de screenshots; estados honestos (● privado/nda, verified/pending).

### ✅ Fase 5.5 — Integración del perfil maestro (contenido)
- Caso insignia **Plataforma S10 Lakehouse** (P.01) + experiencia TALE enriquecida (Medallion, Airflow, dbt, Iceberg, Trino, OpenBao, CI/CD, IA local).
- Skills reestructuradas en 4 grupos de ingeniería real; Verisure corregida (Abr–Nov 2025).
- Certificados DMC Institute (Data Engineer 168h · Big Data 60h, Jun 2026) integrados como destacados con `● reciente` dinámico y assets WebP optimizados.
- `cv.md` actualizado como fuente de verdad. Sin datos sensibles (IPs/secretos/correo corporativo excluidos).

### ✅ Spec-7 — QA visual responsive (comprobado con capturas reales)
Verificado con Playwright (`node scripts/visual-qa.mjs` con el dev server activo): capturas de las 7 rutas en móvil 375px y desktop 1440px, temas oscuro y claro, midiendo overflow horizontal del documento.
- **Resultado: 0 px de overflow en las 12 combinaciones** y layout limpio en todas las secciones (ficha de skills, timeline, certificaciones, contacto y scrollytelling).
- Corregido: titular Doto del hero desbordaba 9 px en 375px (`clamp(38px,10vw,92px)` + `break-words`); el retrato ahora va después del titular en móvil (el headline abre la página); el link "Inicio" se oculta en móvil (el logo LM ya navega a home), liberando espacio en la nav pill.
- Fix de routing dev: `generateStaticParams` con `{ slug: [] }` para la raíz (con `{ slug: undefined }` el modo dev devolvía 404 en todas las rutas; el export no se veía afectado).

### ⏳ Fase 6 — Performance, accesibilidad y producción (PENDIENTE)
- Metadata SEO (title/description/OpenGraph), favicon coherente con la marca spec-sheet (hoy sigue `analysis_ico.png`).
- Accesibilidad: contraste, teclado, foco visible, `prefers-reduced-motion` (parcialmente cubierto).
- Auditoría Lighthouse (target 90+ Performance).
- Opcional: CI (GitHub Actions) para desplegar a Azure en cada push a `main`; tests (Vitest/Playwright).

---

## Despliegue (Azure, web estática)

- Build como **export estático**: `output: 'export'` en `next.config.ts` + `generateStaticParams` pre-renderiza las 7 rutas → salida en `out/`.
- Publicación: subir `out/` al hosting estático de Azure (Static Web App o Storage `$web`), p. ej. `az storage blob upload-batch -s out -d '$web' --account-name <cuenta> --overwrite`.
- `pnpm start`/`preview` no aplican con export estático; usar cualquier servidor estático para probar `out/` localmente.

---

## Decisiones cerradas

| Decisión | Resultado |
|---|---|
| Framework | **Next.js 16 App Router** (Vite eliminado) |
| Capa de datos/BI/backend | **Removida** (sobre-ingeniería para un portfolio) |
| Manejo de legacy | **Borrado directo** (git conserva historial) |
| Documentación | **4 piezas**: README + ROADMAP + DESIGN + cv.md |
| Prioridad post-estabilización | **Pulido visual/motion** |
| Dirección de arte | **Nothing / spec-sheet** (Space Mono + Doto, monocromo + rojo señal, 1px, sin sombras) — ver DESIGN.md §0 |
