import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

const chapterKindCopy = {
  immersive: 'Capitulo inmersivo',
  reading: 'Capitulo de lectura',
}

const pathToSection = (pathname) => {
  const segments = pathname.split('/').filter(Boolean)
  return segments[0] || 'home'
}

export default function NavigationShell({ items }) {
  const pathname = usePathname()
  const router = useRouter()
  const activeSectionId = useMemo(() => {
    const section = pathToSection(pathname)
    if (items.find((item) => item.id === section)) return section
    return 'home'
  }, [pathname, items])
  const activeIndex = useMemo(() => {
    const index = items.findIndex((item) => item.id === activeSectionId)
    return index >= 0 ? index : 0
  }, [activeSectionId, items])

  const activeItem = items[activeIndex] ?? items[0]
  const nextItem = items[activeIndex + 1] ?? null
  const progress = ((activeIndex + 1) / Math.max(1, items.length)) * 100

  const navigateTo = (sectionId) => {
    router.push(sectionId === 'home' ? '/' : `/${sectionId}`)
  }

  return (
    <>
      <aside className="pointer-events-none fixed left-0 top-0 z-50 hidden h-screen w-[86px] md:flex md:items-center md:justify-center lg:w-[104px]">
        <nav
          aria-label="Navegacion principal por capitulos"
          className="pointer-events-auto relative flex h-[70vh] w-[58px] flex-col items-center rounded-[1.7rem] border border-white/7 bg-slate-950/22 px-2 py-4 backdrop-blur-xl lg:w-[66px]"
        >
          <div className="mb-4 h-1.5 w-1.5 rounded-full bg-cyan-200/60" />

          <div className="relative flex-1">
            <div className="absolute left-1/2 top-2 h-[calc(100%-16px)] w-px -translate-x-1/2 bg-white/10" />
            <div
              className="absolute left-1/2 top-2 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/80 to-blue-400/80 transition-[height] duration-500 motion-reduce:transition-none"
              style={{ height: `calc((100% - 16px) * ${progress / 100})` }}
            />

            <ol className="relative flex h-full flex-col justify-between">
              {items.map((item) => {
                const isActive = item.id === activeSectionId
                const isCompleted = items.findIndex((candidate) => candidate.id === item.id) < activeIndex

                return (
                  <li key={item.id} className="relative flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => navigateTo(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={`${item.label} - ${chapterKindCopy[item.kind]}`}
                      className={[
                        'group relative flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 motion-reduce:transition-none',
                        isActive
                          ? 'border-cyan-300/52 bg-cyan-400/16 shadow-lg shadow-cyan-500/10'
                          : isCompleted
                            ? 'border-cyan-300/22 bg-cyan-500/8 hover:border-cyan-200/30'
                            : 'border-white/12 bg-slate-900/45 hover:border-white/24',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'h-2 w-2 rounded-full transition-colors duration-300 motion-reduce:transition-none',
                          isActive ? 'bg-cyan-200' : isCompleted ? 'bg-cyan-300/70' : 'bg-gray-300/60',
                        ].join(' ')}
                      />

                      <span
                        className={[
                          'pointer-events-none absolute left-[42px] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] backdrop-blur-md lg:block',
                          isActive
                            ? 'border-cyan-200/25 bg-slate-900/85 text-cyan-100 opacity-100'
                            : 'border-white/8 bg-slate-900/75 text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none',
                        ].join(' ')}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="mt-4 w-full border-t border-white/7 pt-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-300/82">{Math.round(progress)}%</p>
          </div>
        </nav>
      </aside>

      <nav
        aria-label="Navegacion movil por capitulos"
        className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-white/8 bg-slate-950/62 p-2 backdrop-blur-2xl md:hidden"
      >
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {items.map((item) => {
            const isActive = item.id === activeSectionId

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'shrink-0 rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 motion-reduce:transition-none',
                  isActive
                    ? 'border-cyan-300/38 bg-cyan-500/16 text-cyan-100'
                    : 'border-white/12 bg-white/4 text-gray-300',
                ].join(' ')}
              >
                {item.shortLabel ?? item.label}
              </button>
            )
          })}
        </div>

        <div className="mt-1 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.14em] text-gray-300">
          <span>{chapterKindCopy[activeItem.kind]}</span>
          <span className="flex items-center gap-1 text-cyan-100/85">
            {nextItem ? `Siguiente ${nextItem.shortLabel ?? nextItem.label}` : 'Recorrido completo'}
            {nextItem && <ChevronRight size={11} />}
          </span>
        </div>
      </nav>
    </>
  )
}