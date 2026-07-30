import type { ProjectItem } from '../profile/profile.types'

// ── Cómo integrar un proyecto nuevo ─────────────────────────────────
// 1. Agregar una entrada ProjectItem a featuredProjects: la fila P.0X
//    se genera sola en el índice de proyectos, con estado honesto de link.
// 2. Elegir su `glyph` ('analytics' | 'banking' | 'automation' |
//    'generic') o dibujar uno nuevo en features/projects/ProjectGlyph.tsx.
// El caso insignia (P.01) vive aparte en case-studies/flagshipProof.data.ts.
// ────────────────────────────────────────────────────────────────────

export const featuredProjects: ProjectItem[] = [
  {
    id: 1,
    title: 'Tale Insight Analytics',
    description: 'Plataforma BI corporativa para gestión, visualización e interacción de reportes Power BI con control de acceso por áreas.',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'PostgreSQL 16+', 'JWT', 'Podman', 'Rocky Linux 9.7'],
    glyph: 'analytics',
    link: '',
    category: 'Business Intelligence',
    year: '2024',
    client: 'Tale Inmobiliaria',
    status: 'canonical',
    note: 'Implementacion activa en entorno corporativo privado. Demo publica no disponible.',
  },
  {
    id: 2,
    title: 'TALE Banking Admin Platform',
    description: 'Plataforma bancaria orientada al cumplimiento regulatorio y gestión eficiente de cuentas con auditoría inmutable.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma ORM', 'NextAuth', 'Docker'],
    glyph: 'banking',
    link: '',
    category: 'Core Banking',
    year: '2024',
    client: 'Tale Inmobiliaria',
    status: 'pending-verification',
    note: 'Caso de arquitectura bancaria en entorno privado; enlace externo no liberado.',
  },
  {
    id: 3,
    title: 'TaleJarvisBank',
    description: 'Sistema profesional en Python para extracción automatizada de movimientos bancarios bajo arquitectura Zero Trust.',
    technologies: ['Python 3.12', 'Playwright', 'REST APIs', 'Podman', 'systemd'],
    glyph: 'automation',
    link: '',
    category: 'Automation',
    year: '2025',
    client: 'Tale Inmobiliaria',
    status: 'pending-verification',
    note: 'Herramienta interna bajo politicas de seguridad operacional; sin demo publica.',
  },
]

export const projectArchive: ProjectItem[] = [
  {
    id: 4,
    title: 'TALE SignRoom',
    description: 'Plataforma de reserva de salas de reuniones con sincronización bidireccional en tiempo real hacia Microsoft Graph.',
    technologies: ['React 18', 'Vite', 'NestJS', 'TypeScript', 'PostgreSQL', 'Prisma', 'Framer Motion', 'MSAL'],
    glyph: 'generic',
    link: '',
    category: 'Collaboration',
    year: '2024',
    client: 'Tale Inmobiliaria',
    status: 'pending-verification',
    note: 'Included in the markdown source; not yet surfaced in the current scrollytelling UI.',
  },
  {
    id: 5,
    title: 'Sistema de Gestión Portátil de Validación',
    description: 'Sistema independiente para procesamiento de archivos locales con lógicas de negocio complejas.',
    technologies: ['Python', 'SQLite', 'Bottle', 'HTML/JS', 'PyWebView', 'Pandas'],
    glyph: 'automation',
    link: '',
    category: 'Automation',
    year: '2024',
    client: 'Verisure Perú',
    status: 'pending-verification',
    note: 'Included in the markdown source; no dedicated asset exists in the workspace.',
  },
]
