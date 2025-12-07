// @vitest-environment jsdom

/**
 * Integration tests for main.js
 * Tests product initialization and state population.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { initialize, stopGameLoop } from './main.js';
import { cleanupKeyboardShortcuts } from './ui/components/top-bar.js';
import { STARTING_PRODUCTS } from './data/starting-products.js';

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
});
