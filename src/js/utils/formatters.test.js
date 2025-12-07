/**
 * Tests for formatting utility functions.
 * @module utils/formatters.test
 */

import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPercent, formatDate, formatDetailedTime, formatNumber } from './formatters.js';

describe('formatCurrency', () => {
  // AC 3: Trillion support (late-game)
  describe('trillions', () => {
    it('formats 1 trillion correctly', () => {
      expect(formatCurrency(1_000_000_000_000)).toBe('$1.00T');
    });

    it('formats 1.5 trillion correctly (AC 3)', () => {
      expect(formatCurrency(1_500_000_000_000)).toBe('$1.50T');
    });

    it('formats 999 trillion correctly', () => {
      expect(formatCurrency(999_000_000_000_000)).toBe('$999.00T');
    });

    it('formats 5.5 trillion correctly', () => {
      expect(formatCurrency(5_500_000_000_000)).toBe('$5.50T');
    });
  });

  // AC 2: Billions
  describe('billions', () => {
    it('formats 1 billion correctly', () => {
      expect(formatCurrency(1_000_000_000)).toBe('$1.00B');
    });

    it('formats 1.23 billion correctly (AC 2)', () => {
      expect(formatCurrency(1_234_567_890)).toBe('$1.23B');
    });

    it('formats 999 billion correctly', () => {
      expect(formatCurrency(999_000_000_000)).toBe('$999.00B');
    });

    it('formats 5.5 billion correctly', () => {
      expect(formatCurrency(5_500_000_000)).toBe('$5.50B');
    });
  });

  // AC 1: Millions
  describe('millions', () => {
    it('formats 1 million correctly', () => {
      expect(formatCurrency(1_000_000)).toBe('$1.00M');
    });

    it('formats 1.23 million correctly (AC 1)', () => {
      expect(formatCurrency(1_234_567)).toBe('$1.23M');
    });

    it('formats 50 million correctly', () => {
      expect(formatCurrency(50_000_000)).toBe('$50.00M');
    });

    it('formats 999.99 million correctly', () => {
      expect(formatCurrency(999_990_000)).toBe('$999.99M');
    });
  });

  // AC 4: Thousands with commas
  describe('thousands', () => {
    it('formats 1,234 correctly (AC 4)', () => {
      expect(formatCurrency(1_234)).toBe('$1,234');
    });

    it('formats 12,345 correctly', () => {
      expect(formatCurrency(12_345)).toBe('$12,345');
    });

    it('formats 123,456 correctly', () => {
      expect(formatCurrency(123_456)).toBe('$123,456');
    });

    it('formats 999,999 correctly', () => {
      expect(formatCurrency(999_999)).toBe('$999,999');
    });
  });

  // AC 5: Zero and small values
  describe('small values and zero', () => {
    it('formats zero correctly (AC 5)', () => {
      expect(formatCurrency(0)).toBe('$0');
    });

    it('formats 1 correctly', () => {
      expect(formatCurrency(1)).toBe('$1');
    });

    it('formats 999 correctly', () => {
      expect(formatCurrency(999)).toBe('$999');
    });

    it('formats 100 correctly', () => {
      expect(formatCurrency(100)).toBe('$100');
    });

    it('rounds decimal values to 2 places', () => {
      expect(formatCurrency(99.999)).toBe('$100');
      expect(formatCurrency(1.234)).toBe('$1.23');
      expect(formatCurrency(1.235)).toBe('$1.24');
    });

    it('shows minimum $0.01 for very small positive values', () => {
      expect(formatCurrency(0.001)).toBe('$0.01');
      expect(formatCurrency(0.0001)).toBe('$0.01');
      expect(formatCurrency(0.009)).toBe('$0.01');
    });

    it('formats $0.01 correctly', () => {
      expect(formatCurrency(0.01)).toBe('$0.01');
    });

    it('formats cents correctly', () => {
      expect(formatCurrency(0.50)).toBe('$0.50');
      expect(formatCurrency(0.99)).toBe('$0.99');
    });
  });

  // System limits
  describe('system limits', () => {
    it('caps at 999T maximum', () => {
      expect(formatCurrency(999_999_999_999_999)).toBe('$999.99T');
    });

    it('caps values above 999T to 999T', () => {
      expect(formatCurrency(1_000_000_000_000_000)).toBe('$999.99T');
      expect(formatCurrency(1e18)).toBe('$999.99T');
    });

    it('handles floating point precision at trillion boundary', () => {
      expect(formatCurrency(999_000_000_000_000)).toBe('$999.00T');
      expect(formatCurrency(500_500_000_000_000)).toBe('$500.50T');
    });
  });

  // AC 6: Invalid input handling
  describe('input validation', () => {
    it('returns $-- for string input (AC 6)', () => {
      expect(formatCurrency('invalid')).toBe('$--');
    });

    it('returns $-- for NaN', () => {
      expect(formatCurrency(NaN)).toBe('$--');
    });

    it('returns $-- for undefined', () => {
      expect(formatCurrency(undefined)).toBe('$--');
    });

    it('returns $-- for null', () => {
      expect(formatCurrency(null)).toBe('$--');
    });

    it('returns $-- for object', () => {
      expect(formatCurrency({})).toBe('$--');
    });

    it('returns $-- for array', () => {
      expect(formatCurrency([])).toBe('$--');
    });

    it('returns $-- for Infinity', () => {
      expect(formatCurrency(Infinity)).toBe('$--');
    });

    it('returns $-- for -Infinity', () => {
      expect(formatCurrency(-Infinity)).toBe('$--');
    });
  });

  // Negative values
  describe('negative values', () => {
    it('formats negative millions', () => {
      expect(formatCurrency(-5_000_000)).toBe('-$5.00M');
    });

    it('formats negative billions', () => {
      expect(formatCurrency(-2_500_000_000)).toBe('-$2.50B');
    });

    it('formats negative trillions', () => {
      expect(formatCurrency(-1_500_000_000_000)).toBe('-$1.50T');
    });

    it('formats negative thousands', () => {
      expect(formatCurrency(-12_345)).toBe('-$12,345');
    });

    it('formats negative small values', () => {
      expect(formatCurrency(-100)).toBe('-$100');
    });
  });
});

