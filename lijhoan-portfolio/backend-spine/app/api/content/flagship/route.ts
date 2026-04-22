import { jsonResponse, badRequest } from '@/lib/responses'
import { getFlagshipContentPayload } from '@/lib/content'
import { getBackendSpineRuntime } from '@/lib/runtime'
import { recordFlagshipRequest } from '@/lib/memory-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const runtimeConfig = getBackendSpineRuntime()

  if (!runtimeConfig.contentEndpoint) {
    return badRequest('Content endpoint is not configured.')
  }

  recordFlagshipRequest({
    requestedAtIso: new Date().toISOString(),
    source: 'server-spine',
  })

  return jsonResponse(200, {
    ok: true,
    state: runtimeConfig.mode,
    content: getFlagshipContentPayload(),
  })
}
