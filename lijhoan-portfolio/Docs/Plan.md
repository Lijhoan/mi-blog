🗺️ Roadmap Arquitectónico: Portafolio Inmersivo "Awwwards Level"

Objetivo: Construir un ecosistema web inmersivo, interactivo y de alto rendimiento que fusione Scrollytelling, WebGL y consumo de datos dinámicos, demostrando capacidades de Full Stack, Cloud Data Engineering y Frontend avanzado.

🏛️ 1. Visión y Referencias de Inspiración (El "Target")

Para alcanzar el nivel de desarrollo de agencias top, basaremos la UX/UI y el motor de renderizado en estos paradigmas:

Orano Group (Experience): Referencia principal para Scrollytelling horizontal. Usaremos GSAP para secuestrar el scroll vertical y traducirlo en un viaje en el eje X (Slider inmersivo).

Species in Pieces: Referencia para transiciones matemáticas y WebGL. Inspiración para morphing de polígonos usando CSS avanzado o React Three Fiber.

Brittany Chiang / Brian Ruiz: Referencias para la limpieza tipográfica y estructura de datos. El modo en que presentan el código, los tags tecnológicos y el contraste visual (Dark Mode profundo).

🛠️ 2. Stack Tecnológico Definitivo (The "Awwwards" Stack)

Capa de Experiencia (Frontend & WebGL)

Framework Core: Next.js 15 (App Router) + React 19 + TypeScript.

Styling Engine: Tailwind CSS + clsx + tailwind-merge + framer-motion (Microinteracciones de UI).

Physics & Scroll: @studio-freight/lenis (Smooth scroll lineal) + GSAP Core + ScrollTrigger (Sincronización DOM-Scroll).

Motor Gráfico (3D): three + @react-three/fiber (R3F) + @react-three/drei (Helpers WebGL).

State Management: Zustand (Manejo de estado del scroll global y carga de texturas).

Capa de Datos y Backend (Data Engineering)

Backend/BFF: Next.js API Routes (Route Handlers) o un microservicio en NestJS (aprovechando tu experiencia en TALE SignRoom).

Base de Datos: PostgreSQL 16 alojado en contenedor.

ORM: Prisma 5 (Tipado estricto desde la DB hasta el frontend).

Infraestructura: Podman / Docker Compose sobre Rocky Linux 9.7 (Hosting propio para Backend/DB) y Vercel (Edge Network para Frontend).

🚀 3. Fases de Ejecución del Roadmap

Fase 1: Setup del Entorno y Foundations (Semanas 1-2)

El objetivo es levantar la infraestructura base sin tocar UI.

Inicialización de Monorepo / Proyecto: Configurar Next.js 15 con el App Router. Configurar ESLint y Prettier estrictos.

Infraestructura DB (Podman): Escribir el docker-compose.yml para levantar PostgreSQL.

Schema Design (Prisma): Crear los modelos Project, Experience, Skill, Metric (para consumir desde el dashboard de Power BI). Ejecutar migraciones iniciales.

Agentes IA - Setup: Configurar Cursor IDE. Crear el archivo .cursorrules con directivas estrictas: "Usa siempre Server Components en Next.js por defecto. Solo usa 'use client' en componentes de GSAP o R3F".

Fase 2: Motor de Scrollytelling y Físicas (Semanas 3-4)

El core de la experiencia. Aquí ocurre la magia estilo "Orano".

Integración de Lenis: Secuestrar el scroll nativo. Implementar una función de interpolación lineal (Lerp) en el requestAnimationFrame global.

Arquitectura de Layout Layout: Construir un componente contenedor (Ej: <ScrollyTellingContainer />) que fije la pantalla (position: sticky o fixed) con una altura de 400vh.

GSAP ScrollTrigger: Mapear el progreso del scroll (0 a 1). Mover el contenedor principal en el eje X usando transform: translateX(-100vw) atado al scroll vertical.