describe('formatPercent', () => {
  // AC 7: Positive values with + sign
  describe('positive values', () => {
    it('shows + for positive values (AC 7)', () => {
      expect(formatPercent(0.1234)).toBe('+12.34%');
    });

    it('shows + for 10%', () => {
      expect(formatPercent(0.1)).toBe('+10.00%');
    });

    it('shows + for 100%', () => {
      expect(formatPercent(1)).toBe('+100.00%');
    });
  });

  // AC 8: Negative values with - sign
  describe('negative values', () => {
    it('shows - for negative values (AC 8)', () => {
      expect(formatPercent(-0.05)).toBe('-5.00%');
    });

    it('shows - for -25%', () => {
      expect(formatPercent(-0.25)).toBe('-25.00%');
    });

    it('shows - for -100%', () => {
      expect(formatPercent(-1)).toBe('-100.00%');
    });
  });

  // AC 9: Zero with no sign
  describe('zero', () => {
    it('shows no sign for zero (AC 9)', () => {
      expect(formatPercent(0)).toBe('0.00%');
    });
  });

  // AC 10: Very small positive values
  describe('very small values', () => {
    it('shows <0.01% for very small positive values (AC 10)', () => {
      expect(formatPercent(0.000001)).toBe('<0.01%');
    });

    it('shows <0.01% for 0.00005 (below threshold)', () => {
      expect(formatPercent(0.00005)).toBe('<0.01%');
    });

    it('shows >-0.01% for very small negative values', () => {
      expect(formatPercent(-0.000001)).toBe('>-0.01%');
    });

    it('shows >-0.01% for -0.00005 (below threshold)', () => {
      expect(formatPercent(-0.00005)).toBe('>-0.01%');
    });

    it('shows normal value at positive threshold boundary', () => {
      expect(formatPercent(0.0001)).toBe('+0.01%');
    });

    it('shows normal value at negative threshold boundary', () => {
      expect(formatPercent(-0.0001)).toBe('-0.01%');
    });
  });

  // AC 11: Invalid input handling
  describe('input validation', () => {
    it('returns --% for string input (AC 11)', () => {
      expect(formatPercent('invalid')).toBe('--%');
    });

    it('returns --% for NaN', () => {
      expect(formatPercent(NaN)).toBe('--%');
    });

    it('returns --% for undefined', () => {
      expect(formatPercent(undefined)).toBe('--%');
    });

    it('returns --% for null', () => {
      expect(formatPercent(null)).toBe('--%');
    });

    it('returns --% for object', () => {
      expect(formatPercent({})).toBe('--%');
    });

    it('returns --% for Infinity', () => {
      expect(formatPercent(Infinity)).toBe('--%');
    });

    it('returns --% for -Infinity', () => {
      expect(formatPercent(-Infinity)).toBe('--%');
    });
  });

  // Options
  describe('options', () => {
    it('respects showSign: false option', () => {
      expect(formatPercent(0.1234, { showSign: false })).toBe('12.34%');
    });

    it('respects showSign: false for negative values', () => {
      expect(formatPercent(-0.1234, { showSign: false })).toBe('-12.34%');
    });

    it('respects decimals option', () => {
      expect(formatPercent(0.12345, { decimals: 3 })).toBe('+12.345%');
    });

    it('respects decimals: 0 option', () => {
      expect(formatPercent(0.125, { decimals: 0 })).toBe('+13%');
    });

    it('respects both options together', () => {
      expect(formatPercent(0.12345, { showSign: false, decimals: 1 })).toBe('12.3%');
    });
  });
});

