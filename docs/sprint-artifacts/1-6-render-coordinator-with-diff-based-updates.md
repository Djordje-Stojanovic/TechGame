# Story 1.6: Render Coordinator with Diff-Based Updates

Status: Done

## Story

As a developer,
I want a render system that efficiently updates only changed UI sections,
So that the game maintains 60fps during simulation.

## Acceptance Criteria

1. **Given** the UI shell exists **When** `render(state)` is called **Then** it compares current state to previous state by reference

2. **Given** the render function has a previous state **When** comparing state sections **Then** it only re-renders sections whose state objects changed:
   - `state.time` changed → re-render time display (top bar)
   - `state.market` changed → re-render market charts (future - placeholder for now)
   - `state.player` changed → re-render player panel (future - placeholder for now)
   - `state.companies` changed → re-render competitor cards (future - placeholder for now)
   - `state.ui` changed → re-render sidebar active state and active view

3. **Given** `render(state)` is called **Then** the render function stores `prevState` for comparison after rendering

4. **Given** this is the initial render (no `prevState`) **When** `render(state)` is called **Then** it renders everything

5. **Given** the game loop is running at 4 ticks/sec **When** state.time changes every tick **Then** only the top bar re-renders (not sidebar or main content) to maintain 60fps

6. **Given** `state.ui.currentView` changes **When** `render(state)` is called **Then** the sidebar highlights the new active view AND the main content renders the new view

## Tasks

> **🚨 CRITICAL EXECUTION ORDER 🚨**
>
> **Execute tasks in this order: 4 → 2 → 1 → 3 → 5 → 6 → 7**
>
> Task 4 (placeholder.js) MUST be completed BEFORE Task 1/Task 3, as render.js imports `renderPlaceholder` from that file. Starting with Task 1 will cause import errors.

- [x] **Task 1: Refactor render.js for diff-based rendering** (`src/js/ui/render.js`) (AC: 1-5)
  - Implement reference comparison (`!==`) for each state section
  - Add `state.time !== prevState?.time` check → re-render top bar only
  - Add `state.ui !== prevState?.ui` check → re-render sidebar active state + main content view
  - Keep initial render behavior (render everything when `!prevState`)
  - Store `prevState = state` at end of render (not beginning)
  - Add `[UI] Diff render: X sections updated` debug log (optional, helpful for testing)

- [x] **Task 2: Verify sidebar supports diff-based integration** (`src/js/ui/components/sidebar.js`) (AC: 6)
  - **No code changes needed** - sidebar.js from Story 1.5 already supports being called multiple times (uses innerHTML replacement which is inherently idempotent)
  - Verify active state highlighting works when activeView changes (test manually or via unit tests)
  - This task is verification only - the integration work happens in Task 1 when render.js calls renderSidebar conditionally

- [x] **Task 3: Implement view switching in render coordinator** (`src/js/ui/render.js`) (AC: 6)
  - Track `prevState?.ui?.currentView` to detect view changes
  - When view changes: re-render sidebar (to update active highlight) AND re-render main content
  - Main content should render appropriate panel based on `state.ui.currentView`:
    - 'dashboard' → `renderDashboard(container)`
    - Others → placeholder "Coming Soon" panel (for now)

- [x] **Task 4: Create placeholder panel for non-dashboard views** (`src/js/ui/panels/placeholder.js`) (AC: 6)
  - Export `renderPlaceholder(container, viewName)` function
  - Display: "{displayName}" heading + "Coming in Epic {N}" message (mapped from VIEW_EPIC_MAP)
  - Include VIEW_DISPLAY_NAMES for proper capitalization (market→"Market", design→"GPU Designer", etc.)
  - Validate container exists before rendering, log `[UI ERROR]` if missing
  - Note: Dashboard has its own panel - placeholder is only for market, company, design, intel views

- [x] **Task 5: Add performance logging** (`src/js/ui/render.js`) (AC: 5)
  - Add performance measurement using `performance.now()` at start and end of render()
  - Log `[UI PERF] Render took Xms` with `console.warn` if render takes >16ms
  - **Why 16ms?** At 60fps, each frame has 16.67ms budget (1000ms ÷ 60). Exceeding this causes dropped frames and visible stutter. The diff-based optimization should keep renders well under this threshold.
  - Use `console.debug` for routine "which sections rendered" logging (filtered by default)

