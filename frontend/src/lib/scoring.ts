import { AA_REFERENCE, FEEDSTOCKS } from "@/data/feedstocks";
import { END_USES } from "@/data/end-uses";
import { PATHWAYS } from "@/data/pathways";
import type {
  AminoAcidKey,
  EndUse,
  EndUseSector,
  Feedstock,
  Pathway,
} from "@/data/types";

/**
 * BIOPATH heuristic scoring model (v0.3, demo).
 *
 * Transparent rule-based estimates used to rank options in the prototype.
 * Outputs are planning-grade ESTIMATES derived from demo inputs — they are not
 * validated process models and should be replaced by calibrated models.
 */

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));

/** Score how close `v` is to a target band, 100 inside it, decaying outside. */
function band(v: number, lo: number, hi: number, softness: number) {
  if (v >= lo && v <= hi) return 100;
  const d = v < lo ? lo - v : v - hi;
  return clamp(100 - (d / softness) * 100);
}

const has = (f: Feedstock, id: string) => f.flags.some((x) => x.id === id);

export interface SuitabilityResult {
  score: number;
  reasons: string[];
}

/** Technical suitability of a feedstock for a pathway, 0–100. */
export function suitability(f: Feedstock, p: Pathway): SuitabilityResult {
  const c = f.composition;
  const protein = c.protein.value;
  const carb = c.carbohydrate.value;
  const fibre = c.fibre.value;
  const lipid = c.lipid.value;
  const moisture = c.moisture.value;
  const reasons: string[] = [];
  let s = 60;

  switch (p.id) {
    case "fungal-ssf": {
      s =
        0.4 * band(moisture, 50, 75, 30) +
        0.35 * clamp(carb * 2 + fibre * 0.6) +
        0.25 * clamp(100 - lipid * 3);
      if (moisture < 30 || moisture > 90)
        reasons.push("Moisture far from SSF window — adjustment needed");
      if (has(f, "caffeine") || has(f, "tannins"))
        reasons.push("Fungi can degrade polyphenols during fermentation");
      if (moisture > 90) s -= 15;
      break;
    }
    case "submerged-myco": {
      s =
        0.6 * clamp(carb * 1.6) +
        0.2 * clamp(100 - fibre) +
        0.2 * clamp(100 - lipid * 3);
      if (fibre > 40)
        reasons.push("Fibrous solids need hydrolysis before liquid culture");
      break;
    }
    case "enzymatic-hydrolysis": {
      s =
        0.6 * clamp(((protein - 8) / 30) * 100) +
        0.25 * clamp(100 - lipid * 3) +
        0.15 * clamp(100 - fibre * 0.8);
      if (protein < 15)
        reasons.push("Protein below 15% DM limits recoverable yield");
      break;
    }
    case "alkaline-extraction": {
      s =
        0.7 * clamp(((protein - 12) / 30) * 100) + 0.3 * clamp(100 - lipid * 4);
      if (protein < 20)
        reasons.push("Protein below 20% DM — extraction yields are low");
      if (lipid > 10)
        reasons.push("Residual oil requires defatting before extraction");
      break;
    }
    case "insect-bsf": {
      s =
        0.45 * band(moisture, 60, 82, 30) +
        0.35 * clamp(protein * 3 + carb) +
        0.2 * clamp(100 - fibre);
      if (has(f, "metals"))
        reasons.push("Larvae can bioaccumulate metals from substrate");
      if (f.category === "Dairy & fishery side-stream")
        reasons.push(
          "Animal-origin substrates restricted for insect feed in many markets",
        );
      break;
    }
    case "yeast-scp": {
      s =
        0.75 * clamp(((carb - 10) / 50) * 100) +
        0.25 * clamp(100 - fibre * 1.2);
      if (carb < 30)
        reasons.push("Limited fermentable sugars without hydrolysis");
      break;
    }
    case "microalgae-mixo": {
      s = 0.6 * clamp(carb * 1.2) + 0.4 * band(moisture, 85, 100, 40);
      if (moisture < 80)
        reasons.push(
          "Requires dissolution or a liquid extract as carbon source",
        );
      break;
    }
  }

  if (
    has(f, "lignin") &&
    ["submerged-myco", "yeast-scp", "enzymatic-hydrolysis"].includes(p.id)
  ) {
    s -= 15;
    reasons.push("Lignin recalcitrance — pretreatment adds cost");
  }
  if (has(f, "cyanogenic")) {
    s -= 8;
    reasons.push("Detoxification step required first");
  }
  if (has(f, "spoilage") && p.durationDays[0] > 7) {
    s -= 5;
  }
  return { score: Math.round(clamp(s)), reasons };
}

