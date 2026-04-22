'use client'

import ChapterOverlay from './ChapterOverlay'
import { sceneRegistry } from './sceneRegistry'

/**
 * CTA chapter overlay for the contact section.
 * It closes the journey with low-noise trust cues and direct conversion intent.
 */
export default function CtaChapterOverlay() {
  const chapter = sceneRegistry.find((item) => item.id === 'cta') ?? sceneRegistry[3]

  return <ChapterOverlay chapter={chapter} />
}
