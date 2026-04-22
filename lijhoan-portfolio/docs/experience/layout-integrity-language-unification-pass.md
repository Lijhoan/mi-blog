# Layout Integrity + Language Unification Pass

## Problemas detectados
- **Home/Hero:** doble lectura de titular (overlay + bloque principal), competencia entre retrato y bloque editorial, densidad alta de cajas en primer viewport.
- **Proof/Projects:** entrada con demasiados contenedores simultáneos (encabezado + chapter card + flagship + overlays), secuencia de lectura ambigua.
- **Idioma:** coexistencia accidental de inglés y español en chapter names, badges, labels, navegación y metadata visible.
- **Framing:** exceso de marcos, bordes, pills y chips en overlays y rail.
- **Rail:** presencia visual aún alta para su rol de orientación secundaria.

## Decisiones de corrección
- Se subordinó el sistema de overlays retirando chapter cards inferiores y desactivando frame cards de SceneShell en desktop.
- Se recompuso Home para mantener **un solo foco dominante**: titular principal + resumen + CTA; retrato reducido como bloque de soporte.
- Se eliminó la tarjeta editorial de entrada en Projects para que el flagship entre limpio en primer plano.
- Se redujo densidad de marcos/bordes en cards de projects y flagship.
- Se silenció el rail (ancho menor, cromado menor, menos elementos decorativos, sin tooltip flotante de label).

## Reglas de idioma
- **Idioma principal:** español.
- **Permitido en inglés solo si es término técnico propio o nombre de stack** (p. ej. Next.js, TypeScript, Zero Trust).
- Se unificaron al español:
  - chapter names y eyebrow labels,
  - labels de navegación (desktop/mobile),
  - badges y estados visibles,
  - metadata editorial visible (baseline/after/delta, señales, restricciones, etc.).

## Reglas de no-superposición
- Un único titular dominante por viewport en Home y Proof.
- No coexistir chapter frame + intro card + flagship en el mismo plano de lectura inicial.
- Overlays atmosféricos sí; overlays de panel que compitan con contenido principal, no.
- Retrato siempre subordinado al bloque de apertura.

## Reglas de framing mínimo
- Mantener borde/caja solo si aporta semántica o orientación inmediata.
- Reducir badges y pills a los estrictamente necesarios para categoría/estado.
- Evitar marcos dobles (contenedor + subcontenedor con mismo propósito visual).
- Priorizar contraste tipográfico y ritmo de espacios sobre cromado.

## Gaps para polish final
- Ajustar microtipografía y tracking por breakpoint para capítulos de lectura (About/Skills/Experience).
- Revisar peso visual de badges tecnológicos en supporting cases en pantallas pequeñas.
- Evaluar una última calibración de opacidad atmosférica por capítulo para afinar consistencia perceptual.
