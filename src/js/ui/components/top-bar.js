// src/js/ui/components/top-bar.js

/**
 * Formats the game date for display.
 * @param {Object} time - The time object from state
 * @returns {string} Formatted date string like "Q1 2022"
 */
function formatGameDate(time) {
  return `Q${time.currentQuarter} ${time.currentYear}`;
}

/**
 * Renders the top bar with date display and controls.
 * @param {HTMLElement} container - The top bar container element
 * @param {Object} state - Current game state
 */
export function renderTopBar(container, state) {
  if (!container) {
    console.error('[UI ERROR] Top bar container not found');
    return;
  }

  const dateDisplay = state?.time ? formatGameDate(state.time) : '---';
  const isPaused = state?.time?.paused ?? true;

  container.innerHTML = `
    <div class="flex items-center justify-between h-14 px-6">
      <!-- Date Display -->
      <div class="flex items-center gap-4">
        <span class="font-mono text-lg font-semibold">${dateDisplay}</span>
        ${isPaused ? '<span class="text-text-muted text-sm">(PAUSED)</span>' : ''}
      </div>

      <!-- Time Controls Placeholder -->
      <div class="flex items-center gap-2">
        <span class="text-text-muted text-sm">Speed controls coming soon</span>
      </div>

      <!-- Company Stats Placeholder -->
      <div class="flex items-center gap-4">
        <span class="text-text-muted text-sm">Company stats coming later</span>
      </div>
    </div>
  `;
}
