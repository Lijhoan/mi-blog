'use client'

import { useMemo } from 'react'
import ChapterOverlay from './ChapterOverlay'
import { certificationGroups, experienceTimeline } from '@/content/index.ts'
import { sceneRegistry } from './sceneRegistry'
import { chapterPanelClassesById } from './chapterMoodTokens'

/**
 * Trust chapter overlay for the experience section.
 * It turns tenure, seniority, and certifications into a credibility frame.
 */
export default function TrustChapterOverlay() {
  const chapter = sceneRegistry.find((item) => item.id === 'trust') ?? sceneRegistry[2]

  const trustPoints = useMemo(() => [
    `${experienceTimeline.length} career stops`,
    `${certificationGroups.length} certification tracks`,
    experienceTimeline[0]?.company ?? 'Enterprise delivery',
  ], [])

  return (
    <ChapterOverlay chapter={chapter}>
      <div className="absolute left-4 bottom-5 sm:left-8 sm:bottom-8 grid gap-3 sm:grid-cols-3 max-w-4xl">
        {trustPoints.map((point) => (
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
