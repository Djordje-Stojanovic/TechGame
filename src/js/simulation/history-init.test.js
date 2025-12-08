/**
 * Tests for history initialization.
 * @module simulation/history-init.test
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { initializeHistory } from './history-init.js';
import { createInitialState } from '../state/game-state.js';
import { STARTING_PRODUCTS, getStartingProductIds } from '../data/starting-products.js';
import { STARTING_MARKET_SHARE } from '../data/competitor-data.js';
import { calculateMarketDemand } from '../data/market-data.js';

describe('initializeHistory', () => {
  let state;

  beforeEach(() => {
    // Create state with products populated (as main.js does)
    state = createInitialState();
    state.products = { ...state.products, ...STARTING_PRODUCTS };
    state.companies.nvidia.products = getStartingProductIds('nvidia');
    state.companies.amd.products = getStartingProductIds('amd');
    state.companies.intel.products = getStartingProductIds('intel');
    // Set totalDemand as main.js will do
    state.market.totalDemand = calculateMarketDemand(state.time.currentYear);
  });

  describe('Day 1 entry creation (AC 5)', () => {
    it('creates Day 1 entry in state.history.daily', () => {
      initializeHistory(state);

      expect(state.history.daily).toHaveLength(1);
      expect(state.history.daily[0].day).toBe(1);
    });

    it('creates entry with correct date structure', () => {
      initializeHistory(state);

      const entry = state.history.daily[0];
      expect(entry.day).toBe(1);
      expect(entry.month).toBe(1);
      expect(entry.year).toBe(2022);
    });
  });

  describe('history entry structure (AC 6)', () => {
    it('has correct top-level structure', () => {
      initializeHistory(state);

      const entry = state.history.daily[0];
      expect(entry).toHaveProperty('day');
      expect(entry).toHaveProperty('month');
      expect(entry).toHaveProperty('year');
      expect(entry).toHaveProperty('sales');
      expect(entry).toHaveProperty('companyTotals');
    });

    it('sales has entry for each company', () => {
      initializeHistory(state);

      const { sales } = state.history.daily[0];
      expect(sales).toHaveProperty('nvidia');
      expect(sales).toHaveProperty('amd');
      expect(sales).toHaveProperty('intel');
      expect(sales).toHaveProperty('player');
    });

    it('companyTotals has entry for each company', () => {
      initializeHistory(state);

      const { companyTotals } = state.history.daily[0];
      expect(companyTotals).toHaveProperty('nvidia');
      expect(companyTotals).toHaveProperty('amd');
      expect(companyTotals).toHaveProperty('intel');
      expect(companyTotals).toHaveProperty('player');
    });

    it('companyTotals entries have correct structure', () => {
      initializeHistory(state);

      const { companyTotals } = state.history.daily[0];
      const requiredFields = ['units', 'revenue', 'costs', 'rdSpend', 'marketing'];

      for (const company of ['nvidia', 'amd', 'intel', 'player']) {
        for (const field of requiredFields) {
          expect(companyTotals[company]).toHaveProperty(field);
          expect(typeof companyTotals[company][field]).toBe('number');
        }
      }
    });
  });

  describe('product sales per company (AC 7)', () => {
    it('nvidia sales has entries for each active product', () => {
      initializeHistory(state);

      const { sales } = state.history.daily[0];
      const nvidiaProductIds = getStartingProductIds('nvidia');

      for (const productId of nvidiaProductIds) {
        expect(sales.nvidia).toHaveProperty(productId);
        expect(sales.nvidia[productId]).toHaveProperty('units');
        expect(sales.nvidia[productId]).toHaveProperty('revenue');
        expect(sales.nvidia[productId]).toHaveProperty('cost');
      }
    });

    it('amd sales has entries for each active product', () => {
      initializeHistory(state);

      const { sales } = state.history.daily[0];
      const amdProductIds = getStartingProductIds('amd');

      for (const productId of amdProductIds) {
        expect(sales.amd).toHaveProperty(productId);
      }
    });

    it('intel sales has entries for each active product', () => {
      initializeHistory(state);

      const { sales } = state.history.daily[0];
      const intelProductIds = getStartingProductIds('intel');

      for (const productId of intelProductIds) {
        expect(sales.intel).toHaveProperty(productId);
      }
    });

    it('player sales is empty object at start', () => {
      initializeHistory(state);

      const { sales } = state.history.daily[0];
      expect(sales.player).toEqual({});
    });
  });

  describe('market share distribution (AC 8)', () => {
    it('nvidia gets ~80% of daily units', () => {
      initializeHistory(state);

      const { companyTotals } = state.history.daily[0];
      const totalUnits =
        companyTotals.nvidia.units +
        companyTotals.amd.units +
        companyTotals.intel.units +
        companyTotals.player.units;

      const nvidiaShare = companyTotals.nvidia.units / totalUnits;
      expect(nvidiaShare).toBeCloseTo(0.80, 1);
    });

    it('amd gets ~18% of daily units', () => {
      initializeHistory(state);

      const { companyTotals } = state.history.daily[0];
      const totalUnits =
        companyTotals.nvidia.units +
        companyTotals.amd.units +
        companyTotals.intel.units +
        companyTotals.player.units;

      const amdShare = companyTotals.amd.units / totalUnits;
      expect(amdShare).toBeCloseTo(0.18, 1);
    });

    it('intel gets ~2% of daily units', () => {
      initializeHistory(state);

      const { companyTotals } = state.history.daily[0];
      const totalUnits =
        companyTotals.nvidia.units +
        companyTotals.amd.units +
        companyTotals.intel.units +
        companyTotals.player.units;

      const intelShare = companyTotals.intel.units / totalUnits;
      expect(intelShare).toBeCloseTo(0.02, 1);
    });

    it('player gets 0 units (no products)', () => {
      initializeHistory(state);

      const { companyTotals } = state.history.daily[0];
      expect(companyTotals.player.units).toBe(0);
    });
  });

  describe('daily demand calculation (AC 9)', () => {
    it('total units equals totalDemand / 365', () => {
      initializeHistory(state);

      const { companyTotals } = state.history.daily[0];
      const totalUnits =
        companyTotals.nvidia.units +
        companyTotals.amd.units +
        companyTotals.intel.units +
        companyTotals.player.units;

      const expectedDailyDemand = Math.floor(state.market.totalDemand / 365);
      expect(totalUnits).toBe(expectedDailyDemand);
    });

    it('uses totalDemand from state.market', () => {
      // Modify totalDemand to ensure it's being used
      state.market.totalDemand = 36500000; // 100,000 per day
      initializeHistory(state);

      const { companyTotals } = state.history.daily[0];
      const totalUnits =
        companyTotals.nvidia.units +
        companyTotals.amd.units +
        companyTotals.intel.units +
        companyTotals.player.units;

      expect(totalUnits).toBe(100000);
    });
  });

  describe('revenue and cost calculations', () => {
    it('product revenue = units * msrp', () => {
      initializeHistory(state);

      const { sales } = state.history.daily[0];

      // Check a specific product
      const productId = 'nvidia-rtx-3080-2020q3';
      const product = STARTING_PRODUCTS[productId];
      const productSales = sales.nvidia[productId];

      expect(productSales.revenue).toBe(productSales.units * product.msrp);
    });

    it('product cost = units * manufacturingCost', () => {
      initializeHistory(state);

      const { sales } = state.history.daily[0];

      // Check a specific product
      const productId = 'nvidia-rtx-3080-2020q3';
      const product = STARTING_PRODUCTS[productId];
      const productSales = sales.nvidia[productId];

      expect(productSales.cost).toBe(productSales.units * product.manufacturingCost);
    });

    it('companyTotals.revenue equals sum of product revenues', () => {
      initializeHistory(state);

      const { sales, companyTotals } = state.history.daily[0];

      let nvidiaRevenue = 0;
      for (const productId of Object.keys(sales.nvidia)) {
        nvidiaRevenue += sales.nvidia[productId].revenue;
      }

      expect(companyTotals.nvidia.revenue).toBe(nvidiaRevenue);
    });

    it('companyTotals.costs equals sum of product costs', () => {
      initializeHistory(state);

      const { sales, companyTotals } = state.history.daily[0];

      let nvidiaCosts = 0;
      for (const productId of Object.keys(sales.nvidia)) {
        nvidiaCosts += sales.nvidia[productId].cost;
      }

      expect(companyTotals.nvidia.costs).toBe(nvidiaCosts);
    });

    it('player has zero revenue and costs', () => {
      initializeHistory(state);

      const { companyTotals } = state.history.daily[0];
      expect(companyTotals.player.revenue).toBe(0);
      expect(companyTotals.player.costs).toBe(0);
    });
  });

  describe('product distribution within company', () => {
    it('all company products have non-zero units (except player)', () => {
      initializeHistory(state);

      const { sales } = state.history.daily[0];

      // NVIDIA products
      for (const productId of getStartingProductIds('nvidia')) {
        expect(sales.nvidia[productId].units).toBeGreaterThan(0);
      }

      // AMD products
      for (const productId of getStartingProductIds('amd')) {
        expect(sales.amd[productId].units).toBeGreaterThan(0);
      }

      // Intel products
      for (const productId of getStartingProductIds('intel')) {
        expect(sales.intel[productId].units).toBeGreaterThan(0);
      }
    });

    it('cheaper products sell more units within company', () => {
      initializeHistory(state);

      const { sales } = state.history.daily[0];

      // NVIDIA: RTX 3060 ($329) should sell more than RTX 3090 ($1499)
      const rtx3060Units = sales.nvidia['nvidia-rtx-3060-2021q1'].units;
      const rtx3090Units = sales.nvidia['nvidia-rtx-3090-2020q3'].units;
      expect(rtx3060Units).toBeGreaterThan(rtx3090Units);
    });

    it('product units sum to company total units', () => {
      initializeHistory(state);

      const { sales, companyTotals } = state.history.daily[0];

      let nvidiaProductUnits = 0;
      for (const productId of Object.keys(sales.nvidia)) {
        nvidiaProductUnits += sales.nvidia[productId].units;
      }

      expect(nvidiaProductUnits).toBe(companyTotals.nvidia.units);
    });
  });

  describe('rdSpend and marketing initialization', () => {
    it('rdSpend is 0 at game start', () => {
      initializeHistory(state);

      const { companyTotals } = state.history.daily[0];
      expect(companyTotals.nvidia.rdSpend).toBe(0);
      expect(companyTotals.amd.rdSpend).toBe(0);
      expect(companyTotals.intel.rdSpend).toBe(0);
      expect(companyTotals.player.rdSpend).toBe(0);
    });

    it('marketing is 0 at game start', () => {
      initializeHistory(state);

      const { companyTotals } = state.history.daily[0];
      expect(companyTotals.nvidia.marketing).toBe(0);
      expect(companyTotals.amd.marketing).toBe(0);
      expect(companyTotals.intel.marketing).toBe(0);
      expect(companyTotals.player.marketing).toBe(0);
    });
  });

  describe('idempotency and edge cases', () => {
    it('does not add duplicate entries if called twice', () => {
      initializeHistory(state);
      initializeHistory(state);

      expect(state.history.daily).toHaveLength(1);
    });

    it('handles state with empty products gracefully', () => {
      state.products = {};
      state.companies.nvidia.products = [];
      state.companies.amd.products = [];
      state.companies.intel.products = [];

      // Should not throw
      expect(() => initializeHistory(state)).not.toThrow();

      // Should still create entry
      expect(state.history.daily).toHaveLength(1);
    });

    it('handles all products discontinued gracefully', () => {
      // Mark all products as discontinued
      Object.values(state.products).forEach(product => {
        product.status = 'discontinued';
      });

      // Should not throw
      expect(() => initializeHistory(state)).not.toThrow();

      // Should still create entry with company totals but empty sales
      expect(state.history.daily).toHaveLength(1);
      const { sales, companyTotals } = state.history.daily[0];

      // Company totals should have units allocated (from market share)
      expect(companyTotals.nvidia.units).toBeGreaterThan(0);

      // But sales should be empty (no active products to distribute to)
      expect(Object.keys(sales.nvidia)).toHaveLength(0);
      expect(Object.keys(sales.amd)).toHaveLength(0);
      expect(Object.keys(sales.intel)).toHaveLength(0);
    });
  });
});
