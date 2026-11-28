import { __toESM } from "../_runtime.mjs";
import { FEEDSTOCKS, Icon, Skeleton, backendApi, cn, fmtCompact, fmtDate, getDashboard } from "./router-ChhPpYzB.mjs";
import { PageHeader } from "./page-BYeyT62h.mjs";
import { Card } from "./card-DaJmDXv_.mjs";
import { Badge } from "./badge-CA5yuWae.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { Progress as Progress$1, ProgressIndicator } from "../_libs/radix-ui__react-progress.mjs";
// node_modules/.nitro/vite/services/ssr/assets/routes-d_ox_byE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Progress({ className, value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress$1, {
		"data-slot": "progress",
		className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressIndicator, {
			"data-slot": "progress-indicator",
			className: "h-full w-full flex-1 bg-primary transition-all",
			style: { transform: `translateX(-${100 - (value || 0)}%)` }
		})
	});
}
function useDashboardData() {
	const [demo, setDemo] = (0, import_react.useState)(null);
	const [live, setLive] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		Promise.all([getDashboard(), backendApi.stats.get()]).then(([d, s]) => {
			if (cancelled) return;
			setDemo(d);
			setLive(s);
			setLoading(false);
		}).catch(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	return {
		demo,
		live,
		loading
	};
}
var STAGE_COLOR = {
	"In Progress": "text-brand-strong bg-mint",
	"Pathway Review": "text-amber-ink bg-amber-soft",
	Fingerprinting: "text-on-surface-variant bg-surface-high"
};
function KpiCard({ icon, label, value, sub, to, loading }) {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-4 p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid size-10 shrink-0 place-items-center rounded-xl bg-surface-high text-brand-strong",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				name: icon,
				size: 20
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [
				loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mb-1.5 h-7 w-16" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-bold tracking-tight text-on-surface",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-on-surface-variant",
					children: label
				}),
				sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: sub
				})
			]
		})]
	});
	if (to) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		className: "block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "cursor-pointer transition-shadow hover:shadow-md",
			children: inner
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: inner });
}
function ActivityIcon({ name, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid size-8 shrink-0 place-items-center rounded-lg", tone === "critical" ? "bg-risk/10 text-risk" : "bg-surface-high text-on-surface-variant"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			name: {
				fingerprint: "fingerprint",
				menu_book: "menu_book",
				alt_route: "alt_route",
				verified_user: "verified_user"
			}[name] ?? "circle",
			size: 16
		})
	});
}
function HomePage() {
	const { demo, live, loading } = useDashboardData();
	const liveSuppliers = live?.supplierCount ?? 0;
	const liveFeedstocks = live?.feedstockCount ?? 0;
	const liveBatches = live?.batchCount ?? 0;
	const demoFeedstocks = FEEDSTOCKS.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Overview",
				title: "Dashboard",
				description: "BIOPATH AI · Feedstock-to-Protein Intelligence"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-label": "Key metrics",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							icon: "eco",
							label: "Demo feedstocks",
							value: demoFeedstocks,
							sub: "22 profiled · 5 screening",
							to: "/feedstocks",
							loading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							icon: "inventory_2",
							label: "Live batches",
							value: loading ? "—" : liveBatches,
							sub: liveBatches > 0 ? `${liveFeedstocks} feedstocks registered` : "Register batches to track supply",
							to: "/source-intelligence",
							loading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							icon: "alt_route",
							label: "Pathways evaluated",
							value: loading ? "—" : demo ? fmtCompact(demo.kpis.pathwaysEvaluated) : "—",
							sub: "Across all profiled feedstocks",
							to: "/pathways",
							loading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							icon: "people",
							label: "Live suppliers",
							value: loading ? "—" : liveSuppliers,
							sub: "Registered in this workspace",
							to: "/source-intelligence",
							loading
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-label": "Active research projects",
					className: "lg:col-span-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold text-on-surface",
							children: "Active projects"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/feedstocks",
							className: "text-sm text-brand-strong hover:underline",
							children: "View all feedstocks →"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: loading ? Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-xl" }, i)) : demo?.projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-14 shrink-0 overflow-hidden rounded-lg bg-surface-high",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image,
										alt: "",
										className: "size-full object-cover",
										onError: (e) => {
											e.target.style.display = "none";
										}
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/feedstocks/$feedstockId",
												params: { feedstockId: p.feedstockId },
												className: "font-medium text-on-surface hover:underline",
												children: p.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												className: cn("shrink-0 text-xs", STAGE_COLOR[p.stage] ?? ""),
												children: p.stage
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-xs text-muted-foreground",
											children: p.updated
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
												value: p.completion,
												className: "h-1.5 flex-1"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "type-data text-xs text-muted-foreground",
												children: [p.completion, "%"]
											})]
										})
									]
								})]
							})
						}, p.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					"aria-label": "Recent activity",
					className: "lg:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-4 flex items-center justify-between",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-on-surface",
								children: "Recent activity"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "divide-y divide-hairline",
							children: loading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-8 shrink-0 rounded-lg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3.5 w-3/4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-1/2" })]
								})]
							}, i)) : demo?.activity.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityIcon, {
										name: a.icon,
										tone: a.tone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-on-surface",
											children: a.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-on-surface-variant",
											children: a.detail
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "type-data shrink-0 text-xs text-muted-foreground",
										children: a.ago
									})
								]
							}, a.id))
						}),
						live && live.recentBatches.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-on-surface",
									children: "Latest collection batches"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/source-intelligence",
									className: "text-xs text-brand-strong hover:underline",
									children: "View all →"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "divide-y divide-hairline",
								children: live.recentBatches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 px-4 py-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: "inventory_2",
											size: 16,
											className: "text-on-surface-variant"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-medium text-on-surface",
												children: b.batchCode
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-muted-foreground",
												children: [
													b.quantity,
													" ",
													b.quantityUnit
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "type-data text-[11px] text-muted-foreground",
											children: fmtDate(b.collectionDate)
										})
									]
								}, b.id))
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-label": "Quick access",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 font-semibold text-on-surface",
					children: "Explore BIOPATH AI"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						{
							icon: "eco",
							to: "/feedstocks",
							label: "Feedstock Explorer",
							desc: "Browse and search 22 characterised feedstocks with composition and risk data.",
							params: void 0
						},
						{
							icon: "alt_route",
							to: "/pathways",
							label: "Pathway Optimizer",
							desc: "Rank conversion pathways against your chosen feedstock and target market.",
							params: void 0
						},
						{
							icon: "fingerprint",
							to: "/fingerprinting",
							label: "Batch Fingerprinting",
							desc: "Statistical control charts and QC pass rates across all logged batches.",
							params: void 0
						},
						{
							icon: "pie_chart",
							to: "/allocation",
							label: "Resource Allocation",
							desc: "Greedy allocation across feedstocks under water and energy caps.",
							params: void 0
						},
						{
							icon: "category",
							to: "/end-use",
							label: "End-Use Intelligence",
							desc: "Food, feed and industrial suitability for each feedstock × pathway.",
							params: void 0
						},
						{
							icon: "assessment",
							to: "/reports",
							label: "Reports",
							desc: "Pathway comparisons, QC summaries and allocation scenarios.",
							params: void 0
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "flex h-full cursor-pointer gap-4 p-5 transition-shadow hover:shadow-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-10 shrink-0 place-items-center rounded-xl bg-surface-high text-brand-strong",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: item.icon,
									size: 20
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-on-surface",
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-sm text-on-surface-variant",
								children: item.desc
							})] })]
						})
					}, item.to))
				})]
			})
		]
	});
}
export { HomePage as component };
