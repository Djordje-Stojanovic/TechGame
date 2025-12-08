/**
 * Market Query Utilities
 * Pure functions for calculating market share and other derived metrics.
 *
 * Layer: utils/ (no imports allowed)
 */

/**
 * Get the number of days for a given time range.
 * @param {string} timeRange - Time range: 'day', 'week', 'month', 'quarter', 'year', 'ttm'
 * @returns {number} Number of days for the time range
 */
const VALID_TIME_RANGES = ['day', 'week', 'month', 'quarter', 'year', 'ttm'];

export function getTimeRangeDays(timeRange) {
  switch (timeRange) {
    case 'day': return 1;
    case 'week': return 7;
    case 'month': return 30;
    case 'quarter': return 90;
    case 'year': return 365;
    case 'ttm': return 365;
    default:
      if (timeRange !== null && timeRange !== undefined && timeRange !== '') {
        console.warn(`[QUERY] Unknown timeRange "${timeRange}", defaulting to 'day'. Valid: ${VALID_TIME_RANGES.join(', ')}`);
      }
      return 1;
  }
}

/**
 * Calculate market share for a company over a time range.
 * Market share = company units / total units (calculated on demand, not stored).
 *
 * @param {Object} state - Game state with history.daily
 * @param {string} company - Company ID: 'nvidia', 'amd', 'intel', 'player'
 * @param {string} [timeRange='day'] - Time range: 'day', 'week', 'month', 'quarter', 'year', 'ttm'
 * @returns {number} Market share as decimal (0.0 to 1.0), 0 if no data
 */
export function getMarketShare(state, company, timeRange = 'day') {
  // Handle missing or invalid state
  if (!state || !state.history || !state.history.daily || state.history.daily.length === 0) {
    return 0;
  }

  const days = getTimeRangeDays(timeRange);
  const history = state.history.daily;

  // Get relevant days (most recent N days)
  const relevantDays = history.slice(-days);

  // Sum company units and total units
  let companyUnits = 0;
  let totalUnits = 0;

  for (const day of relevantDays) {
    if (!day.companyTotals) continue;

    companyUnits += day.companyTotals[company]?.units || 0;

    // Sum all company units for total
    for (const comp of ['nvidia', 'amd', 'intel', 'player']) {
      totalUnits += day.companyTotals[comp]?.units || 0;
    }
  }

  return totalUnits > 0 ? companyUnits / totalUnits : 0;
}
