export type FlagshipProofMetric = {
  label: string
  value: string
  unit: string
  status: 'verified' | 'estimated' | 'pending' | 'unavailable'
  sourceNote: string
  timeframe: string
  confidenceNote?: string
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
  problemFraming: string[]
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
    'Modernización integral del ecosistema de datos de TALE: ingeniería inversa de un ERP legado y construcción de una plataforma Lakehouse on-premise con arquitectura Medallion, orquestación desacoplada, seguridad de secretos y CI/CD.',
  problemFraming: [
    'ERP monolítico (S10 / SQL Server) con documentación limitada y lectura operativa fragmentada.',
    'Necesidad de datos gobernados, trazables y consumibles sin interrumpir la operación.',
    'Arquitectura distribuida en 3 servidores Linux: datos, aplicaciones y DevOps.',
  ],
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
      label: 'Arquitectura distribuida',
      value: '3 servidores',
      unit: 'datos · aplicaciones · devops',
      status: 'verified',
      sourceNote: 'Perfil profesional maestro: topología implementada en Linux.',
      timeframe: '2025–2026',
    },
    {
      label: 'Capas de datos',
      value: 'B / S / G',
      unit: 'patrón Medallion',
      status: 'verified',
      sourceNote: 'Perfil profesional maestro: arquitectura implementada con dbt.',
      timeframe: '2025–2026',
    },
    {
      label: 'Servicios de plataforma',
      value: '15+',
      unit: 'componentes integrados',
      status: 'verified',
      sourceNote: 'Airflow, dbt, Iceberg, Trino, MinIO, PostgreSQL, PgBouncer, OpenBao, Jenkins, Gitea, Registry, proxy inverso, n8n, observabilidad.',
      timeframe: '2025–2026',
    },
    {
      label: 'ROI cuantitativo',
      value: 'Pendiente',
      unit: '% ahorro',
      status: 'pending',
      sourceNote: 'Sin instrumentación de impacto económico cerrada.',
      timeframe: 'Sin ventana cerrada',
      confidenceNote: 'Se declara solo lo implementado.',
    },
  ],
  honestyNote:
    'Las métricas de ahorro económico exacto siguen pendientes de instrumentación. Este caso solo declara impacto verificado; OpenMetadata y la evolución a Azure están en integración (roadmap).',
}
