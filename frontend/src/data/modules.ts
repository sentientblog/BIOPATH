/** Briefs for modules that are in the roadmap but not yet built as screens. */
export interface ModuleBrief {
  id: string;
  title: string;
  icon: string;
  layer: "Source" | "Fingerprint" | "Pathway" | "End-Use" | "Platform";
  summary: string;
  capabilities: string[];
  inputs: { label: string; to: string }[];
}

export const MODULE_BRIEFS: ModuleBrief[] = [
  {
    id: "process-simulator",
    title: "Process Simulator",
    icon: "science",
    layer: "Pathway",
    summary:
      "Step-by-step mass and energy balances for a chosen feedstock and pathway, with unit operations you can tune.",
    capabilities: [
      "Unit-operation flowsheets (pretreatment → conversion → recovery)",
      "Mass, water and energy balance per step",
      "Sensitivity sweeps on solids loading, temperature and residence time",
    ],
    inputs: [
      { label: "Pathway Optimizer", to: "/pathways" },
      { label: "Feedstock Explorer", to: "/feedstocks" },
    ],
  },
  {
    id: "ingredient-formulation",
    title: "Ingredient Formulation",
    icon: "biotech",
    layer: "End-Use",
    summary:
      "Blend protein streams to hit amino acid, functionality and cost targets for a product specification.",
    capabilities: [
      "Least-cost blending against amino acid targets",
      "Complementarity between lysine- and methionine-rich streams",
      "Functional property targets (solubility, gelation)",
    ],
    inputs: [
      { label: "Feedstock fingerprints", to: "/feedstocks" },
      { label: "End-Use Intelligence", to: "/end-use" },
    ],
  },
  {
    id: "economics",
    title: "Economics",
    icon: "monitoring",
    layer: "Pathway",
    summary:
      "Techno-economic analysis — capex, opex, margins and payback for pathway and allocation scenarios.",
    capabilities: [
      "Capex/opex build-up by plant scale",
      "Price sensitivity for protein products",
      "Payback and break-even feedstock cost",
    ],
    inputs: [
      { label: "Resource Allocation", to: "/allocation" },
      { label: "Pathway Optimizer", to: "/pathways" },
    ],
  },
  {
    id: "environmental-impact",
    title: "Environmental Impact",
    icon: "compost",
    layer: "Pathway",
    summary:
      "Screening-level life-cycle indicators — GHG, water scarcity and land use — for each pathway and allocation.",
    capabilities: [
      "GHG intensity per kg protein",
      "Avoided-burden accounting for diverted residues",
      "Comparison with conventional protein benchmarks",
    ],
    inputs: [{ label: "Resource Allocation", to: "/allocation" }],
  },
  {
    id: "safety-and-quality",
    title: "Safety & Quality",
    icon: "verified_user",
    layer: "Fingerprint",
    summary:
      "Hazard registers, screening plans and release criteria for each feedstock and product.",
    capabilities: [
      "Contaminant screening schedules (mycotoxins, metals, pathogens)",
      "Release specifications per end-use",
      "Corrective-action tracking",
    ],
    inputs: [
      { label: "Batch Fingerprinting", to: "/fingerprinting" },
      { label: "End-Use Intelligence", to: "/end-use" },
    ],
  },
  {
    id: "traceability",
    title: "Traceability",
    icon: "qr_code_2",
    layer: "Source",
    summary:
      "Lot-level chain of custody from collection point through conversion to product.",
    capabilities: [
      "Lot genealogy and QR labelling",
      "Supplier and collection-point records",
      "Audit-ready custody exports",
    ],
    inputs: [
      { label: "Source Intelligence", to: "/source-intelligence" },
      { label: "Batch Fingerprinting", to: "/fingerprinting" },
    ],
  },
  {
    id: "evidence-library",
    title: "Evidence Library",
    icon: "menu_book",
    layer: "Platform",
    summary:
      "A curated register of literature, lab results and model outputs that every number in the platform links back to.",
    capabilities: [
      "Citation management with provenance class",
      "Evidence grading for pathway and end-use claims",
      "Linking evidence to specific values and assumptions",
    ],
    inputs: [{ label: "Feedstock profiles", to: "/feedstocks" }],
  },
  {
    id: "research-assistant",
    title: "Research Assistant",
    icon: "smart_toy",
    layer: "Platform",
    summary:
      "An assistant that answers questions grounded in the evidence library and your own data, always citing sources.",
    capabilities: [
      "Question answering grounded in indexed evidence",
      "Draft report sections with citations",
      "Flags where evidence is missing or weak",
    ],
    inputs: [{ label: "Reports", to: "/reports" }],
  },
  {
    id: "experiments-and-learning",
    title: "Experiments & Learning",
    icon: "experiment",
    layer: "Platform",
    summary:
      "Plan lab and pilot trials, capture results, and feed them back to recalibrate pathway models.",
    capabilities: [
      "Experiment design templates",
      "Result capture tied to batches",
      "Model recalibration from measured yields",
    ],
    inputs: [
      { label: "Batch Fingerprinting", to: "/fingerprinting" },
      { label: "Pathway Optimizer", to: "/pathways" },
    ],
  },
  {
    id: "by-product-exchange",
    title: "By-Product Exchange",
    icon: "swap_horiz",
    layer: "Source",
    summary:
      "Match feedstock suppliers with converters, with standardised specifications and logistics quotes.",
    capabilities: [
      "Listings with fingerprint-backed specifications",
      "Supplier–converter matching",
      "Logistics cost estimates",
    ],
    inputs: [{ label: "Source Intelligence", to: "/source-intelligence" }],
  },
  {
    id: "settings",
    title: "Settings",
    icon: "settings",
    layer: "Platform",
    summary:
      "Workspace preferences, units, default scoring weights and data-source connections.",
    capabilities: [
      "Units and regional defaults",
      "Default pathway weights",
      "Data-source connections",
    ],
    inputs: [],
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
      "Saved views",
    ],
    inputs: [],
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
      "Contact the BIOPATH team",
    ],
    inputs: [],
  },
];

export const moduleById = (id: string) =>
  MODULE_BRIEFS.find((m) => m.id === id);
