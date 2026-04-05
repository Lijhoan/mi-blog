'use client'

import { useMemo } from 'react'
import ChapterOverlay from './ChapterOverlay'
import { profileContent } from '@/content/index.ts'
import { sceneRegistry } from './sceneRegistry'
import { chapterPanelClassesById } from './chapterMoodTokens'

/**
 * CTA chapter overlay for the contact section.
 * It closes the journey with low-noise trust cues and direct conversion intent.
 */
export default function CtaChapterOverlay() {
  const chapter = sceneRegistry.find((item) => item.id === 'cta') ?? sceneRegistry[3]

  const ctaPoints = useMemo(() => [
    profileContent.identity.location,
    'Business Intelligence',
    'Data Engineering',
  ], [])

  return (
    <ChapterOverlay chapter={chapter}>
      <div className="absolute left-4 bottom-5 sm:left-8 sm:bottom-8 grid gap-3 sm:grid-cols-3 max-w-4xl">
        {ctaPoints.map((point) => (
          <div key={point} className={[
            'rounded-2xl px-4 py-3 text-sm backdrop-blur-xl transition-colors duration-300',
            chapterPanelClassesById[chapter.id],
          ].join(' ')}>
            {point}
          </div>
        ))}
      </div>
    </ChapterOverlay>
  )
}
