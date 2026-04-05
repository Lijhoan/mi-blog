import { useMemo } from 'react'
import { ChevronRight } from 'lucide-react'

const chapterKindCopy = {
  immersive: 'Immersive chapter',
  reading: 'Reading chapter',
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
      <aside className="pointer-events-none fixed left-0 top-0 z-50 hidden h-screen w-[86px] md:flex md:items-center md:justify-center lg:w-[104px]">
        <nav
          aria-label="Primary chapter navigation"
          className="pointer-events-auto relative flex h-[74vh] w-[68px] flex-col items-center rounded-[2rem] border border-white/10 bg-slate-950/45 px-2 py-5 backdrop-blur-2xl lg:w-[78px]"
        >
          <div className="mb-5 text-[10px] uppercase tracking-[0.28em] text-cyan-200/70">Nav</div>

          <div className="relative flex-1">
            <div className="absolute left-1/2 top-2 h-[calc(100%-16px)] w-px -translate-x-1/2 bg-white/15" />
            <div
              className="absolute left-1/2 top-2 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300 to-blue-400 transition-[height] duration-500 motion-reduce:transition-none"
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
                        'group relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 motion-reduce:transition-none',
                        isActive
                          ? 'border-cyan-300/70 bg-cyan-400/22 shadow-lg shadow-cyan-500/25'
                          : isCompleted
                            ? 'border-cyan-300/35 bg-cyan-500/15 hover:border-cyan-200/50'
                            : 'border-white/20 bg-slate-900/80 hover:border-white/40',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'h-2 w-2 rounded-full transition-colors duration-300 motion-reduce:transition-none',
                          isActive ? 'bg-cyan-200' : isCompleted ? 'bg-cyan-300/80' : 'bg-gray-300/70',
                        ].join(' ')}
                      />

                      <span
                        className={[
                          'pointer-events-none absolute left-[42px] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] backdrop-blur-md lg:block',
                          isActive
                            ? 'border-cyan-200/30 bg-slate-900/90 text-cyan-100 opacity-100'
                            : 'border-white/10 bg-slate-900/80 text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none',
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

          <div className="mt-5 w-full space-y-2 border-t border-white/10 pt-3 text-center">
            <p className="text-[10px] uppercase tracking-[0.24em] text-gray-300">{Math.round(progress)}%</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">{activeItem.kind === 'immersive' ? 'Immersive' : 'Reading'}</p>
          </div>
        </nav>
      </aside>

      <nav
        aria-label="Mobile chapter navigation"
        className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-white/10 bg-slate-950/70 p-2.5 backdrop-blur-2xl md:hidden"
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
                  'shrink-0 rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 motion-reduce:transition-none',
                  isActive
                    ? 'border-cyan-300/45 bg-cyan-500/20 text-cyan-100'
                    : 'border-white/15 bg-white/5 text-gray-300',
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
            {nextItem ? `Next ${nextItem.shortLabel ?? nextItem.label}` : 'Journey complete'}
            {nextItem && <ChevronRight size={11} />}
          </span>
        </div>
      </nav>
    </>
  )
}
