---
name: gsap-scrolltrigger
description: "Use when building scroll-linked animation, pinning, scrubbed timelines, refresh behavior, or horizontal scrollytelling with GSAP ScrollTrigger."
---

# GSAP ScrollTrigger

## When to Use

- Use for pinned sections, scrubbed motion, horizontal scroll journeys, and scroll-driven orchestration.

## Rules

- Keep trigger, scroller, and animated targets explicit.
- Call `ScrollTrigger.refresh()` after layout changes.
- Use `invalidateOnRefresh` when measurements can change.
- Prefer measured widths and container-based logic for horizontal scrollytelling.
- Respect reduced-motion settings and avoid forcing scroll-linked motion on users who opt out.

## Minimal Pattern

1. Build the animation or timeline.
2. Attach `scrollTrigger` with clear start, end, and scrub or pin settings.
3. Refresh after content or layout changes.