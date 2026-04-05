# Content Foundation

## Source of Truth

- `Docs/cv.md` is the canonical content source for professional profile data.
- Structured UI content in `src/content/professionalContent.ts` is derived from `Docs/cv.md` and must stay in sync with it.

## What This Layer Solves

- Avoids duplicated copy across components.
- Gives the UI a typed, reusable, centralized content model.
- Makes future route rendering in Next.js easier because sections can consume data instead of hardcoded text.

## Canonical vs Derived

### Canonical Fields

- Name
- Role
- Email
- Phone
- Location
- Social links
- Overview / profile narrative
- Experience entries
- Projects
- Stack groups
- Certifications

### Derived Fields

- Metric labels for presentation
- UI section titles
- Badge-friendly group names
- Card ordering and display grouping

## Update Rule

1. Update `Docs/cv.md` first.
2. Mirror the same content into `src/content/professionalContent.ts`.
3. If the UI consumes the new field, update the corresponding component.
4. Do not invent alternate copies in feature components.

## What Not To Do

- Do not copy profile text into components.
- Do not store conflicting versions of the same bio or contact data in feature files.
- Do not treat the structured module as a second source of truth; it is a typed projection of the markdown.

## Future Consumption Model

- React components should import from `src/content/professionalContent.ts`.
- Next.js route components can reuse the same content module without changing the data contract.
- Future agents should read `Docs/cv.md` before proposing any copy edits.
