// src/js/core/time-controls.test.js
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
  });
});
