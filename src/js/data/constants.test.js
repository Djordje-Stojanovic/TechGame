// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import {
  HOURS_PER_DAY, DAYS_PER_MONTH, MONTHS_PER_YEAR,
  MONTHS_PER_QUARTER, DAYS_PER_QUARTER, HOURS_PER_QUARTER,
  TICK_SPEEDS, DEFAULT_TICK_SPEED,
  STARTING_YEAR, STARTING_QUARTER, STARTING_CASH,
  VIEWS, DEFAULT_VIEW,
  BUDGET_MAX_PRICE, MIDRANGE_MAX_PRICE,
  COMPANY_IDS, SEGMENT_KEYS
} from './constants.js';

describe('constants.js', () => {
  describe('Time Constants (AC 2)', () => {
    it('HOURS_PER_DAY equals 24', () => {
      expect(HOURS_PER_DAY).toBe(24);
    });

    it('DAYS_PER_MONTH equals 30', () => {
      expect(DAYS_PER_MONTH).toBe(30);
    });

    it('MONTHS_PER_YEAR equals 12', () => {
      expect(MONTHS_PER_YEAR).toBe(12);
    });

    it('MONTHS_PER_QUARTER equals 3', () => {
      expect(MONTHS_PER_QUARTER).toBe(3);
    });

    it('DAYS_PER_QUARTER is derived correctly (90)', () => {
      expect(DAYS_PER_QUARTER).toBe(DAYS_PER_MONTH * MONTHS_PER_QUARTER);
      expect(DAYS_PER_QUARTER).toBe(90);
    });

    it('HOURS_PER_QUARTER is derived correctly (2160)', () => {
      expect(HOURS_PER_QUARTER).toBe(HOURS_PER_DAY * DAYS_PER_QUARTER);
      expect(HOURS_PER_QUARTER).toBe(2160);
    });

    it('all time constants are numbers', () => {
      expect(typeof HOURS_PER_DAY).toBe('number');
      expect(typeof DAYS_PER_MONTH).toBe('number');
      expect(typeof MONTHS_PER_YEAR).toBe('number');
      expect(typeof MONTHS_PER_QUARTER).toBe('number');
      expect(typeof DAYS_PER_QUARTER).toBe('number');
      expect(typeof HOURS_PER_QUARTER).toBe('number');
    });
  });

  describe('Tick Speed Constants (AC 3)', () => {
    it('TICK_SPEEDS is [1, 2, 4]', () => {
      expect(TICK_SPEEDS).toEqual([1, 2, 4]);
    });

    it('TICK_SPEEDS is an array', () => {
      expect(Array.isArray(TICK_SPEEDS)).toBe(true);
    });

    it('DEFAULT_TICK_SPEED is in TICK_SPEEDS', () => {
      expect(TICK_SPEEDS).toContain(DEFAULT_TICK_SPEED);
    });

    it('DEFAULT_TICK_SPEED equals 1', () => {
      expect(DEFAULT_TICK_SPEED).toBe(1);
    });
  });

  describe('Starting Conditions (AC 1, 4, 5)', () => {
    it('STARTING_CASH equals $10M (AC 1)', () => {
      expect(STARTING_CASH).toBe(10_000_000);
    });

    it('STARTING_YEAR equals 2022 (AC 4)', () => {
      expect(STARTING_YEAR).toBe(2022);
    });

    it('STARTING_QUARTER equals 1 (AC 5)', () => {
      expect(STARTING_QUARTER).toBe(1);
    });

    it('all starting conditions are numbers', () => {
      expect(typeof STARTING_CASH).toBe('number');
      expect(typeof STARTING_YEAR).toBe('number');
      expect(typeof STARTING_QUARTER).toBe('number');
    });
  });

  describe('View Constants (AC 6)', () => {
    it('VIEWS includes all expected views', () => {
      expect(VIEWS).toContain('dashboard');
      expect(VIEWS).toContain('market');
      expect(VIEWS).toContain('design');
      expect(VIEWS).toContain('competitors');
      expect(VIEWS).toContain('financials');
    });

    it('VIEWS has exactly 5 entries', () => {
      expect(VIEWS).toHaveLength(5);
    });

    it('VIEWS equals exact expected array', () => {
      expect(VIEWS).toEqual(['dashboard', 'market', 'design', 'competitors', 'financials']);
    });

    it('DEFAULT_VIEW is dashboard', () => {
      expect(DEFAULT_VIEW).toBe('dashboard');
    });

    it('DEFAULT_VIEW is in VIEWS', () => {
      expect(VIEWS).toContain(DEFAULT_VIEW);
    });

    it('VIEWS is an array of strings', () => {
      expect(Array.isArray(VIEWS)).toBe(true);
      VIEWS.forEach(view => {
        expect(typeof view).toBe('string');
      });
    });
  });

  describe('Segment Price Boundaries (AC 7)', () => {
    it('BUDGET_MAX_PRICE equals 299', () => {
      expect(BUDGET_MAX_PRICE).toBe(299);
    });

    it('MIDRANGE_MAX_PRICE equals 599', () => {
      expect(MIDRANGE_MAX_PRICE).toBe(599);
    });

    it('BUDGET_MAX_PRICE is less than MIDRANGE_MAX_PRICE', () => {
      expect(BUDGET_MAX_PRICE).toBeLessThan(MIDRANGE_MAX_PRICE);
    });

    it('price boundaries are positive numbers', () => {
      expect(BUDGET_MAX_PRICE).toBeGreaterThan(0);
      expect(MIDRANGE_MAX_PRICE).toBeGreaterThan(0);
    });
  });

  describe('Company Identifiers (AC 8)', () => {
    it('COMPANY_IDS includes all companies', () => {
      expect(COMPANY_IDS).toContain('player');
      expect(COMPANY_IDS).toContain('nvidia');
      expect(COMPANY_IDS).toContain('amd');
      expect(COMPANY_IDS).toContain('intel');
    });

    it('COMPANY_IDS has exactly 4 entries', () => {
      expect(COMPANY_IDS).toHaveLength(4);
    });

    it('COMPANY_IDS equals exact expected array', () => {
      expect(COMPANY_IDS).toEqual(['player', 'nvidia', 'amd', 'intel']);
    });

    it('COMPANY_IDS is an array of strings', () => {
      expect(Array.isArray(COMPANY_IDS)).toBe(true);
      COMPANY_IDS.forEach(id => {
        expect(typeof id).toBe('string');
      });
    });
  });

  describe('Segment Identifiers (AC 8)', () => {
    it('SEGMENT_KEYS includes all segments', () => {
      expect(SEGMENT_KEYS).toContain('budget');
      expect(SEGMENT_KEYS).toContain('midrange');
      expect(SEGMENT_KEYS).toContain('highend');
    });

    it('SEGMENT_KEYS has exactly 3 entries', () => {
      expect(SEGMENT_KEYS).toHaveLength(3);
    });

    it('SEGMENT_KEYS order matches price tiers (low to high)', () => {
      expect(SEGMENT_KEYS).toEqual(['budget', 'midrange', 'highend']);
    });

    it('SEGMENT_KEYS is an array of strings', () => {
      expect(Array.isArray(SEGMENT_KEYS)).toBe(true);
      SEGMENT_KEYS.forEach(key => {
        expect(typeof key).toBe('string');
      });
    });
  });

  describe('JSON Serializability (AC 21)', () => {
    it('all constants are JSON-serializable', () => {
      const constants = {
        HOURS_PER_DAY,
        DAYS_PER_MONTH,
        MONTHS_PER_YEAR,
        MONTHS_PER_QUARTER,
        DAYS_PER_QUARTER,
        HOURS_PER_QUARTER,
        TICK_SPEEDS,
        DEFAULT_TICK_SPEED,
        STARTING_YEAR,
        STARTING_QUARTER,
        STARTING_CASH,
        VIEWS,
        DEFAULT_VIEW,
        BUDGET_MAX_PRICE,
        MIDRANGE_MAX_PRICE,
        COMPANY_IDS,
        SEGMENT_KEYS
      };

      const serialized = JSON.stringify(constants);
      const deserialized = JSON.parse(serialized);

      expect(deserialized.HOURS_PER_DAY).toBe(HOURS_PER_DAY);
      expect(deserialized.TICK_SPEEDS).toEqual(TICK_SPEEDS);
      expect(deserialized.VIEWS).toEqual(VIEWS);
      expect(deserialized.COMPANY_IDS).toEqual(COMPANY_IDS);
      expect(deserialized.SEGMENT_KEYS).toEqual(SEGMENT_KEYS);
    });
  });
});
