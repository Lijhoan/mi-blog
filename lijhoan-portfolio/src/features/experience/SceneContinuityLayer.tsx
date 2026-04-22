'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import ChapterAtmosphereLayer from './ChapterAtmosphereLayer'
import { useScrollRuntimeSelector } from '@/features/motion/runtime/scrollRuntime.ts'
import type { SceneChapterConfig } from './scene.types'
import type { WebGLPerformanceTier } from '@/features/graphics/MinimalWebGLLayer.tsx'

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
  const [isPageVisible, setIsPageVisible] = useState(() => {
    if (typeof document === 'undefined') {
      return true
    }

    return document.visibilityState !== 'hidden'
  })
  const [performanceTier, setPerformanceTier] = useState<WebGLPerformanceTier>('balanced')

  const getPerformanceTier = () => {
    const hardwareConcurrency = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency ?? 4 : 4
    const deviceMemory = typeof navigator !== 'undefined' && 'deviceMemory' in navigator ? Number((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4) : 4
    const coarsePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

    if (hardwareConcurrency <= 4 || deviceMemory <= 4 || coarsePointer) {
      return 'constrained'
    }

    if (hardwareConcurrency >= 8 && deviceMemory >= 8) {
      return 'high'
    }

    return 'balanced'
  }

  useEffect(() => {
    const canvas = document.createElement('canvas')
    setSupportsWebGL(Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))))

    const syncVisibility = () => {
      setIsPageVisible(document.visibilityState !== 'hidden')
    }

    setPerformanceTier(getPerformanceTier())
    syncVisibility()

    document.addEventListener('visibilitychange', syncVisibility)

    return () => {
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  const shouldRenderWebGL = supportsWebGL && isPageVisible && !reducedMotion

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {shouldRenderWebGL && (
        <div className="absolute inset-0 opacity-100">
          <Suspense fallback={null}>
            <MinimalWebGLLayer chapter={chapter} performanceTier={performanceTier} />
          </Suspense>
        </div>
      )}
      <ChapterAtmosphereLayer chapter={chapter} active />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
    </div>
  )
}
