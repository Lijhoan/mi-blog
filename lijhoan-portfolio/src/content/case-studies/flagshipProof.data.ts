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
  id: 'tale-insight-analytics-flagship',
  projectTitle: 'Tale Insight Analytics',
  projectCategory: 'Business Intelligence Platform',
  whyThisCase:
    'Combina diferenciacion tecnica, alcance empresarial real y claridad narrativa: arquitectura moderna (Next.js 15 + React 19), control de acceso por areas y una capa BI preparada para evolucionar sin romper el sistema.',
  problemFraming: [
    'La organizacion necesitaba centralizar el consumo de reportes en un entorno unico, legible y gobernado por areas.',
    'El flujo previo dispersaba la lectura operativa y hacia dificil sostener decisiones sincronizadas entre equipos.',
    'El objetivo fue crear un hub BI con identidad de producto interno, no solo una coleccion de dashboards.',
  ],
  architectureSnapshot: [
    'Frontend en Next.js 15 + React 19 para shell editorial, navegacion y experiencia de consumo.',
    'Capa de datos y autorizacion respaldada por PostgreSQL 16+ y JWT para control por areas.',
    'Despliegue sobre Podman y Rocky Linux 9.7 para un modelo operativo portable y auditable.',
    'Integracion de reportes Power BI dentro del flujo de producto, manteniendo una entrada unificada.',
  ],
  stack: [
    'Next.js 15',
    'React 19',
    'TypeScript',
    'Tailwind CSS',
    'shadcn/ui',
    'PostgreSQL 16+',
    'JWT',
    'Podman',
    'Rocky Linux 9.7',
    'Power BI',
  ],
  impactMetrics: [
    {
      label: 'Cobertura organizacional',
      value: '8 / 28',
      unit: 'areas / sub-areas',
      status: 'verified',
      sourceNote: 'CV canonico y narrativa del proyecto Tale Insight Analytics.',
      timeframe: '2024',
      confidenceNote: 'Verificado por contenido canonico del portafolio, pendiente de evidencia documental externa publicada.',
    },
    {
      label: 'Consolidacion de reportes',
      value: 'Alta consolidacion',
      unit: 'indice cualitativo',
      status: 'estimated',
      sourceNote: 'Descripcion canonica del proyecto y framing de chapter.',
      timeframe: '2024',
      baseline: 'Acceso distribuido por canal/equipo (sin punto unico)',
      after: 'Hub BI centralizado de entrada',
      delta: 'Mejora cualitativa confirmada, sin porcentaje instrumentado',
      confidenceNote: 'Se requiere instrumentar eventos de acceso por area para elevar a verified cuantitativo.',
    },
    {
      label: 'ROI operativo formal',
      value: 'Pendiente',
      unit: '% ahorro',
      status: 'pending',
      sourceNote: 'No instrumentado aun en este repositorio.',
      timeframe: 'Sin ventana cerrada',
      baseline: 'No definido',
      after: 'No definido',
      confidenceNote: 'Falta baseline y comparativa post-adopcion para calcular delta economico.',
    },
    {
      label: 'Tiempo medio de lectura por usuario',
      value: 'No disponible',
      unit: 'segundos',
      status: 'unavailable',
      sourceNote: 'No existe telemetria historica importada del sistema productivo.',
      timeframe: 'No disponible',
      confidenceNote: 'Requiere export de eventos reales desde plataforma BI corporativa.',
    },
  ],
  constraintsAndComplexity: [
    'Balance entre velocidad de entrega y gobernanza de acceso por areas.',
    'Convivencia de experiencia editorial web con necesidades BI de alto contexto.',
    'Portabilidad infra/producto para evolucion futura hacia arquitectura App Router full.',
  ],
  credibilitySignals: [
    'Control de acceso por areas organizacionales.',
    'Despliegue en infraestructura Linux corporativa con contenedores.',
    'Arquitectura preparada para integraciones y trazabilidad operacional.',
    'Narrativa de producto interno orientada a decisiones de negocio, no a demo visual.',
  ],
  storyPanels: [
    {
      title: 'Problem Framing',
      points: [
        'Fragmentacion de lectura operativa entre areas.',
        'Necesidad de unificar acceso, contexto y decision.',
      ],
    },
    {
      title: 'Architecture Snapshot',
      points: [
        'Shell web moderno + control de acceso + infraestructura portable.',
        'Integracion BI dentro de una experiencia de producto corporativa.',
      ],
    },
    {
      title: 'Impact and Credibility',
      points: [
        'Cobertura en 8 areas y 28 sub-areas.',
        'Base lista para instrumentar impacto cuantitativo de ROI.',
      ],
    },
  ],
}