export interface PathwayEstimate {
  pathway: Pathway;
  suitability: number;
  reasons: string[];
  /** kg protein per tonne feedstock DM */
  proteinYield: number;
  /** m³ water per tonne DM */
  water: number;
  /** kWh per tonne DM */
  energy: number;
  /** USD per kg protein produced */
  costPerKgProtein: number;
  scalability: number;
  endUseFit: number;
}

/** Protein output per tonne DM, kg — heuristic mass balance. */
export function proteinYield(
  f: Feedstock,
  p: Pathway,
  suit = suitability(f, p).score,
) {
  const pr = f.composition.protein.value * 10; // kg protein per t DM in substrate
  const cb = f.composition.carbohydrate.value * 10;
  const fb = f.composition.fibre.value * 10;
  let y = 0;
  switch (p.id) {
    case "fungal-ssf":
      y = pr * 0.85 + (cb + fb * 0.25) * 0.11;
      break;
    case "submerged-myco":
      y = pr * 0.4 + (cb + fb * 0.1) * 0.2;
      break;
    case "enzymatic-hydrolysis":
      y = pr * 0.68;
      break;
    case "alkaline-extraction":
      y = pr * 0.58;
      break;
    case "insect-bsf":
      y = (180 + pr * 0.15) * 0.42;
      break;
    case "yeast-scp":
      y = pr * 0.15 + cb * 0.24;
      break;
    case "microalgae-mixo":
      y = cb * 0.17;
      break;
  }
  // suitability acts as a realisation factor
  return Math.round(y * (0.55 + 0.45 * (suit / 100)));
}

export function endUseFitFor(p: Pathway, sector?: EndUseSector | "Any") {
  const pool =
    sector && sector !== "Any"
      ? END_USES.filter((e) => e.sector === sector)
      : END_USES;
  if (!pool.length) return 0;
  const best = Math.max(...pool.map((e) => e.pathwayFit[p.id]?.score ?? 0));
  const avg =
    pool.reduce((a, e) => a + (e.pathwayFit[p.id]?.score ?? 0), 0) /
    pool.length;
  return Math.round(((best * 0.6 + avg * 0.4) / 3) * 100);
}

export function estimate(
  f: Feedstock,
  p: Pathway,
  sector: EndUseSector | "Any" = "Any",
): PathwayEstimate {
  const s = suitability(f, p);
  const y = proteinYield(f, p, s.score);
  const fibrePenalty = 1 + Math.max(0, f.composition.fibre.value - 40) / 100;
  const water = +(p.waterM3PerT * fibrePenalty).toFixed(1);
  const energy = Math.round(p.energyKwhPerT * fibrePenalty);
  // single dry-matter fraction shared by both cost terms; guarded against a zero denominator
  const dmFraction = 1 - f.composition.moisture.value / 100;
  const dm = dmFraction > 0 ? dmFraction : 1;
  const feedCost = f.cost.value / dm;
  const transport = (f.transportKm * 0.12) / dm;
  const cost =
    y > 0 ? +((p.opexUsdPerT + feedCost + transport) / y).toFixed(2) : 99;
  return {
    pathway: p,
    suitability: s.score,
    reasons: s.reasons,
    proteinYield: y,
    water,
    energy,
    costPerKgProtein: cost,
    scalability: p.scalability,
    endUseFit: endUseFitFor(p, sector),
  };
}

export type Criterion =
  | "suitability"
  | "yield"
  | "water"
  | "energy"
  | "cost"
  | "scalability"
  | "endUse";

