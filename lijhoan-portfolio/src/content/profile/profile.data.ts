import type { ProfileContent } from './profile.types'

export const profileContent: ProfileContent = {
  identity: {
    name: 'Lijhoan Machaca Camarena',
    role: 'Ingeniero Digital | Cloud Data Engineer | Solutions Architect',
    location: 'Lima, Perú',
    email: 'lijhoan@gmail.com',
    phone: '(+51) 931347134',
    linkedin: 'https://www.linkedin.com/in/lijhoanmc/',
    github: 'https://github.com/Lijhoan',
    tags: ['Solutions Architect', 'Cloud Data Engineering', 'Full Stack', 'TypeScript', 'Next.js 15', 'Python', 'GCP', 'ERP', 'Infraestructura'],
  },
  positioning: {
    headline: 'Transformando datos en decisiones estratégicas',
    summary:
      'Estratega de datos e Ingeniero Digital con amplia trayectoria liderando la transformación tecnológica de extremo a extremo. Especializado en infraestructuras fundacionales, modernización de sistemas core, desarrollo Full Stack avanzado, orquestación de IA y soluciones empresariales escalables en la nube.',
    focus: 'Infraestructuras fundacionales, modernización de sistemas core, automatización, data engineering y soluciones empresariales listas para escalar.',
  },
  metrics: [
    { value: '6+', label: 'Años de experiencia', source: 'CV: perfil profesional', status: 'canonical' },
    { value: '20%', label: 'Mejora en eficiencia operativa', source: 'CV: 3ERIZA', status: 'canonical' },
    { value: '15%', label: 'Reducción de margen de error', source: 'CV: Comdata Group', status: 'canonical' },
    { value: '12%', label: 'Aumento de productividad', source: 'CV: CLV Telecomunicaciones', status: 'canonical' },
    { value: '25%', label: 'Optimización de procesos', source: 'Derived from soft-skill impact statements', status: 'derived' },
  ],
  links: {
    contact: [
      { label: 'Email', href: 'mailto:lijhoan@gmail.com', external: false, status: 'canonical' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lijhoanmc/', external: true, status: 'canonical' },
      { label: 'GitHub', href: 'https://github.com/Lijhoan', external: true, status: 'canonical' },
      { label: 'WhatsApp', href: 'https://wa.me/51931347134', external: true, status: 'canonical' },
      { label: 'CV', href: '/cv.pdf', external: true, status: 'optional' },
    ],
  },
  stack: [
    {
      title: 'Infraestructura, Redes y Operaciones',
      items: ['Topología de redes', 'Configuración de servidores', 'Rocky Linux 9.7', 'Docker Compose', 'Podman', 'systemd', 'Cisco Network Defense'],
      status: 'canonical',
    },
    {
      title: 'Data Engineering y Cloud',
      items: ['Arquitectura de Data Warehouse desde cero', 'Google Cloud Platform (GCP)', 'Microsoft Azure', 'AWS', 'ETL pipelines'],
      status: 'canonical',
    },
    {
      title: 'Desarrollo Full Stack',
      items: ['Next.js 15 (App Router)', 'React 19', 'TypeScript', 'Vite', 'NestJS', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'NextAuth', 'JWT'],
      status: 'canonical',
    },
    {
      title: 'Sistemas Core e IA',
      items: ['Migraciones ERP', 'Profiling con agentes de IA', 'ChatGPT-4 prompting', 'Playwright'],
      status: 'canonical',
    },
    {
      title: 'Lenguajes y Bases de Datos',
      items: ['Python 3.12+', 'TypeScript', 'SQL', 'R', 'PostgreSQL 16+', 'MySQL', 'SQL Server', 'Prisma ORM'],
      status: 'canonical',
    },
  ],
  verification: [
    {
      field: 'GitHub URL',
      detail: 'Direct profile URL configured as canonical contact link.',
      status: 'canonical',
    },
    {
      field: 'CV PDF',
      detail: 'Public CV PDF exists in workspace as /public/cv.pdf and is linked from profile.',
      status: 'canonical',
    },
  ],
}