// AC 12: Date formatting
describe('formatDate', () => {
  it('formats Q1 2022 correctly (AC 12)', () => {
    expect(formatDate({ currentQuarter: 1, currentYear: 2022 })).toBe('Q1 2022');
  });

  it('formats Q2 2023 correctly', () => {
    expect(formatDate({ currentQuarter: 2, currentYear: 2023 })).toBe('Q2 2023');
  });

  it('formats Q3 2024 correctly', () => {
    expect(formatDate({ currentQuarter: 3, currentYear: 2024 })).toBe('Q3 2024');
  });

  it('formats Q4 2030 correctly', () => {
    expect(formatDate({ currentQuarter: 4, currentYear: 2030 })).toBe('Q4 2030');
  });

  describe('invalid input handling', () => {
    it('returns --- for null', () => {
      expect(formatDate(null)).toBe('---');
    });

    it('returns --- for undefined', () => {
      expect(formatDate(undefined)).toBe('---');
    });

    it('returns --- for empty object', () => {
      expect(formatDate({})).toBe('---');
    });

    it('returns --- for missing currentQuarter', () => {
      expect(formatDate({ currentYear: 2022 })).toBe('---');
    });

    it('returns --- for missing currentYear', () => {
      expect(formatDate({ currentQuarter: 1 })).toBe('---');
    });

    it('returns --- for non-number quarter', () => {
      expect(formatDate({ currentQuarter: 'Q1', currentYear: 2022 })).toBe('---');
    });

    it('returns --- for non-number year', () => {
      expect(formatDate({ currentQuarter: 1, currentYear: '2022' })).toBe('---');
    });
  });
});

// Detailed time formatting (Story 2.1 enhancement)
describe('formatDetailedTime', () => {
  it('formats M01 D01 H00 correctly (initial state)', () => {
    expect(formatDetailedTime({ currentMonth: 1, currentDay: 1, currentHour: 0 })).toBe('M01 D01 H00');
  });

  it('formats M03 D15 H08 correctly', () => {
    expect(formatDetailedTime({ currentMonth: 3, currentDay: 15, currentHour: 8 })).toBe('M03 D15 H08');
  });

  it('formats M12 D30 H23 correctly (end of year)', () => {
    expect(formatDetailedTime({ currentMonth: 12, currentDay: 30, currentHour: 23 })).toBe('M12 D30 H23');
  });

  it('pads single-digit months with leading zero', () => {
    expect(formatDetailedTime({ currentMonth: 1, currentDay: 15, currentHour: 12 })).toBe('M01 D15 H12');
    expect(formatDetailedTime({ currentMonth: 9, currentDay: 15, currentHour: 12 })).toBe('M09 D15 H12');
  });

  it('pads single-digit days with leading zero', () => {
    expect(formatDetailedTime({ currentMonth: 1, currentDay: 5, currentHour: 12 })).toBe('M01 D05 H12');
  });

  it('pads single-digit hours with leading zero', () => {
    expect(formatDetailedTime({ currentMonth: 6, currentDay: 20, currentHour: 3 })).toBe('M06 D20 H03');
  });

  describe('invalid input handling', () => {
    it('returns --- for null', () => {
      expect(formatDetailedTime(null)).toBe('---');
    });

    it('returns --- for undefined', () => {
      expect(formatDetailedTime(undefined)).toBe('---');
    });

    it('returns --- for empty object', () => {
      expect(formatDetailedTime({})).toBe('---');
    });

    it('returns --- for missing currentMonth', () => {
      expect(formatDetailedTime({ currentDay: 1, currentHour: 0 })).toBe('---');
    });

    it('returns --- for missing currentDay', () => {
      expect(formatDetailedTime({ currentMonth: 1, currentHour: 0 })).toBe('---');
    });

    it('returns --- for missing currentHour', () => {
      expect(formatDetailedTime({ currentMonth: 1, currentDay: 1 })).toBe('---');
    });

    it('returns --- for non-number month', () => {
      expect(formatDetailedTime({ currentMonth: 'Jan', currentDay: 1, currentHour: 0 })).toBe('---');
    });
  });
});

