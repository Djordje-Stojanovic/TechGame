/**
 * Formatting utility functions for currency, percentages, dates, and numbers.
 * Part of the utils layer - no imports from other layers.
 * @module utils/formatters
 */

/**
 * Formats a number as currency with smart abbreviation.
 * Uses T for trillions, B for billions, M for millions.
 * Supports values from $0.01 to $999.99T (late-game scenarios).
 * @param {number} value - The value to format
 * @returns {string} Formatted currency string, or "$--" for invalid input
 *
 * @example
 * formatCurrency(1500000000000) // "$1.50T"
 * formatCurrency(1234567890) // "$1.23B"
 * formatCurrency(1234567) // "$1.23M"
 * formatCurrency(12345) // "$12,345"
 * formatCurrency(-5000000) // "-$5.00M"
 * formatCurrency(0) // "$0"
 * formatCurrency("invalid") // "$--"
 */
export function formatCurrency(value) {
  // Input validation - return placeholder for non-numbers, NaN, or Infinity
  if (typeof value !== 'number' || !isFinite(value)) {
    return '$--';
  }

  const isNegative = value < 0;
  let absValue = Math.abs(value);

  // Cap at 999T (999,999,999,999,999) - system maximum
  const MAX_VALUE = 999_999_999_999_999;
  if (absValue > MAX_VALUE) {
    absValue = MAX_VALUE;
  }

  let formatted;

  if (absValue >= 1_000_000_000_000) {
    // Trillions (late-game support) - use rounding to avoid floating point issues
    let trillions = Math.round(absValue / 10_000_000_000) / 100;
    // Cap at 999.99T (system maximum)
    if (trillions > 999.99) {
      trillions = 999.99;
    }
    formatted = `$${trillions.toFixed(2)}T`;
  } else if (absValue >= 1_000_000_000) {
    // Billions
    formatted = `$${(absValue / 1_000_000_000).toFixed(2)}B`;
  } else if (absValue >= 1_000_000) {
    // Millions
    formatted = `$${(absValue / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    // Thousands - use locale formatting for commas, round to whole numbers
    formatted = `$${Math.round(absValue).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  } else {
    // Small values - round to 2 decimal places, minimum $0.01 display
    const rounded = Math.round(absValue * 100) / 100;
    if (rounded < 0.01 && absValue > 0) {
      formatted = '$0.01'; // Minimum displayable value
    } else {
      formatted = `$${rounded.toFixed(2).replace(/\.00$/, '')}`;
    }
  }

  return isNegative ? `-${formatted}` : formatted;
}

/**
 * Formats a decimal as a percentage with sign.
 * Handles edge cases: very small values show "<0.01%" or ">-0.01%".
 * @param {number} value - Decimal value (0.1234 = 12.34%)
 * @param {Object} [options] - Formatting options
 * @param {boolean} [options.showSign=true] - Show +/- prefix
 * @param {number} [options.decimals=2] - Decimal places
 * @returns {string} Formatted percentage string, or "--%" for invalid input
 *
 * @example
 * formatPercent(0.1234) // "+12.34%"
 * formatPercent(-0.05) // "-5.00%"
 * formatPercent(0) // "0.00%"
 * formatPercent(0.000001) // "<0.01%"
 * formatPercent(-0.000001) // ">-0.01%"
 * formatPercent(0.1, { showSign: false }) // "10.00%"
 * formatPercent("invalid") // "--%"
 */
export function formatPercent(value, options = {}) {
  // Input validation - return placeholder for non-numbers, NaN, or Infinity
  if (typeof value !== 'number' || !isFinite(value)) {
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

/**
 * Formats game time as a quarter/year string.
 * @param {Object} time - Time object from state
 * @param {number} time.currentQuarter - Quarter (1-4)
 * @param {number} time.currentYear - Year (e.g., 2022)
 * @returns {string} Formatted date like "Q1 2022", or "---" for invalid input
 *
 * @example
 * formatDate({ currentQuarter: 1, currentYear: 2022 }) // "Q1 2022"
 * formatDate({ currentQuarter: 4, currentYear: 2025 }) // "Q4 2025"
 * formatDate(null) // "---"
 */
export function formatDate(time) {
  if (!time || typeof time.currentQuarter !== 'number' || typeof time.currentYear !== 'number') {
    return '---';
  }
  return `Q${time.currentQuarter} ${time.currentYear}`;
}

/**
 * Formats a number with smart abbreviation (no currency symbol).
 * Uses T for trillions, B for billions, M for millions.
 * Useful for unit counts like "1.5M units sold".
 * @param {number} value - The value to format
 * @returns {string} Formatted number string, or "--" for invalid input
 *
 * @example
 * formatNumber(1500000000000) // "1.50T"
 * formatNumber(1234567890) // "1.23B"
 * formatNumber(1500000) // "1.50M"
 * formatNumber(12345) // "12,345"
 * formatNumber(-5000000) // "-5.00M"
 * formatNumber(0) // "0"
 * formatNumber("invalid") // "--"
 */
export function formatNumber(value) {
  // Input validation - return placeholder for non-numbers, NaN, or Infinity
  if (typeof value !== 'number' || !isFinite(value)) {
    return '--';
  }

  const isNegative = value < 0;
  let absValue = Math.abs(value);

  // Cap at 999T (999,999,999,999,999) - system maximum
  const MAX_VALUE = 999_999_999_999_999;
  if (absValue > MAX_VALUE) {
    absValue = MAX_VALUE;
  }

  let formatted;

  if (absValue >= 1_000_000_000_000) {
    // Trillions - use rounding to avoid floating point issues
    let trillions = Math.round(absValue / 10_000_000_000) / 100;
    // Cap at 999.99T (system maximum)
    if (trillions > 999.99) {
      trillions = 999.99;
    }
    formatted = `${trillions.toFixed(2)}T`;
  } else if (absValue >= 1_000_000_000) {
    // Billions
    formatted = `${(absValue / 1_000_000_000).toFixed(2)}B`;
  } else if (absValue >= 1_000_000) {
    // Millions
    formatted = `${(absValue / 1_000_000).toFixed(2)}M`;
  } else if (absValue >= 1_000) {
    // Thousands - use locale formatting for commas, round to whole numbers
    formatted = Math.round(absValue).toLocaleString('en-US', { maximumFractionDigits: 0 });
  } else {
    // Small values - round to 2 decimal places, minimum 0.01 display
    const rounded = Math.round(absValue * 100) / 100;
    if (rounded < 0.01 && absValue > 0) {
      formatted = '0.01'; // Minimum displayable value
    } else {
      formatted = rounded.toFixed(2).replace(/\.00$/, '');
    }
  }

  return isNegative ? `-${formatted}` : formatted;
}
