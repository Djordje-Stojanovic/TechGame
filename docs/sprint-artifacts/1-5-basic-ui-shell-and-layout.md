# Story 1.5: Basic UI Shell & Layout

Status: Done

## Story

As a player,
I want to see the main application layout with navigation sidebar and content area,
So that I can navigate between different views.

## Acceptance Criteria

1. **Given** I open `index.html` in Chrome **When** the page loads **Then** I see a dark-themed layout matching UX spec with surface-base (#0a0a0a) background

2. **Given** the page has loaded **When** I view the layout **Then** I see:
   - Left sidebar with navigation items (placeholder icons/labels)
   - Top bar with date display and time controls area (placeholder)
   - Main content area (empty/placeholder for now)
   - Bottom area reserved for future news ticker

3. **Given** the layout is displayed **When** I check the styling **Then**:
   - Background uses `surface-base` (#0a0a0a)
   - Sidebar uses `surface-elevated` (#141414)
   - Text uses the system UI font stack
   - Layout is responsive from 1080p to 4K

4. **Given** the page has loaded **When** the game initializes **Then** the placeholder render function updates the top bar date display area with current game time

## Tasks

- [x] **Task 0: Create UI directory structure** (Setup)
  - Create `src/js/ui/` directory
  - Create `src/js/ui/components/` directory
  - Create `src/js/ui/panels/` directory
  - Remove any `.gitkeep` files from `src/js/ui/` if they exist

- [x] **Task 1: Update index.html** (`index.html`) (AC: 1-3)
  - Add semantic HTML structure for the main layout grid
  - Create left sidebar container with `id="sidebar"`
  - Create top bar container with `id="top-bar"`
  - Create main content area container with `id="main-content"`
  - Create bottom news ticker area container with `id="news-ticker"`
  - Use Tailwind classes for all styling (see HTML template in Dev Notes)

- [x] **Task 2: Create sidebar component** (`src/js/ui/components/sidebar.js`) (AC: 2, 3)
  - Export `renderSidebar(container, activeView)` function (named export)
  - Add placeholder nav items: Dashboard, Market, Company, Design, Intel (emoji icons + labels)
  - Style with `bg-surface-elevated` background
  - Add hover states with `hover:bg-surface-overlay/50`
  - Validate container exists before rendering, log `[UI ERROR]` if missing

- [x] **Task 3: Create top bar component** (`src/js/ui/components/top-bar.js`) (AC: 2, 3, 4)
  - Export `renderTopBar(container, state)` function (named export)
  - Display date as "Q{quarter} {year}" format using `state.time.currentQuarter` and `state.time.currentYear`
  - Show "(PAUSED)" indicator when `state.time.paused` is true
  - Add placeholder areas for time controls and company stats
  - Validate container exists before rendering, log `[UI ERROR]` if missing

- [x] **Task 4: Create dashboard panel** (`src/js/ui/panels/dashboard.js`) (AC: 2)
  - Export `renderDashboard(container)` function (named export)
  - Show placeholder content: "Dashboard" heading + "The Crushing Chart will appear here in Epic 2"
  - Center content vertically and horizontally
  - Validate container exists before rendering, log `[UI ERROR]` if missing

- [x] **Task 5: Create news ticker placeholder** (In `index.html`, Task 1) (AC: 2)
  - News ticker area is created in Task 1 with `id="news-ticker"`
  - Height: `h-12` (48px) via Tailwind class
  - Placeholder text can be added inline in HTML or left empty with subtle border

- [x] **Task 6: Create render coordinator** (`src/js/ui/render.js`) (AC: 4)
  - Export `render(state)` function (named export) - main render entry point
  - Export `initializeUI(state)` function (named export) - one-time shell initialization
  - Export `resetRenderState()` function (named export) - for test isolation
  - Import `renderSidebar` from `./components/sidebar.js`
  - Import `renderTopBar` from `./components/top-bar.js`
  - Maintain `prevState` module variable for future diff-based rendering (Story 1.6)
  - Log `[UI] Shell initialized` on successful init

- [x] **Task 7: Integrate with main.js** (`src/js/main.js`) (AC: 4)
  - Import `render, initializeUI` from `./ui/render.js`
  - Remove the placeholder `render()` function that logs to console
  - Call `initializeUI(state)` in `initialize()` function before starting game loop
  - Pass imported `render` function to `startGameLoop(state, render, handleGameError)`

- [x] **Task 8: Write tests** (`src/js/ui/render.test.js`, `src/js/ui/components/sidebar.test.js`, `src/js/ui/components/top-bar.test.js`) (AC: 1-4)
  - Add `// @vitest-environment jsdom` directive at top of each test file
  - Test sidebar renders all 5 nav items (Dashboard, Market, Company, Design, Intel)
  - Test top bar renders date from state in "Q1 2022" format
  - Test top bar shows "(PAUSED)" when state.time.paused is true
  - Test render coordinator calls component render functions
  - Test graceful handling of missing containers (no throw, logs error)
  - Test `resetRenderState()` clears prevState for test isolation

## Dev Notes

### Quick Reference

| Item | Value |
|------|-------|
| **Primary Files** | `src/js/ui/render.js`, `src/js/ui/components/sidebar.js`, `src/js/ui/components/top-bar.js`, `src/js/ui/panels/dashboard.js` |
| **HTML Changes** | `index.html` - add layout structure |
| **Layer** | `ui/` — can import from `state/`, `utils/` only |
| **Depends On** | `state/game-state.js` (for time data, including `ui.currentView`) |
| **Test Files** | `src/js/ui/render.test.js`, `src/js/ui/components/sidebar.test.js`, `src/js/ui/components/top-bar.test.js` |
| **Directories to Create** | `src/js/ui/`, `src/js/ui/components/`, `src/js/ui/panels/` |

### Layout Architecture (from UX Spec)

```
┌─────────────────────────────────────────────────────────────┐
│  Top Bar: Date/Time | Speed Controls | Company Stats       │
├────────────┬────────────────────────────────────────────────┤
│            │                                                │
│  Left      │           Main Content Area                    │
│  Sidebar   │                                                │
│            │    (Charts, GPU Designer, Market View)         │
│  - Market  │                                                │
│  - Company │                                                │
│  - Design  │                                                │
│  - Intel   │                                                │
│            │                                                │
├────────────┴────────────────────────────────────────────────┤
│  Bottom: News Ticker / Event Log                            │
└─────────────────────────────────────────────────────────────┘
```

### Color System (from UX Spec)

| Token | Hex | Usage |
|-------|-----|-------|
| `surface-base` | `#0a0a0a` | App background |
| `surface-elevated` | `#141414` | Cards, panels, sidebar |
| `surface-overlay` | `#1a1a1a` | Modals, dropdowns |
| `border-subtle` | `rgba(255,255,255,0.05)` | Subtle dividers |
| `border-default` | `rgba(255,255,255,0.1)` | Default borders |
| `text-primary` | `#ffffff` | Primary text |
| `text-secondary` | `#a1a1a1` | Secondary text |
| `text-muted` | `#6b6b6b` | Disabled, hints |
| `accent` | `#3b82f6` | Primary actions, active states |

### Typography (from UX Spec)

```css
/* System UI Stack */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Monospace for data */
font-family: 'SF Mono', 'Cascadia Code', 'Consolas', monospace;
```

### HTML Structure Template

```html
<body class="bg-surface-base text-text-primary min-h-screen">
  <!-- Main Layout Grid -->
  <div id="app" class="h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[auto_1fr]">

    <!-- Top Bar (spans full width) -->
    <header id="top-bar" class="col-span-2 bg-surface-elevated border-b border-border-subtle">
      <!-- Date display, time controls, company stats -->
    </header>

    <!-- Sidebar -->
    <nav id="sidebar" class="bg-surface-elevated border-r border-border-subtle row-span-1">
      <!-- Navigation items -->
    </nav>

    <!-- Main Content -->
    <main id="main-content" class="overflow-auto">
      <!-- Active view renders here -->
    </main>

    <!-- News Ticker (spans full width) -->
    <footer id="news-ticker" class="col-span-2 bg-surface-elevated border-t border-border-subtle h-12">
      <!-- News headlines -->
    </footer>

  </div>
</body>
```

### Sidebar Component Template

```javascript
// src/js/ui/components/sidebar.js

/**
 * Navigation items for the sidebar.
 * Icons are optional for MVP - can use emoji or Unicode symbols.
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
```

### Top Bar Component Template

```javascript
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
        <span class="text-text-muted text-sm">Speed controls coming in Story 2.1</span>
      </div>

      <!-- Company Stats Placeholder -->
      <div class="flex items-center gap-4">
        <span class="text-text-muted text-sm">Company stats coming later</span>
      </div>
    </div>
  `;
}
```

### Render Coordinator Template

```javascript
// src/js/ui/render.js

import { renderSidebar } from './components/sidebar.js';
import { renderTopBar } from './components/top-bar.js';

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

  // Main content placeholder (renders once)
  if (mainContent && !prevState) {
    mainContent.innerHTML = `
      <div class="flex items-center justify-center h-full">
        <div class="text-center">
          <h1 class="text-2xl font-semibold text-text-primary mb-2">Dashboard</h1>
          <p class="text-text-secondary">The Crushing Chart will appear here in Epic 2</p>
        </div>
      </div>
    `;
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
```

### Updated main.js Integration

```javascript
// Replace the placeholder render function with:
import { render, initializeUI } from './ui/render.js';

// In initialize():
initializeUI(state);
startGameLoop(state, render, handleGameError);
```

### Tailwind Config Already Set (verify in tailwind.config.js)

**IMPORTANT - Nested Color Config Note:**

The existing `tailwind.config.js` uses nested color objects like:
```javascript
surface: {
  base: '#0a0a0a',
  elevated: '#141414',
}
```

Tailwind automatically converts this to hyphenated class names:
- `surface.base` → `bg-surface-base`, `text-surface-base`
- `surface.elevated` → `bg-surface-elevated`
- `text.primary` → `text-text-primary`
- `border.subtle` → `border-border-subtle`

This is **already working** in the existing config. Use the hyphenated class names in HTML/JS.

**Existing config structure (DO NOT modify):**

```javascript
colors: {
  surface: {
    base: '#0a0a0a',
    elevated: '#141414',
    overlay: '#1a1a1a',
  },
  border: {
    subtle: 'rgba(255,255,255,0.05)',
    default: 'rgba(255,255,255,0.1)',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a1a1a1',
    muted: '#6b6b6b',
  },
  accent: {
    DEFAULT: '#3b82f6',
    hover: '#2563eb',
  },
  // ... other colors
}
```

**Class name mapping:**
| Config Path | CSS Class Example |
|-------------|-------------------|
| `surface.base` | `bg-surface-base` |
| `surface.elevated` | `bg-surface-elevated` |
| `text.primary` | `text-text-primary` |
| `text.secondary` | `text-text-secondary` |
| `text.muted` | `text-text-muted` |
| `border.subtle` | `border-border-subtle` |
| `accent.DEFAULT` | `bg-accent`, `text-accent` |

### Architecture Compliance

**CRITICAL - Follow these patterns exactly:**

1. **Named exports only** - No `export default`
2. **Layer boundaries** - `ui/` can only import from `state/`, `utils/`
3. **Kebab-case file naming** - `top-bar.js`, `sidebar.js`
4. **camelCase function/variable names** - `renderSidebar`, `topBar`
5. **Error logging prefix** - Use `[UI ERROR]` for UI layer errors
6. **DOM safety** - Always check if container exists before rendering

### State Structure Dependency (VERIFIED)

The render coordinator uses `state.ui.currentView` for sidebar active state.

**Verification:** `createInitialState()` in `src/js/state/game-state.js` already includes:
```javascript
ui: {
  currentView: 'dashboard',  // ← This field exists
  selectedProduct: null,
  gpuDesigner: { ... }
}
```

This dependency is **already satisfied** - no changes to game-state.js needed.

### Previous Story Learnings (Story 1.4)

1. **Input validation** - Validate container elements before rendering
2. **Error handling** - Log errors with consistent `[UI ERROR]` prefix for UI layer
3. **Test coverage** - Test both happy path and error cases
4. **Idempotent operations** - Sidebar can be rendered multiple times safely
5. **Module state cleanup** - Export `resetRenderState()` for test isolation (from Story 1.3 pattern)

### Testing Standards

- Vitest framework (already configured)
- Test file: `*.test.js` in same directory as implementation
- For DOM testing, use `jsdom` environment (see config below)
- Mock DOM elements for component tests
- Test error cases (missing containers)

**Vitest jsdom Configuration:**

Each UI test file MUST include the environment directive at the top:

```javascript
// @vitest-environment jsdom
```

Alternatively, add to `vitest.config.js` for all UI tests:

```javascript
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Use jsdom for all tests in ui/ directory
    environmentMatchGlobs: [
      ['src/js/ui/**/*.test.js', 'jsdom']
    ]
  }
});
```

### Test Template

```javascript
// src/js/ui/render.test.js
// @vitest-environment jsdom

