/**
 * Data access layer.
 *
 * Every screen reads data through these async functions — never from the
 * fixture modules directly — so a real backend (Netlify Database + server
 * routes) can replace them without touching the UI. Client-side calls add a
 * short simulated latency so loading states are exercised.
 */
import { FEEDSTOCKS } from './feedstocks'
import { PATHWAYS } from './pathways'
import { END_USES } from './end-uses'
import { REGIONS } from './regions'
import { ACTIVITY, BATCHES, NOTIFICATIONS, PROJECTS, REPORTS, evidenceFor } from './workspace'

/** Shown wherever data is displayed. Flip when real data sources are connected. */
export const DATASET_STATUS = {
  simulated: true,
  label: 'Prototype / Demo Data',
  description:
    'All figures in this prototype are simulated for demonstration. Provenance tags show the class of evidence each field is designed to hold — they do not indicate verified results.',
} as const

const latency = (ms = 260) =>
  typeof window === 'undefined' ? Promise.resolve() : new Promise<void>((r) => setTimeout(r, ms))

export async function listFeedstocks() {
  await latency()
  return FEEDSTOCKS
}

export async function getFeedstock(id: string) {
  await latency()
  const feedstock = FEEDSTOCKS.find((f) => f.id === id)
  if (!feedstock) return null
  return {
    feedstock,
    batches: BATCHES.filter((b) => b.feedstockId === id),
    evidence: evidenceFor(id),
  }
}

export async function listPathways() {
  await latency(180)
  return PATHWAYS
}

export async function listEndUses() {
  await latency(180)
  return END_USES
}

export async function listRegions() {
  await latency(180)
  return REGIONS
}

export async function listBatches() {
  await latency()
  return BATCHES
}

export async function listReports() {
  await latency()
  return REPORTS
}

export async function getDashboard() {
  await latency(120)
  const qcPass = BATCHES.filter((b) => b.qc === 'pass').length / Math.max(1, BATCHES.length)
  return {
    kpis: {
      feedstocks: FEEDSTOCKS.length,
      newThisMonth: 3,
      batches: BATCHES.length,
      qcPassRate: qcPass,
      pathwaysEvaluated: FEEDSTOCKS.filter((f) => f.status !== 'pending').length * PATHWAYS.length,
      sourcesIndexed: 1240,
      sourcesNew: 42,
    },
    projects: PROJECTS,
    activity: ACTIVITY,
  }
}

export async function listNotifications() {
  return NOTIFICATIONS
}
