import { __toESM } from "../_runtime.mjs";
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, FEEDSTOCK_CATEGORIES, Icon, MeasureValue, Route$7, SPOTLIGHT_IDS, Skeleton, backendApi, cn, fmtCompact, listFeedstocks } from "./router-ChhPpYzB.mjs";
import { EmptyState, PageHeader, Panel, SectionHeader, StatusPill } from "./page-BYeyT62h.mjs";
import { Card } from "./card-DaJmDXv_.mjs";
import { Badge } from "./badge-CA5yuWae.mjs";
import { Input, Label, Textarea } from "./textarea-BQ9p_IVG.mjs";
import { Alert, AlertDescription, AlertTitle } from "./alert-g-OkhSrj.mjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select-CgaOJK7s.mjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table-D1-I9fDM.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/feedstocks-SEuxiuff.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FeedstocksPage() {
	const search = Route$7.useSearch();
	const navigate = Route$7.useNavigate();
	const [query, setQuery] = (0, import_react.useState)(search.q ?? "");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [availability, setAvailability] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("relevance");
	const [demo, setDemo] = (0, import_react.useState)(null);
	const [live, setLive] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [liveCreated, setLiveCreated] = (0, import_react.useState)(0);
	const [reload, setReload] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		Promise.all([listFeedstocks(), backendApi.feedstocks.list()]).then(([d, l]) => {
			if (cancelled) return;
			setDemo(d);
			setLive(l);
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
	}, [reload, liveCreated]);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => {
			if (query !== (search.q ?? "")) navigate({
				search: (prev) => ({
					...prev,
					q: query || void 0
				}),
				replace: true
			});
		}, 300);
		return () => clearTimeout(t);
	}, [
		query,
		search.q,
		navigate
	]);
	const q = query.trim().toLowerCase();
	const filteredDemo = (0, import_react.useMemo)(() => {
		if (!demo) return [];
		let rows = demo.filter((f) => {
			if (category !== "all" && f.category !== category) return false;
			if (availability !== "all" && f.availability !== availability) return false;
			if (!q) return true;
			return f.name.toLowerCase().includes(q) || f.summary.toLowerCase().includes(q) || f.sourceType.toLowerCase().includes(q) || f.category.toLowerCase().includes(q) || f.tags.some((t) => t.toLowerCase().includes(q));
		});
		if (sort === "protein") rows = [...rows].sort((a, b) => b.composition.protein.value - a.composition.protein.value);
		if (sort === "volume") rows = [...rows].sort((a, b) => b.annualVolume.value - a.annualVolume.value);
		if (sort === "name") rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));
		return rows;
	}, [
		demo,
		q,
		category,
		availability,
		sort
	]);
	const filteredLive = (0, import_react.useMemo)(() => {
		if (!live) return [];
		if (!q) return live;
		return live.filter((f) => f.name.toLowerCase().includes(q) || (f.category ?? "").toLowerCase().includes(q) || (f.description ?? "").toLowerCase().includes(q));
	}, [live, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Intelligence",
				title: "Feedstock Explorer",
				description: "Search, filter and register feedstocks. Demo profiles carry composition, amino-acid and risk data; live feedstocks are registered in the workspace database.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setDialogOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "add",
						size: 18
					}), "Register feedstock"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-0 flex-1 sm:max-w-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "search",
								size: 18,
								className: "absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search by name, source, tag…",
								className: "pl-9",
								"aria-label": "Search feedstocks"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: category,
							onValueChange: setCategory,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-52",
								"aria-label": "Filter by category",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All categories"
							}), FEEDSTOCK_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: c,
								children: c
							}, c))] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: availability,
							onValueChange: setAvailability,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-40",
								"aria-label": "Filter by availability",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "Any availability"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Year-round",
									children: "Year-round"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Seasonal",
									children: "Seasonal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Intermittent",
									children: "Intermittent"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: sort,
							onValueChange: setSort,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-44",
								"aria-label": "Sort results",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "relevance",
									children: "Sort: Relevance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "protein",
									children: "Sort: Protein (high→low)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "volume",
									children: "Sort: Volume (high→low)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "name",
									children: "Sort: Name (A→Z)"
								})
							] })]
						})
					]
				})
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
				variant: "destructive",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: "Could not load feedstocks" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: error })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-label": "Workspace feedstocks",
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					title: "Workspace feedstocks",
					description: "Registered in the live database, linked to suppliers and collection batches.",
					badge: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusPill, {
						tone: "sage",
						children: [filteredLive.length, " live"]
					})
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12" }, i))
				}) }) : filteredLive.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: "eco",
					title: "No workspace feedstocks yet",
					description: "Register a feedstock to start tracking collection batches, suppliers and traceability.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => setDialogOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "add",
							size: 18
						}), "Register feedstock"]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					padded: false,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Category" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Batches" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Created" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Actions"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filteredLive.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/feedstocks/$feedstockId",
								params: { feedstockId: String(f.id) },
								className: "font-medium text-brand-strong hover:underline",
								children: f.name
							}), f.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 max-w-md truncate text-xs text-muted-foreground",
								children: f.description
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: f.category
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "type-data",
								children: f.batches?.length ?? 0
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "type-data text-xs text-muted-foreground",
								children: f.createdAt ? new Date(f.createdAt).toLocaleDateString("en-GB") : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									onClick: async () => {
										if (!confirm(`Delete feedstock "${f.name}"? This also unlinks its batches.`)) return;
										await backendApi.feedstocks.remove(f.id);
										setReload((n) => n + 1);
									},
									"aria-label": `Delete ${f.name}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										name: "delete",
										size: 16
									})
								})
							})
						] }, f.id)) })] })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-label": "Demo feedstock profiles",
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					title: "Demo feedstock profiles",
					description: "Characterised reference profiles (simulated data) used for pathway analysis and allocation.",
					badge: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StatusPill, {
						tone: "amber",
						children: [filteredDemo.length, " profiles"]
					})
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 rounded-xl" }, i))
				}) : filteredDemo.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No feedstocks match your filters",
					description: "Try clearing the search or selecting a different category.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => {
							setQuery("");
							setCategory("all");
							setAvailability("all");
						},
						children: "Clear filters"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: filteredDemo.map((f) => {
						const spotlight = SPOTLIGHT_IDS.includes(f.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/feedstocks/$feedstockId",
							params: { feedstockId: f.id },
							className: "block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: cn("group h-full cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-float", spotlight && "border-brand/30"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative h-28 overflow-hidden bg-surface-high",
									children: [
										f.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: f.image,
											alt: "",
											className: "size-full object-cover",
											onError: (e) => {
												e.target.style.visibility = "hidden";
											}
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-card/95 via-card/40 to-transparent" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute right-3 bottom-3 flex gap-1.5",
											children: [spotlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
												tone: "sage",
												children: "Spotlight"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
												tone: "neutral",
												children: f.availability
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-on-surface group-hover:text-brand-strong",
											children: f.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: f.category
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "line-clamp-2 text-xs text-on-surface-variant",
											children: f.summary
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-x-4 gap-y-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Protein"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasureValue, {
												m: f.composition.protein,
												className: "text-sm"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Volume"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "type-data text-sm text-on-surface",
												children: [
													fmtCompact(f.annualVolume.value),
													" ",
													f.annualVolume.unit
												]
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-1",
											children: f.tags.slice(0, 3).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												className: "text-[10px]",
												children: t
											}, t))
										})
									]
								})]
							})
						}, f.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateFeedstockDialog, {
				open: dialogOpen,
				onOpenChange: setDialogOpen,
				onCreated: () => setLiveCreated((n) => n + 1)
			})
		]
	});
}
function CreateFeedstockDialog({ open, onOpenChange, onCreated }) {
	const [name, setName] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [formError, setFormError] = (0, import_react.useState)(null);
	async function submit(e) {
		e.preventDefault();
		setFormError(null);
		if (!name.trim()) return setFormError("Name is required");
		if (!category) return setFormError("Category is required");
		setSubmitting(true);
		try {
			await backendApi.feedstocks.create({
				name: name.trim(),
				category,
				description: description.trim() || void 0
			});
			onCreated();
			onOpenChange(false);
			setName("");
			setCategory("");
			setDescription("");
		} catch (err) {
			setFormError(String(err.message ?? err));
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Register feedstock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Add a feedstock to the workspace database. It can then be linked to suppliers and collection batches." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "fs-name",
							children: "Name *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "fs-name",
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "e.g. Coffee pulp",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "fs-category",
							children: "Category *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: category,
							onValueChange: setCategory,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "fs-category",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a category" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: FEEDSTOCK_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: c,
								children: c
							}, c)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "fs-desc",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "fs-desc",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "Origin, generation process, seasonal notes…",
							rows: 3
						})]
					}),
					formError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-risk-ink",
						children: formError
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => onOpenChange(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: submitting,
						children: submitting ? "Saving…" : "Save feedstock"
					})] })
				]
			})]
		})
	});
}
export { FeedstocksPage as component };