export const CRITERIA: { id: Criterion; label: string; hint: string }[] = [
  {
    id: "suitability",
    label: "Feedstock suitability",
    hint: "Composition fit to pathway requirements",
  },
  {
    id: "yield",
    label: "Protein yield",
    hint: "kg protein per tonne dry matter",
  },
  { id: "water", label: "Water intensity", hint: "Lower is better" },
  { id: "energy", label: "Energy intensity", hint: "Lower is better" },
  {
    id: "cost",
    label: "Economic feasibility",
    hint: "Cost per kg protein — lower is better",
  },
  {
    id: "scalability",
    label: "Scalability",
    hint: "Ease of scale-up with local equipment",
  },
  {
    id: "endUse",
    label: "End-use fit",
    hint: "Fit to the selected target market",
  },
];

export type Weights = Record<Criterion, number>;

export const DEFAULT_WEIGHTS: Weights = {
  suitability: 5,
  yield: 4,
  water: 3,
  energy: 3,
  cost: 4,
  scalability: 2,
  endUse: 3,
};

export interface RankedPathway extends PathwayEstimate {
  normalized: Record<Criterion, number>;
  total: number;
}

/** Min–max normalise each criterion across candidates and combine with weights. */
export function rankPathways(
  f: Feedstock,
  weights: Weights,
  sector: EndUseSector | "Any" = "Any",
  pathways = PATHWAYS,
): RankedPathway[] {
  const est = pathways.map((p) => estimate(f, p, sector));
  const norm = (vals: number[], v: number, invert = false) => {
    const lo = Math.min(...vals);
    const hi = Math.max(...vals);
    if (hi === lo) return 100;
    const r = ((v - lo) / (hi - lo)) * 100;
    return invert ? 100 - r : r;
  };
  const col = (k: keyof PathwayEstimate) => est.map((e) => e[k] as number);
  const totalW = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
  return est
    .map((e) => {
      const normalized: Record<Criterion, number> = {
        suitability: e.suitability,
        yield: norm(col("proteinYield"), e.proteinYield),
        water: norm(col("water"), e.water, true),
        energy: norm(col("energy"), e.energy, true),
        cost: norm(col("costPerKgProtein"), e.costPerKgProtein, true),
        scalability: (e.scalability / 5) * 100,
        endUse: e.endUseFit,
      };
      const total =
        (Object.keys(weights) as Criterion[]).reduce(
          (a, k) => a + normalized[k] * weights[k],
          0,
        ) / totalW;
      return { ...e, normalized, total: Math.round(total) };
    })
    .sort((a, b) => b.total - a.total);
}

/* ---------- Protein quality ---------- */

export function aminoAcidScore(f: Feedstock) {
  const ratios = (Object.keys(AA_REFERENCE) as AminoAcidKey[]).map((k) => ({
    key: k,
    ratio: f.aminoAcids[k] / AA_REFERENCE[k],
  }));
  const limiting = ratios.reduce((a, b) => (b.ratio < a.ratio ? b : a));
  return { score: Math.min(1, limiting.ratio), limiting: limiting.key, ratios };
}

/* ---------- End-use suitability for a feedstock ---------- */

export interface EndUseAssessment {
  endUse: EndUse;
  score: number;
  bestPathway: Pathway;
  blocked: string[];
  evidence: EndUse["pathwayFit"][string]["evidence"];
}

export function assessEndUses(f: Feedstock): EndUseAssessment[] {
  return END_USES.map((e) => {
    let best: { p: Pathway; v: number } | null = null;
    for (const p of PATHWAYS) {
      const fit = e.pathwayFit[p.id]?.score ?? 0;
      const s = suitability(f, p).score;
      const v = (fit / 3) * 0.55 * 100 + s * 0.45;
      if (!best || v > best.v) best = { p, v };
    }
    const blocked = f.flags
      .filter((fl) => e.blockingFlags.includes(fl.id))
      .map((fl) => fl.label);
    const pf = e.pathwayFit[best!.p.id];
    return {
      endUse: e,
      score: Math.round(blocked.length ? best!.v * 0.5 : best!.v),
      bestPathway: best!.p,
      blocked,
      evidence: pf.evidence,
    };
  }).sort((a, b) => b.score - a.score);
}

/* ---------- Resource allocation ---------- */

export interface AllocationInput {
  feedstockIds: string[];
  /** share of each feedstock's annual volume made available, 0–1 */
  availableShare: number;
  waterCap: number; // m³/yr
  energyCap: number; // MWh/yr
  objective: "protein" | "water" | "cost";
  sector: EndUseSector | "Any";
  minSuitability: number;
}

