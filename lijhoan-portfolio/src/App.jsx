'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button.jsx'
import ProjectsScrollytellingSection from '@/features/scrollytelling/ProjectsScrollytellingSection.tsx'
import { dataBiSkills, devSkills, experienceTimeline, featuredProjects, infraSkills, mlSkills, profileContent, aiSkills } from '@/content/index.ts'
import IdentityChapterOverlay from '@/features/experience/IdentityChapterOverlay.tsx'
import TrustChapterOverlay from '@/features/experience/TrustChapterOverlay.tsx'
import SceneContinuityLayer from '@/features/experience/SceneContinuityLayer.tsx'
import { getSceneChapterBySectionId } from '@/features/experience/chapter-system.ts'
import CtaChapterOverlay from '@/features/experience/CtaChapterOverlay.tsx'
import CertificationTrustLayer from '@/features/experience/CertificationTrustLayer.jsx'
import NavigationShell from '@/features/navigation/NavigationShell.jsx'
import { trackTelemetryEvent, useChapterTelemetry } from '@/features/telemetry/telemetryClient.ts'
import { initializeDataActivationLayer, smokeTestRemoteFlagshipContent } from '@/features/data-activation/client.ts'
import {
  Download,
  ChevronRight,
} from 'lucide-react'
import { isDev } from '@/lib/utils.js'

const pathToSection = (pathname) => {
  const segments = pathname.split('/').filter(Boolean)
  return segments[0] || 'home'
}

