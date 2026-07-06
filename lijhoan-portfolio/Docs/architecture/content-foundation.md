# Fundamentos del contenido

## Fuente de verdad

- `Docs/cv.md` es la fuente canónica de contenido para el perfil profesional.
- El contenido estructurado de la UI en `src/content/professionalContent.ts` se deriva de `Docs/cv.md` y debe mantenerse sincronizado con él.

## Lo que esta capa resuelve

- Evita la duplicación de copia entre componentes.
- Brinda a la UI un modelo de contenido centralizado, tipado y reutilizable.
- Facilita el renderizado futuro de rutas en Next.js, permitiendo que las secciones consuman datos en lugar de texto embebido.

## Campos canónicos vs derivados

### Campos canónicos

- Nombre
- Rol
- Email
- Teléfono
- Ubicación
- Enlaces sociales
- Resumen / narrativa del perfil
- Entradas de experiencia
- Proyectos
- Grupos de stack
- Certificaciones

### Campos derivados

- Etiquetas de métricas para presentación
- Títulos de secciones de UI
- Nombres de grupos aptos para badges
- Ordenamiento y agrupamiento de tarjetas

## Regla de actualización

1. Editar `Docs/cv.md` primero.
2. Asegurar la misma información en `src/content/professionalContent.ts`.
3. Si la UI consume el nuevo campo, actualizar el componente correspondiente.
4. No inventar copias alternativas en componentes de características.

## Lo que NO se debe hacer

- No duplicar el texto del perfil dentro de componentes.
- No almacenar versiones conflictivas del mismo perfil biográfico o datos de contacto en archivos de características.
- No tratar el módulo estructurado como una segunda fuente de verdad; es una proyección tipada del markdown.

## Modelo de consumo futuro

- Los componentes de React deberían importar desde `src/content/professionalContent.ts`.
- Los componentes de rutas de Next.js pueden reutilizar el mismo módulo de contenido sin cambiar el contrato de datos.
- Los futuros agentes deberían leer `Docs/cv.md` antes de proponer cualquier edición de copia.
