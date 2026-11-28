import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime } from "../_libs/react.mjs";
import { clsx, cva } from "../_libs/class-variance-authority+clsx.mjs";
import { twMerge } from "../_libs/tailwind-merge.mjs";
import { require_react } from "../_libs/react+react-dom.mjs";
import { Slot } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { HeadContent, Link, Scripts, createFileRoute, createRootRoute, createRouter, lazyRouteComponent, useNavigate } from "../_libs/@tanstack/react-router+[2...].mjs";
import { Outlet, useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { CircleCheck, Info, LoaderCircle, OctagonX, TriangleAlert, X } from "../_libs/lucide-react.mjs";
import { Toaster, toast } from "../_libs/sonner.mjs";
import { Tooltip as Tooltip$1, TooltipArrow, TooltipContent as TooltipContent$1, TooltipPortal, TooltipProvider as TooltipProvider$1, TooltipTrigger as TooltipTrigger$1 } from "../_libs/radix-ui__react-tooltip.mjs";
import { Popover as Popover$1, PopoverContent as PopoverContent$1, PopoverPortal, PopoverTrigger as PopoverTrigger$1 } from "../_libs/radix-ui__react-popover.mjs";
import { DropdownMenu as DropdownMenu$1, DropdownMenuContent as DropdownMenuContent$1, DropdownMenuItem as DropdownMenuItem$1, DropdownMenuLabel as DropdownMenuLabel$1, DropdownMenuPortal, DropdownMenuSeparator as DropdownMenuSeparator$1, DropdownMenuTrigger as DropdownMenuTrigger$1 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { Dialog as Dialog$1, DialogClose, DialogContent as DialogContent$1, DialogDescription as DialogDescription$1, DialogOverlay as DialogOverlay$1, DialogPortal as DialogPortal$1, DialogTitle as DialogTitle$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { object, string } from "../_libs/zod.mjs";
// node_modules/.nitro/vite/services/ssr/assets/icon-9OKEQy5L.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** Material Symbols Outlined icon — the icon set used in the Stitch design. */
function Icon({ name, size = 20, filled = false, className, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("material-symbols-outlined", className),
		style: {
			fontSize: size,
			width: size,
			height: size,
			fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${size >= 24 ? 24 : 20}`
		},
		"aria-hidden": label ? void 0 : true,
		role: label ? "img" : void 0,
		"aria-label": label,
		children: name
	});
}
// node_modules/.nitro/vite/services/ssr/assets/button-8_FanRDF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var buttonVariants = cva("inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-sage focus-visible:outline-1 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-card hover:bg-forest",
			destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
			outline: "border border-hairline bg-card text-on-surface shadow-card hover:bg-surface-high",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "text-on-surface-variant hover:bg-surface-high hover:text-on-surface",
			link: "text-brand-strong underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
			sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
			lg: "h-10 rounded-md px-5 has-[>svg]:px-4",
			icon: "size-9",
			"icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
			"icon-sm": "size-8",
			"icon-lg": "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		"data-slot": "button",
		"data-variant": variant,
		"data-size": size,
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
// node_modules/.nitro/vite/services/ssr/assets/format-BA4fAWOy.js
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "skeleton",
		className: cn("animate-pulse motion-reduce:animate-none rounded-md bg-accent", className),
		...props
	});
}
/**
* DEMO FEEDSTOCK DATABASE
* -----------------------
* Values are simulated and indicative only. They are shaped like typical
* ranges for each material class so the interface behaves realistically, but
* they are NOT verified measurements and must not be cited.
*/
var m = (value, unit, provenance, range, n) => ({
	value,
	unit,
	provenance,
	range,
	n
});
var FLAGS = {
	caffeine: {
		id: "caffeine",
		label: "Caffeine & polyphenols",
		severity: "warning",
		detail: "Anti-nutritional for monogastric feed; may inhibit some microbes until degraded or extracted."
	},
	tannins: {
		id: "tannins",
		label: "Condensed tannins",
		severity: "warning",
		detail: "Reduces protein digestibility; detanninisation or fermentation pretreatment advised."
	},
	spoilage: {
		id: "spoilage",
		label: "Rapid spoilage",
		severity: "warning",
		detail: "High moisture — requires processing or stabilisation within 24–48 h of generation."
	},
	mycotoxin: {
		id: "mycotoxin",
		label: "Mycotoxin screen required",
		severity: "critical",
		detail: "Aflatoxin/fumonisin screening must clear before any food or feed use."
	},
	gossypol: {
		id: "gossypol",
		label: "Free gossypol",
		severity: "critical",
		detail: "Toxic to monogastrics; restricts human food use unless removed."
	},
	phytate: {
		id: "phytate",
		label: "Phytate",
		severity: "info",
		detail: "Binds minerals; phytase treatment or fermentation can reduce levels."
	},
	oxidation: {
		id: "oxidation",
		label: "Lipid oxidation",
		severity: "warning",
		detail: "High residual oil — stabilise to avoid rancidity during storage."
	},
	metals: {
		id: "metals",
		label: "Heavy-metal screen",
		severity: "critical",
		detail: "Aquatic biomass can accumulate metals; screen every lot before use."
	},
	allergen: {
		id: "allergen",
		label: "Allergen declaration",
		severity: "info",
		detail: "Derived from a major allergen source; labelling obligations apply."
	},
	lignin: {
		id: "lignin",
		label: "High lignin",
		severity: "info",
		detail: "Recalcitrant fibre — pretreatment needed for enzymatic or microbial access."
	},
	salt: {
		id: "salt",
		label: "High mineral/salt",
		severity: "info",
		detail: "Elevated ash may limit inclusion rates in feed formulations."
	},
	microbial: {
		id: "microbial",
		label: "Microbial load",
		severity: "warning",
		detail: "Pathogen control (pasteurisation/sterilisation) required before processing."
	},
	cyanogenic: {
		id: "cyanogenic",
		label: "Cyanogenic glycosides",
		severity: "critical",
		detail: "Must be detoxified (drying, ensiling, fermentation) before food or feed use."
	}
};
var AA_KEYS = [
	"his",
	"ile",
	"leu",
	"lys",
	"saa",
	"aaa",
	"thr",
	"trp",
	"val"
];
var ROWS = [
	{
		id: "coffee-pulp",
		name: "Coffee pulp",
		category: "Agro-industrial residue",
		region: "central-highlands",
		sourceType: "Coffee wet mills",
		image: "/img/fs-coffee-pulp.jpg",
		summary: "Polyphenol-rich wet-mill residue suited for fungal fermentation.",
		description: "The fleshy exocarp and mesocarp removed during wet processing of coffee cherries. Generated in large, highly seasonal volumes at mill sites, it is wet, acidic and rich in fermentable sugars, but carries caffeine and polyphenols that must be managed for feed and food routes.",
		volume: 42e3,
		availability: "Seasonal",
		season: [
			.2,
			.1,
			.05,
			.05,
			.1,
			.2,
			.3,
			.4,
			.7,
			1,
			.95,
			.6
		],
		km: 35,
		cost: 12,
		comp: [
			82,
			11.2,
			2.4,
			30.5,
			8.6
		],
		compProv: "measured",
		cv: 14.2,
		aa: [
			2.4,
			3.6,
			6.4,
			5.4,
			2.1,
			6.2,
			4,
			1,
			5
		],
		phys: [
			420,
			9,
			4.4,
			2
		],
		flags: [
			"caffeine",
			"tannins",
			"spoilage"
		],
		status: "profiled",
		batches: 32,
		updated: "2026-11-24T10:46:00Z",
		tags: [
			"High volume",
			"Wet stream",
			"SSF candidate"
		]
	},
	{
		id: "brewers-spent-grain",
		name: "Brewer's spent grain",
		category: "Brewery & distillery co-product",
		region: "central-highlands",
		sourceType: "Regional breweries",
		image: "/img/fs-bsg.jpg",
		summary: "High-protein lignocellulosic co-product from regional breweries.",
		description: "Residual barley husk, pericarp and protein left after mashing. Produced continuously by breweries close to urban centres, with consistent quality but a short shelf life when wet.",
		volume: 31e3,
		availability: "Year-round",
		season: [
			.85,
			.8,
			.85,
			.9,
			.9,
			.85,
			.9,
			.95,
			.9,
			.95,
			1,
			1
		],
		km: 18,
		cost: 28,
		comp: [
			77,
			23.4,
			8.8,
			48.2,
			4.1
		],
		compProv: "measured",
		cv: 6.1,
		aa: [
			2.2,
			3.9,
			7.8,
			3.8,
			3.9,
			8.6,
			3.6,
			1.1,
			5.2
		],
		phys: [
			380,
			3,
			5.6,
			3
		],
		flags: ["spoilage", "lignin"],
		status: "profiled",
		batches: 28,
		updated: "2026-11-23T15:10:00Z",
		tags: [
			"Year-round",
			"Urban",
			"Extraction candidate"
		]
	},
	{
		id: "soy-okara",
		name: "Soy okara",
		category: "Agro-industrial residue",
		region: "western-plateau",
		sourceType: "Soy milk & tofu processors",
		image: "/img/fs-okara.jpg",
		summary: "Moisture-dense soy milk residue with rapid enzymatic digestibility.",
		description: "The insoluble pulp remaining after soybean slurry is filtered for soy milk or tofu. Nutritionally dense with a favourable amino acid profile, but very wet and perishable.",
		volume: 6800,
		availability: "Year-round",
		season: [
			.9,
			.9,
			.95,
			.9,
			.85,
			.85,
			.9,
			.9,
			.95,
			1,
			1,
			.95
		],
		km: 22,
		cost: 20,
		comp: [
			80,
			28.6,
			11.8,
			42.4,
			4
		],
		compProv: "measured",
		cv: 8.4,
		aa: [
			2.6,
			4.6,
			7.9,
			6.2,
			2.8,
			8.6,
			4,
			1.3,
			4.9
		],
		phys: [
			610,
			1,
			6.6,
			1
		],
		flags: [
			"spoilage",
			"allergen",
			"phytate"
		],
		status: "profiled",
		batches: 19,
		updated: "2026-11-24T08:02:00Z",
		tags: ["Food-grade origin", "Wet stream"]
	},
	{
		id: "sunflower-cake",
		name: "Sunflower cake",
		category: "Oilseed cake",
		region: "rift-valley",
		sourceType: "Expeller oil mills",
		image: "/img/fs-sunflower.jpg",
		summary: "Defatted oilseed meal with balanced amino acid profile.",
		description: "Press cake remaining after mechanical oil extraction. Dry and storable, with substantial protein but chlorogenic acid that can darken protein isolates.",
		volume: 18500,
		availability: "Seasonal",
		season: [
			.6,
			.5,
			.4,
			.3,
			.4,
			.6,
			.9,
			1,
			.9,
			.8,
			.7,
			.6
		],
		km: 64,
		cost: 165,
		comp: [
			9,
			32.4,
			10.2,
			29.6,
			6.8
		],
		compProv: "literature",
		cv: 5.3,
		aa: [
			2.5,
			4.1,
			6.4,
			3.6,
			3.8,
			7.2,
			3.7,
			1.2,
			4.9
		],
		phys: [
			560,
			4,
			6.1,
			180
		],
		flags: ["oxidation", "phytate"],
		status: "profiled",
		batches: 14,
		updated: "2026-11-20T12:00:00Z",
		tags: ["Dry & storable", "Extraction candidate"]
	},
	{
		id: "avocado-residues",
		name: "Avocado processing residues",
		category: "Fruit processing residue",
		region: "central-highlands",
		sourceType: "Avocado oil & export packhouses",
		image: "/img/fs-avocado.jpg",
		summary: "Lipid-rich pomace and seed streams for fractionated recovery.",
		description: "Seeds, peels and oil-extraction pomace from avocado processors. Low in protein but high in lipids and starch, making it better suited to fermentation hosts than direct extraction.",
		volume: 9400,
		availability: "Seasonal",
		season: [
			.4,
			.6,
			.9,
			1,
			.9,
			.6,
			.4,
			.3,
			.3,
			.4,
			.4,
			.3
		],
		km: 48,
		cost: 15,
		comp: [
			55,
			6.1,
			14.2,
			22,
			4.2
		],
		compProv: "estimated",
		cv: 18.6,
		aa: [
			2,
			3.4,
			6.1,
			4.4,
			2.4,
			6.4,
			3.6,
			.9,
			4.6
		],
		phys: [
			520,
			12,
			5.9,
			5
		],
		flags: [
			"mycotoxin",
			"oxidation",
			"tannins"
		],
		status: "screening",
		batches: 9,
		updated: "2026-11-21T09:30:00Z",
		tags: ["Lipid-rich", "Fractionation"]
	},
	{
		id: "cassava-peel",
		name: "Cassava peel",
		category: "Agro-industrial residue",
		region: "coastal-belt",
		sourceType: "Cassava flour & starch processors",
		summary: "Starch-rich peel stream requiring detoxification before use.",
		description: "Peels removed during cassava flour and starch processing. Abundant and low cost, but contains cyanogenic glycosides that must be reduced before biological conversion for food or feed.",
		volume: 26e3,
		availability: "Year-round",
		season: [
			.8,
			.8,
			.7,
			.6,
			.6,
			.7,
			.8,
			.9,
			1,
			1,
			.9,
			.8
		],
		km: 40,
		cost: 8,
		comp: [
			65,
			5.2,
			1.4,
			18.4,
			6.2
		],
		compProv: "literature",
		cv: 16,
		aa: [
			1.8,
			3.2,
			5.6,
			4.2,
			2,
			5.8,
			3.4,
			.9,
			4.2
		],
		phys: [
			350,
			15,
			6,
			4
		],
		flags: ["cyanogenic", "spoilage"],
		status: "profiled",
		batches: 7,
		updated: "2026-11-18T14:20:00Z",
		tags: ["Low cost", "Fermentable carbs"]
	},
	{
		id: "banana-residues",
		name: "Banana peel & pseudostem",
		category: "Fruit processing residue",
		region: "lake-basin",
		sourceType: "Banana farms & ripening centres",
		summary: "Fibrous, wet residue with moderate ash and fermentable fraction.",
		description: "Peels from ripening and processing centres and pseudostem left after harvest. Very wet and dispersed across smallholdings, which drives aggregation cost.",
		volume: 21e3,
		availability: "Year-round",
		season: [
			.8,
			.8,
			.9,
			1,
			1,
			.9,
			.8,
			.8,
			.8,
			.9,
			.9,
			.8
		],
		km: 55,
		cost: 6,
		comp: [
			86,
			7.4,
			6,
			30.2,
			12.4
		],
		compProv: "estimated",
		cv: 21.4,
		aa: [
			1.9,
			3.3,
			6,
			4.6,
			2.2,
			6,
			3.8,
			1,
			4.4
		],
		phys: [
			300,
			25,
			5.8,
			3
		],
		flags: ["spoilage", "salt"],
		status: "pending",
		batches: 0,
		updated: "2026-11-10T09:00:00Z",
		tags: ["Dispersed supply"]
	},
	{
		id: "maize-bran",
		name: "Maize bran",
		category: "Cereal milling by-product",
		region: "rift-valley",
		sourceType: "Maize millers",
		summary: "Dry milling by-product, storable and widely traded as feed.",
		description: "Outer pericarp and germ fragments from dry maize milling. Already traded into livestock feed, so allocation must weigh displacement effects against protein upgrading.",
		volume: 54e3,
		availability: "Year-round",
		season: [
			.9,
			.9,
			.9,
			.9,
			1,
			1,
			1,
			.9,
			.9,
			.9,
			.9,
			.9
		],
		km: 30,
		cost: 120,
		comp: [
			12,
			11,
			5.2,
			44.6,
			2.4
		],
		compProv: "literature",
		cv: 7.2,
		aa: [
			2.7,
			3.4,
			9.6,
			3.6,
			3.8,
			7.4,
			3.6,
			.7,
			4.8
		],
		phys: [
			300,
			2,
			6.2,
			120
		],
		flags: ["mycotoxin", "phytate"],
		status: "profiled",
		batches: 11,
		updated: "2026-11-19T11:15:00Z",
		tags: ["Existing feed market", "Dry & storable"]
	},
	{
		id: "rice-bran",
		name: "Rice bran",
		category: "Cereal milling by-product",
		region: "lake-basin",
		sourceType: "Irrigation-scheme rice mills",
		summary: "Oil-rich bran with good lysine relative to other cereals.",
		description: "Bran layer removed during rice polishing. Lipid-rich and prone to rancidity unless stabilised soon after milling.",
		volume: 7600,
		availability: "Seasonal",
		season: [
			.3,
			.3,
			.5,
			.8,
			1,
			.9,
			.6,
			.4,
			.3,
			.5,
			.8,
			.6
		],
		km: 70,
		cost: 95,
		comp: [
			10,
			13.4,
			18.2,
			22.4,
			9.8
		],
		compProv: "literature",
		cv: 9.4,
		aa: [
			2.7,
			3.5,
			7.4,
			4.8,
			3.9,
			7.8,
			3.8,
			1.1,
			5.4
		],
		phys: [
			330,
			1,
			6.8,
			30
		],
		flags: ["oxidation", "phytate"],
		status: "screening",
		batches: 4,
		updated: "2026-11-15T16:45:00Z",
		tags: ["Lipid-rich"]
	},
	{
		id: "pineapple-residue",
		name: "Pineapple processing residue",
		category: "Fruit processing residue",
		region: "central-highlands",
		sourceType: "Canneries & juice plants",
		summary: "Sugar-rich peel and core stream suited to yeast fermentation.",
		description: "Peels, cores and crowns from canning and juicing. Acidic and high in soluble sugars, an efficient substrate for yeast or fungal biomass.",
		volume: 15200,
		availability: "Year-round",
		season: [
			.7,
			.7,
			.8,
			.9,
			1,
			1,
			.9,
			.8,
			.7,
			.7,
			.8,
			.8
		],
		km: 26,
		cost: 5,
		comp: [
			85,
			5,
			1.4,
			38.8,
			4.8
		],
		compProv: "measured",
		cv: 11.8,
		aa: [
			1.8,
			3.2,
			5.4,
			4,
			2,
			5.6,
			3.4,
			.8,
			4
		],
		phys: [
			400,
			18,
			3.9,
			2
		],
		flags: ["spoilage"],
		status: "profiled",
		batches: 6,
		updated: "2026-11-22T13:05:00Z",
		tags: ["Sugar-rich", "Yeast SCP candidate"]
	},
	{
		id: "sugarcane-bagasse",
		name: "Sugarcane bagasse",
		category: "Sugar industry co-product",
		region: "western-plateau",
		sourceType: "Sugar factories",
		summary: "Abundant lignocellulose; protein routes depend on pretreatment.",
		description: "Fibrous residue after cane crushing. Mostly burnt for factory energy, so diverting it competes with existing uses. Very low intrinsic protein.",
		volume: 41e4,
		availability: "Seasonal",
		season: [
			.9,
			.9,
			.8,
			.5,
			.3,
			.4,
			.7,
			.9,
			1,
			1,
			1,
			.9
		],
		km: 12,
		cost: 22,
		comp: [
			50,
			1.8,
			.7,
			80.2,
			3.1
		],
		compProv: "literature",
		cv: 4.4,
		aa: [
			1.6,
			3,
			5.2,
			3.2,
			2,
			5.4,
			3.4,
			.7,
			4
		],
		phys: [
			140,
			20,
			5.4,
			365
		],
		flags: ["lignin"],
		status: "profiled",
		batches: 3,
		updated: "2026-11-12T10:00:00Z",
		tags: ["Very high volume", "Competing use"]
	},
	{
		id: "cane-molasses",
		name: "Cane molasses",
		category: "Sugar industry co-product",
		region: "western-plateau",
		sourceType: "Sugar factories",
		summary: "Concentrated fermentable sugars for single-cell protein hosts.",
		description: "Viscous syrup remaining after sucrose crystallisation. A proven carbon source for yeast and bacterial fermentation; traded into distilling, so price follows that market.",
		volume: 68e3,
		availability: "Seasonal",
		season: [
			.9,
			.9,
			.8,
			.5,
			.3,
			.4,
			.7,
			.9,
			1,
			1,
			1,
			.9
		],
		km: 12,
		cost: 110,
		comp: [
			25,
			4.2,
			.2,
			0,
			12
		],
		compProv: "literature",
		cv: 3.8,
		aa: [
			1.2,
			2.2,
			3.4,
			2.4,
			1,
			2.6,
			2.2,
			.4,
			2.8
		],
		phys: [
			1400,
			0,
			5.2,
			365
		],
		flags: ["salt"],
		status: "profiled",
		batches: 5,
		updated: "2026-11-16T08:40:00Z",
		tags: ["Carbon source", "Storable"]
	},
	{
		id: "acid-whey",
		name: "Acid whey",
		category: "Dairy & fishery side-stream",
		region: "rift-valley",
		sourceType: "Yoghurt & cheese plants",
		summary: "Lactose-rich liquid stream with soluble whey proteins.",
		description: "Liquid remaining after acid coagulation in yoghurt and fresh-cheese making. Disposal is costly; lactose suits specialised yeasts, and residual whey proteins can be recovered.",
		volume: 12500,
		availability: "Year-round",
		season: [
			.8,
			.8,
			.9,
			1,
			1,
			.9,
			.8,
			.8,
			.8,
			.9,
			.9,
			.9
		],
		km: 20,
		cost: 0,
		comp: [
			94,
			11,
			1,
			0,
			12
		],
		compProv: "estimated",
		cv: 10.2,
		aa: [
			2,
			6,
			10.4,
			9,
			4.2,
			6,
			7,
			1.8,
			5.8
		],
		phys: [
			1025,
			0,
			4.5,
			2
		],
		flags: ["spoilage", "salt"],
		status: "screening",
		batches: 3,
		updated: "2026-11-14T12:30:00Z",
		tags: ["Liquid stream", "Disposal cost"]
	},
	{
		id: "fish-processing",
		name: "Fish processing by-products",
		category: "Dairy & fishery side-stream",
		region: "lake-basin",
		sourceType: "Lakeshore fish processors",
		summary: "Frames, heads and viscera with high-quality animal protein.",
		description: "Filleting by-products from lakeshore processing plants. Very high protein and favourable amino acids, but requires a cold chain or immediate hydrolysis to avoid spoilage.",
		volume: 8900,
		availability: "Seasonal",
		season: [
			1,
			1,
			.9,
			.7,
			.6,
			.6,
			.7,
			.8,
			.9,
			1,
			1,
			1
		],
		km: 15,
		cost: 60,
		comp: [
			70,
			52,
			18,
			0,
			22
		],
		compProv: "measured",
		cv: 12.4,
		aa: [
			2.4,
			4.2,
			7.6,
			8.4,
			3.8,
			7.2,
			4.4,
			1,
			5
		],
		phys: [
			900,
			30,
			6.6,
			1
		],
		flags: [
			"microbial",
			"spoilage",
			"metals"
		],
		status: "profiled",
		batches: 8,
		updated: "2026-11-17T07:55:00Z",
		tags: ["Animal origin", "Hydrolysis candidate"]
	},
	{
		id: "water-hyacinth",
		name: "Water hyacinth",
		category: "Aquatic biomass",
		region: "lake-basin",
		sourceType: "Invasive weed clearance",
		summary: "Invasive aquatic biomass with co-benefits from removal.",
		description: "Harvested during lake-clearance programmes. Very wet and mineral-rich; heavy-metal accumulation must be screened lot by lot before any feed or food route.",
		volume: 12e4,
		availability: "Intermittent",
		season: [
			.6,
			.6,
			.7,
			.9,
			1,
			1,
			.9,
			.8,
			.7,
			.6,
			.6,
			.6
		],
		km: 10,
		cost: 0,
		comp: [
			93,
			14.8,
			2,
			55,
			18.4
		],
		compProv: "estimated",
		cv: 24,
		aa: [
			1.8,
			4,
			7.6,
			4.8,
			2.4,
			7.6,
			4.2,
			1.4,
			5.4
		],
		phys: [
			80,
			40,
			7.2,
			2
		],
		flags: [
			"metals",
			"salt",
			"spoilage"
		],
		status: "screening",
		batches: 2,
		updated: "2026-11-08T10:20:00Z",
		tags: ["Ecosystem co-benefit"]
	},
	{
		id: "lemna",
		name: "Duckweed (Lemna)",
		category: "Aquatic biomass",
		region: "eastern-lowlands",
		sourceType: "Pilot cultivation ponds",
		summary: "Fast-growing aquatic plant with leaf-protein potential.",
		description: "Cultivated in pilot wastewater-polishing ponds. Protein content responds strongly to nutrient regime, so batch variability is a key fingerprint metric.",
		volume: 900,
		availability: "Year-round",
		season: [
			.8,
			.9,
			1,
			1,
			.9,
			.8,
			.7,
			.7,
			.8,
			.9,
			1,
			.9
		],
		km: 8,
		cost: 40,
		comp: [
			94,
			31.6,
			4.2,
			25,
			14.2
		],
		compProv: "measured",
		cv: 19.8,
		aa: [
			2.2,
			4.4,
			8.4,
			5.6,
			2.8,
			8.8,
			4.2,
			1.8,
			5.8
		],
		phys: [
			90,
			3,
			7,
			1
		],
		flags: ["metals", "microbial"],
		status: "screening",
		batches: 4,
		updated: "2026-11-20T16:00:00Z",
		tags: ["Cultivated", "Leaf protein"]
	},
	{
		id: "cottonseed-cake",
		name: "Cottonseed cake",
		category: "Oilseed cake",
		region: "eastern-lowlands",
		sourceType: "Ginneries & oil mills",
		summary: "High-protein cake limited by free gossypol.",
		description: "Press cake from cottonseed oil extraction. Protein-dense and dry, but gossypol restricts monogastric and human use unless removed.",
		volume: 14e3,
		availability: "Seasonal",
		season: [
			.4,
			.3,
			.3,
			.4,
			.6,
			.9,
			1,
			1,
			.8,
			.6,
			.5,
			.4
		],
		km: 90,
		cost: 180,
		comp: [
			10,
			40.6,
			7.4,
			30.2,
			6.8
		],
		compProv: "literature",
		cv: 6.8,
		aa: [
			2.8,
			3.2,
			5.8,
			4.2,
			3,
			8,
			3.2,
			1.2,
			4.4
		],
		phys: [
			580,
			4,
			6.4,
			180
		],
		flags: ["gossypol", "mycotoxin"],
		status: "profiled",
		batches: 4,
		updated: "2026-11-11T09:10:00Z",
		tags: ["Dry & storable", "Detox required"]
	},
	{
		id: "groundnut-cake",
		name: "Groundnut cake",
		category: "Oilseed cake",
		region: "western-plateau",
		sourceType: "Small-scale oil presses",
		summary: "Protein-dense cake with high aflatoxin sensitivity.",
		description: "Cake from groundnut oil pressing. Excellent protein density, but aflatoxin risk is the dominant constraint and depends heavily on storage conditions upstream.",
		volume: 5200,
		availability: "Seasonal",
		season: [
			.4,
			.4,
			.5,
			.7,
			.9,
			1,
			.9,
			.7,
			.5,
			.4,
			.4,
			.4
		],
		km: 75,
		cost: 240,
		comp: [
			9,
			47.2,
			8,
			12.6,
			5.8
		],
		compProv: "literature",
		cv: 7.6,
		aa: [
			2.4,
			3.4,
			6.4,
			3.6,
			2.4,
			9.4,
			2.8,
			1,
			4.2
		],
		phys: [
			600,
			4,
			6.3,
			120
		],
		flags: ["mycotoxin", "allergen"],
		status: "screening",
		batches: 3,
		updated: "2026-11-09T15:00:00Z",
		tags: ["Protein-dense", "Aflatoxin risk"]
	},
	{
		id: "sesame-cake",
		name: "Sesame cake",
		category: "Oilseed cake",
		region: "eastern-lowlands",
		sourceType: "Sesame oil presses",
		summary: "Methionine-rich cake complementary to legume proteins.",
		description: "Press cake from sesame oil extraction. Notable for sulphur amino acids, making it a useful blending partner for lysine-rich streams.",
		volume: 3100,
		availability: "Seasonal",
		season: [
			.6,
			.4,
			.3,
			.3,
			.3,
			.5,
			.8,
			1,
			1,
			.9,
			.8,
			.7
		],
		km: 110,
		cost: 210,
		comp: [
			8,
			40.2,
			12.4,
			18,
			11.2
		],
		compProv: "literature",
		cv: 6.2,
		aa: [
			2.6,
			3.6,
			6.8,
			2.8,
			5.2,
			8.2,
			3.6,
			1.4,
			4.6
		],
		phys: [
			590,
			3,
			6,
			150
		],
		flags: [
			"oxidation",
			"phytate",
			"allergen"
		],
		status: "pending",
		batches: 0,
		updated: "2026-11-05T10:00:00Z",
		tags: ["Blending partner"]
	},
	{
		id: "mango-residue",
		name: "Mango kernel & peel",
		category: "Fruit processing residue",
		region: "eastern-lowlands",
		sourceType: "Pulp & dried-fruit processors",
		summary: "Seasonal stream with starch-rich kernels and sugary peel.",
		description: "Kernels and peels from mango pulping and drying. Strongly seasonal; kernels contain tannins and starch, peels are sugar-rich.",
		volume: 11e3,
		availability: "Seasonal",
		season: [
			1,
			.9,
			.5,
			.2,
			.1,
			.05,
			.05,
			.1,
			.2,
			.5,
			.8,
			1
		],
		km: 85,
		cost: 4,
		comp: [
			48,
			7,
			9.6,
			14.2,
			3.2
		],
		compProv: "estimated",
		cv: 17.2,
		aa: [
			1.9,
			3.4,
			6.2,
			4.4,
			2.2,
			6.2,
			3.6,
			.9,
			4.6
		],
		phys: [
			450,
			20,
			4.6,
			3
		],
		flags: ["tannins", "spoilage"],
		status: "screening",
		batches: 2,
		updated: "2026-11-13T11:00:00Z",
		tags: ["Highly seasonal"]
	},
	{
		id: "tea-waste",
		name: "Tea factory refuse",
		category: "Agro-industrial residue",
		region: "central-highlands",
		sourceType: "Tea factories",
		summary: "Dry fibrous leaf refuse with appreciable leaf protein.",
		description: "Fluff, stalks and rejected leaf from tea manufacture. Dry and storable with moderate protein, but polyphenols and caffeine reduce digestibility.",
		volume: 9800,
		availability: "Year-round",
		season: [
			.9,
			.8,
			.9,
			1,
			1,
			.8,
			.7,
			.7,
			.8,
			.9,
			1,
			1
		],
		km: 28,
		cost: 10,
		comp: [
			12,
			22.4,
			2.2,
			44.8,
			6
		],
		compProv: "estimated",
		cv: 9.8,
		aa: [
			2,
			4.2,
			7.6,
			5.4,
			2.4,
			8.2,
			4.2,
			1.6,
			5.4
		],
		phys: [
			180,
			6,
			5.6,
			180
		],
		flags: ["caffeine", "tannins"],
		status: "pending",
		batches: 0,
		updated: "2026-11-02T09:00:00Z",
		tags: ["Dry & storable"]
	},
	{
		id: "potato-peel",
		name: "Potato peel",
		category: "Agro-industrial residue",
		region: "rift-valley",
		sourceType: "Crisp & chips processors",
		summary: "Starchy peel stream with good fermentability.",
		description: "Steam and abrasion peels from potato processing. Starch-rich and wet; glycoalkaloid levels should be confirmed before food applications.",
		volume: 7400,
		availability: "Year-round",
		season: [
			.8,
			.8,
			.9,
			.9,
			1,
			1,
			.9,
			.8,
			.8,
			.9,
			.9,
			.9
		],
		km: 34,
		cost: 6,
		comp: [
			83,
			12.2,
			1.6,
			20.4,
			7.8
		],
		compProv: "measured",
		cv: 10.6,
		aa: [
			2,
			3.8,
			5.8,
			5.4,
			2.6,
			7.6,
			4,
			1.2,
			5.2
		],
		phys: [
			550,
			8,
			6,
			3
		],
		flags: ["spoilage"],
		status: "profiled",
		batches: 5,
		updated: "2026-11-22T10:00:00Z",
		tags: ["Starch-rich", "Fermentable"]
	},
	{
		id: "distillers-grains",
		name: "Distillers wet grains",
		category: "Brewery & distillery co-product",
		region: "central-highlands",
		sourceType: "Grain distilleries",
		summary: "Protein-enriched grain residue after starch fermentation.",
		description: "Wet grain residue after distillation of grain spirits. Fermentation concentrates protein and lipid relative to the original grain.",
		volume: 9200,
		availability: "Year-round",
		season: [
			.9,
			.9,
			.9,
			.9,
			.9,
			.9,
			.9,
			.9,
			.9,
			.95,
			1,
			1
		],
		km: 24,
		cost: 35,
		comp: [
			70,
			30.4,
			10.2,
			38,
			5
		],
		compProv: "estimated",
		cv: 8,
		aa: [
			2.6,
			3.8,
			10,
			2.8,
			3.6,
			8.4,
			3.6,
			.8,
			5
		],
		phys: [
			420,
			4,
			4.2,
			3
		],
		flags: ["spoilage", "mycotoxin"],
		status: "screening",
		batches: 3,
		updated: "2026-11-19T14:00:00Z",
		tags: ["Year-round", "Protein-enriched"]
	},
	{
		id: "cashew-apple",
		name: "Cashew apple pomace",
		category: "Fruit processing residue",
		region: "coastal-belt",
		sourceType: "Cashew processing & juice",
		summary: "Largely unused pseudo-fruit residue rich in sugars and tannins.",
		description: "Pomace from the cashew apple, most of which is currently left in the field after nut harvesting. Sugar-rich but astringent.",
		volume: 16500,
		availability: "Seasonal",
		season: [
			.8,
			1,
			.9,
			.4,
			.1,
			.05,
			.05,
			.05,
			.1,
			.3,
			.6,
			.8
		],
		km: 60,
		cost: 3,
		comp: [
			78,
			9.2,
			4,
			30,
			3
		],
		compProv: "estimated",
		cv: 15.6,
		aa: [
			1.8,
			3.2,
			5.8,
			4.2,
			2,
			5.8,
			3.4,
			.9,
			4.2
		],
		phys: [
			430,
			15,
			4,
			2
		],
		flags: ["tannins", "spoilage"],
		status: "pending",
		batches: 0,
		updated: "2026-11-06T09:00:00Z",
		tags: ["Underused", "Highly seasonal"]
	}
];
function build(r) {
	const [moisture, protein, lipid, fibre, ash] = r.comp;
	const carb = Math.max(0, +(100 - protein - lipid - fibre - ash).toFixed(1));
	const spread = (v, pct) => [+(v * (1 - pct / 100)).toFixed(1), +(v * (1 + pct / 100)).toFixed(1)];
	const n = r.compProv === "measured" ? Math.max(3, r.batches) : void 0;
	return {
		id: r.id,
		name: r.name,
		category: r.category,
		summary: r.summary,
		description: r.description,
		image: r.image,
		region: r.region,
		sourceType: r.sourceType,
		annualVolume: m(r.volume, "t/yr", "estimated", spread(r.volume, 20)),
		availability: r.availability,
		seasonality: r.season,
		transportKm: r.km,
		cost: m(r.cost, "USD/t", "estimated"),
		composition: {
			moisture: m(moisture, "% as received", r.compProv, spread(moisture, 6), n),
			protein: m(protein, "% DM", r.compProv, spread(protein, r.cv), n),
			lipid: m(lipid, "% DM", r.compProv, spread(lipid, r.cv + 4), n),
			fibre: m(fibre, "% DM", r.compProv, spread(fibre, 10), n),
			ash: m(ash, "% DM", r.compProv, spread(ash, 12), n),
			carbohydrate: m(carb, "% DM", "estimated")
		},
		aminoAcids: Object.fromEntries(AA_KEYS.map((k, i) => [k, r.aa[i]])),
		aminoAcidProvenance: r.compProv === "measured" ? "measured" : "literature",
		physical: {
			bulkDensity: m(r.phys[0], "kg/m³", r.compProv),
			particleSize: m(r.phys[1], "mm (D50)", "estimated"),
			ph: m(r.phys[2], "pH", r.compProv),
			shelfLife: m(r.phys[3], "days, ambient", "estimated")
		},
		variabilityCv: r.cv,
		flags: r.flags.map((f) => FLAGS[f]),
		status: r.status,
		batchCount: r.batches,
		lastUpdated: r.updated,
		tags: r.tags
	};
}
var FEEDSTOCKS = ROWS.map(build);
var FEEDSTOCK_CATEGORIES = Array.from(new Set(FEEDSTOCKS.map((f) => f.category)));
/** Feedstocks highlighted in the dashboard spotlight (Stitch design order). */
var SPOTLIGHT_IDS = [
	"coffee-pulp",
	"brewers-spent-grain",
	"soy-okara",
	"sunflower-cake",
	"avocado-residues"
];
var AMINO_ACID_LABELS = {
	his: "His",
	ile: "Ile",
	leu: "Leu",
	lys: "Lys",
	saa: "Met+Cys",
	aaa: "Phe+Tyr",
	thr: "Thr",
	trp: "Trp",
	val: "Val"
};
/**
* Indispensable amino acid reference pattern (g/100 g protein) for older
* children, adolescents and adults, as published in the FAO (2013) Expert
* Consultation on dietary protein quality evaluation. Literature reference —
* verify against the source before regulatory use.
*/
var AA_REFERENCE = {
	his: 1.6,
	ile: 3,
	leu: 6.1,
	lys: 4.8,
	saa: 2.3,
	aaa: 4.1,
	thr: 2.5,
	trp: .66,
	val: 4
};
var API_URL = "http://localhost:3001/api";
async function request(path, options) {
	const response = await fetch(`${API_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...options?.headers
		}
	});
	if (response.status === 204) return void 0;
	let body;
	try {
		body = await response.json();
	} catch {
		body = void 0;
	}
	if (!response.ok) {
		const message = body?.message ?? `API request failed: ${response.status}`;
		throw new Error(Array.isArray(message) ? message.join(", ") : String(message));
	}
	return body;
}
var backendApi = {
	suppliers: {
		list: () => request("/suppliers"),
		get: (id) => request(`/suppliers/${id}`),
		create: (data) => request("/suppliers", {
			method: "POST",
			body: JSON.stringify(data)
		}),
		update: (id, data) => request(`/suppliers/${id}`, {
			method: "PATCH",
			body: JSON.stringify(data)
		}),
		remove: (id) => request(`/suppliers/${id}`, { method: "DELETE" })
	},
	feedstocks: {
		list: (category) => request(category ? `/feedstocks?category=${encodeURIComponent(category)}` : "/feedstocks"),
		get: (id) => request(`/feedstocks/${id}`),
		create: (data) => request("/feedstocks", {
			method: "POST",
			body: JSON.stringify(data)
		}),
		update: (id, data) => request(`/feedstocks/${id}`, {
			method: "PATCH",
			body: JSON.stringify(data)
		}),
		remove: (id) => request(`/feedstocks/${id}`, { method: "DELETE" })
	},
	batches: {
		list: (filter) => {
			const params = new URLSearchParams();
			if (filter?.supplierId) params.set("supplierId", String(filter.supplierId));
			if (filter?.feedstockId) params.set("feedstockId", String(filter.feedstockId));
			const qs = params.toString();
			return request(`/batches${qs ? `?${qs}` : ""}`);
		},
		get: (id) => request(`/batches/${id}`),
		create: (data) => request("/batches", {
			method: "POST",
			body: JSON.stringify(data)
		}),
		update: (id, data) => request(`/batches/${id}`, {
			method: "PATCH",
			body: JSON.stringify(data)
		}),
		remove: (id) => request(`/batches/${id}`, { method: "DELETE" })
	},
	stats: { get: () => request("/stats") },
	reports: {
		list: () => request("/reports"),
		get: (id) => request(`/reports/${id}`),
		create: (data) => request("/reports", {
			method: "POST",
			body: JSON.stringify(data)
		}),
		update: (id, data) => request(`/reports/${id}`, {
			method: "PATCH",
			body: JSON.stringify(data)
		}),
		remove: (id) => request(`/reports/${id}`, { method: "DELETE" })
	}
};
var nf = new Intl.NumberFormat("en-US");
function fmt(v, digits = 0) {
	return new Intl.NumberFormat("en-US", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).format(v);
}
function fmtInt(v) {
	return nf.format(Math.round(v));
}
/** Compact large numbers: 42,000 → 42k, 1.2M. */
function fmtCompact(v) {
	if (Math.abs(v) >= 1e6) return `${fmt(v / 1e6, 1)}M`;
	if (Math.abs(v) >= 1e4) return `${fmt(v / 1e3, 0)}k`;
	if (Math.abs(v) >= 1e3) return `${fmt(v / 1e3, 1)}k`;
	return fmt(v, v < 10 && v % 1 ? 1 : 0);
}
function fmtDate(iso) {
	return new Date(iso).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		timeZone: "UTC"
	});
}
// node_modules/.nitro/vite/services/ssr/assets/router-ChhPpYzB.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-svh place-items-center px-6 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md space-y-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-muted-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "This page doesn’t exist. Check the address or return to the home page."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Go home"
					})
				})
			]
		})
	});
}
function RouteErrorPage({ reset }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-svh place-items-center px-6 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md space-y-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight",
					children: "This page couldn’t load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "text-muted-foreground",
					children: "Please try again, or return to the home page."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							router.invalidate();
							reset();
						},
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/",
							children: "Go home"
						})
					})]
				})
			]
		})
	});
}
/** Page-shaped loading placeholder used as the router pending component. */
function PageSkeleton({ variant = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8 pt-6",
		"aria-busy": "true",
		"aria-label": "Loading",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full max-w-xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-full max-w-md" })
				]
			}),
			variant === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-56 w-full rounded-xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
				children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 rounded-xl" }, i))
			}),
			variant === "table" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2 rounded-xl border border-hairline bg-card p-4",
				children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-full" }, i))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80 rounded-xl lg:col-span-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80 rounded-xl lg:col-span-5" })]
			})
		]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		theme: "light",
		className: "toaster group",
		icons: {
			success: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }),
			info: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4" }),
			warning: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }),
			error: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonX, { className: "size-4" }),
			loading: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" })
		},
		style: {
			"--normal-bg": "var(--popover)",
			"--normal-text": "var(--popover-foreground)",
			"--normal-border": "var(--border)",
			"--border-radius": "var(--radius)"
		},
		...props
	});
};
function TooltipProvider({ delayDuration = 0, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider$1, {
		"data-slot": "tooltip-provider",
		delayDuration,
		...props
	});
}
function Tooltip({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip$1, {
		"data-slot": "tooltip",
		...props
	});
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger$1, {
		"data-slot": "tooltip-trigger",
		...props
	});
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent$1, {
		"data-slot": "tooltip-content",
		sideOffset,
		className: cn("z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipArrow, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })]
	}) });
}
/** BIOPATH AI mark: a branching pathway from one source node into three outputs. */
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "var(--forest)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9 16h5.5c2 0 3-1 4-3l1.2-2.2c.7-1.3 1.6-1.8 3-1.8H24M14.5 16H24M14.5 16c2 0 3 1 4 3l1.2 2.2c.7 1.3 1.6 1.8 3 1.8H24",
				fill: "none",
				stroke: "var(--leaf)",
				strokeWidth: "1.8",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "8.5",
				cy: "16",
				r: "2.4",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "9",
				r: "1.8",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "16",
				r: "1.8",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24",
				cy: "23",
				r: "1.8",
				fill: "#fff"
			})
		]
	});
}
var mod = (label, icon, moduleId) => ({
	label,
	icon,
	to: "/modules/$moduleId",
	moduleId
});
var NAV_SECTIONS = [
	{
		title: "Overview",
		items: [{
			label: "Dashboard",
			icon: "dashboard",
			to: "/"
		}]
	},
	{
		title: "Intelligence",
		items: [
			{
				label: "Feedstock Explorer",
				icon: "eco",
				to: "/feedstocks"
			},
			{
				label: "Source Intelligence",
				icon: "travel_explore",
				to: "/source-intelligence"
			},
			{
				label: "Batch Fingerprinting",
				icon: "fingerprint",
				to: "/fingerprinting"
			}
		]
	},
	{
		title: "Bioconversion",
		items: [
			{
				label: "Pathway Optimizer",
				icon: "alt_route",
				to: "/pathways"
			},
			{
				label: "Resource Allocation",
				icon: "pie_chart",
				to: "/allocation"
			},
			mod("Process Simulator", "science", "process-simulator")
		]
	},
	{
		title: "Product & Market",
		items: [
			{
				label: "End-Use Intelligence",
				icon: "category",
				to: "/end-use"
			},
			{
				label: "Ingredient Formulation",
				icon: "biotech",
				to: "/formulation"
			},
			mod("Economics", "monitoring", "economics")
		]
	},
	{
		title: "Sustainability",
		items: [
			mod("Environmental Impact", "compost", "environmental-impact"),
			mod("Safety & Quality", "verified_user", "safety-and-quality"),
			mod("Traceability", "qr_code_2", "traceability")
		]
	},
	{
		title: "Research",
		items: [
			mod("Evidence Library", "menu_book", "evidence-library"),
			mod("Research Assistant", "smart_toy", "research-assistant"),
			mod("Experiments & Learning", "experiment", "experiments-and-learning")
		]
	},
	{
		title: "Operations",
		items: [mod("By-Product Exchange", "swap_horiz", "by-product-exchange"), {
			label: "Reports",
			icon: "assessment",
			to: "/reports"
		}]
	}
];
var NAV_FOOTER = [
	mod("Settings", "settings", "settings"),
	mod("Profile", "person", "profile"),
	mod("Help & Support", "help", "help-and-support")
];
var ALL_NAV_ITEMS = [...NAV_SECTIONS.flatMap((s) => s.items), ...NAV_FOOTER];
var base = "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand";
var idle = "text-on-surface-variant hover:bg-surface-high hover:text-on-surface";
var active = "bg-mint font-semibold text-on-mint";
function SidebarLink({ item, onNavigate }) {
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: item.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "truncate",
		children: item.label
	})] });
	if (item.moduleId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/modules/$moduleId",
		params: { moduleId: item.moduleId },
		onClick: onNavigate,
		className: cn(base, idle),
		activeProps: {
			className: cn(base, active),
			"aria-current": "page"
		},
		inactiveProps: { className: cn(base, idle) },
		children: content
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: item.to,
		onClick: onNavigate,
		activeOptions: { exact: item.to === "/" },
		activeProps: {
			className: cn(base, active),
			"aria-current": "page"
		},
		inactiveProps: { className: cn(base, idle) },
		children: content
	});
}
function SidebarBrand() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex h-16 shrink-0 items-center gap-3 px-6 outline-none focus-visible:ring-2 focus-visible:ring-brand",
		"aria-label": "BIOPATH AI home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "truncate text-base font-semibold tracking-tight text-on-surface",
				children: "BIOPATH AI"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "type-label truncate text-on-surface-variant",
				children: "Feedstock-to-Protein Intelligence"
			})]
		})]
	});
}
function SidebarNav({ onNavigate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Primary",
		className: "flex-1 space-y-5 overflow-y-auto px-2 py-4 scrollbar-none",
		children: [NAV_SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "type-eyebrow mb-1.5 px-3 text-outline",
			children: section.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-0.5",
			children: section.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLink, {
				item,
				onNavigate
			}, item.label))
		})] }, section.title)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-0.5 border-t border-outline-variant/40 pt-3",
			children: NAV_FOOTER.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarLink, {
				item,
				onNavigate
			}, item.label))
		})]
	});
}
function Sidebar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "fixed top-0 left-0 z-40 hidden h-full w-64 flex-col border-r border-outline-variant/40 bg-surface-lowest lg:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBrand, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, {})]
	});
}
/**
* DEMO PATHWAY LIBRARY
* Resource intensities are indicative planning estimates per tonne of feedstock
* dry matter, chosen to make trade-offs visible. They are not engineering data.
*/
var PATHWAYS = [
	{
		id: "fungal-ssf",
		name: "Fungal solid-state fermentation",
		short: "Fungal SSF",
		family: "Fermentation",
		description: "Filamentous fungi colonise moist solid substrate, converting sugars and fibre into protein-enriched mycelial biomass. Tolerant of polyphenols and fibre; low water demand.",
		product: "Protein-enriched fermented substrate",
		productProtein: [18, 35],
		trl: 6,
		durationDays: [5, 10],
		waterM3PerT: 2.5,
		energyKwhPerT: 180,
		opexUsdPerT: 95,
		capex: "Low",
		scalability: 4,
		requirements: [
			"Moisture 50–70%",
			"Pasteurisation or steam treatment",
			"Aeration & temperature control"
		],
		risks: ["Contamination in open trays", "Heat build-up at scale"]
	},
	{
		id: "submerged-myco",
		name: "Submerged mycelial fermentation",
		short: "Submerged",
		family: "Fermentation",
		description: "Fungal mycelium grown in liquid culture on hydrolysed or soluble sugars, then harvested and dewatered as mycoprotein-type biomass.",
		product: "Mycelial biomass",
		productProtein: [40, 55],
		trl: 7,
		durationDays: [2, 5],
		waterM3PerT: 14,
		energyKwhPerT: 620,
		opexUsdPerT: 260,
		capex: "High",
		scalability: 3,
		requirements: [
			"Soluble carbon source",
			"Sterile bioreactor",
			"Dewatering & RNA reduction"
		],
		risks: ["Sterility failures", "High capital intensity"]
	},
	{
		id: "enzymatic-hydrolysis",
		name: "Enzymatic hydrolysis & concentration",
		short: "Enzymatic",
		family: "Extraction",
		description: "Carbohydrases and proteases release and solubilise protein from the matrix, followed by membrane or thermal concentration.",
		product: "Protein hydrolysate / concentrate",
		productProtein: [55, 75],
		trl: 7,
		durationDays: [1, 2],
		waterM3PerT: 9,
		energyKwhPerT: 410,
		opexUsdPerT: 210,
		capex: "Medium",
		scalability: 4,
		requirements: [
			"Protein ≥ 15% DM",
			"Enzyme supply",
			"Temperature & pH control"
		],
		risks: ["Enzyme cost", "Bitterness in hydrolysates"]
	},
	{
		id: "alkaline-extraction",
		name: "Alkaline extraction & isoelectric precipitation",
		short: "Alkaline Ext.",
		family: "Extraction",
		description: "Protein is solubilised at high pH, separated from solids, then precipitated at its isoelectric point to give a concentrate or isolate.",
		product: "Protein concentrate / isolate",
		productProtein: [60, 90],
		trl: 8,
		durationDays: [1, 1],
		waterM3PerT: 18,
		energyKwhPerT: 520,
		opexUsdPerT: 240,
		capex: "Medium",
		scalability: 4,
		requirements: [
			"Protein ≥ 20% DM",
			"Low residual oil or defatting step",
			"Effluent treatment"
		],
		risks: ["High water & chemical use", "Lysinoalanine at harsh conditions"]
	},
	{
		id: "insect-bsf",
		name: "Insect bioconversion (black soldier fly)",
		short: "Insect BSF",
		family: "Bioconversion",
		description: "Larvae consume wet organic residues and convert them into larval biomass for meal and oil, leaving frass as a soil amendment.",
		product: "Larval meal + frass",
		productProtein: [38, 48],
		trl: 8,
		durationDays: [12, 18],
		waterM3PerT: .8,
		energyKwhPerT: 90,
		opexUsdPerT: 70,
		capex: "Low",
		scalability: 5,
		requirements: [
			"Moisture 60–80%",
			"Contaminant-free substrate",
			"Climate-controlled rearing"
		],
		risks: ["Substrate regulations (feed law)", "Contaminant bioaccumulation"]
	},
	{
		id: "yeast-scp",
		name: "Yeast single-cell protein",
		short: "Yeast SCP",
		family: "Fermentation",
		description: "Yeasts grown aerobically on soluble sugars from juices, molasses, whey or hydrolysates, yielding protein-rich single-cell biomass.",
		product: "Yeast biomass",
		productProtein: [45, 60],
		trl: 8,
		durationDays: [1, 3],
		waterM3PerT: 12,
		energyKwhPerT: 560,
		opexUsdPerT: 230,
		capex: "High",
		scalability: 3,
		requirements: [
			"Fermentable sugars ≥ 30% DM",
			"Nitrogen supplementation",
			"Aerated fermenter"
		],
		risks: ["Oxygen-transfer limits", "Nucleic-acid content for food"]
	},
	{
		id: "microalgae-mixo",
		name: "Mixotrophic microalgae cultivation",
		short: "Microalgae",
		family: "Cultivation",
		description: "Microalgae grown on light plus organic carbon from liquid side-streams, producing protein- and pigment-rich biomass.",
		product: "Algal biomass",
		productProtein: [45, 65],
		trl: 5,
		durationDays: [7, 14],
		waterM3PerT: 22,
		energyKwhPerT: 740,
		opexUsdPerT: 320,
		capex: "High",
		scalability: 2,
		requirements: [
			"Clarified liquid feed",
			"Light & CO₂ management",
			"Contamination control"
		],
		risks: ["Low areal productivity", "Harvesting energy"]
	}
];
var fits = (o) => Object.fromEntries(Object.entries(o).map(([k, [score, evidence, note]]) => [k, {
	score,
	evidence,
	note
}]));
var END_USES = [
	{
		id: "meat-analogue",
		name: "Meat analogues",
		sector: "Human food",
		description: "Fibrous, whole-cut or minced plant- or fungal-based meat alternatives.",
		minProtein: 40,
		valueTier: "High",
		indicativePrice: {
			value: 6.5,
			unit: "USD/kg product",
			provenance: "estimated"
		},
		requirements: [
			"Texture & fibrosity",
			"Neutral flavour",
			"Food-grade process"
		],
		regulatory: "Novel-food or food-safety approval likely required for new organisms or substrates.",
		blockingFlags: [
			"mycotoxin",
			"gossypol",
			"metals",
			"cyanogenic"
		],
		pathwayFit: fits({
			"fungal-ssf": [
				2,
				"established",
				"Traditional fermented foods show precedent; texture varies with substrate."
			],
			"submerged-myco": [
				3,
				"established",
				"Mycelial biomass provides native fibrous texture."
			],
			"enzymatic-hydrolysis": [
				1,
				"emerging",
				"Hydrolysates lose functionality needed for structure."
			],
			"alkaline-extraction": [
				3,
				"established",
				"Isolates are standard inputs for extrusion."
			],
			"insect-bsf": [
				0,
				"theoretical",
				"BSF not generally permitted for human food in most markets."
			],
			"yeast-scp": [
				1,
				"emerging",
				"Used as flavour/protein booster rather than structure."
			],
			"microalgae-mixo": [
				1,
				"emerging",
				"Colour and flavour limit inclusion."
			]
		})
	},
	{
		id: "protein-ingredient",
		name: "Protein concentrate ingredient",
		sector: "Human food",
		description: "Functional protein powders for beverages, bars and formulated foods.",
		minProtein: 60,
		valueTier: "High",
		indicativePrice: {
			value: 4.8,
			unit: "USD/kg product",
			provenance: "estimated"
		},
		requirements: [
			"Solubility & functionality",
			"Microbiological specification",
			"Consistent composition"
		],
		regulatory: "Specification and contaminant limits under national food standards.",
		blockingFlags: [
			"mycotoxin",
			"gossypol",
			"metals",
			"cyanogenic"
		],
		pathwayFit: fits({
			"fungal-ssf": [
				0,
				"theoretical",
				"Product protein too low for concentrate specification."
			],
			"submerged-myco": [
				2,
				"emerging",
				"Possible after fractionation."
			],
			"enzymatic-hydrolysis": [
				3,
				"established",
				"Hydrolysates widely used for solubility."
			],
			"alkaline-extraction": [
				3,
				"established",
				"Primary industrial route to concentrates."
			],
			"insect-bsf": [
				0,
				"theoretical",
				"Not food-approved in most markets."
			],
			"yeast-scp": [
				2,
				"established",
				"Yeast protein extracts are commercial."
			],
			"microalgae-mixo": [
				2,
				"emerging",
				"Requires decolourisation."
			]
		})
	},
	{
		id: "bakery-fortification",
		name: "Bakery & staple fortification",
		sector: "Human food",
		description: "Partial flour replacement to raise protein and fibre in breads, porridges and snacks.",
		minProtein: 18,
		valueTier: "Medium",
		indicativePrice: {
			value: 1.6,
			unit: "USD/kg product",
			provenance: "estimated"
		},
		requirements: [
			"Fine milling",
			"Low off-flavour",
			"Shelf stability"
		],
		regulatory: "Generally permitted if source material is food-grade and contaminants are within limits.",
		blockingFlags: [
			"mycotoxin",
			"gossypol",
			"metals",
			"cyanogenic"
		],
		pathwayFit: fits({
			"fungal-ssf": [
				3,
				"established",
				"Fermented flours have long culinary precedent."
			],
			"submerged-myco": [
				2,
				"emerging",
				"Dried mycelium flours under development."
			],
			"enzymatic-hydrolysis": [
				2,
				"established",
				"Used at low inclusion."
			],
			"alkaline-extraction": [
				2,
				"established",
				"Isolates effective but costly for staples."
			],
			"insect-bsf": [
				0,
				"theoretical",
				"Not food-approved in most markets."
			],
			"yeast-scp": [
				2,
				"established",
				"Nutritional yeast precedent."
			],
			"microalgae-mixo": [
				1,
				"emerging",
				"Colour limits inclusion."
			]
		})
	},
	{
		id: "dairy-alternative",
		name: "Dairy alternatives",
		sector: "Human food",
		description: "Plant- or fermentation-based beverages, yoghurts and spreads.",
		minProtein: 55,
		valueTier: "High",
		indicativePrice: {
			value: 5.2,
			unit: "USD/kg product",
			provenance: "estimated"
		},
		requirements: [
			"High solubility",
			"Emulsification",
			"Clean flavour"
		],
		regulatory: "Labelling restrictions on dairy terms may apply.",
		blockingFlags: [
			"mycotoxin",
			"gossypol",
			"metals",
			"cyanogenic"
		],
		pathwayFit: fits({
			"fungal-ssf": [
				0,
				"theoretical",
				"Insoluble product."
			],
			"submerged-myco": [
				1,
				"emerging",
				"Requires extensive processing."
			],
			"enzymatic-hydrolysis": [
				3,
				"established",
				"Improves solubility and emulsification."
			],
			"alkaline-extraction": [
				2,
				"established",
				"Isolates usable with homogenisation."
			],
			"insect-bsf": [
				0,
				"theoretical",
				"Not applicable."
			],
			"yeast-scp": [
				1,
				"emerging",
				"Flavour constraints."
			],
			"microalgae-mixo": [
				1,
				"emerging",
				"Colour constraints."
			]
		})
	},
	{
		id: "poultry-feed",
		name: "Poultry feed",
		sector: "Animal feed",
		description: "Protein meal replacing soybean or fish meal in broiler and layer rations.",
		minProtein: 25,
		valueTier: "Medium",
		indicativePrice: {
			value: .75,
			unit: "USD/kg product",
			provenance: "estimated"
		},
		requirements: [
			"Digestible lysine & methionine",
			"Low anti-nutrients",
			"Pelletability"
		],
		regulatory: "Feed-safety registration; substrate restrictions for insect meal vary by jurisdiction.",
		blockingFlags: [
			"mycotoxin",
			"gossypol",
			"metals"
		],
		pathwayFit: fits({
			"fungal-ssf": [
				3,
				"established",
				"Fermented meals improve digestibility."
			],
			"submerged-myco": [
				2,
				"emerging",
				"Cost-competitiveness unproven."
			],
			"enzymatic-hydrolysis": [
				2,
				"established",
				"Hydrolysates valued in starter diets."
			],
			"alkaline-extraction": [
				1,
				"established",
				"Usually too costly for feed."
			],
			"insect-bsf": [
				3,
				"established",
				"Larval meal widely trialled in poultry."
			],
			"yeast-scp": [
				3,
				"established",
				"Yeast protein used in feed."
			],
			"microalgae-mixo": [
				1,
				"emerging",
				"Mainly as pigment/additive."
			]
		})
	},
	{
		id: "aquafeed",
		name: "Aquafeed",
		sector: "Animal feed",
		description: "Fish-meal replacement in tilapia, catfish and shrimp diets.",
		minProtein: 35,
		valueTier: "Medium",
		indicativePrice: {
			value: 1.2,
			unit: "USD/kg product",
			provenance: "estimated"
		},
		requirements: [
			"High digestible protein",
			"Attractant palatability",
			"Water stability"
		],
		regulatory: "Feed-safety registration; contaminant limits.",
		blockingFlags: ["mycotoxin", "metals"],
		pathwayFit: fits({
			"fungal-ssf": [
				1,
				"emerging",
				"Protein density often insufficient."
			],
			"submerged-myco": [
				2,
				"emerging",
				"Promising fish-meal alternative."
			],
			"enzymatic-hydrolysis": [
				3,
				"established",
				"Hydrolysates are effective attractants."
			],
			"alkaline-extraction": [
				2,
				"established",
				"High protein but costly."
			],
			"insect-bsf": [
				3,
				"established",
				"Larval meal widely trialled in fish."
			],
			"yeast-scp": [
				3,
				"established",
				"Yeast protein used in aquaculture."
			],
			"microalgae-mixo": [
				3,
				"established",
				"Algae used in hatchery and shrimp feeds."
			]
		})
	},
	{
		id: "pig-feed",
		name: "Pig feed",
		sector: "Animal feed",
		description: "Protein supplement for grower and finisher pig diets.",
		minProtein: 20,
		valueTier: "Low",
		indicativePrice: {
			value: .6,
			unit: "USD/kg product",
			provenance: "estimated"
		},
		requirements: [
			"Digestible lysine",
			"Energy density",
			"Low fibre"
		],
		regulatory: "Feed-safety registration.",
		blockingFlags: [
			"mycotoxin",
			"gossypol",
			"metals"
		],
		pathwayFit: fits({
			"fungal-ssf": [
				3,
				"established",
				"Fermented feeds improve gut health."
			],
			"submerged-myco": [
				1,
				"emerging",
				"Cost limits feed use."
			],
			"enzymatic-hydrolysis": [
				2,
				"established",
				"Used in piglet diets."
			],
			"alkaline-extraction": [
				1,
				"established",
				"Too costly for most feed."
			],
			"insect-bsf": [
				3,
				"established",
				"Larval meal trialled in pigs."
			],
			"yeast-scp": [
				2,
				"established",
				"Yeast products common in pig diets."
			],
			"microalgae-mixo": [
				1,
				"emerging",
				"Additive role."
			]
		})
	},
	{
		id: "pet-food",
		name: "Pet food",
		sector: "Pet food",
		description: "Novel protein sources for hypoallergenic and sustainable pet food.",
		minProtein: 30,
		valueTier: "High",
		indicativePrice: {
			value: 3.4,
			unit: "USD/kg product",
			provenance: "estimated"
		},
		requirements: [
			"Palatability",
			"Digestibility",
			"Consistent supply"
		],
		regulatory: "Pet-food safety rules; ingredient approval varies.",
		blockingFlags: [
			"mycotoxin",
			"gossypol",
			"metals"
		],
		pathwayFit: fits({
			"fungal-ssf": [
				1,
				"emerging",
				"Protein density limits."
			],
			"submerged-myco": [
				2,
				"emerging",
				"Novel protein positioning."
			],
			"enzymatic-hydrolysis": [
				3,
				"established",
				"Hydrolysed proteins standard in hypoallergenic diets."
			],
			"alkaline-extraction": [
				2,
				"established",
				"Usable as concentrate."
			],
			"insect-bsf": [
				3,
				"established",
				"Commercial insect pet foods exist."
			],
			"yeast-scp": [
				3,
				"established",
				"Yeast protein commercialised for pets."
			],
			"microalgae-mixo": [
				1,
				"emerging",
				"Additive role."
			]
		})
	},
	{
		id: "biofertilizer",
		name: "Biofertiliser & soil amendment",
		sector: "Agriculture",
		description: "Frass, digestate and fermentation residues returned to soil as organic amendment.",
		minProtein: 0,
		valueTier: "Low",
		indicativePrice: {
			value: .15,
			unit: "USD/kg product",
			provenance: "estimated"
		},
		requirements: [
			"Sanitisation",
			"Nutrient declaration",
			"Heavy-metal limits"
		],
		regulatory: "Fertiliser registration and pathogen limits.",
		blockingFlags: ["metals"],
		pathwayFit: fits({
			"fungal-ssf": [
				2,
				"established",
				"Spent substrate as compost."
			],
			"submerged-myco": [
				1,
				"emerging",
				"Residual solids only."
			],
			"enzymatic-hydrolysis": [
				2,
				"established",
				"Residual fibre cake."
			],
			"alkaline-extraction": [
				1,
				"established",
				"Residue requires neutralisation."
			],
			"insect-bsf": [
				3,
				"established",
				"Frass is a primary co-product."
			],
			"yeast-scp": [
				1,
				"emerging",
				"Spent broth."
			],
			"microalgae-mixo": [
				2,
				"emerging",
				"Algal residue as biostimulant."
			]
		})
	},
	{
		id: "biomaterials",
		name: "Bio-based materials",
		sector: "Industrial",
		description: "Protein films, adhesives and mycelium composites for packaging and construction.",
		minProtein: 15,
		valueTier: "Medium",
		indicativePrice: {
			value: 2.1,
			unit: "USD/kg product",
			provenance: "estimated"
		},
		requirements: [
			"Mechanical properties",
			"Process consistency",
			"End-of-life profile"
		],
		regulatory: "Food-contact rules apply only for packaging uses.",
		blockingFlags: [],
		pathwayFit: fits({
			"fungal-ssf": [
				3,
				"emerging",
				"Mycelium composites grown on fibrous substrates."
			],
			"submerged-myco": [
				2,
				"emerging",
				"Mycelium leather-like materials."
			],
			"enzymatic-hydrolysis": [
				1,
				"theoretical",
				"Hydrolysis reduces film strength."
			],
			"alkaline-extraction": [
				2,
				"emerging",
				"Protein isolates for films and adhesives."
			],
			"insect-bsf": [
				1,
				"theoretical",
				"Chitin recovery possible."
			],
			"yeast-scp": [
				0,
				"theoretical",
				"Limited application."
			],
			"microalgae-mixo": [
				1,
				"emerging",
				"Bioplastic blends."
			]
		})
	},
	{
		id: "cosmetic-peptides",
		name: "Cosmetic & nutraceutical peptides",
		sector: "Industrial",
		description: "Bioactive peptide fractions for personal care and supplements.",
		minProtein: 70,
		valueTier: "High",
		indicativePrice: {
			value: 18,
			unit: "USD/kg product",
			provenance: "estimated"
		},
		requirements: [
			"Defined peptide profile",
			"Purification",
			"Bioactivity evidence"
		],
		regulatory: "Cosmetic ingredient safety dossier; health claims strictly regulated.",
		blockingFlags: ["metals", "mycotoxin"],
		pathwayFit: fits({
			"fungal-ssf": [
				0,
				"theoretical",
				"Product not purified."
			],
			"submerged-myco": [
				1,
				"theoretical",
				"Possible extraction target."
			],
			"enzymatic-hydrolysis": [
				3,
				"emerging",
				"Controlled hydrolysis generates peptides."
			],
			"alkaline-extraction": [
				1,
				"theoretical",
				"Requires further hydrolysis."
			],
			"insect-bsf": [
				0,
				"theoretical",
				"Not applicable."
			],
			"yeast-scp": [
				1,
				"emerging",
				"Yeast extracts used in cosmetics."
			],
			"microalgae-mixo": [
				2,
				"emerging",
				"Algal extracts used in skincare."
			]
		})
	}
];
/** DEMO WORKSPACE CONTENT — projects, activity, batches, reports. */
var PROJECTS = [
	{
		id: "prj-coffee",
		title: "Coffee pulp protein pathways",
		feedstockId: "coffee-pulp",
		stage: "In Progress",
		updated: "Updated 2h ago",
		completion: 72,
		image: "/img/project-coffee-pulp.jpg"
	},
	{
		id: "prj-bsg",
		title: "Brewer's spent grain analysis",
		feedstockId: "brewers-spent-grain",
		stage: "Pathway Review",
		updated: "Updated yesterday",
		completion: 54,
		image: "/img/project-bsg.jpg"
	},
	{
		id: "prj-avocado",
		title: "Avocado processing residues",
		feedstockId: "avocado-residues",
		stage: "Fingerprinting",
		updated: "Updated 3d ago",
		completion: 38,
		image: "/img/project-avocado.jpg"
	}
];
var ACTIVITY = [
	{
		id: "a1",
		icon: "fingerprint",
		title: "Batch fingerprint updated",
		detail: "Coffee pulp Lot #CP-204 moisture & ash profile",
		ago: "14m",
		tone: "default",
		to: "/fingerprinting"
	},
	{
		id: "a2",
		icon: "menu_book",
		title: "New literature source added",
		detail: "Solid-state fermentation kinetics on BSG (2025)",
		ago: "2h",
		tone: "default"
	},
	{
		id: "a3",
		icon: "alt_route",
		title: "Pathway comparison completed",
		detail: "Soy okara enzymatic vs. alkaline extraction",
		ago: "5h",
		tone: "default",
		to: "/pathways"
	},
	{
		id: "a4",
		icon: "verified_user",
		title: "Safety review pending",
		detail: "Mycotoxin screen required for Avocado Lot #AV-12",
		ago: "1d",
		tone: "critical",
		to: "/feedstocks/avocado-residues"
	}
];
var NOTIFICATIONS = [
	{
		id: "n1",
		title: "Mycotoxin screen overdue",
		detail: "Avocado Lot #AV-12 awaiting lab result",
		ago: "1d",
		critical: true
	},
	{
		id: "n2",
		title: "Batch outside control limits",
		detail: "Coffee pulp Lot #CP-198 protein below −2σ",
		ago: "2d",
		critical: false
	},
	{
		id: "n3",
		title: "Report ready for review",
		detail: "Q4 allocation scenario — Central Highlands",
		ago: "3d",
		critical: false
	}
];
function mulberry32(seed) {
	return () => {
		seed |= 0;
		seed = seed + 1831565813 | 0;
		let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var LABS = [
	"Partner lab A",
	"Partner lab B",
	"On-site QC"
];
function lotPrefix(id) {
	return id.split("-").map((w) => w[0]).join("").toUpperCase().slice(0, 3);
}
function generateBatches() {
	const out = [];
	FEEDSTOCKS.forEach((f, fi) => {
		const rand = mulberry32(1e3 + fi * 97);
		const gauss = () => {
			const u = Math.max(rand(), 1e-9);
			const v = rand();
			return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
		};
		const base = (/* @__PURE__ */ new Date("2026-11-24T00:00:00Z")).getTime();
		const prefix = lotPrefix(f.id);
		const start = f.id === "coffee-pulp" ? 204 - f.batchCount + 1 : 100;
		for (let i = 0; i < f.batchCount; i++) {
			const sd = f.composition.protein.value * f.variabilityCv / 100;
			let protein = f.composition.protein.value + gauss() * sd;
			if (f.id === "coffee-pulp" && i === f.batchCount - 7) protein = f.composition.protein.value - 2.4 * sd;
			const moisture = f.composition.moisture.value + gauss() * 2.2;
			const lipid = Math.max(.1, f.composition.lipid.value + gauss() * f.composition.lipid.value * .12);
			const ash = Math.max(.1, f.composition.ash.value + gauss() * f.composition.ash.value * .1);
			const z = Math.abs(protein - f.composition.protein.value) / sd;
			const qc = z > 2.2 ? "fail" : z > 1.8 ? "review" : "pass";
			const daysAgo = (f.batchCount - 1 - i) * 6 + Math.floor(rand() * 3);
			out.push({
				lot: `${prefix}-${start + i}`,
				feedstockId: f.id,
				sampledOn: (/* @__PURE__ */ new Date(base - daysAgo * 864e5)).toISOString().slice(0, 10),
				moisture: +moisture.toFixed(1),
				protein: +protein.toFixed(2),
				lipid: +lipid.toFixed(2),
				ash: +ash.toFixed(2),
				qc,
				lab: LABS[Math.floor(rand() * LABS.length)],
				provenance: "measured"
			});
		}
	});
	return out.sort((a, b) => b.sampledOn.localeCompare(a.sampledOn));
}
var BATCHES = generateBatches();
var REPORTS = [
	{
		id: "RPT-0142",
		title: "Coffee pulp — pathway shortlist",
		type: "Pathway comparison",
		status: "In review",
		createdOn: "2026-11-22",
		author: "Research team",
		feedstockIds: ["coffee-pulp"],
		sections: [
			"Executive summary",
			"Fingerprint",
			"Pathway ranking",
			"Assumptions"
		],
		summary: "Fungal SSF and insect bioconversion lead on water and cost; caffeine management is the main open question.",
		pages: 14
	},
	{
		id: "RPT-0141",
		title: "Q4 allocation scenario — Central Highlands",
		type: "Allocation scenario",
		status: "Draft",
		createdOn: "2026-11-21",
		author: "Supply analytics",
		feedstockIds: [
			"coffee-pulp",
			"brewers-spent-grain",
			"avocado-residues",
			"pineapple-residue"
		],
		sections: [
			"Scenario inputs",
			"Allocation",
			"Resource use",
			"Sensitivities"
		],
		summary: "Allocates four regional streams under a 120,000 m³ water cap; protein output constrained by coffee pulp seasonality.",
		pages: 9
	},
	{
		id: "RPT-0139",
		title: "Brewer's spent grain — fingerprint dossier",
		type: "Feedstock profile",
		status: "Published",
		createdOn: "2026-11-18",
		author: "Lab operations",
		feedstockIds: ["brewers-spent-grain"],
		sections: [
			"Source",
			"Composition",
			"Variability",
			"Risk flags"
		],
		summary: "Composition is stable across 28 batches (protein CV ≈ 6%); short wet shelf life drives same-day processing.",
		pages: 11
	},
	{
		id: "RPT-0136",
		title: "Oilseed cakes — end-use screening",
		type: "End-use assessment",
		status: "Published",
		createdOn: "2026-11-12",
		author: "Product strategy",
		feedstockIds: [
			"sunflower-cake",
			"cottonseed-cake",
			"groundnut-cake"
		],
		sections: [
			"End-use matrix",
			"Regulatory notes",
			"Blocking risks"
		],
		summary: "Sunflower cake clears for food concentrates; gossypol and aflatoxin keep cottonseed and groundnut in feed-only screening.",
		pages: 8
	},
	{
		id: "RPT-0131",
		title: "November batch QC summary",
		type: "Batch QC summary",
		status: "Published",
		createdOn: "2026-11-05",
		author: "Lab operations",
		feedstockIds: [
			"coffee-pulp",
			"soy-okara",
			"fish-processing"
		],
		sections: [
			"QC pass rates",
			"Out-of-control lots",
			"Corrective actions"
		],
		summary: "One coffee pulp lot fell below the lower control limit for protein; root cause traced to over-ripe cherry intake.",
		pages: 6
	},
	{
		id: "RPT-0127",
		title: "Lake Basin aquatic biomass — scoping",
		type: "Feedstock profile",
		status: "Draft",
		createdOn: "2026-10-29",
		author: "Research team",
		feedstockIds: ["water-hyacinth", "lemna"],
		sections: [
			"Source",
			"Composition",
			"Heavy-metal screening plan"
		],
		summary: "Scoping note on harvestable volumes and the screening protocol needed before any feed trial.",
		pages: 5
	}
];
var REPORT_TEMPLATES = [
	{
		type: "Feedstock profile",
		description: "Source, composition, variability and risk flags for one or more feedstocks.",
		sections: [
			"Source",
			"Composition",
			"Variability",
			"Risk flags",
			"Evidence register"
		]
	},
	{
		type: "Pathway comparison",
		description: "Weighted multi-criteria ranking of conversion pathways for a feedstock.",
		sections: [
			"Executive summary",
			"Pathway ranking",
			"Resource intensity",
			"Assumptions"
		]
	},
	{
		type: "Allocation scenario",
		description: "Feedstock-to-pathway allocation under water, energy and volume constraints.",
		sections: [
			"Scenario inputs",
			"Allocation",
			"Resource use",
			"Sensitivities"
		]
	},
	{
		type: "End-use assessment",
		description: "Suitability of pathway products across food, feed and industrial applications.",
		sections: [
			"End-use matrix",
			"Regulatory notes",
			"Blocking risks"
		]
	},
	{
		type: "Batch QC summary",
		description: "Batch pass rates, out-of-control lots and corrective actions.",
		sections: [
			"QC pass rates",
			"Out-of-control lots",
			"Corrective actions"
		]
	}
];
function evidenceFor(feedstockId) {
	const f = FEEDSTOCKS.find((x) => x.id === feedstockId);
	if (!f) return [];
	const recs = [];
	if (f.batchCount > 0) recs.push({
		id: `EV-${lotPrefix(f.id)}-01`,
		title: `Proximate analysis across ${f.batchCount} batches`,
		kind: "measured",
		scope: "Moisture, protein, lipid, fibre, ash",
		date: f.lastUpdated.slice(0, 10)
	});
	recs.push({
		id: `EV-${lotPrefix(f.id)}-02`,
		title: `Literature composition range — ${f.category.toLowerCase()}`,
		kind: "literature",
		scope: "Reference ranges for comparison (citation to be attached)",
		date: "2026-09-30"
	});
	recs.push({
		id: `EV-${lotPrefix(f.id)}-03`,
		title: "Annual volume estimate from processor survey",
		kind: "estimated",
		scope: "Volume, seasonality, logistics",
		date: "2026-08-14"
	});
	recs.push({
		id: `EV-${lotPrefix(f.id)}-04`,
		title: "Pathway yield model output (BIOPATH heuristic v0.3)",
		kind: "estimated",
		scope: "Protein yield, water, energy, cost",
		date: "2026-11-01"
	});
	recs.push({
		id: `EV-${lotPrefix(f.id)}-05`,
		title: "Prototype placeholder values",
		kind: "demo",
		scope: "All figures in this prototype dataset",
		date: "2026-11-24"
	});
	return recs;
}
/**
* Data access layer.
*
* Every screen reads data through these async functions — never from the
* fixture modules directly — so a real backend (Netlify Database + server
* routes) can replace them without touching the UI. Client-side calls add a
* short simulated latency so loading states are exercised.
*/
/** Shown wherever data is displayed. Flip when real data sources are connected. */
var DATASET_STATUS = {
	simulated: true,
	label: "Prototype / Demo Data",
	description: "All figures in this prototype are simulated for demonstration. Provenance tags show the class of evidence each field is designed to hold — they do not indicate verified results."
};
var latency = (ms = 260) => typeof window === "undefined" ? Promise.resolve() : new Promise((r) => setTimeout(r, ms));
async function listFeedstocks() {
	await latency();
	return FEEDSTOCKS;
}
async function getFeedstock(id) {
	await latency();
	const feedstock = FEEDSTOCKS.find((f) => f.id === id);
	if (!feedstock) return null;
	return {
		feedstock,
		batches: BATCHES.filter((b) => b.feedstockId === id),
		evidence: evidenceFor(id)
	};
}
async function listEndUses() {
	await latency(180);
	return END_USES;
}
async function listBatches() {
	await latency();
	return BATCHES;
}
async function getDashboard() {
	await latency(120);
	const qcPass = BATCHES.filter((b) => b.qc === "pass").length / Math.max(1, BATCHES.length);
	return {
		kpis: {
			feedstocks: FEEDSTOCKS.length,
			newThisMonth: 3,
			batches: BATCHES.length,
			qcPassRate: qcPass,
			pathwaysEvaluated: FEEDSTOCKS.filter((f) => f.status !== "pending").length * PATHWAYS.length,
			sourcesIndexed: 1240,
			sourcesNew: 42
		},
		projects: PROJECTS,
		activity: ACTIVITY
	};
}
backendApi.suppliers.create;
backendApi.feedstocks.create;
var PROVENANCE_META = {
	measured: {
		label: "Measured",
		short: "LAB",
		className: "bg-sage text-forest border-mint-dim",
		description: "Laboratory or field measurement on actual samples."
	},
	literature: {
		label: "Literature",
		short: "LIT",
		className: "bg-surface-lowest text-on-surface-variant border-outline-variant",
		description: "Taken from published sources; citation attached in the evidence register."
	},
	estimated: {
		label: "Estimated",
		short: "EST",
		className: "bg-amber-soft text-amber-ink border-amber/40",
		description: "Modelled, calculated by difference or estimated from surveys."
	},
	demo: {
		label: "Demo",
		short: "DEMO",
		className: "bg-surface-high text-on-surface-variant border-dashed border-outline",
		description: "Placeholder value for demonstration only."
	}
};
/** Compact provenance tag. Tooltip explains the class and the demo status. */
function ProvenanceTag({ kind, className, full = false }) {
	const meta = PROVENANCE_META[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			tabIndex: 0,
			className: cn("inline-flex h-[18px] shrink-0 cursor-help items-center rounded border px-1.5 font-data text-[10px] leading-none font-medium tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-sage", meta.className, className),
			"aria-label": `${meta.label} data class${DATASET_STATUS.simulated ? ", simulated value" : ""}`,
			children: [full ? meta.label : meta.short, DATASET_STATUS.simulated && kind !== "demo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-0.5 opacity-60",
				children: "*"
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, {
		className: "max-w-64",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: meta.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "opacity-80",
				children: meta.description
			}),
			DATASET_STATUS.simulated && kind !== "demo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 opacity-80",
				children: "* Simulated in this prototype — not a verified value."
			})
		]
	})] });
}
/** A value with unit, optional range and provenance tag. */
function MeasureValue({ m, digits = 1, showRange = false, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-1", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "type-data text-on-surface",
				children: fmt(m.value, digits)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted-foreground",
				children: m.unit
			}),
			showRange && m.range && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "type-data text-[11px] text-muted-foreground",
				children: [
					"(",
					fmt(m.range[0], digits),
					"–",
					fmt(m.range[1], digits),
					")"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvenanceTag, {
				kind: m.provenance,
				className: "self-center"
			})
		]
	});
}
function ProvenanceLegend({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "type-eyebrow text-outline",
				children: "Data provenance"
			}),
			Object.keys(PROVENANCE_META).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvenanceTag, { kind: k }), PROVENANCE_META[k].label]
			}, k)),
			DATASET_STATUS.simulated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "* simulated in this prototype" })
		]
	});
}
function DemoChip({ className, label = DATASET_STATUS.label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			tabIndex: 0,
			className: cn("inline-flex cursor-help items-center rounded-full bg-mint px-2.5 py-1 text-xs font-medium text-on-mint outline-none focus-visible:ring-2 focus-visible:ring-brand", className),
			children: label
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
		className: "max-w-72",
		children: DATASET_STATUS.description
	})] });
}
function Popover({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popover$1, {
		"data-slot": "popover",
		...props
	});
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger$1, {
		"data-slot": "popover-trigger",
		...props
	});
}
function PopoverContent({ className, align = "center", sideOffset = 4, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent$1, {
		"data-slot": "popover-content",
		align,
		sideOffset,
		className: cn("z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
function DropdownMenu({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenu$1, {
		"data-slot": "dropdown-menu",
		...props
	});
}
function DropdownMenuTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger$1, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuContent({ className, sideOffset = 4, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent$1, {
		"data-slot": "dropdown-menu-content",
		sideOffset,
		className: cn("z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem$1, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!", className),
		...props
	});
}
function DropdownMenuLabel({ className, inset, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel$1, {
		"data-slot": "dropdown-menu-label",
		"data-inset": inset,
		className: cn("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator$1, {
		"data-slot": "dropdown-menu-separator",
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function Sheet({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		"data-slot": "sheet",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "sheet-portal",
		...props
	});
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		"data-slot": "sheet-overlay",
		className: cn("fixed inset-0 z-50 bg-on-surface/30 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		"data-slot": "sheet-content",
		className: cn("fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500", side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm", side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm", side === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top", side === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		"data-slot": "sheet-title",
		className: cn("font-semibold text-foreground", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		"data-slot": "sheet-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function Dialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		"data-slot": "dialog",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		"data-slot": "dialog-overlay",
		className: cn("fixed inset-0 z-50 bg-on-surface/30 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, {
		"data-slot": "dialog-portal",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
			"data-slot": "dialog-content",
			className: cn("fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border border-hairline bg-card p-6 shadow-float duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg", className),
			...props,
			children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				"data-slot": "dialog-close",
				className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		})]
	});
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "dialog-header",
		className: cn("flex flex-col gap-2 text-center sm:text-left", className),
		...props
	});
}
function DialogFooter({ className, showCloseButton = false, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-slot": "dialog-footer",
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				children: "Close"
			})
		})]
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		"data-slot": "dialog-title",
		className: cn("text-lg leading-none font-semibold", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		"data-slot": "dialog-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
/** Command-palette style search across feedstocks, pathways, end-uses and modules. ⌘K / Ctrl+K. */
function GlobalSearch({ open, onOpenChange }) {
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [rawIndex, setRawIndex] = (0, import_react.useState)(0);
	const listRef = (0, import_react.useRef)(null);
	const handleQueryChange = (v) => {
		setQ(v);
		setRawIndex(0);
	};
	const handleOpenChange = (v) => {
		if (!v) {
			setQ("");
			setRawIndex(0);
		}
		onOpenChange(v);
	};
	const results = (0, import_react.useMemo)(() => {
		const term = q.trim().toLowerCase();
		const match = (...s) => !term || s.some((x) => x.toLowerCase().includes(term));
		const close = () => onOpenChange(false);
		const out = [];
		FEEDSTOCKS.filter((f) => match(f.name, f.category, f.sourceType, ...f.tags)).slice(0, term ? 8 : 4).forEach((f) => out.push({
			id: `f-${f.id}`,
			group: "Feedstocks",
			label: f.name,
			meta: f.category,
			icon: "eco",
			go: () => {
				close();
				navigate({
					to: "/feedstocks/$feedstockId",
					params: { feedstockId: f.id }
				});
			}
		}));
		PATHWAYS.filter((p) => match(p.name, p.short, p.family, p.product)).slice(0, term ? 5 : 3).forEach((p) => out.push({
			id: `p-${p.id}`,
			group: "Pathways",
			label: p.name,
			meta: `${p.family} · TRL ${p.trl}`,
			icon: "alt_route",
			go: () => {
				close();
				navigate({
					to: "/pathways",
					search: { focus: p.id }
				});
			}
		}));
		END_USES.filter((e) => match(e.name, e.sector)).slice(0, term ? 5 : 2).forEach((e) => out.push({
			id: `e-${e.id}`,
			group: "End uses",
			label: e.name,
			meta: e.sector,
			icon: "category",
			go: () => {
				close();
				navigate({
					to: "/end-use",
					search: { endUse: e.id }
				});
			}
		}));
		ALL_NAV_ITEMS.filter((n) => match(n.label)).slice(0, term ? 6 : 0).forEach((n) => out.push({
			id: `n-${n.label}`,
			group: "Modules",
			label: n.label,
			meta: n.moduleId ? "Module brief" : "Screen",
			icon: n.icon,
			go: () => {
				close();
				if (n.moduleId) navigate({
					to: "/modules/$moduleId",
					params: { moduleId: n.moduleId }
				});
				else navigate({ to: n.to });
			}
		}));
		return out;
	}, [
		q,
		navigate,
		onOpenChange
	]);
	const index = Math.min(rawIndex, Math.max(0, results.length - 1));
	(0, import_react.useEffect)(() => {
		listRef.current?.querySelector(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" });
	}, [index]);
	const groups = [...new Set(results.map((r) => r.group))];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "top-[12%] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl",
			showCloseButton: false,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "sr-only",
					children: "Search BIOPATH AI"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "sr-only",
					children: "Search feedstocks, pathways, end uses and modules. Use arrow keys to move and Enter to open."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 border-b border-hairline px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "search",
							className: "text-on-surface-variant"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							value: q,
							onChange: (e) => handleQueryChange(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "ArrowDown") {
									e.preventDefault();
									setRawIndex((i) => Math.min(results.length - 1, i + 1));
								}
								if (e.key === "ArrowUp") {
									e.preventDefault();
									setRawIndex((i) => Math.max(0, i - 1));
								}
								if (e.key === "Enter") results[index]?.go();
							},
							placeholder: "Search feedstocks, pathways, end uses…",
							className: "h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground",
							"aria-label": "Search",
							role: "combobox",
							"aria-expanded": "true",
							"aria-controls": "global-search-results",
							"aria-activedescendant": results[index] ? `gs-${results[index].id}` : void 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "type-data rounded border border-hairline px-1.5 py-0.5 text-[11px] text-muted-foreground",
							children: "Esc"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					id: "global-search-results",
					ref: listRef,
					role: "listbox",
					className: "max-h-[60vh] overflow-y-auto p-2",
					children: [results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "px-3 py-10 text-center text-sm text-on-surface-variant",
						children: [
							"No matches for \"",
							q,
							"\". Try a feedstock name such as \"okara\", or a pathway such as \"fermentation\"."
						]
					}), groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						role: "presentation",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "type-eyebrow px-3 pt-3 pb-1 text-outline",
							children: g
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							role: "presentation",
							children: results.filter((r) => r.group === g).map((r) => {
								const i = results.indexOf(r);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									id: `gs-${r.id}`,
									role: "option",
									"aria-selected": i === index,
									"data-index": i,
									onMouseEnter: () => setRawIndex(i),
									onClick: r.go,
									className: cn("flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5", i === index ? "bg-sage" : "hover:bg-surface-low"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: r.icon,
											className: "text-brand-strong"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1 truncate text-sm font-medium text-on-surface",
											children: r.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-xs text-on-surface-variant",
											children: r.meta
										})
									]
								}, r.id);
							})
						})]
					}, g))]
				})
			]
		})
	});
}
var iconBtn = "relative grid size-10 place-items-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-high hover:text-on-surface outline-none focus-visible:ring-2 focus-visible:ring-brand";
function TopBar() {
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [unread, setUnread] = (0, import_react.useState)(NOTIFICATIONS.length);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setSearchOpen((v) => !v);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between bg-surface/80 px-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl sm:px-8 lg:left-64",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Open navigation",
						className: cn(iconBtn, "lg:hidden"),
						onClick: () => setMenuOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							name: "menu",
							size: 24
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2.5 lg:hidden",
						"aria-label": "BIOPATH AI home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base font-semibold text-on-surface",
							children: "BIOPATH AI"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSearchOpen(true),
						className: "hidden h-10 w-72 items-center gap-2.5 rounded-lg border border-hairline bg-card px-3 text-sm text-muted-foreground shadow-card transition-colors hover:border-outline-variant lg:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "search" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 text-left",
								children: "Search feedstocks, pathways…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "type-data rounded border border-hairline px-1.5 text-[11px]",
								children: "⌘K"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex items-center gap-1 sm:gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoChip, { className: "hidden md:inline-flex" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Search",
						className: cn(iconBtn, "lg:hidden"),
						onClick: () => setSearchOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "search" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
						onOpenChange: (o) => o && setUnread(0),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-label": unread ? `Notifications, ${unread} unread` : "Notifications",
								className: iconBtn,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { name: "notifications" }), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 right-2 size-2 rounded-full bg-risk ring-2 ring-surface" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
							align: "end",
							className: "w-80 rounded-xl border-hairline p-0 shadow-float",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-hairline px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-on-surface",
									children: "Notifications"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Demo alerts"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "divide-y divide-hairline",
								children: NOTIFICATIONS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3 px-4 py-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
											name: n.critical ? "warning" : "info",
											className: n.critical ? "text-risk" : "text-brand-strong"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium text-on-surface",
												children: n.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-on-surface-variant",
												children: n.detail
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "type-data text-[11px] text-muted-foreground",
											children: n.ago
										})
									]
								}, n.id))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Account menu",
							className: "rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/.netlify/images?url=/img/avatar.jpg&w=64&h=64&fit=cover&fm=webp",
								alt: "",
								width: 32,
								height: 32,
								className: "size-8 rounded-full object-cover"
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
						align: "end",
						className: "w-56",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: "Researcher"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-normal text-muted-foreground",
								children: "Demo workspace"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/modules/$moduleId",
									params: { moduleId: "profile" },
									children: "Profile"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/modules/$moduleId",
									params: { moduleId: "settings" },
									children: "Settings"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onSelect: () => toast("Sign-in arrives with user accounts", { description: "This prototype runs in a shared demo workspace." }),
								children: "Sign out"
							})
						]
					})] })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: menuOpen,
			onOpenChange: setMenuOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				side: "left",
				className: "w-72 gap-0 bg-surface-lowest p-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "sr-only",
						children: "Navigation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, {
						className: "sr-only",
						children: "BIOPATH AI modules"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarBrand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, { onNavigate: () => setMenuOpen(false) })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalSearch, {
			open: searchOpen,
			onOpenChange: setSearchOpen
		})
	] });
}
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only z-50 rounded-lg bg-card px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-64",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					id: "main",
					className: "mx-auto min-h-screen w-full max-w-content px-4 pt-16 pb-10 sm:px-8",
					children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "mt-14 flex flex-col gap-3 border-t border-hairline pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProvenanceLegend, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "BIOPATH AI prototype · scoring model v0.3 (heuristic)" })]
					})]
				})]
			})
		]
	});
}
var siteName = "BIOPATH AI — Feedstock-to-Protein Intelligence";
var siteDescription = "Identify, characterize, evaluate and allocate local biological feedstocks for alternative protein production.";
var Route$11 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: siteName },
			{
				name: "description",
				content: siteDescription
			},
			{
				property: "og:title",
				content: siteName
			},
			{
				property: "og:description",
				content: siteDescription
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#fafaf5"
			}
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&family=Manrope:wght@600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..24,400,0..1,0&display=block"
			}
		]
	}),
	shellComponent: RootDocument,
	component: RootLayout,
	notFoundComponent: NotFoundPage
});
function RootLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
				delayDuration: 200,
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$10 = () => import("./routes-d_ox_byE.mjs");
var Route$10 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./allocation-DAn9areC.mjs");
var Route$9 = createFileRoute("/allocation")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./end-use-BqH_D8Ak.mjs");
var Route$8 = createFileRoute("/end-use")({
	validateSearch: object({ endUse: string().optional() }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./feedstocks-SEuxiuff.mjs");
var Route$7 = createFileRoute("/feedstocks")({
	validateSearch: object({ q: string().optional() }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./fingerprinting-wqU_TCUr.mjs");
var Route$6 = createFileRoute("/fingerprinting")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./formulation-C-LEPmET.mjs");
var Route$5 = createFileRoute("/formulation")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./pathways-BJ_8BCxn.mjs");
var Route$4 = createFileRoute("/pathways")({
	validateSearch: object({ focus: string().optional() }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./reports-BccHBhit.mjs");
var Route$3 = createFileRoute("/reports")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./source-intelligence-CZ-WjiKn.mjs");
var Route$2 = createFileRoute("/source-intelligence")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./feedstocks._feedstockId-Bg93QvEO.mjs");
var Route$1 = createFileRoute("/feedstocks/$feedstockId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitNotFoundComponentImporter = () => import("./modules._moduleId-CqI_crhE.mjs");
var $$splitComponentImporter = () => import("./modules._moduleId-CaOYNdgw.mjs");
var Route = createFileRoute("/modules/$moduleId")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var IndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$11
});
var AllocationRoute = Route$9.update({
	id: "/allocation",
	path: "/allocation",
	getParentRoute: () => Route$11
});
var EndUseRoute = Route$8.update({
	id: "/end-use",
	path: "/end-use",
	getParentRoute: () => Route$11
});
var FeedstocksRoute = Route$7.update({
	id: "/feedstocks",
	path: "/feedstocks",
	getParentRoute: () => Route$11
});
var FingerprintingRoute = Route$6.update({
	id: "/fingerprinting",
	path: "/fingerprinting",
	getParentRoute: () => Route$11
});
var FormulationRoute = Route$5.update({
	id: "/formulation",
	path: "/formulation",
	getParentRoute: () => Route$11
});
var PathwaysRoute = Route$4.update({
	id: "/pathways",
	path: "/pathways",
	getParentRoute: () => Route$11
});
var ReportsRoute = Route$3.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => Route$11
});
var SourceIntelligenceRoute = Route$2.update({
	id: "/source-intelligence",
	path: "/source-intelligence",
	getParentRoute: () => Route$11
});
var FeedstocksFeedstockIdRoute = Route$1.update({
	id: "/$feedstockId",
	path: "/$feedstockId",
	getParentRoute: () => FeedstocksRoute
});
var ModulesModuleIdRoute = Route.update({
	id: "/modules/$moduleId",
	path: "/modules/$moduleId",
	getParentRoute: () => Route$11
});
var FeedstocksRouteChildren = { FeedstocksFeedstockIdRoute };
var rootRouteChildren = {
	IndexRoute,
	AllocationRoute,
	EndUseRoute,
	FeedstocksRoute: FeedstocksRoute._addFileChildren(FeedstocksRouteChildren),
	FingerprintingRoute,
	FormulationRoute,
	PathwaysRoute,
	ReportsRoute,
	SourceIntelligenceRoute,
	ModulesModuleIdRoute
};
var routeTree = Route$11._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	return createRouter({
		routeTree,
		defaultErrorComponent: RouteErrorPage,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultPreload: "intent",
		defaultPendingComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageSkeleton, {}),
		defaultPendingMs: 150,
		defaultPendingMinMs: 300
	});
};
export { AA_REFERENCE, AMINO_ACID_LABELS, Button, DemoChip, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, END_USES, FEEDSTOCKS, FEEDSTOCK_CATEGORIES, Icon, MeasureValue, PATHWAYS, ProvenanceTag, REPORTS, REPORT_TEMPLATES, Route, Route$1, Route$4, Route$7, SPOTLIGHT_IDS, Skeleton, backendApi, cn, fmt, fmtCompact, fmtDate, fmtInt, getDashboard, getFeedstock, listBatches, listEndUses, listFeedstocks, router_exports };
