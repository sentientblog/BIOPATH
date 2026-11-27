import type { ReactNode } from 'react'

export function ChartTooltip({ x, y, children, containerWidth }: { x: number; y: number; children: ReactNode; containerWidth: number }) {
  const flip = x > containerWidth - 180
  return (
    <div
      className="pointer-events-none absolute z-10 min-w-36 rounded-lg border border-hairline bg-card px-3 py-2 text-xs shadow-float"
      style={{ left: flip ? undefined : x + 12, right: flip ? containerWidth - x + 12 : undefined, top: Math.max(0, y - 12) }}
      role="status"
    >
      {children}
    </div>
  )
}

export function LegendSwatch({ color, label, muted = false }: { color: string; label: ReactNode; muted?: boolean }) {
  return (
    <span className={muted ? 'inline-flex items-center gap-1.5 text-on-surface-variant' : 'inline-flex items-center gap-1.5 text-on-surface'}>
      <span className="size-2.5 shrink-0 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  )
}
