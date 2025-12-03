// src/js/core/game-loop.js
// Game loop implementation with configurable tick speed

const HOURS_PER_DAY = 24;
const DAYS_PER_MONTH = 30;
const MONTHS_PER_YEAR = 12;

let intervalId = null;
let currentState = null;
let renderCallback = null;
let errorCallback = null;

/**
 * Advances time by one hour with rollover handling.
 * Order: hour → day → month → year, quarter derived from month.
 * @param {Object} time - Current time state
 * @returns {Object} New time object with updated values
 */
function advanceTime(time) {
  let { currentHour, currentDay, currentMonth, currentYear } = time;

  currentHour += 1;

  if (currentHour >= HOURS_PER_DAY) {
    currentHour = 0;
    currentDay += 1;
  }

  if (currentDay > DAYS_PER_MONTH) {
    currentDay = 1;
    currentMonth += 1;
  }

  if (currentMonth > MONTHS_PER_YEAR) {
    currentMonth = 1;
    currentYear += 1;
  }

  // Quarter derived from month - always correct
  const currentQuarter = Math.ceil(currentMonth / 3);

  return { ...time, currentHour, currentDay, currentMonth, currentQuarter, currentYear };
}

/**
 * Shows error modal to user. Minimal implementation until UI Shell (Story 1.5).
 * @param {string} message - Error message to display
 */
function showErrorModal(message) {
  console.error('[ERROR MODAL]', message);
  // Placeholder alert until proper modal exists in Story 1.5
  if (typeof alert !== 'undefined') {
    alert(message);
  }
}

/**
 * Main tick function called by interval.
 * Checks pause state, advances time, handles errors.
 */
function tick() {
  if (currentState.time.paused) {
    if (renderCallback) renderCallback(currentState);
    return;
  }

  try {
    currentState.time = advanceTime(currentState.time);
    if (renderCallback) renderCallback(currentState);
  } catch (error) {
    console.error('[GAME ERROR]', error);
    currentState.time = { ...currentState.time, paused: true };
    showErrorModal('Game paused due to error. Check console.');
    if (errorCallback) errorCallback(error);
    // Try to render paused state, but don't throw if render is broken
    try {
      if (renderCallback) renderCallback(currentState);
    } catch {
      // Render failed - already logged main error, UI may be inconsistent
    }
  }
}

/**
 * Valid tick speeds for the game loop.
 * @type {number[]}
 */
const VALID_TICK_SPEEDS = [1, 2, 4];

/**
 * Starts the game loop with configured tick speed.
 * Clears any existing interval before starting.
 * @param {Object} state - Game state object
 * @param {Function} renderFn - Function to call after each tick
 * @param {Function} [onError] - Optional error callback
 * @throws {Error} If tickSpeed is invalid (must be 1, 2, or 4)
 */
export function startGameLoop(state, renderFn, onError = null) {
  const tickSpeed = state.time.tickSpeed;
  if (!VALID_TICK_SPEEDS.includes(tickSpeed)) {
    throw new Error(`Invalid tickSpeed: ${tickSpeed}. Must be one of: ${VALID_TICK_SPEEDS.join(', ')}`);
  }
  stopGameLoop();
  currentState = state;
  renderCallback = renderFn;
  errorCallback = onError;
  const interval = 1000 / tickSpeed;
  intervalId = setInterval(tick, interval);
}

/**
 * Stops the game loop and clears interval.
 * Resets all module state to prevent stale references.
 */
export function stopGameLoop() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
  currentState = null;
  renderCallback = null;
  errorCallback = null;
}

/**
 * Updates loop speed by restarting interval with new tick speed.
 * Works whether paused or not.
 * @param {Object} state - Game state with updated tickSpeed
 */
export function updateLoopSpeed(state) {
  if (intervalId !== null) {
    // Save callbacks before stop clears them
    const savedRenderCallback = renderCallback;
    const savedErrorCallback = errorCallback;
    stopGameLoop();
    startGameLoop(state, savedRenderCallback, savedErrorCallback);
  } else {
    // Loop not running, just update state reference
    currentState = state;
  }
}
