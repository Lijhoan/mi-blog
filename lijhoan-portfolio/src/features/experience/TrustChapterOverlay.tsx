'use client'

import ChapterOverlay from './ChapterOverlay'
import { sceneRegistry } from './sceneRegistry'

/**
 * Trust chapter overlay for the experience section.
 * It turns tenure, seniority, and certifications into a credibility frame.
 */
export default function TrustChapterOverlay() {
  const chapter = sceneRegistry.find((item) => item.id === 'trust') ?? sceneRegistry[2]

  return <ChapterOverlay chapter={chapter} />
}
