import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { startGameLoop, stopGameLoop, updateLoopSpeed, VALID_TICK_SPEEDS } from './game-loop.js';
import { createInitialState } from '../state/game-state.js';
import { TICK_SPEEDS, HOURS_PER_DAY, DAYS_PER_MONTH, MONTHS_PER_YEAR } from '../data/constants.js';

describe('game-loop', () => {
  let state;
  let renderFn;

  beforeEach(() => {
    vi.useFakeTimers();
    state = createInitialState();
    state.time.paused = false;
    renderFn = vi.fn();
  });

  afterEach(() => {
    stopGameLoop();
    vi.useRealTimers();
  });

  // TICK EXECUTION
  it('calls render at configured tickSpeed (1 tick/sec)', () => {
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalledTimes(1);
  });

  it('calls render multiple times at higher speeds (4 ticks/sec)', () => {
    state.time.tickSpeed = 4;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalledTimes(4);
  });

  it('calls render at 2 ticks/sec', () => {
    state.time.tickSpeed = 2;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalledTimes(2);
  });

  // PAUSE BEHAVIOR
  it('skips render and time advancement when paused (saves CPU)', () => {
    state.time.paused = true;
    const initialHour = state.time.currentHour;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    // When paused, don't waste CPU cycles rendering
    expect(renderFn).not.toHaveBeenCalled();
    expect(state.time.currentHour).toBe(initialHour);
  });

  // HOUR → DAY ROLLOVER
  it('rolls hour 23 → 0 and increments day', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 1;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentHour).toBe(0);
    expect(state.time.currentDay).toBe(2);
  });

  // DAY → MONTH ROLLOVER
  it('rolls day 30 → 1 and increments month', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 30;
    state.time.currentMonth = 1;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentDay).toBe(1);
    expect(state.time.currentMonth).toBe(2);
  });

  // MONTH → YEAR ROLLOVER
  it('rolls month 12 → 1 and increments year', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 30;
    state.time.currentMonth = 12;
    state.time.currentYear = 2022;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentMonth).toBe(1);
    expect(state.time.currentYear).toBe(2023);
  });

  // QUARTER DERIVATION
  it('calculates quarter correctly from month (Q1 to Q2)', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 30;
    state.time.currentMonth = 3; // End of Q1
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentMonth).toBe(4);
    expect(state.time.currentQuarter).toBe(2);
  });

  it('calculates quarter correctly (Q2 to Q3)', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 30;
    state.time.currentMonth = 6;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentMonth).toBe(7);
    expect(state.time.currentQuarter).toBe(3);
  });

  it('calculates quarter correctly (Q3 to Q4)', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 30;
    state.time.currentMonth = 9;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentMonth).toBe(10);
    expect(state.time.currentQuarter).toBe(4);
  });

  // FULL YEAR ROLLOVER
  it('handles full year rollover correctly (Q4 to Q1 next year)', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 30;
    state.time.currentMonth = 12;
    state.time.currentQuarter = 4;
    state.time.currentYear = 2022;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentHour).toBe(0);
    expect(state.time.currentDay).toBe(1);
    expect(state.time.currentMonth).toBe(1);
    expect(state.time.currentQuarter).toBe(1);
    expect(state.time.currentYear).toBe(2023);
  });

  // ERROR HANDLING
  it('pauses game and calls error callback on error', () => {
    const badRender = vi.fn(() => { throw new Error('Test error'); });
    const errorHandler = vi.fn();
    startGameLoop(state, badRender, errorHandler);
    vi.advanceTimersByTime(1000);
    expect(state.time.paused).toBe(true);
    expect(errorHandler).toHaveBeenCalled();
  });

  it('logs error with [GAME ERROR] prefix', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const badRender = vi.fn(() => { throw new Error('Test error'); });
    startGameLoop(state, badRender);
    vi.advanceTimersByTime(1000);
    expect(consoleSpy).toHaveBeenCalledWith('[GAME ERROR]', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('shows error modal with message when error occurs', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const badRender = vi.fn(() => { throw new Error('Test error'); });
    startGameLoop(state, badRender);
    vi.advanceTimersByTime(1000);
    // Verify [ERROR MODAL] message was logged (showErrorModal was called)
    expect(consoleSpy).toHaveBeenCalledWith('[ERROR MODAL]', 'Game paused due to error. Check console.');
    consoleSpy.mockRestore();
  });

  // SPEED CHANGE
  it('updates interval when speed changes', () => {
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalledTimes(1);

    state.time.tickSpeed = 2;
    updateLoopSpeed(state);
    renderFn.mockClear();
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalledTimes(2);
  });

  // STOP LOOP
  it('stops calling render after stopGameLoop', () => {
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalledTimes(1);

    stopGameLoop();
    renderFn.mockClear();
    vi.advanceTimersByTime(1000);
    expect(renderFn).not.toHaveBeenCalled();
  });

  // MULTIPLE START CALLS
  it('clears previous interval when starting new loop', () => {
    startGameLoop(state, renderFn);
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    // Should only have 1 call per tick, not 2
    expect(renderFn).toHaveBeenCalledTimes(1);
  });

  // UPDATE SPEED WHEN STOPPED
  it('handles updateLoopSpeed when loop is stopped gracefully', () => {
    // Loop never started, updateLoopSpeed should not throw
    state.time.tickSpeed = 4;
    expect(() => updateLoopSpeed(state)).not.toThrow();
    // Loop still not running
    vi.advanceTimersByTime(1000);
    expect(renderFn).not.toHaveBeenCalled();
  });

  // TICK SPEED VALIDATION
  it('throws error for invalid tickSpeed of 0', () => {
    state.time.tickSpeed = 0;
    expect(() => startGameLoop(state, renderFn)).toThrow('Invalid tickSpeed: 0');
  });

  it('throws error for invalid tickSpeed of 3', () => {
    state.time.tickSpeed = 3;
    expect(() => startGameLoop(state, renderFn)).toThrow('Invalid tickSpeed: 3');
  });

  it('throws error for negative tickSpeed', () => {
    state.time.tickSpeed = -1;
    expect(() => startGameLoop(state, renderFn)).toThrow('Invalid tickSpeed: -1');
  });

  it('accepts valid tickSpeed of 1', () => {
    state.time.tickSpeed = 1;
    expect(() => startGameLoop(state, renderFn)).not.toThrow();
  });

  it('accepts valid tickSpeed of 2', () => {
    state.time.tickSpeed = 2;
    expect(() => startGameLoop(state, renderFn)).not.toThrow();
  });

  it('accepts valid tickSpeed of 4', () => {
    state.time.tickSpeed = 4;
    expect(() => startGameLoop(state, renderFn)).not.toThrow();
  });

  // CONSTANTS SYNC VERIFICATION (Issue 4 - duplicate constants)
  // These tests ensure game-loop's local constants stay in sync with data/constants.js
  describe('constants sync with data/constants.js', () => {
    it('VALID_TICK_SPEEDS matches TICK_SPEEDS from constants.js', () => {
      expect(VALID_TICK_SPEEDS).toEqual(TICK_SPEEDS);
    });

    it('uses correct HOURS_PER_DAY (24) for hour rollover', () => {
      // Verify game-loop uses 24 hours per day (matching constants.js)
      expect(HOURS_PER_DAY).toBe(24);
      state.time.currentHour = 23;
      startGameLoop(state, renderFn);
      vi.advanceTimersByTime(1000);
      expect(state.time.currentHour).toBe(0); // Should have rolled over at 24
    });

    it('uses correct DAYS_PER_MONTH (30) for day rollover', () => {
      expect(DAYS_PER_MONTH).toBe(30);
      state.time.currentHour = 23;
      state.time.currentDay = 30;
      startGameLoop(state, renderFn);
      vi.advanceTimersByTime(1000);
      expect(state.time.currentDay).toBe(1); // Should have rolled over after day 30
    });

    it('uses correct MONTHS_PER_YEAR (12) for month rollover', () => {
      expect(MONTHS_PER_YEAR).toBe(12);
      state.time.currentHour = 23;
      state.time.currentDay = 30;
      state.time.currentMonth = 12;
      startGameLoop(state, renderFn);
      vi.advanceTimersByTime(1000);
      expect(state.time.currentMonth).toBe(1); // Should have rolled over after month 12
    });
  });

  // AC 11 TEST: Time advances faster at higher speeds
  describe('speed affects time advancement rate (AC 11)', () => {
    it('at 4x speed, time advances 4 times faster than at 1x over same real time', () => {
      // At 1x speed, 4 seconds = 4 ticks = 4 hours
      state.time.tickSpeed = 1;
      state.time.currentHour = 0;
      startGameLoop(state, renderFn);
      vi.advanceTimersByTime(4000);
      const hoursAt1x = state.time.currentHour;
      stopGameLoop();

      // At 4x speed, 4 seconds = 16 ticks = 16 hours
      const state4x = createInitialState();
      state4x.time.paused = false;
      state4x.time.tickSpeed = 4;
      state4x.time.currentHour = 0;
      startGameLoop(state4x, renderFn);
      vi.advanceTimersByTime(4000);
      const hoursAt4x = state4x.time.currentHour;

      expect(hoursAt1x).toBe(4);
      expect(hoursAt4x).toBe(16);
      expect(hoursAt4x).toBe(hoursAt1x * 4);
    });

    it('at 2x speed, time advances 2 times faster than at 1x', () => {
      // At 1x speed, 2 seconds = 2 ticks = 2 hours
      state.time.tickSpeed = 1;
      state.time.currentHour = 0;
      startGameLoop(state, renderFn);
      vi.advanceTimersByTime(2000);
      const hoursAt1x = state.time.currentHour;
      stopGameLoop();

      // At 2x speed, 2 seconds = 4 ticks = 4 hours
      const state2x = createInitialState();
      state2x.time.paused = false;
      state2x.time.tickSpeed = 2;
      state2x.time.currentHour = 0;
      startGameLoop(state2x, renderFn);
      vi.advanceTimersByTime(2000);
      const hoursAt2x = state2x.time.currentHour;

      expect(hoursAt1x).toBe(2);
      expect(hoursAt2x).toBe(4);
      expect(hoursAt2x).toBe(hoursAt1x * 2);
    });
  });
});
