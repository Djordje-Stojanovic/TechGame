// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import {
  COMPETITOR_STARTING_CASH, COMPETITOR_BRAND_COLORS,
  STARTING_MARKET_SHARE, COMPETITOR_PROFILES,
  COMPETITOR_PLACEHOLDER_PRODUCTS
} from './competitor-data.js';
import { COMPANY_IDS } from './constants.js';

describe('competitor-data.js', () => {
  describe('COMPETITOR_STARTING_CASH (AC 16)', () => {
    it('NVIDIA has $15B', () => {
      expect(COMPETITOR_STARTING_CASH.nvidia).toBe(15_000_000_000);
    });

    it('AMD has $3B', () => {
      expect(COMPETITOR_STARTING_CASH.amd).toBe(3_000_000_000);
    });

    it('Intel has $25B', () => {
      expect(COMPETITOR_STARTING_CASH.intel).toBe(25_000_000_000);
    });

    it('all cash values are positive', () => {
      Object.values(COMPETITOR_STARTING_CASH).forEach(cash => {
        expect(cash).toBeGreaterThan(0);
      });
    });

    it('all cash values are numbers', () => {
      Object.values(COMPETITOR_STARTING_CASH).forEach(cash => {
        expect(typeof cash).toBe('number');
      });
    });

    it('has all expected competitors', () => {
      expect(COMPETITOR_STARTING_CASH).toHaveProperty('nvidia');
      expect(COMPETITOR_STARTING_CASH).toHaveProperty('amd');
      expect(COMPETITOR_STARTING_CASH).toHaveProperty('intel');
    });
  });

  describe('COMPETITOR_BRAND_COLORS (AC 18)', () => {
    const hexPattern = /^#[0-9A-Fa-f]{6}$/;

    it('NVIDIA is green (#76b900)', () => {
      expect(COMPETITOR_BRAND_COLORS.nvidia).toBe('#76b900');
    });

    it('AMD is red (#ed1c24)', () => {
      expect(COMPETITOR_BRAND_COLORS.amd).toBe('#ed1c24');
    });

    it('Intel is blue (#0071c5)', () => {
      expect(COMPETITOR_BRAND_COLORS.intel).toBe('#0071c5');
    });

    it('Player is accent blue (#3b82f6)', () => {
      expect(COMPETITOR_BRAND_COLORS.player).toBe('#3b82f6');
    });

    it('all colors are valid hex codes', () => {
      expect(COMPETITOR_BRAND_COLORS.nvidia).toMatch(hexPattern);
      expect(COMPETITOR_BRAND_COLORS.amd).toMatch(hexPattern);
      expect(COMPETITOR_BRAND_COLORS.intel).toMatch(hexPattern);
      expect(COMPETITOR_BRAND_COLORS.player).toMatch(hexPattern);
    });

    it('has colors for all companies', () => {
      COMPANY_IDS.forEach(id => {
        expect(COMPETITOR_BRAND_COLORS).toHaveProperty(id);
      });
    });
  });

  describe('STARTING_MARKET_SHARE (AC 19)', () => {
    it('NVIDIA dominates at 80%', () => {
      expect(STARTING_MARKET_SHARE.nvidia).toBe(0.80);
    });

    it('AMD has 18%', () => {
      expect(STARTING_MARKET_SHARE.amd).toBe(0.18);
    });

    it('Intel has 2%', () => {
      expect(STARTING_MARKET_SHARE.intel).toBe(0.02);
    });

    it('Player starts at 0%', () => {
      expect(STARTING_MARKET_SHARE.player).toBe(0.00);
    });

    it('shares sum to 1.0 (100%)', () => {
      const total = STARTING_MARKET_SHARE.nvidia +
                   STARTING_MARKET_SHARE.amd +
                   STARTING_MARKET_SHARE.intel +
                   STARTING_MARKET_SHARE.player;
      expect(total).toBe(1.0);
    });

    it('all shares are between 0 and 1', () => {
      Object.values(STARTING_MARKET_SHARE).forEach(share => {
        expect(share).toBeGreaterThanOrEqual(0);
        expect(share).toBeLessThanOrEqual(1);
      });
    });

    it('has shares for all companies', () => {
      COMPANY_IDS.forEach(id => {
        expect(STARTING_MARKET_SHARE).toHaveProperty(id);
      });
    });
  });

  describe('COMPETITOR_PROFILES (AC 17)', () => {
    const requiredFields = ['id', 'name', 'color', 'startingCash', 'rdBudgetPercent', 'marketingBudgetPercent', 'brandReputation'];

    describe('NVIDIA profile', () => {
      it('has all required fields', () => {
        requiredFields.forEach(field => {
          expect(COMPETITOR_PROFILES.nvidia).toHaveProperty(field);
        });
      });

      it('has correct id and name', () => {
        expect(COMPETITOR_PROFILES.nvidia.id).toBe('nvidia');
        expect(COMPETITOR_PROFILES.nvidia.name).toBe('NVIDIA');
      });

      it('has brandReputation between 0 and 1', () => {
        expect(COMPETITOR_PROFILES.nvidia.brandReputation).toBeGreaterThanOrEqual(0);
        expect(COMPETITOR_PROFILES.nvidia.brandReputation).toBeLessThanOrEqual(1);
      });

      it('has rdBudgetPercent between 0.15 and 0.3', () => {
        expect(COMPETITOR_PROFILES.nvidia.rdBudgetPercent).toBeGreaterThanOrEqual(0.15);
        expect(COMPETITOR_PROFILES.nvidia.rdBudgetPercent).toBeLessThanOrEqual(0.3);
      });

      it('color matches COMPETITOR_BRAND_COLORS', () => {
        expect(COMPETITOR_PROFILES.nvidia.color).toBe(COMPETITOR_BRAND_COLORS.nvidia);
      });

      it('startingCash matches COMPETITOR_STARTING_CASH', () => {
        expect(COMPETITOR_PROFILES.nvidia.startingCash).toBe(COMPETITOR_STARTING_CASH.nvidia);
      });
    });

    describe('AMD profile', () => {
      it('has all required fields', () => {
        requiredFields.forEach(field => {
          expect(COMPETITOR_PROFILES.amd).toHaveProperty(field);
        });
      });

      it('has correct id and name', () => {
        expect(COMPETITOR_PROFILES.amd.id).toBe('amd');
        expect(COMPETITOR_PROFILES.amd.name).toBe('AMD');
      });

      it('has brandReputation between 0 and 1', () => {
        expect(COMPETITOR_PROFILES.amd.brandReputation).toBeGreaterThanOrEqual(0);
        expect(COMPETITOR_PROFILES.amd.brandReputation).toBeLessThanOrEqual(1);
      });

      it('has rdBudgetPercent between 0.15 and 0.3', () => {
        expect(COMPETITOR_PROFILES.amd.rdBudgetPercent).toBeGreaterThanOrEqual(0.15);
        expect(COMPETITOR_PROFILES.amd.rdBudgetPercent).toBeLessThanOrEqual(0.3);
      });

      it('color matches COMPETITOR_BRAND_COLORS', () => {
        expect(COMPETITOR_PROFILES.amd.color).toBe(COMPETITOR_BRAND_COLORS.amd);
      });

      it('startingCash matches COMPETITOR_STARTING_CASH', () => {
        expect(COMPETITOR_PROFILES.amd.startingCash).toBe(COMPETITOR_STARTING_CASH.amd);
      });
    });

    describe('Intel profile', () => {
      it('has all required fields', () => {
        requiredFields.forEach(field => {
          expect(COMPETITOR_PROFILES.intel).toHaveProperty(field);
        });
      });

      it('has correct id and name', () => {
        expect(COMPETITOR_PROFILES.intel.id).toBe('intel');
        expect(COMPETITOR_PROFILES.intel.name).toBe('Intel Arc');
      });

      it('has brandReputation between 0 and 1', () => {
        expect(COMPETITOR_PROFILES.intel.brandReputation).toBeGreaterThanOrEqual(0);
        expect(COMPETITOR_PROFILES.intel.brandReputation).toBeLessThanOrEqual(1);
      });

      it('has rdBudgetPercent between 0.15 and 0.3', () => {
        expect(COMPETITOR_PROFILES.intel.rdBudgetPercent).toBeGreaterThanOrEqual(0.15);
        expect(COMPETITOR_PROFILES.intel.rdBudgetPercent).toBeLessThanOrEqual(0.3);
      });

      it('color matches COMPETITOR_BRAND_COLORS', () => {
        expect(COMPETITOR_PROFILES.intel.color).toBe(COMPETITOR_BRAND_COLORS.intel);
      });

      it('startingCash matches COMPETITOR_STARTING_CASH', () => {
        expect(COMPETITOR_PROFILES.intel.startingCash).toBe(COMPETITOR_STARTING_CASH.intel);
      });
    });

    it('all profiles have consistent internal references', () => {
      ['nvidia', 'amd', 'intel'].forEach(company => {
        const profile = COMPETITOR_PROFILES[company];
        expect(profile.color).toBe(COMPETITOR_BRAND_COLORS[company]);
        expect(profile.startingCash).toBe(COMPETITOR_STARTING_CASH[company]);
      });
    });

    it('all profiles have marketingBudgetPercent defined', () => {
      ['nvidia', 'amd', 'intel'].forEach(company => {
        const profile = COMPETITOR_PROFILES[company];
        expect(profile.marketingBudgetPercent).toBeGreaterThan(0);
        expect(profile.marketingBudgetPercent).toBeLessThan(1);
      });
    });
  });

  describe('COMPETITOR_PLACEHOLDER_PRODUCTS (AC 20)', () => {
    it('exists for all competitors', () => {
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS).toHaveProperty('nvidia');
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS).toHaveProperty('amd');
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS).toHaveProperty('intel');
    });

    it('NVIDIA products is empty array', () => {
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS.nvidia).toEqual([]);
    });

    it('AMD products is empty array', () => {
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS.amd).toEqual([]);
    });

    it('Intel products is empty array', () => {
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS.intel).toEqual([]);
    });

    it('all are arrays', () => {
      expect(Array.isArray(COMPETITOR_PLACEHOLDER_PRODUCTS.nvidia)).toBe(true);
      expect(Array.isArray(COMPETITOR_PLACEHOLDER_PRODUCTS.amd)).toBe(true);
      expect(Array.isArray(COMPETITOR_PLACEHOLDER_PRODUCTS.intel)).toBe(true);
    });
  });

  describe('JSON Serializability (AC 21)', () => {
    it('COMPETITOR_STARTING_CASH is JSON-serializable', () => {
      const serialized = JSON.stringify(COMPETITOR_STARTING_CASH);
      const deserialized = JSON.parse(serialized);
      expect(deserialized.nvidia).toBe(COMPETITOR_STARTING_CASH.nvidia);
    });

    it('COMPETITOR_BRAND_COLORS is JSON-serializable', () => {
      const serialized = JSON.stringify(COMPETITOR_BRAND_COLORS);
      const deserialized = JSON.parse(serialized);
      expect(deserialized.nvidia).toBe(COMPETITOR_BRAND_COLORS.nvidia);
    });

    it('STARTING_MARKET_SHARE is JSON-serializable', () => {
      const serialized = JSON.stringify(STARTING_MARKET_SHARE);
      const deserialized = JSON.parse(serialized);
      expect(deserialized.nvidia).toBe(STARTING_MARKET_SHARE.nvidia);
    });

    it('COMPETITOR_PROFILES is JSON-serializable', () => {
      const serialized = JSON.stringify(COMPETITOR_PROFILES);
      const deserialized = JSON.parse(serialized);
      expect(deserialized.nvidia.name).toBe(COMPETITOR_PROFILES.nvidia.name);
      expect(deserialized.amd.startingCash).toBe(COMPETITOR_PROFILES.amd.startingCash);
    });

    it('COMPETITOR_PLACEHOLDER_PRODUCTS is JSON-serializable', () => {
      const serialized = JSON.stringify(COMPETITOR_PLACEHOLDER_PRODUCTS);
      const deserialized = JSON.parse(serialized);
      expect(deserialized.nvidia).toEqual([]);
    });
  });

  describe('Cross-validation with game-state consistency', () => {
    it('NVIDIA cash matches game-state value ($15B)', () => {
      expect(COMPETITOR_STARTING_CASH.nvidia).toBe(15_000_000_000);
    });

    it('AMD cash matches game-state value ($3B)', () => {
      expect(COMPETITOR_STARTING_CASH.amd).toBe(3_000_000_000);
    });

    it('Intel cash matches game-state value ($25B)', () => {
      expect(COMPETITOR_STARTING_CASH.intel).toBe(25_000_000_000);
    });
  });
});
