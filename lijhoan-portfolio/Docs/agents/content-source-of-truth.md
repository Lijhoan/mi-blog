# Agent Rules: Content Source of Truth

## Priority Order

1. `Docs/cv.md`
2. `src/content/professionalContent.ts`
3. UI components

## Rules For Agents

- Always consult `Docs/cv.md` before editing professional copy.
- Do not overwrite content in components if the same data already exists in the structured module.
- When content changes, update the markdown source first and then derive the structured module from it.
- Keep content derivation separate from motion or layout concerns.

## Safe Editing Pattern

- Content change: `Docs/cv.md` -> `src/content/professionalContent.ts` -> UI consumers.
- Layout change: UI consumer only, as long as copy fields remain the same.
- Never modify motion infrastructure just to edit copy.
