import { BarChart3, Brain, Cloud, Code, Code2, Database, FileBarChart2, MessageSquare, TrendingUp, Workflow } from 'lucide-react'
import type { SkillItem } from '../profile/profile.types'

export const dataBiSkills: SkillItem[] = [
  { name: 'Power BI', level: 95, icon: BarChart3, status: 'canonical' },
  { name: 'Tableau', level: 80, icon: TrendingUp, status: 'canonical' },
  { name: 'Looker Studio', level: 75, icon: BarChart3, status: 'canonical' },
  { name: 'Quicksight', level: 70, icon: BarChart3, status: 'canonical' },
  { name: 'SQL', level: 90, icon: Database, status: 'canonical' },
  { name: 'MySQL', level: 80, icon: Database, status: 'canonical' },
  { name: 'SQL Server', level: 75, icon: Database, status: 'canonical' },
  { name: 'Excel Avanzado', level: 88, icon: FileBarChart2, status: 'canonical' },
]

export const mlSkills: SkillItem[] = [
  { name: 'Python', level: 85, icon: Brain, status: 'canonical' },
  { name: 'R', level: 60, icon: Code, status: 'canonical' },
  { name: 'Scikit-learn', level: 65, icon: Brain, status: 'canonical' },
  { name: 'TensorFlow', level: 60, icon: Brain, status: 'canonical' },
  { name: 'Machine Learning', level: 75, icon: Brain, status: 'canonical' },
]

export const devSkills: SkillItem[] = [
  { name: 'HTML', level: 65, icon: Code, status: 'canonical' },
  { name: 'Java', level: 60, icon: Code2, status: 'canonical' },
  { name: 'JavaScript', level: 60, icon: Code2, status: 'canonical' },
  { name: 'React', level: 70, icon: Code, status: 'canonical' },
]

export const infraSkills: SkillItem[] = [
  { name: 'AWS', level: 70, icon: Cloud, status: 'canonical' },
  { name: 'ETL', level: 70, icon: Database, status: 'canonical' },
  { name: 'Bizagi', level: 70, icon: Workflow, status: 'canonical' },
  { name: 'Scrum', level: 85, icon: Workflow, status: 'canonical' },
  { name: 'Azure', level: 70, icon: Cloud, status: 'canonical' },
]

export const aiSkills: SkillItem[] = [
  { name: 'Prompt Engineering', level: 80, icon: MessageSquare, status: 'canonical' },
  { name: 'IA Generativa', level: 75, icon: Brain, status: 'canonical' },
]