Agentes IA - Tarea: Pedir a Claude 3.5 Sonnet (vía Cursor): "Genera un hook personalizado useIsomorphicLayoutEffect para inicializar GSAP ScrollTrigger en Next.js 15, evitando errores de hidratación y limpiando las instancias (ctx.revert) en el unmount".

Fase 3: Integración Gráfica (WebGL) y Shaders (Semanas 5-6)

Llevar el sitio al nivel "Species in Pieces" usando React Three Fiber.

Setup R3F Canvas: Superponer un <Canvas /> de Three.js con pointer-events: none sobre toda la pantalla.

Materiales Personalizados (Shaders): Escribir Vertex Shaders (.vert) para deformaciones matemáticas y Fragment Shaders (.frag) para efectos de ruido visual (Perlin Noise) o partículas que reaccionan al mouse.

Sincronización DOM-WebGL: Usar el estado de Zustand para pasar la posición de los divs del DOM HTML al Canvas 3D (para que los objetos 3D sigan al texto).

Agentes IA - Tarea: Promptear: "Actúa como un experto en GLSL. Crea un shader material en React Three Fiber que tome una textura base y genere un efecto de distorsión de ruido (simplex noise) que aumente su intensidad basada en un uniform 'uSpeed' ligado a la velocidad del scroll de Lenis".

Fase 4: Integración de Datos Dinámicos y Power BI (Semana 7)

Conectar tu faceta de Data Engineer y BI Analyst al frontend.

API Integration: Crear Server Actions en Next.js para hacer fetch a Prisma y traer tus proyectos (TALE SignRoom, JarvisBank, etc.).

Embed de BI (El "Efecto Wow"): Integrar la API de Power BI Embedded en una de las "estaciones" del scroll horizontal. Cuando el usuario llegue a la sección de "Business Intelligence", se inicializa de forma asíncrona (Lazy Loading) un dashboard real e interactivo.

Telemetry: Implementar analíticas propias (guardadas en tu PostgreSQL) para saber en qué sección del scrollytelling los reclutadores pasan más tiempo.

Fase 5: Optimización, Seguridad y Despliegue (Semana 8)

Cerrar el proyecto con estándares corporativos.

Performance Profiling: Asegurar que el uso de memoria de WebGL no tenga "leaks". Auditar con Lighthouse (Target: 90+ en Performance, 100 en SEO).

Dynamic Imports: Usar next/dynamic para que la carga inicial de Three.js y GSAP no bloquee el First Contentful Paint (FCP).

Pipeline CI/CD: Github Actions para correr builds.

Deploy: Desplegar el cliente en la Edge Network de Vercel (garantizando latencia baja) y conectar de forma segura (con IP whitelisting) a tu base de datos y backend en tu servidor Rocky Linux / Podman.

🤖 4. Master Prompts para el Desarrollo Asistido (Cursor / Copilot)

Para no perder tiempo en la "fontanería" del código y enfocarte en la arquitectura, usa estos prompts estructurados en tu IDE:

Para el Scroll Suave (Lenis + GSAP):

"Genera un proveedor de contexto (SmoothScrollProvider.tsx) usando @studio-freight/lenis en React 19. Configura el Lerp a 0.08 para una fricción pesada y profesional. Integra gsap.ticker.add para sincronizar el requestAnimationFrame de GSAP con Lenis. Asegúrate de tipar todo correctamente con TypeScript."

Para el Slider Estilo Orano:

"Crea un componente cliente en Next.js llamado <HorizontalGallery />. Debe recibir un array de nodos React. Usa GSAP ScrollTrigger para crear una animación donde el componente contenedor haga un 'pin' en la pantalla y mueva su contenido en el eje X (translateX) en proporción al scroll vertical del usuario. Calcula el ancho total dinámicamente usando ref.current.scrollWidth."

Para la Arquitectura de Datos (Prisma):

"Escribe el schema.prisma para mi portafolio. Necesito modelos para Project, TechStack, y Role. Crea relaciones muchos a muchos entre Project y TechStack. Añade campos para almacenar URLs de repositorios, URLs de demos y un campo JSONB para métricas de impacto empresarial (ej. reducción de costos, tiempo ahorrado)."