'use client'

import { useMemo, type CSSProperties } from 'react'
import type { SceneChapterConfig, SceneTone } from './scene.types'
import { useScrollRuntimeSelector } from '@/features/motion/runtime/scrollRuntime.ts'
import { getChapterMoodToken } from './chapterMoodTokens'

export type ChapterAtmosphereLayerProps = {
  chapter: SceneChapterConfig
  active?: boolean
}

const tonePalette: Record<SceneTone, { primary: string; secondary: string; accent: string }> = {
  cool: {
    primary: 'rgba(34, 211, 238, 0.11)',
    secondary: 'rgba(59, 130, 246, 0.08)',
    accent: 'rgba(125, 211, 252, 0.12)',
  },
  steel: {
    primary: 'rgba(148, 163, 184, 0.09)',
    secondary: 'rgba(14, 165, 233, 0.07)',
    accent: 'rgba(226, 232, 240, 0.1)',
  },
  warm: {
    primary: 'rgba(251, 146, 60, 0.09)',
    secondary: 'rgba(34, 197, 94, 0.06)',
    accent: 'rgba(253, 224, 71, 0.1)',
  },
  neutral: {
    primary: 'rgba(255, 255, 255, 0.06)',
    secondary: 'rgba(100, 116, 139, 0.06)',
    accent: 'rgba(34, 211, 238, 0.06)',
  },
}

const chapterRecipes: Record<SceneChapterConfig['id'], {
  spotA: string
  spotB: string
  vignette: string
  lineLeft: string
  lineRight: string
}> = {
  identity: {
    spotA: '18% 20%',
    spotB: '82% 26%',
    vignette: 'rgba(2, 6, 23, 0.5)',
    lineLeft: '16%',
    lineRight: '84%',
  },
  proof: {
    spotA: '24% 18%',
    spotB: '76% 34%',
    vignette: 'rgba(2, 6, 23, 0.54)',
    lineLeft: '20%',
    lineRight: '80%',
  },
  trust: {
    spotA: '14% 30%',
    spotB: '86% 20%',
    vignette: 'rgba(2, 6, 23, 0.58)',
    lineLeft: '13%',
    lineRight: '87%',
  },
  cta: {
    spotA: '20% 28%',
    spotB: '78% 24%',
    vignette: 'rgba(2, 6, 23, 0.6)',
    lineLeft: '18%',
    lineRight: '82%',
  },
}

/**
 * Shared atmosphere for all chapters.
 * It stays lightweight and only changes transforms/opacity from runtime signals.
 */
export default function ChapterAtmosphereLayer({ chapter, active = true }: ChapterAtmosphereLayerProps) {
  const runtime = useScrollRuntimeSelector((value) => ({
    reducedMotion: value.reducedMotion,
    globalProgress: value.globalProgress,
    velocity: value.velocity,
    direction: value.direction,
  }))

  const palette = tonePalette[chapter.tone]
  const recipe = chapterRecipes[chapter.id]
  const mood = getChapterMoodToken(chapter.id)

  const style = useMemo(() => {
    const driftBase = 12 * mood.motionIntensity.driftMultiplier
    const driftX = (runtime.globalProgress * 2 - 1) * driftBase
    const driftY = runtime.direction === 'down' ? driftBase * 0.55 : runtime.direction === 'up' ? -driftBase * 0.55 : 0
    const blurScale = runtime.reducedMotion ? 1 : Math.min(1.015, 1 + Math.abs(runtime.velocity) * 0.003 * mood.motionIntensity.pulseMultiplier)
    const opacity = active ? (runtime.reducedMotion ? 0.22 : mood.atmosphere.intensityOpacity * 0.86) : 0.06

    return {
      transform: `translate3d(${driftX}px, ${driftY}px, 0) scale(${blurScale})`,
      opacity,
      '--chapter-primary': palette.primary,
      '--chapter-secondary': palette.secondary,
      '--chapter-accent': palette.accent,
      } as CSSProperties
    }, [active, mood.atmosphere.intensityOpacity, mood.motionIntensity.driftMultiplier, mood.motionIntensity.pulseMultiplier, palette.accent, palette.primary, palette.secondary, runtime.direction, runtime.globalProgress, runtime.reducedMotion, runtime.velocity])

    const gridSize = 104 + Math.round((1 - mood.calmExpressiveBalance) * 26)

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-opacity"
        style={{
          ...style,
          background:
            `radial-gradient(circle at ${recipe.spotA}, var(--chapter-primary), transparent 34%), radial-gradient(circle at ${recipe.spotB}, var(--chapter-secondary), transparent 30%), linear-gradient(180deg, rgba(2, 6, 23, 0.12), ${recipe.vignette})`,
        }}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.009)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)]"
        style={{ opacity: mood.atmosphere.gridOpacity, backgroundSize: `${gridSize}px ${gridSize}px` }}
      />
      <div className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-200/18 to-transparent" style={{ left: recipe.lineLeft, opacity: mood.atmosphere.frameLineOpacity }} />
      <div className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-200/14 to-transparent" style={{ left: recipe.lineRight, opacity: mood.atmosphere.frameLineOpacity }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" style={{ opacity: mood.atmosphere.frameLineOpacity * 0.65 }} />
    </div>
  )
}
