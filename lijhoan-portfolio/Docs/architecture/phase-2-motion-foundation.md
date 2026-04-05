# Phase 2 Motion Foundation

## Status

This document freezes the motion shell implemented for the legacy Vite workspace so it can be migrated to Next.js 15 App Router without changing the core motion contract.

## What Is Already Solved

- Smooth scroll is centralized in `SmoothScrollProvider`.
- Horizontal scrollytelling is isolated in `ScrollyTellingContainer`.
- The projects scene is separated from motion infrastructure.
- TypeScript strict mode is available for the new motion layer.
- The current implementation builds successfully in the Vite workspace.

## Architectural Decisions

- Lenis is used as the smooth-scroll engine and is synchronized with GSAP ticker.
- Motion is disabled when the user prefers reduced motion.
- The horizontal stage falls back to a stacked layout when measurement is invalid or motion is unavailable.
- The motion shell is route-scoped in the current Vite app and is designed to move to a route layout in Next App Router later.

## Stable Contracts

### SmoothScrollProvider

- Owns the Lenis lifecycle.
- Keeps GSAP and scroll on the same clock.
- Does not know about sections, panels, or business content.
- Must clean up Lenis, ticker bindings, and media-query listeners on unmount.

### ScrollyTellingContainer

- Owns pinning, scrub, and horizontal translation.
- Receives only content via `children`.
- Assumes the child track can be measured with `scrollWidth`.
- Must degrade when reduced motion is enabled or when width measurement fails.

### Feature Sections

- Own content and layout for a specific route section.
- Compose motion infrastructure but do not implement scroll runtime.
- Can be migrated into Next route components without changing the motion shell.

## Current Limits in Vite Legacy

- The motion shell is mounted from a client entry point rather than a route layout boundary.
- Server Components are not available in this workspace.
- Scroll runtime is route-scoped by convention, not by App Router nesting.

## Migration Rules

- Do not change the public props of `SmoothScrollProvider` or `ScrollyTellingContainer` unless the Next migration requires an additive change.
- Keep the container API focused on `children` and optional class overrides.
- Keep business content outside motion infrastructure.
- Preserve Lenis + GSAP ticker synchronization.
- Preserve reduced-motion fallback behavior.

## Validation Baseline

- `pnpm typecheck`
- `pnpm build`