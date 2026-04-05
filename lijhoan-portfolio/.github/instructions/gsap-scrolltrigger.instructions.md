---
description: "Use when creating scroll-driven animation, pinned sections, horizontal scrollytelling, scrubbed timelines, or ScrollTrigger cleanup."
---

# GSAP ScrollTrigger Guidelines

- Use `ScrollTrigger` for scroll-linked motion, pinning, scrubbed timelines, and horizontal journey sections.
- Keep the trigger element, animated element, and scroller choice explicit in each implementation.
- Use `invalidateOnRefresh` when the layout can change after initial render.
- Call `ScrollTrigger.refresh()` after images, dynamic content, or lazy-loaded sections alter dimensions.
- For horizontal scrollytelling, base movement on measurable width instead of hard-coded pixel values.
- Respect reduced-motion settings and provide a non-animated fallback when appropriate.