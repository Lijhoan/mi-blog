'use client'

import type { ReactNode } from 'react'
import SceneShell from './SceneShell'
import ChapterAtmosphereLayer from './ChapterAtmosphereLayer'
import type { SceneChapterConfig } from './scene.types'

export type ChapterOverlayProps = {
  chapter: SceneChapterConfig
  active?: boolean
  showFrame?: boolean
  children?: ReactNode
}

/**
 * Reusable chapter overlay contract.
 * It combines shared atmosphere plus a chapter frame and optional foreground content.
 */
export default function ChapterOverlay({ chapter, active = true, showFrame = false, children }: ChapterOverlayProps) {
  if (!active) return null

  return (
    <div className="absolute inset-0">
      <ChapterAtmosphereLayer chapter={chapter} active={active} />
      {showFrame ? (
        <SceneShell
          chapterId={chapter.id}
          eyebrow={chapter.eyebrow}
          title={chapter.title}
          summary={chapter.summary}
          accentLabel={chapter.accentLabel}
          active={active}
        >
          {children}
        </SceneShell>
      ) : (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="pointer-events-auto relative z-10 h-full w-full">{children}</div>
        </div>
      )}
    </div>
  )
}
