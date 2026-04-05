# Chapter Mood Token System

## Purpose

Create a reusable visual language pack that preserves global coherence while giving each narrative chapter a controlled signature.

## Core Principles

- Global grammar first, chapter personality second.
- Variety through calibrated tokens, not ad-hoc styles.
- Content legibility over visual novelty.
- Runtime-driven behavior remains the single source for motion signals.

## Token Surface

Each chapter token defines:

- Typography emphasis
- Caption style
- Spacing rhythm
- Panel density
- Atmosphere intensity
- Accent density
- Frame visibility
- Contrast behavior
- Motion intensity
- Calm-versus-expressive balance

## Chapters

### Identity

- Balanced intensity
- Cool analytical tone
- Clear editorial framing
- High credibility and positioning focus

### Proof

- Most expressive chapter
- Higher accent density
- Stronger atmosphere and panel emphasis
- Designed to support capability evidence

### Trust

- Quiet and stable chapter
- Lower motion drift
- Conservative contrast rhythm
- Designed for authority and reliability

### CTA

- Quiet, warm close
- Controlled visual calm
- Conversion-oriented framing
- Low-noise ending signature

## Implementation Contract

- Token map: `src/features/experience/chapterMoodTokens.ts`
- Registry: `src/features/experience/sceneRegistry.ts`
- Shell application: `src/features/experience/SceneShell.tsx`
- Atmosphere application: `src/features/experience/ChapterAtmosphereLayer.tsx`
- Overlay panel signatures: chapter overlays via `chapterPanelClassesById`

## What Stays Constant

- Chapter shell structure
- Runtime signal source
- Overlay architecture
- Core spacing and panel anatomy

## What Changes Per Chapter

- Atmosphere opacity and drift intensity
- Caption tone and tracking
- Panel contrast profile
- Accent and expressiveness balance

## Anti-Drift Rules

- Do not hardcode chapter colors or panel styles inside section components.
- Do not introduce chapter-specific animations outside token-governed components.
- Do not bypass token maps for quick visual tweaks.
- If a chapter needs a new behavior, extend the token shape first.

## Scale Rules For Future Scenes / WebGL

- Future WebGL scenes must consume chapter mood tokens instead of redefining mood constants.
- WebGL can extend atmosphere rendering, but chapter rhythm and tone must stay token-driven.
- Scene identity should remain chapter-registry-based to avoid divergence.

## What Not To Do

- Do not turn chapter identity into unrelated visual themes.
- Do not increase expressiveness in every chapter.
- Do not trade readability for uniqueness.
- Do not create per-component chapter variants without token governance.
