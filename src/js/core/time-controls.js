// src/js/core/time-controls.js
// Time control functions: pause, play, speed, and skip

import { updateLoopSpeed, VALID_TICK_SPEEDS } from './game-loop.js';

/**
 * Validates that state has a time object.
 * @param {Object} state - Game state object
 * @param {string} fnName - Function name for error message
 * @throws {Error} If state or state.time is missing
 */
function validateState(state, fnName) {
  if (!state?.time) {
    throw new Error(`${fnName} requires valid state with time object`);
  }
}

/**
 * Pauses the game simulation.
 * @param {Object} state - Game state object
 * @returns {Object} Updated state
 * @throws {Error} If state.time is missing
 */
export function pauseGame(state) {
  validateState(state, 'pauseGame');
  state.time = { ...state.time, paused: true };
  return state;
}

/**
 * Resumes the game simulation.
 * @param {Object} state - Game state object
 * @returns {Object} Updated state
 * @throws {Error} If state.time is missing
 */
export function playGame(state) {
  validateState(state, 'playGame');
  state.time = { ...state.time, paused: false };
  return state;
}

/**
 * Toggles pause state (convenience for UI buttons).
 * @param {Object} state - Game state object
 * @returns {Object} Updated state
 * @throws {Error} If state.time is missing
 */
export function togglePause(state) {
  validateState(state, 'togglePause');
  return state.time.paused ? playGame(state) : pauseGame(state);
}

/**
 * Sets the simulation speed.
 * @param {Object} state - Game state object
 * @param {number} speed - Tick speed (1, 2, or 4)
 * @returns {Object} Updated state
 * @throws {Error} If state.time is missing or speed is not 1, 2, or 4
 */
export function setSpeed(state, speed) {
  validateState(state, 'setSpeed');
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
 * @throws {Error} If state.time is missing or lacks currentMonth/currentYear
 */
export function skipToNextQuarter(state) {
  validateState(state, 'skipToNextQuarter');
  if (!state.time.currentMonth || !state.time.currentYear) {
    throw new Error('skipToNextQuarter requires valid state.time with currentMonth and currentYear');
  }
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
