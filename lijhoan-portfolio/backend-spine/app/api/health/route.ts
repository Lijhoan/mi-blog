import { jsonResponse } from '@/lib/responses'
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
  })
}
