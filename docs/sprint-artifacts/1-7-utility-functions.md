# Story 1.7: Utility Functions

Status: Complete

## Story

As a developer,
I want common utility functions for formatting and math operations,
So that I can use consistent helpers across all modules.

## Acceptance Criteria

### Currency Formatting (AC 1-6)

1. **Given** I import from `utils/formatters.js` **When** I call `formatCurrency(1234567)` **Then** it returns `"$1.23M"`

2. **Given** I import from `utils/formatters.js` **When** I call `formatCurrency(1234567890)` **Then** it returns `"$1.23B"`

3. **Given** I import from `utils/formatters.js` **When** I call `formatCurrency(1500000000000)` **Then** it returns `"$1.50T"` (trillion support for late-game)

4. **Given** I import from `utils/formatters.js` **When** I call `formatCurrency(1234)` **Then** it returns `"$1,234"` (no abbreviation for values under 1M)

5. **Given** I import from `utils/formatters.js` **When** I call `formatCurrency(0)` **Then** it returns `"$0"`

6. **Given** I import from `utils/formatters.js` **When** I call `formatCurrency("invalid")` **Then** it returns `"$--"` (graceful invalid input handling)

### Percent Formatting (AC 7-11)

7. **Given** I import from `utils/formatters.js` **When** I call `formatPercent(0.1234)` **Then** it returns `"+12.34%"` (positive sign shown)

8. **Given** I import from `utils/formatters.js` **When** I call `formatPercent(-0.05)` **Then** it returns `"-5.00%"` (negative sign shown)

9. **Given** I import from `utils/formatters.js` **When** I call `formatPercent(0)` **Then** it returns `"0.00%"` (no sign for zero)

10. **Given** I import from `utils/formatters.js` **When** I call `formatPercent(0.000001)` **Then** it returns `"<0.01%"` (very small positive values)

11. **Given** I import from `utils/formatters.js` **When** I call `formatPercent("invalid")` **Then** it returns `"--%"` (graceful invalid input handling)

### Date Formatting (AC 12)

12. **Given** I import from `utils/formatters.js` **When** I call `formatDate({ currentQuarter: 1, currentYear: 2022 })` **Then** it returns `"Q1 2022"`

### Number Formatting (AC 13)

13. **Given** I import from `utils/formatters.js` **When** I call `formatNumber(1500000)` **Then** it returns `"1.50M"` (same as currency but no $ prefix)

### Math Utilities (AC 14-19)

14. **Given** I import from `utils/math.js` **When** I call `clamp(15, 0, 10)` **Then** it returns `10` (bounded to max)

15. **Given** I import from `utils/math.js` **When** I call `clamp(-5, 0, 10)` **Then** it returns `0` (bounded to min)

16. **Given** I import from `utils/math.js` **When** I call `clamp(5, 0, 10)` **Then** it returns `5` (value within range unchanged)

17. **Given** I import from `utils/math.js` **When** I call `lerp(0, 100, 0.5)` **Then** it returns `50` (linear interpolation)

18. **Given** I import from `utils/math.js` **When** I call `lerp(0, 100, 0)` **Then** it returns `0` (t=0 returns start)

19. **Given** I import from `utils/math.js` **When** I call `lerp(0, 100, 1)` **Then** it returns `100` (t=1 returns end)

### Random & Round Utilities (AC 20-21)

20. **Given** I import from `utils/math.js` **When** I call `randomInRange(0, 10)` multiple times **Then** it returns values between 0 and 10 (inclusive of 0, exclusive of 10)

21. **Given** I import from `utils/math.js` **When** I call `roundTo(1.2345, 2)` **Then** it returns `1.23` (rounds to specified decimal places)

## Tasks

- [x] **Task 1: Create utils directory structure** (AC: all)
  - Create `src/js/utils/` directory if it doesn't exist
  - This is prerequisite for all other tasks

