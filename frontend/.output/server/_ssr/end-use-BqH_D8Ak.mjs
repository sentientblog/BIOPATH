import { __toESM } from "../_runtime.mjs";
import { Icon, MeasureValue, Skeleton, cn, fmt, listEndUses, listFeedstocks } from "./router-ChhPpYzB.mjs";
import { EmptyState, PageHeader, Panel, SectionHeader, StatusPill, scoreTone } from "./page-BYeyT62h.mjs";
import { Badge } from "./badge-CA5yuWae.mjs";
import { Card } from "./card-DaJmDXv_.mjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select-CgaOJK7s.mjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table-D1-I9fDM.mjs";
import { assessEndUses } from "./scoring-B089F6La.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/end-use-BqH_D8Ak.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SECTOR_COLORS = {
	"Human food": "bg-mint text-on-mint",
	"Animal feed": "bg-amber-soft text-amber-ink",
	"Pet food": "bg-surface-high text-on-surface-variant",
	Industrial: "bg-surface-low text-on-surface-variant",
	Agriculture: "bg-sage text-forest"
};
function EndUsePage() {
	const [feedstocks, setFeedstocks] = (0, import_react.useState)([]);
	const [endUses, setEndUses] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [feedstockId, setFeedstockId] = (0, import_react.useState)("");
	const [sectorFilter, setSectorFilter] = (0, import_react.useState)("All");
	(0, import_react.useEffect)(() => {
		Promise.all([listFeedstocks(), listEndUses()]).then(([fs, eu]) => {
			setFeedstocks(fs);
			setEndUses(eu);
			if (fs.length > 0) setFeedstockId(fs[0].id);
			setLoading(false);
		});
	}, []);
	const feedstock = feedstocks.find((f) => f.id === feedstockId);
	const assessments = (0, import_react.useMemo)(() => feedstock ? assessEndUses(feedstock) : [], [feedstock]);
	const filtered = (0, import_react.useMemo)(() => sectorFilter === "All" ? assessments : assessments.filter((a) => a.endUse.sector === sectorFilter), [assessments, sectorFilter]);
	const sectors = (0, import_react.useMemo)(() => Array.from(new Set(endUses.map((e) => e.sector))), [endUses]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Product & Market",
				title: "End-Use Intelligence",
				description: "Evaluate feedstock × pathway suitability for food, feed, pet food and industrial applications. Fit scores are expert-style heuristic judgements."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-48",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-sm font-medium text-on-surface",
						children: "Feedstock"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: feedstockId,
						onValueChange: setFeedstockId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: feedstocks.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: f.id,
							children: f.name
						}, f.id)) })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-sm font-medium text-on-surface",
						children: "Sector"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: sectorFilter,
						onValueChange: (v) => setSectorFilter(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "All",
							children: "All sectors"
						}), sectors.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: s,
							children: s
						}, s))] })]
					})]
				})]
			}),
			!feedstock ? loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-96 rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: "category",
				title: "No feedstocks loaded"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					feedstock.flags.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: cn("text-xs", f.severity === "critical" ? "border-risk/40 text-risk-ink" : f.severity === "warning" ? "border-amber/40 text-amber-ink" : ""),
						children: [f.severity === "critical" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "warning",
							size: 12,
							className: "mr-1 text-risk"
						}), f.label]
					}, f.id))
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: loading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-32 rounded-xl" }, i)) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "No end uses match the selected sector" }) : filtered.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EndUseCard, {
					assessment: a,
					feedstock
				}, a.endUse.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					title: "End-use catalogue",
					description: "All product categories with minimum protein requirements and pathway compatibility."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-xl border border-hairline bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "End use" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Sector" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Min protein" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Value tier" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Price (est.)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Blocking flags" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: endUses.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: e.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground max-w-xs",
							children: e.description
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", SECTOR_COLORS[e.sector]),
							children: e.sector
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "type-data",
							children: [e.minProtein, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: e.valueTier === "High" ? "sage" : e.valueTier === "Medium" ? "amber" : "neutral",
							children: e.valueTier
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasureValue, { m: e.indicativePrice }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							className: "max-w-xs text-xs text-muted-foreground",
							children: e.blockingFlags.join(", ")
						})
					] }, e.id)) })] })
				})]
			})
		]
	});
}
function EndUseCard({ assessment, feedstock }) {
	const { endUse: eu, score, bestPathway, blocked, evidence } = assessment;
	const blocked_bool = blocked.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: cn("p-5", blocked_bool && "opacity-70"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-on-surface",
							children: eu.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", SECTOR_COLORS[eu.sector]),
							children: eu.sector
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusPill, {
							tone: eu.valueTier === "High" ? "sage" : eu.valueTier === "Medium" ? "amber" : "neutral",
							children: [eu.valueTier, " value"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "outline",
							className: "text-xs",
							children: ["Evidence: ", evidence]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-on-surface-variant",
					children: eu.description
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-2xl font-bold", scoreTone(score) === "brand" ? "text-brand-strong" : scoreTone(score) === "amber" ? "text-amber-ink" : "text-risk-ink"),
						children: score
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "fit score"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Best pathway: "
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-on-surface",
						children: bestPathway.name
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Min protein: "
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "type-data font-medium",
						children: [
							eu.minProtein,
							"% · feedstock has",
							" ",
							fmt(feedstock.composition.protein.value, 1),
							"%"
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Price: "
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasureValue, { m: eu.indicativePrice })] })
				]
			}),
			blocked_bool && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-lg border border-risk/30 bg-risk-soft/40 px-3 py-2 text-xs text-risk-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Blocked:" }),
					" ",
					blocked.join(" · "),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 text-muted-foreground",
						children: "— these risk flags must be resolved before use in this application."
					})
				]
			}),
			eu.regulatory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "gavel",
					size: 12,
					className: "mr-1 inline-block"
				}), eu.regulatory]
			})
		]
	});
}
export { EndUsePage as component };
