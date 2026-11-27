import { FEEDSTOCKS } from './feedstocks'
import type { ActivityItem, Batch, EvidenceRecord, Report, ResearchProject } from './types'

/** DEMO WORKSPACE CONTENT — projects, activity, batches, reports. */

export const PROJECTS: ResearchProject[] = [
  { id: 'prj-coffee', title: 'Coffee pulp protein pathways', feedstockId: 'coffee-pulp', stage: 'In Progress', updated: 'Updated 2h ago', completion: 72, image: '/img/project-coffee-pulp.jpg' },
  { id: 'prj-bsg', title: "Brewer's spent grain analysis", feedstockId: 'brewers-spent-grain', stage: 'Pathway Review', updated: 'Updated yesterday', completion: 54, image: '/img/project-bsg.jpg' },
  { id: 'prj-avocado', title: 'Avocado processing residues', feedstockId: 'avocado-residues', stage: 'Fingerprinting', updated: 'Updated 3d ago', completion: 38, image: '/img/project-avocado.jpg' },
]

export const ACTIVITY: ActivityItem[] = [
  { id: 'a1', icon: 'fingerprint', title: 'Batch fingerprint updated', detail: 'Coffee pulp Lot #CP-204 moisture & ash profile', ago: '14m', tone: 'default', to: '/fingerprinting' },
  { id: 'a2', icon: 'menu_book', title: 'New literature source added', detail: 'Solid-state fermentation kinetics on BSG (2025)', ago: '2h', tone: 'default' },
  { id: 'a3', icon: 'alt_route', title: 'Pathway comparison completed', detail: 'Soy okara enzymatic vs. alkaline extraction', ago: '5h', tone: 'default', to: '/pathways' },
  { id: 'a4', icon: 'verified_user', title: 'Safety review pending', detail: 'Mycotoxin screen required for Avocado Lot #AV-12', ago: '1d', tone: 'critical', to: '/feedstocks/avocado-residues' },
]

export const NOTIFICATIONS = [
  { id: 'n1', title: 'Mycotoxin screen overdue', detail: 'Avocado Lot #AV-12 awaiting lab result', ago: '1d', critical: true },
  { id: 'n2', title: 'Batch outside control limits', detail: 'Coffee pulp Lot #CP-198 protein below −2σ', ago: '2d', critical: false },
  { id: 'n3', title: 'Report ready for review', detail: 'Q4 allocation scenario — Central Highlands', ago: '3d', critical: false },
]

/* ---------- Batches: deterministic pseudo-random generation ---------- */

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const LABS = ['Partner lab A', 'Partner lab B', 'On-site QC']

function lotPrefix(id: string) {
  return id
    .split('-')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 3)
}

function generateBatches(): Batch[] {
  const out: Batch[] = []
  FEEDSTOCKS.forEach((f, fi) => {
    const rand = mulberry32(1000 + fi * 97)
    const gauss = () => {
      const u = Math.max(rand(), 1e-9)
      const v = rand()
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
    }
    const base = new Date('2026-11-24T00:00:00Z').getTime()
    const prefix = lotPrefix(f.id)
    const start = f.id === 'coffee-pulp' ? 204 - f.batchCount + 1 : 100
    for (let i = 0; i < f.batchCount; i++) {
      const sd = (f.composition.protein.value * f.variabilityCv) / 100
      let protein = f.composition.protein.value + gauss() * sd
      // a deliberate out-of-control point for the coffee pulp demo
      if (f.id === 'coffee-pulp' && i === f.batchCount - 7) protein = f.composition.protein.value - 2.4 * sd
      const moisture = f.composition.moisture.value + gauss() * 2.2
      const lipid = Math.max(0.1, f.composition.lipid.value + gauss() * f.composition.lipid.value * 0.12)
      const ash = Math.max(0.1, f.composition.ash.value + gauss() * f.composition.ash.value * 0.1)
      const z = Math.abs(protein - f.composition.protein.value) / sd
      const qc: Batch['qc'] = z > 2.2 ? 'fail' : z > 1.8 ? 'review' : 'pass'
      const daysAgo = (f.batchCount - 1 - i) * 6 + Math.floor(rand() * 3)
      out.push({
        lot: `${prefix}-${start + i}`,
        feedstockId: f.id,
        sampledOn: new Date(base - daysAgo * 86400000).toISOString().slice(0, 10),
        moisture: +moisture.toFixed(1),
        protein: +protein.toFixed(2),
        lipid: +lipid.toFixed(2),
        ash: +ash.toFixed(2),
        qc,
        lab: LABS[Math.floor(rand() * LABS.length)],
        provenance: 'measured',
      })
    }
  })
  return out.sort((a, b) => b.sampledOn.localeCompare(a.sampledOn))
}

export const BATCHES: Batch[] = generateBatches()

/* ---------- Reports ---------- */

