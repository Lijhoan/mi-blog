import { randomUUID } from 'crypto'
import type { BiActivationRequest, BiActivationResponse } from './contracts'
import { recordBiActivation } from './memory-store'
import { getBackendSpineRuntime } from './runtime'

const safeCorrelationId = (request: BiActivationRequest) => request.correlationId ?? randomUUID()

export const resolveBiActivation = (request: BiActivationRequest): BiActivationResponse => {
  const runtime = getBackendSpineRuntime()
  const correlationId = safeCorrelationId(request)
  const authorizationState = runtime.biActivationEnabled ? 'authorized' : 'unavailable'
  const state = runtime.mode === 'ready' && runtime.biActivationEnabled ? 'ready' : runtime.mode === 'hybrid' ? 'mock-local' : 'unavailable'

  const response: BiActivationResponse = {
    state,
    authorizationState,
    accessMode: request.accessMode,
    sourceId: request.sourceId,
    workspaceId: request.workspaceId,
    reportId: request.reportId,
    tenantId: request.tenantId,
    reason:
      state === 'ready'
        ? 'Server spine ready: secure activation available through runtime env.'
        : state === 'mock-local'
          ? 'Backend spine is running in hybrid mode without real BI credentials.'
          : 'BI activation unavailable: secure credentials are not configured.',
    serverOnly: true,
    ...(state === 'ready'
      ? {
          embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${encodeURIComponent(request.reportId)}&groupId=${encodeURIComponent(request.workspaceId)}`,
          tokenType: 'Embed' as const,
          expiresAtIso: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        }
      : {}),
  }

  recordBiActivation({
    ...request,
    ...response,
    requestedAtIso: new Date().toISOString(),
    correlationId,
  })

  return response
}
