import type { ProfileContent } from './profile.types'

export const profileContent: ProfileContent = {
  identity: {
    name: 'Lijhoan Machaca Camarena',
    role: 'Ingeniero Digital | Arquitectura de Datos | Data Engineering | DevOps | IA Aplicada',
    location: 'Lima, Perú',
    email: 'lijhoan@gmail.com',
    phone: '(+51) 931347134',
    linkedin: 'https://www.linkedin.com/in/lijhoanmc/',
    github: 'https://github.com/Lijhoan',
    tags: ['Arquitectura de Datos', 'Lakehouse', 'Data Engineering', 'Apache Airflow', 'dbt', 'Trino', 'DevOps · CI/CD', 'Seguridad', 'IA Aplicada', 'Python', 'Linux'],
  },
  positioning: {
    headline: 'Transformando datos en decisiones estratégicas',
    summary:
      'Ingeniero Digital especializado en arquitectura de datos, modernización de sistemas legados y plataformas Lakehouse on-premise. Diseño, implemento y aseguro soluciones completas: desde la ingeniería inversa de un ERP legado hasta pipelines gobernados, DevOps, seguridad de secretos e IA aplicada al análisis técnico.',
    focus: 'Plataformas de datos empresariales bajo arquitectura Medallion, orquestación y automatización (DataOps), seguridad por mínimo privilegio, CI/CD y analítica orientada a decisiones de negocio.',
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
      title: 'Arquitectura y plataforma de datos',
      items: ['Lakehouse on-premise', 'Arquitectura Medallion (Bronze/Silver/Gold)', 'Apache Airflow', 'dbt Core', 'Apache Iceberg', 'Trino', 'MinIO', 'PostgreSQL · PgBouncer', 'SQL Server', 'Parquet · PyArrow'],
      status: 'canonical',
    },
    {
      title: 'DevOps y automatización',
      items: ['Jenkins', 'Gitea · GitHub', 'Registry privado', 'Docker · Docker Compose', 'Podman', 'systemd', 'n8n', 'Bash · PowerShell', 'CI/CD'],
      status: 'canonical',
    },
    {
      title: 'Seguridad e infraestructura',
      items: ['OpenBao (secretos · AppRole · mínimo privilegio)', 'TLS/HTTPS · Nginx Proxy Manager', 'Ubuntu Server · Rocky Linux', 'SSH · ACL · firewall', 'DNS interno', 'Redes TCP/IP'],
      status: 'canonical',
    },
    {
      title: 'BI y analítica',
      items: ['Power BI', 'DAX', 'SQL analítico', 'Modelos dimensionales', 'Python (pandas)', 'KPIs y datasets empresariales'],
      status: 'canonical',
    },
    {
      title: 'Desarrollo e IA aplicada',
      items: ['Python 3.12+', 'TypeScript', 'Next.js · React', 'NestJS', 'Ollama · modelos locales', 'Ingeniería inversa asistida por IA', 'Playwright', 'Microsoft 365 Admin'],
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
