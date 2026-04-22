# Server-Side Data Activation Layer

## Goal

Prepare a portable server-side data activation layer for telemetry persistence, secure BI activation, and future data fetching in Next.js 15 without forcing a full migration of the current Vite frontend.

The current frontend remains the rendering shell. The server layer is a contract boundary, not a rewrite.

## Architecture Target

### Client Layer (Current Vite App)

Owns:

- Motion and scroll runtime.
- Chapter rendering and editorial composition.
- Telemetry emission as events only.
- BI readiness display and honest degradation states.

Client responsibilities stop at transport and state signaling. It does not hold secrets.

### Server Layer (Future Next.js 15 App Router)

Owns:

- Telemetry ingestion and persistence.
- BI embed token/config provisioning.
- Project and flagship data fetching.
- Audit logging and authorization checks.
- PostgreSQL access through Prisma.

### Contract Boundary

The shared contracts live in TypeScript and are reusable across Vite now and Next.js later. The boundary is:

- Client: emit events, request readiness, display fallback.
- Server: validate, authorize, persist, mint secure payloads.

## Shared Contracts

### Telemetry

Current client contract is centered on `TelemetryEvent` and `TelemetryAdapter` in [src/features/telemetry/telemetryClient.ts](../../src/features/telemetry/telemetryClient.ts).

Server-ready additions live in [src/features/data-activation/contracts.ts](../../src/features/data-activation/contracts.ts):

- typed telemetry event schema
- batch envelope schema
- payload sanitization
- session/event record drafts

### BI Activation

Current readiness logic lives in [src/features/proof/biActivationContract.ts](../../src/features/proof/biActivationContract.ts).

Server-ready additions include:

- request schema
- embed config schema
- authorization state contract
- secret boundary list
- audit record draft

### Data Model Draft

Draft schema lives in [prisma/server-data-activation.draft.prisma](../../prisma/server-data-activation.draft.prisma).

It covers:

- projects
- flagship metrics
- telemetry sessions/events
- BI activation records
- organizational areas

## Telemetry Ingestion Contract

### Endpoint Contract

Recommended future endpoint:

- `POST /api/v1/telemetry/ingest`

Payload:

- `source: 'portfolio-client'`
- `sentAtIso`
- `reason`
- `events[]`

Validation:

- reject empty batches
- enforce event schema
- reject batches above the configured limit
- strip undefined payload values before transport

Batching:

- current client can queue events locally
- flush on timer, threshold, visibility change, or page hide
- future server endpoint can accept batch POSTs directly

Persistence path:

- `TelemetrySession` row per session
- `TelemetryEvent` row per event
- query by chapter, CTA, trust, proof, and path

Example aggregates for future SQL:

- average dwell by `sectionId`
- proof panel visibility count
- trust credential open rate
- CTA click-through by label
- BI activation state transitions by sourceId

## BI Secure Activation Contract

### Secrets That Never Reach the Client

- Power BI client secret
- Power BI tenant secret
- service principal secret material
- embed tokens
- refresh tokens
- server-side correlation credentials

### Future Resolver Endpoint

Recommended future endpoint:

- `POST /api/v1/bi/activate`

Responsibilities:

- validate request schema
- verify workspace/report access
- mint short-lived embed config or token
- log activation audit trail
- return only redacted client-safe payload

### States

Authorization state:

- authorized
- denied
- unavailable

Activation state:

- idle
- ready
- loading
- unavailable

### Degradation

If credentials or embed config are unavailable:

- keep the chapter narrative visible
- show BI readiness as unavailable
- do not simulate a live iframe
- do not fake token issuance

### Migration Path to Real Power BI Embed

1. Move activation resolver into a Route Handler.
2. Keep secrets in server env only.
3. Use Prisma to persist audit outcomes.
4. Issue short-lived embed payloads only after auth checks.
5. Add refresh flow server-side, not in the client bundle.

## Prisma Preparation

The draft schema is intentionally conservative.

### Project

Use for canonical projects and flagship case studies.

### FlagshipMetric

Use for verified, estimated, pending, and unavailable metrics.

### TelemetrySession and TelemetryEvent

Use for session-safe ingestion and later analytics.

### BiActivationRecord

Use for auditability of secure BI activation attempts.

### OrgArea

Optional but useful for Tale Insight Analytics because it supports area/sub-area mapping and future RBAC.

## Thin Integration Pass

Current Vite app integration is intentionally small:

- telemetry adapter bootstrap via environment flag
- HTTP adapter only when endpoint exists
- BI shell shows runtime readiness mode
- fallback remains session-local and honest
- no admin dashboard, no fake backend, no production iframe simulation

Files involved:

- [src/features/data-activation/client.ts](../../src/features/data-activation/client.ts)
- [src/features/data-activation/runtime.ts](../../src/features/data-activation/runtime.ts)
- [src/features/data-activation/telemetryHttpAdapter.ts](../../src/features/data-activation/telemetryHttpAdapter.ts)
- [src/features/proof/BiEmbedReadinessShell.tsx](../../src/features/proof/BiEmbedReadinessShell.tsx)
- [src/App.jsx](../../src/App.jsx)

## Security Risks

- Telemetry payloads can leak PII if fields are not whitelisted later.
- BI token endpoints must remain server-only.
- Public client config should never include secrets or service principal identifiers that enable abuse.
- Batch ingestion should enforce size limits and schema validation.
- Activation logs should not expose confidential workspace identifiers unnecessarily.

## Mocked vs Production-Ready

### Mocked or local-only now

- sessionStorage telemetry persistence
- environment-based adapter bootstrap
- BI readiness contract display
- draft schema file only

### Production-ready by contract

- event schema
- activation request schema
- audit record shape
- Prisma draft
- Route Handler migration path

## Recommended Next Step

Implement the first Next.js Route Handlers against the shared contracts:

- `app/api/v1/telemetry/ingest/route.ts`
- `app/api/v1/bi/activate/route.ts`

Then point the client adapter to those endpoints through environment flags.
