import { AA_REFERENCE, END_USES, FEEDSTOCKS, PATHWAYS } from "./router-ChhPpYzB.mjs";
// node_modules/.nitro/vite/services/ssr/assets/scoring-B089F6La.js
/**
* BIOPATH heuristic scoring model (v0.3, demo).
*
* Transparent rule-based estimates used to rank options in the prototype.
* Outputs are planning-grade ESTIMATES derived from demo inputs — they are not
* validated process models and should be replaced by calibrated models.
*/
var clamp = (v, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));
/** Score how close `v` is to a target band, 100 inside it, decaying outside. */
function band(v, lo, hi, softness) {
	if (v >= lo && v <= hi) return 100;
	return clamp(100 - (v < lo ? lo - v : v - hi) / softness * 100);
}
var has = (f, id) => f.flags.some((x) => x.id === id);
/** Technical suitability of a feedstock for a pathway, 0–100. */
function suitability(f, p) {
	const c = f.composition;
	const protein = c.protein.value;
	const carb = c.carbohydrate.value;
	const fibre = c.fibre.value;
	const lipid = c.lipid.value;
	const moisture = c.moisture.value;
	const reasons = [];
	let s = 60;
	switch (p.id) {
		case "fungal-ssf":
			s = .4 * band(moisture, 50, 75, 30) + .35 * clamp(carb * 2 + fibre * .6) + .25 * clamp(100 - lipid * 3);
			if (moisture < 30 || moisture > 90) reasons.push("Moisture far from SSF window — adjustment needed");
			if (has(f, "caffeine") || has(f, "tannins")) reasons.push("Fungi can degrade polyphenols during fermentation");
			if (moisture > 90) s -= 15;
			break;
		case "submerged-myco":
			s = .6 * clamp(carb * 1.6) + .2 * clamp(100 - fibre) + .2 * clamp(100 - lipid * 3);
			if (fibre > 40) reasons.push("Fibrous solids need hydrolysis before liquid culture");
			break;
		case "enzymatic-hydrolysis":
			s = .6 * clamp((protein - 8) / 30 * 100) + .25 * clamp(100 - lipid * 3) + .15 * clamp(100 - fibre * .8);
			if (protein < 15) reasons.push("Protein below 15% DM limits recoverable yield");
			break;
		case "alkaline-extraction":
			s = .7 * clamp((protein - 12) / 30 * 100) + .3 * clamp(100 - lipid * 4);
			if (protein < 20) reasons.push("Protein below 20% DM — extraction yields are low");
			if (lipid > 10) reasons.push("Residual oil requires defatting before extraction");
			break;
		case "insect-bsf":
			s = .45 * band(moisture, 60, 82, 30) + .35 * clamp(protein * 3 + carb) + .2 * clamp(100 - fibre);
			if (has(f, "metals")) reasons.push("Larvae can bioaccumulate metals from substrate");
			if (f.category === "Dairy & fishery side-stream") reasons.push("Animal-origin substrates restricted for insect feed in many markets");
			break;
		case "yeast-scp":
			s = .75 * clamp((carb - 10) / 50 * 100) + .25 * clamp(100 - fibre * 1.2);
			if (carb < 30) reasons.push("Limited fermentable sugars without hydrolysis");
			break;
		case "microalgae-mixo":
			s = .6 * clamp(carb * 1.2) + .4 * band(moisture, 85, 100, 40);
			if (moisture < 80) reasons.push("Requires dissolution or a liquid extract as carbon source");
	}
	if (has(f, "lignin") && [
		"submerged-myco",
		"yeast-scp",
		"enzymatic-hydrolysis"
	].includes(p.id)) {
		s -= 15;
		reasons.push("Lignin recalcitrance — pretreatment adds cost");
	}
	if (has(f, "cyanogenic")) {
		s -= 8;
		reasons.push("Detoxification step required first");
	}
	if (has(f, "spoilage") && p.durationDays[0] > 7) s -= 5;
	return {
		score: Math.round(clamp(s)),
		reasons
	};
}
/** Protein output per tonne DM, kg — heuristic mass balance. */
function proteinYield(f, p, suit = suitability(f, p).score) {
	const pr = f.composition.protein.value * 10;
	const cb = f.composition.carbohydrate.value * 10;
	const fb = f.composition.fibre.value * 10;
	let y = 0;
	switch (p.id) {
		case "fungal-ssf":
			y = pr * .85 + (cb + fb * .25) * .11;
			break;
		case "submerged-myco":
			y = pr * .4 + (cb + fb * .1) * .2;
			break;
		case "enzymatic-hydrolysis":
			y = pr * .68;
			break;
		case "alkaline-extraction":
			y = pr * .58;
			break;
		case "insect-bsf":
			y = (180 + pr * .15) * .42;
			break;
		case "yeast-scp":
			y = pr * .15 + cb * .24;
			break;
		case "microalgae-mixo": y = cb * .17;
	}
	return Math.round(y * (.55 + .45 * (suit / 100)));
}
function endUseFitFor(p, sector) {
	const pool = sector && sector !== "Any" ? END_USES.filter((e) => e.sector === sector) : END_USES;
	if (!pool.length) return 0;
	const best = Math.max(...pool.map((e) => e.pathwayFit[p.id]?.score ?? 0));
	const avg = pool.reduce((a, e) => a + (e.pathwayFit[p.id]?.score ?? 0), 0) / pool.length;
	return Math.round((best * .6 + avg * .4) / 3 * 100);
}
function estimate(f, p, sector = "Any") {
	const s = suitability(f, p);
	const y = proteinYield(f, p, s.score);
	const fibrePenalty = 1 + Math.max(0, f.composition.fibre.value - 40) / 100;
	const water = +(p.waterM3PerT * fibrePenalty).toFixed(1);
	const energy = Math.round(p.energyKwhPerT * fibrePenalty);
	const dmFraction = 1 - f.composition.moisture.value / 100;
	const dm = dmFraction > 0 ? dmFraction : 1;
	const feedCost = f.cost.value / dm;
	const transport = f.transportKm * .12 / dm;
	const cost = y > 0 ? +((p.opexUsdPerT + feedCost + transport) / y).toFixed(2) : 99;
	return {
		pathway: p,
		suitability: s.score,
		reasons: s.reasons,
		proteinYield: y,
		water,
		energy,
		costPerKgProtein: cost,
		scalability: p.scalability,
		endUseFit: endUseFitFor(p, sector)
	};
}
var CRITERIA = [
	{
		id: "suitability",
		label: "Feedstock suitability",
		hint: "Composition fit to pathway requirements"
	},
	{
		id: "yield",
		label: "Protein yield",
		hint: "kg protein per tonne dry matter"
	},
	{
		id: "water",
		label: "Water intensity",
		hint: "Lower is better"
	},
	{
		id: "energy",
		label: "Energy intensity",
		hint: "Lower is better"
	},
	{
		id: "cost",
		label: "Economic feasibility",
		hint: "Cost per kg protein — lower is better"
	},
	{
		id: "scalability",
		label: "Scalability",
		hint: "Ease of scale-up with local equipment"
	},
	{
		id: "endUse",
		label: "End-use fit",
		hint: "Fit to the selected target market"
	}
];
var DEFAULT_WEIGHTS = {
	suitability: 5,
	yield: 4,
	water: 3,
	energy: 3,
	cost: 4,
	scalability: 2,
	endUse: 3
};
/** Min–max normalise each criterion across candidates and combine with weights. */
function rankPathways(f, weights, sector = "Any", pathways = PATHWAYS) {
	const est = pathways.map((p) => estimate(f, p, sector));
	const norm = (vals, v, invert = false) => {
		const lo = Math.min(...vals);
		const hi = Math.max(...vals);
		if (hi === lo) return 100;
		const r = (v - lo) / (hi - lo) * 100;
		return invert ? 100 - r : r;
	};
	const col = (k) => est.map((e) => e[k]);
	const totalW = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
	return est.map((e) => {
		const normalized = {
			suitability: e.suitability,
			yield: norm(col("proteinYield"), e.proteinYield),
			water: norm(col("water"), e.water, true),
			energy: norm(col("energy"), e.energy, true),
			cost: norm(col("costPerKgProtein"), e.costPerKgProtein, true),
			scalability: e.scalability / 5 * 100,
			endUse: e.endUseFit
		};
		const total = Object.keys(weights).reduce((a, k) => a + normalized[k] * weights[k], 0) / totalW;
		return {
			...e,
			normalized,
			total: Math.round(total)
		};
	}).sort((a, b) => b.total - a.total);
}
function aminoAcidScore(f) {
	const ratios = Object.keys(AA_REFERENCE).map((k) => ({
		key: k,
		ratio: f.aminoAcids[k] / AA_REFERENCE[k]
	}));
	const limiting = ratios.reduce((a, b) => b.ratio < a.ratio ? b : a);
	return {
		score: Math.min(1, limiting.ratio),
		limiting: limiting.key,
		ratios
	};
}
function assessEndUses(f) {
	return END_USES.map((e) => {
		let best = null;
		for (const p of PATHWAYS) {
			const fit = e.pathwayFit[p.id]?.score ?? 0;
			const s = suitability(f, p).score;
			const v = fit / 3 * .55 * 100 + s * .45;
			if (!best || v > best.v) best = {
				p,
				v
			};
		}
		const blocked = f.flags.filter((fl) => e.blockingFlags.includes(fl.id)).map((fl) => fl.label);
		const pf = e.pathwayFit[best.p.id];
		return {
			endUse: e,
			score: Math.round(blocked.length ? best.v * .5 : best.v),
			bestPathway: best.p,
			blocked,
			evidence: pf.evidence
		};
	}).sort((a, b) => b.score - a.score);
}
/**
* Greedy allocation: rank every feasible feedstock×pathway pair by the chosen
* objective per unit of the scarcest resource, then fill until volume, water
* or energy caps bind. Transparent and fast — a placeholder for an LP solver.
*/
function allocate(input) {
	const fs = FEEDSTOCKS.filter((f) => input.feedstockIds.includes(f.id));
	const remaining = new Map(fs.map((f) => [f.id, f.annualVolume.value * (1 - f.composition.moisture.value / 100) * input.availableShare]));
	const availableDm = [...remaining.values()].reduce((a, b) => a + b, 0);
	let water = input.waterCap;
	let energy = input.energyCap;
	const binding = /* @__PURE__ */ new Set();
	const pairs = fs.flatMap((f) => PATHWAYS.map((p) => ({
		f,
		p,
		e: estimate(f, p, input.sector)
	})).filter((x) => x.e.suitability >= input.minSuitability && x.e.endUseFit > 0 && x.e.proteinYield > 0));
	const value = (x) => {
		const kg = x.e.proteinYield;
		if (input.objective === "protein") return kg * (.6 + x.e.suitability / 250);
		if (input.objective === "water") return kg / Math.max(.5, x.e.water);
		return kg / Math.max(.1, x.e.costPerKgProtein * kg);
	};
	pairs.sort((a, b) => value(b) - value(a));
	const lines = [];
	for (const x of pairs) {
		const left = remaining.get(x.f.id) ?? 0;
		if (left <= 1) continue;
		const byWater = x.e.water > 0 ? water / x.e.water : Infinity;
		const byEnergy = x.e.energy > 0 ? energy * 1e3 / x.e.energy : Infinity;
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
		energy -= t * x.e.energy / 1e3;
		const protein = t * x.e.proteinYield / 1e3;
		lines.push({
			feedstock: x.f,
			pathway: x.p,
			tonnesDm: t,
			protein,
			water: t * x.e.water,
			energy: t * x.e.energy / 1e3,
			cost: protein * 1e3 * x.e.costPerKgProtein,
			suitability: x.e.suitability
		});
	}
	const unallocated = fs.map((f) => ({
		feedstock: f,
		tonnesDm: Math.round(remaining.get(f.id) ?? 0)
	})).filter((u) => u.tonnesDm > 1).map((u) => ({
		...u,
		reason: pairs.some((p) => p.f.id === u.feedstock.id) ? [...binding].join(" & ") || "Resource cap reached" : "No pathway meets suitability threshold"
	}));
	const sum = (k) => lines.reduce((a, l) => a + l[k], 0);
	return {
		lines,
		unallocated,
		totals: {
			protein: sum("protein"),
			water: sum("water"),
			energy: sum("energy"),
			cost: sum("cost"),
			tonnesDm: sum("tonnesDm"),
			availableDm
		},
		binding: [...binding]
	};
}
export { CRITERIA, DEFAULT_WEIGHTS, allocate, aminoAcidScore, assessEndUses, rankPathways };
