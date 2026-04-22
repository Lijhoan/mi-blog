import type { SceneChapterConfig } from './scene.types'

export const sceneRegistry: SceneChapterConfig[] = [
  {
    id: 'identity',
    sectionId: 'home',
    title: 'Ingeniero Digital | Cloud Data Engineer | Solutions Architect',
    eyebrow: 'Capítulo de identidad',
    summary: 'Posicionamiento, credibilidad y dirección técnica en un solo golpe de vista.',
    accentLabel: 'Señal de perfil',
    tone: 'cool',
    intensity: 'balanced',
    priority: 100,
  },
  {
    id: 'proof',
    sectionId: 'projects',
    title: 'Prueba de capacidad',
    eyebrow: 'Capítulo de proyectos',
    summary: 'Casos concretos de ejecución con stack, impacto y arquitectura empresarial.',
    accentLabel: 'Señal de capacidad',
    tone: 'steel',
    intensity: 'expressive',
    priority: 90,
  },
  {
    id: 'trust',
    sectionId: 'experience',
    title: 'Credibilidad empresarial',
    eyebrow: 'Capítulo de confianza',
    summary: 'Trayectoria, seniority y consistencia operativa como soporte de confianza.',
    accentLabel: 'Señal de confianza',
    tone: 'neutral',
    intensity: 'quiet',
    priority: 80,
  },
  {
    id: 'cta',
    sectionId: 'contact',
    title: 'Construyamos el próximo sistema',
    eyebrow: 'Capítulo de cierre',
    summary: 'Un cierre directo, seguro y preparado para convertir atención en conversación.',
    accentLabel: 'Señal de contacto',
    tone: 'warm',
    intensity: 'quiet',
    priority: 70,
  },
]

export const getSceneChapterBySectionId = (sectionId: SceneChapterConfig['sectionId']) => {
  return sceneRegistry.find((chapter) => chapter.sectionId === sectionId) ?? sceneRegistry[0]
}
