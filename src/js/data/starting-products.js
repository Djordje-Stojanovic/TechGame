/**
 * Competitor Starting Products for Q1 2022
 * NVIDIA RTX 30 series, AMD RX 6000 series, Intel Arc A-series
 *
 * Layer: data/ (no imports allowed - all values are literals)
 *
 * Product ID format: {company}-{name-slug}-{launchQuarter}
 * Manufacturing costs are BOM estimates - margins determined by market simulation
 *
 * BOM estimates based on industry teardowns and analysis:
 * - Die cost: ~$0.25-0.35/mm² depending on process node
 * - VRAM: ~$6/GB (GDDR6/GDDR6X average)
 * - Packaging + PCB: ~$60-70 fixed
 */

/**
 * @typedef {Object} ProductSpecs
 * @property {number} cores - GPU core count
 * @property {number} vram - VRAM in GB
 * @property {number} clockSpeed - Clock speed in GHz
 * @property {number} tdp - Thermal Design Power in Watts
 * @property {number} dieSize - Die size in mm²
 * @property {number} nm - Process node in nanometers
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Unique ID: {company}-{slug}-{quarter} (e.g., 'nvidia-rtx-3080-2020q3')
 * @property {string} company - Company ID: 'nvidia', 'amd', 'intel', or 'player'
 * @property {string} name - Display name (e.g., 'RTX 3080')
 * @property {{quarter: number, year: number}} launchDate - Launch date
 * @property {{quarter: number, year: number}|null} discontinuedDate - Discontinued date or null if active
 * @property {ProductSpecs} specs - Technical specifications
 * @property {number} msrp - Manufacturer's suggested retail price in USD
 * @property {number} manufacturingCost - BOM cost in USD
 * @property {'active'|'discontinued'} status - Product lifecycle status
 */

/** NVIDIA GeForce RTX 30 Series (Samsung 8nm) */
export const NVIDIA_PRODUCTS = [
  {
    id: 'nvidia-rtx-3090-2020q3',
    company: 'nvidia',
    name: 'RTX 3090',
    launchDate: { quarter: 3, year: 2020 },
    discontinuedDate: null,
    specs: { cores: 10496, vram: 24, clockSpeed: 1.70, tdp: 350, dieSize: 628, nm: 8 },
    msrp: 1499,
    manufacturingCost: 280,
    status: 'active'
  },
  {
    id: 'nvidia-rtx-3080-2020q3',
    company: 'nvidia',
    name: 'RTX 3080',
    launchDate: { quarter: 3, year: 2020 },
    discontinuedDate: null,
    specs: { cores: 8704, vram: 10, clockSpeed: 1.71, tdp: 320, dieSize: 628, nm: 8 },
    msrp: 699,
    manufacturingCost: 250,
    status: 'active'
  },
  {
    id: 'nvidia-rtx-3070-2020q3',
    company: 'nvidia',
    name: 'RTX 3070',
    launchDate: { quarter: 3, year: 2020 },
    discontinuedDate: null,
    specs: { cores: 5888, vram: 8, clockSpeed: 1.73, tdp: 220, dieSize: 392, nm: 8 },
    msrp: 499,
    manufacturingCost: 170,
    status: 'active'
  },
  {
    id: 'nvidia-rtx-3060-2021q1',
    company: 'nvidia',
    name: 'RTX 3060',
    launchDate: { quarter: 1, year: 2021 },
    discontinuedDate: null,
    specs: { cores: 3584, vram: 12, clockSpeed: 1.78, tdp: 170, dieSize: 276, nm: 8 },
    msrp: 329,
    manufacturingCost: 140,
    status: 'active'
  }
];

/** AMD Radeon RX 6000 Series (TSMC 7nm) */
export const AMD_PRODUCTS = [
  {
    id: 'amd-rx-6900-xt-2020q4',
    company: 'amd',
    name: 'RX 6900 XT',
    launchDate: { quarter: 4, year: 2020 },
    discontinuedDate: null,
    specs: { cores: 5120, vram: 16, clockSpeed: 2.25, tdp: 300, dieSize: 519, nm: 7 },
    msrp: 999,
    manufacturingCost: 240,
    status: 'active'
  },
  {
    id: 'amd-rx-6800-xt-2020q4',
    company: 'amd',
    name: 'RX 6800 XT',
    launchDate: { quarter: 4, year: 2020 },
    discontinuedDate: null,
    specs: { cores: 4608, vram: 16, clockSpeed: 2.25, tdp: 300, dieSize: 519, nm: 7 },
    msrp: 649,
    manufacturingCost: 220,
    status: 'active'
  },
  {
    id: 'amd-rx-6700-xt-2021q1',
    company: 'amd',
    name: 'RX 6700 XT',
    launchDate: { quarter: 1, year: 2021 },
    discontinuedDate: null,
    specs: { cores: 2560, vram: 12, clockSpeed: 2.58, tdp: 230, dieSize: 336, nm: 7 },
    msrp: 479,
    manufacturingCost: 160,
    status: 'active'
  }
];

/** Intel Arc A-Series (TSMC 6nm) - Q1 2022 for gameplay balance */
export const INTEL_PRODUCTS = [
  {
    id: 'intel-arc-a770-2022q1',
    company: 'intel',
    name: 'Arc A770',
    launchDate: { quarter: 1, year: 2022 },
    discontinuedDate: null,
    specs: { cores: 4096, vram: 16, clockSpeed: 2.10, tdp: 225, dieSize: 406, nm: 6 },
    msrp: 349,
    manufacturingCost: 200,
    status: 'active'
  },
  {
    id: 'intel-arc-a750-2022q1',
    company: 'intel',
    name: 'Arc A750',
    launchDate: { quarter: 1, year: 2022 },
    discontinuedDate: null,
    specs: { cores: 3584, vram: 8, clockSpeed: 2.05, tdp: 225, dieSize: 406, nm: 6 },
    msrp: 289,
    manufacturingCost: 170,
    status: 'active'
  }
];

/** All starting products keyed by ID for state.products */
export const STARTING_PRODUCTS = Object.fromEntries([
  ...NVIDIA_PRODUCTS,
  ...AMD_PRODUCTS,
  ...INTEL_PRODUCTS
].map(p => [p.id, p]));

/**
 * Get product IDs for a specific company
 * @param {string} company - Company ID: 'nvidia', 'amd', or 'intel'
 * @returns {string[]} Array of product IDs for that company
 */
export function getStartingProductIds(company) {
  return Object.values(STARTING_PRODUCTS)
    .filter(p => p.company === company)
    .map(p => p.id);
}
