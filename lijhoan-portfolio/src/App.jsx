import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import Lanyard from './components/Lanyard.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import {
  BarChart3,
  TrendingUp,
  Database,
  Brain,
  Code,
  Code2,
  Cloud,
  Workflow,
  ClipboardCheck,
  Download,
  Mail,
  LinkedinIcon,
  GithubIcon,
  Home,
  User,
  Briefcase,
  FolderOpen,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  Calendar,
  MapPin,
  FileBarChart2,
  Phone
} from 'lucide-react'
import fotoPerfil from './assets/lijhoan.png'
import dashboardQuality from './assets/dashboard-quality.png'
import dashboardTelecom from './assets/dashboard-telecom.png'
import dashboardAutomation from './assets/dashboard-automation.png'


function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const projects = [
    {
      id: 1,
      title: "BI End-to-End 360° | Insights Real Time",
      description: "Dashboards con integración de múltiples fuentes (SQL, MySQL, formularios). Automatización con Python y Make. +20% en eficiencia BI y decisiones ágiles.",
      technologies: ["Power BI", "SQL", "Python", "MySQL"],
      image: dashboardQuality,
      link: "#",
      category: "Business Intelligence",
      year: "2020-2024",
      client: "3ERIZA"
    },
    {
      id: 2,
      title: "Smart Analytics | Multi-Business",
      description: "Soluciones analíticas para marketing, finanzas y operaciones. Análisis predictivo, KPIs personalizados y campañas optimizadas.",
      technologies: ["Python", "Power BI", "SQL","Excel","n8n"],
      image: dashboardTelecom,
      link: "#",
      category: "Data Analytics",
      year: "2020-2024",
      client: "3ERIZA"
    },
    {
      id: 3,
      title: "Business Intelligence | Estrategia Data-Driven",
      description: "Análisis comercial con visualizaciones para alta dirección. Soporte a decisiones basadas en datos reales y mejora en la claridad ejecutiva.",
      technologies: ["Power BI", "SQL", "Python","Make"],
      image: dashboardAutomation,
      link: "#",
      category: "Automation",
      year: "2017-2019",
      client: "Comdata Group"
    }
  ]

  const dataSkills = [
    { name: "Power BI", level: 95, icon: BarChart3 },
    { name: "Tableau", level: 80, icon: TrendingUp },
    { name: "Looker Studio", level: 75, icon: BarChart3 },
    { name: "Quicksight", level: 70, icon: BarChart3 },
    { name: "SQL", level: 90, icon: Database },
    { name: "MySQL", level: 80, icon: Database },
    { name: "SQL Server", level: 75, icon: Database },
    { name: "Excel Avanzado", level: 88, icon: FileBarChart2 } // o BarChart3 si prefieres
  ]

  const mlSkills = [
    { name: "Python", level: 85, icon: Brain },
    { name: "R", level: 60, icon: Code },
    { name: "Scikit-learn", level: 65, icon: Brain },
    { name: "TensorFlow", level: 60, icon: Brain },
    { name: "Machine Learning", level: 75, icon: Brain }
  ]

  const devSkills = [
    { name: "HTML", level: 65, icon: Code },
    { name: "Java", level: 60, icon: Code2 },
    { name: "JavaScript", level: 60, icon: Code2 },
    { name: "React", level: 70, icon: Code }
  ]

  const infraSkills = [
    { name: "AWS", level: 70, icon: Cloud },
    { name: "ETL", level: 70, icon: Database },
    { name: "Bizagi", level: 70, icon: Workflow },
    { name: "Scrum", level: 85, icon: ClipboardCheck },
    { name: "Azure", level: 70, icon: Cloud }
  ]

  const aiSkills = [
  { name: "Prompt Engineering", level: 80, icon: MessageSquare },
  { name: "IA Generativa", level: 75, icon: Brain }
  ]
    const navigation = [
      { id: 'home', label: 'Inicio', icon: Home },
      { id: 'about', label: 'Perfil', icon: User },
      { id: 'projects', label: 'Proyectos', icon: FolderOpen },
      { id: 'skills', label: 'Habilidades', icon: Briefcase },
      { id: 'contact', label: 'Contacto', icon: MessageSquare }
    ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation Sidebar */}
      <nav className="fixed left-0 top-0 h-full w-20 bg-black/20 backdrop-blur-xl border-r border-white/10 z-50">
        <div className="flex flex-col items-center py-8 space-y-8">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-xl font-bold">LM</span>
          </div>
          
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-white/10 ${
                activeSection === item.id 
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/25' 
                  : 'bg-white/5'
              }`}
            >
              <item.icon size={20} />
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="ml-20 min-h-screen">
        {/* Home Section */}
        {activeSection === 'home' && (
          <section className={`min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Profile Card - React Bits Original */}
              <div className="flex items-center justify-center h-full">
                <ProfileCard
                  avatarUrl={fotoPerfil}
                  name="Lijhoan Machaca"
                  title="Systems Engineer & Data Specialist"
                  handle="lijhoanmc"
                  status="Lima, Perú"
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
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                    Transformando
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> datos </span>
                    en decisiones estratégicas
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed">
                    Más de 6 años de experiencia en Business Intelligence, creando soluciones analíticas 
                    que optimizan procesos y potencian la toma de decisiones empresariales.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-cyan-400">6+</div>
                    <div className="text-xs sm:text-sm text-gray-300">Años de experiencia</div>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10">
                    <div className="text-xl sm:text-2xl font-bold text-blue-400">50+</div>
                    <div className="text-xs sm:text-sm text-gray-300">Proyectos completados</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => setActiveSection('projects')}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 sm:px-8 py-3 rounded-xl flex-1"
                  >
                    Ver Proyectos
                    <ChevronRight size={20} className="ml-2" />
                  </Button>
                  
                  <Button 
                    onClick={() => window.open('/cv.pdf', '_blank')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl flex-1"
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
          <section className="min-h-screen p-4 sm:p-6 lg:p-8 flex items-center">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Sobre <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Mí</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
                {/* Columna IZQUIERDA - Lanyard */}
                <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative order-2 lg:order-1">
                  <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
                </div>

                {/* Columna DERECHA - Contenido textual */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10 order-1 lg:order-2">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                    Soy Systems and Computer Science Engineer en desarrollo, con experiencia como Financial Performance Analyst con sólida experiencia en Business Intelligence, análisis financiero y estrategias basadas en datos. Me especializo en transformar métricas complejas en acciones claras que impulsan resultados reales. / I'm a Systems and Computer Science Engineer in progress and a Financial Performance Analyst with solid experience in Business Intelligence, financial analysis, and data-driven strategy.
                  </p>

                  <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                    Apasionado por la analítica, combino herramientas de visualización, diseño de KPIs y metodologías ágiles para optimizar la toma de decisiones empresariales. En este espacio comparto insights, buenas prácticas y recursos para convertir los datos en tu mejor aliado estratégico. / Passionate about analytics, I combine visualization tools, KPI design, and agile methodologies to improve business decision-making. This space is where I share insights, best practices, and resources to turn data into your strongest strategic asset.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2">20%</div>
                      <div className="text-xs sm:text-sm text-gray-300">Mejora en eficiencia</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-1 sm:mb-2">15%</div>
                      <div className="text-xs sm:text-sm text-gray-300">Reducción de errores</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1 sm:mb-2">25%</div>
                      <div className="text-xs sm:text-sm text-gray-300">Optimización de procesos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <section className="min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Mis <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Proyectos</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-300">Dashboards y soluciones de Business Intelligence</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="w-full h-48 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-300">
                            {project.category}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-400">
                            <Calendar size={12} className="mr-1" />
                            {project.year}
                          </div>
                        </div>
                        <CardTitle className="text-white group-hover:text-cyan-400 transition-colors mb-2">
                          {project.title}
                        </CardTitle>
                        <div className="text-xs text-gray-400 mb-2">{project.client}</div>
                        <CardDescription className="text-gray-300">
                          {project.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="border-white/20 text-gray-300 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                        Ver Proyecto
                        <ExternalLink size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

      {activeSection === 'skills' && (
        <section className="min-h-screen p-4 sm:p-6 lg:p-8 flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Mis <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Habilidades</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300">Tecnologías y herramientas que domino</p>
            </div>

            {/* Grupo: Data & BI */}
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">📊 Data & BI</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              {dataSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>

            {/* Grupo: Data Science */}
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">🧠 Data Science / ML</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              {mlSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>

            {/* Grupo: Desarrollo */}
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">💻 Desarrollo / Automatización</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
              {devSkills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>

          {/* Grupo: Inteligencia Artificial */}
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">🧠 Inteligencia Artificial</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {aiSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>

          {/* Grupo: Infraestructura / Gestión */}
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">☁️ Infraestructura / Gestión</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {infraSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
            </div>
          </div>
        </section>
      )}


{/* Contact Section */}
{activeSection === 'contact' && (
  <section className="min-h-screen p-4 sm:p-6 lg:p-8 flex items-center">
    <div className="max-w-4xl mx-auto w-full">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
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
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            Información de Contacto
          </h3>
          
          <div className="space-y-3 sm:space-y-4">
            {/* Email Card */}
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-cyan-500/30 transition-colors group">
              <a
                href="mailto:lijhoan.machaca@gmail.com"
                className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Mail size={20} className="mr-3 sm:mr-4 flex-shrink-0" />
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm sm:text-base break-all min-w-0">
                  lijhoan.machaca@gmail.com
                </span>
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-cyan-500/30 transition-colors group">
              <a
                href="https://www.linkedin.com/in/lijhoanmc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <LinkedinIcon size={20} className="mr-3 sm:mr-4 flex-shrink-0" />
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm sm:text-base">
                  lijhoanmc
                </span>
                <ExternalLink size={14} className="ml-2 opacity-60 flex-shrink-0" />
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10 hover:border-cyan-500/30 transition-colors group">
              <a
                href="https://wa.me/51931347134"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <MessageSquare size={20} className="mr-3 sm:mr-4 flex-shrink-0" />
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm sm:text-base">
                  +51 931 347 134
                </span>
                <Phone size={14} className="ml-2 opacity-60 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Servicios */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            ¿Trabajamos juntos?
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">
            Estoy disponible para proyectos de Business Intelligence, análisis de datos 
            y consultoría en transformación digital.
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
    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/10">
      <div className="flex items-center mb-3 sm:mb-4">
        <skill.icon size={28} className="text-cyan-400 mr-3 sm:mr-4 flex-shrink-0" />
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
