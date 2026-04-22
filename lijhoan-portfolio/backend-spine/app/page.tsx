import { getBackendSpineRuntime } from '@/lib/runtime'

export default function BackendSpineHomePage() {
  const runtimeConfig = getBackendSpineRuntime()

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Backend Spine</h1>
      <p>Mode: {runtimeConfig.mode}</p>
      <ul>
        <li>Telemetry ingest: {runtimeConfig.telemetryIngestEndpoint}</li>
        <li>BI activation: {runtimeConfig.biActivationEndpoint}</li>
        <li>Flagship content: {runtimeConfig.contentEndpoint}</li>
      </ul>
    </main>
  )
}
