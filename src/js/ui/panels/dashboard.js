// src/js/ui/panels/dashboard.js

/**
 * Renders the dashboard panel content.
 * @param {HTMLElement} container - The main content container element
 */
export function renderDashboard(container) {
  if (!container) {
    console.error('[UI ERROR] Dashboard container not found');
    return;
  }

  container.innerHTML = `
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <h1 class="text-2xl font-semibold text-text-primary mb-2">Dashboard</h1>
        <p class="text-text-secondary">The Crushing Chart will appear here in Epic 2</p>
      </div>
    </div>
  `;
}
