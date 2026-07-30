export type FlagshipProofMetric = {
  label: string
  value: string
  unit: string
  status: 'verified' | 'estimated' | 'pending' | 'unavailable'
  sourceNote: string
  timeframe: string
}

export type FlagshipPipelineStep = {
  label: string
  detail: string
}

export type FlagshipProofCaseStudy = {
  id: string
  projectTitle: string
  projectCategory: string
  whyThisCase: string
  pipeline: {
    title: string
    steps: FlagshipPipelineStep[]
    transversal: string
  }
  impactMetrics: FlagshipProofMetric[]
  honestyNote: string
}

export const flagshipProofCaseStudy: FlagshipProofCaseStudy = {
  id: 's10-lakehouse-flagship',
  projectTitle: 'Plataforma de Datos S10 Lakehouse',
  projectCategory: 'Data Platform · Lakehouse On-Premise',
  whyThisCase:
    'Ingeniería inversa de un ERP legado (S10 / SQL Server) y construcción de una plataforma Lakehouse on-premise: arquitectura Medallion, orquestación desacoplada, seguridad de secretos y CI/CD.',
  pipeline: {
    title: 'erp s10 → power bi',
    steps: [
      { label: 'ERP S10 · SQL Server', detail: 'origen' },
      { label: 'Airflow + runtime-agent', detail: 'orquestación' },
      { label: 'Python → Parquet', detail: 'extracción' },
      { label: 'MinIO (S3)', detail: 'almacenamiento' },
      { label: 'Iceberg + catálogo', detail: 'tablas analíticas' },
      { label: 'dbt · B/S/G', detail: 'transformación' },
      { label: 'Trino', detail: 'sql distribuido' },
      { label: 'Power BI', detail: 'kpis · decisiones' },
    ],
    transversal: 'OpenBao (secretos) · Jenkins / Gitea (CI/CD) · auditoría y observabilidad',
  },
  impactMetrics: [
    {
      label: 'Servidores Linux',
      value: '3',
      unit: 'datos · apps · devops',
      status: 'verified',
      sourceNote: 'Perfil profesional maestro: topología implementada.',
      timeframe: '2025–2026',
    },
    {
      label: 'Capas Medallion',
      value: 'B/S/G',
      unit: 'bronze · silver · gold',
      status: 'verified',
      sourceNote: 'Arquitectura implementada con dbt Core.',
      timeframe: '2025–2026',
    },
    {
      label: 'Servicios integrados',
      value: '15+',
      unit: 'plataforma completa',
      status: 'verified',
      sourceNote: 'Airflow, dbt, Iceberg, Trino, MinIO, PostgreSQL, OpenBao, Jenkins, Gitea, Registry, n8n, observabilidad.',
      timeframe: '2025–2026',
    },
  ],
  honestyNote: 'ROI pendiente de instrumentación · OpenMetadata y Azure en integración (roadmap)',
}
