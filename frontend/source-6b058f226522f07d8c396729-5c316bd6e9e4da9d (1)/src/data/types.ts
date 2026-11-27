/**
 * Domain types for BIOPATH AI.
 *
 * Every number shown in the UI travels with a `provenance` so the interface can
 * always tell measured, literature-sourced, estimated and demo values apart.
 * In this prototype ALL values are simulated (see `DATASET_STATUS`); the
 * provenance records the class of evidence the field is designed to hold.
 */

export type Provenance = 'measured' | 'literature' | 'estimated' | 'demo'

export interface Measure {
  value: number
  unit: string
  provenance: Provenance
  /** Observed or expected range, when known. */
  range?: [number, number]
  /** Number of samples behind a measured value. */
  n?: number
  note?: string
}

export type RegionId =
  | 'central-highlands'
  | 'rift-valley'
  | 'lake-basin'
  | 'coastal-belt'
  | 'western-plateau'
  | 'eastern-lowlands'

export interface Region {
  id: RegionId
  name: string
  climate: string
  processingHubs: number
  /** 0–100 composite of road quality and cold-chain access (demo). */
  logisticsIndex: number
  /** Map placement on the schematic region grid (0–100). */
  x: number
  y: number
}

export type FeedstockCategory =
  | 'Agro-industrial residue'
  | 'Brewery & distillery co-product'
  | 'Oilseed cake'
  | 'Fruit processing residue'
  | 'Cereal milling by-product'
  | 'Dairy & fishery side-stream'
  | 'Aquatic biomass'
  | 'Sugar industry co-product'

export type FlagSeverity = 'info' | 'warning' | 'critical'

export interface RiskFlag {
  id: string
  label: string
  severity: FlagSeverity
  detail: string
}

export type ProfileStatus = 'profiled' | 'screening' | 'pending'

export interface Composition {
  /** % as received */
  moisture: Measure
  /** % dry matter */
  protein: Measure
  lipid: Measure
  fibre: Measure
  ash: Measure
  /** Non-structural carbohydrate, % DM, calculated by difference. */
  carbohydrate: Measure
}

export type AminoAcidKey =
  | 'his'
  | 'ile'
  | 'leu'
  | 'lys'
  | 'saa'
  | 'aaa'
  | 'thr'
  | 'trp'
  | 'val'

export interface Feedstock {
  id: string
  name: string
  category: FeedstockCategory
  summary: string
  description: string
  image?: string
  region: RegionId
  sourceType: string
  annualVolume: Measure
  availability: 'Year-round' | 'Seasonal' | 'Intermittent'
  /** Relative monthly availability, Jan–Dec, 0–1. */
  seasonality: number[]
  transportKm: number
  cost: Measure
  composition: Composition
  /** g per 100 g protein */
  aminoAcids: Record<AminoAcidKey, number>
  aminoAcidProvenance: Provenance
  physical: {
    bulkDensity: Measure
    particleSize: Measure
    ph: Measure
    shelfLife: Measure
  }
  /** Batch-to-batch coefficient of variation for protein, %. */
  variabilityCv: number
  flags: RiskFlag[]
  status: ProfileStatus
  batchCount: number
  lastUpdated: string
  tags: string[]
}

export type PathwayFamily =
  | 'Fermentation'
  | 'Extraction'
  | 'Bioconversion'
  | 'Cultivation'

export interface Pathway {
  id: string
  name: string
  short: string
  family: PathwayFamily
  description: string
  product: string
  productProtein: [number, number]
  trl: number
  durationDays: [number, number]
  waterM3PerT: number
  energyKwhPerT: number
  opexUsdPerT: number
  capex: 'Low' | 'Medium' | 'High'
  /** 1–5: ease of scaling with locally available equipment (demo). */
  scalability: number
  requirements: string[]
  risks: string[]
}

export type EndUseSector =
  | 'Human food'
  | 'Animal feed'
  | 'Pet food'
  | 'Industrial'
  | 'Agriculture'

export type EvidenceLevel = 'established' | 'emerging' | 'theoretical'

export interface PathwayFit {
  /** 0 = not suitable, 3 = strong fit */
  score: 0 | 1 | 2 | 3
  evidence: EvidenceLevel
  note: string
}

export interface EndUse {
  id: string
  name: string
  sector: EndUseSector
  description: string
  minProtein: number
  valueTier: 'High' | 'Medium' | 'Low'
  indicativePrice: Measure
  requirements: string[]
  regulatory: string
  /** Flags that block this end-use until cleared. */
  blockingFlags: string[]
  pathwayFit: Record<string, PathwayFit>
}

export interface Batch {
  lot: string
  feedstockId: string
  sampledOn: string
  moisture: number
  protein: number
  lipid: number
  ash: number
  qc: 'pass' | 'review' | 'fail'
  lab: string
  provenance: Provenance
}

export interface ResearchProject {
  id: string
  title: string
  feedstockId: string
  stage: 'In Progress' | 'Pathway Review' | 'Fingerprinting'
  updated: string
  completion: number
  image: string
}

export interface ActivityItem {
  id: string
  icon: string
  title: string
  detail: string
  ago: string
  tone: 'default' | 'critical'
  to?: string
}

export type ReportType =
  | 'Feedstock profile'
  | 'Pathway comparison'
  | 'Allocation scenario'
  | 'End-use assessment'
  | 'Batch QC summary'

export interface Report {
  id: string
  title: string
  type: ReportType
  status: 'Draft' | 'In review' | 'Published'
  createdOn: string
  author: string
  feedstockIds: string[]
  sections: string[]
  summary: string
  pages: number
}

export interface EvidenceRecord {
  id: string
  title: string
  kind: Provenance
  scope: string
  date: string
}
