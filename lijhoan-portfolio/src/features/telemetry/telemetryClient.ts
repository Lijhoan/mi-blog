import { useEffect, useRef } from 'react'
import { isDev } from '@/lib/utils.js'

export type TelemetryEventName =
  | 'chapter_activated'
  | 'chapter_dwell_recorded'
  | 'proof_interaction'
  | 'trust_interaction'
  | 'cta_interaction'
  | 'bi_activation_state'
  | 'bi_activation_attempt'

export type TelemetryPayload = Record<string, string | number | boolean | null | undefined>

export type TelemetryEvent = {
  id: string
  name: TelemetryEventName
  sessionId: string
  timestampIso: string
  path: string
  payload: TelemetryPayload
}

export interface TelemetryAdapter {
  persist: (event: TelemetryEvent) => void
  destroy?: () => void
}

type SessionWindow = Window & {
  __portfolioTelemetrySessionId?: string
}

const SESSION_ID_KEY = 'portfolio.telemetry.sessionId.v1'
const EVENT_BUFFER_KEY = 'portfolio.telemetry.buffer.v1'
const MAX_BUFFER_EVENTS = 300

const asSessionWindow = () => window as SessionWindow

const createEventId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `evt-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const createSessionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `sess-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const getSessionId = () => {
  if (typeof window === 'undefined') {
    return 'server-session'
  }

  const runtimeWindow = asSessionWindow()

  if (runtimeWindow.__portfolioTelemetrySessionId) {
    return runtimeWindow.__portfolioTelemetrySessionId
  }

  const fromStorage = window.sessionStorage.getItem(SESSION_ID_KEY)

  if (fromStorage) {
    runtimeWindow.__portfolioTelemetrySessionId = fromStorage
    return fromStorage
  }

  const nextSessionId = createSessionId()
  window.sessionStorage.setItem(SESSION_ID_KEY, nextSessionId)
  runtimeWindow.__portfolioTelemetrySessionId = nextSessionId

  return nextSessionId
}

const readBuffer = () => {
  if (typeof window === 'undefined') {
    return [] as TelemetryEvent[]
  }

  try {
    const raw = window.sessionStorage.getItem(EVENT_BUFFER_KEY)
    if (!raw) {
      return [] as TelemetryEvent[]
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return [] as TelemetryEvent[]
    }

    return parsed as TelemetryEvent[]
  } catch {
    return [] as TelemetryEvent[]
  }
}

const writeBuffer = (events: TelemetryEvent[]) => {
  if (typeof window === 'undefined') {
    return
  }

  window.sessionStorage.setItem(EVENT_BUFFER_KEY, JSON.stringify(events.slice(-MAX_BUFFER_EVENTS)))
}

class SessionStorageTelemetryAdapter implements TelemetryAdapter {
  persist(event: TelemetryEvent) {
    const current = readBuffer()
    current.push(event)
    writeBuffer(current)
  }
}

let activeAdapter: TelemetryAdapter = new SessionStorageTelemetryAdapter()

export const setTelemetryAdapter = (adapter: TelemetryAdapter) => {
  if (activeAdapter !== adapter && typeof activeAdapter.destroy === 'function') {
    activeAdapter.destroy()
  }

  activeAdapter = adapter
}

export const trackTelemetryEvent = (name: TelemetryEventName, payload: TelemetryPayload = {}) => {
  if (typeof window === 'undefined') {
    return
  }

  const event: TelemetryEvent = {
    id: createEventId(),
    name,
    sessionId: getSessionId(),
    timestampIso: new Date().toISOString(),
    path: window.location.pathname,
    payload,
  }

  activeAdapter.persist(event)

  if (isDev()) {
    // Dev-only visibility for contract validation before backend persistence is enabled.
    console.debug('[telemetry]', event)
  }
}

export const getSessionTelemetryBuffer = () => {
  return readBuffer()
}

export const useChapterTelemetry = (activeSectionId: string) => {
  const sectionRef = useRef({
    id: activeSectionId,
    startMs: performance.now(),
  })
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      trackTelemetryEvent('chapter_activated', {
        sectionId: activeSectionId,
        trigger: 'initial',
      })
      sectionRef.current = {
        id: activeSectionId,
        startMs: performance.now(),
      }
      return
    }

    if (sectionRef.current.id === activeSectionId) {
      return
    }

    const now = performance.now()
    const elapsedMs = Math.max(0, Math.round(now - sectionRef.current.startMs))

    trackTelemetryEvent('chapter_dwell_recorded', {
      sectionId: sectionRef.current.id,
      dwellMs: elapsedMs,
      reason: 'section-change',
    })

    trackTelemetryEvent('chapter_activated', {
      sectionId: activeSectionId,
      trigger: 'navigation',
    })

    sectionRef.current = {
      id: activeSectionId,
      startMs: now,
    }
  }, [activeSectionId])

  useEffect(() => {
    const flushCurrentDwell = (reason: string) => {
      const now = performance.now()
      const elapsedMs = Math.max(0, Math.round(now - sectionRef.current.startMs))

      trackTelemetryEvent('chapter_dwell_recorded', {
        sectionId: sectionRef.current.id,
        dwellMs: elapsedMs,
        reason,
      })

      sectionRef.current.startMs = now
    }

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        flushCurrentDwell('page-hidden')
      }
    }

    const onPageHide = () => {
      flushCurrentDwell('pagehide')
    }

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
      flushCurrentDwell('hook-cleanup')
    }
  }, [])
}