export const REPORTS: Report[] = [
  { id: 'RPT-0142', title: 'Coffee pulp — pathway shortlist', type: 'Pathway comparison', status: 'In review', createdOn: '2026-11-22', author: 'Research team', feedstockIds: ['coffee-pulp'], sections: ['Executive summary', 'Fingerprint', 'Pathway ranking', 'Assumptions'], summary: 'Fungal SSF and insect bioconversion lead on water and cost; caffeine management is the main open question.', pages: 14 },
  { id: 'RPT-0141', title: 'Q4 allocation scenario — Central Highlands', type: 'Allocation scenario', status: 'Draft', createdOn: '2026-11-21', author: 'Supply analytics', feedstockIds: ['coffee-pulp', 'brewers-spent-grain', 'avocado-residues', 'pineapple-residue'], sections: ['Scenario inputs', 'Allocation', 'Resource use', 'Sensitivities'], summary: 'Allocates four regional streams under a 120,000 m³ water cap; protein output constrained by coffee pulp seasonality.', pages: 9 },
  { id: 'RPT-0139', title: "Brewer's spent grain — fingerprint dossier", type: 'Feedstock profile', status: 'Published', createdOn: '2026-11-18', author: 'Lab operations', feedstockIds: ['brewers-spent-grain'], sections: ['Source', 'Composition', 'Variability', 'Risk flags'], summary: 'Composition is stable across 28 batches (protein CV ≈ 6%); short wet shelf life drives same-day processing.', pages: 11 },
  { id: 'RPT-0136', title: 'Oilseed cakes — end-use screening', type: 'End-use assessment', status: 'Published', createdOn: '2026-11-12', author: 'Product strategy', feedstockIds: ['sunflower-cake', 'cottonseed-cake', 'groundnut-cake'], sections: ['End-use matrix', 'Regulatory notes', 'Blocking risks'], summary: 'Sunflower cake clears for food concentrates; gossypol and aflatoxin keep cottonseed and groundnut in feed-only screening.', pages: 8 },
  { id: 'RPT-0131', title: 'November batch QC summary', type: 'Batch QC summary', status: 'Published', createdOn: '2026-11-05', author: 'Lab operations', feedstockIds: ['coffee-pulp', 'soy-okara', 'fish-processing'], sections: ['QC pass rates', 'Out-of-control lots', 'Corrective actions'], summary: 'One coffee pulp lot fell below the lower control limit for protein; root cause traced to over-ripe cherry intake.', pages: 6 },
  { id: 'RPT-0127', title: 'Lake Basin aquatic biomass — scoping', type: 'Feedstock profile', status: 'Draft', createdOn: '2026-10-29', author: 'Research team', feedstockIds: ['water-hyacinth', 'lemna'], sections: ['Source', 'Composition', 'Heavy-metal screening plan'], summary: 'Scoping note on harvestable volumes and the screening protocol needed before any feed trial.', pages: 5 },
]

export const REPORT_TEMPLATES: { type: Report['type']; description: string; sections: string[] }[] = [
  { type: 'Feedstock profile', description: 'Source, composition, variability and risk flags for one or more feedstocks.', sections: ['Source', 'Composition', 'Variability', 'Risk flags', 'Evidence register'] },
  { type: 'Pathway comparison', description: 'Weighted multi-criteria ranking of conversion pathways for a feedstock.', sections: ['Executive summary', 'Pathway ranking', 'Resource intensity', 'Assumptions'] },
  { type: 'Allocation scenario', description: 'Feedstock-to-pathway allocation under water, energy and volume constraints.', sections: ['Scenario inputs', 'Allocation', 'Resource use', 'Sensitivities'] },
  { type: 'End-use assessment', description: 'Suitability of pathway products across food, feed and industrial applications.', sections: ['End-use matrix', 'Regulatory notes', 'Blocking risks'] },
  { type: 'Batch QC summary', description: 'Batch pass rates, out-of-control lots and corrective actions.', sections: ['QC pass rates', 'Out-of-control lots', 'Corrective actions'] },
]

/* ---------- Evidence register (per feedstock, generic, demo) ---------- */

export function evidenceFor(feedstockId: string): EvidenceRecord[] {
  const f = FEEDSTOCKS.find((x) => x.id === feedstockId)
  if (!f) return []
  const recs: EvidenceRecord[] = []
  if (f.batchCount > 0)
    recs.push({ id: `EV-${lotPrefix(f.id)}-01`, title: `Proximate analysis across ${f.batchCount} batches`, kind: 'measured', scope: 'Moisture, protein, lipid, fibre, ash', date: f.lastUpdated.slice(0, 10) })
  recs.push({ id: `EV-${lotPrefix(f.id)}-02`, title: `Literature composition range — ${f.category.toLowerCase()}`, kind: 'literature', scope: 'Reference ranges for comparison (citation to be attached)', date: '2026-09-30' })
  recs.push({ id: `EV-${lotPrefix(f.id)}-03`, title: 'Annual volume estimate from processor survey', kind: 'estimated', scope: 'Volume, seasonality, logistics', date: '2026-08-14' })
  recs.push({ id: `EV-${lotPrefix(f.id)}-04`, title: 'Pathway yield model output (BIOPATH heuristic v0.3)', kind: 'estimated', scope: 'Protein yield, water, energy, cost', date: '2026-11-01' })
  recs.push({ id: `EV-${lotPrefix(f.id)}-05`, title: 'Prototype placeholder values', kind: 'demo', scope: 'All figures in this prototype dataset', date: '2026-11-24' })
  return recs
}
