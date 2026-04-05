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
    primary: 'rgba(34, 211, 238, 0.16)',
    secondary: 'rgba(59, 130, 246, 0.11)',
    accent: 'rgba(125, 211, 252, 0.18)',
  },
  steel: {
    primary: 'rgba(148, 163, 184, 0.12)',
    secondary: 'rgba(14, 165, 233, 0.09)',
    accent: 'rgba(226, 232, 240, 0.14)',
  },
  warm: {
    primary: 'rgba(251, 146, 60, 0.12)',
    secondary: 'rgba(34, 197, 94, 0.08)',
    accent: 'rgba(253, 224, 71, 0.12)',
  },
  neutral: {
    primary: 'rgba(255, 255, 255, 0.08)',
    secondary: 'rgba(100, 116, 139, 0.08)',
    accent: 'rgba(34, 211, 238, 0.08)',
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
  const mood = getChapterMoodToken(chapter.id)

  const style = useMemo(() => {
    const driftBase = 18 * mood.motionIntensity.driftMultiplier
    const driftX = (runtime.globalProgress * 2 - 1) * driftBase
    const driftY = runtime.direction === 'down' ? driftBase * 0.55 : runtime.direction === 'up' ? -driftBase * 0.55 : 0
    const blurScale = runtime.reducedMotion ? 1 : Math.min(1.08, 1 + Math.abs(runtime.velocity) * 0.01 * mood.motionIntensity.pulseMultiplier)
    const opacity = active ? (runtime.reducedMotion ? 0.5 : mood.atmosphere.intensityOpacity) : 0.2

    return {
      transform: `translate3d(${driftX}px, ${driftY}px, 0) scale(${blurScale})`,
      opacity,
      '--chapter-primary': palette.primary,
      '--chapter-secondary': palette.secondary,
      '--chapter-accent': palette.accent,
    } as CSSProperties
  }, [active, mood.atmosphere.intensityOpacity, mood.motionIntensity.driftMultiplier, mood.motionIntensity.pulseMultiplier, palette.accent, palette.primary, palette.secondary, runtime.direction, runtime.globalProgress, runtime.reducedMotion, runtime.velocity])

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
            'radial-gradient(circle at 20% 20%, var(--chapter-primary), transparent 32%), radial-gradient(circle at 80% 28%, var(--chapter-secondary), transparent 28%), linear-gradient(180deg, rgba(2, 6, 23, 0.08), rgba(2, 6, 23, 0.5))',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.013)_1px,transparent_1px)] bg-[size:88px_88px]" style={{ opacity: mood.atmosphere.gridOpacity }} />
      <div className="absolute left-[18%] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-200/20 to-transparent" style={{ opacity: mood.atmosphere.frameLineOpacity }} />
      <div className="absolute right-[22%] top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-200/14 to-transparent" style={{ opacity: mood.atmosphere.frameLineOpacity }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}
