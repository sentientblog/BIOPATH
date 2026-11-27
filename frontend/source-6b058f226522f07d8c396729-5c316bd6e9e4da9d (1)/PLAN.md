# BIOPATH AI — Build Plan

Visual reference: the Stitch export (warm ivory canvas, white hairline panels, forest/primary greens, Manrope/Inter/JetBrains Mono, Material Symbols icons).

## Milestones

1. **Foundations — DONE.** Stitch design tokens in `src/styles.css`; app shell (fixed sidebar matching the Stitch navigation, top bar, ⌘K global search, notifications, account menu, mobile drawer); page/loading/empty/error components; provenance tags (Measured / Literature / Estimated / Demo).
2. **Data layer — DONE.** Typed demo fixtures in `src/data` (24 feedstocks, 7 pathways, 11 end uses, regions, batches, reports) accessed only through `src/data/api.ts`; heuristic scoring model in `src/lib/scoring.ts` (suitability, yield, water, energy, cost, scalability, end-use fit, weighted ranking, greedy allocation).
3. **Charts — DONE.** SVG grouped bar, radar, control chart and flow (Sankey-style) components in `src/components/charts`.
4. **Dashboard (`/`) — TODO.** Replace placeholder `src/routes/index.tsx` with the Stitch dashboard: hero (`/img/hero-field.png`), KPI row, continue-your-research, feedstock spotlight, intelligence overview chart, research activity.
5. **Feedstock Explorer (`/feedstocks`) and profile (`/feedstocks/$feedstockId`) — TODO.** Search, category/region/status filters, table + card views; profile tabs: overview, fingerprint (composition, amino acid score vs. reference), source & seasonality, pathways, end uses, evidence register.
6. **Source Intelligence (`/source-intelligence`) and Batch Fingerprinting (`/fingerprinting`) — TODO.** Region map/table, seasonality; batch table with control chart.
7. **Pathway Optimizer (`/pathways`) — TODO.** Feedstock picker, weight sliders, ranked comparison, radar; supports `?focus=` search param.
8. **Resource Allocation (`/allocation`) — TODO.** Constraint inputs, `allocate()` results, flow diagram.
9. **End-Use Intelligence (`/end-use`) — TODO.** Sector filter, pathway-fit matrix, feedstock assessment; supports `?endUse=`.
10. **Reports (`/reports`) — TODO.** Report list, filters, detail modal, new-report dialog from templates.
11. **Module briefs (`/modules/$moduleId`) — TODO.** Render `src/data/modules.ts` for sidebar modules without full screens.
