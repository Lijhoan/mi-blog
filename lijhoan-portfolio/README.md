# Lijhoan Machaca — Portfolio Inmersivo

Portafolio profesional con experiencia narrativa inmersiva, scrollytelling horizontal, capa atmosférica WebGL y contratos de datos preparados para backend.

## Stack actual

| Capa | Tecnología |
|---|---|
| Frontend | Vite 6 + React 19 + TypeScript 6 |
| Routing | react-router-dom (BrowserRouter activo) |
| Estilos | Tailwind CSS v4 |
| Motion | GSAP 3.14 + ScrollTrigger + Lenis 1.3 + Framer Motion 12 |
| WebGL | three + @react-three/fiber 9 + @react-three/drei 10 |
| UI | Radix UI + shadcn/ui + lucide-react |
| Backend (separado) | Next.js 15.3 (backend-spine/) |
| Paquetería | pnpm 10 |

**Nota**: La migración total a Next.js 15 App Router **no está implementada**. El proyecto usa Vite como bundler. El backend-spine es un subproyecto Next.js separado para Route Handlers.

## Estado actual

- MVP funcional con características beta técnicas.
- SPA con 7 secciones navegables y scrollytelling horizontal.
- Sistema de capítulos narrativos con atmósfera variable.
- WebGL atmosférico lazy-loaded.
- Telemetría local en sessionStorage.
- Backend-spine con 5 endpoints funcionales (en memoria).
- Prisma/PostgreSQL: schema draft existente, no migrado.

## Comandos de desarrollo

```bash
pnpm install          # instalar dependencias
pnpm dev              # servidor de desarrollo Vite
pnpm typecheck        # TypeScript check
pnpm lint             # ESLint (cubre .js/.jsx)
pnpm build            # build producción Vite
pnpm preview          # preview del build
```

Backend-spine:
```bash
cd backend-spine
pnpm dev              # servidor Next.js
pnpm build            # build Next.js
```

## Validaciones actuales

- `pnpm typecheck` ✅ PASS
- `pnpm build` ✅ PASS
- `pnpm lint` ✅ PASS (0 errores, 2 warnings preexistentes)

## Roadmap

Ver [`Docs/ROADMAP_CURRENT.md`](Docs/ROADMAP_CURRENT.md) para el plan vigente.
