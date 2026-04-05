---
name: gsap-utils
description: "Use when working with gsap.utils helpers such as clamp, mapRange, normalize, interpolate, random, snap, selector, wrap, or pipe."
---

# GSAP Utils

## When to Use

- Use for reusable numeric helpers, scoped selectors, array conversion, and composition helpers.

## Rules

- Use helper functions to keep animation math readable.
- Prefer `gsap.utils.selector(scope)` when animations need scoped querying.
- Use `toArray()` when you need a real array from a selector or NodeList.
- Use `pipe()` when composing transforms in a single readable pipeline.

## Minimal Pattern

1. Pick the utility that matches the data shape.
2. Keep the helper reusable if the same range or transform is used repeatedly.
3. Avoid mixing unit-aware and unitless math without explicit conversion.