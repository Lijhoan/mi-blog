'use client'

import { useMemo } from 'react'
import { useScrollRuntimeSelector } from '@/features/motion/runtime/scrollRuntime.ts'

type ScrollRuntimeHudProps = {
  enabled?: boolean
}

const formatValue = (value: number) => value.toFixed(3)

/**
 * Lightweight technical HUD for runtime verification.
 * It is intended for development diagnostics and can be removed without affecting behavior.
 */
export default function ScrollRuntimeHud({ enabled = false }: ScrollRuntimeHudProps) {
  const snapshot = useScrollRuntimeSelector(
    (runtime) => ({
      globalProgress: runtime.globalProgress,
      immersiveProgress: runtime.immersiveProgress,
      velocity: runtime.velocity,
      direction: runtime.direction,
      reducedMotion: runtime.reducedMotion,
      activeSceneId: runtime.activeSceneId,
      activePanelIndex: runtime.activePanelIndex,
      panelCount: runtime.panelCount,
    }),
    (previous, next) =>
      previous.globalProgress === next.globalProgress &&
      previous.immersiveProgress === next.immersiveProgress &&
      previous.velocity === next.velocity &&
      previous.direction === next.direction &&
      previous.reducedMotion === next.reducedMotion &&
      previous.activeSceneId === next.activeSceneId &&
      previous.activePanelIndex === next.activePanelIndex &&
      previous.panelCount === next.panelCount,
  )

  const rows = useMemo(
    () => [
      ['global', formatValue(snapshot.globalProgress)],
      ['immersive', formatValue(snapshot.immersiveProgress)],
      ['velocity', formatValue(snapshot.velocity)],
      ['direction', snapshot.direction],
      ['reduced', snapshot.reducedMotion ? 'yes' : 'no'],
      ['scene', snapshot.activeSceneId ?? 'none'],
      ['panel', snapshot.activePanelIndex >= 0 ? `${snapshot.activePanelIndex + 1}/${snapshot.panelCount}` : 'none'],
    ],
    [snapshot],
  )

  if (!enabled) {
    return null
  }

  return (
    <aside className="pointer-events-none fixed bottom-4 right-4 z-[80] w-52 rounded-xl border border-cyan-400/30 bg-black/70 p-3 font-mono text-[11px] text-cyan-100 backdrop-blur-md">
      <div className="mb-2 text-cyan-300">Scroll Runtime</div>
      <dl className="space-y-1">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <dt className="text-cyan-200/80">{label}</dt>
            <dd className="text-right text-white">{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}