import { z } from 'zod'

export const telemetryEventNames = [
  'chapter_activated',
  'chapter_dwell_recorded',
  'proof_interaction',
  'trust_interaction',
  'cta_interaction',
  'bi_activation_state',
  'bi_activation_attempt',
] as const

export const telemetryPayloadSchema = z.record(z.union([z.string(), z.number(), z.boolean(), z.null()]))

export const telemetryEventSchema = z.object({
  id: z.string().min(1),
  name: z.enum(telemetryEventNames),
  sessionId: z.string().min(1),
  timestampIso: z.string().min(1),
  path: z.string().min(1),
  payload: telemetryPayloadSchema,
})

export const telemetryBatchEnvelopeSchema = z.object({
  source: z.literal('portfolio-client'),
  sentAtIso: z.string().min(1),
  reason: z.string().min(1),
  events: z.array(telemetryEventSchema).min(1).max(300),
})

export type TelemetryEventName = (typeof telemetryEventNames)[number]
export type TelemetryEvent = z.infer<typeof telemetryEventSchema>
export type TelemetryBatchEnvelope = z.infer<typeof telemetryBatchEnvelopeSchema>

export const biAccessModeValues = ['private', 'service-principal', 'public'] as const
export const biActivationStateValues = ['idle', 'ready', 'loading', 'unavailable'] as const
export const biRuntimeStateValues = ['unavailable', 'mock-local', 'hybrid', 'ready'] as const

export const biActivationRequestSchema = z.object({
  sourceId: z.string().min(1),
  workspaceId: z.string().min(1),
  reportId: z.string().min(1),
  tenantId: z.string().min(1),
  accessMode: z.enum(biAccessModeValues),
  correlationId: z.string().min(1).optional(),
})

export const biActivationResponseSchema = z.object({
  state: z.enum(biRuntimeStateValues),
  authorizationState: z.enum(['authorized', 'denied', 'unavailable']),
  accessMode: z.enum(biAccessModeValues),
  sourceId: z.string().min(1),
  workspaceId: z.string().min(1),
  reportId: z.string().min(1),
  tenantId: z.string().min(1),
  embedUrl: z.string().url().optional(),
  tokenType: z.literal('Embed').optional(),
  expiresAtIso: z.string().min(1).optional(),
  reason: z.string().min(1),
  serverOnly: z.literal(true),
})

export const flagshipContentSchema = z.object({
  id: z.string().min(1),
  projectTitle: z.string().min(1),
  projectCategory: z.string().min(1),
  whyThisCase: z.string().min(1),
  problemFraming: z.array(z.string()),
  architectureSnapshot: z.array(z.string()),
  stack: z.array(z.string()),
  impactMetrics: z.array(z.object({
    label: z.string().min(1),
    value: z.string().min(1),
    unit: z.string().min(1),
    status: z.enum(['verified', 'estimated', 'pending', 'unavailable']),
    sourceNote: z.string().min(1),
    timeframe: z.string().min(1),
    baseline: z.string().optional(),
    after: z.string().optional(),
    delta: z.string().optional(),
    confidenceNote: z.string().optional(),
  })),
  constraintsAndComplexity: z.array(z.string()),
  credibilitySignals: z.array(z.string()),
})

export type BiActivationRequest = z.infer<typeof biActivationRequestSchema>
export type BiActivationResponse = z.infer<typeof biActivationResponseSchema>
export type FlagshipContentPayload = z.infer<typeof flagshipContentSchema>
