# Certification Trust Layer

## Objetivo
Integrar certificaciones como una capa de credibilidad visual (trust layer) sin competir contra el stack principal narrativo.

## Decision de Arquitectura
- Se crea un dominio explicito en `src/content/certifications/certificationTrust.data.ts`.
- Se separa curaduria por tier:
  - `featured`: alta señal para posicionamiento actual.
  - `supporting`: amplitud tecnica relevante.
  - `archive`: trazabilidad historica bajo demanda.
- Se implementa interfaz dedicada en `src/features/experience/CertificationTrustLayer.jsx`.
- La seccion `certifications` en `src/App.jsx` monta la trust layer en lugar del listado textual plano.

## Curation Strategy
### Featured (alta prioridad de posicionamiento)
1. Gestion de Amenazas Ciberneticas (Cisco)
2. Defensa de la Red (Cisco)
3. Seguridad de Terminales (Cisco)
4. Data Analysis Using Python (IBM)
5. Especializacion DAX para Analisis de Negocios (Udemy)

Justificacion:
- Refuerzan el vector actual: Data + Analytics + Cybersecurity aplicada.
- Muestran credenciales recientes (2024-2025) y orientadas a ejecucion profesional.
- Generan lectura de confianza para roles de data systems, BI y seguridad operativa.

### Supporting (contexto tecnico complementario)
1. Python Essentials (Cisco)
2. Introduccion a la Ciberseguridad (Cisco)
3. IA Generativa Prompt Engineering con ChatGPT (Udemy)
4. Data Visualization with Power BI (Great Learning)
5. Excel Avanzado (Zegel IPAE)

Justificacion:
- Amplian profundidad operativa y tooling.
- Aportan continuidad al discurso sin saturar la primera capa.

### Archive (historial completo)
- Resto de credenciales historicas preservadas para verificabilidad total.
- Se muestran solo en modal de archivo para evitar sobrecarga perceptual.

## Carga y Rendimiento
- No se renderiza el archive en vista inicial.
- Se usa `loading="lazy"` para previews.
- El visor detalle carga el asset full solo al abrir lightbox.
- Se generaron thumbs reales en `/public/certifications/thumbs/{featured|supporting|archive}`.
- Los assets full quedaron curados en `/public/certifications/full/{featured|supporting|archive}`.

## Alineacion Canonica
- El dominio de trust layer mantiene consistencia con el contenido canonico de perfil.
- La seleccion editorial prioriza posicionamiento actual y no reemplaza historial.

## Riesgo residual
- Actualmente los thumbs no estan generados en disco; la UI hace fallback a full.
- Recomendacion operativa: generar thumbs reales para completar optimizacion de transferencia inicial.
