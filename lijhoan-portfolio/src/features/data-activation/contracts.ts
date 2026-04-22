import { z } from 'zod'
import type { BiAccessMode, BiActivationState } from '@/features/proof/biActivationContract.ts'
import type { ContentStatus } from '@/content/profile/profile.types'

export const telemetryEventNames = [
  'chapter_activated',
  'chapter_dwell_recorded',
  'proof_interaction',
  'trust_interaction',
  'cta_interaction',
  'bi_activation_state',
  'bi_activation_attempt',
] as const

export const telemetryPayloadValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
])

export const telemetryPayloadSchema = z.record(telemetryPayloadValueSchema)

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

export type TelemetryEventInput = TelemetryEvent
export type TelemetryEventRecord = {
  id: string
  sessionId: string
  name: TelemetryEventName
  path: string
  payload: TelemetryEvent['payload']
  timestampAt: string
}

export type TelemetrySessionRecord = {
  id: string
  createdAt: string
  lastEventAt: string
  userAgent?: string
  referrer?: string
  path?: string
}

export const biAccessModeValues = ['private', 'service-principal', 'public'] as const
export const biActivationStateValues = ['idle', 'ready', 'loading', 'unavailable'] as const
export const biAuthorizationStateValues = ['authorized', 'denied', 'unavailable'] as const

export const biActivationRequestSchema = z.object({
  sourceId: z.string().min(1),
  workspaceId: z.string().min(1),
  reportId: z.string().min(1),
  tenantId: z.string().min(1),
  accessMode: z.enum(biAccessModeValues),
  userId: z.string().min(1).optional(),
  requestReason: z.string().min(1).optional(),
  correlationId: z.string().min(1).optional(),
})

export const biEmbedConfigSchema = z.object({
  state: z.enum(biActivationStateValues),
  authorizationState: z.enum(biAuthorizationStateValues),
  accessMode: z.enum(biAccessModeValues),
  workspaceId: z.string().min(1),
  reportId: z.string().min(1),
  tenantId: z.string().min(1),
  embedUrl: z.string().url().optional(),
  tokenType: z.literal('Embed').optional(),
  expiresAtIso: z.string().min(1).optional(),
  reason: z.string().min(1),
  serverOnly: z.literal(true),
})

export type BiActivationRequest = z.infer<typeof biActivationRequestSchema>
export type BiEmbedConfig = z.infer<typeof biEmbedConfigSchema>

export type BiServerSecretKey =
  | 'powerBiClientSecret'
  | 'powerBiClientId'
  | 'powerBiTenantSecret'
  | 'embedToken'
  | 'refreshToken'

export type BiActivationAuditRecord = {
  id: string
  correlationId: string
  sourceId: string
  workspaceId: string
  reportId: string
  tenantId: string
  accessMode: BiAccessMode
  state: BiActivationState
  authorizationState: (typeof biAuthorizationStateValues)[number]
  requestedAt: string
  tokenIssuedAt?: string
  tokenExpiresAt?: string
  failureReason?: string
}

export type MetricVerificationStatus = 'verified' | 'estimated' | 'pending' | 'unavailable'

export type FlagshipMetricRecord = {
  id: string
  caseStudyId: string
  label: string
  value: string
  unit: string
  status: MetricVerificationStatus
  sourceNote: string
  timeframe: string
  baseline?: string
  after?: string
  delta?: string
  confidenceNote?: string
  updatedAt: string
}

export type DataActivationProjectRecord = {
  id: string
  title: string
  description: string
  technologies: string[]
  year: string
  client: string
  status: ContentStatus
  note?: string
  slug: string
  category: string
  isFlagship: boolean
  sourceNote: string
}

export type DataActivationAreaRecord = {
  id: string
  name: string
  parentAreaId?: string
  kind: 'area' | 'sub-area' | 'role'
  status: ContentStatus
  sortOrder: number
}

export type DataActivationSchemaDraft = {
  telemetry: {
    session: TelemetrySessionRecord
    event: TelemetryEventRecord
  }
  bi: {
    request: BiActivationRequest
    config: BiEmbedConfig
    audit: BiActivationAuditRecord
    secretKeys: BiServerSecretKey[]
  }
  content: {
    project: DataActivationProjectRecord
    flagshipMetric: FlagshipMetricRecord
    area: DataActivationAreaRecord
  }
}

export const createTelemetryBatchEnvelope = (events: TelemetryEvent[], reason: string): TelemetryBatchEnvelope => ({
  source: 'portfolio-client',
  sentAtIso: new Date().toISOString(),
  reason,
  events,
})

export const sanitizeTelemetryPayload = (payload: Record<string, string | number | boolean | null | undefined>) => {
  return Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined)) as Record<string, string | number | boolean | null>
}
