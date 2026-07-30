'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

const pathToSection = (pathname) => {
  const segments = pathname.split('/').filter(Boolean)
  return segments[0] || 'home'
}

export default function NavigationShell({ items }) {
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const activeSectionId = useMemo(() => {
    const section = pathToSection(pathname)
    return items.some((item) => item.id === section) ? section : 'home'
  }, [pathname, items])

  const links = items.filter((item) => item.id !== 'contact')
  const contact = items.find((item) => item.id === 'contact')

  const navigateTo = (sectionId) => {
    router.push(sectionId === 'home' ? '/' : `/${sectionId}`)
  }

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed left-1/2 top-4 z-50 flex max-w-[94vw] -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-full border border-line bg-bg/60 px-2 py-1.5 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:top-5"
    >
      {/* Logo: dot rojo + iniciales */}
      <button
        type="button"
        onClick={() => navigateTo('home')}
        aria-label="Inicio"
        className="mr-1 flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-2 py-1.5"
      >
        <span className="h-2 w-2 rounded-full bg-accent" />
        <span className="text-[11px] font-bold tracking-[0.14em] text-ink">LM</span>
      </button>

      {links.map((item) => {
        const isActive = item.id === activeSectionId

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => navigateTo(item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'shrink-0 cursor-pointer rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] transition-colors duration-200',
              // En móvil el logo LM ya lleva a inicio; se libera espacio de la pill
              item.id === 'home' ? 'hidden sm:block' : '',
              isActive ? 'text-ink' : 'text-dim hover:text-ink',
            ].join(' ')}
          >
            {isActive && (
              <span aria-hidden="true" className="mr-1.5 inline-block h-1 w-1 -translate-y-px rounded-full bg-accent" />
            )}
            {item.shortLabel ?? item.label}
          </button>
        )
      })}

      {/* CTA final: pill sólida */}
      {contact && (
        <button
          type="button"
          onClick={() => navigateTo('contact')}
          aria-current={activeSectionId === 'contact' ? 'page' : undefined}
          className="ml-1 shrink-0 cursor-pointer rounded-full bg-ink px-4 py-1.5 text-[11px] uppercase tracking-[0.08em] text-bg transition-colors duration-200 hover:bg-accent hover:text-white"
        >
          {contact.shortLabel ?? contact.label}
        </button>
      )}

      {/* Toggle de tema oscuro/claro */}
      <button
        type="button"
        onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        aria-label={mounted && resolvedTheme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        className="ml-0.5 flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-dim transition-colors duration-200 hover:border-accent hover:text-ink"
      >
        {mounted && resolvedTheme === 'light' ? <Moon size={12} /> : <Sun size={12} />}
      </button>
    </nav>
  )
}
