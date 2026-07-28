import {
  BarChart3,
  Boxes,
  Brain,
  Cloud,
  Code2,
  Container,
  Cpu,
  Database,
  FileBarChart2,
  GitBranch,
  HardDrive,
  Layers,
  Lock,
  MessageSquare,
  Network,
  Server,
  Shield,
  Terminal,
  TrendingUp,
  Workflow,
} from 'lucide-react'
import type { SkillItem } from '../profile/profile.types'

// Plataforma de datos y Lakehouse (S10 Lakehouse — implementado)
export const dataPlatformSkills: SkillItem[] = [
  { name: 'Apache Airflow', level: 90, icon: Workflow, status: 'canonical' },
  { name: 'dbt Core', level: 88, icon: GitBranch, status: 'canonical' },
  { name: 'Apache Iceberg', level: 85, icon: Layers, status: 'canonical' },
  { name: 'Trino', level: 85, icon: Database, status: 'canonical' },
  { name: 'MinIO (S3)', level: 85, icon: HardDrive, status: 'canonical' },
  { name: 'PostgreSQL · PgBouncer', level: 88, icon: Database, status: 'canonical' },
  { name: 'SQL Server', level: 85, icon: Server, status: 'canonical' },
  { name: 'Parquet · PyArrow', level: 85, icon: Boxes, status: 'canonical' },
]

// BI y analítica
export const biAnalyticsSkills: SkillItem[] = [
  { name: 'Power BI', level: 95, icon: BarChart3, status: 'canonical' },
  { name: 'SQL analítico', level: 92, icon: Database, status: 'canonical' },
  { name: 'Python (pandas)', level: 90, icon: Brain, status: 'canonical' },
  { name: 'DAX', level: 85, icon: TrendingUp, status: 'canonical' },
  { name: 'Excel Avanzado', level: 88, icon: FileBarChart2, status: 'canonical' },
  { name: 'Modelado dimensional', level: 85, icon: Layers, status: 'canonical' },
]

// Automatización, DevOps e IA aplicada
export const devopsAutomationSkills: SkillItem[] = [
  { name: 'Docker · Podman', level: 88, icon: Container, status: 'canonical' },
  { name: 'Jenkins (CI/CD)', level: 85, icon: Workflow, status: 'canonical' },
  { name: 'Git · Gitea', level: 88, icon: GitBranch, status: 'canonical' },
  { name: 'n8n', level: 82, icon: Workflow, status: 'canonical' },
  { name: 'Bash · PowerShell', level: 82, icon: Terminal, status: 'canonical' },
  { name: 'IA local (Ollama)', level: 82, icon: Cpu, status: 'canonical' },
  { name: 'Prompt Engineering', level: 85, icon: MessageSquare, status: 'canonical' },
]

// Infraestructura, seguridad y desarrollo
export const infraSecuritySkills: SkillItem[] = [
  { name: 'Linux (Ubuntu · Rocky)', level: 88, icon: Server, status: 'canonical' },
  { name: 'OpenBao (secretos)', level: 85, icon: Lock, status: 'canonical' },
  { name: 'TLS · Proxy inverso', level: 82, icon: Shield, status: 'canonical' },
  { name: 'Redes · DNS interno', level: 80, icon: Network, status: 'canonical' },
  { name: 'Next.js · React · TypeScript', level: 82, icon: Code2, status: 'canonical' },
  { name: 'Microsoft 365 Admin', level: 85, icon: Cloud, status: 'canonical' },
]
