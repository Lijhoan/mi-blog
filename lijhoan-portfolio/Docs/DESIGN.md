# Diseño — Portfolio Lijhoan

Documento único del sistema de diseño y experiencia. Destila las decisiones válidas de las ~15 bitácoras previas (eliminadas en el reenfoque). Excluye deliberadamente la capa de datos empresarial (telemetría, BI embed, backend) que se removió del proyecto.

> **Norte:** portfolio inmersivo nivel Awwwards **priorizando legibilidad y performance sobre el espectáculo**. El texto es la señal primaria; el motion nunca compite con la ruta de lectura.

---

## 1. Principios

**Cinco pilares de experiencia**
- **Cinematic Restraint** — motion deliberado, no constante.
- **Industrial Precision** — se siente ingenierizado, no decorativo.
- **Narrative Immersion** — recorrido guiado, no una lista de secciones.
- **Data-Driven Credibility** — métricas como evidencia verificable, nunca adorno ni cifras ficticias.
- **Tactile Motion** — peso y fricción vía transforms y parallax medido.

**Tono:** "enterprise + experimental", estudio de producto serio. Fondos profundos (`bg-slate-950/*`), acentos luminosos fríos, contraste de texto fuerte. Nunca template.

**Language lock (español):** idioma principal en labels, headings, badges, microcopy y scene registry. Inglés solo deliberado: nombres de tecnología/marca (Next.js, Power BI, Zero Trust, GitHub, LinkedIn) y denominaciones oficiales de rol/certificación. *Gap:* aún hay términos en inglés en data de proyectos/certificaciones pendientes de normalizar.

**Anti-patrones prohibidos:** gradientes genéricos, glass sobreusado, texturas de fondo dominantes, hero tipo tarjeta de perfil social, gimmicks decorativos, badges sin valor semántico, rail de navegación como protagonista.

---

## 2. Sistema de capítulos narrativos

Cuatro capítulos con firma, mapeados a secciones en `sceneRegistry.ts`:

| Capítulo | Sección | Tono | Intensidad | Eyebrow |
|---|---|---|---|---|
| `identity` | home | cool | balanced | Ingeniero Digital / Cloud Data / Solutions Architect |
| `proof` | projects | steel | expressive | Evidencia de capacidad |
| `trust` | experience | neutral | quiet | Credibilidad empresarial |
| `cta` | contact | warm | quiet | Construyamos el siguiente sistema |

Las 7 secciones (Home, About, Projects, Skills, Experience, Certifications, Contact) se agrupan en el arco de 4 capítulos: About y Skills viven dentro de identity/proof-trust sin overlay propio; Certifications se monta dentro de `trust`.

**Arquitectura (Scene System v2 — `src/features/experience/`):**
- `SceneContinuityLayer.tsx` — capa atmosférica global fija detrás de toda la app; consume el scroll runtime y el tono activo; detecta reduced-motion y soporte WebGL; hace lazy-load del seed WebGL. Debe ser ligera y reduced-motion-safe.
- `ChapterOverlay.tsx` — contrato reutilizable de overlay (atmósfera + frame + evidencia compacta). `showFrame = false` por defecto (el frame competía con el heading de cada sección).
- `SceneShell.tsx` — shell presentacional del framing premium (header + summary); sin lógica de scroll.
- `sceneRegistry.ts` — mapa explícito `sectionId → chapterId` con metadata (title, eyebrow, summary, accentLabel, tone, intensity, priority).

**Coreografía:** identity entra y permanece calmo → proof afila el foco en proyectos → trust se vuelve más estable/menos kinético → cta cierra con calidez y menor densidad. Regla de salida: cada capítulo se **atenúa**, nunca desaparece abruptamente. Solo un frame de capítulo puede sentirse dominante a la vez.

---

## 3. Mood tokens / atmósfera

`chapterMoodTokens.ts` — lenguaje visual por capítulo. **Principio:** gramática global primero, personalidad de capítulo después; variedad por tokens calibrados, nunca estilos ad-hoc. Se aplican vía `SceneShell` + `ChapterAtmosphereLayer` + `chapterPanelClassesById`.

Propiedades del token (`ChapterMoodToken`): `typographyEmphasis`, `captionStyle`, `spacingRhythm`, `panelDensity`, `atmosphere`, `accentDensity`, `frameVisibility`, `contrastBehavior`, `motionIntensity`, `calmExpressiveBalance`.

Valores reales (`frameVisibility.mobile = false` en los cuatro):

