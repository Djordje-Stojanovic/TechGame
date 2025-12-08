/**
 * Tests for market query utility functions.
 * @module utils/queries.test
 */

import { describe, it, expect, vi } from 'vitest';
import { getMarketShare, getTimeRangeDays } from './queries.js';

describe('getTimeRangeDays', () => {
  it('returns 1 for day', () => {
    expect(getTimeRangeDays('day')).toBe(1);
  });

  it('returns 7 for week', () => {
    expect(getTimeRangeDays('week')).toBe(7);
  });

  it('returns 30 for month', () => {
    expect(getTimeRangeDays('month')).toBe(30);
  });

  it('returns 90 for quarter', () => {
    expect(getTimeRangeDays('quarter')).toBe(90);
  });

  it('returns 365 for year', () => {
    expect(getTimeRangeDays('year')).toBe(365);
  });

  it('returns 365 for ttm (trailing twelve months)', () => {
    expect(getTimeRangeDays('ttm')).toBe(365);
  });

  it('returns 1 for unknown timeRange (default)', () => {
    expect(getTimeRangeDays('')).toBe(1);
    expect(getTimeRangeDays(null)).toBe(1);
    expect(getTimeRangeDays(undefined)).toBe(1);
  });

  it('warns when unknown non-empty timeRange is used', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(getTimeRangeDays('unknown')).toBe(1);
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unknown timeRange "unknown"')
    );

    expect(getTimeRangeDays('quarterly')).toBe(1); // Common typo
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unknown timeRange "quarterly"')
    );

    warnSpy.mockRestore();
  });

  it('does not warn for null, undefined, or empty string timeRange', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    getTimeRangeDays(null);
    getTimeRangeDays(undefined);
    getTimeRangeDays('');

    expect(warnSpy).not.toHaveBeenCalled();

    warnSpy.mockRestore();
  });
});

