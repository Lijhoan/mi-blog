import type { TelemetryAdapter, TelemetryEvent } from '@/features/telemetry/telemetryClient.ts'
import {
  createTelemetryBatchEnvelope,
  sanitizeTelemetryPayload,
  telemetryBatchEnvelopeSchema,
  telemetryEventSchema,
} from './contracts.ts'

export type TelemetryHttpAdapterOptions = {
  endpoint: string
  batchSize?: number
  flushIntervalMs?: number
}

const normalizeTelemetryEvent = (event: TelemetryEvent) => {
  return telemetryEventSchema.parse({
    ...event,
    payload: sanitizeTelemetryPayload(event.payload),
  })
}

class HttpTelemetryAdapter implements TelemetryAdapter {
  private queue: TelemetryEvent[] = []
  private flushTimer: ReturnType<typeof globalThis.setTimeout> | null = null
  private readonly batchSize: number
  private readonly flushIntervalMs: number
  private readonly endpoint: string
  private readonly onVisibilityChange = () => {
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
      void this.flush('page-hidden')
    }
  }
  private readonly onPageHide = () => {
    void this.flush('pagehide')
  }

  constructor(options: TelemetryHttpAdapterOptions) {
    this.endpoint = options.endpoint
    this.batchSize = options.batchSize ?? 12
    this.flushIntervalMs = options.flushIntervalMs ?? 2000

    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', this.onVisibilityChange)
      window.addEventListener('pagehide', this.onPageHide)
    }
  }

  persist(event: TelemetryEvent) {
    this.queue.push(normalizeTelemetryEvent(event))

    if (this.queue.length >= this.batchSize) {
      void this.flush('batch-full')
      return
    }

    this.scheduleFlush()
  }

  destroy() {
    if (this.flushTimer !== null) {
      globalThis.clearTimeout(this.flushTimer)
      this.flushTimer = null
    }

    if (typeof window !== 'undefined') {
      document.removeEventListener('visibilitychange', this.onVisibilityChange)
      window.removeEventListener('pagehide', this.onPageHide)
    }
  }

  private scheduleFlush() {
    if (this.flushTimer !== null || this.queue.length === 0) {
      return
    }

    this.flushTimer = globalThis.setTimeout(() => {
      this.flushTimer = null
      void this.flush('timer')
    }, this.flushIntervalMs)
  }

  private async flush(reason: string) {
    if (this.queue.length === 0) {
      return
    }

    if (this.flushTimer !== null) {
      globalThis.clearTimeout(this.flushTimer)
      this.flushTimer = null
    }

    const batch = this.queue.splice(0, this.queue.length)
    const normalizedBatch = batch.map((event) =>
      telemetryEventSchema.parse({
        ...event,
        payload: sanitizeTelemetryPayload(event.payload),
      }),
    )
    const payload = telemetryBatchEnvelopeSchema.parse(createTelemetryBatchEnvelope(normalizedBatch, reason))
    const body = JSON.stringify(payload)

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function' && navigator.sendBeacon(this.endpoint, new Blob([body], { type: 'application/json' }))) {
      return
    }

    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
        keepalive: true,
      })
    } catch {
      // The adapter is intentionally best-effort in the current Vite shell.
    }
  }
}

export const createTelemetryHttpAdapter = (options: TelemetryHttpAdapterOptions): TelemetryAdapter => {
  return new HttpTelemetryAdapter(options)
}
