/**
 * Sidebar navigation, mirroring the Stitch reference design.
 * `to` points at a live screen; modules without a dedicated screen yet open a
 * module brief at /modules/$moduleId.
 */
export type AppPath =
  | "/"
  | "/feedstocks"
  | "/source-intelligence"
  | "/fingerprinting"
  | "/pathways"
  | "/allocation"
  | "/end-use"
  | "/reports";

export type NavItem =
  | { label: string; icon: string; to: AppPath; moduleId?: undefined }
  | { label: string; icon: string; to: "/modules/$moduleId"; moduleId: string };

export interface NavSection {
  title: string;
  items: NavItem[];
}

const mod = (label: string, icon: string, moduleId: string): NavItem => ({
  label,
  icon,
  to: "/modules/$moduleId",
  moduleId,
});

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", icon: "dashboard", to: "/" }],
  },
  {
    title: "Intelligence",
    items: [
      { label: "Feedstock Explorer", icon: "eco", to: "/feedstocks" },
      {
        label: "Source Intelligence",
        icon: "travel_explore",
        to: "/source-intelligence",
      },
      {
        label: "Batch Fingerprinting",
        icon: "fingerprint",
        to: "/fingerprinting",
      },
    ],
  },
  {
    title: "Bioconversion",
    items: [
      { label: "Pathway Optimizer", icon: "alt_route", to: "/pathways" },
      { label: "Resource Allocation", icon: "pie_chart", to: "/allocation" },
      mod("Process Simulator", "science", "process-simulator"),
    ],
  },
  {
    title: "Product & Market",
    items: [
      { label: "End-Use Intelligence", icon: "category", to: "/end-use" },
      mod("Ingredient Formulation", "biotech", "ingredient-formulation"),
      mod("Economics", "monitoring", "economics"),
    ],
  },
  {
    title: "Sustainability",
    items: [
      mod("Environmental Impact", "compost", "environmental-impact"),
      mod("Safety & Quality", "verified_user", "safety-and-quality"),
      mod("Traceability", "qr_code_2", "traceability"),
    ],
  },
  {
    title: "Research",
    items: [
      mod("Evidence Library", "menu_book", "evidence-library"),
      mod("Research Assistant", "smart_toy", "research-assistant"),
      mod("Experiments & Learning", "experiment", "experiments-and-learning"),
    ],
  },
  {
    title: "Operations",
    items: [
      mod("By-Product Exchange", "swap_horiz", "by-product-exchange"),
      { label: "Reports", icon: "assessment", to: "/reports" },
    ],
  },
];

export const NAV_FOOTER: NavItem[] = [
  mod("Settings", "settings", "settings"),
  mod("Profile", "person", "profile"),
  mod("Help & Support", "help", "help-and-support"),
];

export const ALL_NAV_ITEMS = [
  ...NAV_SECTIONS.flatMap((s) => s.items),
  ...NAV_FOOTER,
];
