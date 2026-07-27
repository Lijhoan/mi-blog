'use client'

import { useEffect } from 'react'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { CardDescription, CardTitle } from '@/components/ui/card.jsx'
import ScrollyTellingContainer from '@/components/layout/ScrollyTellingContainer.tsx'
import ScrollRuntimeHud from '@/features/motion/debug/ScrollRuntimeHud.tsx'
import ProofChapterOverlay from '@/features/experience/ProofChapterOverlay.tsx'
import FlagshipProofPanel from '@/features/proof/FlagshipProofPanel.tsx'
import { trackTelemetryEvent } from '@/features/telemetry/telemetryClient.ts'
import type { ProjectItem } from '@/content/profile/profile.types'
import { Calendar, ExternalLink } from 'lucide-react'
import { isDev } from '@/lib/utils.js'

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
  const showRuntimeHud = isDev()

  useEffect(() => {
    trackTelemetryEvent('proof_interaction', {
      action: 'proof-section-visible',
      projectCount: projects.length,
    })
  }, [projects.length])

  return (
    <section className="chapter-section relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-10">
      <ScrollRuntimeHud enabled={showRuntimeHud} />
      <ProofChapterOverlay active={true} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8 max-w-2xl text-left sm:mb-10">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/60">Proyectos</p>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mt-3">
            Con evidencia <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">de impacto</span>
          </h2>
        </div>

        <ScrollyTellingContainer className="bg-transparent" runtimeSceneId="projects-scrollytelling">
          <FlagshipProofPanel />

          {projects.map((project) => {
            const projectHasLink = hasCredibleLink(project.link)

            return (
            <article
              key={project.id}
              className="group flex min-h-[78svh] w-[78vw] max-w-[920px] shrink-0 flex-col overflow-hidden rounded-[1.5rem] bg-slate-950/48 transition-all duration-300"
            >
              <div className="grid h-full grid-rows-[auto,1fr] lg:grid-cols-[1.2fr_0.8fr] lg:grid-rows-1">
                <div className="relative min-h-[22rem] lg:min-h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent" />
                  <div className="absolute left-5 top-5 flex items-center gap-2 px-2 py-1 text-xs text-white/85">
                    <Calendar size={12} />
                    {project.year}
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-6 p-6 sm:p-7 lg:p-8">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/75">{project.category}</p>
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
                        <Badge key={tech} variant="outline" className="border-white/10 bg-transparent text-gray-300">
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

                      trackTelemetryEvent('proof_interaction', {
                        action: 'project-link-open',
                        projectId: project.id,
                        projectTitle: project.title,
                      })

                      window.open(project.link, '_blank', 'noopener,noreferrer')
                    }}
                    className={[
                      'w-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 sm:w-fit',
                      projectHasLink
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:shadow-lg hover:shadow-cyan-500/20'
                        : 'cursor-not-allowed border border-white/20 bg-white/10 text-gray-300 opacity-85',
                    ].join(' ')}
                  >
                    {projectHasLink ? 'Ver Proyecto' : 'Demo no publica'}
                    {projectHasLink && <ExternalLink size={16} className="ml-2" />}
                  </Button>

                  {!projectHasLink && (
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-400">
                      {project.note || 'Proyecto en entorno privado o bajo NDA. Evidencia disponible en entrevista tecnica.'}
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