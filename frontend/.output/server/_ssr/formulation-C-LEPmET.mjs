import { __toESM } from "../_runtime.mjs";
import { EmptyState, PageHeader, Panel, RangeField, SectionHeader, StatusPill } from "./page-BYeyT62h.mjs";
import { AA_REFERENCE, AMINO_ACID_LABELS, ProvenanceTag, Skeleton, cn, fmt, listFeedstocks } from "./router-ChhPpYzB.mjs";
import { RadarChart } from "./radar-chart-oepl8MWx.mjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select-CgaOJK7s.mjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table-D1-I9fDM.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/formulation-C-LEPmET.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ARCHETYPES = [
	{
		id: "meat-analogue",
		name: "Meat analogue",
		minProtein: 40,
		aaTarget: .8,
		maxCostPerKg: 6.5,
		humanFood: true,
		description: "High-protein structuring ingredient for extruded or hydrated meat alternatives."
	},
	{
		id: "protein-bar",
		name: "Protein bar",
		minProtein: 25,
		aaTarget: .7,
		maxCostPerKg: 4,
		humanFood: true,
		description: "Blended protein base for snack bars; moderate protein, cost-sensitive."
	},
	{
		id: "fortified-staple",
		name: "Fortified staple",
		minProtein: 15,
		aaTarget: .6,
		maxCostPerKg: 1.8,
		humanFood: true,
		description: "Partial flour replacement in breads and porridges; low cost threshold."
	},
	{
		id: "aqua-feed",
		name: "Aquaculture feed",
		minProtein: 30,
		aaTarget: .75,
		maxCostPerKg: 1.2,
		humanFood: false,
		description: "Feed meal replacing fish meal; lysine and methionine are the key amino acids."
	}
];
var DEFAULT_SELECTION = [
	"soy-okara",
	"sunflower-cake",
	"brewers-spent-grain"
];
function FormulationPage() {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [feedstocks, setFeedstocks] = (0, import_react.useState)([]);
	const [archetypeId, setArchetypeId] = (0, import_react.useState)(ARCHETYPES[0].id);
	const [selected, setSelected] = (0, import_react.useState)(DEFAULT_SELECTION);
	const [shares, setShares] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		listFeedstocks().then((data) => {
			setFeedstocks(data);
			const init = {};
			DEFAULT_SELECTION.forEach((id, i) => {
				if (data.some((f) => f.id === id)) init[id] = [
					50,
					30,
					20
				][i];
			});
			setShares(init);
			setLoading(false);
		});
	}, []);
	const archetype = ARCHETYPES.find((a) => a.id === archetypeId);
	const ingredients = selected.map((id) => feedstocks.find((f) => f.id === id)).filter((f) => Boolean(f));
	const totalShare = ingredients.reduce((a, f) => a + (shares[f.id] ?? 0), 0) || 1;
	const normalized = (0, import_react.useMemo)(() => new Map(ingredients.map((f) => [f.id, (shares[f.id] ?? 0) / totalShare * 100])), [
		ingredients,
		shares,
		totalShare
	]);
	const blend = (0, import_react.useMemo)(() => {
		if (ingredients.length === 0) return null;
		let protein = 0;
		let moisture = 0;
		let lipid = 0;
		let ash = 0;
		let cost = 0;
		const aaSum = {};
		for (const f of ingredients) {
			const w = normalized.get(f.id) / 100;
			const dm = 1 - f.composition.moisture.value / 100;
			protein += f.composition.protein.value * w * dm;
			moisture += f.composition.moisture.value * w;
			lipid += f.composition.lipid.value * w * dm;
			ash += f.composition.ash.value * w * dm;
			cost += f.cost.value / dm * w;
			for (const k of Object.keys(AA_REFERENCE)) {
				aaSum[k] ??= {
					w: 0,
					p: 0
				};
				aaSum[k].w += w * f.composition.protein.value * dm;
				aaSum[k].p += w * f.composition.protein.value * dm * f.aminoAcids[k];
			}
		}
		const aminoAcids = {};
		for (const k of Object.keys(AA_REFERENCE)) aminoAcids[k] = aaSum[k].w > 0 ? aaSum[k].p / aaSum[k].w : 0;
		const ratios = Object.keys(AA_REFERENCE).map((k) => ({
			key: k,
			ratio: aminoAcids[k] / AA_REFERENCE[k]
		}));
		const limiting = ratios.reduce((a, b) => b.ratio < a.ratio ? b : a);
		const dmTotal = 100 - moisture;
		const proteinDm = dmTotal > 0 ? protein / dmTotal * 100 : 0;
		const blockers = ingredients.flatMap((f) => f.flags).filter((fl) => archetype.humanFood && [
			"mycotoxin",
			"gossypol",
			"metals",
			"cyanogenic"
		].includes(fl.id)).map((fl) => fl.label);
		const proteinKg = protein / 100 * 100;
		return {
			protein: proteinDm,
			moisture,
			lipid,
			ash,
			cost,
			aminoAcids,
			limiting,
			ratios,
			proteinKg,
			costPerKgProtein: proteinKg > 0 ? cost / proteinKg : Infinity,
			blockers
		};
	}, [
		ingredients,
		normalized,
		archetype
	]);
	const toggle = (id) => {
		setSelected((prev) => {
			if (prev.includes(id)) return prev.filter((x) => x !== id);
			if (prev.length >= 5) return prev;
			return [...prev, id];
		});
	};
	const setShare = (id, v) => setShares((prev) => ({
		...prev,
		[id]: v
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Product & Market",
				title: "Formulation Workbench",
				description: "Compare product archetypes, select ingredient streams and estimate blended composition, amino-acid quality and cost. All nutritional values are simulated indicative data; pathway-level processing effects are not modelled."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-64 flex-1 sm:max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-sm font-medium text-on-surface",
						children: "Product archetype"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: archetypeId,
						onValueChange: setArchetypeId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ARCHETYPES.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: a.id,
							children: a.name
						}, a.id)) })]
					})]
				}), archetype && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex-1 text-sm text-muted-foreground",
					children: [
						archetype.description,
						" Target: ≥",
						archetype.minProtein,
						"% protein, ≥",
						Math.round(archetype.aaTarget * 100),
						"% of reference AA pattern, ≤$",
						fmt(archetype.maxCostPerKg, 2),
						"/kg protein."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "space-y-4 lg:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Ingredients",
							description: "Select up to 5 feedstock streams and set inclusion shares.",
							badge: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusPill, {
								tone: selected.length >= 5 ? "amber" : "sage",
								children: [selected.length, "/5"]
							})
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-64 space-y-1 overflow-y-auto pr-1",
							children: feedstocks.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: cn("flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-surface-high", !selected.includes(f.id) && selected.length >= 5 && "opacity-50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: selected.includes(f.id),
										disabled: !selected.includes(f.id) && selected.length >= 5,
										onChange: () => toggle(f.id),
										className: "size-4 accent-brand"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 text-sm text-on-surface",
										children: f.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "type-data text-xs text-muted-foreground",
										children: [fmt(f.composition.protein.value, 0), "% prot."]
									})
								]
							}, f.id))
						}),
						ingredients.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4 border-t border-hairline pt-4",
							children: ingredients.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeField, {
								id: `inc-${f.id}`,
								label: f.name,
								value: shares[f.id] ?? 0,
								min: 0,
								max: 100,
								step: 5,
								onChange: (v) => setShare(f.id, v),
								format: () => `${fmt(normalized.get(f.id) ?? 0, 0)}%`,
								hint: `Raw share ${shares[f.id] ?? 0} — normalised to 100%`
							}, f.id))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-6 lg:col-span-7",
					children: !blend || ingredients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: "biotech",
						title: "No ingredients selected",
						description: "Pick at least one feedstock stream to estimate the formulation."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Protein (DM)",
									value: `${fmt(blend.protein, 1)}%`,
									ok: blend.protein >= archetype.minProtein,
									target: `≥ ${archetype.minProtein}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Limiting AA",
									value: `${AMINO_ACID_LABELS[blend.limiting.key]} ${fmt(blend.limiting.ratio, 2)}×`,
									ok: blend.limiting.ratio >= archetype.aaTarget,
									target: `≥ ${fmt(archetype.aaTarget, 2)}× ref`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Cost",
									value: `$${fmt(blend.costPerKgProtein, 2)}/kg prot.`,
									ok: blend.costPerKgProtein <= archetype.maxCostPerKg,
									target: `≤ $${fmt(archetype.maxCostPerKg, 2)}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									label: "Moisture",
									value: `${fmt(blend.moisture, 0)}%`,
									ok: blend.moisture <= 30,
									target: "≤ 30%"
								})
							]
						}),
						blend.blockers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-risk/30 bg-risk-soft/40 p-4 text-sm text-risk-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: "Blocking risks for human food"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1",
								children: [blend.blockers.join(" · "), " — these ingredients carry risk flags that block food use until cleared by screening."]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Blended amino acid profile",
							description: "Weighted by each stream's protein contribution, against the FAO (2013) adult reference.",
							badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvenanceTag, {
								kind: "estimated",
								full: true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-6 lg:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarChart, {
								axes: Object.keys(AMINO_ACID_LABELS).map((k) => AMINO_ACID_LABELS[k]),
								series: [{
									label: "Blend",
									color: "var(--brand)",
									values: blend.ratios.map((r) => Math.min(100, r.ratio * 66))
								}],
								ariaLabel: "Blended amino acid profile"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "AA" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "text-right",
										children: "g/100g prot."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "text-right",
										children: "Ref"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "text-right",
										children: "Ratio"
									})
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: blend.ratios.map(({ key, ratio }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									className: blend.limiting.key === key ? "bg-amber-soft/40" : "",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: AMINO_ACID_LABELS[key] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "type-data text-right",
											children: fmt(blend.aminoAcids[key], 1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "type-data text-right text-muted-foreground",
											children: fmt(AA_REFERENCE[key], 2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: cn("type-data text-right", ratio < archetype.aaTarget ? "text-risk-ink" : "text-brand-strong"),
											children: fmt(ratio, 2)
										})
									]
								}, key)) })] })
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Processing constraints & trade-offs",
							description: "Heuristic guidance based on blend properties."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-2 text-sm text-on-surface-variant",
							children: [
								blend.moisture > 60 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"• High moisture (",
									fmt(blend.moisture, 0),
									"%) — stabilisation (drying or ensiling) required before storage."
								] }),
								blend.lipid > 10 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"• Lipid ",
									fmt(blend.lipid, 1),
									"% DM — defatting recommended for concentrates; oxidation risk in storage."
								] }),
								blend.protein < archetype.minProtein && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"• Protein below the ",
									archetype.name,
									" target — consider a concentration step (extraction/fermentation) or higher-protein streams."
								] }),
								blend.limiting.ratio < archetype.aaTarget && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"• ",
									AMINO_ACID_LABELS[blend.limiting.key],
									" is limiting — blend with a stream rich in this amino acid (e.g., sesame for methionine)."
								] }),
								blend.costPerKgProtein > archetype.maxCostPerKg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Cost above target — increase share of lower-cost streams or reduce transport distance." }),
								blend.moisture <= 60 && blend.lipid <= 10 && blend.protein >= archetype.minProtein && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Blend meets the archetype's headline targets on protein, lipid and moisture." })
							]
						})] })
					] })
				})]
			})
		]
	});
}
function Metric({ label, value, ok, target }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl border p-4", ok ? "border-brand/30 bg-mint/30" : "border-amber/40 bg-amber-soft/40"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 text-lg font-bold", ok ? "text-brand-strong" : "text-amber-ink"),
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: ["target ", target]
			})
		]
	});
}
export { FormulationPage as component };
