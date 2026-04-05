export type SceneChapterId = 'identity' | 'proof' | 'trust' | 'cta'

export type SceneSectionId = 'home' | 'about' | 'projects' | 'experience' | 'certifications' | 'contact' | 'skills'

export type SceneTone = 'cool' | 'steel' | 'warm' | 'neutral'
export type SceneIntensity = 'quiet' | 'balanced' | 'expressive'

export type SceneChapterConfig = {
  id: SceneChapterId
  sectionId: SceneSectionId
  title: string
  eyebrow: string
  summary: string
  accentLabel: string
  tone: SceneTone
  intensity: SceneIntensity
  priority: number
}
