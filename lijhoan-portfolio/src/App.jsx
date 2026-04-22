import { useState, useEffect } from 'react'
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
  Mail,
  LinkedinIcon,
  MessageSquare,
  ChevronRight,
  Phone,
  ExternalLink
} from 'lucide-react'
import fotoPerfil from './assets/lijhoan.png'


function App() {
  const [activeSection, setActiveSection] = useState('home')
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
      title: 'Data Intelligence',
      summary: 'Modelado de indicadores, visual analytics y decisiones operativas con trazabilidad.',
      items: skills.dataBi,
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning',
      summary: 'Prediccion, segmentacion y despliegue de modelos orientados a impacto real.',
      items: skills.ml,
    },
    {
      id: 'engineering-delivery',
      title: 'Engineering Delivery',
      summary: 'Automatizacion, desarrollo y ejecucion de flujos completos de producto y datos.',
      items: [...skills.dev, ...skills.ai],
    },
    {
      id: 'platform-governance',
      title: 'Platform and Governance',
      summary: 'Infraestructura cloud, seguridad operativa y escalabilidad para entornos corporativos.',
      items: skills.infra,
    },
  ]

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const runtimeConfig = initializeDataActivationLayer()

    void smokeTestRemoteFlagshipContent(runtimeConfig).then((payload) => {
      if (payload && import.meta.env.DEV) {
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
    { id: 'projects', label: 'Proyectos', shortLabel: 'Proof', kind: 'immersive' },
    { id: 'skills', label: 'Habilidades', shortLabel: 'Skills', kind: 'reading' },
    { id: 'experience', label: 'Experiencia', shortLabel: 'Trust', kind: 'immersive' },
    { id: 'certifications', label: 'Credenciales', shortLabel: 'Creds', kind: 'reading' },
    { id: 'contact', label: 'Contacto', shortLabel: 'CTA', kind: 'immersive' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white">
      <NavigationShell
        items={navigation}
        activeSectionId={activeSection}
        onChangeSection={setActiveSection}
      />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen pb-24 md:ml-[86px] md:pb-0 lg:ml-[104px]">
        <SceneContinuityLayer chapter={currentChapter} />
        {/* Home Section */}
        {activeSection === 'home' && (
          <section className={`chapter-section relative min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10 transition-all duration-1000 motion-reduce:transition-none ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <IdentityChapterOverlay />
            <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-8 lg:gap-12 items-start">
              <div className="space-y-8">
                <div className="space-y-5 max-w-3xl">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-100/70">Identity chapter</p>
                  <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold tracking-tight leading-[1.04] text-balance">
                    {hero.headline}
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-200/95 leading-relaxed max-w-[56ch]">
                    {hero.summary}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl">
                  {hero.metrics.map((metric) => (
                    <article key={metric.label} className="rounded-xl border border-white/12 bg-white/[0.035] px-4 py-4 backdrop-blur-md">
                      <p className="text-2xl sm:text-3xl font-semibold text-cyan-200">{metric.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-300">{metric.label}</p>
                    </article>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                  <Button
                    onClick={() => setActiveSection('projects')}
                    className="bg-white/10 hover:bg-white/18 text-white border border-white/18 px-6 sm:px-8 py-3 rounded-xl flex-1 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                  >
                    Ver Proof
                    <ChevronRight size={20} className="ml-2" />
                  </Button>

                  <Button
                    onClick={() => {
                      trackCtaInteraction('download-cv', '/cv.pdf')
                      window.open('/cv.pdf', '_blank')
                    }}
                    className="bg-gradient-to-r from-cyan-500/95 to-blue-600/95 hover:from-cyan-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl flex-1 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                  >
                    <Download size={20} className="mr-2" />
                    Descargar CV
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/12 bg-slate-950/58 p-5 sm:p-6 backdrop-blur-xl">
                <div className="aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-slate-900/65">
                  <img src={fotoPerfil} alt={`${profile.name} portrait`} className="h-full w-full object-cover object-top" />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">Author signal</p>
                  <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
                  <p className="text-sm text-gray-300">{profile.role}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-gray-400">{profile.location}</p>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* About Section */}
        {activeSection === 'about' && (
          <section className="chapter-section min-h-screen px-4 py-8 sm:px-6 lg:px-10 flex items-center">
            <div className="max-w-6xl mx-auto w-full">
              <div className="text-left mb-8 sm:mb-10">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 max-w-2xl">
                  Sobre <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Mí</span>
                </h2>
                <p className="text-sm uppercase tracking-[0.26em] text-cyan-200/70">Positioning and operating model</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-6 lg:gap-8 items-start">
                <article className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 sm:p-7 lg:p-8 backdrop-blur-xl">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed mb-4 sm:mb-6 max-w-[62ch]">
                    {overview}
                  </p>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6 max-w-[62ch]">
                    {positioning.focus}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                    {metrics.slice(1, 4).map((metric) => (
                      <article key={metric.label} className="rounded-xl border border-white/10 bg-black/20 px-4 py-4">
                        <p className="text-2xl sm:text-3xl font-semibold text-cyan-300 mb-1 sm:mb-2">{metric.value}</p>
                        <p className="text-xs uppercase tracking-[0.16em] text-gray-300">{metric.label}</p>
                      </article>
                    ))}
                  </div>
                </article>

                <aside className="rounded-2xl border border-white/12 bg-slate-950/58 p-5 sm:p-6 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/72">Operating pillars</p>
                  <ul className="mt-4 space-y-3 text-sm text-gray-200">
                    <li className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">Arquitectura de datos orientada a decisiones de negocio.</li>
                    <li className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">Implementacion full-stack con foco en adopcion operativa.</li>
                    <li className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3">Gobernanza y escalabilidad para contextos corporativos.</li>
                  </ul>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-gray-400">No gimmicks. Solo claridad, sistemas y evidencia.</p>
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
          <div className="max-w-6xl mx-auto w-full space-y-7">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/72">Capability chapter</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Capacidades <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">curadas por impacto</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed max-w-[62ch]">
                Cada bloque agrupa habilidades por rol operativo real, no por listado utilitario. El foco esta en capacidad de ejecucion, madurez tecnica y transferencia a negocio.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {skillGroups.map((group) => (
                <article key={group.id} className="rounded-2xl border border-white/12 bg-white/[0.035] p-5 sm:p-6 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/72">{group.title}</p>
                  <p className="mt-3 text-sm text-gray-300 leading-relaxed min-h-[3.4rem]">{group.summary}</p>
                  <div className="mt-4 grid gap-3">
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
          <div className="relative z-10 max-w-6xl mx-auto w-full space-y-6">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/72">Trust chapter</p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-white">
                Trayectoria <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">con evidencia operativa</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed max-w-[62ch]">
                De implementacion tecnica a adopcion empresarial: una secuencia de entrega continua, gobernanza y resultados medibles.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <article className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">Trust thesis</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Execution before rhetoric</h3>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  La credibilidad se construye con continuidad entre arquitectura, entrega y adopcion operativa. Este bloque resume esa linea de consistencia.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-200">
                  <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-3">Implementacion en entornos corporativos con requisitos de control y escalabilidad.</li>
                  <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-3">Capacidad de traducir complejidad tecnica a decisiones de negocio accionables.</li>
                  <li className="rounded-lg border border-white/10 bg-black/20 px-3 py-3">Ejecucion end-to-end: diseño, despliegue, adopcion y mejora continua.</li>
                </ul>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-3">
                    <p className="text-2xl font-semibold text-cyan-200">{experience.length}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-300">career stops</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-3">
                    <p className="text-2xl font-semibold text-cyan-200">Enterprise</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-gray-300">delivery focus</p>
                  </div>
                </div>
              </article>

              <div className="space-y-4">
                {experience.map((entry) => (
                  <article key={`${entry.company}-${entry.role}`} className="rounded-2xl border border-white/12 bg-slate-950/60 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/28">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/70">{entry.company}</p>
                        <h3 className="mt-1 text-lg sm:text-xl font-semibold tracking-tight text-white">{entry.role}</h3>
                      </div>
                      <p className="text-xs uppercase tracking-[0.14em] text-gray-400">{entry.period}</p>
                    </div>
                    <div className="mt-4 space-y-2">
                      {entry.highlights.map((highlight) => (
                        <p key={highlight} className="border-l border-cyan-300/24 pl-3 text-sm text-gray-300 leading-relaxed">{highlight}</p>
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
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/72">Credential chapter</p>
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
    <div className="relative z-10 max-w-5xl mx-auto w-full">
      <div className="text-left mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Contacto
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl leading-relaxed">
          Cierre editorial directo: estrategia de datos, arquitectura y ejecucion para convertir complejidad en ventaja operacional.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8">
        <article className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 sm:p-7 backdrop-blur-xl">
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Canales directos</h3>
          <div className="space-y-3">
            <a
              href={`mailto:${profile.email}`}
              onClick={() => trackCtaInteraction('email-click', profile.email)}
              className="flex items-center justify-between rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-gray-200 hover:border-cyan-300/35 hover:text-cyan-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            >
              <span className="flex items-center gap-3 text-sm sm:text-base"><Mail size={18} /> {profile.email}</span>
              <ExternalLink size={14} className="opacity-60" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaInteraction('linkedin-click', profile.linkedin)}
              className="flex items-center justify-between rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-gray-200 hover:border-cyan-300/35 hover:text-cyan-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            >
              <span className="flex items-center gap-3 text-sm sm:text-base"><LinkedinIcon size={18} /> linkedin.com/in/lijhoanmc</span>
              <ExternalLink size={14} className="opacity-60" />
            </a>

            <a
              href={`https://wa.me/${profile.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaInteraction('whatsapp-click', profile.phone)}
              className="flex items-center justify-between rounded-xl border border-white/12 bg-black/20 px-4 py-3 text-gray-200 hover:border-cyan-300/35 hover:text-cyan-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
            >
              <span className="flex items-center gap-3 text-sm sm:text-base"><MessageSquare size={18} /> {profile.phone}</span>
              <Phone size={14} className="opacity-60" />
            </a>
          </div>
        </article>

        <aside className="rounded-2xl border border-white/12 bg-slate-950/58 p-5 sm:p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100/70">Focus</p>
          <h4 className="mt-3 text-lg sm:text-xl font-semibold text-white">Roadmap de colaboración</h4>
          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            Diseño y ejecución de plataformas BI, data pipelines y arquitectura cloud para equipos que necesitan velocidad con gobernanza.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-cyan-200/25 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-cyan-100">Business Intelligence</span>
            <span className="rounded-full border border-blue-200/25 bg-blue-500/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-blue-100">Data Engineering</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.14em] text-slate-100">Cloud Architecture</span>
          </div>
        </aside>
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
    return { label: 'Principal', className: 'text-cyan-100 border-cyan-200/25 bg-cyan-500/12' }
  }

  if (level >= 80) {
    return { label: 'Advanced', className: 'text-blue-100 border-blue-200/25 bg-blue-500/12' }
  }

  return { label: 'Operational', className: 'text-slate-100 border-white/20 bg-white/[0.06]' }
}

function SkillCard({ skill }) {
  const band = resolveSkillBand(skill.level)

  return (
    <article className="group rounded-xl border border-white/10 bg-black/20 px-4 py-4 transition-all duration-300 hover:border-cyan-300/28 hover:bg-white/[0.04]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-slate-900/70">
          <skill.icon size={18} className="text-cyan-300" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base font-semibold text-white truncate">{skill.name}</h3>
          <span className={[
            'mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]',
            band.className,
          ].join(' ')}>{band.label}</span>
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
