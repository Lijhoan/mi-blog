import type { CertificationGroup } from '../profile/profile.types'

export const certificationGroups: CertificationGroup[] = [
  {
    title: 'Diplomado en Cloud Data Engineering',
    items: ['GCP', 'Azure', 'AWS', 'Por culminar'],
  },
  {
    title: 'Ingeniería de Sistemas e Informática',
    items: ['Universidad Tecnológica del Perú', 'En curso'],
  },
  {
    title: 'Cisco Networking Academy',
    items: [
      'Gestión de Amenazas Cibernéticas (Noviembre 2025)',
      'Defensa de la Red / Network Defense (Noviembre 2025)',
      'Seguridad de Terminales / Endpoint Security (Octubre 2025)',
      'Introducción a la Ciberseguridad (Agosto 2025)',
    ],
  },
  {
    title: 'Otras Certificaciones Especializadas',
    items: [
      'IA Generativa y Prompt Engineering con ChatGPT-4 (Udemy, 2025)',
      'Python Essentials 1 (Cisco Networking Academy, 2025)',
      'Especialización en Lenguaje DAX para Análisis de Negocios (Udemy, 2025)',
    ],
  },
]
