import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Icon } from '@/components/common/icon'
import { FEEDSTOCKS } from '@/data/feedstocks'
import { PATHWAYS } from '@/data/pathways'
import { END_USES } from '@/data/end-uses'
import { ALL_NAV_ITEMS } from '@/lib/navigation'
import { cn } from '@/lib/utils'

type Result = { id: string; group: string; label: string; meta: string; icon: string; go: () => void }

/** Command-palette style search across feedstocks, pathways, end-uses and modules. ⌘K / Ctrl+K. */
export function GlobalSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [index, setIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!open) {
      setQ('')
      setIndex(0)
    }
  }, [open])

  const results = useMemo<Result[]>(() => {
    const term = q.trim().toLowerCase()
    const match = (...s: string[]) => !term || s.some((x) => x.toLowerCase().includes(term))
    const close = () => onOpenChange(false)
    const out: Result[] = []
    FEEDSTOCKS.filter((f) => match(f.name, f.category, f.sourceType, ...f.tags))
      .slice(0, term ? 8 : 4)
      .forEach((f) =>
        out.push({ id: `f-${f.id}`, group: 'Feedstocks', label: f.name, meta: f.category, icon: 'eco', go: () => { close(); void navigate({ to: '/feedstocks/$feedstockId', params: { feedstockId: f.id } }) } }),
      )
    PATHWAYS.filter((p) => match(p.name, p.short, p.family, p.product))
      .slice(0, term ? 5 : 3)
      .forEach((p) =>
        out.push({ id: `p-${p.id}`, group: 'Pathways', label: p.name, meta: `${p.family} · TRL ${p.trl}`, icon: 'alt_route', go: () => { close(); void navigate({ to: '/pathways', search: { focus: p.id } }) } }),
      )
    END_USES.filter((e) => match(e.name, e.sector))
      .slice(0, term ? 5 : 2)
      .forEach((e) =>
        out.push({ id: `e-${e.id}`, group: 'End uses', label: e.name, meta: e.sector, icon: 'category', go: () => { close(); void navigate({ to: '/end-use', search: { endUse: e.id } }) } }),
      )
    ALL_NAV_ITEMS.filter((n) => match(n.label))
      .slice(0, term ? 6 : 0)
      .forEach((n) =>
        out.push({
          id: `n-${n.label}`,
          group: 'Modules',
          label: n.label,
          meta: n.moduleId ? 'Module brief' : 'Screen',
          icon: n.icon,
          go: () => {
            close()
            if (n.moduleId) void navigate({ to: '/modules/$moduleId', params: { moduleId: n.moduleId } })
            else void navigate({ to: n.to })
          },
        }),
      )
    return out
  }, [q, navigate, onOpenChange])

  useEffect(() => setIndex(0), [q])
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [index])

  const groups = [...new Set(results.map((r) => r.group))]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[12%] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl" showCloseButton={false}>
        <DialogTitle className="sr-only">Search BIOPATH AI</DialogTitle>
        <DialogDescription className="sr-only">Search feedstocks, pathways, end uses and modules. Use arrow keys to move and Enter to open.</DialogDescription>
        <div className="flex items-center gap-3 border-b border-hairline px-4">
          <Icon name="search" className="text-on-surface-variant" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => Math.min(results.length - 1, i + 1)) }
              if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => Math.max(0, i - 1)) }
              if (e.key === 'Enter') results[index]?.go()
            }}
            placeholder="Search feedstocks, pathways, end uses…"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="global-search-results"
            aria-activedescendant={results[index] ? `gs-${results[index].id}` : undefined}
          />
          <kbd className="type-data rounded border border-hairline px-1.5 py-0.5 text-[11px] text-muted-foreground">Esc</kbd>
        </div>
        <ul id="global-search-results" ref={listRef} role="listbox" className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-10 text-center text-sm text-on-surface-variant">
              No matches for “{q}”. Try a feedstock name such as “okara”, or a pathway such as “fermentation”.
            </li>
          )}
          {groups.map((g) => (
            <li key={g} role="presentation">
              <div className="type-eyebrow px-3 pt-3 pb-1 text-outline">{g}</div>
              <ul role="presentation">
                {results
                  .filter((r) => r.group === g)
                  .map((r) => {
                    const i = results.indexOf(r)
                    return (
                      <li
                        key={r.id}
                        id={`gs-${r.id}`}
                        role="option"
                        aria-selected={i === index}
                        data-index={i}
                        onMouseEnter={() => setIndex(i)}
                        onClick={r.go}
                        className={cn('flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5', i === index ? 'bg-sage' : 'hover:bg-surface-low')}
                      >
                        <Icon name={r.icon} className="text-brand-strong" />
                        <span className="flex-1 truncate text-sm font-medium text-on-surface">{r.label}</span>
                        <span className="truncate text-xs text-on-surface-variant">{r.meta}</span>
                      </li>
                    )
                  })}
              </ul>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
