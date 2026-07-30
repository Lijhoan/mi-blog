import type { ProjectGlyphKind } from '@/content/profile/profile.types'

type GlyphProps = {
  kind?: ProjectGlyphKind
  className?: string
}

/**
 * Glifos dot-matrix estilo Nothing para las fichas de proyecto.
 * Dibujan con currentColor (se adaptan al tema); el rojo señal usa var(--accent).
 */

const DOT = 7 // lado del punto cuadrado
const PITCH = 12 // separación entre centros

function dots(columnHeights: number[], baseY: number) {
  const rects: { x: number; y: number }[] = []
  columnHeights.forEach((height, col) => {
    for (let row = 0; row < height; row += 1) {
      rects.push({ x: col * PITCH, y: baseY - row * PITCH })
    }
  })
  return rects
}

// BI / analítica: barras de puntos; el pico lleva el punto rojo.
function AnalyticsGlyph() {
  const heights = [3, 5, 8, 6, 10]
  const baseY = 112
  const all = dots(heights, baseY)
  const peakCol = heights.indexOf(Math.max(...heights))
  const peakY = baseY - (heights[peakCol] - 1) * PITCH

  return (
    <svg width="100%" height="100%" viewBox="0 0 132 132" aria-hidden="true">
      <g transform="translate(36, 6)">
        {all.map(({ x, y }) => {
          const isPeak = x === peakCol * PITCH && y === peakY
          return <rect key={`${x}-${y}`} x={x} y={y} width={DOT} height={DOT} fill={isPeak ? 'var(--accent)' : 'currentColor'} opacity={isPeak ? 1 : 0.8} />
        })}
      </g>
      <line x1="24" y1="125" x2="108" y2="125" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  )
}

// Banca / auditoría: libro mayor de filas punteadas, append-only con cursor rojo.
function BankingGlyph() {
  const rows = [7, 7, 7, 7, 4]

  return (
    <svg width="100%" height="100%" viewBox="0 0 132 132" aria-hidden="true">
      <rect x="16.5" y="16.5" width="99" height="99" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      <g transform="translate(28, 30)">
        {rows.map((count, rowIndex) => (
          <g key={rowIndex}>
            {Array.from({ length: count }, (_, col) => (
              <rect key={col} x={col * PITCH} y={rowIndex * 18} width={DOT} height={DOT} fill="currentColor" opacity="0.8" />
            ))}
            {rowIndex === rows.length - 1 && (
              <rect x={count * PITCH} y={rowIndex * 18} width={DOT} height={DOT} fill="var(--accent)" />
            )}
          </g>
        ))}
      </g>
    </svg>
  )
}

// Automatización: retícula de precisión con centro rojo y satélite en órbita.
function AutomationGlyph() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 132 132" aria-hidden="true">
      <circle cx="66" cy="66" r="42" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="66" cy="66" r="20" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 5" />
      {[
        [66, 12, 66, 24],
        [66, 108, 66, 120],
        [12, 66, 24, 66],
        [108, 66, 120, 66],
      ].map(([x1, y1, x2, y2]) => (
        <line key={`${x1}-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.55" strokeWidth="1" />
      ))}
      <rect x="62.5" y="62.5" width={DOT} height={DOT} fill="var(--accent)" />
      <rect x="92" y="34" width={DOT} height={DOT} fill="currentColor" opacity="0.8" />
    </svg>
  )
}

// Genérico (proyectos futuros): retícula de cruces con señal central.
function GenericGlyph() {
  const positions = [24, 66, 108]

  return (
    <svg width="100%" height="100%" viewBox="0 0 132 132" aria-hidden="true">
      {positions.flatMap((y) =>
        positions.map((x) => (
          <g key={`${x}-${y}`} stroke="currentColor" strokeOpacity="0.55" strokeWidth="1">
            <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
            <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
          </g>
        )),
      )}
      <rect x="62.5" y="62.5" width={DOT} height={DOT} fill="var(--accent)" />
    </svg>
  )
}

const GLYPHS: Record<ProjectGlyphKind, () => ReturnType<typeof GenericGlyph>> = {
  analytics: AnalyticsGlyph,
  banking: BankingGlyph,
  automation: AutomationGlyph,
  generic: GenericGlyph,
}

export default function ProjectGlyph({ kind = 'generic', className }: GlyphProps) {
  const Glyph = GLYPHS[kind] ?? GenericGlyph

  return (
    <span className={['block', className ?? ''].join(' ')}>
      <Glyph />
    </span>
  )
}
