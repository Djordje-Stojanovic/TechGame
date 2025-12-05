// src/js/ui/panels/placeholder.js

/**
 * View name to display text mapping.
 * Note: 'dashboard' is NOT included - it has its own panel (dashboard.js)
 */
const VIEW_DISPLAY_NAMES = {
  market: 'Market',
  company: 'Company',
  design: 'GPU Designer',
  intel: 'Intelligence'
};

/**
 * View name to epic mapping for placeholder text.
 * Maps each placeholder view to the epic where it will be implemented.
 * Note: 'dashboard' is NOT included - it has its own panel (dashboard.js)
 */
const VIEW_EPIC_MAP = {
  market: 2,   // Epic 2: The Living Market
  company: 3,  // Epic 3: GPU Design & Product Launch
  design: 3,   // Epic 3: GPU Design & Product Launch
  intel: 5     // Epic 5: Intelligent Competitors
};

/**
 * Renders a placeholder panel for views not yet implemented.
 * Uses DOM API with textContent for XSS safety (defense in depth).
 * @param {HTMLElement} container - The container element
 * @param {string} viewName - The view identifier (never 'dashboard' - has own panel)
 */
export function renderPlaceholder(container, viewName) {
  if (!container) {
    console.error('[UI ERROR] Placeholder container not found');
    return;
  }

  const displayName = VIEW_DISPLAY_NAMES[viewName] || viewName;
  const epicNum = VIEW_EPIC_MAP[viewName];
  const epicText = epicNum ? `Coming in Epic ${epicNum}` : 'Coming soon';

  // Use DOM API with textContent for XSS safety (viewName could be unknown value)
  const wrapper = document.createElement('div');
  wrapper.className = 'flex items-center justify-center h-full';

  const inner = document.createElement('div');
  inner.className = 'text-center';

  const heading = document.createElement('h1');
  heading.className = 'text-2xl font-semibold text-text-primary mb-2';
  heading.textContent = displayName;

  const subtitle = document.createElement('p');
  subtitle.className = 'text-text-secondary';
  subtitle.textContent = epicText;

  inner.appendChild(heading);
  inner.appendChild(subtitle);
  wrapper.appendChild(inner);

  container.innerHTML = '';
  container.appendChild(wrapper);
}
