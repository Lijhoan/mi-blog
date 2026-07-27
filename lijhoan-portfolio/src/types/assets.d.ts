// Declaraciones ambientales de assets estáticos.
// Reemplazan las que aportaba `vite/client` antes de la consolidación en Next.js.
// Nota: en Next.js los imports de imagen devuelven en runtime un objeto
// StaticImageData; hoy el código las consume como string (baseline). La
// migración a `next/image` (Fase 6) corregirá el contrato de tipo y el render.

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.css'
