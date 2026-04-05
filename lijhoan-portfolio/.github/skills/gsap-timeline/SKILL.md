---
name: gsap-timeline
description: "Use when sequencing GSAP animations with timelines, labels, nested timelines, or playback control."
---

# GSAP Timeline

## When to Use

- Use for multi-step animation, orchestration, and motion that should stay readable as it grows.

## Rules

- Prefer timelines over chained delays.
- Use labels and position parameters to keep sequencing explicit.
- Keep timeline creation separate from scroll binding unless the timeline is directly scroll-driven.

## Minimal Pattern

1. Create a timeline with shared defaults.
2. Add steps in order, using labels or position offsets when needed.
3. Keep references if the timeline must be paused, reversed, or killed later.