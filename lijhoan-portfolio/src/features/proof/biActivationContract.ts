export type BiActivationState = 'idle' | 'ready' | 'loading' | 'unavailable'

export type BiAccessMode = 'private' | 'service-principal' | 'public'

export type BiActivationInput = {
  sourceId: string
  accessMode: BiAccessMode
  activationRequested: boolean
  loading: boolean
  hasEmbedMetadata: boolean
  hasCredentialProvider: boolean
}

export type BiActivationEvaluation = {
  state: BiActivationState
  reason: string
  canActivate: boolean
  requiredData: string[]
  degradationStrategy: string[]
  nextRouteHandlerMigration: string[]
}

export const BI_REQUIRED_DATA_FIELDS = [
  'sourceId',
  'workspaceId',
  'reportId',
  'tenantId',
  'accessMode',
  'tokenProvider',
]

export const evaluateBiActivation = (input: BiActivationInput): BiActivationEvaluation => {
  if (!input.activationRequested) {
    return {
      state: input.hasEmbedMetadata ? 'ready' : 'idle',
      reason: input.hasEmbedMetadata
        ? 'Embed metadata available; activation waits for explicit user intent.'
        : 'Activation has not been requested and embed metadata is incomplete.',
      canActivate: false,
      requiredData: BI_REQUIRED_DATA_FIELDS,
      degradationStrategy: [
        'Render proof chapter metrics and architecture narrative without embed iframe.',
        'Expose readiness state and missing prerequisites in plain language.',
      ],
      nextRouteHandlerMigration: [
        'Move token minting to Next.js Route Handler (server-only).',
        'Store BI credential references in PostgreSQL with rotation metadata.',
        'Return short-lived embed token to client and keep refresh flow server-driven.',
      ],
    }
  }

  if (input.loading) {
    return {
      state: 'loading',
      reason: 'Activation requested and secure credential exchange is in progress.',
      canActivate: false,
      requiredData: BI_REQUIRED_DATA_FIELDS,
      degradationStrategy: [
        'Keep chapter content visible while activation resolves.',
        'Abort to unavailable if timeout or credential handshake fails.',
      ],
      nextRouteHandlerMigration: [
        'Use Route Handler to proxy secure token exchange.',
        'Emit activation audit trail with request correlation ID.',
      ],
    }
  }

  if (!input.hasEmbedMetadata || !input.hasCredentialProvider) {
    return {
      state: 'unavailable',
      reason: !input.hasEmbedMetadata
        ? 'Embed metadata is missing (workspace/report configuration incomplete).'
        : 'Credential provider is not configured for secure embed activation.',
      canActivate: false,
      requiredData: BI_REQUIRED_DATA_FIELDS,
      degradationStrategy: [
        'Fallback to BI-ready contract card and keep metrics chapter operational.',
        'Avoid rendering fake iframe or mocked BI values.',
      ],
      nextRouteHandlerMigration: [
        'Configure credential provider in server environment only.',
        'Add availability health-check endpoint before enabling activation in production.',
      ],
    }
  }

  return {
    state: 'ready',
    reason: 'Metadata and credential provider are available for secure activation.',
    canActivate: true,
    requiredData: BI_REQUIRED_DATA_FIELDS,
    degradationStrategy: [
      'If token exchange fails, transition to unavailable and preserve narrative context.',
      'Do not block chapter rendering on BI connectivity.',
    ],
    nextRouteHandlerMigration: [
      'Finalize secure token exchange in Next.js Route Handler.',
      'Persist activation logs and embed outcomes in PostgreSQL telemetry tables.',
      'Enforce tenant/workspace ACL checks server-side before issuing tokens.',
    ],
  }
}
