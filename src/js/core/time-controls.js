// src/js/core/time-controls.js
// Time control functions: pause, play, speed, and skip

import { updateLoopSpeed, VALID_TICK_SPEEDS } from './game-loop.js';

/**
 * Pauses the game simulation.
 * @param {Object} state - Game state object
 * @returns {Object} Updated state
 */
export function pauseGame(state) {
  state.time = { ...state.time, paused: true };
  return state;
}

/**
 * Resumes the game simulation.
 * @param {Object} state - Game state object
 * @returns {Object} Updated state
 */
export function playGame(state) {
  state.time = { ...state.time, paused: false };
  return state;
}

/**
 * Toggles pause state (convenience for UI buttons).
 * @param {Object} state - Game state object
 * @returns {Object} Updated state
 */
export function togglePause(state) {
  return state.time.paused ? playGame(state) : pauseGame(state);
}

/**
 * Sets the simulation speed.
 * @param {Object} state - Game state object
 * @param {number} speed - Tick speed (1, 2, or 4)
 * @returns {Object} Updated state
 * @throws {Error} If speed is not 1, 2, or 4
 */
export function setSpeed(state, speed) {
  if (!VALID_TICK_SPEEDS.includes(speed)) {
    throw new Error(`Invalid speed: ${speed}. Must be one of: ${VALID_TICK_SPEEDS.join(', ')}`);
  }
  state.time = { ...state.time, tickSpeed: speed };
  updateLoopSpeed(state);
  return state;
}

/**
 * Advances time instantly to the start of the next quarter.
 * Does NOT process intermediate ticks - just teleports time.
 * @param {Object} state - Game state object
 * @returns {Object} Updated state
 */
export function skipToNextQuarter(state) {
  const { currentMonth, currentYear } = state.time;
  const currentQuarter = Math.ceil(currentMonth / 3);

  let nextQuarterFirstMonth = currentQuarter * 3 + 1;
  let nextYear = currentYear;

  if (nextQuarterFirstMonth > 12) {
    nextQuarterFirstMonth = 1;
    nextYear += 1;
  }

  state.time = {
    ...state.time,
    currentHour: 0,
    currentDay: 1,
    currentMonth: nextQuarterFirstMonth,
    currentQuarter: Math.ceil(nextQuarterFirstMonth / 3),
    currentYear: nextYear
  };

  return state;
}