- [x] **Task 6: Write comprehensive tests** (`src/js/ui/render.test.js`) (AC: 1-6)
  - Test that initial render (no prevState) renders all sections
  - Test that only top-bar re-renders when only `state.time` changes
  - Test that sidebar does NOT re-render when only `state.time` changes
  - Test that sidebar AND main content re-render when `state.ui` changes
  - Test that changing `state.ui.currentView` triggers both sidebar and main content update
  - Test reference comparison (same object reference = no re-render)
  - Test `resetRenderState()` properly resets prevState for test isolation

- [x] **Task 7: Add placeholder panel tests** (`src/js/ui/panels/placeholder.test.js`) (AC: 6)
  - Test placeholder renders view name heading
  - Test placeholder handles missing container gracefully
  - Test placeholder can be re-rendered safely

## Dev Notes

### Quick Reference

| Item | Value |
|------|-------|
| **Primary File** | `src/js/ui/render.js` |
| **New File** | `src/js/ui/panels/placeholder.js` |
| **Layer** | `ui/` — can import from `state/`, `utils/` only |
| **Depends On** | `state/game-state.js` (for state structure) |
| **Test Files** | `src/js/ui/render.test.js`, `src/js/ui/panels/placeholder.test.js` |

### Architecture Pattern (from docs/architecture.md)

The diff-based rendering pattern from the architecture document:

```javascript
let prevState = null;

export function render(state) {
  // Only re-render sections whose state changed (reference comparison)
  if (state.market !== prevState?.market) {
    renderMarketChart(state.market);
  }
  if (state.player !== prevState?.player) {
    renderPlayerPanel(state.player);
  }
  if (state.companies !== prevState?.companies) {
    renderCompetitorCards(state.companies);
  }
  if (state.time !== prevState?.time) {
    renderTimeControls(state.time);
  }
  if (state.ui !== prevState?.ui) {
    renderActiveView(state);
  }

  prevState = state;
}
```

### Critical Rule for Simulation Code

When updating state, ALWAYS create new object references for changed sections:

```javascript
// ✅ Correct - creates new reference, triggers re-render
state.time = {
  ...state.time,
  currentHour: newHour
};

// ❌ Wrong - mutates in place, render won't detect change
state.time.currentHour = newHour;
```

**Note:** This is already implemented correctly in `game-loop.js` (Story 1.3). The render coordinator just needs to detect these reference changes.

### Current render.js Implementation (Story 1.5)

The current implementation from Story 1.5:
- Renders top bar every tick (not optimized)
- Renders sidebar only once (on first render)
- Renders main content only once (on first render)
- Has `prevState` tracking but doesn't use it for diff comparison

**Cleanup Required:** After implementation, REMOVE this stale comment from render.js (lines 22-24):
```javascript
// Currently renders all components; will be optimized for diff-based
// updates in Story 1.6.
```

### Refactored render.js Template

```javascript
// src/js/ui/render.js

import { renderSidebar } from './components/sidebar.js';
import { renderTopBar } from './components/top-bar.js';
import { renderDashboard } from './panels/dashboard.js';
import { renderPlaceholder } from './panels/placeholder.js';

/**
 * Previous state reference for diff-based rendering.
 * @type {Object|null}
 */
let prevState = null;

/**
 * Resets the render state. Used for test isolation.
 */
export function resetRenderState() {
  prevState = null;
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
  const isInitialRender = !prevState;

  // Time changed → re-render top bar
  if (isInitialRender || state.time !== prevState?.time) {
    if (topBar) {
      renderTopBar(topBar, state);
      rendered.push('topBar');
    } else {
      console.error('[UI ERROR] Top bar container #top-bar not found');
    }
  }

  // UI state changed → re-render sidebar and potentially main content
  if (isInitialRender || state.ui !== prevState?.ui) {
    if (sidebar) {
      renderSidebar(sidebar, state?.ui?.currentView || 'dashboard');
      rendered.push('sidebar');
    } else {
      console.error('[UI ERROR] Sidebar container #sidebar not found');
    }

    // View changed → re-render main content
    const viewChanged = isInitialRender ||
      state.ui?.currentView !== prevState?.ui?.currentView;

    if (viewChanged && mainContent) {
      renderMainContent(mainContent, state);
      rendered.push('mainContent');
    } else if (!mainContent) {
      console.error('[UI ERROR] Main content container #main-content not found');
    }
  }

  // Future: market state changed → re-render market charts
  // if (isInitialRender || state.market !== prevState?.market) {
  //   renderMarketChart(state.market);
  // }

  // Future: player state changed → re-render player panel
  // if (isInitialRender || state.player !== prevState?.player) {
  //   renderPlayerPanel(state.player);
  // }

  // Future: companies state changed → re-render competitor cards
  // if (isInitialRender || state.companies !== prevState?.companies) {
  //   renderCompetitorCards(state.companies);
  // }

  // Store for next diff comparison
  prevState = state;

  // Performance logging - warn only when exceeding frame budget
  const duration = performance.now() - startTime;
  if (duration > 16) {
    console.warn(`[UI PERF] Render took ${duration.toFixed(2)}ms (exceeds 16ms frame budget)`);
  }

  // Routine diff logging - use console.debug (filtered by default in browser DevTools)
  // To see these: DevTools → Console → Levels → check "Verbose"
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

  switch (currentView) {
    case 'dashboard':
      renderDashboard(container);
      break;
    case 'market':
    case 'company':
    case 'design':
    case 'intel':
      renderPlaceholder(container, currentView);
      break;
    default:
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
```

