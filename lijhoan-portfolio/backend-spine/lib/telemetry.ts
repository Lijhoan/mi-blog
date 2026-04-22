import { randomUUID } from 'crypto'
import { telemetryBatchEnvelopeSchema, type TelemetryBatchEnvelope } from './contracts'
import { listTelemetryEvents, storeTelemetryBatch } from './memory-store'

export type TelemetryIngestResult = {
  ok: true
  acceptedCount: number
  ingestionId: string
  totalStoredEvents: number
}

export const ingestTelemetryBatch = (envelope: TelemetryBatchEnvelope, requestMeta: { userAgent?: string; referrer?: string }): TelemetryIngestResult => {
  const parsed = telemetryBatchEnvelopeSchema.parse(envelope)
  const acceptedEvents = storeTelemetryBatch(parsed, requestMeta)

  return {
    ok: true,
    acceptedCount: acceptedEvents.length,
    ingestionId: randomUUID(),
    totalStoredEvents: listTelemetryEvents().length,
  }
}
