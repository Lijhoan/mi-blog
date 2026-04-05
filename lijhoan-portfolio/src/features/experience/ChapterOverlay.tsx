'use client'

import type { ReactNode } from 'react'
import SceneShell from './SceneShell'
import ChapterAtmosphereLayer from './ChapterAtmosphereLayer'
import type { SceneChapterConfig } from './scene.types'

export type ChapterOverlayProps = {
  chapter: SceneChapterConfig
  active?: boolean
  children?: ReactNode
}

/**
 * Reusable chapter overlay contract.
 * It combines shared atmosphere plus a chapter frame and optional foreground content.
 */
export default function ChapterOverlay({ chapter, active = true, children }: ChapterOverlayProps) {
  return (
    <div className="absolute inset-0">
      <ChapterAtmosphereLayer chapter={chapter} active={active} />
      <SceneShell
        chapterId={chapter.id}
        eyebrow={chapter.eyebrow}
        title={chapter.title}
        summary={chapter.summary}
        accentLabel={chapter.accentLabel}
      >
        {children}
      </SceneShell>
    </div>
  )
}
