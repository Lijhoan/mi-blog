---
name: gsap-core
description: "Use when writing or reviewing GSAP core tweens, transforms, easing, defaults, autoAlpha, or responsive animation with matchMedia."
---

# GSAP Core

## When to Use

- Use for single tweens, transform-based motion, easing, stagger, defaults, and responsive animation.
- Use when the task needs a GSAP baseline before layering timelines or ScrollTrigger.

## Rules

- Prefer `x`, `y`, `scale`, `rotation`, `xPercent`, `yPercent`, and `autoAlpha` over raw `transform` strings.
- Prefer built-in eases before custom curves.
- Store tween or timeline references when playback control is needed.
- Use `gsap.matchMedia()` for breakpoint-specific behavior and reduced motion.

## Minimal Pattern

1. Register the needed plugins once.
2. Create the tween or timeline with transform-first vars.
3. Keep cleanup explicit when the animation lives inside a component.