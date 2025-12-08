// @vitest-environment jsdom

/**
 * Integration tests for main.js
 * Tests product initialization and state population.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initialize, stopGameLoop } from './main.js';
import { cleanupKeyboardShortcuts } from './ui/components/top-bar.js';
import { STARTING_PRODUCTS } from './data/starting-products.js';
import { calculateMarketDemand } from './data/market-data.js';
import { getMarketShare } from './utils/queries.js';

describe('main.js integration', () => {
  let state;
  let originalConsoleLog;
  let originalConsoleError;

  beforeEach(() => {
    // Mock console to reduce test noise
    originalConsoleLog = console.log;
    originalConsoleError = console.error;
    console.log = vi.fn();
    console.error = vi.fn();

    // Set up minimal DOM (must match index.html IDs)
    document.body.innerHTML = `
      <div id="app">
        <div id="top-bar"></div>
        <div id="sidebar"></div>
        <main id="main-content"></main>
      </div>
    `;

    state = initialize();
  });

  afterEach(() => {
    // Clean up game loop and keyboard listeners to prevent test pollution
    stopGameLoop();
    cleanupKeyboardShortcuts();

    // Restore console
    console.log = originalConsoleLog;
    console.error = originalConsoleError;

    // Clean up DOM
    document.body.innerHTML = '';
  });

  describe('Product Initialization (AC18)', () => {
    it('initialize() populates state.products with all 9 products', () => {
      expect(Object.keys(state.products)).toHaveLength(9);
    });

    it('state.products contains all starting products', () => {
      Object.keys(STARTING_PRODUCTS).forEach(id => {
        expect(state.products[id]).toBeDefined();
      });
    });
  });

  describe('Product Accessibility (AC19)', () => {
    it('products are accessible by ID', () => {
      const rtx3080 = state.products['nvidia-rtx-3080-2020q3'];
      expect(rtx3080).toBeDefined();
      expect(rtx3080.name).toBe('RTX 3080');
      expect(rtx3080.company).toBe('nvidia');
    });

    it('all product IDs match expected format', () => {
      const idPattern = /^(nvidia|amd|intel)-[a-z0-9-]+-\d{4}q[1-4]$/;
      Object.keys(state.products).forEach(id => {
        expect(id).toMatch(idPattern);
      });
    });
  });

  describe('Company Product Linking (AC20)', () => {
    it('state.companies.nvidia.products has 4 IDs', () => {
      expect(state.companies.nvidia.products).toHaveLength(4);
    });

    it('state.companies.amd.products has 3 IDs', () => {
      expect(state.companies.amd.products).toHaveLength(3);
    });

    it('state.companies.intel.products has 2 IDs', () => {
      expect(state.companies.intel.products).toHaveLength(2);
    });

    it('nvidia products all start with nvidia-', () => {
      state.companies.nvidia.products.forEach(id => {
        expect(id).toMatch(/^nvidia-/);
      });
    });

    it('amd products all start with amd-', () => {
      state.companies.amd.products.forEach(id => {
        expect(id).toMatch(/^amd-/);
      });
    });

    it('intel products all start with intel-', () => {
      state.companies.intel.products.forEach(id => {
        expect(id).toMatch(/^intel-/);
      });
    });

    it('all company product IDs exist in state.products', () => {
      const allCompanyIds = [
        ...state.companies.nvidia.products,
        ...state.companies.amd.products,
        ...state.companies.intel.products
      ];
      allCompanyIds.forEach(id => {
        expect(state.products[id]).toBeDefined();
      });
    });
  });

  describe('History Initialization (AC15)', () => {
    it('initialize() populates state.history.daily with Day 1 data', () => {
      expect(state.history.daily).toHaveLength(1);
      expect(state.history.daily[0].day).toBe(1);
      expect(state.history.daily[0].month).toBe(1);
      expect(state.history.daily[0].year).toBe(2022);
    });

    it('Day 1 entry has sales and companyTotals', () => {
      const day1 = state.history.daily[0];
      expect(day1.sales).toBeDefined();
      expect(day1.companyTotals).toBeDefined();
    });

    it('all companies have entries in companyTotals', () => {
      const { companyTotals } = state.history.daily[0];
      expect(companyTotals.nvidia).toBeDefined();
      expect(companyTotals.amd).toBeDefined();
      expect(companyTotals.intel).toBeDefined();
      expect(companyTotals.player).toBeDefined();
    });
  });

  describe('Market Demand Initialization (AC16)', () => {
    it('state.market.totalDemand matches calculateMarketDemand', () => {
      expect(state.market.totalDemand).toBe(calculateMarketDemand(state.time.currentYear));
    });

    it('state.market.totalDemand equals ~50M for 2022', () => {
      expect(state.market.totalDemand).toBe(50_000_000);
    });
  });

  describe('Product Data Integrity', () => {
    it('products have correct company references', () => {
      state.companies.nvidia.products.forEach(id => {
        expect(state.products[id].company).toBe('nvidia');
      });
      state.companies.amd.products.forEach(id => {
        expect(state.products[id].company).toBe('amd');
      });
      state.companies.intel.products.forEach(id => {
        expect(state.products[id].company).toBe('intel');
      });
    });

    it('all products have active status', () => {
      Object.values(state.products).forEach(product => {
        expect(product.status).toBe('active');
      });
    });

    it('all products have complete specs', () => {
      const requiredSpecs = ['cores', 'vram', 'clockSpeed', 'tdp', 'dieSize', 'nm'];
      Object.values(state.products).forEach(product => {
        requiredSpecs.forEach(spec => {
          expect(product.specs).toHaveProperty(spec);
          expect(typeof product.specs[spec]).toBe('number');
        });
      });
    });
  });

  describe('Market Share Integration (Story 2.3)', () => {
    it('getMarketShare returns ~80% for nvidia after initialize()', () => {
      const nvidiaShare = getMarketShare(state, 'nvidia', 'day');
      expect(nvidiaShare).toBeCloseTo(0.80, 1);
    });

    it('getMarketShare returns ~18% for amd after initialize()', () => {
      const amdShare = getMarketShare(state, 'amd', 'day');
      expect(amdShare).toBeCloseTo(0.18, 1);
    });

    it('getMarketShare returns ~2% for intel after initialize()', () => {
      const intelShare = getMarketShare(state, 'intel', 'day');
      expect(intelShare).toBeCloseTo(0.02, 1);
    });

    it('getMarketShare returns 0 for player after initialize()', () => {
      const playerShare = getMarketShare(state, 'player', 'day');
      expect(playerShare).toBe(0);
    });

    it('all market shares sum to 1.0 after initialize()', () => {
      const total =
        getMarketShare(state, 'nvidia', 'day') +
        getMarketShare(state, 'amd', 'day') +
        getMarketShare(state, 'intel', 'day') +
        getMarketShare(state, 'player', 'day');
      expect(total).toBeCloseTo(1.0, 10);
    });
  });
});
