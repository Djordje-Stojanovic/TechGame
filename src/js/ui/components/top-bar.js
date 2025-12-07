// src/js/ui/components/top-bar.js

import { formatDate, formatDetailedTime } from '../../utils/formatters.js';
import { togglePause, setSpeed } from '../../core/time-controls.js';
import { TICK_SPEEDS } from '../../data/constants.js';
// NOTE: render is passed as parameter to avoid circular dependency with render.js

// Module-level variable for keyboard cleanup
let keydownHandler = null;

// Module-level render function reference (set by renderTopBar)
let moduleRenderFn = null;

/**
 * Renders the top bar with date display and time controls.
 * @param {HTMLElement} container - The top bar container element
 * @param {Object} state - Current game state
 * @param {Function} [renderFn] - Optional render function for event handlers (avoids circular import)
 */
export function renderTopBar(container, state, renderFn) {
  if (!container) {
    console.error('[UI ERROR] Top bar container not found');
    return;
  }

  // Store render function for event handlers (only update if provided)
  if (renderFn) {
    moduleRenderFn = renderFn;
  }

  const dateDisplay = formatDate(state?.time);
  const detailedTime = formatDetailedTime(state?.time);
  const isPaused = state?.time?.paused ?? true;
  const currentSpeed = state?.time?.tickSpeed ?? 1;

  // Generate speed buttons HTML with accessibility
  const speedButtonsHtml = TICK_SPEEDS.map(speed => {
    const isActive = speed === currentSpeed;
    const activeClass = isActive
      ? 'bg-accent text-white'
      : 'bg-gray-800 text-gray-400 hover:bg-gray-700';
    return `<button
      data-testid="speed-btn"
      data-speed="${speed}"
      class="${activeClass} px-3 py-1 text-xs font-medium rounded transition-all duration-150"
      aria-label="Set speed to ${speed}x"
      aria-pressed="${isActive}"
    >${speed}x</button>`;
  }).join('');

  // Play/pause button styling
  const playPauseBtnClass = isPaused
    ? 'bg-accent text-white'
    : 'bg-gray-800 text-gray-300 hover:bg-gray-700';
  const playPauseIcon = isPaused ? '▶' : '⏸';
  const playPauseLabel = isPaused ? 'Play simulation' : 'Pause simulation';

  // PAUSED indicator - always rendered, visibility controlled via opacity for smooth transition
  const pausedIndicatorClass = isPaused
    ? 'opacity-100'
    : 'opacity-0 pointer-events-none';

  container.innerHTML = `
    <div class="flex items-center justify-between h-14 px-6">
      <!-- Time Controls -->
      <div data-testid="time-controls" class="flex items-center gap-4" role="group" aria-label="Time controls">
        <!-- Date Display -->
        <div data-testid="date-display" class="flex items-center gap-3 font-mono">
          <span class="text-lg font-semibold" aria-live="polite">${dateDisplay}</span>
          <span data-testid="detailed-time" class="text-sm text-text-muted" aria-live="off">${detailedTime}</span>
          <span data-testid="paused-indicator" class="text-amber-500 text-sm transition-opacity duration-150 ${pausedIndicatorClass}" aria-hidden="${!isPaused}">(PAUSED)</span>
        </div>

        <!-- Play/Pause Button -->
        <button
          data-testid="play-pause-btn"
          class="${playPauseBtnClass} w-8 h-8 flex items-center justify-center rounded transition-all duration-150"
          title="${isPaused ? 'Play (Space)' : 'Pause (Space)'}"
          aria-label="${playPauseLabel}"
          aria-pressed="${!isPaused}"
        >${playPauseIcon}</button>

        <!-- Speed Controls -->
        <div data-testid="speed-controls" class="flex items-center gap-1 rounded-lg overflow-hidden" role="group" aria-label="Simulation speed">
          ${speedButtonsHtml}
        </div>
      </div>

      <!-- Company Stats Placeholder -->
      <div class="flex items-center gap-4">
        <span class="text-text-muted text-sm">Company stats coming later</span>
      </div>
    </div>
  `;

  // Attach event listeners with immediate render callback
  attachEventListeners(container, state);
}

/**
 * Attaches click event listeners to time control buttons.
 * Uses moduleRenderFn stored by renderTopBar to avoid circular imports.
 * @param {HTMLElement} container - The top bar container
 * @param {Object} state - Game state (captured in closure)
 */
function attachEventListeners(container, state) {
  // Play/Pause button
  const playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      togglePause(state);
      if (moduleRenderFn) {
        moduleRenderFn(state);
      }
    });
  }

  // Speed buttons
  const speedBtns = container.querySelectorAll('[data-testid="speed-btn"]');
  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const speed = parseInt(btn.dataset.speed, 10);
      // Optimization: skip if already at this speed
      if (state.time.tickSpeed === speed) {
        return;
      }
      setSpeed(state, speed);
      if (moduleRenderFn) {
        moduleRenderFn(state);
      }
    });
  });
}

/**
 * Initializes keyboard shortcuts for time controls.
 * @param {Object} state - Game state object
 * @param {Function} renderFn - Render function to call after state changes
 */
export function initKeyboardShortcuts(state, renderFn) {
  // Remove existing listener if present (prevents duplicates)
  cleanupKeyboardShortcuts();

  keydownHandler = (e) => {
    // Don't handle if typing in input/textarea
    const tagName = e.target?.tagName?.toLowerCase() || '';
    if (tagName === 'input' || tagName === 'textarea') return;

    switch (e.key) {
      case ' ':
        e.preventDefault(); // Prevent page scroll
        togglePause(state);
        renderFn(state);
        break;
      case '1':
        setSpeed(state, 1);
        renderFn(state);
        break;
      case '2':
        setSpeed(state, 2);
        renderFn(state);
        break;
      case '4':
        setSpeed(state, 4);
        renderFn(state);
        break;
    }
  };

  document.addEventListener('keydown', keydownHandler);
}

/**
 * Removes keyboard shortcut listener. Call on cleanup/unmount.
 */
export function cleanupKeyboardShortcuts() {
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
    keydownHandler = null;
  }
}
