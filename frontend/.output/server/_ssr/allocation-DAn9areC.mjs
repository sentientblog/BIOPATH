import { __toESM } from "../_runtime.mjs";
import { EmptyState, PageHeader, Panel, RangeField, ScoreBar, SectionHeader, SegmentedControl, StatCard, StatusPill, scoreTone } from "./page-BYeyT62h.mjs";
import { Button, DemoChip, Skeleton, fmt, fmtCompact, fmtInt, listFeedstocks } from "./router-ChhPpYzB.mjs";
import { ChartTooltip, useWidth } from "./chart-tooltip-DR1YBCQa.mjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table-D1-I9fDM.mjs";
import { allocate } from "./scoring-B089F6La.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/allocation-DAn9areC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Grouped vertical bar chart in the style of the Stitch "Intelligence overview":
* dashed gridlines, rounded 4px bars, muted axis labels.
*/
function GroupedBarChart({ categories, series, height = 240, yMax, yTicks = 4, yFormat = (v) => `${v}`, ariaLabel, onSelect, selectedIndex }) {
	const [ref, width] = useWidth();
	const [hover, setHover] = (0, import_react.useState)(null);
	const pad = {
		top: 12,
		right: 8,
		bottom: 28,
		left: 40
	};
	const max = yMax ?? Math.max(1, ...series.flatMap((s) => s.values)) * 1.1;
	const innerW = width - pad.left - pad.right;
	const innerH = height - pad.top - pad.bottom;
	const groupW = innerW / Math.max(1, categories.length);
	const barW = Math.min(24, groupW * .62 / series.length);
	const gap = 4;
	const y = (v) => pad.top + innerH - v / max * innerH;
	const ticks = Array.from({ length: yTicks + 1 }, (_, i) => max / yTicks * i);
	const narrow = groupW < 64;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: "relative w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width,
				height,
				role: "img",
				"aria-label": ariaLabel,
				className: "block text-on-surface-variant",
				children: [ticks.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: pad.left,
					x2: width - pad.right,
					y1: y(t),
					y2: y(t),
					stroke: "currentColor",
					strokeOpacity: i === 0 ? .25 : .12,
					strokeDasharray: i === 0 ? void 0 : "3 3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: pad.left - 8,
					y: y(t) + 4,
					fontSize: "11",
					textAnchor: "end",
					fill: "currentColor",
					className: "tnum",
					children: yFormat(Math.round(t))
				})] }, i)), categories.map((c, ci) => {
					const gx = pad.left + groupW * ci + groupW / 2;
					const total = series.length * barW + (series.length - 1) * gap;
					const active = hover === ci || selectedIndex === ci;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						onMouseEnter: () => setHover(ci),
						onMouseLeave: () => setHover(null),
						onClick: () => onSelect?.(ci),
						style: { cursor: onSelect ? "pointer" : "default" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: pad.left + groupW * ci,
								y: pad.top,
								width: groupW,
								height: innerH,
								fill: active ? "var(--surface-container-low)" : "transparent",
								rx: 6
							}),
							series.map((s, si) => {
								const v = s.values[ci] ?? 0;
								const bx = gx - total / 2 + si * (barW + gap);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: bx,
									y: y(v),
									width: barW,
									height: Math.max(0, y(0) - y(v)),
									rx: 4,
									fill: s.color,
									className: "transition-[y,height] duration-500 motion-reduce:transition-none"
								}, s.key);
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
								x: gx,
								y: height - 8,
								fontSize: "11",
								textAnchor: "middle",
								fill: "currentColor",
								fontWeight: selectedIndex === ci ? 600 : 400,
								children: narrow && c.length > 9 ? `${c.slice(0, 8)}…` : c
							})
						]
					}, c);
				})]
			}),
			hover !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChartTooltip, {
				x: pad.left + groupW * hover + groupW / 2,
				y: pad.top,
				containerWidth: width,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 font-semibold text-on-surface",
					children: categories[hover]
				}), series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 text-on-surface-variant",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2 rounded-sm",
							style: { background: s.color }
						}), s.label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "type-data text-on-surface",
						children: s.format ? s.format(s.values[hover]) : s.values[hover]
					})]
				}, s.key))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "sr-only",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", { children: ariaLabel }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Category" }), series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: s.label }, s.key))] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: categories.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c }), series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: s.values[i] }, s.key))] }, c)) })
				]
			})
		]
	});
}
function AllocationPage() {
	const [feedstocks, setFeedstocks] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [availableShare, setAvailableShare] = (0, import_react.useState)(60);
	const [waterCap, setWaterCap] = (0, import_react.useState)(12e4);
	const [energyCap, setEnergyCap] = (0, import_react.useState)(8e3);
	const [minSuitability, setMinSuitability] = (0, import_react.useState)(40);
	const [objective, setObjective] = (0, import_react.useState)("protein");
	const [sector] = (0, import_react.useState)("Any");
	(0, import_react.useEffect)(() => {
		listFeedstocks().then((data) => {
			setFeedstocks(data);
			const def = new Set([
				"coffee-pulp",
				"brewers-spent-grain",
				"soy-okara",
				"cane-molasses",
				"fish-processing"
			].filter((id) => data.some((f) => f.id === id)));
			setSelected(def);
			setLoading(false);
		});
	}, []);
	const input = (0, import_react.useMemo)(() => ({
		feedstockIds: [...selected],
		availableShare: availableShare / 100,
		waterCap,
		energyCap,
		objective,
		sector,
		minSuitability
	}), [
		selected,
		availableShare,
		waterCap,
		energyCap,
		objective,
		sector,
		minSuitability
	]);
	const result = (0, import_react.useMemo)(() => selected.size > 0 && feedstocks.length > 0 ? allocate(input) : null, [
		input,
		feedstocks,
		selected
	]);
	const toggle = (id) => setSelected((prev) => {
		const next = new Set(prev);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		return next;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Bioconversion",
				title: "Resource Allocation",
				description: "Greedy allocation of feedstock volumes to pathways under water, energy and volume constraints. A transparent placeholder for an LP solver.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoChip, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Protein output",
						value: result ? `${fmtCompact(result.totals.protein * 1e3)} kg` : "—",
						icon: "science",
						footnote: "per year, dry-matter basis"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Feedstock allocated",
						value: result ? `${fmtInt(result.totals.tonnesDm)} t` : "—",
						icon: "eco",
						delta: result ? `${fmt(Math.round(result.totals.tonnesDm / Math.max(1, result.totals.availableDm) * 100))}%` : void 0,
						deltaTone: "brand",
						footnote: "of available dry matter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Water use",
						value: result ? `${fmtCompact(result.totals.water)} m³` : "—",
						icon: "water_drop",
						delta: result ? `cap ${fmtCompact(waterCap)} m³` : void 0,
						deltaTone: result && result.totals.water > waterCap * .95 ? "risk" : "muted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Energy use",
						value: result ? `${fmtCompact(result.totals.energy)} MWh` : "—",
						icon: "bolt",
						delta: result ? `cap ${fmtCompact(energyCap)} MWh` : void 0,
						deltaTone: result && result.totals.energy > energyCap * .95 ? "risk" : "muted"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "space-y-5 lg:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Scenario inputs",
							description: "Select feedstocks and set constraints."
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-72 space-y-1 overflow-y-auto pr-1",
							children: feedstocks.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-surface-high",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: selected.has(f.id),
										onChange: () => toggle(f.id),
										className: "size-4 accent-brand"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 text-sm text-on-surface",
										children: f.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "type-data text-xs text-muted-foreground",
										children: [fmtCompact(f.annualVolume.value), " t/yr"]
									})
								]
							}, f.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 border-t border-hairline pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeField, {
									id: "alloc-share",
									label: "Available share",
									value: availableShare,
									min: 10,
									max: 100,
									step: 5,
									onChange: setAvailableShare,
									format: (v) => `${v}%`,
									hint: "Fraction of each feedstock's annual volume diverted to protein production."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeField, {
									id: "alloc-water",
									label: "Water cap",
									value: waterCap,
									min: 2e4,
									max: 5e5,
									step: 1e4,
									onChange: setWaterCap,
									format: (v) => `${fmtCompact(v)} m³/yr`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeField, {
									id: "alloc-energy",
									label: "Energy cap",
									value: energyCap,
									min: 1e3,
									max: 5e4,
									step: 500,
									onChange: setEnergyCap,
									format: (v) => `${fmtCompact(v)} MWh/yr`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeField, {
									id: "alloc-suit",
									label: "Min suitability",
									value: minSuitability,
									min: 20,
									max: 80,
									step: 5,
									onChange: setMinSuitability,
									format: (v) => `${v}%`,
									hint: "Discard feedstock × pathway pairs below this technical suitability."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-on-surface",
										children: "Objective"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
										label: "Optimisation objective",
										value: objective,
										onChange: setObjective,
										options: [
											{
												value: "protein",
												label: "Max protein"
											},
											{
												value: "water",
												label: "Water-efficient"
											},
											{
												value: "cost",
												label: "Cost-efficient"
											}
										]
									})]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-6 lg:col-span-7",
					children: !result || result.lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: "pie_chart",
						title: "No allocation",
						description: selected.size === 0 ? "Select at least one feedstock to run the allocation." : "No feedstock × pathway pair meets the suitability threshold. Try lowering it.",
						action: selected.size === 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => setMinSuitability(Math.max(20, minSuitability - 10)),
							children: [
								"Lower threshold to ",
								Math.max(20, minSuitability - 10),
								"%"
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Allocation result",
							badge: result.binding.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusPill, {
								tone: "amber",
								children: ["Binding: ", result.binding.join(" & ")]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: "sage",
								children: "Within all caps"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Feedstock" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Pathway" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "text-right",
									children: "t DM"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "text-right",
									children: "Protein"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "text-right",
									children: "Water"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
									className: "text-right",
									children: "Suit."
								})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: result.lines.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "font-medium",
									children: l.feedstock.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: l.pathway.short
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "type-data text-right",
									children: fmtInt(l.tonnesDm)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									className: "type-data text-right",
									children: [fmt(l.protein, 1), " t"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
									className: "type-data text-right",
									children: [fmtCompact(l.water), " m³"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
										value: l.suitability,
										tone: scoreTone(l.suitability)
									})
								})
							] }, `${l.feedstock.id}-${l.pathway.id}-${i}`)) })] })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Protein output by feedstock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupedBarChart, {
								ariaLabel: "Protein output by feedstock",
								categories: result.lines.map((l) => l.feedstock.name.split(" ")[0]),
								series: [{
									key: "protein",
									label: "Protein (t/yr)",
									color: "var(--brand)",
									values: result.lines.map((l) => Math.round(l.protein * 10) / 10)
								}],
								yFormat: (v) => `${v}t`
							})
						})] }),
						result.unallocated.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Unallocated volume",
							description: "Feedstock volume that could not be allocated under the current constraints."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1.5 text-sm",
							children: result.unallocated.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex flex-wrap justify-between gap-2 rounded-lg bg-surface-low px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-on-surface",
									children: u.feedstock.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										fmtInt(u.tonnesDm),
										" t DM — ",
										u.reason
									]
								})]
							}, u.feedstock.id))
						})] })
					] })
				})]
			})
		]
	});
}
export { AllocationPage as component };
