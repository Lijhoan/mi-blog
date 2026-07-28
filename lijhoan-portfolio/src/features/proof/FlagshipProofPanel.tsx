'use client'

import { flagshipProofCaseStudy } from '@/content/case-studies/flagshipProof.data.ts'
import { AlertTriangle, Cloud, Database, Lock, ServerCog, ShieldCheck, Workflow } from 'lucide-react'

const statusLabel = {
  verified: 'Verificado',
  estimated: 'Estimado',
  pending: 'Pendiente',
  unavailable: 'No disponible',
} as const

const statusClass = {
  verified: 'text-emerald-200',
  estimated: 'text-blue-200',
  pending: 'text-amber-200',
  unavailable: 'text-slate-200',
} as const

const architectureIcons = [Database, Workflow, ServerCog, Cloud] as const
const panelTitleMap: Record<string, string> = {
  'Problem Framing': 'Marco del problema',
  'Architecture Snapshot': 'Resumen de arquitectura',
}

/**
 * Flagship proof panel for the projects chapter.
 * It prioritizes real architecture and impact narrative over decorative complexity.
 */
export default function FlagshipProofPanel() {
  return (
    <article className="flex min-h-[84svh] w-[94vw] max-w-[1180px] shrink-0 flex-col justify-between overflow-hidden rounded-[1.6rem] bg-slate-950/60 p-6 sm:p-8 lg:p-10 backdrop-blur-xl">
      <div className="space-y-5">
        <div className="space-y-3 max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/75">Caso principal</p>
          <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">{flagshipProofCaseStudy.projectTitle}</h3>
          <p className="max-w-[64ch] text-sm leading-relaxed text-slate-200 sm:text-base">{flagshipProofCaseStudy.whyThisCase}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {flagshipProofCaseStudy.storyPanels.slice(0, 2).map((panel, panelIndex) => {
            const Icon = architectureIcons[panelIndex] ?? Workflow

            return (
              <section key={panel.title} className="rounded-2xl bg-white/[0.02] p-4">
                <div className="mb-2 flex items-center gap-2 text-cyan-100">
                  <Icon size={15} />
                  <h4 className="text-sm font-semibold uppercase tracking-[0.14em]">{panelTitleMap[panel.title] ?? panel.title}</h4>
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

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {flagshipProofCaseStudy.impactMetrics.map((metric) => (
            <article key={metric.label} className="rounded-xl bg-black/20 px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">{metric.label}</p>
                <span className={["text-[10px] uppercase tracking-[0.12em]", statusClass[metric.status]].join(' ')}>
                  {statusLabel[metric.status]}
                </span>
              </div>
              <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
              <p className="mt-1 text-xs text-slate-300">{metric.unit}</p>
              <p className="mt-1 text-xs text-slate-400">{metric.timeframe}</p>
              {metric.baseline && (
                <p className="mt-2 text-xs text-slate-400">Baseline: {metric.baseline}</p>
              )}
              {metric.after && (
                <p className="mt-1 text-xs text-slate-400">After: {metric.after}</p>
              )}
              {metric.delta && (
                <p className="mt-1 text-xs text-slate-300">Delta: {metric.delta}</p>
              )}
              {metric.confidenceNote && (
                <p className="mt-2 text-xs text-slate-400">{metric.confidenceNote}</p>
              )}
            </article>
          ))}
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl bg-white/[0.02] p-4">
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

          <article className="rounded-2xl bg-white/[0.02] p-4">
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
      </div>

      <div className="mt-5 border-l border-amber-300/35 pl-4 text-xs text-amber-100">
        <p className="flex items-center gap-2 uppercase tracking-[0.14em]">
          <AlertTriangle size={13} />
          Alcance real
        </p>
        <p className="mt-2 leading-relaxed text-amber-100/90">
          Las metricas de ahorro economico exacto siguen pendientes de instrumentacion. Este chapter solo declara impacto verificado, sin exagerar resultados.
        </p>
      </div>
    </article>
  )
}
