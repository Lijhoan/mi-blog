# WebGL Hardening and Signature Sync

## Audit Findings

The first WebGL seed is structurally correct:
- It is lazy-loaded from the continuity layer.
- It is gated by reduced motion.
- It is background-only and pointer-transparent.
- It already consumes the scroll runtime instead of coupling to GSAP or Lenis directly.

What needed hardening:
- The canvas was still running at a constant always-on cost when visible, even though the visual language is intentionally minimal.
- The original particle budget was higher than necessary for a background atmosphere layer.
- DOM/CSS atmosphere and WebGL were visually close, but not yet synchronized enough to read as one editorial system.
- The implementation needed an explicit production safety path for page visibility and low-capability hardware.

## Performance Budget Decisions

The budget for this phase is conservative by design:
- Keep the layer background-only.
- Avoid new shaders.
- Avoid interaction handling.
- Keep the WebGL layer fully removable without changing the scene architecture.
- Prefer fewer objects, lower DPR, and less motion over extra richness.

Concrete decisions:
- Add a visibility gate in the continuity layer so the WebGL canvas unmounts when the page is hidden.
- Add a runtime performance tier so low-capability devices can run a smaller version of the same seed.
- Reduce particle counts and halo density in the seed.
- Lower DPR defaults for balanced and constrained devices.
- Keep `frameloop="always"` only while the canvas is mounted and visible; otherwise unmount the layer entirely.
- Keep browserslist cleanup as maintenance, not as sprint scope.

## Shared Visual Signature Rules

The DOM atmosphere and WebGL seed should feel like one system.

Shared traits:
- Cool, editorial tonal range with restrained blue/cyan emphasis.
- Soft depth instead of bright contrast spikes.
- Slow drift instead of obvious motion.
- Low opacity layering instead of strong bloom.
- Stable framing that supports reading, not a stage effect that competes with content.

Current alignment rules:
- `ChapterAtmosphereLayer` carries the broad atmosphere, grid cadence, and frame lines.
- `MinimalWebGLLayer` mirrors the same tone with particles, halos, and chapter-specific drift.
- Chapter tuning should only change proportion, not introduce a new motion language.
- Proof can feel slightly more energetic, but still within the same grammar.
- Trust must feel calmer and more precise.
- CTA should soften and close, not spike.

## Chapter-Aware Tuning Summary

Identity:
- Calmest entry point.
- Slightly denser than trust, but still restrained.
- Used to establish editorial confidence without spectacle.

Proof:
- Highest visual energy of the set.
- Still limited to density and rhythm, not effect count.
- Slightly stronger contrast so projects feel like the active proof chapter.

Trust:
- Lowest kinetic expression.
- Reduced density and lower visual pressure.
- Reinforces credibility and reading stability.

CTA:
- Warmest tone.
- Lowest density and smallest movement.
- Closes the experience cleanly instead of competing with the contact action.

## Production Safety

The layer now follows these safety rules:
- Reduced motion disables the WebGL layer entirely.
- No WebGL support means no canvas mount.
- Hidden page state disables the WebGL layer.
- Low-capability hardware gets a reduced performance tier.
- Pointer events remain disabled.
- The canvas remains purely decorative.
- The architecture stays portable to Next.js 15 App Router because the runtime bridge and chapter registry remain the source of truth.

## Limits Of This Layer

This phase is intentionally not allowed to:
- Add shader complexity for its own sake.
- Add user interaction to the canvas.
- Add a second visual system that competes with the DOM atmosphere.
- Increase draw calls unless a clear performance tradeoff is justified.
- Replace the chapter system or the runtime bridge.

## What Not To Do Next

Do not:
- Turn the seed into a generalized 3D scene.
- Add post-processing before the current atmosphere is proven stable.
- Add hover or pointer-driven camera logic.
- Add animated UI elements inside the canvas.
- Rebuild the content shell around the graphics layer.
- Increase density without measuring frame cost.

## Files In Scope
- [src/features/graphics/MinimalWebGLLayer.tsx](../../src/features/graphics/MinimalWebGLLayer.tsx)
- [src/features/experience/SceneContinuityLayer.tsx](../../src/features/experience/SceneContinuityLayer.tsx)
- [src/features/experience/ChapterAtmosphereLayer.tsx](../../src/features/experience/ChapterAtmosphereLayer.tsx)
- [src/features/experience/chapterMoodTokens.ts](../../src/features/experience/chapterMoodTokens.ts)
- [src/features/motion/runtime/scrollRuntime.ts](../../src/features/motion/runtime/scrollRuntime.ts)
- [Docs/experience/minimal-webgl-layer.md](minimal-webgl-layer.md)

## Maintenance Note

The build still includes a browserslist freshness warning. It is documented housekeeping only and should be handled separately from the WebGL hardening sprint.