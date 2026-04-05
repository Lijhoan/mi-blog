'use client'

import SceneShell from './SceneShell'
import { profileContent } from '@/content/index.ts'

/**
 * First premium visual seed for the portfolio.
 * It overlays the home chapter with a cinematic but restrained identity frame.
 */
export default function IdentityChapterOverlay() {
  return (
    <SceneShell
      chapterId="identity"
      eyebrow="Identity chapter"
      title={profileContent.positioning.headline}
      summary={profileContent.positioning.summary}
      accentLabel="Profile signal"
    />
  )
}
