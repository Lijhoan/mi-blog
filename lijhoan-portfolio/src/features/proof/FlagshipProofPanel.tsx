'use client'

import { lazy, Suspense, useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge.jsx'
import { flagshipProofCaseStudy } from '@/content/case-studies/flagshipProof.data.ts'
import { trackTelemetryEvent } from '@/features/telemetry/telemetryClient.ts'
import { AlertTriangle, Cloud, Database, Lock, ServerCog, ShieldCheck, Workflow } from 'lucide-react'

const BiEmbedReadinessShell = lazy(() => import('./BiEmbedReadinessShell.tsx'))

const statusLabel = {
  verified: 'Verificado',
  estimated: 'Estimado',
  pending: 'Pendiente',
  unavailable: 'No disponible',
} as const

const statusClass = {
  verified: 'border-emerald-300/30 bg-emerald-500/12 text-emerald-100',
  estimated: 'border-blue-300/30 bg-blue-500/14 text-blue-100',
  pending: 'border-amber-300/30 bg-amber-500/12 text-amber-100',
  unavailable: 'border-slate-300/25 bg-slate-500/15 text-slate-100',
} as const

const architectureIcons = [Database, Workflow, ServerCog, Cloud] as const

/**
 * Flagship proof panel for the projects chapter.
 * It prioritizes real architecture and impact narrative over decorative complexity.
 */
export default function FlagshipProofPanel() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = rootRef.current

    if (!root || typeof IntersectionObserver === 'undefined') {
      return
    }

    let reported = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || reported) {
          return
        }

        reported = true
        trackTelemetryEvent('proof_interaction', {
          action: 'flagship-panel-visible',
          projectId: flagshipProofCaseStudy.id,
        })
      },
      {
        threshold: 0.45,
      },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  return (
    <article ref={rootRef} className="flex min-h-[82svh] w-[90vw] max-w-[1120px] shrink-0 flex-col justify-between overflow-hidden rounded-[1.5rem] border border-cyan-300/18 bg-slate-950/58 p-6 sm:p-8 lg:p-9 backdrop-blur-lg">
      <div className="space-y-5">
        <div className="max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border border-cyan-300/24 bg-cyan-500/10 text-cyan-100">Caso principal</Badge>
            <Badge variant="outline" className="border-white/14 bg-white/[0.03] text-slate-200">{flagshipProofCaseStudy.projectCategory}</Badge>
          </div>
          <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">{flagshipProofCaseStudy.projectTitle}</h3>
          <p className="max-w-[64ch] text-sm leading-relaxed text-slate-200 sm:text-base">{flagshipProofCaseStudy.whyThisCase}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {flagshipProofCaseStudy.storyPanels.slice(0, 2).map((panel, panelIndex) => {
            const Icon = architectureIcons[panelIndex] ?? Workflow

            return (
              <section key={panel.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="mb-2 flex items-center gap-2 text-cyan-100">
                  <Icon size={15} />
                  <h4 className="text-sm font-semibold uppercase tracking-[0.14em]">{panel.title}</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  {panel.points.map((point) => (
                    <li key={point} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>

          <section className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {flagshipProofCaseStudy.impactMetrics.map((metric) => (
              <article key={metric.label} className="rounded-lg border border-white/10 bg-black/15 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">{metric.label}</p>
                <span className={["rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]", statusClass[metric.status]].join(' ')}>
                  {statusLabel[metric.status]}
                </span>
              </div>
                <p className="mt-1.5 text-lg font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-xs text-slate-300">{metric.unit}</p>
                <p className="mt-1 text-xs text-slate-400">{metric.timeframe}</p>
                {metric.baseline && (
                  <p className="mt-2 text-xs text-slate-400">Base: {metric.baseline}</p>
                )}
                {metric.after && (
                  <p className="mt-1 text-xs text-slate-400">Después: {metric.after}</p>
                )}
                {metric.delta && (
                  <p className="mt-1 text-xs text-slate-300">Variación: {metric.delta}</p>
                )}
              {metric.confidenceNote && (
                <p className="mt-2 text-xs text-slate-400">{metric.confidenceNote}</p>
              )}
            </article>
          ))}
        </section>

          <section className="grid gap-3 lg:grid-cols-2">
            <article className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100">
                <ShieldCheck size={15} />
                Señales de credibilidad
              </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {flagshipProofCaseStudy.credibilitySignals.map((signal) => (
                <li key={signal} className="leading-relaxed">{signal}</li>
              ))}
            </ul>
          </article>

            <article className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100">
                <Lock size={15} />
                Restricciones y complejidad
              </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {flagshipProofCaseStudy.constraintsAndComplexity.map((constraint) => (
                <li key={constraint} className="leading-relaxed">{constraint}</li>
              ))}
            </ul>
          </article>
        </section>

        <Suspense
          fallback={
            <div className="rounded-2xl border border-white/12 bg-black/20 p-4 text-sm text-slate-300">
              Preparando capa BI...
            </div>
          }
        >
          <BiEmbedReadinessShell
            sourceId="tale-insight-analytics"
            accessMode="private"
            activationInput={flagshipProofCaseStudy.dataProofLayer.activationContract.currentReadiness}
          />
        </Suspense>
      </div>

      <div className="mt-5 rounded-lg border border-amber-300/20 bg-amber-500/9 px-4 py-3 text-xs text-amber-100">
        <p className="flex items-center gap-2 uppercase tracking-[0.14em]">
          <AlertTriangle size={13} />
          Alcance honesto
        </p>
        <p className="mt-2 leading-relaxed text-amber-100/90">
          Las métricas de ahorro económico exacto siguen pendientes de instrumentación. Este capítulo solo declara impacto verificado y deja el contrato BI listo para conexión futura.
        </p>
      </div>
    </article>
  )
}
