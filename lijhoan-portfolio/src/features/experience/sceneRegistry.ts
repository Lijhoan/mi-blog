import type { SceneChapterConfig } from './scene.types'

export const sceneRegistry: SceneChapterConfig[] = [
  {
    id: 'identity',
    sectionId: 'home',
    title: 'Ingeniero Digital | Cloud Data Engineer | Solutions Architect',
    eyebrow: 'Capitulo identidad',
    summary: 'Posicionamiento, credibilidad y dirección técnica en un solo golpe de vista.',
    accentLabel: 'Sello de perfil',
    tone: 'cool',
    intensity: 'balanced',
    priority: 100,
  },
  {
    id: 'proof',
    sectionId: 'projects',
    title: 'Evidencia de capacidad',
    eyebrow: 'Capitulo proyectos',
    summary: 'Casos concretos de ejecución con stack, impacto y arquitectura empresarial.',
    accentLabel: 'Sello de capacidad',
    tone: 'steel',
    intensity: 'expressive',
    priority: 90,
  },
  {
    id: 'trust',
    sectionId: 'experience',
    title: 'Credibilidad empresarial',
    eyebrow: 'Capitulo trayectoria',
    summary: 'Trayectoria, seniority y consistencia operativa como soporte de confianza.',
    accentLabel: 'Sello de confianza',
    tone: 'neutral',
    intensity: 'quiet',
    priority: 80,
  },
  {
    id: 'cta',
    sectionId: 'contact',
    title: 'Construyamos el siguiente sistema',
    eyebrow: 'Capitulo cierre',
    summary: 'Un cierre directo, seguro y preparado para convertir atención en conversación.',
    accentLabel: 'Sello de contacto',
    tone: 'warm',
    intensity: 'quiet',
    priority: 70,
  },
]

export const getSceneChapterBySectionId = (sectionId: SceneChapterConfig['sectionId']) => {
  return sceneRegistry.find((chapter) => chapter.sectionId === sectionId) ?? sceneRegistry[0]
}
