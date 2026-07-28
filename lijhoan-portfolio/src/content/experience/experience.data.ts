import type { ExperienceItem } from '../profile/profile.types'

export const experienceTimeline: ExperienceItem[] = [
  {
    role: 'Ingeniero Digital',
    company: 'Tale Inmobiliaria / Tale Contratistas',
    period: 'Diciembre 2024 – Presente',
    highlights: [
      'Diseño e implementación de la plataforma de datos S10 Lakehouse on-premise: arquitectura Medallion (Bronze/Silver/Gold) con Apache Airflow, MinIO, Apache Iceberg, dbt Core, Trino y PostgreSQL, distribuida en servidores Linux con responsabilidades separadas (datos, aplicaciones, DevOps).',
      'Ingeniería inversa y profiling del ERP legado S10 (SQL Server): conversión de estructuras transaccionales con documentación limitada en datasets gobernados, trazables y consumibles desde Power BI.',
      'Pipelines de extracción con Python (pyodbc, pandas, PyArrow) y patrón de orquestación desacoplada: DAGs delgados en Airflow con runtime-agent externo, auditoría de ejecuciones y validaciones de calidad.',
      'Seguridad por mínimo privilegio con OpenBao (AppRole, políticas y credenciales separadas por servicio), publicación HTTPS vía proxy inverso, DNS interno y hardening de accesos SSH/ACL.',
      'Plataforma DevOps corporativa: Jenkins, Gitea y Registry privado para CI/CD de ingestion-runner, dbt y DAGs sobre Docker/Podman en Ubuntu Server y Rocky Linux.',
      'Desarrollo de plataformas corporativas con Next.js, React y NestJS; IA local aplicada (Ollama y modelos de código sobre GPU dedicada) para profiling, documentación e ingeniería inversa; administración de Microsoft 365.',
    ],
  },
  {
    role: 'Finance Performance Analyst',
    company: 'Verisure Perú',
    period: 'Abril 2025 – Noviembre 2025',
    highlights: [
      'Monitoreo de KPIs financieros críticos para optimizar el rendimiento económico organizacional.',
      'Desarrollo de dashboards automatizados en Power BI con fuentes heterogéneas para rentabilidad y proyecciones presupuestarias.',
      'Implementación de modelos predictivos en Python/SQL para forecasting financiero.',
    ],
  },
  {
    role: 'Senior BI Analyst',
    company: '3ERIZA',
    period: 'Mayo 2020 – Diciembre 2024',
    highlights: [
      'Dirección del equipo de Business Intelligence logrando un incremento del 20% en eficiencia operativa mediante automatización de tableros.',
      'Optimización de precisión estratégica con Python, SQL y Power BI.',
      'Diseño de soluciones analíticas para Marketing, Finanzas, Operaciones y Calidad.',
    ],
  },
  {
    role: 'Training and Quality Analyst',
    company: 'Comdata Group',
    period: 'Febrero 2019 – Diciembre 2019',
    highlights: ['Reducción del 15% en margen de error operativo.', 'Análisis de procesos y soporte a calidad operativa.'],
  },
  {
    role: 'Quality Analyst',
    company: 'CLV Telecomunicaciones',
    period: 'Diciembre 2017 – Enero 2019',
    highlights: ['Aumento de productividad en un 12%.', 'Control de calidad con foco en consistencia operativa y seguimiento de indicadores.'],
  },
  {
    role: 'Marshal Data Analyst',
    company: 'IZO',
    period: 'Enero 2017 – Diciembre 2017',
    highlights: ['Análisis de grandes volúmenes de datos y storytelling para alta dirección.', 'Soporte analítico a toma de decisiones ejecutivas.'],
  },
]
