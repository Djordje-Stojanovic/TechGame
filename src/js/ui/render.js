// src/js/ui/render.js

import { renderSidebar } from './components/sidebar.js';
import { renderTopBar } from './components/top-bar.js';
import { renderDashboard } from './panels/dashboard.js';
import { renderPlaceholder } from './panels/placeholder.js';

/**
 * Previous state references for diff-based rendering.
 * We store individual sub-object references, not the whole state,
 * because storing `prevState = state` would mean both point to the
 * same object, and changes to state.time would also change prevState.time.
 * @type {Object}
 */
let prevRefs = {
  time: null,
  ui: null,
  currentView: null
};

/**
 * Resets the render state. Used for test isolation.
 * Call this in beforeEach() of test files to ensure clean state.
 */
export function resetRenderState() {
  prevRefs = {
    time: null,
    ui: null,
    currentView: null
  };
}

/**
 * Main render function - coordinates all UI updates using diff-based rendering.
 * Only re-renders sections whose state objects have changed (by reference).
 * @param {Object} state - Current game state
 */
export function render(state) {
  const startTime = performance.now();

  // Get container references
  const topBar = document.getElementById('top-bar');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');

  // Track what we render for debugging
  const rendered = [];

  // Initial render - render everything
  const isInitialRender = prevRefs.time === null;

  // Time changed → re-render top bar only (reference comparison)
  if (isInitialRender || state.time !== prevRefs.time) {
    if (topBar) {
      // Pass render function on first call to avoid circular import in top-bar.js
      renderTopBar(topBar, state, isInitialRender ? render : undefined);
      rendered.push('topBar');
    } else {
      console.error('[UI ERROR] Top bar container #top-bar not found');
    }
  }

  // UI state changed → re-render sidebar and check for view changes (reference comparison)
  if (isInitialRender || state.ui !== prevRefs.ui) {
    if (sidebar) {
      renderSidebar(sidebar, state?.ui?.currentView || 'dashboard');
      rendered.push('sidebar');
    } else {
      console.error('[UI ERROR] Sidebar container #sidebar not found');
    }

    // View changed → re-render main content with appropriate panel
    const viewChanged = isInitialRender ||
      state.ui?.currentView !== prevRefs.currentView;

    if (viewChanged) {
      if (mainContent) {
        renderMainContent(mainContent, state);
        rendered.push('mainContent');
      } else {
        console.error('[UI ERROR] Main content container #main-content not found');
      }
    }
  }

  // Store references for next diff comparison (at END of render, not beginning)
  // We store the sub-object references directly, not the parent state object
  prevRefs.time = state.time;
  prevRefs.ui = state.ui;
  prevRefs.currentView = state.ui?.currentView;

  // Performance logging - warn only when exceeding 60fps frame budget (16.67ms)
  const duration = performance.now() - startTime;
  if (duration > 16) {
    console.warn(`[UI PERF] Render took ${duration.toFixed(2)}ms (exceeds 16ms frame budget)`);
  }

  // Debug logging - use console.debug for routine diff logging (filtered by default in DevTools)
  if (rendered.length > 0) {
    console.debug(`[UI] Diff render: ${rendered.join(', ')}`);
  }
}

/**
 * Renders the appropriate panel based on current view.
 * @param {HTMLElement} container - The main content container
 * @param {Object} state - Current game state
 */
function renderMainContent(container, state) {
  const currentView = state?.ui?.currentView || 'dashboard';

  // Explicit cases document known views; default handles any future/unknown views
  if (currentView === 'dashboard') {
    renderDashboard(container);
  } else {
    // All non-dashboard views use placeholder (market, company, design, intel, or future views)
    renderPlaceholder(container, currentView);
  }
}

/**
 * Initializes the UI shell (called once on app start).
 * @param {Object} state - Initial game state
 */
export function initializeUI(state) {
  render(state);
  console.log('[UI] Shell initialized');
}
