# Content Pipeline Freeze

## Goal

Prevent drift between the markdown profile source, the derived runtime modules, and the UI consumers.

## Operating Rule

- `Docs/cv.md` is the source of truth.
- Domain modules under `src/content/` are derived projections.
- `src/content/index.ts` is the approved import surface for consumers.
- `src/content/professionalContent.ts` is a compatibility bridge only and should not be the default import target for new code.

## Update Flow

1. Edit `Docs/cv.md` first.
2. Sync the affected domain module in `src/content/`.
3. If needed, update `src/content/index.ts` exports.
4. Update the UI only when the consumed shape changes.
5. Run `pnpm typecheck` and `pnpm build`.

## Drift Checks

- Names, roles, URLs, dates, and project titles must match the markdown.
- Pending-verification items must remain labeled as such until confirmed.
- No component should reintroduce hardcoded identity, experience, or project copy.

## When To Remove `professionalContent.ts`

Remove the compatibility bridge when:
- all consumers import directly from the domain modules or `src/content/index.ts`;
- there are no remaining imports from `src/content/professionalContent.ts`;
- the file adds no runtime value beyond duplication of the domain modules.

## Maintenance Checklist

- Edit markdown first.
- Sync domain module second.
- Avoid new hardcoded content in features.
- Verify build and typecheck.
