# Roadmap actual del proyecto

## 1. Estado ejecutivo

Proyecto en fase **MVP funcional** con aspiraciones premium/Awwwards. **Migrado exitosamente a Next.js 16 App Router**. La navegación basada en ruta (Fase 2) está implementada usando `next/navigation`. El `import.meta.env` de Vite fue reemplazado por una utilidad `isDev()` que funciona en Next.js. El backend-spine existe como subproyecto Next.js separado.

## 2. Objetivo del producto

Portafolio profesional inmersivo de alto nivel visual, con narrativa por capítulos, motion design premium, WebGL atmosférico y claridad profesional. Aspira a un nivel de experiencia tipo Awwwards / Site of the Day, pero priorizando legibilidad y performance sobre efectos decorativos.

## 3. Estado técnico actual

- **Frontend**: Next.js 16 + React 19 + TypeScript 6 (migrado desde Vite 6).
- **Routing**: App Router de Next.js con catch-all `[[...slug]]`. NavigationShell usa `usePathname`/`useRouter` de `next/navigation`. App.jsx deriva la sección activa desde la URL.
- **Motion**: Lenis + GSAP + ScrollTrigger + Framer Motion. Sistema de scroll runtime y mood tokens por capítulo.
- **WebGL**: React Three Fiber lazy-loaded. Ambient particles + halos. Performance tiers.
- **Contenido**: Capa tipada centralizada (src/content/). Docs/cv.md como source of truth.
- **Telemetría**: Cliente propio con sessionStorage. Adaptadores para futura persistencia HTTP.
- **Backend-spine**: Subproyecto Next.js 15 separado. 5 endpoints funcionales con almacenamiento en memoria.
- **Prisma/PostgreSQL**: Schema draft existente en prisma/. No migrado ni conectado.
- **Git**: .next y artefactos de build ya no están trackeados.
- **Dependencias eliminadas**: react-router-dom eliminado (reemplazado por next/navigation).
- **Compatibilidad**: Eliminadas todas las referencias a `import.meta.env` (Vite). Creada utilidad `isDev()` en `src/lib/utils.js` que funciona en Next.js.

## 4. Avances completados

1. **Fase 0 — ESLint**: Se corrigió eslint.config.js para ignorar artefactos generados. Lint pasa limpio.
2. **Limpieza Git**: Se retiraron del índice Git artefactos de build. `.gitignore` actualizado.
3. **Fase 1 — BrowserRouter**: (obsoleto por migración a Next.js)
4. **Documentación**: README y ROADMAP_CURRENT actualizados.
5. **Decisión de framework**: Se eligió Next.js 16 App Router sobre Vite.
6. **Migración a Next.js 16**: Instalación de Next.js, scripts actualizados, layout y catch-all route creados.
7. **Fase 2 — Navegación basada en ruta**: NavigationShell migrado a `usePathname`/`useRouter`. App.jsx deriva `activeSection` de la URL. react-router-dom eliminado.
8. **Corrección de compatibilidad Vite→Next.js**:
   - `import.meta.env` → `isDev()` en App.jsx, telemetryClient.ts y ProjectsScrollytellingSection.tsx
   - `import.meta.env` → `process.env` seguro en runtime.ts (data-activation)
   - Asset `lijhoan.png` movido de `src/assets/` a `public/`
   - Catch-all route `[[...slug]]` restaurada para manejar todas las secciones vía URL
9. **Validaciones**: `pnpm lint` ✅, `pnpm typecheck` ✅, `pnpm build` ✅.

## 5. Pendientes priorizados

### Prioridad 1 — Base técnica inmediata
- [x] Fase 2: Navegación basada en ruta.
- [ ] Fase 3: Extracción piloto de una sección desde App.jsx a su propio archivo (ej: HomeSection en app/page.tsx).
- [ ] Migrar assets estáticos a `public/` y usar `next/image`.
- [ ] Configurar `next.config.js` para optimizaciones (images, redirects).
- [ ] Eliminar `main.jsx` y `index.html` (reliquias de Vite).

### Prioridad 2 — UX premium / Awwwards direction
- [ ] Sistema de transiciones por ruta (AnimatePresence).
- [ ] Mejorar narrativa entre capítulos (transiciones más suaves).
- [ ] Refinar composición editorial (tipografía, jerarquía, espaciado).
- [ ] Microinteracciones (hover táctil, cursores, loading states).
- [ ] Optimizar WebGL/chunks (MinimalWebGLLayer pesa 865 KB).
- [ ] Optimizar imágenes (WebP, srcset, lazy loading).
- [ ] Revisar responsive y accesibilidad (reduced motion, contraste, teclado).

### Prioridad 3 — Backend / datos
- [ ] Decidir: integrar backend-spine en el proyecto principal o mantenerlo separado.
- [ ] Prisma/PostgreSQL: migrar schema draft o eliminarlo.
- [ ] Telemetría real: conectar adapter HTTP al backend-spine.
- [ ] API de contenido: servir projects, experiencia, skills desde backend.

### Prioridad 4 — Producción
- [ ] CI/CD (GitHub Actions).
- [ ] Tests (Vitest + Playwright).
- [ ] Auditoría Lighthouse (target 90+ Performance).
- [ ] Optimización de assets final.
- [ ] Documentación de despliegue.

## 6. Decisiones cerradas / abiertas

| Decisión | Opciones | Estado |
|---|---|---|
| Framework frontend | ~~Mantener Vite vs migrar a Next.js 15 App Router~~ | ✅ **Decidido: Next.js 16 App Router** |
| Routing | ~~React Router vs migración a App Router~~ | ✅ **Decidido: Next.js App Router** (react-router-dom eliminado) |
| Backend-spine | Subproyecto separado vs integración monorepo | Actualmente separado. Funciona. |
| Telemetría | sessionStorage local vs persistencia HTTP+DB | Local ahora. Adapter listo para HTTP. |
| Base de datos | PostgreSQL (Prisma) vs SQLite vs ninguno | Draft Prisma existe. Sin decisión tomada. |

## 7. Siguiente candidato autorizado

**Fase 3: Extracción piloto de una sección** (NO EJECUTADA TODAVÍA)

Consiste en extraer una sección (ej: Home) desde App.jsx a su propio archivo en `app/` como página independiente. Esto es el siguiente paso natural después de la migración a App Router.

## 8. Criterios para avanzar

Cada fase debe validarse con:
- `pnpm lint` — 0 errores
- `pnpm typecheck` — 0 errores
- `pnpm build` — exitoso
- `git status` — revisado antes de commit
- Cambios revisados antes de commit
