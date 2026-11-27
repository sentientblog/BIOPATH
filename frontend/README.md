# BIOPATH AI

Frontend for BIOPATH AI, a feedstock-to-protein intelligence platform. It helps users find, characterise, evaluate and allocate local biological feedstocks for alternative protein production across four layers: Source, Fingerprint, Pathway and End-Use intelligence. The visual design follows the user's Stitch reference.

All data is simulated demo data. Every value carries a provenance tag (measured, literature, estimated, demo) so the interface never presents simulated figures as verified results.

## Tech

TanStack Start (React 19, TanStack Router), Vite, Tailwind CSS 4, shadcn/ui (Radix), custom SVG charts, deployed on Netlify.

## Run locally

```bash
pnpm install
npm run dev   # http://localhost:3000
```

## Structure

- `src/data`: typed demo fixtures plus `api.ts`, the only data access point (swap it for a backend later)
- `src/lib/scoring.ts`: transparent heuristic pathway, end-use and allocation model
- `src/components/layout`, `common`, `charts`: shell, shared UI, charts

## Roadmap

See `PLAN.md`. The foundations, data layer and charts are done. The screens come next: dashboard, feedstock explorer and profiles, source, fingerprinting, pathways, allocation, end-use, reports and module briefs.
