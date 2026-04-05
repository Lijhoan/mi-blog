import type { SceneChapterConfig } from './scene.types'

export const sceneRegistry: SceneChapterConfig[] = [
  {
    id: 'identity',
    sectionId: 'home',
    title: 'Ingeniero Digital | Cloud Data Engineer | Solutions Architect',
    eyebrow: 'Identity chapter',
    summary: 'Posicionamiento, credibilidad y dirección técnica en un solo golpe de vista.',
    accentLabel: 'Profile signal',
    tone: 'cool',
    intensity: 'balanced',
    priority: 100,
  },
  {
    id: 'proof',
    sectionId: 'projects',
    title: 'Proof of capability',
    eyebrow: 'Projects chapter',
    summary: 'Casos concretos de ejecución con stack, impacto y arquitectura empresarial.',
    accentLabel: 'Capability signal',
    tone: 'steel',
    intensity: 'expressive',
    priority: 90,
  },
  {
    id: 'trust',
    sectionId: 'experience',
    title: 'Enterprise credibility',
    eyebrow: 'Trust chapter',
    summary: 'Trayectoria, seniority y consistencia operativa como soporte de confianza.',
    accentLabel: 'Trust signal',
    tone: 'neutral',
    intensity: 'quiet',
    priority: 80,
  },
  {
    id: 'cta',
    sectionId: 'contact',
    title: 'Let’s build the next system',
    eyebrow: 'Close chapter',
    summary: 'Un cierre directo, seguro y preparado para convertir atención en conversación.',
    accentLabel: 'Contact signal',
    tone: 'warm',
    intensity: 'quiet',
    priority: 70,
  },
]

export const getSceneChapterBySectionId = (sectionId: SceneChapterConfig['sectionId']) => {
  return sceneRegistry.find((chapter) => chapter.sectionId === sectionId) ?? sceneRegistry[0]
}
