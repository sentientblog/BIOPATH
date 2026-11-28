import { __toESM } from "../_runtime.mjs";
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, FEEDSTOCK_CATEGORIES, Icon, Skeleton, backendApi, fmtDate } from "./router-ChhPpYzB.mjs";
import { EmptyState, PageHeader, Panel, StatusPill } from "./page-BYeyT62h.mjs";
import { Badge } from "./badge-CA5yuWae.mjs";
import { Card } from "./card-DaJmDXv_.mjs";
import { Input, Label, Textarea } from "./textarea-BQ9p_IVG.mjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs-D6hEn33-.mjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select-CgaOJK7s.mjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table-D1-I9fDM.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { toast } from "../_libs/sonner.mjs";
// node_modules/.nitro/vite/services/ssr/assets/source-intelligence-CZ-WjiKn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useSourceData(reload) {
	const [suppliers, setSuppliers] = (0, import_react.useState)([]);
	const [feedstocks, setFeedstocks] = (0, import_react.useState)([]);
	const [batches, setBatches] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		Promise.all([
			backendApi.suppliers.list(),
			backendApi.feedstocks.list(),
			backendApi.batches.list()
		]).then(([s, f, b]) => {
			if (cancelled) return;
			setSuppliers(s);
			setFeedstocks(f);
			setBatches(b);
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
	}, [reload]);
	return {
		suppliers,
		feedstocks,
		batches,
		loading,
		error
	};
}
function SourceIntelligencePage() {
	const [reload, setReload] = (0, import_react.useState)(0);
	const refresh = () => setReload((n) => n + 1);
	const { suppliers, feedstocks, batches, loading, error } = useSourceData(reload);
	const [supplierDialogOpen, setSupplierDialogOpen] = (0, import_react.useState)(false);
	const [feedstockDialogOpen, setFeedstockDialogOpen] = (0, import_react.useState)(false);
	const [batchDialogOpen, setBatchDialogOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Intelligence",
				title: "Source Intelligence",
				description: "Register suppliers, record collection batches and maintain full traceability from field to process.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => setSupplierDialogOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "business",
								size: 18
							}), "Add supplier"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => setFeedstockDialogOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "eco",
								size: 18
							}), "Add feedstock"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setBatchDialogOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								name: "add",
								size: 18
							}), "Create batch"]
						})
					]
				})
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				role: "alert",
				className: "rounded-xl border border-risk/30 bg-risk-soft/40 p-4 text-sm text-risk-ink",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					{
						icon: "business",
						label: "Suppliers",
						value: suppliers.length
					},
					{
						icon: "eco",
						label: "Feedstocks",
						value: feedstocks.length
					},
					{
						icon: "inventory_2",
						label: "Batches",
						value: batches.length
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex items-center gap-4 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-xl bg-surface-high text-brand-strong",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: s.icon,
							size: 20
						})
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-16" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-2xl font-bold text-on-surface",
						children: s.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-on-surface-variant",
						children: s.label
					})] })]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "batches",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "batches",
							children: [
								"Batches (",
								batches.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "suppliers",
							children: [
								"Suppliers (",
								suppliers.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "feedstocks",
							children: [
								"Feedstocks (",
								feedstocks.length,
								")"
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "batches",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchTable, {
							batches,
							loading,
							onDelete: async (id) => {
								await backendApi.batches.remove(id);
								toast.success("Batch deleted");
								refresh();
							},
							onCreate: () => setBatchDialogOpen(true)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "suppliers",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupplierTable, {
							suppliers,
							loading,
							onDelete: async (id, name) => {
								if (!confirm(`Delete supplier "${name}"?`)) return;
								await backendApi.suppliers.remove(id);
								toast.success("Supplier deleted");
								refresh();
							},
							onCreate: () => setSupplierDialogOpen(true)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "feedstocks",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedstockTable, {
							feedstocks,
							loading,
							onDelete: async (id, name) => {
								if (!confirm(`Delete feedstock "${name}"? This also removes its batches.`)) return;
								await backendApi.feedstocks.remove(id);
								toast.success("Feedstock deleted");
								refresh();
							},
							onCreate: () => setFeedstockDialogOpen(true)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupplierDialog, {
				open: supplierDialogOpen,
				onOpenChange: setSupplierDialogOpen,
				onCreated: refresh
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedstockDialog, {
				open: feedstockDialogOpen,
				onOpenChange: setFeedstockDialogOpen,
				onCreated: refresh
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchDialog, {
				open: batchDialogOpen,
				onOpenChange: setBatchDialogOpen,
				suppliers,
				feedstocks,
				onCreated: refresh
			})
		]
	});
}
function BatchTable({ batches, loading, onDelete, onCreate }) {
	const [deleting, setDeleting] = (0, import_react.useState)(null);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {});
	if (batches.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: "inventory_2",
		title: "No batches yet",
		description: "Record collection batches to build traceability from supplier to process.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: onCreate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				name: "add",
				size: 18
			}), "Create batch"]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		padded: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Batch code" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Feedstock" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Supplier" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Quantity" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Collection date" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Notes" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: batches.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: b.batchCode
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: b.feedstock ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/feedstocks/$feedstockId",
					params: { feedstockId: String(b.feedstockId) },
					className: "text-brand-strong hover:underline",
					children: b.feedstock.name
				}) : `#${b.feedstockId}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: b.supplier?.name ?? `#${b.supplierId}` }),
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						disabled: deleting === b.id,
						onClick: async () => {
							setDeleting(b.id);
							try {
								await onDelete(b.id);
							} finally {
								setDeleting(null);
							}
						},
						"aria-label": `Delete batch ${b.batchCode}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "delete",
							size: 16
						})
					})
				})
			] }, b.id)) })] })
		})
	});
}
function SupplierTable({ suppliers, loading, onDelete, onCreate }) {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {});
	if (suppliers.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: "business",
		title: "No suppliers registered",
		description: "Add a supplier to link it with feedstocks and collection batches.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: onCreate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				name: "add",
				size: 18
			}), "Add supplier"]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		padded: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Site" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "County" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Town" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Batches" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: suppliers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: s.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: s.siteName }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: s.county }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-muted-foreground",
					children: s.town ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					tone: s.batches && s.batches.length > 0 ? "sage" : "neutral",
					children: s.batches?.length ?? 0
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onDelete(s.id, s.name),
						"aria-label": `Delete supplier ${s.name}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "delete",
							size: 16
						})
					})
				})
			] }, s.id)) })] })
		})
	});
}
function FeedstockTable({ feedstocks, loading, onDelete, onCreate }) {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableSkeleton, {});
	if (feedstocks.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: "eco",
		title: "No feedstocks registered",
		description: "Register feedstocks to link them to suppliers and collection batches.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: onCreate,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				name: "add",
				size: 18
			}), "Register feedstock"]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		padded: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Name" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Category" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Description" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Batches" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Actions"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: feedstocks.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/feedstocks/$feedstockId",
					params: { feedstockId: String(f.id) },
					className: "font-medium text-brand-strong hover:underline",
					children: f.name
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: f.category
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "max-w-xs truncate text-xs text-muted-foreground",
					children: f.description ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					tone: f.batches && f.batches.length > 0 ? "sage" : "neutral",
					children: f.batches?.length ?? 0
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => onDelete(f.id, f.name),
						"aria-label": `Delete feedstock ${f.name}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "delete",
							size: 16
						})
					})
				})
			] }, f.id)) })] })
		})
	});
}
function SupplierDialog({ open, onOpenChange, onCreated }) {
	const [name, setName] = (0, import_react.useState)("");
	const [siteName, setSiteName] = (0, import_react.useState)("");
	const [county, setCounty] = (0, import_react.useState)("");
	const [town, setTown] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	async function submit(e) {
		e.preventDefault();
		setErr(null);
		if (!name.trim() || !siteName.trim() || !county.trim()) return setErr("Name, site name and county are required");
		setSubmitting(true);
		try {
			await backendApi.suppliers.create({
				name: name.trim(),
				siteName: siteName.trim(),
				county: county.trim(),
				town: town.trim() || void 0
			});
			toast.success("Supplier registered");
			onCreated();
			onOpenChange(false);
			setName("");
			setSiteName("");
			setCounty("");
			setTown("");
		} catch (e) {
			setErr(String(e.message ?? e));
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Register supplier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Add a feedstock supplier. The site name identifies the specific collection location." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "sup-name",
									children: "Organisation name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "sup-name",
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "e.g. Highland Coffee Co.",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "sup-site",
									children: "Site / plant name *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "sup-site",
									value: siteName,
									onChange: (e) => setSiteName(e.target.value),
									placeholder: "e.g. Nyeri Wet Mill",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "sup-county",
									children: "County *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "sup-county",
									value: county,
									onChange: (e) => setCounty(e.target.value),
									placeholder: "e.g. Nyeri",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "sup-town",
									children: "Town"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "sup-town",
									value: town,
									onChange: (e) => setTown(e.target.value),
									placeholder: "e.g. Karatina"
								})]
							})
						]
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-risk-ink",
						children: err
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => onOpenChange(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: submitting,
						children: submitting ? "Saving…" : "Save supplier"
					})] })
				]
			})]
		})
	});
}
function FeedstockDialog({ open, onOpenChange, onCreated }) {
	const [name, setName] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	async function submit(e) {
		e.preventDefault();
		setErr(null);
		if (!name.trim() || !category) return setErr("Name and category are required");
		setSubmitting(true);
		try {
			await backendApi.feedstocks.create({
				name: name.trim(),
				category,
				description: description.trim() || void 0
			});
			toast.success("Feedstock registered");
			onCreated();
			onOpenChange(false);
			setName("");
			setCategory("");
			setDescription("");
		} catch (e) {
			setErr(String(e.message ?? e));
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Register feedstock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Add a feedstock to the workspace database." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "fsd-name",
							children: "Name *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "fsd-name",
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "e.g. Coffee pulp",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "fsd-cat",
							children: "Category *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: category,
							onValueChange: setCategory,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "fsd-cat",
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
							htmlFor: "fsd-desc",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "fsd-desc",
							value: description,
							onChange: (e) => setDescription(e.target.value),
							rows: 2
						})]
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-risk-ink",
						children: err
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
function BatchDialog({ open, onOpenChange, suppliers, feedstocks, onCreated }) {
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const [batchCode, setBatchCode] = (0, import_react.useState)("");
	const [supplierId, setSupplierId] = (0, import_react.useState)("");
	const [feedstockId, setFeedstockId] = (0, import_react.useState)("");
	const [quantity, setQuantity] = (0, import_react.useState)("");
	const [unit, setUnit] = (0, import_react.useState)("t");
	const [date, setDate] = (0, import_react.useState)(today);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	async function submit(e) {
		e.preventDefault();
		setErr(null);
		if (!batchCode.trim()) return setErr("Batch code is required");
		if (!supplierId) return setErr("Select a supplier");
		if (!feedstockId) return setErr("Select a feedstock");
		if (!quantity || isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) return setErr("Enter a positive quantity");
		setSubmitting(true);
		try {
			await backendApi.batches.create({
				batchCode: batchCode.trim(),
				supplierId: parseInt(supplierId),
				feedstockId: parseInt(feedstockId),
				quantity: parseFloat(quantity),
				quantityUnit: unit,
				collectionDate: date,
				notes: notes.trim() || void 0
			});
			toast.success(`Batch ${batchCode} created`);
			onCreated();
			onOpenChange(false);
			setBatchCode("");
			setSupplierId("");
			setFeedstockId("");
			setQuantity("");
			setUnit("t");
			setDate(today);
			setNotes("");
		} catch (e) {
			setErr(String(e.message ?? e));
		} finally {
			setSubmitting(false);
		}
	}
	const noSuppliers = suppliers.length === 0;
	const noFeedstocks = feedstocks.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Create collection batch" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Record a collected batch. The batch code must be unique and links the supplier, feedstock and quantity for traceability." })] }),
				(noSuppliers || noFeedstocks) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-amber/40 bg-amber-soft px-4 py-3 text-sm text-amber-ink",
					children: noSuppliers && noFeedstocks ? "Register at least one supplier and one feedstock first." : noSuppliers ? "Register a supplier before creating a batch." : "Register a feedstock before creating a batch."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bc-code",
										children: "Batch code *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "bc-code",
										value: batchCode,
										onChange: (e) => setBatchCode(e.target.value),
										placeholder: "e.g. CP-205",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bc-sup",
										children: "Supplier *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: supplierId,
										onValueChange: setSupplierId,
										disabled: noSuppliers,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "bc-sup",
											className: "w-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select supplier" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: suppliers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
											value: String(s.id),
											children: [
												s.name,
												" — ",
												s.siteName
											]
										}, s.id)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bc-fs",
										children: "Feedstock *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: feedstockId,
										onValueChange: setFeedstockId,
										disabled: noFeedstocks,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "bc-fs",
											className: "w-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select feedstock" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: feedstocks.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: String(f.id),
											children: f.name
										}, f.id)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bc-qty",
										children: "Quantity *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "bc-qty",
										type: "number",
										min: "0.001",
										step: "any",
										value: quantity,
										onChange: (e) => setQuantity(e.target.value),
										placeholder: "e.g. 12.5",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bc-unit",
										children: "Unit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: unit,
										onValueChange: setUnit,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											id: "bc-unit",
											className: "w-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
											"t",
											"kg",
											"m³",
											"L",
											"bags"
										].map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: u,
											children: u
										}, u)) })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bc-date",
										children: "Collection date *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "bc-date",
										type: "date",
										value: date,
										onChange: (e) => setDate(e.target.value),
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bc-notes",
										children: "Notes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "bc-notes",
										value: notes,
										onChange: (e) => setNotes(e.target.value),
										rows: 2,
										placeholder: "Storage conditions, moisture at collection, QC observations…"
									})]
								})
							]
						}),
						err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							role: "alert",
							className: "text-sm text-risk-ink",
							children: err
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => onOpenChange(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: submitting || noSuppliers || noFeedstocks,
							children: submitting ? "Saving…" : "Save batch"
						})] })
					]
				})
			]
		})
	});
}
function TableSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		className: "space-y-2",
		children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10" }, i))
	});
}
export { SourceIntelligencePage as component };
