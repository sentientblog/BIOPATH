import type { Pathway } from './types'

/**
 * DEMO PATHWAY LIBRARY
 * Resource intensities are indicative planning estimates per tonne of feedstock
 * dry matter, chosen to make trade-offs visible. They are not engineering data.
 */
export const PATHWAYS: Pathway[] = [
  {
    id: 'fungal-ssf', name: 'Fungal solid-state fermentation', short: 'Fungal SSF', family: 'Fermentation',
    description: 'Filamentous fungi colonise moist solid substrate, converting sugars and fibre into protein-enriched mycelial biomass. Tolerant of polyphenols and fibre; low water demand.',
    product: 'Protein-enriched fermented substrate', productProtein: [18, 35], trl: 6, durationDays: [5, 10],
    waterM3PerT: 2.5, energyKwhPerT: 180, opexUsdPerT: 95, capex: 'Low', scalability: 4,
    requirements: ['Moisture 50–70%', 'Pasteurisation or steam treatment', 'Aeration & temperature control'],
    risks: ['Contamination in open trays', 'Heat build-up at scale'],
  },
  {
    id: 'submerged-myco', name: 'Submerged mycelial fermentation', short: 'Submerged', family: 'Fermentation',
    description: 'Fungal mycelium grown in liquid culture on hydrolysed or soluble sugars, then harvested and dewatered as mycoprotein-type biomass.',
    product: 'Mycelial biomass', productProtein: [40, 55], trl: 7, durationDays: [2, 5],
    waterM3PerT: 14, energyKwhPerT: 620, opexUsdPerT: 260, capex: 'High', scalability: 3,
    requirements: ['Soluble carbon source', 'Sterile bioreactor', 'Dewatering & RNA reduction'],
    risks: ['Sterility failures', 'High capital intensity'],
  },
  {
    id: 'enzymatic-hydrolysis', name: 'Enzymatic hydrolysis & concentration', short: 'Enzymatic', family: 'Extraction',
    description: 'Carbohydrases and proteases release and solubilise protein from the matrix, followed by membrane or thermal concentration.',
    product: 'Protein hydrolysate / concentrate', productProtein: [55, 75], trl: 7, durationDays: [1, 2],
    waterM3PerT: 9, energyKwhPerT: 410, opexUsdPerT: 210, capex: 'Medium', scalability: 4,
    requirements: ['Protein ≥ 15% DM', 'Enzyme supply', 'Temperature & pH control'],
    risks: ['Enzyme cost', 'Bitterness in hydrolysates'],
  },
  {
    id: 'alkaline-extraction', name: 'Alkaline extraction & isoelectric precipitation', short: 'Alkaline Ext.', family: 'Extraction',
    description: 'Protein is solubilised at high pH, separated from solids, then precipitated at its isoelectric point to give a concentrate or isolate.',
    product: 'Protein concentrate / isolate', productProtein: [60, 90], trl: 8, durationDays: [1, 1],
    waterM3PerT: 18, energyKwhPerT: 520, opexUsdPerT: 240, capex: 'Medium', scalability: 4,
    requirements: ['Protein ≥ 20% DM', 'Low residual oil or defatting step', 'Effluent treatment'],
    risks: ['High water & chemical use', 'Lysinoalanine at harsh conditions'],
  },
  {
    id: 'insect-bsf', name: 'Insect bioconversion (black soldier fly)', short: 'Insect BSF', family: 'Bioconversion',
    description: 'Larvae consume wet organic residues and convert them into larval biomass for meal and oil, leaving frass as a soil amendment.',
    product: 'Larval meal + frass', productProtein: [38, 48], trl: 8, durationDays: [12, 18],
    waterM3PerT: 0.8, energyKwhPerT: 90, opexUsdPerT: 70, capex: 'Low', scalability: 5,
    requirements: ['Moisture 60–80%', 'Contaminant-free substrate', 'Climate-controlled rearing'],
    risks: ['Substrate regulations (feed law)', 'Contaminant bioaccumulation'],
  },
  {
    id: 'yeast-scp', name: 'Yeast single-cell protein', short: 'Yeast SCP', family: 'Fermentation',
    description: 'Yeasts grown aerobically on soluble sugars from juices, molasses, whey or hydrolysates, yielding protein-rich single-cell biomass.',
    product: 'Yeast biomass', productProtein: [45, 60], trl: 8, durationDays: [1, 3],
    waterM3PerT: 12, energyKwhPerT: 560, opexUsdPerT: 230, capex: 'High', scalability: 3,
    requirements: ['Fermentable sugars ≥ 30% DM', 'Nitrogen supplementation', 'Aerated fermenter'],
    risks: ['Oxygen-transfer limits', 'Nucleic-acid content for food'],
  },
  {
    id: 'microalgae-mixo', name: 'Mixotrophic microalgae cultivation', short: 'Microalgae', family: 'Cultivation',
    description: 'Microalgae grown on light plus organic carbon from liquid side-streams, producing protein- and pigment-rich biomass.',
    product: 'Algal biomass', productProtein: [45, 65], trl: 5, durationDays: [7, 14],
    waterM3PerT: 22, energyKwhPerT: 740, opexUsdPerT: 320, capex: 'High', scalability: 2,
    requirements: ['Clarified liquid feed', 'Light & CO₂ management', 'Contamination control'],
    risks: ['Low areal productivity', 'Harvesting energy'],
  },
]

export const pathwayById = (id: string) => PATHWAYS.find((p) => p.id === id)
