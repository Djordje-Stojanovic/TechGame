// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import {
  USA_POPULATION_2022, GAMING_POPULATION_PERCENT, GPU_UPGRADE_RATE,
  BASE_GPU_DEMAND_ANNUAL,
  POPULATION_GROWTH_RATE, GPU_DEMAND_GROWTH_RATE,
  MARKET_SEGMENTS, getProductSegment, calculateMarketDemand
} from './market-data.js';
import { BUDGET_MAX_PRICE, MIDRANGE_MAX_PRICE, SEGMENT_KEYS } from './constants.js';

describe('market-data.js', () => {
  describe('USA Market Constants (AC 9-12)', () => {
    it('USA_POPULATION_2022 equals approximately 332M (AC 9)', () => {
      expect(USA_POPULATION_2022).toBe(332_000_000);
    });

    it('BASE_GPU_DEMAND_ANNUAL equals approximately 50M (AC 10)', () => {
      expect(BASE_GPU_DEMAND_ANNUAL).toBe(50_000_000);
    });

    it('POPULATION_GROWTH_RATE equals 0.005 (0.5%) (AC 11)', () => {
      expect(POPULATION_GROWTH_RATE).toBe(0.005);
    });

    it('GPU_DEMAND_GROWTH_RATE equals 0.03 (3%) (AC 12)', () => {
      expect(GPU_DEMAND_GROWTH_RATE).toBe(0.03);
    });

    it('all market constants are numbers', () => {
      expect(typeof USA_POPULATION_2022).toBe('number');
      expect(typeof BASE_GPU_DEMAND_ANNUAL).toBe('number');
      expect(typeof POPULATION_GROWTH_RATE).toBe('number');
      expect(typeof GPU_DEMAND_GROWTH_RATE).toBe('number');
    });

    it('growth rates are reasonable (0-1 range)', () => {
      expect(POPULATION_GROWTH_RATE).toBeGreaterThan(0);
      expect(POPULATION_GROWTH_RATE).toBeLessThan(1);
      expect(GPU_DEMAND_GROWTH_RATE).toBeGreaterThan(0);
      expect(GPU_DEMAND_GROWTH_RATE).toBeLessThan(1);
    });

    it('GAMING_POPULATION_PERCENT is reasonable', () => {
      expect(GAMING_POPULATION_PERCENT).toBe(0.45);
    });

    it('GPU_UPGRADE_RATE is reasonable', () => {
      expect(GPU_UPGRADE_RATE).toBe(0.15);
    });
  });

  describe('MARKET_SEGMENTS (AC 13)', () => {
    it('has budget, midrange, highend segments', () => {
      expect(MARKET_SEGMENTS).toHaveProperty('budget');
      expect(MARKET_SEGMENTS).toHaveProperty('midrange');
      expect(MARKET_SEGMENTS).toHaveProperty('highend');
    });

    it('budget segment has correct structure', () => {
      expect(MARKET_SEGMENTS.budget.name).toBe('Budget');
      expect(MARKET_SEGMENTS.budget.minPrice).toBe(0);
      expect(MARKET_SEGMENTS.budget.maxPrice).toBe(299);
      expect(MARKET_SEGMENTS.budget.demandShare).toBe(0.40);
      expect(MARKET_SEGMENTS.budget.priceWeight).toBe(0.7);
      expect(MARKET_SEGMENTS.budget.perfWeight).toBe(0.3);
    });

    it('midrange segment has correct structure', () => {
      expect(MARKET_SEGMENTS.midrange.name).toBe('Midrange');
      expect(MARKET_SEGMENTS.midrange.minPrice).toBe(300);
      expect(MARKET_SEGMENTS.midrange.maxPrice).toBe(599);
      expect(MARKET_SEGMENTS.midrange.demandShare).toBe(0.40);
      expect(MARKET_SEGMENTS.midrange.priceWeight).toBe(0.5);
      expect(MARKET_SEGMENTS.midrange.perfWeight).toBe(0.5);
    });

    it('highend segment has correct structure', () => {
      expect(MARKET_SEGMENTS.highend.name).toBe('High-end');
      expect(MARKET_SEGMENTS.highend.minPrice).toBe(600);
      expect(MARKET_SEGMENTS.highend.maxPrice).toBe(999999);
      expect(MARKET_SEGMENTS.highend.demandShare).toBe(0.20);
      expect(MARKET_SEGMENTS.highend.priceWeight).toBe(0.3);
      expect(MARKET_SEGMENTS.highend.perfWeight).toBe(0.7);
    });

    it('demand shares sum to 1.0', () => {
      const total = MARKET_SEGMENTS.budget.demandShare +
                   MARKET_SEGMENTS.midrange.demandShare +
                   MARKET_SEGMENTS.highend.demandShare;
      expect(total).toBe(1.0);
    });

    it('price + perf weights sum to 1.0 for each segment', () => {
      expect(MARKET_SEGMENTS.budget.priceWeight + MARKET_SEGMENTS.budget.perfWeight).toBe(1.0);
      expect(MARKET_SEGMENTS.midrange.priceWeight + MARKET_SEGMENTS.midrange.perfWeight).toBe(1.0);
      expect(MARKET_SEGMENTS.highend.priceWeight + MARKET_SEGMENTS.highend.perfWeight).toBe(1.0);
    });

    it('segment keys match SEGMENT_KEYS constant', () => {
      const segmentKeys = Object.keys(MARKET_SEGMENTS);
      expect(segmentKeys).toEqual(SEGMENT_KEYS);
    });

    it('each segment has required properties', () => {
      const requiredProps = ['name', 'minPrice', 'maxPrice', 'demandShare', 'priceWeight', 'perfWeight'];
      Object.values(MARKET_SEGMENTS).forEach(segment => {
        requiredProps.forEach(prop => {
          expect(segment).toHaveProperty(prop);
        });
      });
    });
  });

  describe('Cross-validation with constants.js (AC 13)', () => {
    it('BUDGET_MAX_PRICE matches MARKET_SEGMENTS.budget.maxPrice', () => {
      expect(MARKET_SEGMENTS.budget.maxPrice).toBe(BUDGET_MAX_PRICE);
    });

    it('MIDRANGE_MAX_PRICE matches MARKET_SEGMENTS.midrange.maxPrice', () => {
      expect(MARKET_SEGMENTS.midrange.maxPrice).toBe(MIDRANGE_MAX_PRICE);
    });

    it('segment boundaries are contiguous (no gaps)', () => {
      // Budget ends at 299, midrange starts at 300
      expect(MARKET_SEGMENTS.budget.maxPrice + 1).toBe(MARKET_SEGMENTS.midrange.minPrice);
      // Midrange ends at 599, highend starts at 600
      expect(MARKET_SEGMENTS.midrange.maxPrice + 1).toBe(MARKET_SEGMENTS.highend.minPrice);
    });

    it('segment boundaries have no overlaps', () => {
      expect(MARKET_SEGMENTS.budget.maxPrice).toBeLessThan(MARKET_SEGMENTS.midrange.minPrice);
      expect(MARKET_SEGMENTS.midrange.maxPrice).toBeLessThan(MARKET_SEGMENTS.highend.minPrice);
    });

    it('budget starts at 0', () => {
      expect(MARKET_SEGMENTS.budget.minPrice).toBe(0);
    });
  });

  describe('getProductSegment (AC 14)', () => {
    it('returns budget for negative prices (edge case)', () => {
      expect(getProductSegment(-1)).toBe('budget');
      expect(getProductSegment(-100)).toBe('budget');
    });

    it('returns budget for $0', () => {
      expect(getProductSegment(0)).toBe('budget');
    });

    it('returns budget for $150', () => {
      expect(getProductSegment(150)).toBe('budget');
    });

    it('returns budget for $299 (boundary)', () => {
      expect(getProductSegment(299)).toBe('budget');
    });

    it('returns midrange for $300 (boundary)', () => {
      expect(getProductSegment(300)).toBe('midrange');
    });

    it('returns midrange for $450', () => {
      expect(getProductSegment(450)).toBe('midrange');
    });

    it('returns midrange for $599 (boundary)', () => {
      expect(getProductSegment(599)).toBe('midrange');
    });

    it('returns highend for $600 (boundary)', () => {
      expect(getProductSegment(600)).toBe('highend');
    });

    it('returns highend for $999', () => {
      expect(getProductSegment(999)).toBe('highend');
    });

    it('returns highend for $1999', () => {
      expect(getProductSegment(1999)).toBe('highend');
    });

    it('returns highend for very high prices', () => {
      expect(getProductSegment(10000)).toBe('highend');
      expect(getProductSegment(999999)).toBe('highend');
    });

    it('handles decimal prices (boundaries are exact)', () => {
      // 299.99 > 299 so it's midrange (boundary is maxPrice=299)
      expect(getProductSegment(299.99)).toBe('midrange');
      expect(getProductSegment(300.00)).toBe('midrange');
      // 599.99 > 599 so it's highend (boundary is maxPrice=599)
      expect(getProductSegment(599.99)).toBe('highend');
      expect(getProductSegment(600.00)).toBe('highend');
    });
  });

  describe('calculateMarketDemand (AC 15)', () => {
    it('returns base demand for 2022', () => {
      expect(calculateMarketDemand(2022)).toBe(BASE_GPU_DEMAND_ANNUAL);
    });

    it('returns growing demand for 2023', () => {
      const demand2023 = calculateMarketDemand(2023);
      expect(demand2023).toBeGreaterThan(BASE_GPU_DEMAND_ANNUAL);
    });

    it('returns growing demand for 2024', () => {
      const demand2023 = calculateMarketDemand(2023);
      const demand2024 = calculateMarketDemand(2024);
      expect(demand2024).toBeGreaterThan(demand2023);
    });

    it('applies compound growth correctly', () => {
      const demand2023 = calculateMarketDemand(2023);
      const expected = Math.floor(BASE_GPU_DEMAND_ANNUAL * (1 + GPU_DEMAND_GROWTH_RATE));
      expect(demand2023).toBe(expected);
    });

    it('applies multiple years of compound growth', () => {
      const demand2025 = calculateMarketDemand(2025);
      const expected = Math.floor(BASE_GPU_DEMAND_ANNUAL * Math.pow(1 + GPU_DEMAND_GROWTH_RATE, 3));
      expect(demand2025).toBe(expected);
    });

    it('returns base demand for years before 2022', () => {
      expect(calculateMarketDemand(2021)).toBe(BASE_GPU_DEMAND_ANNUAL);
      expect(calculateMarketDemand(2020)).toBe(BASE_GPU_DEMAND_ANNUAL);
      expect(calculateMarketDemand(2000)).toBe(BASE_GPU_DEMAND_ANNUAL);
    });

    it('returns integer (no fractional units)', () => {
      expect(Number.isInteger(calculateMarketDemand(2022))).toBe(true);
      expect(Number.isInteger(calculateMarketDemand(2023))).toBe(true);
      expect(Number.isInteger(calculateMarketDemand(2030))).toBe(true);
    });

    it('demand grows ~3% per year', () => {
      const demand2022 = calculateMarketDemand(2022);
      const demand2023 = calculateMarketDemand(2023);
      const growthRate = (demand2023 - demand2022) / demand2022;
      // Should be approximately 3% (within rounding tolerance)
      expect(growthRate).toBeCloseTo(0.03, 2);
    });
  });

  describe('JSON Serializability (AC 21)', () => {
    it('MARKET_SEGMENTS is JSON-serializable', () => {
      const serialized = JSON.stringify(MARKET_SEGMENTS);
      const deserialized = JSON.parse(serialized);

      expect(deserialized.budget.maxPrice).toBe(MARKET_SEGMENTS.budget.maxPrice);
      expect(deserialized.midrange.demandShare).toBe(MARKET_SEGMENTS.midrange.demandShare);
      expect(deserialized.highend.perfWeight).toBe(MARKET_SEGMENTS.highend.perfWeight);
    });

    it('all constants are JSON-serializable', () => {
      const constants = {
        USA_POPULATION_2022,
        BASE_GPU_DEMAND_ANNUAL,
        POPULATION_GROWTH_RATE,
        GPU_DEMAND_GROWTH_RATE,
        MARKET_SEGMENTS
      };

      const serialized = JSON.stringify(constants);
      const deserialized = JSON.parse(serialized);

      expect(deserialized.USA_POPULATION_2022).toBe(USA_POPULATION_2022);
      expect(deserialized.BASE_GPU_DEMAND_ANNUAL).toBe(BASE_GPU_DEMAND_ANNUAL);
    });
  });
});