// AC 13: Number formatting (no currency symbol)
describe('formatNumber', () => {
  describe('trillions', () => {
    it('formats 1.5 trillion correctly (AC 13 pattern)', () => {
      expect(formatNumber(1_500_000_000_000)).toBe('1.50T');
    });

    it('formats 1 trillion correctly', () => {
      expect(formatNumber(1_000_000_000_000)).toBe('1.00T');
    });
  });

  describe('billions', () => {
    it('formats 1.23 billion correctly', () => {
      expect(formatNumber(1_234_567_890)).toBe('1.23B');
    });

    it('formats 1 billion correctly', () => {
      expect(formatNumber(1_000_000_000)).toBe('1.00B');
    });
  });

  describe('millions', () => {
    it('formats 1.5 million correctly (AC 13)', () => {
      expect(formatNumber(1_500_000)).toBe('1.50M');
    });

    it('formats 1 million correctly', () => {
      expect(formatNumber(1_000_000)).toBe('1.00M');
    });
  });

  describe('thousands', () => {
    it('formats thousands with commas', () => {
      expect(formatNumber(12_345)).toBe('12,345');
    });

    it('formats 1,234 correctly', () => {
      expect(formatNumber(1_234)).toBe('1,234');
    });
  });

  describe('small values', () => {
    it('formats zero correctly', () => {
      expect(formatNumber(0)).toBe('0');
    });

    it('formats 1 correctly', () => {
      expect(formatNumber(1)).toBe('1');
    });

    it('formats 999 correctly', () => {
      expect(formatNumber(999)).toBe('999');
    });

    it('rounds decimal values to 2 places', () => {
      expect(formatNumber(99.999)).toBe('100');
      expect(formatNumber(1.234)).toBe('1.23');
      expect(formatNumber(1.235)).toBe('1.24');
    });

    it('shows minimum 0.01 for very small positive values', () => {
      expect(formatNumber(0.001)).toBe('0.01');
      expect(formatNumber(0.0001)).toBe('0.01');
    });

    it('formats 0.01 correctly', () => {
      expect(formatNumber(0.01)).toBe('0.01');
    });

    it('formats decimals correctly', () => {
      expect(formatNumber(0.50)).toBe('0.50');
      expect(formatNumber(0.99)).toBe('0.99');
    });
  });

  // System limits
  describe('system limits', () => {
    it('caps at 999T maximum', () => {
      expect(formatNumber(999_999_999_999_999)).toBe('999.99T');
    });

    it('caps values above 999T to 999T', () => {
      expect(formatNumber(1_000_000_000_000_000)).toBe('999.99T');
      expect(formatNumber(1e18)).toBe('999.99T');
    });

    it('handles floating point precision at trillion boundary', () => {
      expect(formatNumber(999_000_000_000_000)).toBe('999.00T');
      expect(formatNumber(500_500_000_000_000)).toBe('500.50T');
    });
  });

  describe('negative values', () => {
    it('formats negative millions correctly', () => {
      expect(formatNumber(-5_000_000)).toBe('-5.00M');
    });

    it('formats negative billions correctly', () => {
      expect(formatNumber(-2_500_000_000)).toBe('-2.50B');
    });

    it('formats negative thousands correctly', () => {
      expect(formatNumber(-12_345)).toBe('-12,345');
    });
  });

  describe('input validation', () => {
    it('returns -- for string input', () => {
      expect(formatNumber('invalid')).toBe('--');
    });

    it('returns -- for NaN', () => {
      expect(formatNumber(NaN)).toBe('--');
    });

    it('returns -- for undefined', () => {
      expect(formatNumber(undefined)).toBe('--');
    });

    it('returns -- for null', () => {
      expect(formatNumber(null)).toBe('--');
    });

    it('returns -- for object', () => {
      expect(formatNumber({})).toBe('--');
    });

    it('returns -- for Infinity', () => {
      expect(formatNumber(Infinity)).toBe('--');
    });

    it('returns -- for -Infinity', () => {
      expect(formatNumber(-Infinity)).toBe('--');
    });
  });
});
