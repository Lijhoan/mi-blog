export type FlagshipProofMetric = {
  label: string
  value: string
  unit: string
  status: 'verified' | 'estimated' | 'pending' | 'unavailable'
  sourceNote: string
  timeframe: string
  baseline?: string
  after?: string
  delta?: string
  confidenceNote?: string
}

export type FlagshipProofPanel = {
  title: string
  points: string[]
}

export type FlagshipProofCaseStudy = {
  id: string
  projectTitle: string
  projectCategory: string
  whyThisCase: string
  problemFraming: string[]
  architectureSnapshot: string[]
  stack: string[]
  impactMetrics: FlagshipProofMetric[]
  constraintsAndComplexity: string[]
  credibilitySignals: string[]
  storyPanels: FlagshipProofPanel[]
}

export const flagshipProofCaseStudy: FlagshipProofCaseStudy = {
  id: 's10-lakehouse-flagship',
  projectTitle: 'Plataforma de Datos S10 Lakehouse',
  projectCategory: 'Data Platform · Lakehouse On-Premise',
  whyThisCase:
    'Modernización integral del ecosistema de datos de TALE: ingeniería inversa de un ERP legado (S10 / SQL Server) y construcción de una plataforma Lakehouse on-premise con arquitectura Medallion, orquestación desacoplada, seguridad de secretos, CI/CD y consumo analítico en Power BI.',
  problemFraming: [
    'ERP monolítico con alta dependencia de SQL Server y documentación funcional limitada.',
    'Información operativa fragmentada, sin trazabilidad ni capa analítica gobernada.',
    'Necesidad de desacoplar los datos del ERP sin interrumpir la operación.',
  ],
  architectureSnapshot: [
    'Extracción con Python (pyodbc, pandas, PyArrow) hacia Parquet en MinIO (capa Bronze).',
    'Apache Airflow orquesta con DAGs delgados; un runtime-agent externo ejecuta la ingesta.',
    'Apache Iceberg + catálogo PostgreSQL; dbt Core transforma Bronze → Silver → Gold.',
    'Trino expone SQL distribuido; Power BI consume los modelos Gold.',
    'OpenBao gestiona secretos con AppRole y mínimo privilegio; Jenkins/Gitea/Registry cubren CI/CD.',
  ],
  stack: [
    'Apache Airflow',
    'Python',
    'SQL Server',
    'Parquet',
    'MinIO',
    'Apache Iceberg',
    'PostgreSQL',
    'PgBouncer',
    'dbt Core',
    'Trino',
    'OpenBao',
    'Jenkins',
    'Gitea',
    'Docker · Podman',
    'Power BI',
  ],
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
      value: 'Bronze / Silver / Gold',
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
      confidenceNote: 'Se declara solo lo implementado; el impacto económico se medirá con la plataforma en producción plena.',
    },
  ],
  constraintsAndComplexity: [
    'Ingeniería inversa de un sistema sin documentación funcional completa.',
    'Operación on-premise con seguridad de secretos y mínimo privilegio.',
    'Separación estricta entre orquestación, ejecución y almacenamiento.',
  ],
  credibilitySignals: [
    'Seguridad centralizada con OpenBao: AppRole, políticas y credenciales separadas por servicio.',
    'CI/CD real con Jenkins, Gitea y Registry privado.',
    'Auditoría de pipelines: ejecuciones, errores, tiempos y filas afectadas.',
    'OpenMetadata y evolución a Azure declaradas como integración en curso, no como hecho.',
  ],
  storyPanels: [
    {
      title: 'Problem Framing',
      points: [
        'ERP legado monolítico (S10 / SQL Server) con documentación limitada y lectura operativa fragmentada.',
        'Necesidad de datos gobernados, trazables y consumibles sin interrumpir la operación.',
      ],
    },
    {
      title: 'Architecture Snapshot',
      points: [
        'Airflow + runtime-agent → Python/Parquet → MinIO → Iceberg → dbt (Bronze/Silver/Gold) → Trino → Power BI.',
        'Transversal: OpenBao (secretos), Jenkins/Gitea (CI/CD), observabilidad y auditoría.',
      ],
    },
    {
      title: 'Impact and Credibility',
      points: [
        'Plataforma distribuida en 3 servidores Linux con responsabilidades separadas.',
        'Roadmap honesto: OpenMetadata y migración a Azure en integración.',
      ],
    },
  ],
}
