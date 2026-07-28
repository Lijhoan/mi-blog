'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useMemo } from 'react'
import type { SceneChapterId } from './scene.types'
import { getChapterMoodToken } from './chapterMoodTokens'
import { useScrollRuntimeSelector } from '@/features/motion/runtime/scrollRuntime.ts'

export type SceneShellProps = {
  chapterId: SceneChapterId
  title: string
  eyebrow: string
  summary: string
  accentLabel?: string
  children?: ReactNode
  className?: string
  active?: boolean
}

/**
 * Reusable scene shell for premium section-level composition.
 * It turns runtime signals into subtle atmospheric motion without owning content or scroll logic.
 */
export default function SceneShell({ chapterId, title, eyebrow, summary, accentLabel = 'Immersive profile', children, className, active = true }: SceneShellProps) {
  const scene = useScrollRuntimeSelector((runtime) => ({
    reducedMotion: runtime.reducedMotion,
    globalProgress: runtime.globalProgress,
    velocity: runtime.velocity,
    direction: runtime.direction,
    activeSceneId: runtime.activeSceneId,
  }))
  const mood = getChapterMoodToken(chapterId)

  const atmosphereStyle = useMemo(() => {
    const driftX = (scene.globalProgress * 2 - 1) * 24
    const driftY = scene.direction === 'down' ? 18 : scene.direction === 'up' ? -18 : 0
    const pulse = Math.min(1.08, 1 + Math.abs(scene.velocity) * 0.015 * mood.motionIntensity.pulseMultiplier)

    return {
      '--scene-drift-x': `${driftX}px`,
      '--scene-drift-y': `${driftY}px`,
      '--scene-pulse': scene.reducedMotion ? '1' : String(pulse),
      opacity: scene.reducedMotion ? 0.72 : 1,
    } as CSSProperties
  }, [mood.motionIntensity.pulseMultiplier, scene.direction, scene.globalProgress, scene.reducedMotion, scene.velocity])

  if (!active) return null

  return (
    <section className={['pointer-events-none absolute inset-0 overflow-hidden', className].filter(Boolean).join(' ')}>
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.16), transparent 30%), radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.12), transparent 26%), linear-gradient(180deg, rgba(2, 6, 23, 0.12), rgba(2, 6, 23, 0.42))',
          transform: 'translate3d(var(--scene-drift-x), var(--scene-drift-y), 0) scale(var(--scene-pulse))',
          ...atmosphereStyle,
        }}
      />

      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" style={{ opacity: mood.atmosphere.gridOpacity }} />
      <div aria-hidden="true" className="absolute inset-y-0 left-[12%] w-px bg-gradient-to-b from-transparent via-cyan-300/25 to-transparent" style={{ opacity: mood.atmosphere.frameLineOpacity }} />
      <div aria-hidden="true" className="absolute inset-y-0 right-[18%] w-px bg-gradient-to-b from-transparent via-blue-300/20 to-transparent" style={{ opacity: mood.atmosphere.frameLineOpacity }} />

      <div className={[
        mood.frameVisibility.desktop ? 'hidden sm:block' : 'hidden',
        'absolute left-6 top-6 lg:left-10 lg:top-10 max-w-[26rem] rounded-[1.5rem] border shadow-2xl shadow-black/20',
        mood.panelDensity.panelBorder,
        mood.panelDensity.panelBg,
        mood.panelDensity.blur,
        mood.spacingRhythm.framePadding,
      ].join(' ')}>
        <div className={[
          'flex items-center justify-between',
          mood.spacingRhythm.stackGap,
          'text-[11px] uppercase',
          mood.captionStyle.tracking,
          mood.captionStyle.tone,
        ].join(' ')}>
          <span>{eyebrow}</span>
          <span>{scene.activeSceneId ?? accentLabel}</span>
        </div>
        <h1 className={[
          'mt-3 leading-tight text-balance',
          mood.typographyEmphasis.titleSize,
          mood.typographyEmphasis.titleWeight,
          mood.typographyEmphasis.titleTracking,
          mood.contrastBehavior.titleClass,
        ].join(' ')}>
          {title}
        </h1>
        <p className={[
          'mt-3 text-sm lg:text-base leading-relaxed max-w-[52ch]',
          mood.typographyEmphasis.summaryTone,
          mood.contrastBehavior.summaryClass,
        ].join(' ')}>
          {summary}
        </p>
      </div>

      <div className="pointer-events-auto relative z-10 h-full w-full">
        {children}
      </div>
    </section>
  )
}