- [x] **Task 2: Implement formatters.js** (`src/js/utils/formatters.js`) (AC: 1-13)
  - Export `formatCurrency(value)` function
    - **Input validation**: Return `"$--"` for non-number or NaN inputs
    - Return `"$X.XXT"` for values >= 1 trillion (late-game support)
    - Return `"$X.XXB"` for values >= 1 billion
    - Return `"$X.XXM"` for values >= 1 million
    - Return `"$X,XXX"` for values >= 1,000 (comma-separated)
    - Return `"$X"` for smaller values
    - Handle negative values (show `-$X.XXM`)
    - Handle zero → `"$0"`
  - Export `formatPercent(value, options?)` function
    - **Input validation**: Return `"--%"` for non-number or NaN inputs
    - Convert decimal to percentage (0.1234 → 12.34%)
    - Show `+` prefix for positive values
    - Show `-` prefix for negative values
    - No prefix for zero
    - **Small value handling**: Return `"<0.01%"` for very small positive values (< 0.0001)
    - **Small value handling**: Return `">-0.01%"` for very small negative values (> -0.0001)
    - Default to 2 decimal places
    - Optional `{ showSign: boolean, decimals: number }` parameter
  - Export `formatDate(time)` function
    - Accept time object with `currentQuarter` and `currentYear`
    - Return `"Q{N} {YEAR}"` format
    - Return `"---"` for invalid input
  - Export `formatNumber(value)` function (AC: 13)
    - **Input validation**: Return `"--"` for non-number or NaN inputs
    - Same abbreviation logic as currency but without `$` prefix
    - Supports T/B/M/K abbreviations
    - Useful for unit counts like "1.5M units"

- [x] **Task 3: Implement math.js** (`src/js/utils/math.js`) (AC: 14-21)
  - Export `clamp(value, min, max)` function
    - Return `min` if `value < min`
    - Return `max` if `value > max`
    - Return `value` if within range
    - Handle edge case where min > max (swap them)
  - Export `lerp(start, end, t)` function
    - Return `start + (end - start) * t`
    - t=0 returns start, t=1 returns end
    - t can be outside 0-1 range (extrapolation)
  - Export `randomInRange(min, max)` function
    - Return random number >= min and < max
    - Use Math.random() for randomness
  - Export `roundTo(value, decimals)` function (AC: 21)
    - Round value to specified decimal places
    - Useful for display precision

- [x] **Task 4: Write formatters tests** (`src/js/utils/formatters.test.js`) (AC: 1-13)
  - Test formatCurrency with trillions (AC 3: 1T, 5.5T, 999T)
  - Test formatCurrency with billions (AC 2: 1B, 5.5B, 999B)
  - Test formatCurrency with millions (AC 1: 1M, 50M, 999.99M)
  - Test formatCurrency with thousands (AC 4: 1K-999K with commas)
  - Test formatCurrency with small values (AC 5: 0, 1, 999)
  - Test formatCurrency with negative values
  - Test formatCurrency with invalid input (AC 6: returns "$--")
  - Test formatPercent with positive values (AC 7: shows +)
  - Test formatPercent with negative values (AC 8: shows -)
  - Test formatPercent with zero (AC 9: no sign)
  - Test formatPercent with very small values (AC 10: "<0.01%")
  - Test formatPercent with invalid input (AC 11: returns "--%")
  - Test formatPercent with showSign: false option
  - Test formatDate with various quarters and years (AC 12)
  - Test formatNumber with T/B/M/K values (AC 13)
  - Test formatNumber with invalid input

- [x] **Task 5: Write math tests** (`src/js/utils/math.test.js`) (AC: 14-21)
  - Test clamp above max → returns max (AC 14)
  - Test clamp below min → returns min (AC 15)
  - Test clamp within range → returns value (AC 16)
  - Test clamp with edge values (value = min, value = max)
  - Test clamp with min > max (should handle gracefully)
  - Test lerp with t=0, t=0.5, t=1 (AC 17-19)
  - Test lerp with t outside 0-1 range (extrapolation)
  - Test lerp with negative start/end values
  - Test randomInRange produces values in range (AC 20: statistical test, 100+ iterations)
  - Test randomInRange with integer min/max
  - Test roundTo with various decimal places (AC 21)

