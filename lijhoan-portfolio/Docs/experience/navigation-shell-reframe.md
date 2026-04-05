# Navigation Shell Reframe

## Contexto
La experiencia elevo su calidad narrativa y visual, pero la navegacion persistente seguia transmitiendo un patron de dashboard utilitario.

## Problemas detectados (Navigation Audit)
1. Iconografia pesada y repetitiva:
- Botones cuadrados con iconos grandes y estilo de panel.
- El rail compite visualmente con las escenas.

2. Framing administrativo:
- Bloque lateral con sensacion de app shell.
- Exceso de affordances utilitarias para una experiencia editorial.

3. Wayfinding limitado:
- Indicaba estado activo, pero no comunicaba bien progreso de recorrido ni contexto narrativo.

4. Mobile con densidad de utility bar:
- Barra inferior funcional pero con tono de navegacion de app, no de journey curado.

## Principios elegidos
1. Quiet guidance:
- Navegacion presente pero discreta, con menor protagonismo.

2. Chapter-first wayfinding:
- Cada nodo representa un capitulo del recorrido.
- Se comunica estado activo, progreso y capitulo siguiente.

3. Narrative parity:
- Distincion entre capitulos inmersivos y de lectura para orientar expectativa del usuario.

4. Progressive disclosure:
- Labels contextuales, no ruido constante.

5. Mobile graceful degradation:
- Chips compactos con continuidad semantica respecto a desktop.

## Decision de Navigation Shell
Se implementa una combinacion:
- Desktop: chapter rail discreto + progress spine vertical.
- Mobile: barra flotante compacta con chapter chips + indicador contextual.

Razon:
- Maximiza claridad de ubicacion sin convertir la interfaz en dashboard.
- Mantiene navegabilidad instantanea y foco editorial.

## Contrato del nuevo navigation shell
Componente: `src/features/navigation/NavigationShell.jsx`

Props:
- `items`: definicion de capitulos (`id`, `label`, `shortLabel`, `kind`).
- `activeSectionId`: capitulo activo.
- `onChangeSection`: cambio de capitulo.

Semantica:
- `kind = immersive | reading` para wayfinding contextual.
- `progress` derivado de indice activo / total de capitulos.
- `next chapter` visible como orientacion anticipatoria.

## Reglas Desktop
1. Rail vertical reducido y translcido, no bloque utilitario.
2. Spine central con progreso acumulado.
3. Nodos compactos con estado:
- activo
- completado
- pendiente
4. Labels persistentes solo en estado activo (y hover en no-activo).
5. Indicador textual de tipo de capitulo y porcentaje de recorrido.

## Reglas Mobile
1. Barra flotante compacta en parte inferior.
2. Chips horizontales con estado activo claro.
3. Wayfinding contextual:
- tipo de capitulo actual
- siguiente capitulo
4. Sin iconografia pesada para evitar tono de app menu.

## Que se elimino y por que
1. Se elimino el sidebar de icon buttons cuadrados:
- Producia sensacion de dashboard.
- Sobrecargaba visualmente el marco global.

2. Se elimino el bloque de branding utilitario del rail:
- No aportaba narrativamente al recorrido.

3. Se retiro la dependencia en icon labels como mecanismo principal de orientacion:
- Se reemplazo por chapter nodes + progreso + contexto.

## Project Link Credibility Rule
En proyectos:
- Si `link` es placeholder (`#`) o vacio, CTA no promete salida.
- El boton pasa a estado no accionable y copy honesto.
- Se agrega nota de contexto para proteger credibilidad.

## Portabilidad a Next.js 15 App Router
El contrato del shell es portable porque:
1. No depende de APIs especificas de Vite.
2. Usa props declarativas y estado externo de seccion activa.
3. Puede mapearse a segmentos App Router o metadata de ruta.
4. El pattern permite evolucion a route-aware navigation sin romper scene system.

## Escalado futuro
1. Integrar route segment awareness (App Router) manteniendo chapter contract.
2. Conectar progreso a eventos de navegacion multi-pagina si se migra a rutas reales.
3. Mantener la regla: orientacion alta, ruido bajo.