export interface AllocationLine {
  feedstock: Feedstock;
  pathway: Pathway;
  tonnesDm: number;
  protein: number; // t/yr
  water: number; // m³/yr
  energy: number; // MWh/yr
  cost: number; // USD/yr
  suitability: number;
}

export interface AllocationResult {
  lines: AllocationLine[];
  unallocated: { feedstock: Feedstock; tonnesDm: number; reason: string }[];
  totals: {
    protein: number;
    water: number;
    energy: number;
    cost: number;
    tonnesDm: number;
    availableDm: number;
  };
  binding: string[];
}

/**
 * Greedy allocation: rank every feasible feedstock×pathway pair by the chosen
 * objective per unit of the scarcest resource, then fill until volume, water
 * or energy caps bind. Transparent and fast — a placeholder for an LP solver.
 */
export function allocate(input: AllocationInput): AllocationResult {
  const fs = FEEDSTOCKS.filter((f) => input.feedstockIds.includes(f.id));
  const remaining = new Map(
    fs.map((f) => [
      f.id,
      f.annualVolume.value *
        (1 - f.composition.moisture.value / 100) *
        input.availableShare,
    ]),
  );
  const availableDm = [...remaining.values()].reduce((a, b) => a + b, 0);
  let water = input.waterCap;
  let energy = input.energyCap;
  const binding = new Set<string>();

  const pairs = fs.flatMap((f) =>
    PATHWAYS.map((p) => ({ f, p, e: estimate(f, p, input.sector) })).filter(
      (x) =>
        x.e.suitability >= input.minSuitability &&
        x.e.endUseFit > 0 &&
        x.e.proteinYield > 0,
    ),
  );
  const value = (x: (typeof pairs)[number]) => {
    const kg = x.e.proteinYield;
    if (input.objective === "protein")
      return kg * (0.6 + x.e.suitability / 250);
    if (input.objective === "water") return kg / Math.max(0.5, x.e.water);
    return kg / Math.max(0.1, x.e.costPerKgProtein * kg);
  };
  pairs.sort((a, b) => value(b) - value(a));

  const lines: AllocationLine[] = [];
  for (const x of pairs) {
    const left = remaining.get(x.f.id) ?? 0;
    if (left <= 1) continue;
    const byWater = x.e.water > 0 ? water / x.e.water : Infinity;
    const byEnergy = x.e.energy > 0 ? (energy * 1000) / x.e.energy : Infinity;
    const t = Math.floor(Math.min(left, byWater, byEnergy));
    if (t <= 0) {
      if (byWater < 1) binding.add("Water cap");
      if (byEnergy < 1) binding.add("Energy cap");
      continue;
    }
    if (t < left) {
      if (byWater <= byEnergy && byWater < left) binding.add("Water cap");
      else if (byEnergy < left) binding.add("Energy cap");
    }
    remaining.set(x.f.id, left - t);
    water -= t * x.e.water;
    energy -= (t * x.e.energy) / 1000;
    const protein = (t * x.e.proteinYield) / 1000;
    lines.push({
      feedstock: x.f,
      pathway: x.p,
      tonnesDm: t,
      protein,
      water: t * x.e.water,
      energy: (t * x.e.energy) / 1000,
      cost: protein * 1000 * x.e.costPerKgProtein,
      suitability: x.e.suitability,
    });
  }

  const unallocated = fs
    .map((f) => ({
      feedstock: f,
      tonnesDm: Math.round(remaining.get(f.id) ?? 0),
    }))
    .filter((u) => u.tonnesDm > 1)
    .map((u) => ({
      ...u,
      reason: pairs.some((p) => p.f.id === u.feedstock.id)
        ? [...binding].join(" & ") || "Resource cap reached"
        : "No pathway meets suitability threshold",
    }));

  const sum = (
    k: keyof Pick<
      AllocationLine,
      "protein" | "water" | "energy" | "cost" | "tonnesDm"
    >,
  ) => lines.reduce((a, l) => a + l[k], 0);
  return {
    lines,
    unallocated,
    totals: {
      protein: sum("protein"),
      water: sum("water"),
      energy: sum("energy"),
      cost: sum("cost"),
      tonnesDm: sum("tonnesDm"),
      availableDm,
    },
    binding: [...binding],
  };
}
