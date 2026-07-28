'use client'

import { flagshipProofCaseStudy } from '@/content/case-studies/flagshipProof.data.ts'

const statusLabel = {
  verified: 'Verificado',
  estimated: 'Estimado',
  pending: 'Pendiente',
  unavailable: 'No disponible',
} as const

const statusClass = {
  verified: 'text-ink',
  estimated: 'text-dim',
  pending: 'text-faint',
  unavailable: 'text-faint',
} as const

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
    <article className="flex min-h-[72svh] w-[86vw] max-w-[840px] shrink-0 flex-col border border-line bg-card">
      <div className="flex items-baseline justify-between gap-3 border-b border-line px-5 py-2.5 text-[9px] uppercase tracking-[0.14em] text-faint sm:px-6">
        <span className="font-doto text-[11px] font-bold text-accent">P.01</span>
        <span>caso principal</span>
        <span>{flagshipProofCaseStudy.projectCategory}</span>
      </div>

      {/* Diagrama centrado sin recortes; fondo igual al interior del SVG (#0a0a0a) para banda continua */}
      <div className="flex h-48 items-center justify-center border-b border-line bg-[#0a0a0a] sm:h-56">
        <img
          src="/projects/tale-insight-analytics.svg"
          alt={`Diagrama de arquitectura — ${flagshipProofCaseStudy.projectTitle}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col gap-6 p-5 sm:p-6 lg:p-8">
        <div className="max-w-3xl space-y-3">
          <h3 className="text-lg font-bold leading-snug text-ink sm:text-xl">{flagshipProofCaseStudy.projectTitle}</h3>
          <p className="max-w-[64ch] text-[12px] leading-relaxed text-dim sm:text-[13px]">{flagshipProofCaseStudy.whyThisCase}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {flagshipProofCaseStudy.storyPanels.slice(0, 2).map((panel) => (
            <section key={panel.title} className="border border-line p-4">
              <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-faint">{panelTitleMap[panel.title] ?? panel.title}</h4>
              <ul className="space-y-2 text-[12px] leading-relaxed text-dim">
                {panel.points.map((point) => (
                  <li key={point}><span aria-hidden="true" className="text-accent">—</span> {point}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section>
          <div className="mb-3 flex items-baseline gap-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-faint">Métricas de impacto</h4>
            <span aria-hidden="true" className="h-px flex-1 self-center bg-line" />
          </div>
          <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            {flagshipProofCaseStudy.impactMetrics.map((metric) => (
              <article key={metric.label} className="min-w-0 bg-card px-4 py-3">
                <p className="text-[9px] uppercase tracking-[0.14em] text-faint">{metric.label}</p>
                <p className="font-doto mt-2 break-words text-sm font-bold text-ink sm:text-base">{metric.value}</p>
                <p className="mt-1 text-[10px] text-faint">{metric.unit}</p>
                <p className={['mt-2 text-[9px] uppercase tracking-[0.14em]', statusClass[metric.status]].join(' ')}>
                  {metric.status === 'verified' && <span aria-hidden="true" className="text-accent">● </span>}
                  {statusLabel[metric.status]}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-auto border-l border-accent pl-4 text-[11px] leading-relaxed text-dim">
          {'// '}Las métricas de ahorro económico exacto siguen pendientes de instrumentación. Este caso solo declara impacto verificado, sin exagerar resultados.
        </div>
      </div>
    </article>
  )
}
