'use client'

import { useEffect, type ReactNode } from 'react'
import { gsap } from 'gsap'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  publishReducedMotionSignal,
  publishScrollEngineSignal,
} from '@/features/motion/runtime/scrollRuntime.ts'

type SmoothScrollProviderProps = {
  children: ReactNode
}

/**
 * Provides the scroll-motion runtime for immersive routes.
 * It owns the Lenis lifecycle and keeps GSAP/ScrollTrigger on a single clock.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let lenis: Lenis | null = null
    let removeNativeScrollListener: (() => void) | null = null

    const getNativeScrollProgress = () => {
      const root = document.documentElement
      const limit = Math.max(0, root.scrollHeight - window.innerHeight)

      if (limit <= 0) {
        return 0
      }

      return Math.min(1, Math.max(0, window.scrollY / limit))
    }

    const onScroll = (lenisInstance: Lenis) => {
      ScrollTrigger.update()
      publishScrollEngineSignal({
        globalProgress: lenisInstance.progress,
        rawVelocity: lenisInstance.velocity,
        direction: lenisInstance.direction > 0 ? 'up' : lenisInstance.direction < 0 ? 'down' : 'idle',
      })
    }

    const onTicker = (time: number) => {
      lenis?.raf(time * 1000)
    }

    const setupNativeScrollListener = () => {
      if (removeNativeScrollListener) {
        return
      }

      const onNativeScroll = () => {
        publishScrollEngineSignal({
          globalProgress: getNativeScrollProgress(),
          rawVelocity: 0,
          direction: 'idle',
        })
      }

      window.addEventListener('scroll', onNativeScroll, { passive: true })
      onNativeScroll()

      removeNativeScrollListener = () => {
        window.removeEventListener('scroll', onNativeScroll)
        removeNativeScrollListener = null
      }
    }

    const teardownNativeScrollListener = () => {
      removeNativeScrollListener?.()
    }

    const teardownLenis = () => {
      if (!lenis) {
        return
      }

      lenis.off('scroll', onScroll)
      gsap.ticker.remove(onTicker)
      lenis.destroy()
      lenis = null

      publishScrollEngineSignal({
        globalProgress: getNativeScrollProgress(),
        rawVelocity: 0,
        direction: 'idle',
      })
    }

    const setupLenis = () => {
      if (lenis || reducedMotionQuery.matches) {
        return
      }

      teardownNativeScrollListener()

      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
      })

      lenis.on('scroll', onScroll)
      gsap.ticker.add(onTicker)
      gsap.ticker.lagSmoothing(0)
      onScroll(lenis)

      window.requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }

    const syncLenisToPreference = () => {
      publishReducedMotionSignal(reducedMotionQuery.matches)

      if (reducedMotionQuery.matches) {
        teardownLenis()
        setupNativeScrollListener()
        return
      }

      setupLenis()
    }

    syncLenisToPreference()
    reducedMotionQuery.addEventListener('change', syncLenisToPreference)

    return () => {
      reducedMotionQuery.removeEventListener('change', syncLenisToPreference)
      teardownNativeScrollListener()
      teardownLenis()
    }
  }, [])

  return children
}