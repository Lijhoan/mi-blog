'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import ChapterAtmosphereLayer from './ChapterAtmosphereLayer'
import { useScrollRuntimeSelector } from '@/features/motion/runtime/scrollRuntime.ts'
import type { SceneChapterConfig } from './scene.types'

const MinimalWebGLLayer = lazy(() => import('@/features/graphics/MinimalWebGLLayer.tsx'))

export type SceneContinuityLayerProps = {
  chapter: SceneChapterConfig
}

/**
 * Global continuity layer.
 * It stays fixed behind the app and gives the portfolio a shared atmospheric field.
 */
export default function SceneContinuityLayer({ chapter }: SceneContinuityLayerProps) {
  const reducedMotion = useScrollRuntimeSelector((runtime) => runtime.reducedMotion)
  const [supportsWebGL, setSupportsWebGL] = useState(false)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    setSupportsWebGL(Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))))
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {!reducedMotion && supportsWebGL && (
        <div className="absolute inset-0 opacity-100">
          <Suspense fallback={null}>
            <MinimalWebGLLayer chapter={chapter} />
          </Suspense>
        </div>
      )}
      <ChapterAtmosphereLayer chapter={chapter} active />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
    </div>
  )
}