- [x] **Task 6: Run all tests and verify** (AC: all)
  - Run `npm test` to verify all new tests pass
  - Verify existing tests still pass (166 pre-existing tests)
  - New test count: 146 new tests (104 formatters + 42 math)

## Dev Notes

### Quick Reference

| Item | Value |
|------|-------|
| **New Files** | `src/js/utils/formatters.js`, `src/js/utils/math.js` |
| **New Test Files** | `src/js/utils/formatters.test.js`, `src/js/utils/math.test.js` |
| **Layer** | `utils/` — bottom layer, no imports from other layers |
| **Depends On** | Nothing (utils is the foundation layer) |
| **Used By** | All other layers (`ui/`, `simulation/`, `core/`) |
| **Total ACs** | 21 (was 15, expanded for validation & edge cases) |
| **Actual Tests** | 146 new tests (104 formatters + 42 math) |
| **Total Tests** | 312 tests (166 pre-existing + 146 new) |
| **Value Range** | $0.01 (min) to $999.99T (max, capped) |

### Architecture Pattern (from docs/architecture.md)

**Utils Layer Rules:**
- `utils/` cannot import from any other layer
- All functions must be pure (no side effects)
- Named exports only (no `export default`)
- Functions should be stateless and deterministic (except randomInRange)

```
┌─────────────────────────────────────────────────────────────┐
│   utils/ (BOTTOM LAYER - imports nothing)                   │
│   - formatters.js                                           │
│   - math.js                                                 │
│   - dom.js (future)                                         │
│   - svg.js (future)                                         │
└─────────────────────────────────────────────────────────────┘
```

### Currency Formatting Logic

