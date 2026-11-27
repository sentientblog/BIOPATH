import { useState } from 'react'
import { useWidth } from './use-width'
import { ChartTooltip } from './chart-tooltip'

export interface BarSeries {
  key: string
  label: string
  color: string
  values: number[]
  format?: (v: number) => string
}

/**
 * Grouped vertical bar chart in the style of the Stitch "Intelligence overview":
 * dashed gridlines, rounded 4px bars, muted axis labels.
 */
export function GroupedBarChart({
  categories,
  series,
  height = 240,
  yMax,
  yTicks = 4,
  yFormat = (v) => `${v}`,
  ariaLabel,
  onSelect,
  selectedIndex,
}: {
  categories: string[]
  series: BarSeries[]
  height?: number
  yMax?: number
  yTicks?: number
  yFormat?: (v: number) => string
  ariaLabel: string
  onSelect?: (index: number) => void
  selectedIndex?: number
}) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const [hover, setHover] = useState<number | null>(null)
  const pad = { top: 12, right: 8, bottom: 28, left: 40 }
  const max = yMax ?? Math.max(1, ...series.flatMap((s) => s.values)) * 1.1
  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom
  const groupW = innerW / Math.max(1, categories.length)
  const barW = Math.min(24, (groupW * 0.62) / series.length)
  const gap = 4
  const y = (v: number) => pad.top + innerH - (v / max) * innerH
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (max / yTicks) * i)
  const narrow = groupW < 64

  return (
    <div ref={ref} className="relative w-full">
      <svg width={width} height={height} role="img" aria-label={ariaLabel} className="block text-on-surface-variant">
        {ticks.map((t, i) => (
          <g key={i}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={y(t)}
              y2={y(t)}
              stroke="currentColor"
              strokeOpacity={i === 0 ? 0.25 : 0.12}
              strokeDasharray={i === 0 ? undefined : '3 3'}
            />
            <text x={pad.left - 8} y={y(t) + 4} fontSize="11" textAnchor="end" fill="currentColor" className="tnum">
              {yFormat(Math.round(t))}
            </text>
          </g>
        ))}
        {categories.map((c, ci) => {
          const gx = pad.left + groupW * ci + groupW / 2
          const total = series.length * barW + (series.length - 1) * gap
          const active = hover === ci || selectedIndex === ci
          return (
            <g
              key={c}
              onMouseEnter={() => setHover(ci)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect?.(ci)}
              style={{ cursor: onSelect ? 'pointer' : 'default' }}
            >
              <rect x={pad.left + groupW * ci} y={pad.top} width={groupW} height={innerH} fill={active ? 'var(--surface-container-low)' : 'transparent'} rx={6} />
              {series.map((s, si) => {
                const v = s.values[ci] ?? 0
                const bx = gx - total / 2 + si * (barW + gap)
                return <rect key={s.key} x={bx} y={y(v)} width={barW} height={Math.max(0, y(0) - y(v))} rx={4} fill={s.color} className="transition-[y,height] duration-500 motion-reduce:transition-none" />
              })}
              <text x={gx} y={height - 8} fontSize="11" textAnchor="middle" fill="currentColor" fontWeight={selectedIndex === ci ? 600 : 400}>
                {narrow && c.length > 9 ? `${c.slice(0, 8)}…` : c}
              </text>
            </g>
          )
        })}
      </svg>
      {hover !== null && (
        <ChartTooltip x={pad.left + groupW * hover + groupW / 2} y={pad.top} containerWidth={width}>
          <p className="mb-1 font-semibold text-on-surface">{categories[hover]}</p>
          {series.map((s) => (
            <p key={s.key} className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 text-on-surface-variant">
                <span className="size-2 rounded-sm" style={{ background: s.color }} />
                {s.label}
              </span>
              <span className="type-data text-on-surface">{s.format ? s.format(s.values[hover]) : s.values[hover]}</span>
            </p>
          ))}
        </ChartTooltip>
      )}
      {/* Accessible data table fallback */}
      <table className="sr-only">
        <caption>{ariaLabel}</caption>
        <thead>
          <tr>
            <th>Category</th>
            {series.map((s) => (
              <th key={s.key}>{s.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={c}>
              <td>{c}</td>
              {series.map((s) => (
                <td key={s.key}>{s.values[i]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
