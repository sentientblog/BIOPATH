import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { DemoChip } from './provenance'
import { Icon } from './icon'

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string
  title: string
  description?: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <section className={cn('flex flex-col justify-between gap-6 pt-6 lg:flex-row lg:items-end', className)}>
      <div className="max-w-3xl space-y-2.5">
        {eyebrow && (
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-brand" />
            <span className="type-eyebrow text-brand-strong">{eyebrow}</span>
          </div>
        )}
        <h1 className="type-headline text-on-surface">{title}</h1>
        {description && <p className="text-base text-on-surface-variant">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-3">{actions}</div>}
    </section>
  )
}

export function SectionHeader({
  title,
  description,
  badge,
  actions,
  className,
  as: As = 'h2',
}: {
  title: string
  description?: ReactNode
  badge?: ReactNode
  actions?: ReactNode
  className?: string
  as?: 'h2' | 'h3'
}) {
  return (
    <div className={cn('flex flex-wrap items-start justify-between gap-3', className)}>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <As className="type-title font-sans text-on-surface">{title}</As>
          {badge}
        </div>
        {description && <p className="mt-0.5 text-sm text-on-surface-variant">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

/** White data panel: 1px hairline border, 12px radius, 24px padding. */
export function Panel({ className, children, padded = true, ...rest }: React.ComponentProps<'div'> & { padded?: boolean }) {
  return (
    <div className={cn('rounded-xl border border-hairline bg-card shadow-card', padded && 'p-5 sm:p-6', className)} {...rest}>
      {children}
    </div>
  )
}

export function StatCard({
  label,
  value,
  icon,
  delta,
  deltaTone = 'brand',
  footnote,
}: {
  label: string
  value: ReactNode
  icon?: string
  delta?: ReactNode
  deltaTone?: 'brand' | 'muted' | 'amber' | 'risk'
  footnote?: ReactNode
}) {
  const tone = { brand: 'text-brand-strong', muted: 'text-on-surface-variant', amber: 'text-amber-ink', risk: 'text-risk' }[deltaTone]
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-hairline bg-card p-5 shadow-card transition-shadow hover:shadow-float sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="type-eyebrow text-on-surface-variant">{label}</span>
        {icon && <Icon name={icon} className="text-brand-strong" />}
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <span className="type-headline tnum text-on-surface">{value}</span>
        {delta && <span className={cn('type-data', tone)}>{delta}</span>}
      </div>
      {footnote && <div className="-mt-2 text-xs text-muted-foreground">{footnote}</div>}
    </div>
  )
}

export function EmptyState({
  icon = 'search_off',
  title,
  description,
  action,
  className,
}: {
  icon?: string
  title: string
  description?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-outline-variant bg-surface-low px-6 py-12 text-center', className)}>
      <span className="grid size-11 place-items-center rounded-full bg-sage text-brand-strong">
        <Icon name={icon} size={22} />
      </span>
      <div className="space-y-1">
        <p className="font-semibold text-on-surface">{title}</p>
        {description && <p className="max-w-md text-sm text-on-surface-variant">{description}</p>}
      </div>
      {action}
    </div>
  )
}

export function ErrorState({ title = 'This data couldn’t load', description = 'The request failed. Try again in a moment.', action }: { title?: string; description?: string; action?: ReactNode }) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center gap-3 rounded-xl border border-risk/30 bg-risk-soft/40 px-6 py-12 text-center">
      <span className="grid size-11 place-items-center rounded-full bg-risk-soft text-risk-ink">
        <Icon name="error" size={22} />
      </span>
      <div className="space-y-1">
        <p className="font-semibold text-on-surface">{title}</p>
        <p className="max-w-md text-sm text-on-surface-variant">{description}</p>
      </div>
      {action}
    </div>
  )
}

export function StatusPill({ tone = 'sage', children, className }: { tone?: 'sage' | 'neutral' | 'amber' | 'risk' | 'outline'; children: ReactNode; className?: string }) {
  const t = {
    sage: 'bg-mint text-on-mint',
    neutral: 'bg-surface-high text-on-surface-variant',
    amber: 'bg-amber-soft text-amber-ink',
    risk: 'bg-risk-soft text-risk-ink',
    outline: 'border border-hairline bg-card text-on-surface',
  }[tone]
  return <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap', t, className)}>{children}</span>
}

/** Horizontal score bar 0–100 with tabular value. */
export function ScoreBar({ value, max = 100, tone = 'brand', showValue = true, className, label }: { value: number; max?: number; tone?: 'brand' | 'amber' | 'risk' | 'mint'; showValue?: boolean; className?: string; label?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const bar = { brand: 'bg-brand', amber: 'bg-amber', risk: 'bg-risk', mint: 'bg-mint-dim' }[tone]
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-high"
        role="meter"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div className={cn('h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none', bar)} style={{ width: `${pct}%` }} />
      </div>
      {showValue && <span className="type-data w-8 text-right text-on-surface">{Math.round(value)}</span>}
    </div>
  )
}

export const scoreTone = (v: number): 'brand' | 'amber' | 'risk' => (v >= 65 ? 'brand' : v >= 40 ? 'amber' : 'risk')

export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  label,
  className,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: ReactNode }[]
  label: string
  className?: string
}) {
  return (
    <div role="radiogroup" aria-label={label} className={cn('inline-flex rounded-lg border border-hairline bg-surface-low p-0.5', className)}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand',
            value === o.value ? 'bg-card text-on-surface shadow-card' : 'text-on-surface-variant hover:text-on-surface',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/** Labelled range slider styled to the design system. */
export function RangeField({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = (v: number) => String(v),
  hint,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  format?: (v: number) => string
  hint?: string
}) {
  const fill = ((value - min) / (max - min)) * 100
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-on-surface">
          {label}
        </label>
        <span className="type-data text-brand-strong">{format(value)}</span>
      </div>
      <input
        id={id}
        type="range"
        className="bp-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ['--fill' as string]: `${fill}%` }}
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}
