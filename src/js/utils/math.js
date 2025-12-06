/**
 * Math utility functions for game calculations.
 * Part of the utils layer - no imports from other layers.
 * @module utils/math
 */

/**
 * Clamps a value between min and max bounds.
 * Handles case where min > max by swapping them.
 * @param {number} value - The value to clamp
 * @param {number} min - Minimum bound
 * @param {number} max - Maximum bound
 * @returns {number} Clamped value
 *
 * @example
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 * clamp(5, 0, 10) // 5
 * clamp(5, 10, 0) // 5 (handles swapped min/max)
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
 * lerp(0, 100, 0.5) // 50
 * lerp(0, 100, 0) // 0
 * lerp(0, 100, 1) // 100
 * lerp(0, 100, 1.5) // 150 (extrapolation)
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
 * randomInRange(0, 10) // 0-9.999...
 * randomInRange(5, 10) // 5-9.999...
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
 * roundTo(1.2345, 2) // 1.23
 * roundTo(1.999, 1) // 2.0
 * roundTo(1.5, 0) // 2
 */
export function roundTo(value, decimals) {
  // Handle floating point precision issues for halfway cases
  // e.g., 1.005 stored as 1.00499999..., -1.235 stored as -1.23500000001...
  const factor = Math.pow(10, decimals);
  // Add small bias away from zero before scaling to fix floating point edge cases
  const bias = value >= 0 ? 1e-9 : -1e-9;
  return Math.round((value + bias) * factor) / factor;
}
