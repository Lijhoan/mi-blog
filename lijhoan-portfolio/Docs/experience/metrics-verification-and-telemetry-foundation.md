# Metrics Verification and Telemetry Foundation

## Objective

Convert the flagship proof chapter from narrative-only evidence to measurable, explicit, and portable evidence infrastructure.

Scope of this pass:

- Metrics verification model with explicit status semantics.
- Tale Insight Analytics metrics status pass without invented KPIs.
- Telemetry foundation for chapter activation, dwell time, and key interactions.
- Formal BI activation contract with readiness/degradation rules.

## 1) Metrics Verification Model

Implemented model in `src/content/case-studies/flagshipProof.data.ts`:

- Status enum:
  - `verified`
  - `estimated`
  - `pending`
  - `unavailable`
- Required metric fields:
  - `label`
  - `value`
  - `unit`
  - `status`
  - `sourceNote`
  - `timeframe`
- Optional evidence fields:
  - `baseline`
  - `after`
  - `delta`
  - `confidenceNote`

Verification rules:

- `verified`: directly supported by canonical portfolio content.
- `estimated`: directional evidence exists, but no formal instrumentation or hard numeric baseline.
- `pending`: target KPI is intended but still missing baseline and/or post-adoption measurement.
- `unavailable`: data source is not accessible in the current environment.

## 2) Flagship Metrics Status Pass (Tale Insight Analytics)

Applied status mapping:

- Organizational coverage: `verified`.
- Report consolidation: `estimated`.
- Formal operational ROI: `pending`.
- Mean per-user reading time: `unavailable`.

No synthetic percentages or fabricated deltas were added.

## 3) Telemetry Contract Foundation

Implemented in `src/features/telemetry/telemetryClient.ts`.

Event contract:

- Envelope:
  - `id`
  - `name`
  - `sessionId`
  - `timestampIso`
  - `path`
  - `payload`
- Event names:
  - `chapter_activated`
  - `chapter_dwell_recorded`
  - `proof_interaction`
  - `trust_interaction`
  - `cta_interaction`
  - `bi_activation_state`
  - `bi_activation_attempt`

Adapter architecture:

- `TelemetryAdapter` interface (`persist(event)`) for portability.
- Default adapter stores session-scoped event buffer in `sessionStorage`.
- `setTelemetryAdapter()` allows future backend adapters (POST API, queue, batching).

Current instrumentation coverage:

- Chapter activation and dwell tracking at app level (`useChapterTelemetry`).
- Proof interactions:
  - proof section visible
  - flagship panel visible
  - project link open
- Trust interactions:
  - open credential proof
  - open archive drawer
- CTA interactions:
  - CV download
  - email click
  - LinkedIn click
  - WhatsApp click

## 4) BI Activation Contract

Implemented in `src/features/proof/biActivationContract.ts`.

State machine:

- `idle`
- `ready`
- `loading`
- `unavailable`

Activation logic (high level):

- No user intent + no metadata => `idle`.
- No user intent + metadata present => `ready` (waiting explicit intent).
- Activation requested + credential exchange running => `loading`.
- Activation requested + missing metadata/credentials => `unavailable`.

Required data contract:

- `sourceId`
- `workspaceId`
- `reportId`
- `tenantId`
- `accessMode`
- `tokenProvider`

Graceful degradation:

- Preserve chapter narrative and metrics when BI embed cannot activate.
- Avoid fake iframe states or mocked BI values.
- Keep readiness and missing prerequisites explicit.

Migration path to secure backend:

- Move token exchange to Next.js Route Handlers.
- Keep secrets and credential providers server-side only.
- Persist activation audit outcomes to PostgreSQL telemetry tables.
- Enforce tenant/workspace ACL checks before issuing tokens.

## 5) Pending Work to Reach Real Integration

- Build API adapter that posts telemetry events to backend ingestion endpoint.
- Model telemetry tables in PostgreSQL (sessions, events, activation outcomes).
- Add retention and privacy rules (PII-safe payload policy).
- Wire real BI credential provider and short-lived token issuance.
- Add operational dashboards for telemetry quality and data completeness.

## 6) Limits and Anti-Patterns

Do not:

- Mark estimated/pending values as verified without new evidence.
- Fabricate KPI deltas to improve storytelling.
- Block chapter rendering when BI embed is unavailable.
- Couple telemetry schema to one backend transport.
- Introduce dashboard-heavy UI that breaks editorial reading flow.