describe('getMarketShare', () => {
  // Helper to create a minimal state with history
  function createStateWithHistory(dailyHistory) {
    return {
      history: {
        daily: dailyHistory
      }
    };
  }

  // Helper to create a day entry
  function createDayEntry(day, month, year, companyTotals) {
    return {
      day,
      month,
      year,
      sales: {},
      companyTotals: {
        nvidia: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
        amd: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
        intel: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
        player: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
        ...companyTotals
      }
    };
  }

  describe('empty/invalid history handling (AC 17)', () => {
    it('returns 0 for empty history', () => {
      const state = createStateWithHistory([]);
      expect(getMarketShare(state, 'nvidia', 'day')).toBe(0);
    });

    it('returns 0 for null history', () => {
      const state = { history: { daily: null } };
      expect(getMarketShare(state, 'nvidia', 'day')).toBe(0);
    });

    it('returns 0 for undefined history', () => {
      const state = { history: {} };
      expect(getMarketShare(state, 'nvidia', 'day')).toBe(0);
    });

    it('returns 0 for missing history object', () => {
      const state = {};
      expect(getMarketShare(state, 'nvidia', 'day')).toBe(0);
    });

    it('returns 0 for null state parameter', () => {
      expect(getMarketShare(null, 'nvidia', 'day')).toBe(0);
    });

    it('returns 0 for undefined state parameter', () => {
      expect(getMarketShare(undefined, 'nvidia', 'day')).toBe(0);
    });
  });

  describe('single day calculations (AC 10, 12)', () => {
    it('returns correct share for NVIDIA ~80% (AC 14)', () => {
      const state = createStateWithHistory([
        createDayEntry(1, 1, 2022, {
          nvidia: { units: 80000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          amd: { units: 18000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          intel: { units: 2000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          player: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 }
        })
      ]);

      expect(getMarketShare(state, 'nvidia', 'day')).toBe(0.8);
    });

    it('returns correct share for AMD ~18% (AC 14)', () => {
      const state = createStateWithHistory([
        createDayEntry(1, 1, 2022, {
          nvidia: { units: 80000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          amd: { units: 18000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          intel: { units: 2000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          player: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 }
        })
      ]);

      expect(getMarketShare(state, 'amd', 'day')).toBe(0.18);
    });

    it('returns correct share for Intel ~2% (AC 14)', () => {
      const state = createStateWithHistory([
        createDayEntry(1, 1, 2022, {
          nvidia: { units: 80000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          amd: { units: 18000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          intel: { units: 2000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          player: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 }
        })
      ]);

      expect(getMarketShare(state, 'intel', 'day')).toBe(0.02);
    });

    it('returns 0 for player with no products (AC 17)', () => {
      const state = createStateWithHistory([
        createDayEntry(1, 1, 2022, {
          nvidia: { units: 80000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          amd: { units: 18000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          intel: { units: 2000, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 },
          player: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 }
        })
      ]);

      expect(getMarketShare(state, 'player', 'day')).toBe(0);
    });

    it('uses most recent day for day timeRange (AC 12)', () => {
      const state = createStateWithHistory([
        createDayEntry(1, 1, 2022, {
          nvidia: { units: 80000 },
          amd: { units: 18000 },
          intel: { units: 2000 },
          player: { units: 0 }
        }),
        createDayEntry(2, 1, 2022, {
          nvidia: { units: 70000 },
          amd: { units: 20000 },
          intel: { units: 10000 },
          player: { units: 0 }
        })
      ]);

      // Should use day 2 data only
      expect(getMarketShare(state, 'nvidia', 'day')).toBe(0.7);
      expect(getMarketShare(state, 'amd', 'day')).toBe(0.2);
      expect(getMarketShare(state, 'intel', 'day')).toBe(0.1);
    });
  });

  describe('shares sum to 1.0 (AC 11)', () => {
    it('all company shares sum to 1.0', () => {
      const state = createStateWithHistory([
        createDayEntry(1, 1, 2022, {
          nvidia: { units: 80000 },
          amd: { units: 18000 },
          intel: { units: 2000 },
          player: { units: 0 }
        })
      ]);

      const nvidiaShare = getMarketShare(state, 'nvidia', 'day');
      const amdShare = getMarketShare(state, 'amd', 'day');
      const intelShare = getMarketShare(state, 'intel', 'day');
      const playerShare = getMarketShare(state, 'player', 'day');

      expect(nvidiaShare + amdShare + intelShare + playerShare).toBe(1.0);
    });

    it('shares sum to 1.0 with non-zero player share', () => {
      const state = createStateWithHistory([
        createDayEntry(1, 1, 2022, {
          nvidia: { units: 70000 },
          amd: { units: 15000 },
          intel: { units: 5000 },
          player: { units: 10000 }
        })
      ]);

      const total =
        getMarketShare(state, 'nvidia', 'day') +
        getMarketShare(state, 'amd', 'day') +
        getMarketShare(state, 'intel', 'day') +
        getMarketShare(state, 'player', 'day');

      expect(total).toBe(1.0);
    });
  });

  describe('multi-day aggregation (AC 13)', () => {
    it('aggregates last 90 days for quarter timeRange', () => {
      // Create 100 days of history
      const dailyHistory = [];
      for (let i = 1; i <= 100; i++) {
        dailyHistory.push(createDayEntry(i, 1, 2022, {
          nvidia: { units: 1000 },
          amd: { units: 200 },
          intel: { units: 50 },
          player: { units: 0 }
        }));
      }

      const state = createStateWithHistory(dailyHistory);

      // Quarter should use last 90 days
      // Each day: nvidia=1000, amd=200, intel=50, total=1250
      // Over 90 days: nvidia=90000, amd=18000, intel=4500, total=112500
      const nvidiaShare = getMarketShare(state, 'nvidia', 'quarter');
      expect(nvidiaShare).toBeCloseTo(90000 / 112500, 10);
    });

    it('uses all available days if less than requested', () => {
      // Only 10 days of history, request quarter (90 days)
      const dailyHistory = [];
      for (let i = 1; i <= 10; i++) {
        dailyHistory.push(createDayEntry(i, 1, 2022, {
          nvidia: { units: 800 },
          amd: { units: 180 },
          intel: { units: 20 },
          player: { units: 0 }
        }));
      }

      const state = createStateWithHistory(dailyHistory);

      // Should use all 10 days
      // nvidia=8000, amd=1800, intel=200, total=10000
      expect(getMarketShare(state, 'nvidia', 'quarter')).toBe(0.8);
      expect(getMarketShare(state, 'amd', 'quarter')).toBe(0.18);
      expect(getMarketShare(state, 'intel', 'quarter')).toBe(0.02);
    });

    it('week aggregates last 7 days', () => {
      const dailyHistory = [];
      for (let i = 1; i <= 10; i++) {
        dailyHistory.push(createDayEntry(i, 1, 2022, {
          nvidia: { units: i <= 3 ? 500 : 1000 }, // First 3 days different
          amd: { units: 200 },
          intel: { units: 50 },
          player: { units: 0 }
        }));
      }

      const state = createStateWithHistory(dailyHistory);

      // Week should use days 4-10 (last 7 days)
      // nvidia: 7*1000=7000, amd: 7*200=1400, intel: 7*50=350
      // total: 8750
      expect(getMarketShare(state, 'nvidia', 'week')).toBeCloseTo(7000 / 8750, 10);
    });
  });

  describe('edge cases', () => {
    it('handles missing company in companyTotals gracefully', () => {
      const state = createStateWithHistory([
        {
          day: 1,
          month: 1,
          year: 2022,
          sales: {},
          companyTotals: {
            nvidia: { units: 100 }
            // amd, intel, player missing
          }
        }
      ]);

      expect(getMarketShare(state, 'nvidia', 'day')).toBe(1.0);
      expect(getMarketShare(state, 'amd', 'day')).toBe(0);
      expect(getMarketShare(state, 'unknown', 'day')).toBe(0);
    });

    it('returns 0 when total units is 0', () => {
      const state = createStateWithHistory([
        createDayEntry(1, 1, 2022, {
          nvidia: { units: 0 },
          amd: { units: 0 },
          intel: { units: 0 },
          player: { units: 0 }
        })
      ]);

      expect(getMarketShare(state, 'nvidia', 'day')).toBe(0);
    });

    it('defaults to day timeRange when not specified', () => {
      const state = createStateWithHistory([
        createDayEntry(1, 1, 2022, {
          nvidia: { units: 80000 },
          amd: { units: 18000 },
          intel: { units: 2000 },
          player: { units: 0 }
        }),
        createDayEntry(2, 1, 2022, {
          nvidia: { units: 50000 },
          amd: { units: 40000 },
          intel: { units: 10000 },
          player: { units: 0 }
        })
      ]);

      // Default should be 'day', using most recent
      expect(getMarketShare(state, 'nvidia')).toBe(0.5);
    });
  });
});
