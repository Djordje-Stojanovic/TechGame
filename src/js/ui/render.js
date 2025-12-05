// src/js/ui/render.js

import { renderSidebar } from './components/sidebar.js';
import { renderTopBar } from './components/top-bar.js';
import { renderDashboard } from './panels/dashboard.js';

/**
 * Previous state reference for future diff-based rendering.
 * @type {Object|null}
 */
let prevState = null;

/**
 * Resets the render state. Used for test isolation.
 * Call this in beforeEach() of test files to ensure clean state.
 */
export function resetRenderState() {
  prevState = null;
}

/**
 * Main render function - coordinates all UI updates.
 * Currently renders all components; will be optimized for diff-based
 * updates in Story 1.6.
 * @param {Object} state - Current game state
 */
export function render(state) {
  // Get container references
  const topBar = document.getElementById('top-bar');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');

  // Render top bar every tick (shows time, which changes)
  if (topBar) {
    renderTopBar(topBar, state);
  } else {
    console.error('[UI ERROR] Top bar container #top-bar not found');
  }

  // Sidebar only needs to render once (static for now)
  // Will re-render when view changes in future stories
  if (sidebar && !prevState) {
    renderSidebar(sidebar, state?.ui?.currentView || 'dashboard');
  } else if (!sidebar) {
    console.error('[UI ERROR] Sidebar container #sidebar not found');
  }

  // Main content - renders dashboard (renders once for now)
  // Will support view switching in future stories
  if (mainContent && !prevState) {
    renderDashboard(mainContent);
  } else if (!mainContent) {
    console.error('[UI ERROR] Main content container #main-content not found');
  }

  // Store for future diff comparison
  prevState = state;
}

/**
 * Initializes the UI shell (called once on app start).
 * @param {Object} state - Initial game state
 */
export function initializeUI(state) {
  render(state);
  console.log('[UI] Shell initialized');
}
