import { Icon, cn } from "./router-ChhPpYzB.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/page-BYeyT62h.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ eyebrow, title, description, actions, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("flex flex-col justify-between gap-6 pt-6 lg:flex-row lg:items-end", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-3xl space-y-2.5",
			children: [
				eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "type-eyebrow text-brand-strong",
						children: eyebrow
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "type-headline text-on-surface",
					children: title
				}),
				description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-base text-on-surface-variant",
					children: description
				})
			]
		}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex shrink-0 flex-wrap items-center gap-3",
			children: actions
		})]
	});
}
function SectionHeader({ title, description, badge, actions, className, as: As = "h2" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap items-start justify-between gap-3", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(As, {
					className: "type-title font-sans text-on-surface",
					children: title
				}), badge]
			}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-sm text-on-surface-variant",
				children: description
			})]
		}), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: actions
		})]
	});
}
/** White data panel: 1px hairline border, 12px radius, 24px padding. */
function Panel({ className, children, padded = true, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-hairline bg-card shadow-card", padded && "p-5 sm:p-6", className),
		...rest,
		children
	});
}
function StatCard({ label, value, icon, delta, deltaTone = "brand", footnote }) {
	const tone = {
		brand: "text-brand-strong",
		muted: "text-on-surface-variant",
		amber: "text-amber-ink",
		risk: "text-risk"
	}[deltaTone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col justify-between gap-4 rounded-xl border border-hairline bg-card p-5 shadow-card transition-shadow hover:shadow-float sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "type-eyebrow text-on-surface-variant",
					children: label
				}), icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: icon,
					className: "text-brand-strong"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "type-headline tnum text-on-surface",
					children: value
				}), delta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("type-data", tone),
					children: delta
				})]
			}),
			footnote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "-mt-2 text-xs text-muted-foreground",
				children: footnote
			})
		]
	});
}
function EmptyState({ icon = "search_off", title, description, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-outline-variant bg-surface-low px-6 py-12 text-center", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-11 place-items-center rounded-full bg-sage text-brand-strong",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: icon,
					size: 22
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-on-surface",
					children: title
				}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-sm text-on-surface-variant",
					children: description
				})]
			}),
			action
		]
	});
}
function ErrorState({ title = "This data couldn’t load", description = "The request failed. Try again in a moment.", action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: "flex flex-col items-center justify-center gap-3 rounded-xl border border-risk/30 bg-risk-soft/40 px-6 py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-11 place-items-center rounded-full bg-risk-soft text-risk-ink",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "error",
					size: 22
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-on-surface",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-md text-sm text-on-surface-variant",
					children: description
				})]
			}),
			action
		]
	});
}
function StatusPill({ tone = "sage", children, className }) {
	const t = {
		sage: "bg-mint text-on-mint",
		neutral: "bg-surface-high text-on-surface-variant",
		amber: "bg-amber-soft text-amber-ink",
		risk: "bg-risk-soft text-risk-ink",
		outline: "border border-hairline bg-card text-on-surface"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap", t, className),
		children
	});
}
/** Horizontal score bar 0–100 with tabular value. */
function ScoreBar({ value, max = 100, tone = "brand", showValue = true, className, label }) {
	const pct = Math.max(0, Math.min(100, value / max * 100));
	const bar = {
		brand: "bg-brand",
		amber: "bg-amber",
		risk: "bg-risk",
		mint: "bg-mint-dim"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 flex-1 overflow-hidden rounded-full bg-surface-high",
			role: "meter",
			"aria-valuenow": Math.round(value),
			"aria-valuemin": 0,
			"aria-valuemax": max,
			"aria-label": label,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none", bar),
				style: { width: `${pct}%` }
			})
		}), showValue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "type-data w-8 text-right text-on-surface",
			children: Math.round(value)
		})]
	});
}
var scoreTone = (v) => v >= 65 ? "brand" : v >= 40 ? "amber" : "risk";
function SegmentedControl({ value, onChange, options, label, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "radiogroup",
		"aria-label": label,
		className: cn("inline-flex rounded-lg border border-hairline bg-surface-low p-0.5", className),
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "radio",
			"aria-checked": value === o.value,
			onClick: () => onChange(o.value),
			className: cn("inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand", value === o.value ? "bg-card text-on-surface shadow-card" : "text-on-surface-variant hover:text-on-surface"),
			children: o.label
		}, o.value))
	});
}
/** Labelled range slider styled to the design system. */
function RangeField({ id, label, value, min, max, step = 1, onChange, format = (v) => String(v), hint }) {
	const fill = (value - min) / (max - min) * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					htmlFor: id,
					className: "text-sm font-medium text-on-surface",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "type-data text-brand-strong",
					children: format(value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				type: "range",
				className: "bp-range",
				min,
				max,
				step,
				value,
				onChange: (e) => onChange(Number(e.target.value)),
				style: { ["--fill"]: `${fill}%` },
				"aria-describedby": hint ? `${id}-hint` : void 0
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				id: `${id}-hint`,
				className: "text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
export { EmptyState, ErrorState, PageHeader, Panel, RangeField, ScoreBar, SectionHeader, SegmentedControl, StatCard, StatusPill, scoreTone };
