import { __toESM } from "../_runtime.mjs";
import { AA_REFERENCE, AMINO_ACID_LABELS, Button, Icon, MeasureValue, ProvenanceTag, Route$1, Skeleton, backendApi, cn, fmt, fmtDate, getFeedstock } from "./router-ChhPpYzB.mjs";
import { EmptyState, ErrorState, PageHeader, Panel, SectionHeader, StatusPill } from "./page-BYeyT62h.mjs";
import { RadarChart } from "./radar-chart-oepl8MWx.mjs";
import { ControlChart } from "./control-chart-Bev-hhq6.mjs";
import { Badge } from "./badge-CA5yuWae.mjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs-D6hEn33-.mjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table-D1-I9fDM.mjs";
import { Alert, AlertDescription, AlertTitle } from "./alert-g-OkhSrj.mjs";
import { aminoAcidScore, rankPathways } from "./scoring-B089F6La.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/feedstocks._feedstockId-Bg93QvEO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MONTH = [
	"J",
	"F",
	"M",
	"A",
	"M",
	"J",
	"J",
	"A",
	"S",
	"O",
	"N",
	"D"
];
var FLAG_COLOR = {
	critical: "text-risk-ink bg-risk-soft border-risk/30",
	warning: "text-amber-ink bg-amber-soft border-amber/30",
	info: "text-on-surface-variant bg-surface-high border-hairline"
};
var STATUS_TONE = {
	profiled: "sage",
	screening: "amber",
	pending: "neutral"
};
function FeedstockDetailPage() {
	const { feedstockId } = Route$1.useParams();
	const router = useRouter();
	const isNumeric = /^\d+$/.test(feedstockId);
	const [demoData, setDemoData] = (0, import_react.useState)(null);
	const [liveData, setLiveData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		if (isNumeric) Promise.all([backendApi.feedstocks.get(Number(feedstockId)), backendApi.batches.list({ feedstockId: Number(feedstockId) })]).then(([fs, batches]) => {
			if (cancelled) return;
			setLiveData({
				feedstock: fs,
				batches
			});
			setError(null);
			setLoading(false);
		}).catch((e) => {
			if (cancelled) return;
			setError(String(e.message ?? e));
			setLoading(false);
		});
		else getFeedstock(feedstockId).then((data) => {
			if (cancelled) return;
			if (!data) {
				setError("Feedstock not found");
				setLoading(false);
				return;
			}
			setDemoData(data);
			setError(null);
			setLoading(false);
		}).catch((e) => {
			if (cancelled) return;
			setError(String(e.message ?? e));
			setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [feedstockId, isNumeric]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailSkeleton, {});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
			title: "Feedstock not found",
			description: error,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => router.history.back(),
				children: "Go back"
			})
		})
	});
	if (liveData) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveFeedstockDetail, { data: liveData });
	if (demoData) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoFeedstockDetail, { data: demoData });
	return null;
}
function LiveFeedstockDetail({ data }) {
	const { feedstock, batches } = data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Feedstock Explorer",
				title: feedstock.name,
				description: feedstock.description ?? feedstock.category,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/feedstocks",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							children: "← All feedstocks"
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm font-semibold text-on-surface",
					children: "Details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "space-y-2.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-medium text-on-surface text-right",
								children: feedstock.category
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Database ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "type-data text-on-surface",
								children: ["#", feedstock.id]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Registered"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "type-data text-on-surface",
								children: feedstock.createdAt ? fmtDate(feedstock.createdAt) : "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Batches"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "type-data text-on-surface",
								children: batches.length
							})]
						})
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						title: "Collection batches",
						description: "All batches linked to this feedstock.",
						badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: "sage",
							children: batches.length
						})
					}), batches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						className: "mt-4",
						icon: "inventory_2",
						title: "No batches yet",
						description: "Create batches in Source Intelligence to link them here."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Batch code" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Supplier" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Quantity" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Notes" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: batches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium",
								children: b.batchCode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: b.supplier?.name ?? "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "type-data",
								children: [
									b.quantity,
									" ",
									b.quantityUnit
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "type-data text-xs text-muted-foreground",
								children: fmtDate(b.collectionDate)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "max-w-xs truncate text-xs text-muted-foreground",
								children: b.notes ?? "—"
							})
						] }, b.id)) })] })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "info",
					size: 18
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: "No composition data" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, { children: [
					"This feedstock is registered but has not been profiled yet. Use the",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/fingerprinting",
						className: "underline",
						children: "Batch Fingerprinting"
					}),
					" ",
					"module or reference a matching demo feedstock for pathway analysis."
				] })
			] })
		]
	});
}
function DemoFeedstockDetail({ data }) {
	const { feedstock: f, batches, evidence } = data;
	const aaScore = aminoAcidScore(f);
	const rankings = rankPathways(f, {
		suitability: 5,
		yield: 4,
		water: 3,
		energy: 3,
		cost: 4,
		scalability: 2,
		endUse: 3
	}).slice(0, 3);
	const controlPoints = batches.map((b) => ({
		id: b.lot,
		label: b.sampledOn.slice(5),
		value: b.protein
	}));
	const meanProt = f.composition.protein.value;
	const sdProt = meanProt * f.variabilityCv / 100;
	const aaAxes = Object.keys(AMINO_ACID_LABELS).map((k) => AMINO_ACID_LABELS[k]);
	const aaVals = Object.keys(AMINO_ACID_LABELS).map((k) => {
		const kk = k;
		return Math.round(Math.min(100, f.aminoAcids[kk] / (AA_REFERENCE[kk] * 1.5) * 100));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Feedstock Explorer",
				title: f.name,
				description: f.summary,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/feedstocks",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							children: "← All feedstocks"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pathways",
						search: { focus: f.id },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "alt_route",
								size: 18
							}), "Analyse pathways"]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "lg:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: STATUS_TONE[f.status] ?? "neutral",
								children: f.status
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-1",
								children: f.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "text-[10px]",
									children: t
								}, t))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-x-4 gap-y-3 text-sm",
							children: [
								[
									{
										l: "Category",
										v: f.category
									},
									{
										l: "Source",
										v: f.sourceType
									},
									{
										l: "Availability",
										v: f.availability
									},
									{
										l: "Transport",
										v: `${f.transportKm} km`
									},
									{
										l: "Batches",
										v: `${f.batchCount}`
									}
								].map(({ l, v }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: l
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium text-on-surface",
									children: v
								})] }, l)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Annual volume"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasureValue, {
									m: f.annualVolume,
									digits: 0
								}) })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs text-muted-foreground",
									children: "Cost"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasureValue, { m: f.cost }) })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Seasonal availability"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-0.5",
									children: f.seasonality.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										title: MONTH[i],
										className: "flex-1 rounded-sm transition-opacity",
										style: {
											height: 16,
											background: `var(--brand)`,
											opacity: .2 + v * .8
										}
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[10px] text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jan" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Jun" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dec" })
									]
								})
							]
						}),
						f.flags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Risk flags"
							}), f.flags.map((flag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("rounded-lg border p-3 text-xs", FLAG_COLOR[flag.severity]),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: flag.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 opacity-80",
									children: flag.detail
								})]
							}, flag.id))]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "lg:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Proximate composition",
							badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvenanceTag, {
								kind: f.composition.protein.provenance,
								full: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3",
							children: [
								{
									key: "moisture",
									label: "Moisture",
									m: f.composition.moisture
								},
								{
									key: "protein",
									label: "Protein (DM)",
									m: f.composition.protein
								},
								{
									key: "lipid",
									label: "Lipid (DM)",
									m: f.composition.lipid
								},
								{
									key: "fibre",
									label: "Fibre (DM)",
									m: f.composition.fibre
								},
								{
									key: "ash",
									label: "Ash (DM)",
									m: f.composition.ash
								},
								{
									key: "carb",
									label: "Carbohydrate* (DM)",
									m: f.composition.carbohydrate
								}
							].map(({ key, label, m }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-[1fr_auto_auto] items-center gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium text-on-surface",
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasureValue, { m })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 h-2 overflow-hidden rounded-full bg-surface-high",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-brand transition-[width] duration-500",
										style: { width: `${Math.min(100, m.value / (key === "moisture" ? 100 : 60) * 100)}%` }
									})
								})] })
							}, key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: "* Carbohydrate calculated by difference. All values are simulated indicative data."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "amino-acids",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "amino-acids",
							children: "Amino acids"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "batches",
							children: [
								"Batch history (",
								batches.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "pathways",
							children: "Top pathways"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "evidence",
							children: [
								"Evidence (",
								evidence.length,
								")"
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "amino-acids",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Indispensable amino acid profile",
							description: "Relative to the FAO (2013) adult reference pattern. Values are simulated indicative data.",
							badge: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvenanceTag, {
								kind: f.aminoAcidProvenance,
								full: true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-6 lg:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadarChart, {
								axes: aaAxes,
								series: [{
									label: f.name,
									color: "var(--brand)",
									values: aaVals
								}],
								ariaLabel: `Amino acid profile of ${f.name}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-center text-xs text-muted-foreground",
								children: [
									"Limiting:",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: AMINO_ACID_LABELS[aaScore.limiting] }),
									" · DIAAS proxy: ",
									fmt(aaScore.score * 100, 0),
									"%"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amino acid" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "text-right",
										children: "g / 100g protein"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "text-right",
										children: "Reference"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
										className: "text-right",
										children: "Ratio"
									})
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: aaScore.ratios.map(({ key, ratio }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, {
									className: aaScore.limiting === key ? "bg-amber-soft/40" : "",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: AMINO_ACID_LABELS[key] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "type-data text-right",
											children: fmt(f.aminoAcids[key], 1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
											className: "type-data text-right text-muted-foreground",
											children: fmt(AA_REFERENCE[key], 2)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
											className: cn("type-data text-right", ratio < 1 ? "text-risk-ink" : "text-brand-strong"),
											children: [fmt(ratio, 2), aaScore.limiting === key && " ⬅ limiting"]
										})
									]
								}, key)) })] })
							})]
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "batches",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: batches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: "inventory_2",
							title: "No batches recorded"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
									title: "Protein control chart",
									description: "Batch-to-batch protein variation with ±2σ statistical limits."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlChart, {
									points: controlPoints,
									mean: meanProt,
									sd: sdProt,
									unit: "% DM",
									ariaLabel: `Protein control chart for ${f.name}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Lot" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
											className: "text-right",
											children: "Protein %"
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
									] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: batches.slice(0, 20).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
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
									] }, b.lot)) })] })
								})
							]
						}) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "pathways",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Recommended conversion pathways",
							description: "Heuristic ranking based on composition fit, resource intensity and scalability. Simulated estimates."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-4",
							children: rankings.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-hairline p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "type-data mr-2 text-muted-foreground",
												children: ["#", i + 1]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-on-surface",
												children: r.pathway.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "ml-2 text-xs",
												children: r.pathway.family
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "type-data text-lg font-bold text-brand-strong",
											children: r.total
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-xs sm:grid-cols-4",
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
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "evidence",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							title: "Evidence register",
							description: "Sources and provenance for data shown in this profile."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Title" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Kind" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Scope" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Date" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: evidence.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "type-data text-xs",
									children: ev.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: ev.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvenanceTag, {
									kind: ev.kind,
									full: true
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "max-w-xs text-xs text-muted-foreground",
									children: ev.scope
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
									className: "type-data text-xs text-muted-foreground",
									children: ev.date
								})
							] }, ev.id)) })] })
						})] })
					})
				]
			})
		]
	});
}
function QcBadge({ qc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", qc === "pass" ? "bg-mint text-on-mint" : qc === "review" ? "bg-amber-soft text-amber-ink" : "bg-risk-soft text-risk-ink"),
		children: qc
	});
}
function DetailSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-28" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-72" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-96" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-96 rounded-xl lg:col-span-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-96 rounded-xl lg:col-span-7" })]
		})]
	});
}
export { FeedstockDetailPage as component };
