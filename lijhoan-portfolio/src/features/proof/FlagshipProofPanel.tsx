'use client'

import { flagshipProofCaseStudy } from '@/content/case-studies/flagshipProof.data.ts'

/**
 * Caso principal (P.01) como bloque editorial abierto: sin cajas contenedoras.
 * Narrativa mínima + stats inline a la izquierda, pipeline vertical ↓ a la derecha.
 */
export default function FlagshipProofPanel() {
  const { pipeline } = flagshipProofCaseStudy

  return (
    <article className="pb-16 sm:pb-20">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[9px] uppercase tracking-[0.14em] text-faint">
        <span className="font-doto text-[11px] font-bold text-accent">P.01</span>
        <span>caso principal</span>
        <span className="ml-auto hidden sm:inline">{flagshipProofCaseStudy.projectCategory}</span>
      </div>

      <h3 className="mt-4 max-w-[24ch] text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {flagshipProofCaseStudy.projectTitle}
      </h3>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* Narrativa mínima + stats */}
        <div className="flex flex-col gap-8">
          <p className="max-w-[48ch] text-[13px] leading-relaxed text-dim">{flagshipProofCaseStudy.whyThisCase}</p>

          <div className="flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-6">
            {flagshipProofCaseStudy.impactMetrics.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="font-doto text-xl font-bold text-ink sm:text-2xl">{metric.value}</p>
                <p className="text-[9px] uppercase tracking-[0.14em] text-faint">{metric.label}</p>
                <p className="text-[9px] text-faint">{metric.unit}</p>
              </div>
            ))}
          </div>

          <p className="mt-auto text-[9px] uppercase tracking-[0.14em] leading-relaxed text-faint">
            <span aria-hidden="true" className="text-accent">●</span> {flagshipProofCaseStudy.honestyNote}
          </p>
        </div>

        {/* Pipeline vertical abierto */}
        <div>
          <div className="flex items-baseline justify-between gap-3 border-b border-line pb-2.5">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink">Flujo</h4>
            <span className="text-[9px] uppercase tracking-[0.12em] text-faint">{pipeline.title}</span>
          </div>

          <ol className="pt-4">
            {pipeline.steps.map((step, stepIndex) => {
              const isLast = stepIndex === pipeline.steps.length - 1

              return (
                <li key={step.label}>
                  <div className="flex items-baseline justify-between gap-3 py-1.5">
                    <span className="flex min-w-0 items-baseline gap-3">
                      <span className="font-doto w-6 shrink-0 text-[10px] font-bold text-faint">
                        {String(stepIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate text-[12px] font-bold text-ink">{step.label}</span>
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

          <p className="mt-4 border-t border-line pt-3 text-[9px] uppercase tracking-[0.12em] leading-relaxed text-faint">
            <span aria-hidden="true" className="text-accent">●</span> transversal — {pipeline.transversal}
          </p>
        </div>
      </div>
    </article>
  )
}
