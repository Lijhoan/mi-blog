# Scene System v2

## Purpose

Evolve the premium scene seed into a multi-chapter narrative system with shared atmosphere and controlled overlays, without breaking the frozen motion foundation.

## Architecture

### Core Layers

- `SceneContinuityLayer`
  - Fixed global atmospheric layer.
  - Sits behind the whole app.
  - Consumes scroll runtime and current chapter tone.

- `ChapterOverlay`
  - Reusable chapter overlay contract.
  - Combines chapter atmosphere and frame shell.
  - Accepts chapter config and optional foreground content.

- `SceneShell`
  - Presentational shell for premium chapter framing.
  - Shows chapter header and summary.
  - Owns no scroll logic.

- `sceneRegistry`
  - Explicit map of chapter metadata.
  - Maps `sectionId` to `chapterId` and narrative role.

### Chapter Map

- `identity` -> `home`
- `proof` -> `projects`
- `trust` -> `experience`
- `cta` -> `contact`

## Chapter Choreography

### Entry

- Identity enters first and stays calm.
- Proof appears when the user reaches projects and sharpens focus.
- Trust appears in experience and becomes more stable, less kinetic.
- CTA closes the journey with warmth and lower density.

### Exit

- Each chapter should fade or soften rather than abruptly disappear.
- Scene atmosphere should decay before attention fully leaves the section.
- Motion should recede as the user moves toward utility sections.

### Attention Redistribution

- Text leads in identity and trust.
- Scene atmosphere leads slightly more in proof.
- The visual layer should never outrun the reading path.

### Fatigue Control

- Only one chapter frame should feel dominant at a time.
- Background motion must remain slower than foreground attention.
- Reduced motion should collapse the experience into static premium layout, not a broken mode.

## Continuity Rules

- The global atmosphere layer is always present but always subtle.
- Chapter overlays should share the same grammar: frame, atmosphere, and compact evidence block.
- Color tone can shift per chapter, but grid logic and density stay consistent.
- No chapter should introduce a new motion language unless the system can support it everywhere.

## Public Contract

### `sceneRegistry`

- Source of chapter metadata and section mapping.
- Used for activation, tones, and narrative labels.

### `SceneContinuityLayer`

- Fixed global layer.
- Accepts the active chapter.
- Must remain lightweight and reduced-motion-safe.

### `ChapterOverlay`

- Reusable overlay contract.
- Combines atmosphere and chapter frame.
- Can host small supporting content blocks.

### `SceneShell`

- Chapter frame and narrative header.
- Does not own scroll measurement.
- Can be reused by future scenes, including WebGL-backed ones.

## Future WebGL Integration

A future WebGL scene should be introduced as a sibling to `SceneContinuityLayer` or as a child inside `ChapterOverlay`, not as a replacement for them. That preserves the contract:

- runtime signals remain the same,
- chapter registry remains the same,
- chapter overlays remain the same,
- WebGL becomes an interchangeable atmosphere or chapter layer.

## Performance Constraints

- Prefer CSS transforms, opacity, and simple gradients.
- Avoid fixed-position canvases unless a chapter truly justifies them.
- Keep DOM reads out of frame loops.
- Ensure reduced-motion mode removes kinetic emphasis without breaking hierarchy.
