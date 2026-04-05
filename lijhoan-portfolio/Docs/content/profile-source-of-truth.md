# Profile Source Of Truth

## Canonical Source

- `Docs/cv.md` is the human-authored source of truth for professional content.
- The TypeScript files under `src/content/` are derived runtime projections.
- If the markdown and runtime data diverge, the markdown wins.

## Final Hierarchy

1. `Docs/cv.md`
2. `src/content/profile/profile.data.ts` and the domain modules under `src/content/`
3. `src/content/index.ts`
4. `src/content/professionalContent.ts` only as a transitional compatibility bridge
5. UI consumers

## Current Role Of The Compatibility Layer

- `src/content/professionalContent.ts` is no longer a primary consumption target.
- It exists only to ease temporary adoption while legacy components are moved to domain modules.
- New code should import from the domain modules or `src/content/index.ts`.

## Canonical Fields

- Identity: name, role, location, email, phone.
- Positioning: headline, summary, and focus.
- Core stack: infrastructure, cloud, full stack, core systems, languages.
- Experience timeline.
- Project list.
- Certifications and education.
- Official links.

## Derived Fields

- UI hero metrics.
- Section labels.
- Grouping of stack items into cards.
- Featured-vs-archive project grouping.
- Display ordering in scrollytelling sections.

## Optional Fields

- GitHub profile URL, pending because the markdown currently contains a search URL instead of a direct profile link.
- CV PDF link, pending because the file is not present in the workspace.
- Project image assets for archive items, pending because only three project images exist in the repository.

## Discrepancies Already Observed

- The markdown GitHub field currently contains a Google search URL instead of a direct profile URL.
- The markdown references `/cv.pdf`, but the file is not present in the workspace.
- The markdown contains projects beyond the three featured assets currently surfaced in the UI.

## Update Rules

1. Edit `Docs/cv.md` first.
2. Update the matching data file under `src/content/`.
3. Update the UI only if the shape consumed by the component changed.
4. Never duplicate the same profile text inside a feature component.

## Update Pipeline

1. Edit `Docs/cv.md` first.
2. Sync the matching domain file under `src/content/`.
3. Update `src/content/index.ts` only if the export surface changes.
4. Update UI consumers only if their prop shape or consumed fields changed.
5. Leave `src/content/professionalContent.ts` untouched unless the compatibility bridge itself needs cleanup.

## Do Not Edit By Hand

- Do not duplicate identity, contact, or bio text in UI components.
- Do not maintain alternate content copies in feature files.
- Do not reintroduce project arrays or skill arrays inside page components.

## Drift Detection Rules

- Sensitive fields: name, role, email, phone, LinkedIn, GitHub, stack names, experience periods, project titles, certification titles.
- Disallowed drift: different spellings, different dates, different URLs, or different project counts between markdown and runtime.
- Pending-verification fields must be explicitly labeled as such in the runtime layer.

## Maintenance Checklist

- Confirm `Docs/cv.md` changed first.
- Confirm the matching `src/content/*` module changed.
- Confirm no feature component introduced a new hardcoded copy block.
- Confirm `pnpm typecheck` and `pnpm build` both pass.
- Confirm any pending-verification item is still intentionally unresolved.

## Agent Rules

- Treat `Docs/cv.md` as the authoritative content source.
- Do not invent alternate copies of bio, links, or experience inside components.
- Use `src/content/index.ts` or the specific domain module when consuming content.
- Report any markdown-to-runtime contradiction before changing the runtime copy.
