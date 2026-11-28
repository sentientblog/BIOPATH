import { __toESM } from "../_runtime.mjs";
import { Button, Icon, PATHWAYS, ProvenanceTag, Route$4, Skeleton, cn, fmt, listFeedstocks } from "./router-ChhPpYzB.mjs";
import { EmptyState, PageHeader, Panel, RangeField, ScoreBar, SectionHeader, SegmentedControl, scoreTone } from "./page-BYeyT62h.mjs";
import { RadarChart } from "./radar-chart-oepl8MWx.mjs";
import { Badge } from "./badge-CA5yuWae.mjs";
import { Card } from "./card-DaJmDXv_.mjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select-CgaOJK7s.mjs";
import { CRITERIA, DEFAULT_WEIGHTS, rankPathways } from "./scoring-B089F6La.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { ChevronDown } from "../_libs/lucide-react2.mjs";
import { Accordion as Accordion$1, AccordionContent as AccordionContent$1, AccordionHeader, AccordionItem as AccordionItem$1, AccordionTrigger as AccordionTrigger$1 } from "../_libs/@radix-ui/react-accordion+[2...].mjs";
// node_modules/.nitro/vite/services/ssr/assets/pathways-BJ_8BCxn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Accordion({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion$1, {
		"data-slot": "accordion",
		...props
	});
}
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionItem$1, {
		"data-slot": "accordion-item",
		className: cn("border-b last:border-b-0", className),
		...props
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionHeader, {
		className: "flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger$1, {
			"data-slot": "accordion-trigger",
			className: cn("flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className),
			...props,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })]
		})
	});
}
function AccordionContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent$1, {
		"data-slot": "accordion-content",
		className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("pt-0 pb-4", className),
			children
		})
	});
}
var SECTORS = [
	{
		value: "Any",
		label: "Any sector"
	},
	{
		value: "Human food",
		label: "Human food"
	},
	{
		value: "Animal feed",
		label: "Animal feed"
	},
	{
		value: "Pet food",
		label: "Pet food"
	},
	{
		value: "Industrial",
		label: "Industrial"
	}
];
var CAPEX_COLOR = {
	Low: "text-brand-strong",
	Medium: "text-amber-ink",
	High: "text-risk-ink"
};
var TRL_COLOR = (n) => n >= 7 ? "bg-mint text-on-mint" : n >= 5 ? "bg-amber-soft text-amber-ink" : "bg-surface-high text-on-surface-variant";
function PathwaysPage() {
	const { focus } = Route$4.useSearch();
	const [feedstocks, setFeedstocks] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [feedstockId, setFeedstockId] = (0, import_react.useState)(focus ?? "");
	const [sector, setSector] = (0, import_react.useState)("Any");
	const [weights, setWeights] = (0, import_react.useState)({ ...DEFAULT_WEIGHTS });
	const [view, setView] = (0, import_react.useState)("table");
	(0, import_react.useEffect)(() => {
		listFeedstocks().then((data) => {
			setFeedstocks(data);
			if (!feedstockId && data.length > 0) setFeedstockId(data[0].id);
			setLoading(false);
		});
	}, []);
	const feedstock = feedstocks.find((f) => f.id === feedstockId);
	const rankings = (0, import_react.useMemo)(() => {
		if (!feedstock) return [];
		return rankPathways(feedstock, weights, sector);
	}, [
		feedstock,
		weights,
		sector
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Bioconversion",
				title: "Pathway Optimizer",
				description: "Rank conversion pathways against a chosen feedstock using weighted multi-criteria scoring. Estimates are heuristic — not engineering data."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-48",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-sm font-medium text-on-surface",
								children: "Feedstock"
							}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: feedstockId,
								onValueChange: setFeedstockId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select feedstock" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: feedstocks.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: f.id,
									children: [
										f.name,
										" · ",
										f.category
									]
								}, f.id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-sm font-medium text-on-surface",
								children: "Target market"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: sector,
								onValueChange: (v) => setSector(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SECTORS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s.value,
									children: s.label
								}, s.value)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SegmentedControl, {
								label: "View as",
								value: view,
								onChange: setView,
								options: [{
									value: "table",
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "table_rows",
										size: 16
									}), "Table"] })
								}, {
									value: "radar",
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "radar",
										size: 16
									}), "Radar"] })
								}]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: "weights",
						className: "border-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-sm font-medium text-on-surface-variant hover:no-underline",
							children: "Scoring weights"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: CRITERIA.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RangeField, {
								id: `w-${c.id}`,
								label: c.label,
								hint: c.hint,
								value: weights[c.id],
								min: 0,
								max: 10,
								step: 1,
								onChange: (v) => setWeights((prev) => ({
									...prev,
									[c.id]: v
								}))
							}, c.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "mt-3",
							onClick: () => setWeights({ ...DEFAULT_WEIGHTS }),
							children: "Reset to defaults"
						})] })]
					})
				})]
			}),
			!feedstock ? loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-96 rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: "alt_route",
				title: "No feedstocks loaded"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/feedstocks/$feedstockId",
							params: { feedstockId: feedstock.id },
							className: "flex items-center gap-2 text-brand-strong hover:underline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "eco",
								size: 18
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: feedstock.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: feedstock.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted-foreground",
							children: [
								"Protein ",
								fmt(feedstock.composition.protein.value, 1),
								"% DM ·",
								" ",
								feedstock.availability
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvenanceTag, { kind: feedstock.composition.protein.provenance })
					]
				}), view === "table" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathwayTable, { rankings }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PathwayRadar, { rankings })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					title: "Pathway library",
					description: "All conversion pathways in the BIOPATH reference set."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: PATHWAYS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-on-surface",
									children: p.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: p.family
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", TRL_COLOR(p.trl)),
									children: ["TRL ", p.trl]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-on-surface-variant",
								children: p.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-x-4 gap-y-1 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: ["Product protein:", " "]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "type-data font-medium",
										children: [
											p.productProtein[0],
											"–",
											p.productProtein[1],
											"%"
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Capex: "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("type-data font-medium", CAPEX_COLOR[p.capex]),
										children: p.capex
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Water: "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "type-data font-medium",
										children: [p.waterM3PerT, " m³/t"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Energy: "
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "type-data font-medium",
										children: [p.energyKwhPerT, " kWh/t"]
									})] })
								]
							})
						]
					}, p.id))
				})]
			})
		]
	});
}
function PathwayTable({ rankings }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: rankings.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: cn("p-5", i === 0 && "border-brand/40"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "type-data w-5 text-center text-muted-foreground",
							children: ["#", i + 1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-on-surface",
							children: r.pathway.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "text-[10px]",
								children: r.pathway.family
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium", TRL_COLOR(r.pathway.trl)),
								children: ["TRL ", r.pathway.trl]
							})]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-2xl font-bold", scoreTone(r.total) === "brand" ? "text-brand-strong" : scoreTone(r.total) === "amber" ? "text-amber-ink" : "text-risk-ink"),
							children: r.total
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "composite score"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-6",
					children: CRITERIA.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-xs text-muted-foreground",
						children: c.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
						value: r.normalized[c.id],
						tone: scoreTone(r.normalized[c.id]),
						label: c.label
					})] }, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-xs sm:grid-cols-4",
					children: [
						{
							l: "Suitability",
							v: `${r.suitability}%`
						},
						{
							l: "Protein yield",
							v: `${r.proteinYield} kg/t DM`
						},
						{
							l: "Water",
							v: `${r.water} m³/t DM`
						},
						{
							l: "Cost / kg prot.",
							v: `$${fmt(r.costPerKgProtein, 2)}`
						}
					].map(({ l, v }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [l, ": "]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "type-data font-medium text-on-surface",
						children: v
					})] }, l))
				}),
				r.reasons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 list-inside list-disc space-y-0.5 text-xs text-on-surface-variant",
					children: r.reasons.map((reason, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: reason }, ri))
				})
			]
		}, r.pathway.id))
	});
}
function PathwayRadar({ rankings }) {
	const top3 = rankings.slice(0, 3);
	const COLORS = [
		"var(--brand)",
		"var(--forest)",
		"var(--amber)"
	];
	const axes = CRITERIA.map((c) => c.label);
	const series = top3.map((r, i) => ({
		label: r.pathway.short,
		color: COLORS[i],
		values: CRITERIA.map((c) => r.normalized[c.id])
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
		title: "Multi-criteria radar (top 3 pathways)",
		description: "Normalised scores per criterion — wider polygon is better overall."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex flex-col gap-6 lg:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarChart, {
			axes,
			series,
			size: 360,
			ariaLabel: "Pathway comparison radar chart"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 space-y-3",
			children: top3.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-3 rounded-sm",
					style: { background: COLORS[i] }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium text-on-surface",
							children: r.pathway.short
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "type-data text-brand-strong",
							children: r.total
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
						value: r.total,
						tone: scoreTone(r.total),
						showValue: false
					})]
				})]
			}, r.pathway.id))
		})]
	})] });
}
export { PathwaysPage as component };
