# Reglas de fuente de verdad del contenido para agentes

## Prioridad

1. `Docs/cv.md`
2. `src/content/professionalContent.ts`
3. Componentes UI

## Reglas para agentes

- Siempre consultar `Docs/cv.md` antes de editar la copia profesional.
- No sobrescribir contenido en componentes si los mismos datos ya existen en el módulo estructurado.
- Cuando el contenido cambia, editar primero el markdown fuente y luego derivar el módulo estructurado.
- Mantener la derivación de contenido separada de preocupaciones de motion o layout.

## Patrón seguro de edición

- Cambio de contenido: `Docs/cv.md` -> `src/content/professionalContent.ts` -> Consumidores de UI.
- Cambio de layout: Consumidor de UI solo, mientras los campos de copia permanezcan idénticos.
- Nunca modificar la infraestructura de motion solo para editar copia.
