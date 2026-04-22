import { setTelemetryAdapter } from '@/features/telemetry/telemetryClient.ts'
import { createTelemetryHttpAdapter } from './telemetryHttpAdapter.ts'
import { getViteDataActivationRuntimeConfig, type DataActivationRuntimeConfig } from './runtime.ts'

let initialized = false

export type RemoteBiActivationState = {
  state: 'unavailable' | 'mock-local' | 'hybrid' | 'ready'
  authorizationState?: 'authorized' | 'denied' | 'unavailable'
  reason: string
  endpoint: string
}

export const fetchRemoteBiActivationState = async (endpoint: string): Promise<RemoteBiActivationState | null> => {
  if (typeof window === 'undefined' || !endpoint) {
    return null
  }

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as {
      state?: RemoteBiActivationState['state']
      authorizationState?: RemoteBiActivationState['authorizationState']
      reason?: string
    }

    if (!payload.state || !payload.reason) {
      return null
    }

    return {
      state: payload.state,
      authorizationState: payload.authorizationState,
      reason: payload.reason,
      endpoint,
    }
  } catch {
    return null
  }
}

export const fetchRemoteFlagshipContent = async (endpoint: string) => {
  if (typeof window === 'undefined' || !endpoint) {
    return null
  }

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as unknown
  } catch {
    return null
  }
}

export const initializeDataActivationLayer = (): DataActivationRuntimeConfig => {
  const runtimeConfig = getViteDataActivationRuntimeConfig()

  if (initialized || typeof window === 'undefined') {
    return runtimeConfig
  }

  if (runtimeConfig.telemetry.enabled && runtimeConfig.telemetry.endpoint) {
    setTelemetryAdapter(
      createTelemetryHttpAdapter({
        endpoint: runtimeConfig.telemetry.endpoint,
        batchSize: runtimeConfig.telemetry.batchSize,
        flushIntervalMs: runtimeConfig.telemetry.flushIntervalMs,
      }),
    )
  }

  initialized = true
  return runtimeConfig
}

export const getDataActivationReadinessLabel = (runtimeConfig: DataActivationRuntimeConfig) => {
  if (runtimeConfig.mode === 'remote') {
    return 'remote-ready'
  }

  if (runtimeConfig.mode === 'hybrid') {
    return 'hybrid-mock'
  }

  return 'mock-local'
}

export const smokeTestRemoteFlagshipContent = async (runtimeConfig: DataActivationRuntimeConfig) => {
  if (!runtimeConfig.content.endpoint) {
    return null
  }

  return fetchRemoteFlagshipContent(runtimeConfig.content.endpoint)
}
