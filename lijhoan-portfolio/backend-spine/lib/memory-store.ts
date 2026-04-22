import type { BiActivationRequest, BiActivationResponse, TelemetryBatchEnvelope, TelemetryEvent } from './contracts'

export type StoredTelemetrySession = {
  id: string
  createdAtIso: string
  lastEventAtIso: string
  userAgent?: string
  referrer?: string
  path?: string
}

export type StoredTelemetryEvent = TelemetryEvent & {
  timestampAtIso: string
}

export type StoredBiActivationRecord = BiActivationRequest &
  BiActivationResponse & {
    requestedAtIso: string
    correlationId: string
  }

export type StoredFlagshipRequest = {
  requestedAtIso: string
  source: 'server-spine'
}

const memoryStore = {
  telemetrySessions: new Map<string, StoredTelemetrySession>(),
  telemetryEvents: [] as StoredTelemetryEvent[],
  biActivations: [] as StoredBiActivationRecord[],
  flagshipRequests: [] as StoredFlagshipRequest[],
}

export const storeTelemetryBatch = (envelope: TelemetryBatchEnvelope, requestMeta: { userAgent?: string; referrer?: string }) => {
  const acceptedEvents: StoredTelemetryEvent[] = []
  const nowIso = new Date().toISOString()

  for (const event of envelope.events) {
    const session = memoryStore.telemetrySessions.get(event.sessionId)
    if (!session) {
      memoryStore.telemetrySessions.set(event.sessionId, {
        id: event.sessionId,
        createdAtIso: nowIso,
        lastEventAtIso: nowIso,
        userAgent: requestMeta.userAgent,
        referrer: requestMeta.referrer,
        path: event.path,
      })
    } else {
      session.lastEventAtIso = nowIso
      session.path = event.path
    }

    const storedEvent: StoredTelemetryEvent = {
      ...event,
      timestampAtIso: event.timestampIso,
    }

    memoryStore.telemetryEvents.push(storedEvent)
    acceptedEvents.push(storedEvent)
  }

  return acceptedEvents
}

export const listTelemetryEvents = () => memoryStore.telemetryEvents.slice()

export const recordBiActivation = (record: StoredBiActivationRecord) => {
  memoryStore.biActivations.push(record)
  return record
}

export const listBiActivations = () => memoryStore.biActivations.slice()

export const recordFlagshipRequest = (request: StoredFlagshipRequest) => {
  memoryStore.flagshipRequests.push(request)
  return request
}

export const getFlagshipRequestCount = () => memoryStore.flagshipRequests.length
