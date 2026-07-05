# Engineering Changelog

## 2026-07-05 — Checkpoint: Routing Foundation

**Rama**: `main`

### Resumen

Checkpoint fundacional de ruteo y limpieza del proyecto. Se corrigió la infraestructura de build, se limpió el tracking Git de artefactos generados y se agregó BrowserRouter como preparación para la refactorización de navegación.

### Archivos modificados

- `.gitignore` — agregados ignores para `.next`, `**/.next`, `**/out`, `**/*.tsbuildinfo`
- `eslint.config.js` — agregados ignores para `backend-spine/.next`, `backend-spine/out`, `node_modules`, `.git`
- `README.md` — reescrito completamente: refleja stack real, estado actual, comandos de desarrollo
- `src/main.jsx` — envuelto en `<BrowserRouter>`
- `Docs/Plan.md` — marcado como ASPIRACIONAL
- `Docs/migration/vite-to-next-app-router-motion.md` — marcado como ASPIRACIONAL / EN PAUSA
- `Docs/architecture/server-side-data-activation-layer.md` — marcado como PARCIALMENTE IMPLEMENTADO

### Archivos creados

- `backend-spine/.gitignore` — ignores para `.next`, `out`, `node_modules`, `*.tsbuildinfo`
- `Docs/ROADMAP_CURRENT.md` — roadmap vigente del proyecto
- `Docs/CHANGELOG_ENGINEERING.md` — este archivo

### Artefactos removidos del tracking Git

- `backend-spine/.next/` — 69 archivos de caché y build de Next.js
- `backend-spine/tsconfig.tsbuildinfo` — archivo de información de compilación

### Validaciones ejecutadas

| Comando | Resultado | Observación |
|---|---|---|
| `pnpm lint` | ✅ PASS | 0 errores, 2 warnings preexistentes |
| `pnpm typecheck` | ✅ PASS | 0 errores |
| `pnpm build` | ✅ PASS | Build exitoso |

### Próxima fase sugerida

**Fase 2**: Navegación basada en ruta — migrar NavigationShell de props a `useLocation`/`useNavigate`.
