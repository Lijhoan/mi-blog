# Visual QA Fix Sprint

## Fallos corregidos

1. Home/Hero: superposicion por doble titular
- Causa: `IdentityChapterOverlay` renderizaba un frame completo con el mismo titular del hero.
- Correccion: se desactivo el overlay de home (`IdentityChapterOverlay` retorna `null`).
- Resultado: queda un solo titular dominante en el primer viewport.

2. Projects/Proof: competencia entre chapter card y heading principal
- Causa: `ChapterOverlay` renderizaba `SceneShell` (frame + encabezado) encima del heading propio del chapter.
- Correccion: `ChapterOverlay` ahora oculta el frame por defecto (`showFrame = false`) y mantiene solo atmosfera/estructura.
- Resultado: desaparece la competencia entre card lateral y heading de Proyectos.

3. Trust y Contact: ruido visual por pills inferiores
- Causa: overlays de Trust/CTA agregaban chips flotantes en el borde inferior del viewport.
- Correccion: se eliminaron puntos/chips en `TrustChapterOverlay`, `CtaChapterOverlay` y `ProofChapterOverlay`.
- Resultado: lectura central limpia y sin foco secundario artificial.

4. Proof flagship: exceso de badges/marcos
- Causa: doble badge superior, paneles con borde fuerte, estado tipo pill, bloque de cierre en caja.
- Correccion:
  - Se removieron badges superiores.
  - Se redujeron bordes en paneles y metricas.
  - Estados pasaron de pill a texto tonal.
  - "Honest Scope" paso a nota lateral sin caja.
- Resultado: el caso principal entra como foco unico con menor chrome.

5. Skills: framing excesivo en cards
- Causa: cards con borde + badge tipo pill por habilidad.
- Correccion: skill cards simplificadas (sin borde de contenedor ni pills de banda).
- Resultado: jerarquia por tipografia y nivel, no por cajas.

## Decision de idioma (Language Lock)

Idioma principal fijado: espanol.

Aplicado en:
- navegacion desktop/mobile (labels y aria labels)
- scene registry (eyebrow y accent labels)
- headings y microcopy de flagship proof
- etiquetas de bandas de skills (`Nucleo`, `Solido`, `Soporte`)

Excepciones intencionales:
- nombres propios de tecnologias o dominios (ej. Next.js, Power BI, Zero Trust, role titles laborales cuando vienen como denominacion oficial).

## Elementos eliminados/reducidos

Eliminados:
- frame completo del overlay de Home
- chips inferiores de Proof/Trust/Contact overlays
- badges decorativos superiores del flagship

Reducidos:
- bordes en contenedores de flagship y supporting project cards
- estatus tipo pill en metricas
- framing de skill cards
- protagonismo visual del retrato en Home

## Regla de foco unico por viewport

1. Home
- Foco dominante: titular H1 + narrativa.
- Subordinado: retrato (sin borde fuerte y menor peso visual).

2. About
- Foco dominante: bloque editorial "Sobre mi".
- Subordinado: pilares y metricas sin cajas decorativas.

3. Proof
- Foco dominante: flagship panel.
- Subordinado: supporting cases en continuidad horizontal, sin chapter card en competencia.

4. Trust
- Foco dominante: tesis + timeline.
- Eliminado: chips flotantes que competian por atencion.

5. Contact
- Foco dominante: heading + canales.
- Eliminado: pills inferiores no esenciales.

## Verificacion visual basada en captura/snapshot

Verificacion manual en local (`http://127.0.0.1:4173/`) por chapter:

- Home: desaparecio el bloque duplicado de titular; snapshot muestra un solo H1 principal.
- Proyectos: desaparecio chapter card lateral; heading "Con evidencia de impacto" + flagship sin colision de cabeceras.
- Trayectoria: sin chips flotantes inferiores; lectura primaria limpia.
- Contacto: sin pills inferiores; bloque editorial y canales quedan como foco.
- Perfil: mantiene jerarquia limpia sin colisiones.

## Pendientes visuales finales

1. Hay terminos de dominio en ingles dentro de data de proyectos/certificaciones (intencionales o por origen de contenido). Si se requiere pureza total de idioma, se debe normalizar el contenido fuente.
2. En timeline laboral se mantienen algunos nombres de rol en ingles (segun denominacion original). Puede traducirse editorialmente en un pass posterior si se desea.

## Archivos modificados en este sprint

- `src/features/experience/ChapterOverlay.tsx`
- `src/features/experience/IdentityChapterOverlay.tsx`
- `src/features/experience/ProofChapterOverlay.tsx`
- `src/features/experience/TrustChapterOverlay.tsx`
- `src/features/experience/CtaChapterOverlay.tsx`
- `src/features/experience/sceneRegistry.ts`
- `src/features/navigation/NavigationShell.jsx`
- `src/features/proof/FlagshipProofPanel.tsx`
- `src/features/scrollytelling/ProjectsScrollytellingSection.tsx`
- `src/App.jsx`

## Validacion tecnica

- `pnpm typecheck`: OK
- `pnpm build`: OK