| Capítulo | Acento | intensityOpacity | gridOpacity | frameLineOpacity | driftMult | pulseMult | calm/expr |
|---|---|---|---|---|---|---|---|
| identity | cyan | 0.54 | 0.06 | 0.08 | 0.74 | 0.86 | 0.44 |
| proof | blue | 0.64 | 0.07 | 0.10 | 0.90 | 0.94 | 0.66 |
| trust | cyan tenue | 0.38 | 0.04 | 0.06 | 0.52 | 0.78 | 0.24 |
| cta | amber | 0.32 | 0.03 | 0.04 | 0.46 | 0.72 | 0.18 |

Lectura: **proof** es el capítulo más expresivo/denso; **trust** y **cta** los más calmos. Paleta editorial fría (azul/cyan) salvo el cierre cálido (amber).

**Anti-drift:** prohibido hardcodear colores/estilos de capítulo dentro de componentes de sección o animaciones fuera de componentes gobernados por token. Si un capítulo necesita comportamiento nuevo, se extiende primero la forma del token. WebGL debe **consumir** estos tokens, no redefinir mood.

---

## 4. Motion

**Stack y contratos (congelados):**
- **Lenis** motor de smooth-scroll, sincronizado al **GSAP ticker** (mismo reloj), en `SmoothScrollProvider` (dueño del ciclo de vida; limpia listeners/ticker/media-query en unmount).
- **ScrollTrigger / scrollytelling horizontal** aislado en `ScrollyTellingContainer` (dueño de pin, scrub y traslación horizontal; degrada a layout apilado si falla la medición o hay reduced-motion).
- **Framer Motion** para reveals de contenido de soporte.

**Scroll runtime (`src/features/motion/runtime/scrollRuntime.ts`)** — store externo ligero (no context ni Zustand). API: `getScrollRuntimeSnapshot`, `subscribeToScrollRuntime`, `publishScrollEngineSignal`, `publishReducedMotionSignal`, `publishImmersiveSignal`, `clearImmersiveSignal`, `useScrollRuntimeSelector`. Snapshot: `{ timestamp, reducedMotion, globalProgress 0..1, immersiveProgress 0..1, rawVelocity, velocity, direction, activeSceneId, activePanelIndex, panelCount }`. Updates batched por `requestAnimationFrame` con filtro epsilon. Es la **única fuente de verdad** para animación DOM, escenas R3F y activación de sección; los consumidores no tocan Lenis/GSAP directamente.

**Gramática:** entradas por opacity + transform, reveals escalonados, sin bounce ni easings novedosos. Horizontal solo para capítulos que lo justifican. **Scrub** para progreso narrativo/atmósfera; **trigger-only** para contenido de soporte. El fondo se mueve más lento que el foreground; reacciones a velocidad capadas.

**Control de fatiga:** nada de motion continuo en cada elemento, limitar canales visuales simultáneos, dejar respiro entre momentos densos.

**Reduced-motion:** colapsa a un layout premium **estático** (no un modo roto). Efectos siempre transform/opacity, nunca animación con layout. Clase `chapter-section` con fallback reduced-motion.

---

## 5. Capa WebGL

`MinimalWebGLLayer.tsx` (`src/features/graphics/`) — canvas R3F minimal: **campo de partículas ambiente muy sutil con halos suaves reactivos al scroll**. Capa atmosférica singular, no demo técnica. Montada dentro de `SceneContinuityLayer`.

**Contrato:** consume solo señales del scroll runtime; nunca acopla a Lenis/GSAP. Amplifica atmósfera/profundidad/identidad de capítulo; jamás reemplaza contenido ni estructura.

**Comportamiento por capítulo:** identity estable; proof más energía/densidad; trust más precisión/calma; cta cierre limpio. Solo cambia proporción, no el lenguaje de motion.

**Hardening:** gate de visibilidad de página (desmonta el canvas si la página está oculta), **tiers de performance** por hardware (menos partículas/halos y DPR más bajo en dispositivos balanced/constrained), `frameloop="always"` solo mientras está montado y visible.

**Seguridad de producción:** reduced-motion desactiva la capa entera; sin soporte WebGL no se monta; `pointer-events: none`; lazy-load del seed; sin listeners huérfanos. **Totalmente removible sin tocar la arquitectura de escenas.**

**Límites (no hacer):** sin shaders complejos ni post-processing, sin interacción/cámara, sin UI dentro del canvas. Escalado: **continuidad → variación → complejidad**, y solo si se confirma valor narrativo.

---

## 6. Composición editorial

