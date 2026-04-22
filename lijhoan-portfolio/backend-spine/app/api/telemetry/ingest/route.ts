import { badRequest, jsonResponse } from '@/lib/responses'
import { telemetryBatchEnvelopeSchema } from '@/lib/contracts'
import { ingestTelemetryBatch } from '@/lib/telemetry'
import { getBackendSpineRuntime } from '@/lib/runtime'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const runtimeConfig = getBackendSpineRuntime()

  if (!runtimeConfig.telemetryIngestEnabled) {
    return jsonResponse(503, {
      ok: false,
      error: 'telemetry_ingest_unavailable',
      state: runtimeConfig.mode,
      message: 'Telemetry ingest is disabled by backend spine runtime flags.',
    })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return badRequest('Request body must be valid JSON.')
  }

  const parsed = telemetryBatchEnvelopeSchema.safeParse(body)
  if (!parsed.success) {
    return badRequest('Telemetry batch envelope is invalid.', parsed.error.flatten())
  }

  const result = ingestTelemetryBatch(parsed.data, {
    userAgent: request.headers.get('user-agent') ?? undefined,
    referrer: request.headers.get('referer') ?? undefined,
  })

  return jsonResponse(200, {
    ok: true,
    state: runtimeConfig.mode,
    acceptedCount: result.acceptedCount,
    ingestionId: result.ingestionId,
    totalStoredEvents: result.totalStoredEvents,
  })
}
