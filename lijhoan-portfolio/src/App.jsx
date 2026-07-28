'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import ProjectsScrollytellingSection from '@/features/scrollytelling/ProjectsScrollytellingSection.tsx'
import { dataBiSkills, devSkills, experienceTimeline, featuredProjects, infraSkills, mlSkills, profileContent, aiSkills } from '@/content/index.ts'
import CertificationTrustLayer from '@/features/experience/CertificationTrustLayer.jsx'
import NavigationShell from '@/features/navigation/NavigationShell.jsx'

const pathToSection = (pathname) => {
  const segments = pathname.split('/').filter(Boolean)
  return segments[0] || 'home'
}

function App() {
  const pathname = usePathname()
  const router = useRouter()
  const activeSection = pathToSection(pathname)
  const [isVisible, setIsVisible] = useState(false)
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
    <div className="min-h-screen">
      <NavigationShell
        items={navigation}
      />

      {/* Main Content */}
      <main className="relative z-10 min-h-screen pt-16">
        {/* Home Section */}
        {activeSection === 'home' && (
          <section className={`chapter-section relative min-h-[calc(100svh-4rem)] flex items-center px-6 py-16 sm:px-8 lg:px-12 transition-all duration-1000 motion-reduce:transition-none ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative z-10 mx-auto w-full max-w-6xl">
              {/* Metadatos técnicos superiores */}
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4 text-[10px] uppercase tracking-[0.14em] text-faint">
                <span>[ portfolio — v2.0 ]</span>
                <span className="hidden sm:inline">{profile.location}</span>
                <span>2026</span>
              </div>

              <div className="grid grid-cols-1 items-center gap-12 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:pt-16">
                {/* Izquierda: headline dominante + narrativa */}
                <div className="order-2 space-y-8 lg:order-1">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-dim">{`// ${profile.role}`}</p>
                  <h1 className="font-doto text-[clamp(44px,8vw,92px)] font-black leading-[1.02] text-ink">
                    {hero.headline}
                    <span className="text-accent motion-reduce:hidden" style={{ animation: 'blink 1.2s steps(1) infinite' }}>▮</span>
                  </h1>
                  <p className="max-w-[58ch] text-sm leading-8 text-dim">
                    {hero.summary}
                  </p>

                  <div className="flex max-w-md gap-10 border-t border-line pt-6">
                    {hero.metrics.map((metric) => (
                      <div key={metric.label} className="space-y-1">
                        <p className="font-doto text-2xl font-bold text-ink sm:text-3xl">{metric.value}</p>
                        <p className="text-[9px] uppercase tracking-[0.14em] text-faint">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => router.push('/projects')}
                      className="cursor-pointer rounded-full bg-accent px-6 py-3 text-[12px] uppercase tracking-[0.1em] text-white transition-all duration-200 hover:-translate-y-px hover:opacity-85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                    >
                      Ver proyectos →
                    </button>
                    <a
                      href="/cv.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-line px-6 py-3 text-[12px] uppercase tracking-[0.1em] text-ink transition-all duration-200 hover:-translate-y-px hover:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
                    >
                      CV [pdf] ↗
                    </a>
                  </div>
                </div>

                {/* Derecha: retrato como ficha técnica */}
                <div className="order-1 lg:order-2">
                  <figure className="border border-line bg-card">
                    <div className="flex items-center justify-between border-b border-line px-4 py-2 text-[9px] uppercase tracking-[0.14em] text-faint">
                      <span className="font-doto text-[11px] font-bold text-accent">ID.01</span>
                      <span>retrato</span>
                    </div>
                    <div className="aspect-[3/4] overflow-hidden">
                      <img src="/lijhoan.webp" alt={profile.name} className="h-full w-full object-cover object-top grayscale" />
                    </div>
                    <figcaption className="space-y-1 border-t border-line px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-ink">{profile.name}</p>
                      <p className="text-[9px] uppercase tracking-[0.12em] text-faint">{profile.role}</p>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* About Section */}
        {activeSection === 'about' && (
          <section className="chapter-section min-h-[calc(100svh-4rem)] px-6 py-24 sm:px-8 lg:px-12 flex items-center">
            <div className="mx-auto w-full max-w-5xl">
              <SectionHeader index="01" title="Perfil" meta="sistemas · datos · cloud" />

              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
                <div className="space-y-6">
                  <p className="text-sm leading-8 text-ink">{overview}</p>
                  <p className="text-sm leading-8 text-dim">{positioning.focus}</p>
                </div>

                <aside className="space-y-10">
                  <div className="grid grid-cols-3 gap-6 border-t border-line pt-6">
                    {metrics.slice(1, 4).map((metric) => (
                      <div key={metric.label} className="space-y-1">
                        <p className="font-doto text-xl font-bold text-ink sm:text-2xl">{metric.value}</p>
                        <p className="text-[9px] uppercase tracking-[0.14em] text-faint">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-faint">{'// pilares'}</p>
                    <ul className="space-y-2.5 text-[13px] leading-relaxed text-dim">
                      <li><span className="text-accent">—</span> Arquitectura de datos orientada a decisiones</li>
                      <li><span className="text-accent">—</span> Implementación full-stack con adopción operativa</li>
                      <li><span className="text-accent">—</span> Gobernanza y escalabilidad corporativa</li>
                    </ul>
                  </div>
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
        <section className="chapter-section min-h-[calc(100svh-4rem)] px-6 py-24 sm:px-8 lg:px-12 flex items-center">
          <div className="mx-auto w-full max-w-5xl">
            <SectionHeader index="03" title="Habilidades" meta="ficha de especificaciones" />

            <div className="grid gap-x-16 gap-y-14 lg:grid-cols-2">
              {skillGroups.map((group, groupIndex) => (
                <article key={group.id}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink">{group.title}</h3>
                    <span className="font-doto text-[11px] font-bold text-faint">S.0{groupIndex + 1}</span>
                  </div>
                  <ul>
                    {group.items.map((skill) => {
                      const band = resolveSkillBand(skill.level)

                      return (
                        <li key={skill.name} className="group/skill flex items-center justify-between gap-4 border-b border-line py-3">
                          <span className="flex min-w-0 items-center gap-3">
                            <skill.icon
                              size={13}
                              strokeWidth={1.5}
                              aria-hidden="true"
                              className="shrink-0 text-faint transition-colors duration-200 group-hover/skill:text-accent motion-reduce:transition-none"
                            />
                            <span className="truncate text-[13px] text-ink">{skill.name}</span>
                          </span>
                          <span className={['shrink-0 text-[9px] uppercase tracking-[0.16em]', band.className].join(' ')}>{band.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'experience' && (
        <section className="chapter-section min-h-[calc(100svh-4rem)] px-6 py-24 sm:px-8 lg:px-12 flex items-center">
          <div className="mx-auto w-full max-w-5xl">
            <SectionHeader index="04" title="Trayectoria" meta="evidencia operativa" />

            <div>
              {experience.map((entry, entryIndex) => {
                const isCurrent = entryIndex === 0
                const isLast = entryIndex === experience.length - 1

                return (
                  <article key={`${entry.company}-${entry.role}`} className="grid grid-cols-[16px_1fr] gap-x-6 sm:grid-cols-[150px_16px_1fr] sm:gap-x-8">
                    <p className="hidden pt-1 text-right text-[10px] uppercase tracking-[0.12em] text-faint sm:block">{entry.period}</p>

                    <div className="relative flex justify-center">
                      {!isLast && <span aria-hidden="true" className="absolute bottom-0 top-3 w-px bg-line" />}
                      <span
                        aria-hidden="true"
                        className={[
                          'relative z-10 mt-1 h-2.5 w-2.5 rounded-full border bg-bg',
                          isCurrent ? 'border-accent' : 'border-line',
                        ].join(' ')}
                      />
                    </div>

                    <div className={isLast ? 'pb-2' : 'pb-12'}>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-faint sm:hidden">{entry.period}</p>
                      <h3 className="mt-1 text-[14px] font-bold text-ink sm:mt-0">{entry.role}</h3>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-accent">{entry.company}</p>
                      <div className="mt-3 space-y-1.5">
                        {entry.highlights.map((highlight) => (
                          <p key={highlight} className="text-[12px] leading-relaxed text-dim">{highlight}</p>
                        ))}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'certifications' && (
        <section className="chapter-section min-h-[calc(100svh-4rem)] px-6 py-24 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-5xl">
            <SectionHeader index="05" title="Certificaciones" meta="evidencia verificable" />
            <CertificationTrustLayer />
          </div>
        </section>
      )}


{/* Contact Section */}
{activeSection === 'contact' && (
  <section className="chapter-section min-h-[calc(100svh-4rem)] px-6 py-24 sm:px-8 lg:px-12 flex items-center">
    <div className="mx-auto w-full max-w-5xl">
      <SectionHeader index="06" title="Contacto" meta="respuesta en 24h hábiles" />

      <div className="space-y-10">
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.22em] text-faint">{'// siguiente paso'}</p>
          <a
            href={emailHref}
            className="font-doto block break-all text-[clamp(24px,4.4vw,48px)] font-bold leading-tight text-ink transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink"
          >
            {profile.email}
          </a>
          <p className="max-w-[58ch] text-sm leading-8 text-dim">
            Trabajo con equipos que necesitan pasar de iniciativas aisladas a plataformas confiables de datos, automatización y decisiones operativas.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] text-ink transition-all duration-200 hover:-translate-y-px hover:border-accent"
          >
            LinkedIn ↗
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] text-ink transition-all duration-200 hover:-translate-y-px hover:border-accent"
          >
            WhatsApp ↗
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line px-5 py-2.5 text-[11px] uppercase tracking-[0.1em] text-ink transition-all duration-200 hover:-translate-y-px hover:border-accent"
          >
            CV [pdf] ↗
          </a>
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-4 text-[9.5px] uppercase tracking-[0.14em] text-faint">
          <span>{profile.phone} · {profile.location}</span>
          <span>[ fin ]</span>
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
    return { label: 'Nucleo', className: 'text-ink' }
  }

  if (level >= 80) {
    return { label: 'Solido', className: 'text-dim' }
  }

  return { label: 'Soporte', className: 'text-faint' }
}

function SectionHeader({ index, title, meta }) {
  return (
    <div className="mb-12 flex items-baseline gap-4">
      <span className="font-doto text-[13px] font-bold text-accent">[{index}]</span>
      <h2 className="text-[13px] font-bold uppercase tracking-[0.22em] text-ink">{title}</h2>
      <span aria-hidden="true" className="h-px flex-1 self-center bg-line" />
      {meta && <span className="hidden text-[10px] uppercase tracking-[0.12em] text-faint sm:inline">{meta}</span>}
    </div>
  )
}

export default App
