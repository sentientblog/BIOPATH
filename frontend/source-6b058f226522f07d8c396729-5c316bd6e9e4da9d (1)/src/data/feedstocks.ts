import type {
  AminoAcidKey,
  Feedstock,
  FeedstockCategory,
  Measure,
  ProfileStatus,
  Provenance,
  RegionId,
  RiskFlag,
} from './types'

/**
 * DEMO FEEDSTOCK DATABASE
 * -----------------------
 * Values are simulated and indicative only. They are shaped like typical
 * ranges for each material class so the interface behaves realistically, but
 * they are NOT verified measurements and must not be cited.
 */

const m = (
  value: number,
  unit: string,
  provenance: Provenance,
  range?: [number, number],
  n?: number,
): Measure => ({ value, unit, provenance, range, n })

const FLAGS: Record<string, RiskFlag> = {
  caffeine: { id: 'caffeine', label: 'Caffeine & polyphenols', severity: 'warning', detail: 'Anti-nutritional for monogastric feed; may inhibit some microbes until degraded or extracted.' },
  tannins: { id: 'tannins', label: 'Condensed tannins', severity: 'warning', detail: 'Reduces protein digestibility; detanninisation or fermentation pretreatment advised.' },
  spoilage: { id: 'spoilage', label: 'Rapid spoilage', severity: 'warning', detail: 'High moisture — requires processing or stabilisation within 24–48 h of generation.' },
  mycotoxin: { id: 'mycotoxin', label: 'Mycotoxin screen required', severity: 'critical', detail: 'Aflatoxin/fumonisin screening must clear before any food or feed use.' },
  gossypol: { id: 'gossypol', label: 'Free gossypol', severity: 'critical', detail: 'Toxic to monogastrics; restricts human food use unless removed.' },
  phytate: { id: 'phytate', label: 'Phytate', severity: 'info', detail: 'Binds minerals; phytase treatment or fermentation can reduce levels.' },
  oxidation: { id: 'oxidation', label: 'Lipid oxidation', severity: 'warning', detail: 'High residual oil — stabilise to avoid rancidity during storage.' },
  metals: { id: 'metals', label: 'Heavy-metal screen', severity: 'critical', detail: 'Aquatic biomass can accumulate metals; screen every lot before use.' },
  allergen: { id: 'allergen', label: 'Allergen declaration', severity: 'info', detail: 'Derived from a major allergen source; labelling obligations apply.' },
  lignin: { id: 'lignin', label: 'High lignin', severity: 'info', detail: 'Recalcitrant fibre — pretreatment needed for enzymatic or microbial access.' },
  salt: { id: 'salt', label: 'High mineral/salt', severity: 'info', detail: 'Elevated ash may limit inclusion rates in feed formulations.' },
  microbial: { id: 'microbial', label: 'Microbial load', severity: 'warning', detail: 'Pathogen control (pasteurisation/sterilisation) required before processing.' },
  cyanogenic: { id: 'cyanogenic', label: 'Cyanogenic glycosides', severity: 'critical', detail: 'Must be detoxified (drying, ensiling, fermentation) before food or feed use.' },
}

interface Row {
  id: string
  name: string
  category: FeedstockCategory
  region: RegionId
  sourceType: string
  image?: string
  summary: string
  description: string
  volume: number
  availability: Feedstock['availability']
  season: number[]
  km: number
  cost: number
  /** moisture, protein, lipid, fibre, ash */
  comp: [number, number, number, number, number]
  compProv: Provenance
  cv: number
  aa: [number, number, number, number, number, number, number, number, number]
  phys: [number, number, number, number]
  flags: string[]
  status: ProfileStatus
  batches: number
  updated: string
  tags: string[]
}

const AA_KEYS: AminoAcidKey[] = ['his', 'ile', 'leu', 'lys', 'saa', 'aaa', 'thr', 'trp', 'val']