### Placeholder Panel Template

```javascript
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

  container.innerHTML = `
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <h1 class="text-2xl font-semibold text-text-primary mb-2">${displayName}</h1>
        <p class="text-text-secondary">${epicText}</p>
      </div>
    </div>
  `;
}
```

### Test Template Updates

```javascript
// src/js/ui/render.test.js - Additional tests for diff-based rendering
// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, initializeUI, resetRenderState } from './render.js';
// Import modules to spy on - this allows verifying which functions were actually called
import * as sidebarModule from './components/sidebar.js';
import * as topBarModule from './components/top-bar.js';

describe('diff-based rendering', () => {
  let topBar, sidebar, mainContent;
  let sidebarSpy, topBarSpy;

  beforeEach(() => {
    document.body.innerHTML = `
      <header id="top-bar"></header>
      <nav id="sidebar"></nav>
      <main id="main-content"></main>
      <footer id="news-ticker"></footer>
    `;
    topBar = document.getElementById('top-bar');
    sidebar = document.getElementById('sidebar');
    mainContent = document.getElementById('main-content');
    resetRenderState();

    // Setup spies to track which render functions are called
    sidebarSpy = vi.spyOn(sidebarModule, 'renderSidebar');
    topBarSpy = vi.spyOn(topBarModule, 'renderTopBar');
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  describe('initial render', () => {
    it('renders all sections when no prevState exists', () => {
      const state = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'dashboard' }
      };

      render(state);

      expect(topBar.innerHTML).not.toBe('');
      expect(sidebar.innerHTML).not.toBe('');
      expect(mainContent.innerHTML).not.toBe('');
      // Verify all render functions were called on initial render
      expect(sidebarSpy).toHaveBeenCalledTimes(1);
      expect(topBarSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('diff-based updates', () => {
    it('only re-renders top bar when only state.time changes (spy verification)', () => {
      const state1 = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'dashboard' }
      };
      render(state1);

      // Clear spy call counts after initial render
      sidebarSpy.mockClear();
      topBarSpy.mockClear();

      // Create new state with only time changed (new reference)
      const state2 = {
        time: { currentQuarter: 1, currentYear: 2022, paused: false }, // Different object
        ui: state1.ui // Same reference - sidebar should NOT re-render
      };
      render(state2);

      // CRITICAL: Verify renderSidebar was NOT called (optimization working)
      expect(sidebarSpy).not.toHaveBeenCalled();
      // Top bar SHOULD have been called (time changed)
      expect(topBarSpy).toHaveBeenCalledTimes(1);
    });

    it('re-renders sidebar when state.ui changes (spy verification)', () => {
      const state1 = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'dashboard' }
      };
      render(state1);

      // Clear spy call counts after initial render
      sidebarSpy.mockClear();
      topBarSpy.mockClear();

      // New ui object with different view
      const state2 = {
        time: state1.time, // Same reference - topBar should NOT re-render
        ui: { currentView: 'market' } // New reference - sidebar SHOULD re-render
      };
      render(state2);

      // Verify sidebar WAS called (ui changed)
      expect(sidebarSpy).toHaveBeenCalledTimes(1);
      // Verify topBar was NOT called (time reference unchanged)
      expect(topBarSpy).not.toHaveBeenCalled();
      // Sidebar should show market as active
      const marketButton = sidebar.querySelector('[data-view="market"]');
      expect(marketButton.classList.contains('border-accent')).toBe(true);
    });

    it('skips ALL re-renders when same state references passed (spy verification)', () => {
      const timeObj = { currentQuarter: 1, currentYear: 2022, paused: true };
      const uiObj = { currentView: 'dashboard' };
      const state1 = { time: timeObj, ui: uiObj };

      render(state1);

      // Clear spy call counts after initial render
      sidebarSpy.mockClear();
      topBarSpy.mockClear();

      // Create new state object but with SAME nested references
      const state2 = { time: timeObj, ui: uiObj };
      render(state2);

      // CRITICAL: Both should NOT be called (same references = optimization working)
      expect(sidebarSpy).not.toHaveBeenCalled();
      expect(topBarSpy).not.toHaveBeenCalled();
    });
  });

  describe('view switching', () => {
    it('renders placeholder for non-dashboard views', () => {
      const state = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'market' }
      };

      render(state);

      expect(mainContent.textContent).toContain('Market');
      expect(mainContent.textContent).toContain('Coming in Epic 2');
    });

    it('renders dashboard view correctly', () => {
      const state = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'dashboard' }
      };

      render(state);

      expect(mainContent.textContent).toContain('Dashboard');
    });
  });
});
```

