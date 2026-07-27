export type DataActivationRuntimeEnv = Record<string, string | boolean | number | undefined | null>

export type DataActivationMode = 'mock' | 'hybrid' | 'remote'

export type DataActivationRuntimeConfig = {
  mode: DataActivationMode
  telemetry: {
    enabled: boolean
    endpoint: string | null
    batchSize: number
    flushIntervalMs: number
  }
  biActivation: {
    enabled: boolean
    endpoint: string | null
    serverReady: boolean
  }
  content: {
    enabled: boolean
    endpoint: string | null
  }
  persistence: {
    enabled: boolean
    dialect: 'postgresql' | 'mock'
  }
}

const readEnvValue = (env: DataActivationRuntimeEnv, keys: string[]) => {
  for (const key of keys) {
    const value = env[key]

    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim()
    }
  }

  return null
}

const readEnvBoolean = (env: DataActivationRuntimeEnv, keys: string[], fallback = false) => {
  const rawValue = readEnvValue(env, keys)

  if (rawValue === null) {
    return fallback
  }

  return ['1', 'true', 'yes', 'on'].includes(rawValue.toLowerCase())
}

const readEnvNumber = (env: DataActivationRuntimeEnv, keys: string[], fallback: number) => {
  const rawValue = readEnvValue(env, keys)

  if (rawValue === null) {
    return fallback
  }

  const parsed = Number(rawValue)

  return Number.isFinite(parsed) ? parsed : fallback
}

export const resolveDataActivationRuntimeConfig = (env: DataActivationRuntimeEnv): DataActivationRuntimeConfig => {
  const telemetryEndpoint = readEnvValue(env, [
    'VITE_TELEMETRY_INGEST_URL',
    'NEXT_PUBLIC_TELEMETRY_INGEST_URL',
    'TELEMETRY_INGEST_URL',
  ])

  const biActivationEndpoint = readEnvValue(env, [
    'VITE_BI_ACTIVATION_URL',
    'NEXT_PUBLIC_BI_ACTIVATION_URL',
    'BI_ACTIVATION_URL',
  ])

  const flagshipContentEndpoint = readEnvValue(env, [
    'VITE_FLAGSHIP_CONTENT_URL',
    'NEXT_PUBLIC_FLAGSHIP_CONTENT_URL',
    'FLAGSHIP_CONTENT_URL',
  ])

  const serverActivationRequested = readEnvBoolean(env, [
    'VITE_ENABLE_SERVER_ACTIVATION',
    'NEXT_PUBLIC_ENABLE_SERVER_ACTIVATION',
    'ENABLE_SERVER_ACTIVATION',
  ])

  const hasTelemetryEndpoint = telemetryEndpoint !== null
  const hasBiActivationEndpoint = biActivationEndpoint !== null

  const mode: DataActivationMode = serverActivationRequested && (hasTelemetryEndpoint || hasBiActivationEndpoint)
    ? 'remote'
    : serverActivationRequested
      ? 'hybrid'
      : 'mock'

  return {
    mode,
    telemetry: {
      enabled: hasTelemetryEndpoint && serverActivationRequested,
      endpoint: telemetryEndpoint,
      batchSize: readEnvNumber(env, ['VITE_TELEMETRY_BATCH_SIZE', 'TELEMETRY_BATCH_SIZE'], 12),
      flushIntervalMs: readEnvNumber(env, ['VITE_TELEMETRY_FLUSH_INTERVAL_MS', 'TELEMETRY_FLUSH_INTERVAL_MS'], 2000),
    },
    biActivation: {
      enabled: hasBiActivationEndpoint && serverActivationRequested,
      endpoint: biActivationEndpoint,
      serverReady: Boolean(biActivationEndpoint && serverActivationRequested),
    },
    content: {
      enabled: Boolean(flagshipContentEndpoint) && serverActivationRequested,
      endpoint: flagshipContentEndpoint,
    },
    persistence: {
      enabled: readEnvBoolean(env, ['VITE_ENABLE_POSTGRES_PERSISTENCE', 'ENABLE_POSTGRES_PERSISTENCE']),
      dialect: readEnvBoolean(env, ['VITE_ENABLE_POSTGRES_PERSISTENCE', 'ENABLE_POSTGRES_PERSISTENCE']) ? 'postgresql' : 'mock',
    },
  }
}

const getBrowserEnv = (): DataActivationRuntimeEnv => {
  try {
    const e = (process as unknown as Record<string, unknown> | undefined)?.env
    if (e && typeof e === 'object') return e as DataActivationRuntimeEnv
  } catch {
    /* env not available */
  }
  return {}
}

export const getViteDataActivationRuntimeConfig = () => {
  const env = getBrowserEnv()
  return resolveDataActivationRuntimeConfig(env)
}
