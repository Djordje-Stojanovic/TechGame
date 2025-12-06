/**
 * Tests for math utility functions.
 * @module utils/math.test
 */

import { describe, it, expect } from 'vitest';
import { clamp, lerp, randomInRange, roundTo } from './math.js';

// AC 14-16: clamp function
describe('clamp', () => {
  // AC 14: value > max returns max
  it('returns max when value exceeds max (AC 14)', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  // AC 15: value < min returns min
  it('returns min when value below min (AC 15)', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  // AC 16: value in range returns value
  it('returns value when within range (AC 16)', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('handles edge value exactly at min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('handles edge value exactly at max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('handles min > max by swapping', () => {
    expect(clamp(5, 10, 0)).toBe(5); // Should treat as clamp(5, 0, 10)
  });

  it('handles min > max with value below actual min', () => {
    expect(clamp(-5, 10, 0)).toBe(0); // Should clamp to 0
  });

  it('handles min > max with value above actual max', () => {
    expect(clamp(15, 10, 0)).toBe(10); // Should clamp to 10
  });

  it('handles negative range', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
  });

  it('clamps to min in negative range', () => {
    expect(clamp(-15, -10, -1)).toBe(-10);
  });

  it('clamps to max in negative range', () => {
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  it('handles floating point values', () => {
    expect(clamp(5.5, 0, 10)).toBe(5.5);
    expect(clamp(10.5, 0, 10)).toBe(10);
    expect(clamp(-0.5, 0, 10)).toBe(0);
  });
});

// AC 17-19: lerp function
describe('lerp', () => {
  // AC 18: t=0 returns start
  it('returns start when t=0 (AC 18)', () => {
    expect(lerp(0, 100, 0)).toBe(0);
  });

  // AC 19: t=1 returns end
  it('returns end when t=1 (AC 19)', () => {
    expect(lerp(0, 100, 1)).toBe(100);
  });

  // AC 17: t=0.5 returns midpoint
  it('returns midpoint when t=0.5 (AC 17)', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
  });

  it('returns 25% when t=0.25', () => {
    expect(lerp(0, 100, 0.25)).toBe(25);
  });

  it('returns 75% when t=0.75', () => {
    expect(lerp(0, 100, 0.75)).toBe(75);
  });

  it('extrapolates beyond t=1', () => {
    expect(lerp(0, 100, 1.5)).toBe(150);
  });

  it('extrapolates below t=0', () => {
    expect(lerp(0, 100, -0.5)).toBe(-50);
  });

  it('handles negative start/end values', () => {
    expect(lerp(-100, 100, 0.5)).toBe(0);
  });

  it('handles both negative start and end', () => {
    expect(lerp(-50, -10, 0.5)).toBe(-30);
  });

  it('handles start > end (reverse interpolation)', () => {
    expect(lerp(100, 0, 0.5)).toBe(50);
    expect(lerp(100, 0, 0)).toBe(100);
    expect(lerp(100, 0, 1)).toBe(0);
  });

  it('handles floating point precision', () => {
    expect(lerp(0, 1, 0.333)).toBeCloseTo(0.333, 10);
  });
});

// AC 20: randomInRange function
describe('randomInRange', () => {
  it('produces values within range (AC 20 - 100+ iterations)', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInRange(0, 10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    }
  });

  it('works with integer min/max', () => {
    for (let i = 0; i < 50; i++) {
      const result = randomInRange(5, 15);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThan(15);
    }
  });

  it('works with negative ranges', () => {
    for (let i = 0; i < 50; i++) {
      const result = randomInRange(-10, -5);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThan(-5);
    }
  });

  it('works with mixed positive/negative range', () => {
    for (let i = 0; i < 50; i++) {
      const result = randomInRange(-5, 5);
      expect(result).toBeGreaterThanOrEqual(-5);
      expect(result).toBeLessThan(5);
    }
  });

  it('works with floating point bounds', () => {
    for (let i = 0; i < 50; i++) {
      const result = randomInRange(0.5, 1.5);
      expect(result).toBeGreaterThanOrEqual(0.5);
      expect(result).toBeLessThan(1.5);
    }
  });

  it('produces different values (not always same)', () => {
    const results = new Set();
    for (let i = 0; i < 20; i++) {
      results.add(randomInRange(0, 100));
    }
    // Should have multiple unique values (extremely unlikely to get same value 20 times)
    expect(results.size).toBeGreaterThan(1);
  });
});

// AC 21: roundTo function
describe('roundTo', () => {
  it('rounds to 2 decimal places (AC 21)', () => {
    expect(roundTo(1.2345, 2)).toBe(1.23);
  });

  it('rounds up correctly', () => {
    expect(roundTo(1.999, 1)).toBe(2.0);
  });

  it('rounds to 0 decimal places', () => {
    expect(roundTo(1.5, 0)).toBe(2);
    expect(roundTo(1.4, 0)).toBe(1);
  });

  it('rounds to 1 decimal place', () => {
    expect(roundTo(1.25, 1)).toBe(1.3);
    expect(roundTo(1.24, 1)).toBe(1.2);
  });

  it('rounds to 3 decimal places', () => {
    expect(roundTo(1.23456, 3)).toBe(1.235);
  });

  it('handles negative values', () => {
    expect(roundTo(-1.2345, 2)).toBe(-1.23);
  });

  it('handles negative values rounding up', () => {
    expect(roundTo(-1.235, 2)).toBe(-1.24);
  });

  it('handles zero', () => {
    expect(roundTo(0, 2)).toBe(0);
  });

  it('handles large values', () => {
    expect(roundTo(12345.6789, 2)).toBe(12345.68);
  });

  it('handles already rounded values', () => {
    expect(roundTo(1.23, 2)).toBe(1.23);
    expect(roundTo(5, 2)).toBe(5);
  });

  // Floating point precision edge cases
  it('handles floating point precision for 1.005', () => {
    // This is the classic JavaScript floating point bug
    // 1.005 is stored as 1.00499999... so naive rounding gives 1.00
    expect(roundTo(1.005, 2)).toBe(1.01);
  });

  it('handles floating point precision for 2.675', () => {
    expect(roundTo(2.675, 2)).toBe(2.68);
  });

  it('handles floating point precision for 1.255', () => {
    expect(roundTo(1.255, 2)).toBe(1.26);
  });
});
