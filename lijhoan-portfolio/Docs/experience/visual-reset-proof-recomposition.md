# Visual Reset + Proof Recomposition

## Executive Summary

This pass resets the portfolio visual direction from inherited card/template patterns toward an authored editorial system.

Primary outcomes:

- Background atmosphere is now quieter and chapter-modulated, no longer a dominant repeating signature.
- Hero and About were recomposed to remove inherited app-card/gimmick patterns.
- Proof chapter was rebuilt around explicit hierarchy: short intro, flagship dominance, supporting cases after.
- Navigation rail was softened into silent wayfinding.
- Contact now closes as an editorial final chapter instead of an administrative utility block.

The architectural spine remains intact:

- motion foundation
- scroll runtime bridge
- scene system
- trust layer
- minimal WebGL layer
- backend spine seed

## Full Visual Audit

### 1) Background / Atmosphere

- Keep: chapter-aware atmosphere layer, runtime-driven drift, WebGL continuity gate.
- Refine: opacity, drift, grid cadence, frame-line weight, chapter-specific composition.
- Replace: single dominant repeated background feel.
- Remove: high-contrast repetitive texture as persistent visual signature.

Status after pass: reset completed through token tuning + chapter recipes.

### 2) Hero / Identity Composition

- Keep: identity chapter framing, core headline and proof metrics.
- Refine: typographic hierarchy, spacing rhythm, CTA language.
- Replace: inherited social/app profile card composition.
- Remove: template-like card framing as hero protagonist.

Status after pass: recomposed to editorial split layout with restrained portrait-as-asset, typography first.

### 3) About Composition

- Keep: core narrative and operating model content.
- Refine: readability, metric treatment, supporting structure.
- Replace: old dual-column layout with decorative hanging object.
- Remove: lanyard gimmick from this chapter.

Status after pass: corrected into narrative + operating pillars composition.

### 4) Proof / Projects Composition (priority)

- Keep: scrollytelling runtime shell, flagship evidence model, BI contract honesty.
- Refine: pace, widths, panel density, reading hierarchy.
- Replace: oversized intro and competing container density.
- Remove: useless whitespace and equal-weight panel competition.

Status after pass:

- Intro reduced and reframed as context card.
- Flagship widened and elevated as primary reading surface.
- Supporting cases narrowed and sequenced after flagship.
- Flagship story panel count reduced on-screen to avoid visual contention.

### 5) Trust Section

- Keep: trust architecture, verification behavior, archive-on-demand flow.
- Refine: visual calm and chapter contrast separation.
- Replace: none in this pass.
- Remove: none in this pass.

Status after pass: chapter-level differentiation improved via atmosphere and mood tuning.

### 6) Contact Section

- Keep: CTA chapter behavior and telemetry interactions.
- Refine: composition and close-chapter intent.
- Replace: utility card stack framing.
- Remove: administrative/form-like visual cues.

Status after pass: editorial closing with direct channels + concise focus signals.

### 7) Navigation Rail

- Keep: chapter wayfinding and progress semantics.
- Refine: scale, contrast, copy density, background weight.
- Replace: heavy app-like rail visual prominence.
- Remove: unnecessary visual dominance.

Status after pass: softer, quieter, active-state-first emphasis.

### 8) Cards, Frames, Overlays, Badges

- Keep: only those that encode hierarchy or evidence.
- Refine: reduce border noise and repeated chroming.
- Replace: utility-like card repetition where hierarchy is unclear.
- Remove: badges/frames without semantic value.

## Background / Atmosphere Reset Decision

Decision:

- Preserve the existing atmosphere architecture and runtime contract.
- Introduce chapter recipes to vary spot composition and line placement by chapter.
- Lower global opacity, drift pulse, and grid prominence.
- Keep WebGL as subtle continuity, not a competing visual actor.

Applied principles:

- atmospheric support, not decorative fill
- chapter modulation over global repetition
- restrained contrast and controlled motion

## Hero Recomposition Decision

Decision:

- Replace inherited profile-card-led composition.
- Shift to typography-first authority block with restrained portrait support.
- Keep proof-oriented CTA and metrics, remove mock/app framing language.

Rationale:

- Identity chapter should communicate authorship and authority, not component-library familiarity.

## About Chapter Correction

Decision:

- Remove hanging lanyard visual from the About chapter.
- Rebuild the chapter as narrative + operating pillars.
- Preserve metrics as evidence, but restyle for calmer hierarchy.

Rationale:

- The hanging artifact read as gimmick and interrupted editorial tone.

## Proof Chapter Recomposition

Decision:

- Keep scrollytelling infrastructure and flagship content contract.
- Recompose chapter hierarchy:
  - short context intro
  - flagship as dominant panel
  - supporting cases as secondary narrower sequence
- Reduce on-screen competition by limiting simultaneous flagship sub-panels.

Rationale:

- Proof chapter must read as unequivocal evidence narrative, not as a panel collage.

## Navigation Softening Rules

- Rail is guidance, not hero UI.
- Default state low contrast.
- Active state gets the only strong emphasis.
- Labels remain available but secondary.
- Progress remains legible with less chrome.

## Contact Section Polish Rules

- Close chapter should feel intentional and premium.
- Use concise channel list with strong affordance.
- Avoid stacked utility/service boxes that feel administrative.
- Keep conversion direction explicit but visually calm.

## Media / Asset Rules

### Remove

- Decorative assets that do not add evidence or editorial meaning.
- Gimmick visuals that break chapter tone.

### Keep

- Assets with real proof value:
  - project evidence images
  - certification evidence images
  - portrait only when used as editorial support, not as template frame.

### Rework or Reinterpret

- Any inherited component-style framing around real assets.
- Any repeated visual treatment that creates dashboard/template perception.

### Use image vs diagram vs typography

- Use image when there is direct proof or identity value.
- Use diagram only when it clarifies architecture/flow better than text.
- Use typography-first composition when clarity, authority, and pacing are the priority.

## Anti-Patterns to Avoid

- Reintroducing dominant repeated background textures.
- Hero centered on social/app card mock framing.
- Decorative gimmicks in About chapter.
- Proof chapter with equal-weight competing containers.
- Navigation rail as visual protagonist.
- Contact treated like admin panel cards.
- Placeholder badges/frames with no semantic role.

## Modified Files (this pass)

- `src/features/experience/chapterMoodTokens.ts`
- `src/features/experience/ChapterAtmosphereLayer.tsx`
- `src/features/navigation/NavigationShell.jsx`
- `src/App.jsx`
- `src/features/scrollytelling/ProjectsScrollytellingSection.tsx`
- `src/features/proof/FlagshipProofPanel.tsx`
- `Docs/experience/visual-reset-proof-recomposition.md`

## Residual Risks

- Skills chapter still carries utility-card language and may need a dedicated editorial pass.
- Trust chapter keeps legacy card framing; atmosphere is improved but internal composition could be further refined.
- If future content growth increases panel density again, Proof could drift back into visual competition.

## Validation Checklist

- `pnpm typecheck`
- `pnpm build`

Success criteria for this phase:

- less inherited visual feel
- clearer hierarchy
- quieter atmosphere
- softer rail
- proof chapter reads as a composed evidence narrative
