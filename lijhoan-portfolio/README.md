# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## GSAP Skills Layer

This repository includes a local Copilot and agent customization layer in `.github/` that mirrors the structure of `greensock/gsap-skills`.

- `.github/copilot-instructions.md` defines repo-wide GSAP guidance.
- `.github/instructions/` contains file-specific animation rules.
- `.github/agents/gsap-animation.agent.md` defines a GSAP-focused agent persona.
- `.github/skills/` contains a local skill index and GSAP skill stubs for agent discovery.

The customization layer is aligned to `Docs/Plan.md` and is meant to guide the future roadmap, not the legacy app implementation.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
