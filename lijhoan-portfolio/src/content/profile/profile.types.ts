import type { LucideIcon } from 'lucide-react'

export type ContentStatus = 'canonical' | 'derived' | 'optional' | 'pending-verification'

export type OfficialLink = {
  label: string
  href: string
  external?: boolean
  status?: ContentStatus
  note?: string
}

export type ProfileIdentity = {
  name: string
  role: string
  location: string
  email: string
  phone: string
  linkedin: string
  github: string
  tags: string[]
}

export type ProfilePositioning = {
  headline: string
  summary: string
  focus: string
}

export type ImpactMetric = {
  label: string
  value: string
  source: string
  status?: ContentStatus
}

export type SkillItem = {
  name: string
  level: number
  icon: LucideIcon
  status?: ContentStatus
}

export type ProjectGlyphKind = 'analytics' | 'banking' | 'automation' | 'generic'

export type ProjectItem = {
  id: number
  title: string
  description: string
  technologies: string[]
  glyph?: ProjectGlyphKind
  link: string
  category: string
  year: string
  client: string
  status?: ContentStatus
  note?: string
}

export type ExperienceItem = {
  role: string
  company: string
  period: string
  highlights: string[]
  status?: ContentStatus
}

export type CertificationGroup = {
  title: string
  items: string[]
  status?: ContentStatus
}

export type StackGroup = {
  title: string
  items: string[]
  status?: ContentStatus
}

export type VerificationNote = {
  field: string
  detail: string
  status: ContentStatus
}

export type ProfileContent = {
  identity: ProfileIdentity
  positioning: ProfilePositioning
  metrics: ImpactMetric[]
  links: {
    contact: OfficialLink[]
  }
  stack: StackGroup[]
  verification: VerificationNote[]
}
