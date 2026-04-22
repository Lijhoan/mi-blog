import { useMemo } from 'react'
import { ChevronRight } from 'lucide-react'

const chapterKindCopy = {
  immersive: 'Capítulo inmersivo',
  reading: 'Capítulo de lectura',
}

export default function NavigationShell({ items, activeSectionId, onChangeSection }) {
  const activeIndex = useMemo(() => {
    const index = items.findIndex((item) => item.id === activeSectionId)
    return index >= 0 ? index : 0
  }, [activeSectionId, items])

  const activeItem = items[activeIndex] ?? items[0]
  const nextItem = items[activeIndex + 1] ?? null
  const progress = ((activeIndex + 1) / Math.max(1, items.length)) * 100

  return (
    <>
      <aside className="pointer-events-none fixed left-0 top-0 z-50 hidden h-screen w-[74px] md:flex md:items-center md:justify-center lg:w-[84px]">
        <nav
          aria-label="Navegación principal por capítulos"
          className="pointer-events-auto relative flex h-[64vh] w-[50px] flex-col items-center rounded-[1.4rem] border border-white/6 bg-slate-950/10 px-1.5 py-3 backdrop-blur-md lg:w-[56px]"
        >
          <div className="relative flex-1">
            <div className="absolute left-1/2 top-2 h-[calc(100%-16px)] w-px -translate-x-1/2 bg-white/7" />
            <div
              className="absolute left-1/2 top-2 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/55 to-blue-400/55 transition-[height] duration-500 motion-reduce:transition-none"
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
                      onClick={() => onChangeSection(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={`${item.label} - ${chapterKindCopy[item.kind]}`}
                      className={[
                        'relative flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 motion-reduce:transition-none',
                        isActive
                          ? 'border-cyan-300/42 bg-cyan-400/10'
                          : isCompleted
                            ? 'border-cyan-300/18 bg-cyan-500/6 hover:border-cyan-200/25'
                            : 'border-white/10 bg-slate-900/28 hover:border-white/20',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'h-2 w-2 rounded-full transition-colors duration-300 motion-reduce:transition-none',
                          isActive ? 'bg-cyan-200' : isCompleted ? 'bg-cyan-300/70' : 'bg-gray-300/60',
                        ].join(' ')}
                      />

                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="mt-3 w-full border-t border-white/6 pt-2 text-center">
            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-300/70">{Math.round(progress)}%</p>
          </div>
        </nav>
      </aside>

      <nav
        aria-label="Navegación móvil por capítulos"
        className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-white/7 bg-slate-950/45 p-2 backdrop-blur-xl md:hidden"
      >
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {items.map((item) => {
            const isActive = item.id === activeSectionId

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeSection(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'shrink-0 rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 motion-reduce:transition-none',
                  isActive
                    ? 'border-cyan-300/32 bg-cyan-500/12 text-cyan-100'
                    : 'border-white/10 bg-white/3 text-gray-300',
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
            {nextItem ? `Sigue ${nextItem.shortLabel ?? nextItem.label}` : 'Recorrido completo'}
            {nextItem && <ChevronRight size={11} />}
          </span>
        </div>
      </nav>
    </>
  )
}
