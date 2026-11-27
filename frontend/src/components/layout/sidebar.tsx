import { Link } from '@tanstack/react-router'
import { LogoMark } from '@/components/common/logo'
import { NAV_FOOTER, NAV_SECTIONS } from '@/lib/navigation'
import { SidebarLink } from './nav-link'

export function SidebarBrand() {
  return (
    <Link to="/" className="flex h-16 shrink-0 items-center gap-3 px-6 outline-none focus-visible:ring-2 focus-visible:ring-brand" aria-label="BIOPATH AI home">
      <LogoMark />
      <div className="min-w-0">
        <div className="truncate text-base font-semibold tracking-tight text-on-surface">BIOPATH AI</div>
        <div className="type-label truncate text-on-surface-variant">Feedstock-to-Protein Intelligence</div>
      </div>
    </Link>
  )
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Primary" className="flex-1 space-y-5 overflow-y-auto px-2 py-4 scrollbar-none">
      {NAV_SECTIONS.map((section) => (
        <div key={section.title}>
          <div className="type-eyebrow mb-1.5 px-3 text-outline">{section.title}</div>
          <div className="space-y-0.5">
            {section.items.map((item) => (
              <SidebarLink key={item.label} item={item} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      ))}
      <div className="space-y-0.5 border-t border-outline-variant/40 pt-3">
        {NAV_FOOTER.map((item) => (
          <SidebarLink key={item.label} item={item} onNavigate={onNavigate} />
        ))}
      </div>
    </nav>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-40 hidden h-full w-64 flex-col border-r border-outline-variant/40 bg-surface-lowest lg:flex">
      <SidebarBrand />
      <SidebarNav />
    </aside>
  )
}