const ROWS: Row[] = [
  {
    id: 'coffee-pulp', name: 'Coffee pulp', category: 'Agro-industrial residue', region: 'central-highlands', sourceType: 'Coffee wet mills',
    image: '/img/fs-coffee-pulp.jpg',
    summary: 'Polyphenol-rich wet-mill residue suited for fungal fermentation.',
    description: 'The fleshy exocarp and mesocarp removed during wet processing of coffee cherries. Generated in large, highly seasonal volumes at mill sites, it is wet, acidic and rich in fermentable sugars, but carries caffeine and polyphenols that must be managed for feed and food routes.',
    volume: 42000, availability: 'Seasonal', season: [0.2, 0.1, 0.05, 0.05, 0.1, 0.2, 0.3, 0.4, 0.7, 1, 0.95, 0.6], km: 35, cost: 12,
    comp: [82, 11.2, 2.4, 30.5, 8.6], compProv: 'measured', cv: 14.2,
    aa: [2.4, 3.6, 6.4, 5.4, 2.1, 6.2, 4.0, 1.0, 5.0], phys: [420, 9, 4.4, 2],
    flags: ['caffeine', 'tannins', 'spoilage'], status: 'profiled', batches: 32, updated: '2026-11-24T10:46:00Z', tags: ['High volume', 'Wet stream', 'SSF candidate'],
  },
  {
    id: 'brewers-spent-grain', name: "Brewer's spent grain", category: 'Brewery & distillery co-product', region: 'central-highlands', sourceType: 'Regional breweries',
    image: '/img/fs-bsg.jpg',
    summary: 'High-protein lignocellulosic co-product from regional breweries.',
    description: 'Residual barley husk, pericarp and protein left after mashing. Produced continuously by breweries close to urban centres, with consistent quality but a short shelf life when wet.',
    volume: 31000, availability: 'Year-round', season: [0.85, 0.8, 0.85, 0.9, 0.9, 0.85, 0.9, 0.95, 0.9, 0.95, 1, 1], km: 18, cost: 28,
    comp: [77, 23.4, 8.8, 48.2, 4.1], compProv: 'measured', cv: 6.1,
    aa: [2.2, 3.9, 7.8, 3.8, 3.9, 8.6, 3.6, 1.1, 5.2], phys: [380, 3, 5.6, 3],
    flags: ['spoilage', 'lignin'], status: 'profiled', batches: 28, updated: '2026-11-23T15:10:00Z', tags: ['Year-round', 'Urban', 'Extraction candidate'],
  },
  {
    id: 'soy-okara', name: 'Soy okara', category: 'Agro-industrial residue', region: 'western-plateau', sourceType: 'Soy milk & tofu processors',
    image: '/img/fs-okara.jpg',
    summary: 'Moisture-dense soy milk residue with rapid enzymatic digestibility.',
    description: 'The insoluble pulp remaining after soybean slurry is filtered for soy milk or tofu. Nutritionally dense with a favourable amino acid profile, but very wet and perishable.',
    volume: 6800, availability: 'Year-round', season: [0.9, 0.9, 0.95, 0.9, 0.85, 0.85, 0.9, 0.9, 0.95, 1, 1, 0.95], km: 22, cost: 20,
    comp: [80, 28.6, 11.8, 42.4, 4.0], compProv: 'measured', cv: 8.4,
    aa: [2.6, 4.6, 7.9, 6.2, 2.8, 8.6, 4.0, 1.3, 4.9], phys: [610, 1, 6.6, 1],
    flags: ['spoilage', 'allergen', 'phytate'], status: 'profiled', batches: 19, updated: '2026-11-24T08:02:00Z', tags: ['Food-grade origin', 'Wet stream'],
  },
  {
    id: 'sunflower-cake', name: 'Sunflower cake', category: 'Oilseed cake', region: 'rift-valley', sourceType: 'Expeller oil mills',
    image: '/img/fs-sunflower.jpg',
    summary: 'Defatted oilseed meal with balanced amino acid profile.',
    description: 'Press cake remaining after mechanical oil extraction. Dry and storable, with substantial protein but chlorogenic acid that can darken protein isolates.',
    volume: 18500, availability: 'Seasonal', season: [0.6, 0.5, 0.4, 0.3, 0.4, 0.6, 0.9, 1, 0.9, 0.8, 0.7, 0.6], km: 64, cost: 165,
    comp: [9, 32.4, 10.2, 29.6, 6.8], compProv: 'literature', cv: 5.3,
    aa: [2.5, 4.1, 6.4, 3.6, 3.8, 7.2, 3.7, 1.2, 4.9], phys: [560, 4, 6.1, 180],
    flags: ['oxidation', 'phytate'], status: 'profiled', batches: 14, updated: '2026-11-20T12:00:00Z', tags: ['Dry & storable', 'Extraction candidate'],
  },
  {
    id: 'avocado-residues', name: 'Avocado processing residues', category: 'Fruit processing residue', region: 'central-highlands', sourceType: 'Avocado oil & export packhouses',
    image: '/img/fs-avocado.jpg',
    summary: 'Lipid-rich pomace and seed streams for fractionated recovery.',
    description: 'Seeds, peels and oil-extraction pomace from avocado processors. Low in protein but high in lipids and starch, making it better suited to fermentation hosts than direct extraction.',
    volume: 9400, availability: 'Seasonal', season: [0.4, 0.6, 0.9, 1, 0.9, 0.6, 0.4, 0.3, 0.3, 0.4, 0.4, 0.3], km: 48, cost: 15,
    comp: [55, 6.1, 14.2, 22.0, 4.2], compProv: 'estimated', cv: 18.6,
    aa: [2.0, 3.4, 6.1, 4.4, 2.4, 6.4, 3.6, 0.9, 4.6], phys: [520, 12, 5.9, 5],
    flags: ['mycotoxin', 'oxidation', 'tannins'], status: 'screening', batches: 9, updated: '2026-11-21T09:30:00Z', tags: ['Lipid-rich', 'Fractionation'],
  },
  {
    id: 'cassava-peel', name: 'Cassava peel', category: 'Agro-industrial residue', region: 'coastal-belt', sourceType: 'Cassava flour & starch processors',
    summary: 'Starch-rich peel stream requiring detoxification before use.',
    description: 'Peels removed during cassava flour and starch processing. Abundant and low cost, but contains cyanogenic glycosides that must be reduced before biological conversion for food or feed.',
    volume: 26000, availability: 'Year-round', season: [0.8, 0.8, 0.7, 0.6, 0.6, 0.7, 0.8, 0.9, 1, 1, 0.9, 0.8], km: 40, cost: 8,
    comp: [65, 5.2, 1.4, 18.4, 6.2], compProv: 'literature', cv: 16.0,
    aa: [1.8, 3.2, 5.6, 4.2, 2.0, 5.8, 3.4, 0.9, 4.2], phys: [350, 15, 6.0, 4],
    flags: ['cyanogenic', 'spoilage'], status: 'profiled', batches: 7, updated: '2026-11-18T14:20:00Z', tags: ['Low cost', 'Fermentable carbs'],
  },
  {
    id: 'banana-residues', name: 'Banana peel & pseudostem', category: 'Fruit processing residue', region: 'lake-basin', sourceType: 'Banana farms & ripening centres',
    summary: 'Fibrous, wet residue with moderate ash and fermentable fraction.',
    description: 'Peels from ripening and processing centres and pseudostem left after harvest. Very wet and dispersed across smallholdings, which drives aggregation cost.',
    volume: 21000, availability: 'Year-round', season: [0.8, 0.8, 0.9, 1, 1, 0.9, 0.8, 0.8, 0.8, 0.9, 0.9, 0.8], km: 55, cost: 6,
    comp: [86, 7.4, 6.0, 30.2, 12.4], compProv: 'estimated', cv: 21.4,
    aa: [1.9, 3.3, 6.0, 4.6, 2.2, 6.0, 3.8, 1.0, 4.4], phys: [300, 25, 5.8, 3],
    flags: ['spoilage', 'salt'], status: 'pending', batches: 0, updated: '2026-11-10T09:00:00Z', tags: ['Dispersed supply'],
  },
  {
    id: 'maize-bran', name: 'Maize bran', category: 'Cereal milling by-product', region: 'rift-valley', sourceType: 'Maize millers',
    summary: 'Dry milling by-product, storable and widely traded as feed.',
    description: 'Outer pericarp and germ fragments from dry maize milling. Already traded into livestock feed, so allocation must weigh displacement effects against protein upgrading.',
    volume: 54000, availability: 'Year-round', season: [0.9, 0.9, 0.9, 0.9, 1, 1, 1, 0.9, 0.9, 0.9, 0.9, 0.9], km: 30, cost: 120,
    comp: [12, 11.0, 5.2, 44.6, 2.4], compProv: 'literature', cv: 7.2,
    aa: [2.7, 3.4, 9.6, 3.6, 3.8, 7.4, 3.6, 0.7, 4.8], phys: [300, 2, 6.2, 120],
    flags: ['mycotoxin', 'phytate'], status: 'profiled', batches: 11, updated: '2026-11-19T11:15:00Z', tags: ['Existing feed market', 'Dry & storable'],
  },
  {
    id: 'rice-bran', name: 'Rice bran', category: 'Cereal milling by-product', region: 'lake-basin', sourceType: 'Irrigation-scheme rice mills',
    summary: 'Oil-rich bran with good lysine relative to other cereals.',
    description: 'Bran layer removed during rice polishing. Lipid-rich and prone to rancidity unless stabilised soon after milling.',
    volume: 7600, availability: 'Seasonal', season: [0.3, 0.3, 0.5, 0.8, 1, 0.9, 0.6, 0.4, 0.3, 0.5, 0.8, 0.6], km: 70, cost: 95,
    comp: [10, 13.4, 18.2, 22.4, 9.8], compProv: 'literature', cv: 9.4,
    aa: [2.7, 3.5, 7.4, 4.8, 3.9, 7.8, 3.8, 1.1, 5.4], phys: [330, 1, 6.8, 30],
    flags: ['oxidation', 'phytate'], status: 'screening', batches: 4, updated: '2026-11-15T16:45:00Z', tags: ['Lipid-rich'],
  },
  {
    id: 'pineapple-residue', name: 'Pineapple processing residue', category: 'Fruit processing residue', region: 'central-highlands', sourceType: 'Canneries & juice plants',
    summary: 'Sugar-rich peel and core stream suited to yeast fermentation.',
    description: 'Peels, cores and crowns from canning and juicing. Acidic and high in soluble sugars, an efficient substrate for yeast or fungal biomass.',
    volume: 15200, availability: 'Year-round', season: [0.7, 0.7, 0.8, 0.9, 1, 1, 0.9, 0.8, 0.7, 0.7, 0.8, 0.8], km: 26, cost: 5,
    comp: [85, 5.0, 1.4, 38.8, 4.8], compProv: 'measured', cv: 11.8,
    aa: [1.8, 3.2, 5.4, 4.0, 2.0, 5.6, 3.4, 0.8, 4.0], phys: [400, 18, 3.9, 2],
    flags: ['spoilage'], status: 'profiled', batches: 6, updated: '2026-11-22T13:05:00Z', tags: ['Sugar-rich', 'Yeast SCP candidate'],
  },
  {
    id: 'sugarcane-bagasse', name: 'Sugarcane bagasse', category: 'Sugar industry co-product', region: 'western-plateau', sourceType: 'Sugar factories',
    summary: 'Abundant lignocellulose; protein routes depend on pretreatment.',
    description: 'Fibrous residue after cane crushing. Mostly burnt for factory energy, so diverting it competes with existing uses. Very low intrinsic protein.',
    volume: 410000, availability: 'Seasonal', season: [0.9, 0.9, 0.8, 0.5, 0.3, 0.4, 0.7, 0.9, 1, 1, 1, 0.9], km: 12, cost: 22,
    comp: [50, 1.8, 0.7, 80.2, 3.1], compProv: 'literature', cv: 4.4,
    aa: [1.6, 3.0, 5.2, 3.2, 2.0, 5.4, 3.4, 0.7, 4.0], phys: [140, 20, 5.4, 365],
    flags: ['lignin'], status: 'profiled', batches: 3, updated: '2026-11-12T10:00:00Z', tags: ['Very high volume', 'Competing use'],
  },
  {
    id: 'cane-molasses', name: 'Cane molasses', category: 'Sugar industry co-product', region: 'western-plateau', sourceType: 'Sugar factories',
    summary: 'Concentrated fermentable sugars for single-cell protein hosts.',
    description: 'Viscous syrup remaining after sucrose crystallisation. A proven carbon source for yeast and bacterial fermentation; traded into distilling, so price follows that market.',
    volume: 68000, availability: 'Seasonal', season: [0.9, 0.9, 0.8, 0.5, 0.3, 0.4, 0.7, 0.9, 1, 1, 1, 0.9], km: 12, cost: 110,
    comp: [25, 4.2, 0.2, 0.0, 12.0], compProv: 'literature', cv: 3.8,
    aa: [1.2, 2.2, 3.4, 2.4, 1.0, 2.6, 2.2, 0.4, 2.8], phys: [1400, 0, 5.2, 365],
    flags: ['salt'], status: 'profiled', batches: 5, updated: '2026-11-16T08:40:00Z', tags: ['Carbon source', 'Storable'],
  },
  {
    id: 'acid-whey', name: 'Acid whey', category: 'Dairy & fishery side-stream', region: 'rift-valley', sourceType: 'Yoghurt & cheese plants',
    summary: 'Lactose-rich liquid stream with soluble whey proteins.',
    description: 'Liquid remaining after acid coagulation in yoghurt and fresh-cheese making. Disposal is costly; lactose suits specialised yeasts, and residual whey proteins can be recovered.',
    volume: 12500, availability: 'Year-round', season: [0.8, 0.8, 0.9, 1, 1, 0.9, 0.8, 0.8, 0.8, 0.9, 0.9, 0.9], km: 20, cost: 0,
    comp: [94, 11.0, 1.0, 0.0, 12.0], compProv: 'estimated', cv: 10.2,
    aa: [2.0, 6.0, 10.4, 9.0, 4.2, 6.0, 7.0, 1.8, 5.8], phys: [1025, 0, 4.5, 2],
    flags: ['spoilage', 'salt'], status: 'screening', batches: 3, updated: '2026-11-14T12:30:00Z', tags: ['Liquid stream', 'Disposal cost'],
  },
  {
    id: 'fish-processing', name: 'Fish processing by-products', category: 'Dairy & fishery side-stream', region: 'lake-basin', sourceType: 'Lakeshore fish processors',
    summary: 'Frames, heads and viscera with high-quality animal protein.',
    description: 'Filleting by-products from lakeshore processing plants. Very high protein and favourable amino acids, but requires a cold chain or immediate hydrolysis to avoid spoilage.',
    volume: 8900, availability: 'Seasonal', season: [1, 1, 0.9, 0.7, 0.6, 0.6, 0.7, 0.8, 0.9, 1, 1, 1], km: 15, cost: 60,
    comp: [70, 52.0, 18.0, 0.0, 22.0], compProv: 'measured', cv: 12.4,
    aa: [2.4, 4.2, 7.6, 8.4, 3.8, 7.2, 4.4, 1.0, 5.0], phys: [900, 30, 6.6, 1],
    flags: ['microbial', 'spoilage', 'metals'], status: 'profiled', batches: 8, updated: '2026-11-17T07:55:00Z', tags: ['Animal origin', 'Hydrolysis candidate'],
  },
  {
    id: 'water-hyacinth', name: 'Water hyacinth', category: 'Aquatic biomass', region: 'lake-basin', sourceType: 'Invasive weed clearance',
    summary: 'Invasive aquatic biomass with co-benefits from removal.',
    description: 'Harvested during lake-clearance programmes. Very wet and mineral-rich; heavy-metal accumulation must be screened lot by lot before any feed or food route.',
    volume: 120000, availability: 'Intermittent', season: [0.6, 0.6, 0.7, 0.9, 1, 1, 0.9, 0.8, 0.7, 0.6, 0.6, 0.6], km: 10, cost: 0,
    comp: [93, 14.8, 2.0, 55.0, 18.4], compProv: 'estimated', cv: 24.0,
    aa: [1.8, 4.0, 7.6, 4.8, 2.4, 7.6, 4.2, 1.4, 5.4], phys: [80, 40, 7.2, 2],
    flags: ['metals', 'salt', 'spoilage'], status: 'screening', batches: 2, updated: '2026-11-08T10:20:00Z', tags: ['Ecosystem co-benefit'],
  },
  {
    id: 'lemna', name: 'Duckweed (Lemna)', category: 'Aquatic biomass', region: 'eastern-lowlands', sourceType: 'Pilot cultivation ponds',
    summary: 'Fast-growing aquatic plant with leaf-protein potential.',
    description: 'Cultivated in pilot wastewater-polishing ponds. Protein content responds strongly to nutrient regime, so batch variability is a key fingerprint metric.',
    volume: 900, availability: 'Year-round', season: [0.8, 0.9, 1, 1, 0.9, 0.8, 0.7, 0.7, 0.8, 0.9, 1, 0.9], km: 8, cost: 40,
    comp: [94, 31.6, 4.2, 25.0, 14.2], compProv: 'measured', cv: 19.8,
    aa: [2.2, 4.4, 8.4, 5.6, 2.8, 8.8, 4.2, 1.8, 5.8], phys: [90, 3, 7.0, 1],
    flags: ['metals', 'microbial'], status: 'screening', batches: 4, updated: '2026-11-20T16:00:00Z', tags: ['Cultivated', 'Leaf protein'],
  },
  {
    id: 'cottonseed-cake', name: 'Cottonseed cake', category: 'Oilseed cake', region: 'eastern-lowlands', sourceType: 'Ginneries & oil mills',
    summary: 'High-protein cake limited by free gossypol.',
    description: 'Press cake from cottonseed oil extraction. Protein-dense and dry, but gossypol restricts monogastric and human use unless removed.',
    volume: 14000, availability: 'Seasonal', season: [0.4, 0.3, 0.3, 0.4, 0.6, 0.9, 1, 1, 0.8, 0.6, 0.5, 0.4], km: 90, cost: 180,
    comp: [10, 40.6, 7.4, 30.2, 6.8], compProv: 'literature', cv: 6.8,
    aa: [2.8, 3.2, 5.8, 4.2, 3.0, 8.0, 3.2, 1.2, 4.4], phys: [580, 4, 6.4, 180],
    flags: ['gossypol', 'mycotoxin'], status: 'profiled', batches: 4, updated: '2026-11-11T09:10:00Z', tags: ['Dry & storable', 'Detox required'],
  },
  {
    id: 'groundnut-cake', name: 'Groundnut cake', category: 'Oilseed cake', region: 'western-plateau', sourceType: 'Small-scale oil presses',
    summary: 'Protein-dense cake with high aflatoxin sensitivity.',
    description: 'Cake from groundnut oil pressing. Excellent protein density, but aflatoxin risk is the dominant constraint and depends heavily on storage conditions upstream.',
    volume: 5200, availability: 'Seasonal', season: [0.4, 0.4, 0.5, 0.7, 0.9, 1, 0.9, 0.7, 0.5, 0.4, 0.4, 0.4], km: 75, cost: 240,
    comp: [9, 47.2, 8.0, 12.6, 5.8], compProv: 'literature', cv: 7.6,
    aa: [2.4, 3.4, 6.4, 3.6, 2.4, 9.4, 2.8, 1.0, 4.2], phys: [600, 4, 6.3, 120],
    flags: ['mycotoxin', 'allergen'], status: 'screening', batches: 3, updated: '2026-11-09T15:00:00Z', tags: ['Protein-dense', 'Aflatoxin risk'],
  },
  {
    id: 'sesame-cake', name: 'Sesame cake', category: 'Oilseed cake', region: 'eastern-lowlands', sourceType: 'Sesame oil presses',
    summary: 'Methionine-rich cake complementary to legume proteins.',
    description: 'Press cake from sesame oil extraction. Notable for sulphur amino acids, making it a useful blending partner for lysine-rich streams.',
    volume: 3100, availability: 'Seasonal', season: [0.6, 0.4, 0.3, 0.3, 0.3, 0.5, 0.8, 1, 1, 0.9, 0.8, 0.7], km: 110, cost: 210,
    comp: [8, 40.2, 12.4, 18.0, 11.2], compProv: 'literature', cv: 6.2,
    aa: [2.6, 3.6, 6.8, 2.8, 5.2, 8.2, 3.6, 1.4, 4.6], phys: [590, 3, 6.0, 150],
    flags: ['oxidation', 'phytate', 'allergen'], status: 'pending', batches: 0, updated: '2026-11-05T10:00:00Z', tags: ['Blending partner'],
  },
  {
    id: 'mango-residue', name: 'Mango kernel & peel', category: 'Fruit processing residue', region: 'eastern-lowlands', sourceType: 'Pulp & dried-fruit processors',
    summary: 'Seasonal stream with starch-rich kernels and sugary peel.',
    description: 'Kernels and peels from mango pulping and drying. Strongly seasonal; kernels contain tannins and starch, peels are sugar-rich.',
    volume: 11000, availability: 'Seasonal', season: [1, 0.9, 0.5, 0.2, 0.1, 0.05, 0.05, 0.1, 0.2, 0.5, 0.8, 1], km: 85, cost: 4,
    comp: [48, 7.0, 9.6, 14.2, 3.2], compProv: 'estimated', cv: 17.2,
    aa: [1.9, 3.4, 6.2, 4.4, 2.2, 6.2, 3.6, 0.9, 4.6], phys: [450, 20, 4.6, 3],
    flags: ['tannins', 'spoilage'], status: 'screening', batches: 2, updated: '2026-11-13T11:00:00Z', tags: ['Highly seasonal'],
  },
  {
    id: 'tea-waste', name: 'Tea factory refuse', category: 'Agro-industrial residue', region: 'central-highlands', sourceType: 'Tea factories',
    summary: 'Dry fibrous leaf refuse with appreciable leaf protein.',
    description: 'Fluff, stalks and rejected leaf from tea manufacture. Dry and storable with moderate protein, but polyphenols and caffeine reduce digestibility.',
    volume: 9800, availability: 'Year-round', season: [0.9, 0.8, 0.9, 1, 1, 0.8, 0.7, 0.7, 0.8, 0.9, 1, 1], km: 28, cost: 10,
    comp: [12, 22.4, 2.2, 44.8, 6.0], compProv: 'estimated', cv: 9.8,
    aa: [2.0, 4.2, 7.6, 5.4, 2.4, 8.2, 4.2, 1.6, 5.4], phys: [180, 6, 5.6, 180],
    flags: ['caffeine', 'tannins'], status: 'pending', batches: 0, updated: '2026-11-02T09:00:00Z', tags: ['Dry & storable'],
  },
  {
    id: 'potato-peel', name: 'Potato peel', category: 'Agro-industrial residue', region: 'rift-valley', sourceType: 'Crisp & chips processors',
    summary: 'Starchy peel stream with good fermentability.',
    description: 'Steam and abrasion peels from potato processing. Starch-rich and wet; glycoalkaloid levels should be confirmed before food applications.',
    volume: 7400, availability: 'Year-round', season: [0.8, 0.8, 0.9, 0.9, 1, 1, 0.9, 0.8, 0.8, 0.9, 0.9, 0.9], km: 34, cost: 6,
    comp: [83, 12.2, 1.6, 20.4, 7.8], compProv: 'measured', cv: 10.6,
    aa: [2.0, 3.8, 5.8, 5.4, 2.6, 7.6, 4.0, 1.2, 5.2], phys: [550, 8, 6.0, 3],
    flags: ['spoilage'], status: 'profiled', batches: 5, updated: '2026-11-22T10:00:00Z', tags: ['Starch-rich', 'Fermentable'],
  },
  {
    id: 'distillers-grains', name: 'Distillers wet grains', category: 'Brewery & distillery co-product', region: 'central-highlands', sourceType: 'Grain distilleries',
    summary: 'Protein-enriched grain residue after starch fermentation.',
    description: 'Wet grain residue after distillation of grain spirits. Fermentation concentrates protein and lipid relative to the original grain.',
    volume: 9200, availability: 'Year-round', season: [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.95, 1, 1], km: 24, cost: 35,
    comp: [70, 30.4, 10.2, 38.0, 5.0], compProv: 'estimated', cv: 8.0,
    aa: [2.6, 3.8, 10.0, 2.8, 3.6, 8.4, 3.6, 0.8, 5.0], phys: [420, 4, 4.2, 3],
    flags: ['spoilage', 'mycotoxin'], status: 'screening', batches: 3, updated: '2026-11-19T14:00:00Z', tags: ['Year-round', 'Protein-enriched'],
  },
  {
    id: 'cashew-apple', name: 'Cashew apple pomace', category: 'Fruit processing residue', region: 'coastal-belt', sourceType: 'Cashew processing & juice',
    summary: 'Largely unused pseudo-fruit residue rich in sugars and tannins.',
    description: 'Pomace from the cashew apple, most of which is currently left in the field after nut harvesting. Sugar-rich but astringent.',
    volume: 16500, availability: 'Seasonal', season: [0.8, 1, 0.9, 0.4, 0.1, 0.05, 0.05, 0.05, 0.1, 0.3, 0.6, 0.8], km: 60, cost: 3,
    comp: [78, 9.2, 4.0, 30.0, 3.0], compProv: 'estimated', cv: 15.6,
    aa: [1.8, 3.2, 5.8, 4.2, 2.0, 5.8, 3.4, 0.9, 4.2], phys: [430, 15, 4.0, 2],
    flags: ['tannins', 'spoilage'], status: 'pending', batches: 0, updated: '2026-11-06T09:00:00Z', tags: ['Underused', 'Highly seasonal'],
  },
]

