import { badRequest, jsonResponse } from '@/lib/responses'
import { biActivationRequestSchema } from '@/lib/contracts'
import { resolveBiActivation } from '@/lib/bi'
import { getBackendSpineRuntime } from '@/lib/runtime'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const runtimeConfig = getBackendSpineRuntime()

  return jsonResponse(200, {
    ok: true,
    state: runtimeConfig.mode,
    telemetryIngestEnabled: runtimeConfig.telemetryIngestEnabled,
    biActivationEnabled: runtimeConfig.biActivationEnabled,
    persistenceEnabled: runtimeConfig.persistenceEnabled,
    persistenceDialect: runtimeConfig.persistenceDialect,
    endpoints: {
      telemetryIngest: runtimeConfig.telemetryIngestEndpoint,
      biActivation: runtimeConfig.biActivationEndpoint,
      flagshipContent: runtimeConfig.contentEndpoint,
    },
  })
}

export async function POST(request: Request) {
  const runtimeConfig = getBackendSpineRuntime()

  if (!runtimeConfig.biActivationEnabled) {
    return jsonResponse(503, {
      ok: false,
      error: 'bi_activation_unavailable',
      state: runtimeConfig.mode,
      message: 'BI activation is disabled by backend spine runtime flags.',
    })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return badRequest('Request body must be valid JSON.')
  }

  const parsed = biActivationRequestSchema.safeParse(body)
  if (!parsed.success) {
    return badRequest('BI activation request is invalid.', parsed.error.flatten())
  }

  const result = resolveBiActivation(parsed.data)

  return jsonResponse(200, {
    ok: true,
    ...result,
    runtimeMode: runtimeConfig.mode,
  })
}
