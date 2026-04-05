# Minimal WebGL Layer

## Por que entra WebGL ahora
La experiencia ya cuenta con:
- motion foundation estable,
- runtime bridge confiable,
- scene system por capitulos,
- trust/certification layers,
- navigation shell narrativo.

Eso significa que WebGL ya no tendria que compensar una base debil. En este punto puede entrar como capa atmosferica singular, no como demo tecnica.

## Estrategia elegida
Se implementa una sola capa inicial: **ambient particle field muy sutil con halos suaves reactivos al scroll**.

Por que esta estrategia:
- Es ligera y estable.
- Aporta profundidad real sin robar atencion.
- Funciona como extension de la continuidad narrativa.
- Se puede modular por capitulo sin caos visual.
- Es claramente superior a puro DOM para una sensacion atmosferica premium.

## Contrato DOM / WebGL
Fuente de verdad:
- `src/features/motion/runtime/scrollRuntime.ts`

Signals consumidas por WebGL:
- `globalProgress`
- `immersiveProgress`
- `velocity`
- `direction`
- `activeSceneId`
- `activePanelIndex`
- `reducedMotion`

Responsabilidad de cada capa:
- DOM/CSS:
  - legibilidad,
  - jerarquia editorial,
  - contenido,
  - acciones,
  - navegacion.
- WebGL:
  - atmosfera,
  - profundidad,
  - respuesta sutil al recorrido,
  - refuerzo de identidad de capitulo.

Regla:
- WebGL nunca reemplaza contenido ni estructura.
- WebGL solo amplifica la lectura del sistema existente.

## Punto de entrada
La capa se monta dentro de la continuidad global en:
- `src/features/experience/SceneContinuityLayer.tsx`

Eso la hace:
- fija,
- transversal,
- coherente con todos los capitulos,
- separada del contenido principal.

## Responsabilidades por archivo
- `src/features/experience/SceneContinuityLayer.tsx`
  - Detecta reduced motion y soporte WebGL.
  - Lazy-load del seed R3F.
  - Mantiene la continuidad visual global.

- `src/features/graphics/MinimalWebGLLayer.tsx`
  - Canvas R3F minimal.
  - Ambient particles y halos.
  - Reaccion por capitulo y runtime.

- `src/features/motion/runtime/scrollRuntime.ts`
  - Fuente de verdad de progreso, velocidad y capitulo activo.

- `src/features/experience/sceneRegistry.ts`
  - Define el capitulo activo y su tono narrativo.

## Chapter-aware behavior
- Identity:
  - estable,
  - premium,
  - contenido-controlado.
- Proof:
  - un poco mas de energia,
  - mas densidad perceptual.
- Trust:
  - menos intensidad,
  - mas precision y calma.
- CTA:
  - cierre limpio,
  - menor densidad.

## Accessibility y performance
- Se desactiva con reduced motion.
- Se evita capturar input (`pointer-events: none`).
- Se usa lazy loading para no cargar el seed antes de tiempo.
- El render es de baja complejidad: pocos objetos, pocas materializaciones, sin shaders complejos.
- No hay memoria externa persistente ni listeners huérfanos.

## Que NO debe hacer esta capa
- No debe competir con escenas o overlays.
- No debe introducir interaccion tactil o mouse.
- No debe volverse un shader playground.
- No debe reemplazar el sistema de narrativa ni de contenido.
- No debe forzar WebGL si el entorno no lo soporta o si el usuario prefiere reduced motion.

## Escalado futuro
Si el valor se confirma, la siguiente evolucion puede ser:
1. Ajustar una segunda variante por capitulo sin cambiar el contrato runtime.
2. Agregar un shader muy simple solo si hay una necesidad narrativa clara.
3. Extender el seed a escenas futuras manteniendo el mismo bridge.

Regla de escalado:
- primero continuidad,
- luego variacion,
- al final complejidad.
