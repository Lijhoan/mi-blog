# Flagship Case Study + Data Proof Chapter

## Objective

Implement a proof-first chapter that elevates portfolio credibility through one flagship case study with verified signals, explicit constraints, and a BI-ready data layer contract.

## Flagship Selection

- Selected project: Tale Insight Analytics.
- Selection criteria:
  - Architecture maturity (Next.js 15 + React 19 + TypeScript + PostgreSQL + JWT).
  - Real organizational scope (8 areas / 28 sub-areas from CV source).
  - Direct fit with data decision workflows (Power BI integration inside product shell).

## Experience Architecture

The chapter now follows this horizontal narrative in the projects scene:

1. Editorial intro panel (context and scope)
2. Flagship proof panel (problem, architecture, impact, constraints, credibility)
3. Project cards (supporting cases with honest access status)

This keeps visual continuity while increasing evidentiary depth.

## Data Proof Layer

Implemented through three coordinated pieces:

- Metric panels:
  - Verified values are labeled as `Verified`.
  - Unknown quantitative ROI values remain `Pending` (no fictional numbers).
- Architecture story panels:
  - Problem Framing
  - Architecture Snapshot
  - Impact and Credibility
- BI-ready embed shell (lazy):
  - `BiEmbedReadinessShell` introduces a portable integration contract.
  - Status is currently `ready-not-connected` to avoid fake embeds without credentials/runtime wiring.

## Credibility Pass

- GitHub link updated to direct profile URL.
- CV verification status updated to canonical because `/public/cv.pdf` exists.
- Project placeholder links (`#`) removed in favor of empty link + explicit private/NDA notes.
- CTA copy updated from ambiguous placeholder to honest non-public wording.

## Guardrails

- No invented metrics.
- Keep verified vs pending markers explicit in UI and data model.
- Preserve first-render performance by lazy-loading BI shell.
- Treat this chapter as content infrastructure first, visual polish second.

## Files Added

- `src/content/case-studies/flagshipProof.data.ts`
- `src/features/proof/FlagshipProofPanel.tsx`
- `src/features/proof/BiEmbedReadinessShell.tsx`
- `Docs/experience/flagship-case-study-proof-chapter.md`

## Files Updated

- `src/features/scrollytelling/ProjectsScrollytellingSection.tsx`
- `src/content/projects/projects.data.ts`
- `src/content/profile/profile.data.ts`
- `src/content/index.ts`
