# Projects Hierarchy Fix

## Problema detectado
La seccion Projects tenia capas visuales compitiendo entre si: marcos intensos, densidad alta de decoracion y redundancia editorial, afectando lectura del capitulo Proof.

## Intervencion aplicada
Archivo intervenido: `src/features/scrollytelling/ProjectsScrollytellingSection.tsx`

Cambios clave:
1. Header editorial simplificado
- Se reduce ruido textual y se clarifica el mensaje de lectura del capitulo.
- Se elimina duplicidad de subtitulos competitivos.

2. Intro card con menor peso ornamental
- Menos blur, menos gradiente pesado, mejor contraste estructural.
- Mantiene narrativa de entrada sin secuestrar atencion del resto del carrusel.

3. Project cards con jerarquia mas limpia
- Ajuste de bordes, fondos y overlays para priorizar titulo, descripcion y CTA.
- Chips y metadatos con menor interferencia visual.
- CTA ahora abre el `project.link` real en nueva pestaña.

4. Relacion editorial -> contenedor horizontal -> cards
- Flujo de lectura mas claro:
  - introduccion breve
  - bloque horizontal
  - casos accionables

5. HUD tecnico estrictamente gated
- El HUD solo se muestra si:
  - entorno `DEV`, y
  - `VITE_SHOW_RUNTIME_HUD === "true"`.
- Previene fuga de ruido tecnico en entornos no tecnicos.

## Resultado esperado
- Mejor claridad perceptual del capitulo Proof.
- Menor fatiga visual por competencia de capas.
- Presentacion mas premium y mas orientada a confianza que a demostracion tecnica cruda.

## Riesgo residual
- Si se reactiva HUD por variable en entornos no controlados, puede volver a aparecer.
- Persisten advertencias de chunk size del build (no bloquean funcionalidad, pero afectan hardening de performance).
