export type CertificationTier = 'featured' | 'supporting' | 'archive'
export type CertificationDomain = 'cybersecurity' | 'data' | 'analytics' | 'cloud' | 'education' | 'professional'

export type CertificationCredential = {
  id: string
  title: string
  issuer: string
  issuedAt: string
  tier: CertificationTier
  domain: CertificationDomain
  proofTags: string[]
  asset: {
    fullSrc: string
    thumbSrc: string
    alt: string
  }
}

const toAsset = (filename: string, title: string, tier: CertificationTier) => ({
  fullSrc: `/certifications/full/${tier}/${filename}`,
  thumbSrc: `/certifications/thumbs/${tier}/${filename}`,
  alt: `${title} certificate proof`,
})

export const certificationCredentials: CertificationCredential[] = [
  {
    id: 'dmc-data-engineer-2026',
    title: 'Especialista en Data Engineer (Diploma)',
    issuer: 'DMC Institute',
    issuedAt: '2026-06',
    tier: 'featured',
    domain: 'data',
    proofTags: ['Data Engineering', 'Lakehouse', '168 horas académicas'],
    asset: toAsset('03062026 Especialista en Data Engineer - DMC INSTITUTE.webp', 'Especialista en Data Engineer', 'featured'),
  },
  {
    id: 'dmc-big-data-2026',
    title: 'Especialista en Big Data',
    issuer: 'DMC Institute',
    issuedAt: '2026-06',
    tier: 'featured',
    domain: 'data',
    proofTags: ['Big Data', 'Arquitectura de Datos', '60 horas académicas'],
    asset: toAsset('03062026 Especialista en Big Data - DMC INSTITUTE.webp', 'Especialista en Big Data', 'featured'),
  },
  {
    id: 'cisco-threat-management-2025',
    title: 'Gestion de Amenazas Ciberneticas',
    issuer: 'Cisco Networking Academy',
    issuedAt: '2025-11',
    tier: 'featured',
    domain: 'cybersecurity',
    proofTags: ['Threat Management', 'Cybersecurity', 'Enterprise Trust'],
    asset: toAsset('20112025 Gestión de Amenazas Cibernéticas - CISCO.webp', 'Gestion de Amenazas Ciberneticas', 'featured'),
  },
  {
    id: 'cisco-network-defense-2025',
    title: 'Defensa de la Red',
    issuer: 'Cisco Networking Academy',
    issuedAt: '2025-11',
    tier: 'featured',
    domain: 'cybersecurity',
    proofTags: ['Network Defense', 'Security Posture', 'Enterprise Ready'],
    asset: toAsset('08112025 Defensa de la Red - CISCO.webp', 'Defensa de la Red', 'featured'),
  },
  {
    id: 'cisco-endpoint-security-2025',
    title: 'Seguridad de Terminales',
    issuer: 'Cisco Networking Academy',
    issuedAt: '2025-10',
    tier: 'featured',
    domain: 'cybersecurity',
    proofTags: ['Endpoint Security', 'Zero Trust Alignment', 'Operational Hardening'],
    asset: toAsset('06102025 Seguridad de Terminales - CISCO.webp', 'Seguridad de Terminales', 'featured'),
  },
  {
    id: 'ibm-data-analysis-python-2024',
    title: 'Data Analysis Using Python',
    issuer: 'IBM',
    issuedAt: '2024-10',
    tier: 'featured',
    domain: 'data',
    proofTags: ['Python', 'Data Analysis', 'Applied Analytics'],
    asset: toAsset('22102024 Data Analysis Using Python - IBM.webp', 'Data Analysis Using Python', 'featured'),
  },
  {
    id: 'udemy-dax-specialization-2025',
    title: 'Especializacion en Lenguaje DAX para Analisis de Negocios',
    issuer: 'Udemy',
    issuedAt: '2025-02',
    tier: 'featured',
    domain: 'analytics',
    proofTags: ['DAX', 'Business Intelligence', 'Decision Systems'],
    asset: toAsset('27022025 Especialización en Lenguaje DAX para Análisis de Negocios - UDEMY.webp', 'Especializacion en Lenguaje DAX para Analisis de Negocios', 'featured'),
  },
  {
    id: 'cisco-python-essentials-2025',
    title: 'Python Essentials',
    issuer: 'Cisco Networking Academy',
    issuedAt: '2025-03',
    tier: 'supporting',
    domain: 'data',
    proofTags: ['Python', 'Programming Foundation'],
    asset: toAsset('22032025 Python Essentials - CISCO.webp', 'Python Essentials', 'supporting'),
  },
  {
    id: 'cisco-intro-cybersecurity-2025',
    title: 'Introduccion a la Ciberseguridad',
    issuer: 'Cisco Networking Academy',
    issuedAt: '2025-08',
    tier: 'supporting',
    domain: 'cybersecurity',
    proofTags: ['Cybersecurity Foundation', 'Security Awareness'],
    asset: toAsset('24082025 Introducción a la Ciberseguridad - CISCO.webp', 'Introduccion a la Ciberseguridad', 'supporting'),
  },
  {
    id: 'udemy-genai-prompt-2025',
    title: 'IA Generativa Prompt Engineering con ChatGPT',
    issuer: 'Udemy',
    issuedAt: '2025-02',
    tier: 'supporting',
    domain: 'professional',
    proofTags: ['Prompt Engineering', 'AI Tooling'],
    asset: toAsset('19022025 IA Generativa Prompt Engineering con ChatGPT - UDEMY.webp', 'IA Generativa Prompt Engineering con ChatGPT', 'supporting'),
  },
  {
    id: 'great-learning-powerbi-2024',
    title: 'Data Visualization with Power BI',
    issuer: 'Great Learning Academy',
    issuedAt: '2024-02',
    tier: 'supporting',
    domain: 'analytics',
    proofTags: ['Power BI', 'Visualization', 'Reporting'],
    asset: toAsset('17022024 Data Visualization with Power BI - GREAT LEARNING ACADEMY.webp', 'Data Visualization with Power BI', 'supporting'),
  },
  {
    id: 'zegel-excel-advanced-2024',
    title: 'Excel Avanzado',
    issuer: 'Zegel IPAE',
    issuedAt: '2024-10',
    tier: 'supporting',
    domain: 'analytics',
    proofTags: ['Excel', 'Advanced Analytics Workflow'],
    asset: toAsset('16102024 Excel Avanzado - ZEGEL IPAE.webp', 'Excel Avanzado', 'supporting'),
  },
  {
    id: 'skill-powerbi-update-2023',
    title: 'Actualizacion en Microsoft Power BI',
    issuer: 'Skill',
    issuedAt: '2023-05',
    tier: 'archive',
    domain: 'analytics',
    proofTags: ['Power BI', 'Upskilling'],
    asset: toAsset('11052023 Actualizacion en Microsoft Power Bi - SKILL.webp', 'Actualizacion en Microsoft Power BI', 'archive'),
  },
  {
    id: 'utp-english-a2-2024',
    title: 'Ingles A2 MCER',
    issuer: 'UTP',
    issuedAt: '2024-08',
    tier: 'archive',
    domain: 'professional',
    proofTags: ['Language', 'Communication'],
    asset: toAsset('14082024 Inglés A2 MCER - UTP.webp', 'Ingles A2 MCER', 'archive'),
  },
  {
    id: 'pmc-service-desk-2019',
    title: 'Service Desk Analyst',
    issuer: 'PMC Grupo',
    issuedAt: '2019-08',
    tier: 'archive',
    domain: 'professional',
    proofTags: ['Operations', 'Support'],
    asset: toAsset('15082019 Service Desk Analyst - PMC GRUPO.webp', 'Service Desk Analyst', 'archive'),
  },
  {
    id: 'utp-excel-intermediate-2022',
    title: 'Excel Intermedio',
    issuer: 'UTP',
    issuedAt: '2022-08',
    tier: 'archive',
    domain: 'analytics',
    proofTags: ['Excel', 'Data Handling'],
    asset: toAsset('15082022 Excel Intermedio - UTP.webp', 'Excel Intermedio', 'archive'),
  },
  {
    id: 'utp-math-teaching-assistant-2024',
    title: 'Asistente de Docencia en Matematica',
    issuer: 'UTP',
    issuedAt: '2024-12',
    tier: 'archive',
    domain: 'education',
    proofTags: ['Teaching', 'Communication'],
    asset: toAsset('17122024 Asistente de Docencia en Matemática - UTP.webp', 'Asistente de Docencia en Matematica', 'archive'),
  },
  {
    id: 'utp-tech-support-specialist-2024',
    title: 'Especialista de Soporte Tecnico',
    issuer: 'UTP',
    issuedAt: '2024-12',
    tier: 'archive',
    domain: 'professional',
    proofTags: ['Support', 'Operations'],
    asset: toAsset('17122024 Especialista de Soporte Técnico - UTP.webp', 'Especialista de Soporte Tecnico', 'archive'),
  },
  {
    id: 'idat-excel-specialist-2020',
    title: 'Especialista en Excel',
    issuer: 'IDAT',
    issuedAt: '2020-11',
    tier: 'archive',
    domain: 'analytics',
    proofTags: ['Excel', 'Reporting'],
    asset: toAsset('24112020 Especialista en Excel - IDAT.webp', 'Especialista en Excel', 'archive'),
  },
  {
    id: 'idat-powerbi-2020',
    title: 'Power BI',
    issuer: 'IDAT',
    issuedAt: '2020-11',
    tier: 'archive',
    domain: 'analytics',
    proofTags: ['Power BI', 'Reporting Foundation'],
    asset: toAsset('25112020 Power BI - IDAT.webp', 'Power BI', 'archive'),
  },
  {
    id: 'utp-physics-teaching-assistant-2023',
    title: 'Asistente en Docencia en Fisica',
    issuer: 'UTP',
    issuedAt: '2023-09',
    tier: 'archive',
    domain: 'education',
    proofTags: ['Teaching', 'Communication'],
    asset: toAsset('26092023 Asistente en Docencia en Física - UTP.webp', 'Asistente en Docencia en Fisica', 'archive'),
  },
  {
    id: 'interbank-self-awareness-2025',
    title: 'Autoconocimiento para Impulsar Nuestro Desarrollo',
    issuer: 'Aprendemas Interbank',
    issuedAt: '2025-02',
    tier: 'archive',
    domain: 'professional',
    proofTags: ['Leadership', 'Professional Growth'],
    asset: toAsset('27022025 Autoconocimiento para Impulsar Nuestro Desarrollo - APRENDEMÁS INTERBANK.webp', 'Autoconocimiento para Impulsar Nuestro Desarrollo', 'archive'),
  },
  {
    id: 'certiprof-scrum-foundation-2024',
    title: 'Scrum Foundation Professional',
    issuer: 'CertiProf',
    issuedAt: '2024-10',
    tier: 'archive',
    domain: 'professional',
    proofTags: ['Agile', 'Scrum'],
    asset: toAsset('03102024 Scrum Foundation Professional - CERTIPROF.webp', 'Scrum Foundation Professional', 'archive'),
  },
]

export const featuredCertificationCredentials = certificationCredentials.filter((credential) => credential.tier === 'featured')
export const supportingCertificationCredentials = certificationCredentials.filter((credential) => credential.tier === 'supporting')
export const archiveCertificationCredentials = certificationCredentials.filter((credential) => credential.tier === 'archive')

export const certificationTrustSummary = {
  featuredCount: featuredCertificationCredentials.length,
  supportingCount: supportingCertificationCredentials.length,
  archiveCount: archiveCertificationCredentials.length,
  total: certificationCredentials.length,
} as const
