'use client'

import { useMemo } from 'react'
import ChapterOverlay from './ChapterOverlay'
import { featuredProjects, profileContent } from '@/content/index.ts'
import { sceneRegistry } from './sceneRegistry'
import { chapterPanelClassesById } from './chapterMoodTokens'

/**
 * Proof chapter overlay for the projects section.
 * It emphasizes capability through real project signals and stack credibility.
 */
export default function ProofChapterOverlay() {
  const chapter = sceneRegistry.find((item) => item.id === 'proof') ?? sceneRegistry[1]

  const proofPoints = useMemo(() => [
    `${featuredProjects.length} featured systems`,
    `${profileContent.stack.length} architecture groups`,
    featuredProjects[0]?.category ?? 'Enterprise delivery',
  ], [])

  return (
    <ChapterOverlay chapter={chapter}>
      <div className="absolute left-4 bottom-5 sm:left-8 sm:bottom-8 grid gap-3 sm:grid-cols-3 max-w-4xl">
        {proofPoints.map((point) => (
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
