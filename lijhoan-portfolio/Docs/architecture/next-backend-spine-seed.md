# Next.js 15 Backend Spine Seed

## Decision

The backend spine is introduced as a **parallel, isolated Next.js 15 subproject** under `backend-spine/`.

This is the smallest safe path because:

- it creates real Route Handlers now,
- it does not force a migration of the existing Vite frontend,
- it keeps server contracts separate from UI rendering,
- it is portable to a future full App Router migration.

## What Exists Now

The spine includes real, minimal handlers and helpers for:

- telemetry ingestion
- BI activation/config
- flagship content fetch fallback
- health checks

### Files

- `backend-spine/app/api/telemetry/ingest/route.ts`
- `backend-spine/app/api/bi/activation/route.ts`
- `backend-spine/app/api/content/flagship/route.ts`
- `backend-spine/app/api/health/route.ts`
- `backend-spine/lib/contracts.ts`
- `backend-spine/lib/runtime.ts`
- `backend-spine/lib/memory-store.ts`
- `backend-spine/lib/telemetry.ts`
- `backend-spine/lib/bi.ts`
- `backend-spine/lib/content.ts`

## Endpoint Contracts

### Telemetry Ingest

`POST /api/telemetry/ingest`

Behavior:

- validates a batch envelope with Zod,
- accepts only sanitized event payloads,
- stores events in server memory for now,
- returns accepted count and ingestion ID,
- returns 503 when disabled by env flags.

### BI Activation

`GET /api/bi/activation`

Returns runtime readiness and endpoint metadata only. No secrets.

`POST /api/bi/activation`

Behavior:

- validates request schema,
- resolves honest states: `unavailable`, `mock-local`, `hybrid`, `ready`,
- never exposes tokens or secret material,
- records a server-side activation audit row in memory for now.

### Flagship Content

`GET /api/content/flagship`

Behavior:

- returns the canonical flagship case study payload,
- validates output shape against a shared schema,
- records a request entry in server memory,
- returns a plain fallback object without reaching for a production DB yet.

### Health

`GET /api/health`

Returns spine mode and feature availability.

## Runtime Modes

The spine uses explicit runtime modes:

- `mock` - no server feature enabled
- `hybrid` - one or more server features enabled, but persistence is memory-only
- `ready` - persistence is enabled and the spine is configured for future PostgreSQL wiring

## Env Vars

See `backend-spine/.env.example`.

Key variables:

- `PORTFOLIO_ENABLE_TELEMETRY_INGEST`
- `PORTFOLIO_ENABLE_BI_ACTIVATION`
- `PORTFOLIO_ENABLE_POSTGRES_PERSISTENCE`
- `PORTFOLIO_TELEMETRY_INGEST_ENDPOINT`
- `PORTFOLIO_BI_ACTIVATION_ENDPOINT`
- `PORTFOLIO_FLAGSHIP_CONTENT_ENDPOINT`
- `PORTFOLIO_TELEMETRY_BATCH_SIZE`
- `PORTFOLIO_TELEMETRY_FLUSH_INTERVAL_MS`
- `DATABASE_URL`

## Persistence Readiness

Current persistence behavior:

- telemetry events are stored in memory,
- BI activation attempts are stored in memory,
- flagship fetch requests are stored in memory,
- no real PostgreSQL migration is executed yet.

Future persistence path:

- add Prisma Client to the spine,
- replace memory store with PostgreSQL writes,
- preserve the same request/response contracts,
- keep the client unchanged except for endpoint URLs.

## Frontend Wiring

The current Vite app remains the renderer.

It now:

- initializes the data activation layer on mount,
- can switch telemetry transport to HTTP when configured,
- can smoke-test flagship content fetches when a content endpoint exists,
- can ask the BI shell to read runtime readiness without assuming a live embed.

Relevant files:

- `src/features/data-activation/client.ts`
- `src/features/data-activation/runtime.ts`
- `src/features/proof/BiEmbedReadinessShell.tsx`
- `src/App.jsx`

## What Is Still Mocked

- no PostgreSQL connection is live yet,
- no Prisma client is wired into the spine yet,
- no Power BI secret material is present,
- no production token issuance exists yet,
- no admin or dashboard surface exists.

## Security Rules

- secrets stay server-side only,
- BI tokens must never be returned to the client in plain logs,
- telemetry payloads should be whitelisted before production persistence,
- endpoint defaults must remain explicit and environment-controlled.

## Migration Path to Full Next.js 15

1. Promote the backend spine into the main app router or a dedicated server package.
2. Replace memory store with Prisma-backed repositories.
3. Keep the endpoint contracts stable.
4. Move client env values to the future Next.js public config surface.
5. Reuse the same schemas and response shapes in production.

## Bottom Line

This seed proves the server-side path with real route handlers and honest fallback behavior, while keeping the current portfolio app intact.
