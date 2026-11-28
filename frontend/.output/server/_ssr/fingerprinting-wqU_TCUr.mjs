import { __toESM } from "../_runtime.mjs";
import { FEEDSTOCKS, Icon, Skeleton, cn, fmt, listBatches } from "./router-ChhPpYzB.mjs";
import { EmptyState, PageHeader, Panel, SectionHeader, StatCard, StatusPill } from "./page-BYeyT62h.mjs";
import { ControlChart } from "./control-chart-Bev-hhq6.mjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select-CgaOJK7s.mjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table-D1-I9fDM.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/fingerprinting-wqU_TCUr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FingerprintingPage() {
	const [feedstockId, setFeedstockId] = (0, import_react.useState)("");
	const [batches, setBatches] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		listBatches().then((data) => {
			setBatches(data);
			const counts = /* @__PURE__ */ new Map();
			data.forEach((b) => counts.set(b.feedstockId, (counts.get(b.feedstockId) ?? 0) + 1));
			const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
			setFeedstockId(top?.[0] ?? FEEDSTOCKS[0].id);
			setLoading(false);
		});
	}, []);
	const profiled = FEEDSTOCKS.filter((f) => f.batchCount > 0);
	const feedstock = FEEDSTOCKS.find((f) => f.id === feedstockId);
	const feedstockBatches = (0, import_react.useMemo)(() => (batches ?? []).filter((b) => b.feedstockId === feedstockId), [batches, feedstockId]);
	const mean = feedstock ? feedstock.composition.protein.value : 0;
	const sd = feedstock ? mean * feedstock.variabilityCv / 100 : 1;
	const passRate = feedstockBatches.length > 0 ? feedstockBatches.filter((b) => b.qc === "pass").length / feedstockBatches.length : 0;
	const controlPoints = feedstockBatches.slice().reverse().map((b) => ({
		id: b.lot,
		label: b.sampledOn.slice(5),
		value: b.protein
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Intelligence",
				title: "Batch Fingerprinting",
				description: "Batch-to-batch composition monitoring with statistical process control. Values are simulated indicative data."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-64 flex-1 sm:max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-sm font-medium text-on-surface",
						children: "Feedstock"
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: feedstockId,
						onValueChange: setFeedstockId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: profiled.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: f.id,
							children: [
								f.name,
								" (",
								f.batchCount,
								" batches)"
							]
						}, f.id)) })]
					})]
				}), feedstock && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/feedstocks/$feedstockId",
					params: { feedstockId: feedstock.id },
					className: "flex items-center gap-1.5 text-sm text-brand-strong hover:underline",
					children: ["View profile ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "arrow_forward",
						size: 14
					})]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-96 rounded-xl" }) : !feedstock || feedstockBatches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: "fingerprint",
				title: "No batches for this feedstock",
				description: "Choose a feedstock with recorded batch history."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Batches",
							value: feedstockBatches.length,
							icon: "inventory_2"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Mean protein",
							value: `${fmt(mean, 1)}% DM`,
							icon: "science"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Variability (CV)",
							value: `${fmt(feedstock.variabilityCv, 1)}%`,
							icon: "monitoring",
							deltaTone: feedstock.variabilityCv > 15 ? "risk" : "brand"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "QC pass rate",
							value: `${fmt(passRate * 100, 0)}%`,
							icon: "verified",
							deltaTone: passRate >= .9 ? "brand" : passRate >= .75 ? "amber" : "risk"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					title: "Protein individuals control chart",
					description: "Mean and ±2σ control limits. Points outside limits are out of control and trigger investigation."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlChart, {
						points: controlPoints,
						mean,
						sd,
						unit: "% DM",
						ariaLabel: `Protein control chart for ${feedstock.name}`
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					padded: false,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-hairline px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Batch records",
							description: "Composition values per batch, with QC verdict.",
							as: "h3"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusPill, {
							tone: "sage",
							children: [feedstockBatches.length, " lots"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Lot" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Sampled" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Protein %"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "z-score"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Moisture %"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Lipid %"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Ash %"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "QC" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Lab" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: feedstockBatches.map((b) => {
							const z = (b.protein - mean) / sd;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
								className: Math.abs(z) > 2 ? "bg-risk-soft/30" : "",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "type-data font-medium",
										children: b.lot
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "type-data text-xs text-muted-foreground",
										children: b.sampledOn
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "type-data text-right",
										children: fmt(b.protein, 2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: cn("type-data text-right", Math.abs(z) > 2 ? "font-bold text-risk-ink" : "text-muted-foreground"),
										children: fmt(z, 2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "type-data text-right",
										children: fmt(b.moisture, 1)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "type-data text-right",
										children: fmt(b.lipid, 2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "type-data text-right",
										children: fmt(b.ash, 2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QcBadge, { qc: b.qc }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "text-xs text-muted-foreground",
										children: b.lab
									})
								]
							}, b.lot);
						}) })] })
					})]
				})
			] })
		]
	});
}
function QcBadge({ qc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", qc === "pass" ? "bg-mint text-on-mint" : qc === "review" ? "bg-amber-soft text-amber-ink" : "bg-risk-soft text-risk-ink"),
		children: qc
	});
}
export { FingerprintingPage as component };