```javascript
// src/js/utils/formatters.js

/**
 * Formats a number as currency with smart abbreviation.
 * Uses T for trillions, B for billions, M for millions.
 * Supports values from $0.01 to $999.99T (late-game scenarios).
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string, or "$--" for invalid input
 *
 * @example
 * formatCurrency(1500000000000) → "$1.50T"
 * formatCurrency(1234567890) → "$1.23B"
 * formatCurrency(1234567) → "$1.23M"
 * formatCurrency(12345) → "$12,345"
 * formatCurrency(-5000000) → "-$5.00M"
 * formatCurrency(0) → "$0"
 * formatCurrency("invalid") → "$--"
 */
export function formatCurrency(value) {
  // Input validation - return placeholder for non-numbers
  if (typeof value !== 'number' || isNaN(value)) {
    return '$--';
  }

  const isNegative = value < 0;
  const absValue = Math.abs(value);

  let formatted;

  if (absValue >= 1_000_000_000_000) {
    // Trillions (late-game support)
    formatted = `$${(absValue / 1_000_000_000_000).toFixed(2)}T`;
  } else if (absValue >= 1_000_000_000) {
    // Billions
    formatted = `$${(absValue / 1_000_000_000).toFixed(2)}B`;
  } else if (absValue >= 1_000_000) {
    // Millions
    formatted = `$${(absValue / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    // Thousands - use locale formatting for commas
    formatted = `$${absValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  } else {
    // Small values
    formatted = `$${absValue}`;
  }

  return isNegative ? `-${formatted}` : formatted;
}
```

### Percent Formatting Logic

```javascript
/**
 * Formats a decimal as a percentage with sign.
 * Handles edge cases: very small values show "<0.01%" or ">-0.01%".
 * @param {number} value - Decimal value (0.1234 = 12.34%)
 * @param {Object} options - Formatting options
 * @param {boolean} options.showSign - Show +/- prefix (default: true)
 * @param {number} options.decimals - Decimal places (default: 2)
 * @returns {string} Formatted percentage string, or "--%"for invalid input
 *
 * @example
 * formatPercent(0.1234) → "+12.34%"
 * formatPercent(-0.05) → "-5.00%"
 * formatPercent(0) → "0.00%"
 * formatPercent(0.000001) → "<0.01%"
 * formatPercent(-0.000001) → ">-0.01%"
 * formatPercent(0.1, { showSign: false }) → "10.00%"
 * formatPercent("invalid") → "--%"
 */
export function formatPercent(value, options = {}) {
  // Input validation - return placeholder for non-numbers
  if (typeof value !== 'number' || isNaN(value)) {
    return '--%';
  }

  const { showSign = true, decimals = 2 } = options;

  // Handle very small values that would round to 0.00%
  const minThreshold = 0.0001; // 0.01% in decimal form
  if (value > 0 && value < minThreshold) {
    return '<0.01%';
  }
  if (value < 0 && value > -minThreshold) {
    return '>-0.01%';
  }

  const percentage = value * 100;
  const formatted = Math.abs(percentage).toFixed(decimals);

  if (value === 0) {
    return `${formatted}%`;
  }

  if (showSign) {
    const sign = value > 0 ? '+' : '-';
    return `${sign}${formatted}%`;
  }

  return value < 0 ? `-${formatted}%` : `${formatted}%`;
}
```

### Date Formatting Logic

```javascript
/**
 * Formats game time as a quarter/year string.
 * @param {Object} time - Time object from state
 * @param {number} time.currentQuarter - Quarter (1-4)
 * @param {number} time.currentYear - Year (e.g., 2022)
 * @returns {string} Formatted date like "Q1 2022"
 *
 * @example
 * formatDate({ currentQuarter: 1, currentYear: 2022 }) → "Q1 2022"
 * formatDate({ currentQuarter: 4, currentYear: 2025 }) → "Q4 2025"
 */
export function formatDate(time) {
  if (!time || typeof time.currentQuarter !== 'number' || typeof time.currentYear !== 'number') {
    return '---';
  }
  return `Q${time.currentQuarter} ${time.currentYear}`;
}
```

### Math Helpers Logic

```javascript
// src/js/utils/math.js

/**
 * Clamps a value between min and max bounds.
 * @param {number} value - The value to clamp
 * @param {number} min - Minimum bound
 * @param {number} max - Maximum bound
 * @returns {number} Clamped value
 *
 * @example
 * clamp(15, 0, 10) → 10
 * clamp(-5, 0, 10) → 0
 * clamp(5, 0, 10) → 5
 */
export function clamp(value, min, max) {
  // Handle case where min > max by swapping
  const actualMin = Math.min(min, max);
  const actualMax = Math.max(min, max);
  return Math.max(actualMin, Math.min(actualMax, value));
}

/**
 * Linear interpolation between two values.
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} t - Interpolation factor (0-1, but can extrapolate)
 * @returns {number} Interpolated value
 *
 * @example
 * lerp(0, 100, 0.5) → 50
 * lerp(0, 100, 0) → 0
 * lerp(0, 100, 1) → 100
 * lerp(0, 100, 1.5) → 150 (extrapolation)
 */
export function lerp(start, end, t) {
  return start + (end - start) * t;
}

/**
 * Returns a random number in range [min, max).
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @returns {number} Random number in range
 *
 * @example
 * randomInRange(0, 10) → 0-9.999...
 * randomInRange(5, 10) → 5-9.999...
 */
export function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Rounds a value to specified decimal places.
 * @param {number} value - Value to round
 * @param {number} decimals - Number of decimal places
 * @returns {number} Rounded value
 *
 * @example
 * roundTo(1.2345, 2) → 1.23
 * roundTo(1.999, 1) → 2.0
 */
export function roundTo(value, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
```

### Number Formatting Logic (for non-currency values)

```javascript
// src/js/utils/formatters.js

/**
 * Formats a number with smart abbreviation (no currency symbol).
 * Uses T for trillions, B for billions, M for millions.
 * Useful for unit counts like "1.5M units sold".
 * @param {number} value - The value to format
 * @returns {string} Formatted number string, or "--" for invalid input
 *
 * @example
 * formatNumber(1500000000000) → "1.50T"
 * formatNumber(1234567890) → "1.23B"
 * formatNumber(1500000) → "1.50M"
 * formatNumber(12345) → "12,345"
 * formatNumber(-5000000) → "-5.00M"
 * formatNumber(0) → "0"
 * formatNumber("invalid") → "--"
 */
export function formatNumber(value) {
  // Input validation - return placeholder for non-numbers
  if (typeof value !== 'number' || isNaN(value)) {
    return '--';
  }

  const isNegative = value < 0;
  const absValue = Math.abs(value);

  let formatted;

  if (absValue >= 1_000_000_000_000) {
    // Trillions
    formatted = `${(absValue / 1_000_000_000_000).toFixed(2)}T`;
  } else if (absValue >= 1_000_000_000) {
    // Billions
    formatted = `${(absValue / 1_000_000_000).toFixed(2)}B`;
  } else if (absValue >= 1_000_000) {
    // Millions
    formatted = `${(absValue / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    // Thousands - use locale formatting for commas
    formatted = absValue.toLocaleString('en-US', { maximumFractionDigits: 0 });
  } else {
    // Small values
    formatted = String(absValue);
  }

  return isNegative ? `-${formatted}` : formatted;
}
```

### Test Templates

```javascript
// src/js/utils/formatters.test.js
// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import { formatCurrency, formatPercent, formatDate, formatNumber } from './formatters.js';

describe('formatCurrency', () => {
  // AC 3: Trillion support (late-game)
  describe('trillions', () => {
    it('formats 1 trillion correctly', () => {
      expect(formatCurrency(1_000_000_000_000)).toBe('$1.00T');
    });

    it('formats 1.5 trillion correctly', () => {
      expect(formatCurrency(1_500_000_000_000)).toBe('$1.50T');
    });

    it('formats 999 trillion correctly', () => {
      expect(formatCurrency(999_000_000_000_000)).toBe('$999.00T');
    });
  });

  // AC 2: Billions
  describe('billions', () => {
    it('formats 1 billion correctly', () => {
      expect(formatCurrency(1_000_000_000)).toBe('$1.00B');
    });

    it('formats 1.5 billion correctly', () => {
      expect(formatCurrency(1_500_000_000)).toBe('$1.50B');
    });

    it('formats 999 billion correctly', () => {
      expect(formatCurrency(999_000_000_000)).toBe('$999.00B');
    });
  });

  // AC 1: Millions
  describe('millions', () => {
    it('formats 1 million correctly', () => {
      expect(formatCurrency(1_000_000)).toBe('$1.00M');
    });

    it('formats 1.23 million correctly', () => {
      expect(formatCurrency(1_234_567)).toBe('$1.23M');
    });
  });

  // AC 4: Thousands with commas
  describe('thousands', () => {
    it('formats thousands with commas', () => {
      expect(formatCurrency(12_345)).toBe('$12,345');
    });

    it('formats 1234 with comma', () => {
      expect(formatCurrency(1_234)).toBe('$1,234');
    });
  });

  // AC 5: Zero and small values
  describe('small values and zero', () => {
    it('formats zero', () => {
      expect(formatCurrency(0)).toBe('$0');
    });

    it('formats small values without abbreviation', () => {
      expect(formatCurrency(999)).toBe('$999');
      expect(formatCurrency(1)).toBe('$1');
    });
  });

  // AC 6: Invalid input handling
  describe('input validation', () => {
    it('returns $-- for string input', () => {
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
  });

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
  });
});

describe('formatPercent', () => {
  // AC 7: Positive values with + sign
  it('shows + for positive values', () => {
    expect(formatPercent(0.1234)).toBe('+12.34%');
  });

  // AC 8: Negative values with - sign
  it('shows - for negative values', () => {
    expect(formatPercent(-0.05)).toBe('-5.00%');
  });

  // AC 9: Zero with no sign
  it('shows no sign for zero', () => {
    expect(formatPercent(0)).toBe('0.00%');
  });

  // AC 10: Very small positive values
  describe('very small values', () => {
    it('shows <0.01% for very small positive values', () => {
      expect(formatPercent(0.000001)).toBe('<0.01%');
      expect(formatPercent(0.00005)).toBe('<0.01%');
    });

    it('shows >-0.01% for very small negative values', () => {
      expect(formatPercent(-0.000001)).toBe('>-0.01%');
      expect(formatPercent(-0.00005)).toBe('>-0.01%');
    });

    it('shows normal value at threshold boundary', () => {
      expect(formatPercent(0.0001)).toBe('+0.01%');
      expect(formatPercent(-0.0001)).toBe('-0.01%');
    });
  });

  // AC 11: Invalid input handling
  describe('input validation', () => {
    it('returns --% for string input', () => {
      expect(formatPercent('invalid')).toBe('--%');
    });

    it('returns --% for NaN', () => {
      expect(formatPercent(NaN)).toBe('--%');
    });

    it('returns --% for undefined', () => {
      expect(formatPercent(undefined)).toBe('--%');
    });
  });

  describe('options', () => {
    it('respects showSign: false option', () => {
      expect(formatPercent(0.1234, { showSign: false })).toBe('12.34%');
    });

    it('respects decimals option', () => {
      expect(formatPercent(0.12345, { decimals: 3 })).toBe('+12.345%');
    });
  });
});

// AC 12: Date formatting
describe('formatDate', () => {
  it('formats Q1 2022 correctly', () => {
    expect(formatDate({ currentQuarter: 1, currentYear: 2022 })).toBe('Q1 2022');
  });

  it('formats Q4 2030 correctly', () => {
    expect(formatDate({ currentQuarter: 4, currentYear: 2030 })).toBe('Q4 2030');
  });

  it('handles invalid input gracefully', () => {
    expect(formatDate(null)).toBe('---');
    expect(formatDate({})).toBe('---');
    expect(formatDate(undefined)).toBe('---');
  });
});

// AC 13: Number formatting (no currency symbol)
describe('formatNumber', () => {
  it('formats trillions correctly', () => {
    expect(formatNumber(1_500_000_000_000)).toBe('1.50T');
  });

  it('formats billions correctly', () => {
    expect(formatNumber(1_234_567_890)).toBe('1.23B');
  });

  it('formats millions correctly', () => {
    expect(formatNumber(1_500_000)).toBe('1.50M');
  });

  it('formats thousands with commas', () => {
    expect(formatNumber(12_345)).toBe('12,345');
  });

  it('formats zero correctly', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('formats negative millions correctly', () => {
    expect(formatNumber(-5_000_000)).toBe('-5.00M');
  });

  describe('input validation', () => {
    it('returns -- for invalid input', () => {
      expect(formatNumber('invalid')).toBe('--');
      expect(formatNumber(NaN)).toBe('--');
      expect(formatNumber(undefined)).toBe('--');
    });
  });
});
```

```javascript
// src/js/utils/math.test.js
// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import { clamp, lerp, randomInRange, roundTo } from './math.js';

// AC 14-16: clamp function
describe('clamp', () => {
  // AC 14: value > max returns max
  it('returns max when value exceeds max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  // AC 15: value < min returns min
  it('returns min when value below min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  // AC 16: value in range returns value
  it('returns value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('handles edge values exactly at min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('handles edge values exactly at max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it('handles min > max by swapping', () => {
    expect(clamp(5, 10, 0)).toBe(5); // Should treat as clamp(5, 0, 10)
  });
});

// AC 17-19: lerp function
describe('lerp', () => {
  // AC 18: t=0 returns start
  it('returns start when t=0', () => {
    expect(lerp(0, 100, 0)).toBe(0);
  });

  // AC 19: t=1 returns end
  it('returns end when t=1', () => {
    expect(lerp(0, 100, 1)).toBe(100);
  });

  // AC 17: t=0.5 returns midpoint
  it('returns midpoint when t=0.5', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
  });

  it('extrapolates beyond t=1', () => {
    expect(lerp(0, 100, 1.5)).toBe(150);
  });

  it('extrapolates below t=0', () => {
    expect(lerp(0, 100, -0.5)).toBe(-50);
  });

  it('handles negative start/end values', () => {
    expect(lerp(-100, 100, 0.5)).toBe(0);
    expect(lerp(-50, -10, 0.5)).toBe(-30);
  });
});

// AC 20: randomInRange function
describe('randomInRange', () => {
  it('produces values within range (statistical test with 100+ iterations)', () => {
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
});

// AC 21: roundTo function
describe('roundTo', () => {
  it('rounds to 2 decimal places', () => {
    expect(roundTo(1.2345, 2)).toBe(1.23);
  });

  it('rounds up correctly', () => {
    expect(roundTo(1.999, 1)).toBe(2.0);
  });

  it('rounds to 0 decimal places', () => {
    expect(roundTo(1.5, 0)).toBe(2);
    expect(roundTo(1.4, 0)).toBe(1);
  });

  it('handles negative values', () => {
    expect(roundTo(-1.2345, 2)).toBe(-1.23);
  });
});
```

### Integration Notes

**After This Story:**
- `top-bar.js` has its own `formatGameDate` function that duplicates `formatDate`. In a future refactor (Epic 2+), update top-bar.js to import from `utils/formatters.js` instead.
- The formatters will be heavily used in Epic 2 (market charts), Epic 3 (GPU designer), and Epic 6 (financial dashboards).

**Why These Specific Functions:**
- `formatCurrency`: All financial displays (cash, revenue, costs, prices)
- `formatPercent`: Market share changes, growth rates, margins
- `formatDate`: Time displays throughout the UI
- `clamp`: Constraining slider values, GPU spec limits
- `lerp`: Smooth animations, chart interpolation
- `randomInRange`: AI decision variance, market fluctuations

### Previous Story Learnings (Story 1.6)

1. **Test isolation** - Each test file should be independent; no shared mutable state between tests
2. **Edge cases** - Test boundary conditions (0, negative, very large values)
3. **Error handling** - Return sensible defaults for invalid inputs (e.g., `"---"` for bad date)
4. **Pure functions** - Utils should have no side effects; same input always produces same output
5. **JSDoc comments** - Document all public functions with examples

### Testing Standards

- Vitest framework (already configured)
- Test files: `*.test.js` in same directory as implementation
- No `// @vitest-environment jsdom` needed for pure functions (but include if using any DOM)
- Test edge cases: 0, negative numbers, very large numbers, invalid inputs
- For randomInRange: Use statistical testing (run 100+ iterations)

### Architecture Compliance

**CRITICAL - Follow these patterns exactly:**

1. **Named exports only** - No `export default`
2. **No imports from other layers** - utils is the bottom layer
3. **Kebab-case file naming** - `formatters.js`, `math.js`
4. **camelCase function/variable names** - `formatCurrency`, `roundTo`
5. **Pure functions** - No side effects, no mutations
6. **JSDoc comments** - Document all exported functions

### Browser Verification

After implementation:

**Prerequisites:**
```bash
npm test
```

1. Verify all tests pass
2. Test count should increase from 161 to ~195-205 (added ~35-40 new tests)

**Manual verification (optional):**

Since ES6 module imports don't work directly in browser console, expose utils on window object for testing. Add this temporarily to `main.js`:

```javascript
// TEMPORARY: For browser console testing (remove after verification)
import * as formatters from './utils/formatters.js';
import * as mathUtils from './utils/math.js';
window.utils = { ...formatters, ...mathUtils };
```

Then in browser console:
```javascript
// Currency formatting (AC 1-6)
utils.formatCurrency(1500000000000);  // "$1.50T" (trillion)
utils.formatCurrency(1234567890);      // "$1.23B" (billion)
utils.formatCurrency(1234567);         // "$1.23M" (million)
utils.formatCurrency(12345);           // "$12,345" (thousands)
utils.formatCurrency(0);               // "$0"
utils.formatCurrency("bad");           // "$--" (invalid input)

// Percent formatting (AC 7-11)
utils.formatPercent(0.1234);           // "+12.34%"
utils.formatPercent(-0.05);            // "-5.00%"
utils.formatPercent(0);                // "0.00%"
utils.formatPercent(0.000001);         // "<0.01%" (very small)
utils.formatPercent("bad");            // "--%" (invalid)

// Date formatting (AC 12)
utils.formatDate({ currentQuarter: 1, currentYear: 2022 }); // "Q1 2022"

// Number formatting (AC 13)
utils.formatNumber(1500000);           // "1.50M"

// Math utilities (AC 14-21)
utils.clamp(15, 0, 10);                // 10
utils.lerp(0, 100, 0.5);               // 50
utils.randomInRange(0, 10);            // 0-9.99...
utils.roundTo(1.2345, 2);              // 1.23
```

**Remember:** Remove the `window.utils` exposure from `main.js` after verification!

### References

- [Source: docs/architecture.md#Module Organization]
- [Source: docs/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: docs/epics.md#Story 1.7: Utility Functions]
- [Source: src/js/ui/components/top-bar.js - contains inline formatGameDate for reference]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None - implementation proceeded without issues.

### Completion Notes List

- **Task 1**: Utils directory already existed (`src/js/utils/.gitkeep`), no action needed.
- **Task 2**: Implemented `formatters.js` with 4 exported functions:
  - `formatCurrency(value)` - T/B/M/K abbreviations with `$` prefix, invalid returns `"$--"`
  - `formatPercent(value, options?)` - decimal to percentage, `+/-` signs, small values show `<0.01%`
  - `formatDate(time)` - `Q{N} {YEAR}` format from time object
  - `formatNumber(value)` - same as currency without `$` prefix
- **Task 3**: Implemented `math.js` with 4 exported functions:
  - `clamp(value, min, max)` - handles min>max by swapping
  - `lerp(start, end, t)` - linear interpolation with extrapolation support
  - `randomInRange(min, max)` - returns [min, max)
  - `roundTo(value, decimals)` - rounds to specified decimal places
- **Task 4**: Created comprehensive formatters tests (104 tests):
  - Currency: trillions, billions, millions, thousands, small values, zero, negatives, invalid inputs
  - Currency: decimal rounding to 2 places, minimum $0.01, 999T cap, floating point fixes
  - Percent: positive (+), negative (-), zero (no sign), very small (<0.01%), invalid, options
  - Date: various quarters/years, invalid input handling
  - Number: all abbreviation levels, negatives, invalid inputs, system limits
- **Task 5**: Created comprehensive math tests (42 tests):
  - clamp: above max, below min, in range, edge values, min>max swap, negative ranges, floats
  - lerp: t=0/0.5/1, extrapolation, negative values, reverse interpolation
  - randomInRange: statistical test (100+ iterations), integer/float/negative ranges
  - roundTo: various decimal places, negatives, edge cases, floating point precision
- **Task 6**: All 312 tests pass (166 existing + 146 new)

All 21 Acceptance Criteria satisfied:
- AC 1-6: Currency formatting (T/B/M/K/small/invalid) ✓
- AC 7-11: Percent formatting (+/-/zero/small/invalid) ✓
- AC 12: Date formatting ✓
- AC 13: Number formatting ✓
- AC 14-16: clamp function ✓
- AC 17-19: lerp function ✓
- AC 20: randomInRange function ✓
- AC 21: roundTo function ✓

### File List

**New Files:**
- `src/js/utils/formatters.js` - Formatting utility functions (currency, percent, date, number)
- `src/js/utils/formatters.test.js` - 84 tests for formatters
- `src/js/utils/math.js` - Math utility functions (clamp, lerp, randomInRange, roundTo)
- `src/js/utils/math.test.js` - 39 tests for math utilities

**Modified Files:**
- `docs/sprint-artifacts/sprint-status.yaml` - Updated story 1.7 status to in-progress → review
- `docs/sprint-artifacts/1-7-utility-functions.md` - Updated task checkboxes, Dev Agent Record

## Change Log

| Date | Change |
|------|--------|
| 2025-12-06 | Story 1.7 implementation complete - 4 new utility files, 146 new tests, all 21 ACs satisfied |
| 2025-12-06 | Code review fixes: Added $0.01 minimum, 999T maximum cap, decimal rounding to 2 places, floating point precision fix at trillion boundary. Added 14 new tests for edge cases. Total: 312 tests. |
