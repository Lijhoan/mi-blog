'use client'

import ChapterOverlay from './ChapterOverlay'
import { sceneRegistry } from './sceneRegistry'

/**
 * Proof chapter overlay for the projects section.
 * It emphasizes capability through real project signals and stack credibility.
 */
export default function ProofChapterOverlay({ active = true }: { active?: boolean }) {
  const chapter = sceneRegistry.find((item) => item.id === 'proof') ?? sceneRegistry[1]

  return <ChapterOverlay chapter={chapter} active={active} />
}
