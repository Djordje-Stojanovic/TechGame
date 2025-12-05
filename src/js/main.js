// TechGame - Main Entry Point

import { createInitialState } from './state/game-state.js';
import { startGameLoop, stopGameLoop, updateLoopSpeed, VALID_TICK_SPEEDS } from './core/game-loop.js';
import { pauseGame, playGame, togglePause, setSpeed, skipToNextQuarter } from './core/time-controls.js';
import { render, initializeUI } from './ui/render.js';

/**
 * Error handler for game loop errors.
 * @param {Error} error - The error that occurred
 */
function handleGameError(error) {
  console.error('Game error occurred:', error.message);
}

/**
 * Initializes the game and starts the game loop.
 * @returns {Object} The game state object
 */
export function initialize() {
  const state = createInitialState();
  console.log('TechGame initialized');
  console.log('Initial state:', state);
  console.log('Year:', state.time.currentYear, 'Quarter:', state.time.currentQuarter);

  // Initialize UI shell before starting game loop
  initializeUI(state);

  // Start game loop (game starts paused per initial state)
  startGameLoop(state, render, handleGameError);
  console.log('Game loop started (paused)');

  return state;
}

// Re-export game loop controls for external use
export { startGameLoop, stopGameLoop, updateLoopSpeed, VALID_TICK_SPEEDS };

// Re-export time controls for external use
export { pauseGame, playGame, togglePause, setSpeed, skipToNextQuarter };

// Export for manual initialization - no side effects on import
// Call initialize() from index.html or app entry point
