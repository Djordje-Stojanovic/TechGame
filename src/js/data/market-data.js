/**
 * USA GPU Market Data
 * Ballpark realistic figures for 2022 baseline (NFR6-7).
 * Sources: Steam Hardware Survey, Jon Peddie Research, IDC estimates.
 *
 * Layer: data/ (no imports allowed)
 */

// USA Market Baseline (2022)
/** USA population in 2022 (~332 million) */
export const USA_POPULATION_2022 = 332_000_000;

/** Percentage of population that games (~45%) */
export const GAMING_POPULATION_PERCENT = 0.45;

/** Annual GPU upgrade rate (~15%) */
export const GPU_UPGRADE_RATE = 0.15;

/** Base annual GPU demand (~50 million discrete GPU units) */
export const BASE_GPU_DEMAND_ANNUAL = 50_000_000;

// Annual Growth Rates
/** USA population growth rate (0.5% annual) */
export const POPULATION_GROWTH_RATE = 0.005;

/** GPU market demand growth rate (3% annual - tech adoption trends) */
export const GPU_DEMAND_GROWTH_RATE = 0.03;

/**
 * Market segments with consumer behavior weights.
 * Matches game-state.js segments EXACTLY.
 */
export const MARKET_SEGMENTS = {
  budget: {
    name: 'Budget',
    minPrice: 0,
    maxPrice: 299,
    demandShare: 0.40,
    priceWeight: 0.7,
    perfWeight: 0.3,
    description: 'Price-conscious gamers, entry-level builds'
  },
  midrange: {
    name: 'Midrange',
    minPrice: 300,
    maxPrice: 599,
    demandShare: 0.40,
    priceWeight: 0.5,
    perfWeight: 0.5,
    description: 'Balanced value seekers, 1080p/1440p gaming'
  },
  highend: {
    name: 'High-end',
    minPrice: 600,
    maxPrice: 999999,
    demandShare: 0.20,
    priceWeight: 0.3,
    perfWeight: 0.7,
    description: 'Performance enthusiasts, 4K/VR gaming'
  }
};

/**
 * Determines which market segment a product belongs to based on price.
 * @param {number} price - Product retail price in USD
 * @returns {string} Segment key: 'budget', 'midrange', or 'highend'
 */
export function getProductSegment(price) {
  if (price <= MARKET_SEGMENTS.budget.maxPrice) return 'budget';
  if (price <= MARKET_SEGMENTS.midrange.maxPrice) return 'midrange';
  return 'highend';
}

/**
 * Calculates projected annual GPU demand for a given year.
 * Applies compound growth from 2022 baseline.
 * @param {number} year - Target year (2022+)
 * @returns {number} Projected annual demand in units
 */
export function calculateMarketDemand(year) {
  const yearsFromBaseline = year - 2022;
  if (yearsFromBaseline < 0) return BASE_GPU_DEMAND_ANNUAL;
  return Math.floor(BASE_GPU_DEMAND_ANNUAL * Math.pow(1 + GPU_DEMAND_GROWTH_RATE, yearsFromBaseline));
}
