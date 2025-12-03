/**
 * @fileoverview Tests for time-controls.js
 * Tests pause, play, speed control, and skip-to-quarter functionality.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { pauseGame, playGame, togglePause, setSpeed, skipToNextQuarter } from './time-controls.js';
import { createInitialState } from '../state/game-state.js';
import * as gameLoop from './game-loop.js';

describe('time-controls', () => {
  let state;

  beforeEach(() => {
    state = createInitialState();
  });

  describe('pauseGame', () => {
    it('sets paused to true', () => {
      playGame(state); // Start from known state
      pauseGame(state);
      expect(state.time.paused).toBe(true);
    });

    it('is safe when already paused (idempotent)', () => {
      pauseGame(state);
      pauseGame(state); // Call again
      expect(state.time.paused).toBe(true);
    });

    it('returns state for chaining', () => {
      const result = pauseGame(state);
      expect(result).toBe(state);
    });

    it('creates new state.time reference (immutable pattern)', () => {
      const originalTime = state.time;
      pauseGame(state);
      expect(state.time).not.toBe(originalTime);
    });

    it('throws on null state', () => {
      expect(() => pauseGame(null)).toThrow('pauseGame requires valid state with time object');
    });

    it('throws on undefined state', () => {
      expect(() => pauseGame(undefined)).toThrow('pauseGame requires valid state with time object');
    });

    it('throws on state without time object', () => {
      expect(() => pauseGame({})).toThrow('pauseGame requires valid state with time object');
    });
  });

  describe('playGame', () => {
    it('sets paused to false', () => {
      pauseGame(state); // Start from known state
      playGame(state);
      expect(state.time.paused).toBe(false);
    });

    it('is safe when already playing (idempotent)', () => {
      playGame(state);
      playGame(state); // Call again
      expect(state.time.paused).toBe(false);
    });

    it('returns state for chaining', () => {
      const result = playGame(state);
      expect(result).toBe(state);
    });

    it('creates new state.time reference (immutable pattern)', () => {
      const originalTime = state.time;
      playGame(state);
      expect(state.time).not.toBe(originalTime);
    });

    it('throws on null state', () => {
      expect(() => playGame(null)).toThrow('playGame requires valid state with time object');
    });

    it('throws on undefined state', () => {
      expect(() => playGame(undefined)).toThrow('playGame requires valid state with time object');
    });

    it('throws on state without time object', () => {
      expect(() => playGame({})).toThrow('playGame requires valid state with time object');
    });
  });

  describe('togglePause', () => {
    it('pauses when playing', () => {
      playGame(state);
      togglePause(state);
      expect(state.time.paused).toBe(true);
    });

    it('plays when paused', () => {
      pauseGame(state);
      togglePause(state);
      expect(state.time.paused).toBe(false);
    });

    it('returns state for chaining', () => {
      const result = togglePause(state);
      expect(result).toBe(state);
    });

    it('creates new state.time reference (immutable pattern)', () => {
      const originalTime = state.time;
      togglePause(state);
      expect(state.time).not.toBe(originalTime);
    });

    it('throws on null state', () => {
      expect(() => togglePause(null)).toThrow('togglePause requires valid state with time object');
    });

    it('throws on undefined state', () => {
      expect(() => togglePause(undefined)).toThrow('togglePause requires valid state with time object');
    });

    it('throws on state without time object', () => {
      expect(() => togglePause({})).toThrow('togglePause requires valid state with time object');
    });
  });

  describe('setSpeed', () => {
    beforeEach(() => {
      vi.spyOn(gameLoop, 'updateLoopSpeed').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('sets tickSpeed to valid values (1, 2, 4)', () => {
      setSpeed(state, 1);
      expect(state.time.tickSpeed).toBe(1);

      setSpeed(state, 2);
      expect(state.time.tickSpeed).toBe(2);

      setSpeed(state, 4);
      expect(state.time.tickSpeed).toBe(4);
    });

    it('throws on invalid speed', () => {
      expect(() => setSpeed(state, 3)).toThrow('Invalid speed');
      expect(() => setSpeed(state, 0)).toThrow('Invalid speed');
      expect(() => setSpeed(state, -1)).toThrow('Invalid speed');
    });

    it('calls updateLoopSpeed after setting speed', () => {
      setSpeed(state, 2);
      expect(gameLoop.updateLoopSpeed).toHaveBeenCalledWith(state);
    });

    it('is safe when setting same speed (idempotent)', () => {
      state.time.tickSpeed = 2;
      setSpeed(state, 2); // Same speed
      expect(state.time.tickSpeed).toBe(2);
      expect(gameLoop.updateLoopSpeed).toHaveBeenCalled(); // Still restarts loop (ok)
    });

    it('returns state for chaining', () => {
      const result = setSpeed(state, 2);
      expect(result).toBe(state);
    });

    it('actually changes loop timing when loop is running', () => {
      vi.restoreAllMocks(); // Use real updateLoopSpeed for this test
      vi.useFakeTimers();
      const { startGameLoop, stopGameLoop } = gameLoop;
      const renderFn = vi.fn();

      state.time.tickSpeed = 1;
      state.time.paused = false;
      startGameLoop(state, renderFn);

      vi.advanceTimersByTime(1000);
      expect(renderFn).toHaveBeenCalledTimes(1); // 1 tick/sec

      renderFn.mockClear();
      setSpeed(state, 4); // Change to 4x speed

      vi.advanceTimersByTime(1000);
      expect(renderFn).toHaveBeenCalledTimes(4); // Now 4 ticks/sec

      stopGameLoop();
      vi.useRealTimers();
    });

    it('creates new state.time reference (immutable pattern)', () => {
      const originalTime = state.time;
      setSpeed(state, 2);
      expect(state.time).not.toBe(originalTime);
    });

    it('throws on null state', () => {
      expect(() => setSpeed(null, 2)).toThrow('setSpeed requires valid state with time object');
    });

    it('throws on undefined state', () => {
      expect(() => setSpeed(undefined, 2)).toThrow('setSpeed requires valid state with time object');
    });

    it('throws on state without time object', () => {
      expect(() => setSpeed({}, 2)).toThrow('setSpeed requires valid state with time object');
    });
  });

  describe('skipToNextQuarter', () => {
    it('skips Q1 → Q2 (month 1 → 4)', () => {
      state.time.currentMonth = 1;
      state.time.currentQuarter = 1;
      state.time.currentYear = 2022;

      skipToNextQuarter(state);

      expect(state.time.currentMonth).toBe(4);
      expect(state.time.currentQuarter).toBe(2);
      expect(state.time.currentYear).toBe(2022);
    });

    it('skips Q2 → Q3 (month 4 → 7)', () => {
      state.time.currentMonth = 6;
      state.time.currentQuarter = 2;

      skipToNextQuarter(state);

      expect(state.time.currentMonth).toBe(7);
      expect(state.time.currentQuarter).toBe(3);
    });

    it('skips Q3 → Q4 (month 7 → 10)', () => {
      state.time.currentMonth = 9;
      state.time.currentQuarter = 3;

      skipToNextQuarter(state);

      expect(state.time.currentMonth).toBe(10);
      expect(state.time.currentQuarter).toBe(4);
    });

    it('skips Q4 → Q1 with year rollover', () => {
      state.time.currentMonth = 12;
      state.time.currentQuarter = 4;
      state.time.currentYear = 2022;

      skipToNextQuarter(state);

      expect(state.time.currentMonth).toBe(1);
      expect(state.time.currentQuarter).toBe(1);
      expect(state.time.currentYear).toBe(2023);
    });

    it('resets hour and day to start of quarter', () => {
      state.time.currentHour = 15;
      state.time.currentDay = 20;
      state.time.currentMonth = 2;

      skipToNextQuarter(state);

      expect(state.time.currentHour).toBe(0);
      expect(state.time.currentDay).toBe(1);
    });

    it('returns state for chaining', () => {
      const result = skipToNextQuarter(state);
      expect(result).toBe(state);
    });

    it('handles mid-quarter skip correctly (month 2 → Q2)', () => {
      state.time.currentMonth = 2;
      state.time.currentQuarter = 1;
      state.time.currentYear = 2022;

      skipToNextQuarter(state);

      expect(state.time.currentMonth).toBe(4);
      expect(state.time.currentQuarter).toBe(2);
    });

    it('handles month 10 (Q4) to next year Q1', () => {
      state.time.currentMonth = 10;
      state.time.currentQuarter = 4;
      state.time.currentYear = 2022;

      skipToNextQuarter(state);

      expect(state.time.currentMonth).toBe(1);
      expect(state.time.currentQuarter).toBe(1);
      expect(state.time.currentYear).toBe(2023);
    });

    it('creates new state.time reference (immutable pattern)', () => {
      const originalTime = state.time;
      skipToNextQuarter(state);
      expect(state.time).not.toBe(originalTime);
    });

    it('works correctly with running game loop (integration)', () => {
      vi.useFakeTimers();
      const { startGameLoop, stopGameLoop } = gameLoop;
      const renderFn = vi.fn();

      // Start at month 2 (Q1), not paused
      state.time.currentMonth = 2;
      state.time.currentQuarter = 1;
      state.time.currentYear = 2022;
      state.time.currentHour = 10;
      state.time.currentDay = 15;
      state.time.tickSpeed = 1;
      state.time.paused = false;

      startGameLoop(state, renderFn);

      // Advance a few ticks to verify loop is running
      vi.advanceTimersByTime(3000);
      expect(renderFn).toHaveBeenCalled();
      expect(state.time.currentHour).toBe(13); // 10 + 3 hours

      // Now skip to next quarter
      skipToNextQuarter(state);

      // Verify time jumped to Q2 start
      expect(state.time.currentMonth).toBe(4);
      expect(state.time.currentQuarter).toBe(2);
      expect(state.time.currentHour).toBe(0);
      expect(state.time.currentDay).toBe(1);
      expect(state.time.currentYear).toBe(2022);

      // Verify loop continues working after skip
      renderFn.mockClear();
      vi.advanceTimersByTime(2000);
      expect(renderFn).toHaveBeenCalledTimes(2);
      expect(state.time.currentHour).toBe(2); // 0 + 2 hours

      stopGameLoop();
      vi.useRealTimers();
    });

    it('throws on null state', () => {
      expect(() => skipToNextQuarter(null)).toThrow('skipToNextQuarter requires valid state with time object');
    });

    it('throws on undefined state', () => {
      expect(() => skipToNextQuarter(undefined)).toThrow('skipToNextQuarter requires valid state with time object');
    });

    it('throws on state without time object', () => {
      expect(() => skipToNextQuarter({})).toThrow('skipToNextQuarter requires valid state with time object');
    });

    it('throws on state.time without currentMonth', () => {
      const invalidState = { time: { currentYear: 2022 } };
      expect(() => skipToNextQuarter(invalidState)).toThrow('skipToNextQuarter requires valid state.time with currentMonth and currentYear');
    });

    it('throws on state.time without currentYear', () => {
      const invalidState = { time: { currentMonth: 1 } };
      expect(() => skipToNextQuarter(invalidState)).toThrow('skipToNextQuarter requires valid state.time with currentMonth and currentYear');
    });

    it('throws on state.time with month 0 (invalid)', () => {
      const invalidState = { time: { currentMonth: 0, currentYear: 2022 } };
      expect(() => skipToNextQuarter(invalidState)).toThrow('skipToNextQuarter requires valid state.time with currentMonth and currentYear');
    });
  });
});