function App() {
  const pathname = usePathname()
  const router = useRouter()
  const activeSection = pathToSection(pathname)
  const [isVisible, setIsVisible] = useState(false)
  const currentChapter = getSceneChapterBySectionId(activeSection)
  const profile = profileContent.identity
  const hero = {
    headline: profileContent.positioning.headline,
    summary: profileContent.positioning.summary,
    metrics: profileContent.metrics.slice(0, 2),
  }
  const positioning = profileContent.positioning
  const overview = profileContent.positioning.summary
  const metrics = profileContent.metrics
  const experience = experienceTimeline
  const contactLinks = profileContent.links.contact
  const skills = {
    dataBi: dataBiSkills,
    ml: mlSkills,
    dev: devSkills,
    infra: infraSkills,
    ai: aiSkills,
  }
  const skillGroups = [
    {
      id: 'data-intelligence',
      title: 'Inteligencia de datos',
      summary: 'Modelado de indicadores, visual analytics y decisiones operativas con trazabilidad.',
      items: skills.dataBi,
    },
    {
      id: 'machine-learning',
      title: 'Aprendizaje automatico',
      summary: 'Prediccion, segmentacion y despliegue de modelos orientados a impacto real.',
      items: skills.ml,
    },
    {
      id: 'engineering-delivery',
      title: 'Entrega de ingenieria',
      summary: 'Automatizacion, desarrollo y ejecucion de flujos completos de producto y datos.',
      items: [...skills.dev, ...skills.ai],
    },
    {
      id: 'platform-governance',
      title: 'Plataforma y gobernanza',
      summary: 'Infraestructura cloud, seguridad operativa y escalabilidad para entornos corporativos.',
      items: skills.infra,
    },
  ]

  const resolveContactHref = (label, fallback) => {
    return contactLinks.find((link) => link.label === label)?.href ?? fallback
  }

  const emailHref = resolveContactHref('Email', `mailto:${profile.email}`)
  const linkedinHref = resolveContactHref('LinkedIn', profile.linkedin)
  const whatsappHref = resolveContactHref('WhatsApp', `https://wa.me/${profile.phone.replace(/\D/g, '')}`)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const runtimeConfig = initializeDataActivationLayer()

    void smokeTestRemoteFlagshipContent(runtimeConfig).then((payload) => {
      if (payload && isDev()) {
        console.debug('[flagship-content-smoke-test]', payload)
      }
    })
  }, [])

  useChapterTelemetry(activeSection)

  const trackCtaInteraction = (action, target) => {
    trackTelemetryEvent('cta_interaction', {
      sectionId: activeSection,
      action,
      target,
    })
  }
  const navigation = [
    { id: 'home', label: 'Inicio', shortLabel: 'Inicio', kind: 'immersive' },
    { id: 'about', label: 'Perfil', shortLabel: 'Perfil', kind: 'reading' },
    { id: 'projects', label: 'Proyectos', shortLabel: 'Proyectos', kind: 'immersive' },
    { id: 'skills', label: 'Habilidades', shortLabel: 'Habilidades', kind: 'reading' },
    { id: 'experience', label: 'Trayectoria', shortLabel: 'Trayectoria', kind: 'immersive' },
    { id: 'certifications', label: 'Credenciales', shortLabel: 'Credenciales', kind: 'reading' },
    { id: 'contact', label: 'Contacto', shortLabel: 'Contacto', kind: 'immersive' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white">
      <NavigationShell
        items={navigation}
      />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen pb-24 md:ml-[86px] md:pb-0 lg:ml-[104px]">
        <SceneContinuityLayer chapter={currentChapter} />
        {/* Home Section */}
        {activeSection === 'home' && (
          <section className={`chapter-section relative min-h-screen flex items-center px-4 py-8 sm:px-6 lg:px-10 transition-all duration-1000 motion-reduce:transition-none ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <IdentityChapterOverlay />
            <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-16 items-center">
              {/* Left: Dominant headline + narrative */}
              <div className="space-y-8 order-2 lg:order-1">
                <div className="space-y-6 max-w-3xl">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-cyan-100/60">Identidad</p>
                  <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tighter leading-[1.08] text-white">
                    {hero.headline}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-[52ch]">
                    {hero.summary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  {hero.metrics.map((metric) => (
                    <div key={metric.label} className="space-y-1">
                      <p className="text-3xl sm:text-4xl font-bold text-cyan-300">{metric.value}</p>
                      <p className="text-xs uppercase tracking-[0.16em] text-gray-400">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md pt-2">
                  <Button
                    onClick={() => router.push('/projects')}
                    className="bg-cyan-500/18 hover:bg-cyan-500/28 text-cyan-200 border border-cyan-300/28 px-6 py-2.5 rounded-lg flex-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 text-sm font-medium"
                  >
                    Ver Proyectos
                    <ChevronRight size={16} className="ml-2" />
                  </Button>

                  <Button
                    onClick={() => {
                      trackCtaInteraction('download-cv', '/cv.pdf')
                      window.open('/cv.pdf', '_blank')
                    }}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg flex-1 transition-all duration-300 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
                  >
                    <Download size={16} className="mr-2" />
                    CV
                  </Button>
                </div>
              </div>

              {/* Right: Portrait (subordinated) */}
              <div className="order-1 lg:order-2">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800/70 to-slate-900/70 opacity-92">
                  <img src="/lijhoan.png" alt={`${profile.name}`} className="h-full w-full object-cover object-top" />
                </div>
                <div className="mt-4 space-y-1 text-center lg:text-left">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/60">{profile.name}</p>
                  <p className="text-sm text-gray-400">{profile.role}</p>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* About Section */}
        {activeSection === 'about' && (
          <section className="chapter-section min-h-screen px-4 py-8 sm:px-6 lg:px-10 flex items-center">
            <div className="max-w-6xl mx-auto w-full">
              <div className="mb-12 max-w-3xl">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/60 mb-4">Perfil</p>
                <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-white">
                  Sobre <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">mí</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                  {overview}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-base text-gray-300 leading-relaxed">
                    {positioning.focus}
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    {metrics.slice(1, 4).map((metric) => (
                      <div key={metric.label} className="space-y-2">
                        <p className="text-3xl sm:text-4xl font-bold text-cyan-300">{metric.value}</p>
                        <p className="text-xs uppercase tracking-[0.14em] text-gray-400">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <aside className="space-y-4 lg:pt-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/60">Pilares operativos</p>
                  <ul className="space-y-3 text-sm text-gray-300 leading-relaxed">
                    <li>Arquitectura de datos orientada a decisiones empresariales</li>
                    <li>Implementación full-stack con adopción operativa</li>
                    <li>Gobernanza y escalabilidad corporativa</li>
                  </ul>
                </aside>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <ProjectsScrollytellingSection projects={featuredProjects} />
        )}

      {activeSection === 'skills' && (
        <section className="chapter-section min-h-screen px-4 py-8 sm:px-6 lg:px-10 flex items-center">
          <div className="max-w-6xl mx-auto w-full space-y-10">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/60 mb-4">Capacidades</p>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-white">
                Curadas <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">por impacto</span>
              </h2>
              <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
                Cada grupo agrupa habilidades por rol operativo real. Foco en capacidad de ejecución, madurez técnica y transferencia a negocio.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {skillGroups.map((group) => (
                <article key={group.id} className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/60 mb-2">{group.title}</p>
                    <p className="text-sm text-gray-300">{group.summary}</p>
                  </div>
                  <div className="grid gap-2">
                    {group.items.map((skill) => (
                      <SkillCard key={skill.name} skill={skill} />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'experience' && (
        <section className="chapter-section relative min-h-screen px-4 py-8 sm:px-6 lg:px-10 flex items-center overflow-hidden">
          <TrustChapterOverlay />
          <div className="relative z-10 max-w-6xl mx-auto w-full space-y-8">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/60 mb-4">Trayectoria</p>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-white">
                Con <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">evidencia operativa</span>
              </h2>
              <p className="text-base text-gray-300 leading-relaxed max-w-2xl">
                De implementación técnica a adopción empresarial: continuidad entre entrega, gobernanza y resultados.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
              <div className="space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/60 mb-3">Tesis de confianza</p>
                  <h3 className="text-xl font-semibold text-white mb-3">Ejecución antes que retórica</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    La credibilidad se construye con continuidad entre arquitectura, entrega y adopción operativa.
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="leading-relaxed">Implementación en entornos corporativos con requisitos de control y escalabilidad.</li>
                  <li className="leading-relaxed">Capacidad de traducir complejidad técnica a decisiones accionables.</li>
                  <li className="leading-relaxed">Ejecución end-to-end: diseño, despliegue, adopción y mejora continua.</li>
                </ul>
              </div>

              <div className="space-y-4">
                {experience.map((entry) => (
                  <article key={`${entry.company}-${entry.role}`} className="space-y-2 pb-4 border-b border-white/8 last:border-0">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <h4 className="text-lg font-semibold text-white">{entry.role}</h4>
                      <p className="text-xs uppercase tracking-[0.12em] text-gray-400">{entry.period}</p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.14em] text-cyan-100/60">{entry.company}</p>
                    <div className="space-y-1.5 mt-2">
                      {entry.highlights.map((highlight) => (
                        <p key={highlight} className="text-sm text-gray-300 leading-relaxed">{highlight}</p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'certifications' && (
        <section className="chapter-section min-h-screen px-4 py-8 sm:px-6 lg:px-10 flex items-center">
          <div className="max-w-6xl mx-auto w-full space-y-6">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/72">Capitulo credenciales</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                Certificaciones <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">& Formación</span>
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed max-w-[62ch]">Evidencia verificable organizada por relevancia editorial: posicionamiento, soporte tecnico y trazabilidad historica.</p>
            </div>

            <CertificationTrustLayer />
          </div>
        </section>
      )}


{/* Contact Section */}
{activeSection === 'contact' && (
  <section className="chapter-section relative min-h-screen px-4 py-8 sm:px-6 lg:px-10 flex items-center overflow-hidden">
    <CtaChapterOverlay />
    <div className="relative z-10 max-w-6xl mx-auto w-full space-y-10">
      <div className="max-w-4xl">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/60 mb-4">Capitulo cierre</p>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-white">
          Construyamos <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">el siguiente sistema</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl">
          Trabajo con equipos que necesitan pasar de iniciativas aisladas a plataformas confiables de datos, automatización y decisiones operativas.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/60 mb-3">Siguiente paso</p>
            <a
              href={emailHref}
              onClick={() => trackCtaInteraction('email-primary', emailHref)}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-cyan-600 hover:to-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              Iniciar conversación por correo
              <ChevronRight size={16} />
            </a>
            <p className="mt-3 text-xs text-gray-400">
              Respuesta en 24 horas hábiles con enfoque inicial y siguientes pasos claros.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-300">
            <button
              type="button"
              onClick={() => {
                trackCtaInteraction('review-experience', 'experience')
                router.push('/experience')
              }}
              className="inline-flex items-center gap-2 text-cyan-200 hover:text-cyan-100 transition-colors duration-200"
            >
              Ver trayectoria reciente
              <ChevronRight size={14} />
            </button>

            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaInteraction('linkedin-secondary', linkedinHref)}
              className="inline-flex items-center gap-2 hover:text-cyan-300 transition-colors duration-200"
            >
              LinkedIn
              <span className="text-gray-500">→</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaInteraction('whatsapp-secondary', whatsappHref)}
              className="inline-flex items-center gap-2 hover:text-cyan-300 transition-colors duration-200"
            >
              WhatsApp
              <span className="text-gray-500">→</span>
            </a>
          </div>

          <p className="text-xs text-gray-400">
            {profile.email} · {profile.phone} · {profile.location}
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/60">Propuesta actual</p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Tomo proyectos donde la complejidad técnica debe convertirse en operación estable, gobernable y medible para el negocio.
            </p>
          </div>

          <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
            <li>Arquitectura y modernización de plataformas de datos en entornos corporativos.</li>
            <li>Integración de sistemas, automatización de procesos y trazabilidad operativa.</li>
            <li>Diseño de soluciones analíticas y de IA aplicadas a decisiones reales.</li>
          </ul>

          <p className="border-l border-cyan-300/35 pl-4 text-sm text-gray-300 leading-relaxed">
            6+ años ejecutando de punta a punta: diseño, despliegue, adopción y mejora continua.
          </p>
        </div>
      </div>
    </div>
  </section>
)}

      </main>
    </div>
  )
}

const resolveSkillBand = (level) => {
  if (level >= 90) {
    return { label: 'Nucleo', className: 'text-cyan-100' }
  }

  if (level >= 80) {
    return { label: 'Solido', className: 'text-blue-100' }
  }

  return { label: 'Soporte', className: 'text-slate-100' }
}

function SkillCard({ skill }) {
  const band = resolveSkillBand(skill.level)

  return (
    <article className="group px-2 py-3 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900/60">
          <skill.icon size={18} className="text-cyan-300" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base font-semibold text-white truncate">{skill.name}</h3>
          <p className={[
            'mt-1 text-[10px] uppercase tracking-[0.14em]',
            band.className,
          ].join(' ')}>{band.label}</p>
        </div>
        <p className="text-sm font-semibold text-cyan-200">{skill.level}%</p>
      </div>

      <div className="mt-3 h-1.5 rounded-full bg-white/10">
        <div className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400/85 to-blue-500/85" style={{ width: `${Math.max(24, skill.level)}%` }} />
      </div>
    </article>
  )
}
export default App
