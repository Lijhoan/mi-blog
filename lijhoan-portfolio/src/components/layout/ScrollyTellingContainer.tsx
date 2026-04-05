'use client'

import { Children, type ReactNode, useEffect, useId, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  clearImmersiveSignal,
  publishImmersiveSignal,
} from '@/features/motion/runtime/scrollRuntime.ts'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type ScrollyTellingContainerProps = {
  children: ReactNode
  className?: string
  runtimeSceneId?: string
}

/**
 * Pins a viewport stage and translates its track horizontally.
 * The component degrades to a stacked layout when motion is reduced or measurement fails.
 */
export default function ScrollyTellingContainer({ children, className, runtimeSceneId }: ScrollyTellingContainerProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const generatedSceneId = useId()
  const sceneId = runtimeSceneId ?? generatedSceneId
  const panelCount = Children.count(children)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isMotionActive, setIsMotionActive] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => {
      mediaQuery.removeEventListener('change', updatePreference)
    }
  }, [])

  useGSAP(
    () => {
      const root = rootRef.current
      const track = trackRef.current

      if (!root || !track || panelCount === 0 || prefersReducedMotion) {
        setIsMotionActive(false)
        clearImmersiveSignal(sceneId)
        return undefined
      }

      const getDistance = () => {
        const distance = track.scrollWidth - root.clientWidth
        return Number.isFinite(distance) && distance > 0 ? distance : 0
      }

      const initialDistance = getDistance()

      if (initialDistance === 0) {
        setIsMotionActive(false)
        clearImmersiveSignal(sceneId)
        return undefined
      }

      setIsMotionActive(true)

      let refreshFrame = 0

      const scheduleRefresh = () => {
        if (refreshFrame !== 0) {
          window.cancelAnimationFrame(refreshFrame)
        }

        refreshFrame = window.requestAnimationFrame(() => {
          ScrollTrigger.refresh()
          refreshFrame = 0
        })
      }

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            publishImmersiveSignal({
              sceneId,
              immersiveProgress: self.progress,
              panelCount,
            })
          },
          onRefresh: (self) => {
            if (getDistance() === 0) {
              self.kill()
              setIsMotionActive(false)
              clearImmersiveSignal(sceneId)
              return
            }

            setIsMotionActive(true)
            publishImmersiveSignal({
              sceneId,
              immersiveProgress: self.progress,
              panelCount,
            })
          },
        },
      })

      const cleanupTasks: Array<() => void> = []
      const browserWindow: Window = window

      if ('ResizeObserver' in window) {
        const resizeObserver = new ResizeObserver(() => {
          if (getDistance() === 0) {
            tween.scrollTrigger?.kill()
            tween.kill()
            setIsMotionActive(false)
            clearImmersiveSignal(sceneId)
            return
          }

          scheduleRefresh()
        })

        resizeObserver.observe(root)
        resizeObserver.observe(track)
        cleanupTasks.push(() => resizeObserver.disconnect())
      } else {
        const onResize = () => {
          if (getDistance() === 0) {
            tween.scrollTrigger?.kill()
            tween.kill()
            setIsMotionActive(false)
            clearImmersiveSignal(sceneId)
            return
          }

          scheduleRefresh()
        }

        browserWindow.addEventListener('resize', onResize)
        cleanupTasks.push(() => browserWindow.removeEventListener('resize', onResize))
      }

      scheduleRefresh()

      return () => {
        cleanupTasks.forEach((cleanupTask) => cleanupTask())

        if (refreshFrame !== 0) {
          window.cancelAnimationFrame(refreshFrame)
        }

        tween.scrollTrigger?.kill()
        tween.kill()
        clearImmersiveSignal(sceneId)
      }
    },
    {
      scope: rootRef,
      dependencies: [panelCount, prefersReducedMotion, sceneId],
      revertOnUpdate: true,
    },
  )

  const outerClassName = [
    'relative isolate min-h-[100svh] rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/20',
    isMotionActive ? 'overflow-hidden' : 'overflow-visible',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const trackClassName = [
    'flex min-h-[100svh] gap-6 px-6 py-8 md:px-8 lg:px-12',
    isMotionActive ? 'w-max items-stretch' : 'w-full flex-col items-center',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section ref={rootRef} className={outerClassName}>
      <div className={isMotionActive ? 'flex min-h-[100svh] items-center overflow-hidden' : 'flex min-h-[100svh] items-start overflow-visible'}>
        <div
          ref={trackRef}
          className={trackClassName}
          style={isMotionActive ? { willChange: 'transform' } : undefined}
        >
          {children}
          {!isMotionActive && (
            <p className="w-[88vw] max-w-[1100px] rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-gray-300">
              Motion deshabilitado por preferencia de accesibilidad o medición insuficiente. El contenido se mantiene visible en flujo vertical.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}