# Roadmap actual del proyecto

## 1. Estado ejecutivo

Proyecto en fase **MVP funcional** con aspiraciones premium/Awwwards. El frontend corre en Vite + React 19. Se ha agregado BrowserRouter como infraestructura de ruteo. El backend-spine existe como subproyecto Next.js separado. La migración a Next.js App Router está en evaluación, no ejecutada.

## 2. Objetivo del producto

Portafolio profesional inmersivo de alto nivel visual, con narrativa por capítulos, motion design premium, WebGL atmosférico y claridad profesional. Aspira a un nivel de experiencia tipo Awwwards / Site of the Day, pero priorizando legibilidad y performance sobre efectos decorativos.

## 3. Estado técnico actual

- **Frontend**: Vite 6 + React 19 + TypeScript 6.
- **Routing**: BrowserRouter (react-router-dom) envuelve la app. App.jsx aún centraliza secciones con lógica condicional.
- **Motion**: Lenis + GSAP + ScrollTrigger + Framer Motion. Sistema de scroll runtime y mood tokens por capítulo.
- **WebGL**: React Three Fiber lazy-loaded. Ambient particles + halos. Performance tiers.
- **Contenido**: Capa tipada centralizada (src/content/). Docs/cv.md como source of truth.
- **Telemetría**: Cliente propio con sessionStorage. Adaptadores para futura persistencia HTTP.
- **Backend-spine**: Subproyecto Next.js 15 separado. 5 endpoints funcionales con almacenamiento en memoria.
- **Prisma/PostgreSQL**: Schema draft existente en prisma/. No migrado ni conectado.
- **Git**: .next y artefactos de build ya no están trackeados.

## 4. Avances completados

1. **Fase 0 — ESLint**: Se corrigió eslint.config.js para ignorar artefactos generados (backend-spine/.next, out, node_modules). Lint ahora pasa limpio.
2. **Limpieza Git**: Se retiró del índice Git backend-spine/.next (69 archivos) y tsconfig.tsbuildinfo. Se creó backend-spine/.gitignore.
3. **.gitignore actualizado**: Raíz ahora ignora `.next`, `**/.next`, `**/out`, `**/*.tsbuildinfo`.
4. **Fase 1 — BrowserRouter**: Se envolvió la app con `<BrowserRouter>` en src/main.jsx. react-router-dom ya estaba en dependencias.
5. **Documentación**: README reescrito. ROADMAP_CURRENT y CHANGELOG_ENGINEERING creados. Docs desactualizados marcados como ASPIRACIONAL/DEPRECATED.

## 5. Pendientes priorizados

### Prioridad 1 — Base técnica inmediata
- [ ] Fase 2: Navegación basada en ruta (convertir NavigationShell a useLocation/useNavigate).
- [ ] Fase 3: Extracción piloto de una sección desde App.jsx a su propio archivo.
- [ ] Validaciones después de cada fase (lint + typecheck + build).

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

## 6. Decisiones abiertas

| Decisión | Opciones | Estado |
|---|---|---|
| Framework frontend | Mantener Vite vs migrar a Next.js 15 App Router | En evaluación. Se prioriza experiencia visual primero. |
| Routing | React Router vs migración a App Router | React Router adoptado como paso intermedio. |
| Backend-spine | Subproyecto separado vs integración monorepo | Actualmente separado. Funciona. |
| Telemetría | sessionStorage local vs persistencia HTTP+DB | Local ahora. Adapter listo para HTTP. |
| Base de datos | PostgreSQL (Prisma) vs SQLite vs ninguno | Draft Prisma existe. Sin decisión tomada. |

## 7. Siguiente candidato autorizado

**Fase 2: Navegación basada en ruta** (NO EJECUTADA TODAVÍA)

Consiste en migrar NavigationShell de props a `useLocation`/`useNavigate`, eliminando la dependencia de `activeSection`/`setActiveSection` como props. Esto habilita URLs reales, historial del navegador y prepara el terreno para transiciones.

## 8. Criterios para avanzar

Cada fase debe validarse con:
- `pnpm lint` — 0 errores
- `pnpm typecheck` — 0 errores
- `pnpm build` — exitoso
- `git status` — revisado antes de commit
- Cambios revisados antes de commit
