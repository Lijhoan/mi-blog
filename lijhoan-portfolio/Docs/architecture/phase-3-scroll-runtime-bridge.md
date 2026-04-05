# Phase 3 Scroll Runtime Bridge

## Problem This Layer Solves

Phase 2 already established a stable motion shell (Lenis runtime + horizontal ScrollTrigger shell). The next step required a single, normalized source of scroll signals that can be consumed by DOM animation, future R3F scenes, telemetry, and section activation logic without coupling those consumers to Lenis or GSAP internals.

## Architectural Decisions

- A lightweight external runtime store is used instead of React context or Zustand.
- The runtime exposes a snapshot/subscription API and controlled publishers.
- Motion infrastructure components publish signals; they do not read business state.
- Consumers can subscribe directly (non-React) or via selector hook (React).
- Updates are batched by `requestAnimationFrame` and filtered with epsilon checks to avoid noisy updates and unnecessary re-renders.

## Public API

File: `src/features/motion/runtime/scrollRuntime.ts`

- `getScrollRuntimeSnapshot()`
  Returns the latest normalized runtime snapshot.

- `subscribeToScrollRuntime(listener)`
  Subscribes a listener and returns an unsubscribe callback.

- `publishScrollEngineSignal({ globalProgress, rawVelocity, direction })`
  Publishes global engine-level values (Lenis/native scroll side).

- `publishReducedMotionSignal(reducedMotion)`
  Publishes accessibility preference state.

- `publishImmersiveSignal({ sceneId, immersiveProgress, panelCount })`
  Publishes immersive scene progress and derives active panel index.

- `clearImmersiveSignal(sceneId?)`
  Clears immersive scene ownership/signals.

- `useScrollRuntimeSelector(selector, isEqual?)`
  Selector hook for React consumers with controlled re-render behavior.

## Responsibilities By File

- `src/components/layout/SmoothScrollProvider.tsx`
  Owns Lenis lifecycle and publishes global scroll/reduced-motion signals.

- `src/components/layout/ScrollyTellingContainer.tsx`
  Owns horizontal scene progress and publishes immersive signals.

- `src/features/motion/runtime/scrollRuntime.ts`
  Owns normalized signal state, subscriptions, and update batching.

- `src/features/motion/debug/ScrollRuntimeHud.tsx`
  Optional technical consumer for verification in development.

- `src/features/scrollytelling/ProjectsScrollytellingSection.tsx`
  Domain content only; composes infra and debug consumer without runtime internals.

## Runtime Snapshot Contract

```text
{
  timestamp: number,
  reducedMotion: boolean,
  globalProgress: number,      // 0..1
  immersiveProgress: number,   // 0..1 for active immersive scene
  rawVelocity: number,
  velocity: number,            // smoothed velocity
  direction: 'up' | 'down' | 'idle',
  activeSceneId: string | null,
  activePanelIndex: number,    // -1 when not available
  panelCount: number
}
```

## How R3F Will Consume This Later

- R3F systems can subscribe directly through `subscribeToScrollRuntime` in render loops or bridge hooks.
- R3F does not need direct imports from Lenis or ScrollTrigger.
- Scene-level effects can react to `immersiveProgress`, `velocity`, `direction`, and `activePanelIndex` as stable inputs.

## What This Layer Must Not Do

- It must not own business state, route state, or visual composition.
- It must not introduce animation side effects by itself.
- It must not replace the responsibilities of `SmoothScrollProvider` or `ScrollyTellingContainer`.
- It must not force global re-renders in React trees.

## Current Legacy Constraints

- This workspace is still Vite + client root, so App Router boundaries are simulated by composition.
- Runtime contract is intentionally framework-agnostic to be moved unchanged into Next route boundaries later.

## Validation Baseline

- `pnpm typecheck`
- `pnpm build`