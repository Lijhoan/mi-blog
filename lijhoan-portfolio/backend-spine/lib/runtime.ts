export type BackendSpineMode = 'mock' | 'hybrid' | 'ready'

export type BackendSpineRuntime = {
  mode: BackendSpineMode
  telemetryIngestEnabled: boolean
  biActivationEnabled: boolean
  persistenceEnabled: boolean
  persistenceDialect: 'memory' | 'postgresql'
  telemetryIngestEndpoint: string
  biActivationEndpoint: string
  contentEndpoint: string
}

const readEnv = (name: string) => process.env[name]

const readBoolean = (name: string) => {
  const value = readEnv(name)
  return value !== undefined && ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())
}

const readNumber = (name: string, fallback: number) => {
  const value = readEnv(name)
  if (!value) return fallback
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const readUrlOrPath = (name: string, fallback: string) => readEnv(name)?.trim() || fallback

export const getBackendSpineRuntime = (): BackendSpineRuntime => {
  const telemetryIngestEndpoint = readUrlOrPath('PORTFOLIO_TELEMETRY_INGEST_ENDPOINT', '/api/telemetry/ingest')
  const biActivationEndpoint = readUrlOrPath('PORTFOLIO_BI_ACTIVATION_ENDPOINT', '/api/bi/activation')
  const contentEndpoint = readUrlOrPath('PORTFOLIO_FLAGSHIP_CONTENT_ENDPOINT', '/api/content/flagship')
  const telemetryIngestEnabled = readBoolean('PORTFOLIO_ENABLE_TELEMETRY_INGEST')
  const biActivationEnabled = readBoolean('PORTFOLIO_ENABLE_BI_ACTIVATION')
  const persistenceEnabled = readBoolean('PORTFOLIO_ENABLE_POSTGRES_PERSISTENCE')
  const hasAnyServerFeature = telemetryIngestEnabled || biActivationEnabled || persistenceEnabled

  return {
    mode: !hasAnyServerFeature ? 'mock' : persistenceEnabled ? 'ready' : 'hybrid',
    telemetryIngestEnabled,
    biActivationEnabled,
    persistenceEnabled,
    persistenceDialect: persistenceEnabled ? 'postgresql' : 'memory',
    telemetryIngestEndpoint,
    biActivationEndpoint,
    contentEndpoint,
  }
}

export const getTelemetryBatchSize = () => readNumber('PORTFOLIO_TELEMETRY_BATCH_SIZE', 12)
export const getTelemetryFlushIntervalMs = () => readNumber('PORTFOLIO_TELEMETRY_FLUSH_INTERVAL_MS', 2000)