/**
 * @fileoverview Tests for UI render coordinator.
 * Uses jsdom environment for DOM manipulation testing.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, initializeUI, resetRenderState } from './render.js';

describe('render', () => {
  // Setup DOM structure before each test
  beforeEach(() => {
    document.body.innerHTML = `
      <header id="top-bar"></header>
      <nav id="sidebar"></nav>
      <main id="main-content"></main>
      <footer id="news-ticker"></footer>
    `;
    // Reset module state for test isolation
    resetRenderState();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('initializeUI', () => {
    it('renders shell and logs initialization', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      const state = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'dashboard' }
      };

      initializeUI(state);

      expect(consoleSpy).toHaveBeenCalledWith('[UI] Shell initialized');
      consoleSpy.mockRestore();
    });
  });

  describe('render', () => {
    it('renders top bar with game date in Q{n} {year} format', () => {
      const state = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'dashboard' }
      };
      render(state);

      const topBar = document.getElementById('top-bar');
      expect(topBar.textContent).toContain('Q1 2022');
    });

    it('shows (PAUSED) indicator when game is paused', () => {
      const state = {
        time: { currentQuarter: 2, currentYear: 2023, paused: true },
        ui: { currentView: 'dashboard' }
      };
      render(state);

      expect(document.getElementById('top-bar').textContent).toContain('(PAUSED)');
    });

    it('hides (PAUSED) indicator when game is not paused', () => {
      const state = {
        time: { currentQuarter: 2, currentYear: 2023, paused: false },
        ui: { currentView: 'dashboard' }
      };
      render(state);

      expect(document.getElementById('top-bar').textContent).not.toContain('(PAUSED)');
    });

    it('renders sidebar with all 5 nav items', () => {
      const state = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'dashboard' }
      };
      render(state);

      const sidebar = document.getElementById('sidebar');
      expect(sidebar.textContent).toContain('Dashboard');
      expect(sidebar.textContent).toContain('Market');
      expect(sidebar.textContent).toContain('Company');
      expect(sidebar.textContent).toContain('Design');
      expect(sidebar.textContent).toContain('Intel');
    });

    it('highlights active view in sidebar', () => {
      const state = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'market' }
      };
      render(state);

      const marketButton = document.querySelector('[data-view="market"]');
      expect(marketButton.classList.contains('border-accent')).toBe(true);
    });
  });

  describe('error handling', () => {
    it('handles missing top-bar container gracefully', () => {
      document.getElementById('top-bar').remove();
      const consoleSpy = vi.spyOn(console, 'error');
      const state = { time: { currentQuarter: 1, currentYear: 2022 } };

      expect(() => render(state)).not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[UI ERROR]'));
      consoleSpy.mockRestore();
    });

    it('handles missing sidebar container gracefully', () => {
      document.getElementById('sidebar').remove();
      const consoleSpy = vi.spyOn(console, 'error');
      const state = { time: { currentQuarter: 1, currentYear: 2022 } };

      expect(() => render(state)).not.toThrow();
      consoleSpy.mockRestore();
    });

    it('handles completely empty DOM gracefully', () => {
      document.body.innerHTML = '';
      const state = { time: { currentQuarter: 1, currentYear: 2022 } };

      expect(() => render(state)).not.toThrow();
    });
  });

  describe('resetRenderState', () => {
    it('clears prevState for test isolation', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022 }, ui: { currentView: 'dashboard' } };
      render(state);

      // Reset and render again - sidebar should re-render
      resetRenderState();
      render(state);

      // If reset works, sidebar renders again (otherwise it would skip due to prevState check)
      expect(document.getElementById('sidebar').innerHTML).not.toBe('');
    });
  });
});
```

### Sidebar Component Test Template

```javascript
// src/js/ui/components/sidebar.test.js
// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderSidebar } from './sidebar.js';

describe('renderSidebar', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('nav');
    container.id = 'sidebar';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders all 5 navigation items', () => {
    renderSidebar(container, 'dashboard');

    expect(container.textContent).toContain('Dashboard');
    expect(container.textContent).toContain('Market');
    expect(container.textContent).toContain('Company');
    expect(container.textContent).toContain('Design');
    expect(container.textContent).toContain('Intel');
  });

  it('marks the active view with accent border', () => {
    renderSidebar(container, 'company');

    const companyButton = container.querySelector('[data-view="company"]');
    expect(companyButton.classList.contains('border-accent')).toBe(true);
  });

  it('defaults to dashboard as active view', () => {
    renderSidebar(container);

    const dashboardButton = container.querySelector('[data-view="dashboard"]');
    expect(dashboardButton.classList.contains('border-accent')).toBe(true);
  });

  it('logs error when container is null', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    renderSidebar(null, 'dashboard');

    expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Sidebar container not found');
    consoleSpy.mockRestore();
  });
});
```

### Top Bar Component Test Template

```javascript
// src/js/ui/components/top-bar.test.js
// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderTopBar } from './top-bar.js';

describe('renderTopBar', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('header');
    container.id = 'top-bar';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('displays quarter and year from state', () => {
    const state = { time: { currentQuarter: 3, currentYear: 2024, paused: false } };

    renderTopBar(container, state);

    expect(container.textContent).toContain('Q3 2024');
  });

  it('shows PAUSED indicator when paused', () => {
    const state = { time: { currentQuarter: 1, currentYear: 2022, paused: true } };

    renderTopBar(container, state);

    expect(container.textContent).toContain('(PAUSED)');
  });

  it('hides PAUSED indicator when not paused', () => {
    const state = { time: { currentQuarter: 1, currentYear: 2022, paused: false } };

    renderTopBar(container, state);

    expect(container.textContent).not.toContain('(PAUSED)');
  });

  it('shows placeholder when state.time is missing', () => {
    const state = {};

    renderTopBar(container, state);

    expect(container.textContent).toContain('---');
  });

  it('logs error when container is null', () => {
    const consoleSpy = vi.spyOn(console, 'error');
    const state = { time: { currentQuarter: 1, currentYear: 2022 } };

    renderTopBar(null, state);

    expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Top bar container not found');
    consoleSpy.mockRestore();
  });
});
```

### Browser Verification

After implementation:

**Prerequisites:**
```bash
# Build CSS first (required)
npm run build

# Start local server (ES6 modules require HTTP, not file://)
npx live-server
# OR: python -m http.server 8080
```

1. Open `http://localhost:8080` in Chrome (NOT file://)
2. Verify dark background (#0a0a0a) - use DevTools color picker to confirm exact hex
3. Verify sidebar visible on left with 5 nav items (Dashboard, Market, Company, Design, Intel)
4. Verify top bar shows "Q1 2022 (PAUSED)" - quarter and year from initial state
5. Verify main content area shows "Dashboard" heading with placeholder text
6. Verify news ticker area at bottom (48px height, subtle border)
7. Resize window from 1080p to 4K - layout should remain functional
8. Open DevTools → Console → Verify:
   - `[UI] Shell initialized` log message appears
   - NO `[UI ERROR]` messages (would indicate missing containers)
   - NO JavaScript errors or warnings
9. In console, type `window.state.time` and verify time object exists with currentQuarter, currentYear
10. Unpause game via console: `playGame(state)` - verify top bar removes "(PAUSED)" on next tick

### References

- [Source: docs/architecture.md#Project Structure & Boundaries]
- [Source: docs/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: docs/ux-design-specification.md#Visual Design Foundation]
- [Source: docs/ux-design-specification.md#Design Direction]
- [Source: docs/epics.md#Story 1.5: Basic UI Shell & Layout]
- [Source: src/js/main.js - current placeholder render]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

### Completion Notes List

- Removed `.gitkeep` files from UI directories (components, panels, charts)
- Created CSS grid-based layout in index.html with top-bar, sidebar, main-content, and news-ticker areas
- Implemented sidebar component with 5 nav items (Dashboard, Market, Company, Design, Intel) with emoji icons
- Implemented top-bar component displaying "Q{n} {year}" format with (PAUSED) indicator
- Created dashboard panel placeholder with centered content
- Built render coordinator with `render()`, `initializeUI()`, and `resetRenderState()` exports
- Integrated UI rendering into main.js, replacing placeholder console.log render
- Added jsdom dev dependency for DOM testing
- Created comprehensive test suite: 44 new tests (8 sidebar + 11 top-bar + 18 render + 7 dashboard)
- All 133 tests passing (89 existing + 44 new)

**Code Review Fixes (by reviewer):**
- Fixed story template contradiction: Task 4 created dashboard.js but render.js template showed inline code. Resolution: render.js now imports and uses renderDashboard component (DRY principle)
- Added missing error logging for main-content container (consistency with sidebar/top-bar pattern)
- Added tests for dashboard.js component (was missing test coverage)
- Removed internal story reference "Story 2.1" from user-facing placeholder text
- Added build prerequisites (npm run build, local server) to browser verification steps

### File List

**New Files:**
- `src/js/ui/render.js` - Render coordinator
- `src/js/ui/render.test.js` - Render coordinator tests (18 tests)
- `src/js/ui/components/sidebar.js` - Sidebar component
- `src/js/ui/components/sidebar.test.js` - Sidebar tests (8 tests)
- `src/js/ui/components/top-bar.js` - Top bar component
- `src/js/ui/components/top-bar.test.js` - Top bar tests (11 tests)
- `src/js/ui/panels/dashboard.js` - Dashboard panel placeholder
- `src/js/ui/panels/dashboard.test.js` - Dashboard tests (7 tests)

**Modified Files:**
- `index.html` - Added layout grid structure with semantic containers
- `src/js/main.js` - Integrated UI render, removed placeholder render function
- `package.json` - Added jsdom dev dependency

**Deleted Files:**
- `src/js/ui/.gitkeep`
- `src/js/ui/components/.gitkeep`
- `src/js/ui/panels/.gitkeep`
- `src/js/ui/charts/.gitkeep`

