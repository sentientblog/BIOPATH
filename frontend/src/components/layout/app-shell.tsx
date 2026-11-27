import type { ReactNode } from 'react'
import { Sidebar } from './sidebar'
import { TopBar } from './top-bar'
import { ProvenanceLegend } from '@/components/common/provenance'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main" className="sr-only z-50 rounded-lg bg-card px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <Sidebar />
      <div className="lg:pl-64">
        <TopBar />
        <main id="main" className="mx-auto min-h-screen w-full max-w-content px-4 pt-16 pb-10 sm:px-8">
          {children}
          <footer className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <ProvenanceLegend />
            <span>BIOPATH AI prototype · scoring model v0.3 (heuristic)</span>
          </footer>
        </main>
      </div>
    </div>
  )
}
