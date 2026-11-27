import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Icon } from '@/components/common/icon'
import { LogoMark } from '@/components/common/logo'
import { DemoChip } from '@/components/common/provenance'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { NOTIFICATIONS } from '@/data/workspace'
import { cn } from '@/lib/utils'
import { GlobalSearch } from './global-search'
import { SidebarBrand, SidebarNav } from './sidebar'

const iconBtn =
  'relative grid size-10 place-items-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface outline-none focus-visible:ring-2 focus-visible:ring-brand'

export function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [unread, setUnread] = useState(NOTIFICATIONS.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between bg-surface/80 px-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:px-8 lg:left-64">
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Open navigation" className={cn(iconBtn, 'lg:hidden')} onClick={() => setMenuOpen(true)}>
            <Icon name="menu" size={24} />
          </button>
          <Link to="/" className="flex items-center gap-2.5 lg:hidden" aria-label="BIOPATH AI home">
            <LogoMark className="size-7" />
            <span className="text-base font-semibold text-on-surface">BIOPATH AI</span>
          </Link>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden h-10 w-72 items-center gap-2.5 rounded-lg border border-hairline bg-card px-3 text-sm text-muted-foreground shadow-card transition-colors hover:border-outline-variant lg:flex"
          >
            <Icon name="search" />
            <span className="flex-1 text-left">Search feedstocks, pathways…</span>
            <kbd className="type-data rounded border border-hairline px-1.5 text-[11px]">⌘K</kbd>
          </button>
        </div>
        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          <DemoChip className="hidden md:inline-flex" />
          <button type="button" aria-label="Search" className={cn(iconBtn, 'lg:hidden')} onClick={() => setSearchOpen(true)}>
            <Icon name="search" />
          </button>
          <Popover onOpenChange={(o) => o && setUnread(0)}>
            <PopoverTrigger asChild>
              <button type="button" aria-label={unread ? `Notifications, ${unread} unread` : 'Notifications'} className={iconBtn}>
                <Icon name="notifications" />
                {unread > 0 && <span className="absolute top-2 right-2 size-2 rounded-full bg-risk ring-2 ring-surface" />}
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 rounded-xl border-hairline p-0 shadow-float">
              <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
                <p className="font-semibold text-on-surface">Notifications</p>
                <span className="text-xs text-muted-foreground">Demo alerts</span>
              </div>
              <ul className="divide-y divide-hairline">
                {NOTIFICATIONS.map((n) => (
                  <li key={n.id} className="flex gap-3 px-4 py-3">
                    <Icon name={n.critical ? 'warning' : 'info'} className={n.critical ? 'text-risk' : 'text-brand-strong'} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-on-surface">{n.title}</p>
                      <p className="text-xs text-on-surface-variant">{n.detail}</p>
                    </div>
                    <span className="type-data text-[11px] text-muted-foreground">{n.ago}</span>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" aria-label="Account menu" className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                <img src="/.netlify/images?url=/img/avatar.jpg&w=64&h=64&fit=cover&fm=webp" alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <p className="text-sm font-semibold">Researcher</p>
                <p className="text-xs font-normal text-muted-foreground">Demo workspace</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/modules/$moduleId" params={{ moduleId: 'profile' }}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/modules/$moduleId" params={{ moduleId: 'settings' }}>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => toast('Sign-in arrives with user accounts', { description: 'This prototype runs in a shared demo workspace.' })}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-72 gap-0 bg-surface-lowest p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">BIOPATH AI modules</SheetDescription>
          <SidebarBrand />
          <SidebarNav onNavigate={() => setMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
