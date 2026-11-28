import { Icon, Route } from "./router-ChhPpYzB.mjs";
import { PageHeader, Panel, SectionHeader } from "./page-BYeyT62h.mjs";
import { Link } from "../_libs/@tanstack/react-router+[2...].mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
// node_modules/.nitro/vite/services/ssr/assets/modules._moduleId-CaOYNdgw.js
var import_jsx_runtime = require_jsx_runtime();
var MODULE_BRIEFS = [
	{
		id: "process-simulator",
		title: "Process Simulator",
		icon: "science",
		layer: "Pathway",
		summary: "Step-by-step mass and energy balances for a chosen feedstock and pathway, with unit operations you can tune.",
		capabilities: [
			"Unit-operation flowsheets (pretreatment → conversion → recovery)",
			"Mass, water and energy balance per step",
			"Sensitivity sweeps on solids loading, temperature and residence time"
		],
		inputs: [{
			label: "Pathway Optimizer",
			to: "/pathways"
		}, {
			label: "Feedstock Explorer",
			to: "/feedstocks"
		}]
	},
	{
		id: "ingredient-formulation",
		title: "Ingredient Formulation",
		icon: "biotech",
		layer: "End-Use",
		summary: "Blend protein streams to hit amino acid, functionality and cost targets for a product specification.",
		capabilities: [
			"Least-cost blending against amino acid targets",
			"Complementarity between lysine- and methionine-rich streams",
			"Functional property targets (solubility, gelation)"
		],
		inputs: [{
			label: "Feedstock fingerprints",
			to: "/feedstocks"
		}, {
			label: "End-Use Intelligence",
			to: "/end-use"
		}]
	},
	{
		id: "economics",
		title: "Economics",
		icon: "monitoring",
		layer: "Pathway",
		summary: "Techno-economic analysis — capex, opex, margins and payback for pathway and allocation scenarios.",
		capabilities: [
			"Capex/opex build-up by plant scale",
			"Price sensitivity for protein products",
			"Payback and break-even feedstock cost"
		],
		inputs: [{
			label: "Resource Allocation",
			to: "/allocation"
		}, {
			label: "Pathway Optimizer",
			to: "/pathways"
		}]
	},
	{
		id: "environmental-impact",
		title: "Environmental Impact",
		icon: "compost",
		layer: "Pathway",
		summary: "Screening-level life-cycle indicators — GHG, water scarcity and land use — for each pathway and allocation.",
		capabilities: [
			"GHG intensity per kg protein",
			"Avoided-burden accounting for diverted residues",
			"Comparison with conventional protein benchmarks"
		],
		inputs: [{
			label: "Resource Allocation",
			to: "/allocation"
		}]
	},
	{
		id: "safety-and-quality",
		title: "Safety & Quality",
		icon: "verified_user",
		layer: "Fingerprint",
		summary: "Hazard registers, screening plans and release criteria for each feedstock and product.",
		capabilities: [
			"Contaminant screening schedules (mycotoxins, metals, pathogens)",
			"Release specifications per end-use",
			"Corrective-action tracking"
		],
		inputs: [{
			label: "Batch Fingerprinting",
			to: "/fingerprinting"
		}, {
			label: "End-Use Intelligence",
			to: "/end-use"
		}]
	},
	{
		id: "traceability",
		title: "Traceability",
		icon: "qr_code_2",
		layer: "Source",
		summary: "Lot-level chain of custody from collection point through conversion to product.",
		capabilities: [
			"Lot genealogy and QR labelling",
			"Supplier and collection-point records",
			"Audit-ready custody exports"
		],
		inputs: [{
			label: "Source Intelligence",
			to: "/source-intelligence"
		}, {
			label: "Batch Fingerprinting",
			to: "/fingerprinting"
		}]
	},
	{
		id: "evidence-library",
		title: "Evidence Library",
		icon: "menu_book",
		layer: "Platform",
		summary: "A curated register of literature, lab results and model outputs that every number in the platform links back to.",
		capabilities: [
			"Citation management with provenance class",
			"Evidence grading for pathway and end-use claims",
			"Linking evidence to specific values and assumptions"
		],
		inputs: [{
			label: "Feedstock profiles",
			to: "/feedstocks"
		}]
	},
	{
		id: "research-assistant",
		title: "Research Assistant",
		icon: "smart_toy",
		layer: "Platform",
		summary: "An assistant that answers questions grounded in the evidence library and your own data, always citing sources.",
		capabilities: [
			"Question answering grounded in indexed evidence",
			"Draft report sections with citations",
			"Flags where evidence is missing or weak"
		],
		inputs: [{
			label: "Reports",
			to: "/reports"
		}]
	},
	{
		id: "experiments-and-learning",
		title: "Experiments & Learning",
		icon: "experiment",
		layer: "Platform",
		summary: "Plan lab and pilot trials, capture results, and feed them back to recalibrate pathway models.",
		capabilities: [
			"Experiment design templates",
			"Result capture tied to batches",
			"Model recalibration from measured yields"
		],
		inputs: [{
			label: "Batch Fingerprinting",
			to: "/fingerprinting"
		}, {
			label: "Pathway Optimizer",
			to: "/pathways"
		}]
	},
	{
		id: "by-product-exchange",
		title: "By-Product Exchange",
		icon: "swap_horiz",
		layer: "Source",
		summary: "Match feedstock suppliers with converters, with standardised specifications and logistics quotes.",
		capabilities: [
			"Listings with fingerprint-backed specifications",
			"Supplier–converter matching",
			"Logistics cost estimates"
		],
		inputs: [{
			label: "Source Intelligence",
			to: "/source-intelligence"
		}]
	},
	{
		id: "settings",
		title: "Settings",
		icon: "settings",
		layer: "Platform",
		summary: "Workspace preferences, units, default scoring weights and data-source connections.",
		capabilities: [
			"Units and regional defaults",
			"Default pathway weights",
			"Data-source connections"
		],
		inputs: []
	},
	{
		id: "profile",
		title: "Profile",
		icon: "person",
		layer: "Platform",
		summary: "Your account, role and notification preferences.",
		capabilities: [
			"Role and team membership",
			"Notification preferences",
			"Saved views"
		],
		inputs: []
	},
	{
		id: "help-and-support",
		title: "Help & Support",
		icon: "help",
		layer: "Platform",
		summary: "Guides to the methodology, data provenance and each module.",
		capabilities: [
			"Methodology notes for the scoring model",
			"Provenance and data-quality guide",
			"Contact the BIOPATH team"
		],
		inputs: []
	}
];
var moduleById = (id) => MODULE_BRIEFS.find((m) => m.id === id);
function ModulePage() {
	const { moduleId } = Route.useParams();
	const mod = moduleById(moduleId);
	if (!mod) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-hairline bg-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					name: "extension_off",
					size: 32,
					className: "text-muted-foreground"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-semibold text-on-surface",
					children: "Unknown module"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"No module brief exists for “",
						moduleId,
						"”."
					]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: `${mod.layer} layer`,
			title: mod.title,
			description: mod.summary
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "lg:col-span-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Planned capabilities" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2.5",
					children: mod.capabilities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2.5 text-sm text-on-surface-variant",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "check_circle",
							size: 18,
							className: "mt-0.5 shrink-0 text-brand-strong"
						}), c]
					}, c))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "lg:col-span-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Data inputs" }), mod.inputs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "This module has no upstream dependencies."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: mod.inputs.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: i.to,
						className: "flex items-center justify-between rounded-lg border border-hairline px-3 py-2 text-sm text-on-surface transition-colors hover:border-brand/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "arrow_forward",
							size: 16,
							className: "text-brand-strong"
						})]
					}, i.label))
				})]
			})]
		})]
	});
}
export { ModulePage as component };
