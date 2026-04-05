---
name: gsap-performance
description: "Use when optimizing GSAP animations for smooth 60fps, avoiding jank, batching updates, or reducing layout thrashing."
---

# GSAP Performance

## When to Use

- Use when animation smoothness matters or when a motion system needs optimization.

## Rules

- Prefer transforms over layout properties.
- Batch DOM reads and writes.
- Avoid repeated layout queries inside frame loops.
- Keep heavy WebGL or scroll work lazy-loaded when it does not hurt the initial view.

## Minimal Pattern

1. Measure once.
2. Animate transforms.
3. Refresh or rebuild only when the layout actually changes.