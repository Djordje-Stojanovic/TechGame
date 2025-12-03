import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { startGameLoop, stopGameLoop, updateLoopSpeed } from './game-loop.js';
import { createInitialState } from '../state/game-state.js';

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
  it('calls render but skips time advancement when paused', () => {
    state.time.paused = true;
    const initialHour = state.time.currentHour;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalled();
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
});
