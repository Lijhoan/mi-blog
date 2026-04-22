'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge.jsx'
import { evaluateBiActivation, type BiActivationInput } from './biActivationContract.ts'
import { trackTelemetryEvent } from '@/features/telemetry/telemetryClient.ts'
import { fetchRemoteBiActivationState, getDataActivationReadinessLabel, type RemoteBiActivationState } from '@/features/data-activation/client.ts'
import { getViteDataActivationRuntimeConfig } from '@/features/data-activation/runtime.ts'
import { BarChart3, ExternalLink } from 'lucide-react'

type BiEmbedReadinessShellProps = {
  sourceId: string
  accessMode: BiActivationInput['accessMode']
  activationInput: Omit<BiActivationInput, 'sourceId' | 'accessMode'>
}

const stateClassByStatus = {
  idle: 'border-white/25 bg-white/10 text-slate-100',
  ready: 'border-emerald-300/30 bg-emerald-500/14 text-emerald-100',
  loading: 'border-cyan-300/35 bg-cyan-500/16 text-cyan-100',
  unavailable: 'border-amber-300/30 bg-amber-500/14 text-amber-100',
} as const

type BadgeState = keyof typeof stateClassByStatus

/**
 * BI-ready shell that stays honest when credentials/runtime are not wired.
 * It is intentionally lightweight and lazy-load friendly for the proof chapter.
 */
export default function BiEmbedReadinessShell({ sourceId, accessMode, activationInput }: BiEmbedReadinessShellProps) {
  const runtimeConfig = getViteDataActivationRuntimeConfig()
  const readinessLabel = getDataActivationReadinessLabel(runtimeConfig)
  const [remoteState, setRemoteState] = useState<RemoteBiActivationState | null>(null)
  const effectiveActivationInput = {
    ...activationInput,
    hasCredentialProvider: activationInput.hasCredentialProvider && runtimeConfig.biActivation.serverReady,
  }
  const localEvaluation = evaluateBiActivation({
    sourceId,
    accessMode,
    ...effectiveActivationInput,
  })

  const evaluation = remoteState
    ? {
        state: remoteState.state === 'ready' ? 'ready' : remoteState.state === 'hybrid' ? 'unavailable' : remoteState.state === 'mock-local' ? 'idle' : 'unavailable',
        reason: remoteState.reason,
        canActivate: remoteState.state === 'ready',
        requiredData: localEvaluation.requiredData,
        degradationStrategy: localEvaluation.degradationStrategy,
        nextRouteHandlerMigration: localEvaluation.nextRouteHandlerMigration,
      }
    : localEvaluation
  const visualState: BadgeState = evaluation.state in stateClassByStatus
    ? (evaluation.state as BadgeState)
    : 'unavailable'

  useEffect(() => {
    let cancelled = false

    if (!runtimeConfig.biActivation.endpoint) {
      setRemoteState(null)
      return () => {
        cancelled = true
      }
    }

    void fetchRemoteBiActivationState(runtimeConfig.biActivation.endpoint).then((value) => {
      if (!cancelled) {
        setRemoteState(value)
      }
    })

    return () => {
      cancelled = true
    }
  }, [runtimeConfig.biActivation.endpoint])

  useEffect(() => {
    trackTelemetryEvent('bi_activation_state', {
      sourceId,
      state: evaluation.state,
      canActivate: evaluation.canActivate,
      runtimeMode: readinessLabel,
    })

    trackTelemetryEvent('bi_activation_attempt', {
      sourceId,
      state: evaluation.state,
      runtimeMode: readinessLabel,
      requested: activationInput.activationRequested,
      serverReady: runtimeConfig.biActivation.serverReady,
    })
  }, [activationInput.activationRequested, evaluation.canActivate, evaluation.state, readinessLabel, runtimeConfig.biActivation.serverReady, sourceId])

  return (
    <section className="rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-500/10 via-blue-500/6 to-slate-900/50 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-cyan-100">
          <BarChart3 size={18} />
          <h4 className="text-base font-semibold sm:text-lg">BI Integration Shell</h4>
        </div>
        <Badge variant="outline" className={['border', stateClassByStatus[visualState]].join(' ')}>
          {visualState.toUpperCase()}
        </Badge>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-200">
        Este bloque define el contrato de activacion BI sin forzar credenciales reales en este entorno.
      </p>

      <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
        Runtime mode: {readinessLabel}
      </p>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
          <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Source ID</dt>
          <dd className="mt-1 text-sm text-slate-100 break-all">{sourceId}</dd>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
          <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Access Mode</dt>
          <dd className="mt-1 text-sm text-slate-100">{accessMode}</dd>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
          <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Activation</dt>
          <dd className="mt-1 text-sm text-slate-100">{activationInput.activationRequested ? 'Requested' : 'User intent required'}</dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-slate-300">{evaluation.reason}</p>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Required Data</p>
          <ul className="mt-2 space-y-1 text-xs text-slate-200">
            {evaluation.requiredData.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Graceful Degradation</p>
          <ul className="mt-2 space-y-1 text-xs text-slate-200">
            {evaluation.degradationStrategy.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
        Controlled handoff
        <ExternalLink size={12} />
      </p>
    </section>
  )
}
