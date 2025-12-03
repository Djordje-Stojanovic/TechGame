// TechGame - Main Entry Point

import { createInitialState } from './state/game-state.js';

export function initialize() {
  const state = createInitialState();
  console.log('TechGame initialized');
  console.log('Initial state:', state);
  console.log('Year:', state.time.currentYear, 'Quarter:', state.time.currentQuarter);
  return state;
}

// Export for manual initialization - no side effects on import
// Call initialize() from index.html or app entry point
