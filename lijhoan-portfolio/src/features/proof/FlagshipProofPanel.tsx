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

/**
 * Flagship proof panel for the projects chapter.
 * Narrativa a la izquierda, pipeline vertical (↓) a la derecha, métricas como pie.
 */
export default function FlagshipProofPanel() {
  const { pipeline } = flagshipProofCaseStudy

  return (
    <article className="flex min-h-[72svh] w-[88vw] max-w-[780px] shrink-0 flex-col border border-line bg-card">
      <div className="flex items-baseline justify-between gap-3 border-b border-line px-5 py-2.5 text-[9px] uppercase tracking-[0.14em] text-faint sm:px-6">
        <span className="font-doto text-[11px] font-bold text-accent">P.01</span>
        <span>caso principal</span>
        <span className="hidden sm:inline">{flagshipProofCaseStudy.projectCategory}</span>
      </div>

      <div className="grid flex-1 gap-8 p-5 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
        {/* Izquierda: narrativa */}
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-bold leading-snug text-ink sm:text-xl">{flagshipProofCaseStudy.projectTitle}</h3>
          <p className="text-[12px] leading-relaxed text-dim sm:text-[13px]">{flagshipProofCaseStudy.whyThisCase}</p>

          <div className="space-y-3">
            <p className="text-[10px] uppercase tracking-[0.22em] text-faint">{'// marco del problema'}</p>
            <ul className="space-y-2.5 text-[12px] leading-relaxed text-dim">
              {flagshipProofCaseStudy.problemFraming.map((point) => (
                <li key={point}>
                  <span aria-hidden="true" className="text-accent">—</span> {point}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-auto border-l border-accent pl-4 text-[11px] leading-relaxed text-dim">
            {'// '}{flagshipProofCaseStudy.honestyNote}
          </p>
        </div>

        {/* Derecha: pipeline vertical spec-sheet */}
        <div className="flex flex-col border border-line">
          <div className="flex items-baseline justify-between gap-3 border-b border-line px-4 py-2.5">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink">Flujo</h4>
            <span className="text-[9px] uppercase tracking-[0.12em] text-faint">{pipeline.title}</span>
          </div>

          <ol className="flex flex-1 flex-col justify-center px-4 py-3">
            {pipeline.steps.map((step, stepIndex) => {
              const isLast = stepIndex === pipeline.steps.length - 1

              return (
                <li key={step.label}>
                  <div className="flex items-baseline justify-between gap-3 py-1.5">
                    <span className="flex min-w-0 items-baseline gap-3">
                      <span className="font-doto w-6 shrink-0 text-[10px] font-bold text-faint">
                        {String(stepIndex + 1).padStart(2, '0')}
                      </span>
                      <span className={['truncate text-[12px] font-bold', isLast ? 'text-ink' : 'text-ink'].join(' ')}>
                        {step.label}
                      </span>
                    </span>
                    <span className="shrink-0 text-[9px] uppercase tracking-[0.12em] text-faint">{step.detail}</span>
                  </div>

                  {!isLast && (
                    <div aria-hidden="true" className="w-6 text-center text-[11px] leading-none text-faint">↓</div>
                  )}
                </li>
              )
            })}
          </ol>

          <div className="border-t border-line px-4 py-2.5 text-[9px] uppercase tracking-[0.12em] leading-relaxed text-faint">
            <span aria-hidden="true" className="text-accent">●</span> transversal — {pipeline.transversal}
          </div>
        </div>
      </div>

      {/* Métricas de impacto: pie de ancho completo */}
      <div className="border-t border-line">
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
      </div>
    </article>
  )
}
