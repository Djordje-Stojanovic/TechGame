import { describe, it, expect } from 'vitest';
import { createInitialState } from './game-state.js';

describe('createInitialState', () => {
  // AC1: Can import and access createInitialState()
  it('exports createInitialState as a function', () => {
    expect(typeof createInitialState).toBe('function');
  });

  it('returns a fresh object each call (no shared references)', () => {
    const state1 = createInitialState();
    const state2 = createInitialState();
    expect(state1).not.toBe(state2);
    expect(state1.time).not.toBe(state2.time);
    expect(state1.player).not.toBe(state2.player);
  });

  // AC3: JSON.stringify succeeds without errors
  it('is JSON serializable (no Infinity, functions, or circular refs)', () => {
    const state = createInitialState();
    expect(() => JSON.stringify(state)).not.toThrow();
    const json = JSON.stringify(state);
    expect(json.length).toBeGreaterThan(0);
  });

  // AC3: time.currentYear defaults to 2022 (FR21)
  it('defaults time.currentYear to 2022', () => {
    const state = createInitialState();
    expect(state.time.currentYear).toBe(2022);
  });

  // AC3: time.currentQuarter defaults to 1
  it('defaults time.currentQuarter to 1', () => {
    const state = createInitialState();
    expect(state.time.currentQuarter).toBe(1);
  });

  // AC2: State structure - time section
  describe('time section', () => {
    it('has all required time fields', () => {
      const { time } = createInitialState();
      expect(time).toHaveProperty('currentHour', 0);
      expect(time).toHaveProperty('currentDay', 1);
      expect(time).toHaveProperty('currentMonth', 1);
      expect(time).toHaveProperty('currentQuarter', 1);
      expect(time).toHaveProperty('currentYear', 2022);
      expect(time).toHaveProperty('tickSpeed', 1);
      expect(time).toHaveProperty('paused', true);
    });
  });

  // AC2: State structure - player section
  describe('player section', () => {
    it('has all required player fields', () => {
      const { player } = createInitialState();
      expect(player).toHaveProperty('name');
      expect(player).toHaveProperty('cash');
      expect(player).toHaveProperty('products');
      expect(player).toHaveProperty('rdProjects');
      expect(player).toHaveProperty('marketingBudget');
      expect(Array.isArray(player.products)).toBe(true);
      expect(Array.isArray(player.rdProjects)).toBe(true);
    });
  });

  // AC2: State structure - companies section
  describe('companies section', () => {
    it('has nvidia, amd, and intel', () => {
      const { companies } = createInitialState();
      expect(companies).toHaveProperty('nvidia');
      expect(companies).toHaveProperty('amd');
      expect(companies).toHaveProperty('intel');
    });

    it('each company has required fields', () => {
      const { companies } = createInitialState();
      for (const key of ['nvidia', 'amd', 'intel']) {
        const company = companies[key];
        expect(company).toHaveProperty('name');
        expect(company).toHaveProperty('cash');
        expect(company).toHaveProperty('products');
        expect(company).toHaveProperty('rdProjects');
        expect(company).toHaveProperty('marketingBudget');
        expect(Array.isArray(company.products)).toBe(true);
        expect(Array.isArray(company.rdProjects)).toBe(true);
      }
    });
  });

  // AC2: State structure - market section
  describe('market section', () => {
    it('has totalDemand, segments, and preferences', () => {
      const { market } = createInitialState();
      expect(market).toHaveProperty('totalDemand');
      expect(market).toHaveProperty('segments');
      expect(market).toHaveProperty('preferences');
    });

    it('has budget, midrange, and highend segments', () => {
      const { segments } = createInitialState().market;
      expect(segments).toHaveProperty('budget');
      expect(segments).toHaveProperty('midrange');
      expect(segments).toHaveProperty('highend');
    });

    it('highend maxPrice is finite (not Infinity)', () => {
      const { segments } = createInitialState().market;
      expect(Number.isFinite(segments.highend.maxPrice)).toBe(true);
      expect(segments.highend.maxPrice).toBe(999999);
    });
  });

  // AC2: State structure - products section
  describe('products section', () => {
    it('is an empty object', () => {
      const { products } = createInitialState();
      expect(products).toEqual({});
    });
  });

  // AC2: State structure - history section
  describe('history section', () => {
    it('has daily and events arrays', () => {
      const { history } = createInitialState();
      expect(history).toHaveProperty('daily');
      expect(history).toHaveProperty('events');
      expect(Array.isArray(history.daily)).toBe(true);
      expect(Array.isArray(history.events)).toBe(true);
    });
  });

  // AC2: State structure - ui section
  describe('ui section', () => {
    it('has currentView, selectedProduct, and gpuDesigner', () => {
      const { ui } = createInitialState();
      expect(ui).toHaveProperty('currentView', 'dashboard');
      expect(ui).toHaveProperty('selectedProduct', null);
      expect(ui).toHaveProperty('gpuDesigner');
    });

    it('gpuDesigner has specs, name, and price', () => {
      const { gpuDesigner } = createInitialState().ui;
      expect(gpuDesigner).toHaveProperty('specs');
      expect(gpuDesigner).toHaveProperty('name', '');
      expect(gpuDesigner).toHaveProperty('price', 0);
    });
  });

  // AC3: All keys use camelCase
  describe('camelCase naming', () => {
    it('all top-level keys are camelCase', () => {
      const state = createInitialState();
      const keys = Object.keys(state);
      for (const key of keys) {
        expect(key).toMatch(/^[a-z][a-zA-Z0-9]*$/);
      }
    });

    it('time keys are camelCase', () => {
      const { time } = createInitialState();
      for (const key of Object.keys(time)) {
        expect(key).toMatch(/^[a-z][a-zA-Z0-9]*$/);
      }
    });
  });
});
