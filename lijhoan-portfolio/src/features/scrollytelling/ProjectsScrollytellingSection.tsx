'use client'

import ScrollyTellingContainer from '@/components/layout/ScrollyTellingContainer.tsx'
import FlagshipProofPanel from '@/features/proof/FlagshipProofPanel.tsx'
import type { ProjectItem } from '@/content/profile/profile.types'

type ProjectsScrollytellingSectionProps = {
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
 * Composes the projects scrollytelling section using the shared motion shell.
 * This file owns only content and layout for the projects scene.
 */
export default function ProjectsScrollytellingSection({ projects }: ProjectsScrollytellingSectionProps) {
  return (
    <section className="chapter-section relative min-h-[calc(100svh-4rem)] overflow-hidden px-6 py-16 sm:px-8 lg:px-12">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 flex items-baseline gap-4">
          <span className="font-doto text-[13px] font-bold text-accent">[02]</span>
          <h2 className="text-[13px] font-bold uppercase tracking-[0.22em] text-ink">Proyectos</h2>
          <span aria-hidden="true" className="h-px flex-1 self-center bg-line" />
          <span className="hidden text-[10px] uppercase tracking-[0.12em] text-faint sm:inline">{projects.length + 1} casos documentados</span>
        </div>

        <ScrollyTellingContainer className="bg-transparent" runtimeSceneId="projects-scrollytelling">
          <FlagshipProofPanel />

          {projects.map((project, projectIndex) => {
            const projectHasLink = hasCredibleLink(project.link)

            return (
              <article
                key={project.id}
                className="group flex min-h-[72svh] w-[82vw] max-w-[560px] shrink-0 flex-col border border-line bg-card transition-all duration-250 hover:-translate-y-[3px] hover:border-accent/60 motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-baseline justify-between gap-3 border-b border-line px-5 py-2.5 text-[9px] uppercase tracking-[0.14em] text-faint">
                  <span className="font-doto text-[11px] font-bold text-accent">P.0{projectIndex + 2}</span>
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>

                {/* Diagrama completo, proporción nativa 1200x760 — sin recortes */}
                <div className="aspect-[30/19] overflow-hidden border-b border-line">
                  <img
                    src={project.image}
                    alt={`Diagrama de arquitectura — ${project.title}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                  <h3 className="text-[15px] font-bold leading-snug text-ink">{project.title}</h3>
                  <p className="text-[12px] leading-relaxed text-dim">{project.description}</p>
                  <p className="text-[10px] uppercase tracking-[0.08em] text-faint">{project.technologies.join(' · ')}</p>

                  <div className="mt-auto flex items-baseline justify-between gap-3 border-t border-line pt-4">
                    {projectHasLink ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] uppercase tracking-[0.1em] text-ink transition-colors duration-200 hover:text-accent"
                      >
                        Ver proyecto ↗
                      </a>
                    ) : (
                      <span className="text-[10px] uppercase tracking-[0.1em] text-faint">
                        <span aria-hidden="true" className="text-accent">●</span> privado / nda
                      </span>
                    )}
                    <span className="text-[9px] uppercase tracking-[0.1em] text-faint">{project.client}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </ScrollyTellingContainer>
      </div>
    </section>
  )
}
