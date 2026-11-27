import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { DATASET_STATUS } from '@/data/api'
import type { Measure, Provenance } from '@/data/types'
import { cn } from '@/lib/utils'
import { fmt } from '@/lib/format'

export const PROVENANCE_META: Record<Provenance, { label: string; short: string; className: string; description: string }> = {
  measured: {
    label: 'Measured',
    short: 'LAB',
    className: 'bg-sage text-forest border-mint-dim',
    description: 'Laboratory or field measurement on actual samples.',
  },
  literature: {
    label: 'Literature',
    short: 'LIT',
    className: 'bg-surface-lowest text-on-surface-variant border-outline-variant',
    description: 'Taken from published sources; citation attached in the evidence register.',
  },
  estimated: {
    label: 'Estimated',
    short: 'EST',
    className: 'bg-amber-soft text-amber-ink border-amber/40',
    description: 'Modelled, calculated by difference or estimated from surveys.',
  },
  demo: {
    label: 'Demo',
    short: 'DEMO',
    className: 'bg-surface-high text-on-surface-variant border-dashed border-outline',
    description: 'Placeholder value for demonstration only.',
  },
}

/** Compact provenance tag. Tooltip explains the class and the demo status. */
export function ProvenanceTag({ kind, className, full = false }: { kind: Provenance; className?: string; full?: boolean }) {
  const meta = PROVENANCE_META[kind]
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          className={cn(
            'inline-flex h-[18px] shrink-0 cursor-help items-center rounded border px-1.5 font-data text-[10px] leading-none font-medium tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-sage',
            meta.className,
            className,
          )}
          aria-label={`${meta.label} data class${DATASET_STATUS.simulated ? ', simulated value' : ''}`}
        >
          {full ? meta.label : meta.short}
          {DATASET_STATUS.simulated && kind !== 'demo' && <span className="ml-0.5 opacity-60">*</span>}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-64">
        <p className="font-medium">{meta.label}</p>
        <p className="opacity-80">{meta.description}</p>
        {DATASET_STATUS.simulated && kind !== 'demo' && (
          <p className="mt-1 opacity-80">* Simulated in this prototype — not a verified value.</p>
        )}
      </TooltipContent>
    </Tooltip>
  )
}

/** A value with unit, optional range and provenance tag. */
export function MeasureValue({ m, digits = 1, showRange = false, className }: { m: Measure; digits?: number; showRange?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-1', className)}>
      <span className="type-data text-on-surface">{fmt(m.value, digits)}</span>
      <span className="text-xs text-muted-foreground">{m.unit}</span>
      {showRange && m.range && (
        <span className="type-data text-[11px] text-muted-foreground">
          ({fmt(m.range[0], digits)}–{fmt(m.range[1], digits)})
        </span>
      )}
      <ProvenanceTag kind={m.provenance} className="self-center" />
    </span>
  )
}

export function ProvenanceLegend({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground', className)}>
      <span className="type-eyebrow text-outline">Data provenance</span>
      {(Object.keys(PROVENANCE_META) as Provenance[]).map((k) => (
        <span key={k} className="inline-flex items-center gap-1.5">
          <ProvenanceTag kind={k} />
          {PROVENANCE_META[k].label}
        </span>
      ))}
      {DATASET_STATUS.simulated && <span>* simulated in this prototype</span>}
    </div>
  )
}

export function DemoChip({ className, label = DATASET_STATUS.label }: { className?: string; label?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          tabIndex={0}
          className={cn('inline-flex cursor-help items-center rounded-full bg-mint px-2.5 py-1 text-xs font-medium text-on-mint outline-none focus-visible:ring-2 focus-visible:ring-brand', className)}
        >
          {label}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-72">{DATASET_STATUS.description}</TooltipContent>
    </Tooltip>
  )
}
