'use client'

import FlagshipProofPanel from '@/features/proof/FlagshipProofPanel.tsx'
import ProjectGlyph from './ProjectGlyph.tsx'
import type { ProjectItem } from '@/content/profile/profile.types'

type ProjectsSectionProps = {
  projects: ProjectItem[]
}

const hasCredibleLink = (link?: string) => {
  if (!link) {
    return false
  }

  const normalized = link.trim()
  return normalized.length > 0 && normalized !== '#'
}

/**
 * Índice editorial de proyectos: scroll vertical normal, sin cajas contenedoras.
 * P.01 abierto arriba; el resto como filas separadas por líneas 1px.
 */
export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="chapter-section min-h-[calc(100svh-4rem)] px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-12 flex items-baseline gap-4">
          <span className="font-doto text-[13px] font-bold text-accent">[02]</span>
          <h2 className="text-[13px] font-bold uppercase tracking-[0.22em] text-ink">Proyectos</h2>
          <span aria-hidden="true" className="h-px flex-1 self-center bg-line" />
          <span className="hidden text-[10px] uppercase tracking-[0.12em] text-faint sm:inline">{projects.length + 1} casos documentados</span>
        </div>

        <FlagshipProofPanel />

        {projects.map((project, projectIndex) => {
          const projectHasLink = hasCredibleLink(project.link)

          return (
            <article
              key={project.id}
              className="group grid grid-cols-[72px_1fr] items-center gap-5 border-t border-line py-8 transition-all duration-200 hover:bg-card hover:pl-4 motion-reduce:transition-none sm:grid-cols-[104px_1fr_auto] sm:gap-8 sm:py-10"
            >
              <ProjectGlyph
                kind={project.glyph}
                className="h-[72px] w-[72px] text-ink sm:h-[104px] sm:w-[104px]"
              />

              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-doto text-[11px] font-bold text-accent">P.0{projectIndex + 2}</span>
                  <h3 className="text-base font-bold leading-snug text-ink sm:text-lg">{project.title}</h3>
                  <span className="text-[9px] uppercase tracking-[0.12em] text-faint">{project.category} · {project.year}</span>
                </div>

                <p className="mt-2 max-w-[60ch] text-[12px] leading-relaxed text-dim line-clamp-2">{project.description}</p>

                <p className="mt-3 text-[9px] uppercase tracking-[0.1em] leading-relaxed text-faint">
                  {project.technologies.join(' · ')}
                </p>

                <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-faint sm:hidden">
                  {projectHasLink ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-ink transition-colors duration-200 hover:text-accent">
                      Ver proyecto ↗
                    </a>
                  ) : (
                    <>
                      <span aria-hidden="true" className="text-accent">●</span> privado / nda
                    </>
                  )}
                </p>
              </div>

              <div className="hidden pr-2 text-right sm:block">
                {projectHasLink ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.12em] text-ink transition-colors duration-200 hover:text-accent"
                  >
                    Ver ↗
                  </a>
                ) : (
                  <span className="text-[9px] uppercase tracking-[0.12em] text-faint">
                    <span aria-hidden="true" className="text-accent">●</span> privado<br />/ nda
                  </span>
                )}
              </div>
            </article>
          )
        })}

        <div aria-hidden="true" className="border-t border-line" />
      </div>
    </section>
  )
}