- **Tipografía:** jerarquía fuerte, estilizado restringido. Título `text-2xl lg:text-4xl font-semibold tracking-tight`; captions con tracking amplio por capítulo (`tracking-[0.24em]`–`0.3em`); body altamente legible.
- **Foco único por viewport:** un solo foco dominante por sección; una "reading lane" primaria, las secundarias más silenciosas.
- **Espaciado/grid:** ritmo de whitespace consistente entre capítulos; "breathing" deliberado alrededor de momentos signature; grid y densidad de línea constantes (solo cambia tono/proporción).
- **Paneles:** instrumentos estructurales, no "cards por todas partes". `chapterPanelClassesById` define borde+fondo+texto por capítulo. Estados en texto tonal, no pills; sin badges decorativos.
- **Media:** imagen solo con valor de prueba o identidad (evidencia de proyecto/certificación, retrato como soporte editorial); diagrama solo si aclara arquitectura mejor que el texto; typography-first por defecto.
- **Craft:** la percepción premium viene de calibración (pacing, jerarquía, señales de interacción), no de complejidad añadida. Hover depth táctil en paneles clave; `focus-visible` rings claros.

---

## 7. Navegación

`NavigationShell.jsx` (`src/features/navigation/`). Props: `items` (`id`, `label`, `shortLabel`, `kind`), `activeSectionId`, `onChangeSection`. `kind = immersive | reading` para wayfinding contextual; progreso derivado del índice activo.

**Principios (reframe):** quiet guidance, chapter-first wayfinding, narrative parity, progressive disclosure, mobile graceful degradation. Se abandonó el rail de icon-buttons tipo dashboard.

- **Desktop:** chapter rail vertical translúcido + progress spine central; nodos compactos con estado activo/completado/pendiente; label persistente solo en el activo; indicador de tipo de capítulo y % de recorrido.
- **Mobile:** barra flotante inferior con chapter chips + indicador de capítulo actual/siguiente, sin iconografía pesada.

**Regla de credibilidad de link:** si `link` es placeholder (`#`) o vacío, el CTA no promete salida — pasa a estado no accionable con copy honesto (NDA/privado).

---

## 8. Scrollytelling de proyectos (capítulo proof)

`ProjectsScrollytellingSection.tsx` — narrativa horizontal en 3 tramos: (1) intro editorial de contexto, (2) **flagship proof panel** dominante, (3) project cards de soporte (secuencia más estrecha, con estado de acceso honesto).

`FlagshipProofPanel.tsx` — caso insignia **Tale Insight Analytics**. Story panels de arquitectura (Problem Framing, Architecture Snapshot, Impact & Credibility) + métricas con estado explícito (`verified`/`estimated`/`pending`/`unavailable`) — **sin números ficticios**; los ROI desconocidos quedan `pending`.

> **Reenfoque:** el `BiEmbedReadinessShell` / contrato de activación BI / embed de Power BI que las bitácoras describían fueron **eliminados**. El flagship es hoy una narrativa editorial de evidencia (problema → arquitectura → impacto) con marcadores verified/pending, sin shell de embed.

**Integridad:** no inventar métricas; verified vs pending explícito en UI y modelo; CTAs no prometen capacidades inexistentes; links externos con `rel="noopener noreferrer"`.

**Trust / Certifications (`CertificationTrustLayer.jsx`):** curación por tiers — `featured` (alta señal: Data + Analytics + Cybersecurity), `supporting` (amplitud técnica), `archive` (historial, solo en modal on-demand). Thumbs `loading="lazy"`, asset full solo al abrir lightbox. Skills como "capability blocks" con bandas `Nucleo`/`Solido`/`Soporte` (sin emojis ni pills), jerarquía por tipografía y nivel.

---

## 9. Gaps para nivel Awwwards

- **Pase tipográfico final** (kerning, ritmo de headings, cadencia de párrafo) — la mejora de mayor impacto pendiente.
- **Skills:** reducir conteos largos de cards vía *staged reveal*; aún conserva algo de lenguaje utility-card.
- **Trust/timeline:** densidad de copy alta; colapso selectivo para escaneo rápido.
- **Transiciones móviles** trust/proof: falta afinado de micro-ritmo premium.
- **Pureza de idioma:** normalizar términos en inglés del contenido fuente ([`cv.md`](cv.md)).
- **WebGL:** mantener seed mínimo; variante por capítulo o shader solo si se confirma valor narrativo.
- **Transiciones entre secciones/rutas:** aún sin sistema de `AnimatePresence` (ver [`ROADMAP.md`](ROADMAP.md) Fase 5).
