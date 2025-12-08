/**
 * History Initialization
 * Creates Day 1 history entry with starting market conditions.
 *
 * Layer: simulation/ (may import: state, data, utils)
 *
 * Naming Convention:
 * - Product sales use singular 'cost' (single product's manufacturing cost)
 * - Company totals use plural 'costs' (aggregate of all product costs)
 */

import { STARTING_MARKET_SHARE } from '../data/competitor-data.js';

/**
 * Initialize history with Day 1 data based on starting products and market share.
 * Called once after products are populated in state.
 *
 * @param {Object} state - Game state with products, companies, market, time
 */
export function initializeHistory(state) {
  // Don't add duplicate entries
  if (state.history.daily.length > 0) {
    return;
  }

  const dailyDemand = Math.floor(state.market.totalDemand / 365);

  // Initialize sales and companyTotals structures
  const sales = {
    nvidia: {},
    amd: {},
    intel: {},
    player: {}
  };

  const companyTotals = {
    nvidia: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
    amd: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
    intel: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
    player: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 }
  };

  // Distribute daily demand by starting market share
  // Calculate initial distribution with floor, then assign remainder to largest (nvidia)
  const companies = ['nvidia', 'amd', 'intel', 'player'];
  let distributedTotal = 0;

  for (const company of companies) {
    const companyUnits = Math.floor(dailyDemand * STARTING_MARKET_SHARE[company]);
    companyTotals[company].units = companyUnits;
    distributedTotal += companyUnits;
  }

  // Assign any remainder to nvidia (largest company)
  const remainder = dailyDemand - distributedTotal;
  if (remainder > 0) {
    companyTotals.nvidia.units += remainder;
  }

  for (const company of companies) {
    const companyUnits = companyTotals[company].units;

    // Get company's products from state
    const productIds = company === 'player'
      ? state.player.products
      : state.companies[company]?.products || [];

    if (productIds.length === 0) {
      // No products - skip distribution
      continue;
    }

    // Distribute units across products by inverse price (cheaper sells more)
    const products = productIds
      .map(id => state.products[id])
      .filter(p => p && p.status === 'active');

    if (products.length === 0) {
      continue;
    }

    // Calculate inverse price weights
    const inverseWeights = products.map(p => 1 / p.msrp);
    const totalWeight = inverseWeights.reduce((a, b) => a + b, 0);

    // Distribute units and calculate revenue/costs
    let distributedUnits = 0;
    products.forEach((product, index) => {
      const weight = inverseWeights[index] / totalWeight;
      // Use floor for all but last product to avoid exceeding companyUnits
      const isLast = index === products.length - 1;
      const units = isLast
        ? companyUnits - distributedUnits
        : Math.floor(companyUnits * weight);

      distributedUnits += units;

      const revenue = units * product.msrp;
      const cost = units * product.manufacturingCost;

      sales[company][product.id] = {
        units,
        revenue,
        cost
      };

      companyTotals[company].revenue += revenue;
      companyTotals[company].costs += cost;
    });
  }

  // Create Day 1 history entry
  const day1Entry = {
    day: state.time.currentDay,
    month: state.time.currentMonth,
    year: state.time.currentYear,
    sales,
    companyTotals
  };

  state.history.daily.push(day1Entry);
}