### Placeholder Panel Tests

```javascript
// src/js/ui/panels/placeholder.test.js
// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderPlaceholder } from './placeholder.js';

describe('renderPlaceholder', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('main');
    container.id = 'main-content';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders view name as heading', () => {
    renderPlaceholder(container, 'market');

    expect(container.textContent).toContain('Market');
  });

  it('shows epic info for known views', () => {
    renderPlaceholder(container, 'design');

    expect(container.textContent).toContain('Coming in Epic 3');
  });

  it('shows generic coming soon for unknown views', () => {
    renderPlaceholder(container, 'unknown-future-view');

    expect(container.textContent).toContain('Coming soon');
  });

  it('handles unknown view names gracefully', () => {
    renderPlaceholder(container, 'unknown-view');

    expect(container.textContent).toContain('unknown-view');
  });

  it('logs error when container is null', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    renderPlaceholder(null, 'market');

    expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Placeholder container not found');
    consoleSpy.mockRestore();
  });

  it('can be re-rendered safely', () => {
    renderPlaceholder(container, 'market');
    renderPlaceholder(container, 'company');

    expect(container.textContent).toContain('Company');
    expect(container.textContent).not.toContain('Market');
  });

  it('uses proper display names from VIEW_DISPLAY_NAMES', () => {
    renderPlaceholder(container, 'design');
    expect(container.textContent).toContain('GPU Designer'); // Not 'design'

    renderPlaceholder(container, 'intel');
    expect(container.textContent).toContain('Intelligence'); // Not 'intel'
  });

  it('shows correct epic number from VIEW_EPIC_MAP', () => {
    renderPlaceholder(container, 'market');
    expect(container.textContent).toContain('Coming in Epic 2');

    renderPlaceholder(container, 'design');
    expect(container.textContent).toContain('Coming in Epic 3');

    renderPlaceholder(container, 'intel');
    expect(container.textContent).toContain('Coming in Epic 5');
  });
});
```

### Why Diff-Based Rendering Matters

At 4 ticks/sec, `render(state)` is called 4 times per second. Without diff-based rendering:
- Top bar: Re-renders 4x/sec (necessary - time changes)
- Sidebar: Re-renders 4x/sec (unnecessary - static unless view changes)
- Main content: Re-renders 4x/sec (unnecessary - only changes on view switch)

With diff-based rendering:
- Top bar: Re-renders 4x/sec (only when `state.time` changes)
- Sidebar: Re-renders only on view change (when `state.ui` changes)
- Main content: Re-renders only on view change (when `state.ui.currentView` changes)

This is critical for maintaining 60fps when market charts are added in Epic 2.

### Previous Story Learnings (Story 1.5)

1. **Input validation** - Validate container elements before rendering
2. **Error handling** - Log errors with consistent `[UI ERROR]` prefix for UI layer
3. **Test coverage** - Test both happy path and error cases
4. **Idempotent operations** - Components can be rendered multiple times safely
5. **Module state cleanup** - Export `resetRenderState()` for test isolation

