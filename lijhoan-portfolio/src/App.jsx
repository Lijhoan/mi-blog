import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import Lanyard from './components/Lanyard.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import ProjectsScrollytellingSection from '@/features/scrollytelling/ProjectsScrollytellingSection.tsx'
import { dataBiSkills, devSkills, experienceTimeline, featuredProjects, infraSkills, mlSkills, profileContent, aiSkills } from '@/content/index.ts'
import IdentityChapterOverlay from '@/features/experience/IdentityChapterOverlay.tsx'
import TrustChapterOverlay from '@/features/experience/TrustChapterOverlay.tsx'
import SceneContinuityLayer from '@/features/experience/SceneContinuityLayer.tsx'
import { getSceneChapterBySectionId } from '@/features/experience/chapter-system.ts'
import CtaChapterOverlay from '@/features/experience/CtaChapterOverlay.tsx'
import CertificationTrustLayer from '@/features/experience/CertificationTrustLayer.jsx'
import NavigationShell from '@/features/navigation/NavigationShell.jsx'
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

  useEffect(() => {
    setIsVisible(true)
  }, [])
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
            <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Profile Card - React Bits Original */}
              <div className="flex items-center justify-center h-full">
                <ProfileCard
                  avatarUrl={fotoPerfil}
                  name={profile.name}
                  title={profile.role}
                  handle="lijhoanmc"
                  status={profile.location}
                  contactText="Contactar"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={true}
                  mobileTiltSensitivity={5}
                  onContactClick={() => setActiveSection('contact')}
                  className="max-w-sm"
                />
              </div>

              {/* Hero Content */}
              <div className="space-y-10">
                <div className="space-y-5 max-w-xl">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/80">Digital Systems Direction</p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight text-balance">
                    {hero.headline}
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-[46ch]">
                    {hero.summary}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {hero.metrics.map((metric) => (
                    <div key={metric.label} className="group bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 transition-all duration-300 hover:border-cyan-300/40 hover:bg-white/[0.08]">
                      <div className="text-xl sm:text-2xl font-semibold text-cyan-300">{metric.value}</div>
                      <div className="text-xs sm:text-sm text-gray-300">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => setActiveSection('projects')}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 sm:px-8 py-3 rounded-xl flex-1 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                  >
                    Ver Proyectos
                    <ChevronRight size={20} className="ml-2" />
                  </Button>
                  
                  <Button 
                    onClick={() => window.open('/cv.pdf', '_blank')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl flex-1 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70"
                  >
                    <Download size={20} className="mr-2" />
                    Descargar CV
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
        {/* About Section */}
        {activeSection === 'about' && (
          <section className="chapter-section min-h-screen px-4 py-8 sm:px-6 lg:px-10 flex items-center">
            <div className="max-w-6xl mx-auto w-full">
              <div className="text-center mb-10 sm:mb-14">
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                  Sobre <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Mí</span>
                </h2>
                <p className="text-sm uppercase tracking-[0.26em] text-cyan-200/70">Positioning and operating model</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
                {/* Columna IZQUIERDA - Lanyard */}
                <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative order-2 lg:order-1">
                  <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                </div>

                {/* Columna DERECHA - Contenido textual */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 sm:p-6 lg:p-8 border border-white/10 order-1 lg:order-2 transition-all duration-300 hover:border-cyan-300/30 hover:bg-white/[0.07]">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed mb-4 sm:mb-6 max-w-[58ch]">
                    {overview}
                  </p>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6 max-w-[58ch]">
                    {positioning.focus}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                    {metrics.slice(1, 4).map((metric) => (
                      <div key={metric.label} className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2">{metric.value}</div>
                        <div className="text-xs sm:text-sm text-gray-300">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
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
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                Mis <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Habilidades</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300">Tecnologías y herramientas que domino</p>
            </div>

            {/* Grupo: Data & BI */}
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">📊 Data & BI</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              {skills.dataBi.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>

            {/* Grupo: Data Science */}
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">🧠 Data Science / ML</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              {skills.ml.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>

            {/* Grupo: Desarrollo */}
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">💻 Desarrollo / Automatización</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              {skills.dev.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>

          {/* Grupo: Inteligencia Artificial */}
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">🧠 Inteligencia Artificial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {skills.ai.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>

          {/* Grupo: Infraestructura / Gestión */}
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">☁️ Infraestructura / Gestión</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {skills.infra.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'experience' && (
        <section className="chapter-section relative min-h-screen px-4 py-8 sm:px-6 lg:px-10 flex items-center overflow-hidden">
          <TrustChapterOverlay />
          <div className="relative z-10 max-w-6xl mx-auto w-full space-y-7">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                Experiencia <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Profesional</span>
              </h2>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/70">Enterprise execution timeline</p>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {experience.map((entry) => (
                <div key={`${entry.company}-${entry.role}`} className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 transition-all duration-300 hover:border-cyan-300/30 hover:bg-white/[0.07]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">{entry.role}</h3>
                      <p className="text-cyan-300">{entry.company}</p>
                    </div>
                    <div className="text-sm text-gray-400">{entry.period}</div>
                  </div>
                  <ul className="space-y-2 text-sm sm:text-base text-gray-300 list-disc pl-5">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'certifications' && (
        <section className="chapter-section min-h-screen px-4 py-8 sm:px-6 lg:px-10 flex items-center">
          <div className="max-w-6xl mx-auto w-full space-y-6">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                Certificaciones <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">& Formación</span>
              </h2>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/70">Trust layer and credential evidence</p>
            </div>

            <CertificationTrustLayer />
          </div>
        </section>
      )}


{/* Contact Section */}
{activeSection === 'contact' && (
  <section className="chapter-section relative min-h-screen px-4 py-8 sm:px-6 lg:px-10 flex items-center overflow-hidden">
    <CtaChapterOverlay />
    <div className="relative z-10 max-w-4xl mx-auto w-full">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Contacto
          </span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-300">
          ¿Listo para transformar tus datos en insights?
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Información de Contacto */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 transition-all duration-300 hover:border-cyan-300/30 hover:bg-white/[0.07]">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            Información de Contacto
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            {/* Email Card */}
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group hover:bg-white/[0.08]">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 rounded-md"
              >
                <Mail size={20} className="mr-3 sm:mr-4 flex-shrink-0" />
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm sm:text-base break-all min-w-0">
                  {profile.email}
                </span>
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group hover:bg-white/[0.08]">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 rounded-md"
              >
                <LinkedinIcon size={20} className="mr-3 sm:mr-4 flex-shrink-0" />
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm sm:text-base">
                  lijhoanmc
                </span>
                <ExternalLink size={14} className="ml-2 opacity-60 flex-shrink-0" />
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group hover:bg-white/[0.08]">
              <a
                href={`https://wa.me/${profile.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 rounded-md"
              >
                <MessageSquare size={20} className="mr-3 sm:mr-4 flex-shrink-0" />
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm sm:text-base">
                  {profile.phone}
                </span>
                <Phone size={14} className="ml-2 opacity-60 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Servicios */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 transition-all duration-300 hover:border-cyan-300/30 hover:bg-white/[0.07]">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            ¿Trabajamos juntos?
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
            Estoy disponible para proyectos de Business Intelligence, data engineering, transformación digital y arquitectura de soluciones escalables.
          </p>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
              <div className="text-cyan-400 font-semibold text-sm sm:text-base">Business Intelligence</div>
              <div className="text-xs sm:text-sm text-gray-300">Dashboards y KPIs estratégicos</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
              <div className="text-blue-400 font-semibold text-sm sm:text-base">Data Analytics</div>
              <div className="text-xs sm:text-sm text-gray-300">Análisis predictivo y insights</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 sm:p-4">
              <div className="text-purple-400 font-semibold text-sm sm:text-base">Consultoría</div>
              <div className="text-xs sm:text-sm text-gray-300">Optimización de procesos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)}

      </main>
    </div>
  )
}

// Componente SkillCard fuera del componente principal
function SkillCard({ skill }) {
  return (
    <div className="group bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/10 transition-all duration-300 hover:border-cyan-300/35 hover:bg-white/[0.07] hover:-translate-y-1 motion-reduce:hover:translate-y-0">
      <div className="flex items-center mb-3 sm:mb-4">
        <skill.icon size={28} className="text-cyan-400 mr-3 sm:mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100" />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-white truncate">{skill.name}</h3>
          <div className="w-full bg-white/10 rounded-full h-2 mt-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
        </div>
        <span className="text-cyan-400 font-bold text-base sm:text-lg ml-2 sm:ml-4 flex-shrink-0">{skill.level}%</span>
      </div>
    </div>
  )
}
export default App