function build(r: Row): Feedstock {
  const [moisture, protein, lipid, fibre, ash] = r.comp
  const carb = Math.max(0, +(100 - protein - lipid - fibre - ash).toFixed(1))
  const spread = (v: number, pct: number): [number, number] => [
    +(v * (1 - pct / 100)).toFixed(1),
    +(v * (1 + pct / 100)).toFixed(1),
  ]
  const n = r.compProv === 'measured' ? Math.max(3, r.batches) : undefined
  return {
    id: r.id,
    name: r.name,
    category: r.category,
    summary: r.summary,
    description: r.description,
    image: r.image,
    region: r.region,
    sourceType: r.sourceType,
    annualVolume: m(r.volume, 't/yr', 'estimated', spread(r.volume, 20)),
    availability: r.availability,
    seasonality: r.season,
    transportKm: r.km,
    cost: m(r.cost, 'USD/t', 'estimated'),
    composition: {
      moisture: m(moisture, '% as received', r.compProv, spread(moisture, 6), n),
      protein: m(protein, '% DM', r.compProv, spread(protein, r.cv), n),
      lipid: m(lipid, '% DM', r.compProv, spread(lipid, r.cv + 4), n),
      fibre: m(fibre, '% DM', r.compProv, spread(fibre, 10), n),
      ash: m(ash, '% DM', r.compProv, spread(ash, 12), n),
      carbohydrate: m(carb, '% DM', 'estimated'),
    },
    aminoAcids: Object.fromEntries(AA_KEYS.map((k, i) => [k, r.aa[i]])) as Record<AminoAcidKey, number>,
    aminoAcidProvenance: r.compProv === 'measured' ? 'measured' : 'literature',
    physical: {
      bulkDensity: m(r.phys[0], 'kg/m³', r.compProv),
      particleSize: m(r.phys[1], 'mm (D50)', 'estimated'),
      ph: m(r.phys[2], 'pH', r.compProv),
      shelfLife: m(r.phys[3], 'days, ambient', 'estimated'),
    },
    variabilityCv: r.cv,
    flags: r.flags.map((f) => FLAGS[f]),
    status: r.status,
    batchCount: r.batches,
    lastUpdated: r.updated,
    tags: r.tags,
  }
}

export const FEEDSTOCKS: Feedstock[] = ROWS.map(build)

export const FEEDSTOCK_CATEGORIES = Array.from(new Set(FEEDSTOCKS.map((f) => f.category)))

/** Feedstocks highlighted in the dashboard spotlight (Stitch design order). */
export const SPOTLIGHT_IDS = ['coffee-pulp', 'brewers-spent-grain', 'soy-okara', 'sunflower-cake', 'avocado-residues']

export const AMINO_ACID_LABELS: Record<AminoAcidKey, string> = {
  his: 'His', ile: 'Ile', leu: 'Leu', lys: 'Lys', saa: 'Met+Cys', aaa: 'Phe+Tyr', thr: 'Thr', trp: 'Trp', val: 'Val',
}

/**
 * Indispensable amino acid reference pattern (g/100 g protein) for older
 * children, adolescents and adults, as published in the FAO (2013) Expert
 * Consultation on dietary protein quality evaluation. Literature reference —
 * verify against the source before regulatory use.
 */
export const AA_REFERENCE: Record<AminoAcidKey, number> = {
  his: 1.6, ile: 3.0, leu: 6.1, lys: 4.8, saa: 2.3, aaa: 4.1, thr: 2.5, trp: 0.66, val: 4.0,
}