### Testing Standards

- Vitest framework (already configured)
- Test file: `*.test.js` in same directory as implementation
- Use `// @vitest-environment jsdom` directive at top of each test file
- Test reference comparison behavior
- Test initial render vs subsequent renders
- Test error cases (missing containers)

### Architecture Compliance

**CRITICAL - Follow these patterns exactly:**

1. **Named exports only** - No `export default`
2. **Layer boundaries** - `ui/` can only import from `state/`, `utils/`
3. **Kebab-case file naming** - `placeholder.js`, `render.js`
4. **camelCase function/variable names** - `renderPlaceholder`, `prevState`
5. **Error logging prefix** - Use `[UI ERROR]` for UI layer errors
6. **DOM safety** - Always check if container exists before rendering
7. **Reference comparison** - Use `!==` for state section comparison
8. **Error recovery** - Do NOT add try-catch inside render functions. Per architecture, the game loop catches all errors and pauses the game. If render() throws, game-loop.js handles it with `[GAME ERROR]` log and `state.time.paused = true`.

### State Structure Reference (VERIFIED)

The state object structure from `src/js/state/game-state.js`:

```javascript
{
  time: { currentHour, currentDay, currentMonth, currentQuarter, currentYear, tickSpeed, paused },
  player: { name, cash, products, rdProjects, marketingBudget },
  companies: { nvidia: {...}, amd: {...}, intel: {...} },
  market: { totalDemand, segments: {...} },
  products: {},
  history: { daily: [], events: [] },
  ui: { currentView, selectedProduct, gpuDesigner: {...} }
}
```

### Browser Verification

After implementation:

**Prerequisites:**
```bash
npm run build
npx live-server
```

1. Open `http://localhost:8080` in Chrome
2. Open DevTools → Console
3. Verify `[UI] Shell initialized` appears once
4. Verify `[UI] Diff render: topBar, sidebar, mainContent` appears on initial load
5. Unpause game via console: `playGame(window.state)` (if available)
6. Watch console - should only see `[UI] Diff render: topBar` on each tick (not sidebar/mainContent)
7. Test view switching via console: `window.state.ui = { currentView: 'market' }; render(window.state)`
8. Verify sidebar highlights "Market" and main content shows placeholder
9. Verify no `[UI PERF]` warnings (render < 16ms)

### References

- [Source: docs/architecture.md#UI Rendering Pattern]
- [Source: docs/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: docs/epics.md#Story 1.6: Render Coordinator with Diff-Based Updates]
- [Source: src/js/ui/render.js - current implementation from Story 1.5]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

### Completion Notes List

- **Task 4 (placeholder.js):** Created placeholder panel component with VIEW_DISPLAY_NAMES and VIEW_EPIC_MAP for proper display names and epic info. 14 tests written covering view name display, epic mapping, error handling, and re-rendering.

- **Task 2 (sidebar verification):** Verified sidebar.js from Story 1.5 supports diff-based integration. Added 3 new tests confirming re-rendering behavior with different active views.

- **Task 1 (diff-based rendering):** Refactored render.js to use reference comparison (`!==`) for state.time and state.ui. Top bar only re-renders when time changes; sidebar/main content only re-render when ui changes.

- **Task 3 (view switching):** Implemented renderMainContent() function that switches between renderDashboard() for dashboard view and renderPlaceholder() for all other views (market, company, design, intel).

- **Task 5 (performance logging):** Added performance.now() measurement with console.warn for renders exceeding 16ms frame budget. Debug logging uses console.debug for routine diff info.

- **Task 6 (render tests):** Added 11 comprehensive tests with spy verification covering initial render, reference comparison (time-only, ui-only, same references), view switching, and performance logging.

- **Task 7 (placeholder tests):** Already covered by Task 4 red-green-refactor cycle - 14 tests total.

**Test Summary:** 161 tests total (up from 150), all passing.

### File List

**Modified Files:**
- `src/js/ui/render.js` - Refactored for diff-based rendering with performance logging
- `src/js/ui/render.test.js` - Added 11 diff-based rendering tests with spy verification
- `src/js/ui/components/sidebar.test.js` - Added 3 diff-based integration verification tests

**New Files:**
- `src/js/ui/panels/placeholder.js` - Placeholder panel component with view display names and epic mapping
- `src/js/ui/panels/placeholder.test.js` - 14 tests for placeholder panel
