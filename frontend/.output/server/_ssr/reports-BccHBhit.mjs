import { __toESM } from "../_runtime.mjs";
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, Icon, REPORTS, REPORT_TEMPLATES, Skeleton, backendApi, fmtDate } from "./router-ChhPpYzB.mjs";
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
// node_modules/.nitro/vite/services/ssr/assets/reports-BccHBhit.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var REPORT_TYPES = [
	"Feedstock profile",
	"Pathway comparison",
	"Allocation scenario",
	"End-use assessment",
	"Batch QC summary"
];
var STATUS_TONE = {
	Draft: "neutral",
	"In review": "amber",
	Published: "sage"
};
function ReportsPage() {
	const [liveReports, setLiveReports] = (0, import_react.useState)([]);
	const [feedstocks, setFeedstocks] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const [viewReport, setViewReport] = (0, import_react.useState)(null);
	const [reload, setReload] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		Promise.all([backendApi.reports.list(), backendApi.feedstocks.list()]).then(([r, f]) => {
			if (cancelled) return;
			setLiveReports(r);
			setFeedstocks(f);
			setLoading(false);
		}).catch(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [reload]);
	async function handleDelete(id, title) {
		if (!confirm(`Delete report "${title}"?`)) return;
		await backendApi.reports.remove(id);
		toast.success("Report deleted");
		setReload((n) => n + 1);
	}
	async function handlePublish(id, current) {
		const next = current === "Published" ? "In review" : "Published";
		await backendApi.reports.update(id, { status: next });
		toast.success(`Report marked as ${next}`);
		setReload((n) => n + 1);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Operations",
				title: "Reports",
				description: "Generate and manage workspace reports backed by live database records. Demo reports below are reference examples.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setDialogOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						name: "add",
						size: 18
					}), "Generate report"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "live",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "live",
							children: [
								"Live reports (",
								loading ? "…" : liveReports.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "demo",
							children: [
								"Demo examples (",
								REPORTS.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "templates",
							children: "Templates"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "live",
						className: "mt-4",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 rounded-xl" }) : liveReports.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							icon: "assessment",
							title: "No live reports yet",
							description: "Generate a report to build a persistent record backed by workspace data.",
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => setDialogOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									name: "add",
									size: 18
								}), "Generate report"]
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: liveReports.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
								className: "p-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold text-on-surface",
													children: r.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
													tone: STATUS_TONE[r.status] ?? "neutral",
													children: r.status
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.type }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.author }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtDate(r.createdAt) }),
													r.feedstock && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/feedstocks/$feedstockId",
														params: { feedstockId: String(r.feedstockId) },
														className: "text-brand-strong hover:underline",
														children: r.feedstock.name
													})] })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-on-surface-variant",
												children: r.summary
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline",
												size: "sm",
												onClick: () => setViewReport(r),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													name: "visibility",
													size: 16
												}), "View"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => handlePublish(r.id, r.status),
												title: r.status === "Published" ? "Mark as In review" : "Publish",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													name: r.status === "Published" ? "unpublished" : "publish",
													size: 16
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => handleDelete(r.id, r.title),
												"aria-label": `Delete ${r.title}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													name: "delete",
													size: 16
												})
											})
										]
									})]
								})
							}, r.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "demo",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							padded: false,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "ID" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Title" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Author" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Created" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Pages" })
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: REPORTS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "type-data text-xs text-muted-foreground",
										children: r.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-on-surface",
										children: r.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 max-w-xs truncate text-xs text-muted-foreground",
										children: r.summary
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										children: r.type
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
										tone: STATUS_TONE[r.status] ?? "neutral",
										children: r.status
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "text-sm",
										children: r.author
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "type-data text-xs text-muted-foreground",
										children: r.createdOn
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
										className: "type-data",
										children: r.pages
									})
								] }, r.id)) })] })
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "templates",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: REPORT_TEMPLATES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "p-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-on-surface",
										children: t.type
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-on-surface-variant",
										children: t.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1",
										children: t.sections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											className: "text-xs",
											children: s
										}, s))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										onClick: () => setDialogOpen(true),
										children: "Use template"
									})
								]
							}, t.type))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenerateReportDialog, {
				open: dialogOpen,
				onOpenChange: setDialogOpen,
				feedstocks,
				onCreated: () => setReload((n) => n + 1)
			}),
			viewReport && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportViewDialog, {
				report: viewReport,
				onClose: () => setViewReport(null)
			})
		]
	});
}
function GenerateReportDialog({ open, onOpenChange, feedstocks, onCreated }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [type, setType] = (0, import_react.useState)("Feedstock profile");
	const [feedstockId, setFeedstockId] = (0, import_react.useState)("none");
	const [author, setAuthor] = (0, import_react.useState)("Research team");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	async function submit(e) {
		e.preventDefault();
		setErr(null);
		if (!title.trim()) return setErr("Title is required");
		setSubmitting(true);
		try {
			const payload = {
				title: title.trim(),
				type,
				author: author.trim() || "Research team",
				content: notes.trim() || void 0
			};
			if (feedstockId !== "none") payload.feedstockId = parseInt(feedstockId);
			await backendApi.reports.create(payload);
			toast.success("Report generated");
			onCreated();
			onOpenChange(false);
			setTitle("");
			setType("Feedstock profile");
			setFeedstockId("none");
			setNotes("");
			setAuthor("Research team");
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
			className: "sm:max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Generate report" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Creates a report backed by live workspace records — suppliers, feedstocks, batches. All data cited traces to persisted database entries." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "rpt-title",
							children: "Title *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "rpt-title",
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "e.g. Coffee pulp — batch QC Q4 2026",
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "rpt-type",
								children: "Report type *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: type,
								onValueChange: setType,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "rpt-type",
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: REPORT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t,
									children: t
								}, t)) })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "rpt-fs",
								children: "Focus feedstock"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: feedstockId,
								onValueChange: setFeedstockId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "rpt-fs",
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "none",
									children: "All feedstocks"
								}), feedstocks.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: String(f.id),
									children: f.name
								}, f.id))] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "rpt-author",
							children: "Author"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "rpt-author",
							value: author,
							onChange: (e) => setAuthor(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "rpt-notes",
							children: "Analysis notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "rpt-notes",
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							placeholder: "Findings, pathway notes or recommendations to include in the report…",
							rows: 4
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
						children: submitting ? "Generating…" : "Generate report"
					})] })
				]
			})]
		})
	});
}
function ReportViewDialog({ report, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl max-h-[80vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: report.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					report.type,
					" · ",
					report.author,
					" · ",
					fmtDate(report.createdAt)
				] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-on-surface",
							children: "Summary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-on-surface-variant",
							children: report.summary
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-on-surface",
							children: "Sections"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex flex-wrap gap-1",
							children: report.sections.split("|").map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: s
							}, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-sm font-semibold text-on-surface",
							children: "Content"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "whitespace-pre-wrap rounded-xl border border-hairline bg-surface-low px-4 py-3 text-xs text-on-surface-variant font-mono leading-relaxed",
							children: report.content
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onClose,
					children: "Close"
				}) })
			]
		})
	});
}
export { ReportsPage as component };
