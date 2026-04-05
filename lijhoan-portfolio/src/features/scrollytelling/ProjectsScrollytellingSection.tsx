'use client'

import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { CardDescription, CardTitle } from '@/components/ui/card.jsx'
import ScrollyTellingContainer from '@/components/layout/ScrollyTellingContainer.tsx'
import ScrollRuntimeHud from '@/features/motion/debug/ScrollRuntimeHud.tsx'
import ProofChapterOverlay from '@/features/experience/ProofChapterOverlay.tsx'
import type { ProjectItem } from '@/content/profile/profile.types'
import { Calendar, ExternalLink } from 'lucide-react'

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
  const showRuntimeHud = import.meta.env.DEV && import.meta.env.VITE_SHOW_RUNTIME_HUD === 'true'

  return (
    <section className="chapter-section relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-10">
      <ScrollRuntimeHud enabled={showRuntimeHud} />
      <ProofChapterOverlay />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8 max-w-3xl text-left sm:mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Proof chapter</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            Proyectos <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">con evidencia de impacto</span>
          </h2>
          <p className="text-base text-gray-300 sm:text-lg">Una lectura curada: contexto editorial breve, recorrido horizontal y casos con decisiones, stack y resultado.</p>
        </div>

        <ScrollyTellingContainer className="bg-transparent" runtimeSceneId="projects-scrollytelling">
          <article className="flex min-h-[84svh] w-[86vw] max-w-[980px] shrink-0 flex-col justify-between rounded-[1.6rem] border border-white/12 bg-slate-950/55 p-6 sm:p-8 lg:p-10 backdrop-blur-lg">
            <div className="max-w-2xl space-y-4">
              <Badge variant="secondary" className="w-fit bg-cyan-500/20 text-cyan-200">
                Editorial intro
              </Badge>
              <h3 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
                Casos seleccionados para demostrar criterio tecnico, ejecucion y confiabilidad operativa.
              </h3>
              <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                El recorrido horizontal muestra proyectos priorizados desde el contenido canonico, sin ruido de capas ni decoracion competidora.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:max-w-lg sm:gap-5">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-2xl font-semibold text-cyan-300">{projects.length.toString().padStart(2, '0')}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-gray-300">Proyectos foco</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-2xl font-semibold text-blue-300">Proof</div>
                <div className="text-xs uppercase tracking-[0.18em] text-gray-300">Narrativa guiada</div>
              </div>
            </div>
          </article>

          {projects.map((project) => {
            const projectHasLink = hasCredibleLink(project.link)

            return (
            <article
              key={project.id}
              className="group flex min-h-[84svh] w-[86vw] max-w-[980px] shrink-0 flex-col overflow-hidden rounded-[1.6rem] border border-white/12 bg-slate-950/55 backdrop-blur-lg transition-all duration-300 hover:border-cyan-300/35"
            >
              <div className="grid h-full grid-rows-[auto,1fr] lg:grid-cols-[1.2fr_0.8fr] lg:grid-rows-1">
                <div className="relative min-h-[22rem] lg:min-h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-2 text-xs text-white backdrop-blur-md">
                    <Calendar size={12} />
                    {project.year}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-6 p-6 sm:p-7 lg:p-8">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-200">
                        {project.category}
                      </Badge>
                      <div className="text-xs uppercase tracking-[0.18em] text-gray-400">{project.client}</div>
                    </div>

                    <div className="space-y-2.5">
                      <CardTitle className="text-2xl text-white tracking-tight sm:text-3xl">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-gray-300 sm:text-base">
                        {project.description}
                      </CardDescription>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-white/20 bg-white/[0.03] text-gray-200">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="default"
                    size="lg"
                    disabled={!projectHasLink}
                    onClick={() => {
                      if (!projectHasLink) {
                        return
                      }

                      window.open(project.link, '_blank', 'noopener,noreferrer')
                    }}
                    className={[
                      'w-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:w-fit',
                      projectHasLink
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg hover:shadow-cyan-500/20'
                        : 'cursor-not-allowed border border-white/20 bg-white/10 text-gray-300 opacity-85',
                    ].join(' ')}
                  >
                    {projectHasLink ? 'Ver Proyecto' : 'Case study bajo solicitud'}
                    {projectHasLink && <ExternalLink size={16} className="ml-2" />}
                  </Button>

                  {!projectHasLink && (
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                      Credencial privada o enlace publico pendiente de publicacion.
                    </p>
                  )}
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