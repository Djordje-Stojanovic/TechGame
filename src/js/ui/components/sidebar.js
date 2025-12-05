// src/js/ui/components/sidebar.js

/**
 * Navigation items for the sidebar.
 * Icons are optional for MVP - using emoji for simplicity.
 */
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'market', label: 'Market', icon: '📈' },
  { id: 'company', label: 'Company', icon: '🏢' },
  { id: 'design', label: 'Design', icon: '🔧' },
  { id: 'intel', label: 'Intel', icon: '🔍' }
];

/**
 * Renders the sidebar navigation.
 * @param {HTMLElement} container - The sidebar container element
 * @param {string} activeView - Currently active view ID (optional)
 */
export function renderSidebar(container, activeView = 'dashboard') {
  if (!container) {
    console.error('[UI ERROR] Sidebar container not found');
    return;
  }

  container.innerHTML = `
    <div class="p-4 space-y-2">
      ${NAV_ITEMS.map(item => `
        <button
          data-view="${item.id}"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left
                 ${item.id === activeView
                   ? 'bg-surface-overlay border-l-2 border-accent text-text-primary'
                   : 'text-text-secondary hover:bg-surface-overlay/50 hover:text-text-primary'}
                 transition-all duration-150"
        >
          <span class="text-lg">${item.icon}</span>
          <span class="text-sm font-medium">${item.label}</span>
        </button>
      `).join('')}
    </div>
  `;
}
