import { useEffect, useRef, useState } from 'react'

export type ScrollDirection = 'up' | 'down' | 'idle'

export type ScrollRuntimeSnapshot = {
  timestamp: number
  reducedMotion: boolean
  globalProgress: number
  immersiveProgress: number
  rawVelocity: number
  velocity: number
  direction: ScrollDirection
  activeSceneId: string | null
  activePanelIndex: number
  panelCount: number
}

type ScrollEngineSignal = {
  globalProgress: number
  rawVelocity: number
  direction: ScrollDirection
}

type ImmersiveSignal = {
  sceneId: string
  immersiveProgress: number
  panelCount: number
}

type Listener = () => void

const INITIAL_SNAPSHOT: ScrollRuntimeSnapshot = {
  timestamp: 0,
  reducedMotion: false,
  globalProgress: 0,
  immersiveProgress: 0,
  rawVelocity: 0,
  velocity: 0,
  direction: 'idle',
  activeSceneId: null,
  activePanelIndex: -1,
  panelCount: 0,
}

const VELOCITY_SMOOTHING = 0.18
const NUMERIC_EPSILON = 0.0005

let snapshot: ScrollRuntimeSnapshot = INITIAL_SNAPSHOT
let pendingPatch: Partial<ScrollRuntimeSnapshot> = {}
let rafId = 0

const listeners = new Set<Listener>()

const clamp01 = (value: number) => {
  if (!Number.isFinite(value)) {
    return 0
  }

  return Math.min(1, Math.max(0, value))
}

const hasMeaningfulChange = (next: ScrollRuntimeSnapshot) => {
  if (snapshot.activeSceneId !== next.activeSceneId) return true
  if (snapshot.activePanelIndex !== next.activePanelIndex) return true
  if (snapshot.panelCount !== next.panelCount) return true
  if (snapshot.reducedMotion !== next.reducedMotion) return true
  if (snapshot.direction !== next.direction) return true
  if (Math.abs(snapshot.globalProgress - next.globalProgress) > NUMERIC_EPSILON) return true
  if (Math.abs(snapshot.immersiveProgress - next.immersiveProgress) > NUMERIC_EPSILON) return true
  if (Math.abs(snapshot.rawVelocity - next.rawVelocity) > NUMERIC_EPSILON) return true
  if (Math.abs(snapshot.velocity - next.velocity) > NUMERIC_EPSILON) return true

  return false
}

const notify = () => {
  listeners.forEach((listener) => listener())
}

const commitPendingPatch = () => {
  rafId = 0

  if (Object.keys(pendingPatch).length === 0) {
    return
  }

  const next: ScrollRuntimeSnapshot = {
    ...snapshot,
    ...pendingPatch,
    timestamp: performance.now(),
  }

  pendingPatch = {}

  if (!hasMeaningfulChange(next)) {
    return
  }

  snapshot = next
  notify()
}

const scheduleCommit = () => {
  if (rafId !== 0) {
    return
  }

  rafId = window.requestAnimationFrame(commitPendingPatch)
}

const setPatch = (patch: Partial<ScrollRuntimeSnapshot>) => {
  pendingPatch = {
    ...pendingPatch,
    ...patch,
  }

  scheduleCommit()
}

const getActivePanelIndex = (immersiveProgress: number, panelCount: number) => {
  if (panelCount <= 0) {
    return -1
  }

  if (panelCount === 1) {
    return 0
  }

  const scaledProgress = clamp01(immersiveProgress) * panelCount
  const index = Math.min(panelCount - 1, Math.floor(scaledProgress))

  return Number.isFinite(index) ? index : -1
}

const smoothVelocity = (rawVelocity: number) => {
  return snapshot.velocity + (rawVelocity - snapshot.velocity) * VELOCITY_SMOOTHING
}

export const getScrollRuntimeSnapshot = () => snapshot

export const subscribeToScrollRuntime = (listener: Listener) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export const publishScrollEngineSignal = ({ globalProgress, rawVelocity, direction }: ScrollEngineSignal) => {
  const clampedGlobalProgress = clamp01(globalProgress)
  const normalizedDirection: ScrollDirection = direction === 'up' || direction === 'down' ? direction : 'idle'

  setPatch({
    globalProgress: clampedGlobalProgress,
    rawVelocity,
    velocity: smoothVelocity(rawVelocity),
    direction: normalizedDirection,
  })
}

export const publishReducedMotionSignal = (reducedMotion: boolean) => {
  setPatch({
    reducedMotion,
    direction: reducedMotion ? 'idle' : snapshot.direction,
    rawVelocity: reducedMotion ? 0 : snapshot.rawVelocity,
    velocity: reducedMotion ? 0 : snapshot.velocity,
  })
}

export const publishImmersiveSignal = ({ sceneId, immersiveProgress, panelCount }: ImmersiveSignal) => {
  const clampedProgress = clamp01(immersiveProgress)
  const normalizedPanelCount = Number.isFinite(panelCount) ? Math.max(0, Math.floor(panelCount)) : 0

  setPatch({
    activeSceneId: sceneId,
    immersiveProgress: clampedProgress,
    panelCount: normalizedPanelCount,
    activePanelIndex: getActivePanelIndex(clampedProgress, normalizedPanelCount),
  })
}

export const clearImmersiveSignal = (sceneId?: string) => {
  if (sceneId && snapshot.activeSceneId && snapshot.activeSceneId !== sceneId) {
    return
  }

  setPatch({
    activeSceneId: null,
    immersiveProgress: 0,
    panelCount: 0,
    activePanelIndex: -1,
  })
}

/**
 * Selector-friendly hook that avoids unnecessary re-renders by updating only
 * when the selected slice effectively changes.
 */
export const useScrollRuntimeSelector = <T,>(
  selector: (value: ScrollRuntimeSnapshot) => T,
  isEqual: (previous: T, next: T) => boolean = Object.is,
) => {
  const [selected, setSelected] = useState<T>(() => selector(getScrollRuntimeSnapshot()))
  const selectedRef = useRef(selected)

  useEffect(() => {
    selectedRef.current = selected
  }, [selected])

  useEffect(() => {
    const unsubscribe = subscribeToScrollRuntime(() => {
      const nextSelected = selector(getScrollRuntimeSnapshot())

      if (isEqual(selectedRef.current, nextSelected)) {
        return
      }

      selectedRef.current = nextSelected
      setSelected(nextSelected)
    })

    return unsubscribe
  }, [selector, isEqual])

  return selected
}