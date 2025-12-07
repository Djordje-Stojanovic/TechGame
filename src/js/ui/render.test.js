// @vitest-environment jsdom

/**
 * @fileoverview Tests for UI render coordinator.
 * Uses jsdom environment for DOM manipulation testing.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, initializeUI, resetRenderState } from './render.js';
// Import modules to spy on - this allows verifying which functions were actually called
import * as sidebarModule from './components/sidebar.js';
import * as topBarModule from './components/top-bar.js';
import * as dashboardModule from './panels/dashboard.js';
import * as placeholderModule from './panels/placeholder.js';

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

    it('renders top bar with game date', () => {
      const state = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'dashboard' }
      };

      initializeUI(state);

      const topBar = document.getElementById('top-bar');
      expect(topBar.textContent).toContain('Q1 2022');
    });

    it('renders sidebar with nav items', () => {
      const state = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'dashboard' }
      };

      initializeUI(state);

      const sidebar = document.getElementById('sidebar');
      expect(sidebar.textContent).toContain('Dashboard');
      expect(sidebar.textContent).toContain('Market');
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

    it('hides (PAUSED) indicator visually when game is not paused (opacity-0)', () => {
      const state = {
        time: { currentQuarter: 2, currentYear: 2023, paused: false },
        ui: { currentView: 'dashboard' }
      };
      render(state);

      // PAUSED indicator is always in DOM for smooth transitions, but visually hidden
      const pausedIndicator = document.querySelector('[data-testid="paused-indicator"]');
      expect(pausedIndicator).not.toBeNull();
      expect(pausedIndicator.className).toContain('opacity-0');
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

    it('renders main content with dashboard placeholder', () => {
      const state = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true },
        ui: { currentView: 'dashboard' }
      };
      render(state);

      const mainContent = document.getElementById('main-content');
      expect(mainContent.textContent).toContain('Dashboard');
      expect(mainContent.textContent).toContain('The Crushing Chart will appear here in Epic 2');
    });

    it('defaults to dashboard view when ui.currentView is missing', () => {
      const state = {
        time: { currentQuarter: 1, currentYear: 2022, paused: true }
      };
      render(state);

      const dashboardButton = document.querySelector('[data-view="dashboard"]');
      expect(dashboardButton.classList.contains('border-accent')).toBe(true);
    });
  });

  describe('error handling', () => {
    it('handles missing top-bar container gracefully', () => {
      document.getElementById('top-bar').remove();
      const consoleSpy = vi.spyOn(console, 'error');
      const state = { time: { currentQuarter: 1, currentYear: 2022 } };

      expect(() => render(state)).not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Top bar container #top-bar not found');
      consoleSpy.mockRestore();
    });

    it('handles missing sidebar container gracefully', () => {
      document.getElementById('sidebar').remove();
      const consoleSpy = vi.spyOn(console, 'error');
      const state = { time: { currentQuarter: 1, currentYear: 2022 } };

      expect(() => render(state)).not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Sidebar container #sidebar not found');
      consoleSpy.mockRestore();
    });

    it('handles missing main-content container gracefully', () => {
      document.getElementById('main-content').remove();
      const consoleSpy = vi.spyOn(console, 'error');
      const state = { time: { currentQuarter: 1, currentYear: 2022 } };

      expect(() => render(state)).not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Main content container #main-content not found');
      consoleSpy.mockRestore();
    });

    it('handles completely empty DOM gracefully', () => {
      document.body.innerHTML = '';
      const state = { time: { currentQuarter: 1, currentYear: 2022 } };

      expect(() => render(state)).not.toThrow();
    });

    it('handles state with undefined time gracefully', () => {
      const state = { ui: { currentView: 'dashboard' } };

      expect(() => render(state)).not.toThrow();
      // Sidebar and main content should still render
      expect(document.getElementById('sidebar').innerHTML).not.toBe('');
      expect(document.getElementById('main-content').innerHTML).not.toBe('');
    });

    it('handles state with undefined ui gracefully', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, paused: true } };

      expect(() => render(state)).not.toThrow();
      // Should default to dashboard view
      const dashboardButton = document.querySelector('[data-view="dashboard"]');
      expect(dashboardButton.classList.contains('border-accent')).toBe(true);
    });

    it('handles empty state object gracefully', () => {
      const state = {};

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

    it('allows sidebar to re-render after reset', () => {
      const state1 = { time: { currentQuarter: 1, currentYear: 2022 }, ui: { currentView: 'dashboard' } };
      render(state1);

      // Clear sidebar content manually
      document.getElementById('sidebar').innerHTML = '';

      // Without reset, sidebar would not re-render
      render(state1);
      expect(document.getElementById('sidebar').innerHTML).toBe('');

      // After reset, sidebar should re-render
      resetRenderState();
      render(state1);
      expect(document.getElementById('sidebar').innerHTML).not.toBe('');
    });
  });

  describe('subsequent renders', () => {
    it('updates top bar when time reference changes', () => {
      const state1 = { time: { currentQuarter: 1, currentYear: 2022, paused: true }, ui: { currentView: 'dashboard' } };
      render(state1);
      expect(document.getElementById('top-bar').textContent).toContain('Q1 2022');

      // New time object reference triggers top bar re-render
      const state2 = { time: { currentQuarter: 2, currentYear: 2022, paused: false }, ui: { currentView: 'dashboard' } };
      render(state2);
      expect(document.getElementById('top-bar').textContent).toContain('Q2 2022');
      // PAUSED indicator is always in DOM for smooth transitions, but visually hidden
      const pausedIndicator = document.querySelector('[data-testid="paused-indicator"]');
      expect(pausedIndicator.className).toContain('opacity-0');
    });

    it('preserves sidebar container element through re-renders', () => {
      const state1 = { time: { currentQuarter: 1, currentYear: 2022, paused: true }, ui: { currentView: 'dashboard' } };
      render(state1);

      // Mark sidebar container to verify element survives (innerHTML replaces children, not container)
      const sidebar = document.getElementById('sidebar');
      sidebar.setAttribute('data-test-marker', 'original');

      // New ui reference triggers sidebar re-render, but container element persists
      const state2 = { time: { currentQuarter: 2, currentYear: 2022, paused: false }, ui: { currentView: 'market' } };
      render(state2);

      // Container element survives - attribute still present (children replaced, not element)
      expect(sidebar.getAttribute('data-test-marker')).toBe('original');
    });
  });

  describe('diff-based rendering (Story 1.6)', () => {
    let sidebarSpy, topBarSpy, dashboardSpy, placeholderSpy;

    beforeEach(() => {
      // Setup spies to track which render functions are called
      sidebarSpy = vi.spyOn(sidebarModule, 'renderSidebar');
      topBarSpy = vi.spyOn(topBarModule, 'renderTopBar');
      dashboardSpy = vi.spyOn(dashboardModule, 'renderDashboard');
      placeholderSpy = vi.spyOn(placeholderModule, 'renderPlaceholder');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    describe('initial render', () => {
      it('renders all sections when no prevState exists', () => {
        const state = {
          time: { currentQuarter: 1, currentYear: 2022, paused: true },
          ui: { currentView: 'dashboard' }
        };

        render(state);

        expect(topBarSpy).toHaveBeenCalledTimes(1);
        expect(sidebarSpy).toHaveBeenCalledTimes(1);
        expect(dashboardSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('reference comparison', () => {
      it('only re-renders top bar when only state.time changes (spy verification)', () => {
        const uiObj = { currentView: 'dashboard' };
        const state1 = {
          time: { currentQuarter: 1, currentYear: 2022, paused: true },
          ui: uiObj
        };
        render(state1);

        // Clear spy call counts after initial render
        sidebarSpy.mockClear();
        topBarSpy.mockClear();
        dashboardSpy.mockClear();

        // Create new state with only time changed (new reference), same ui reference
        const state2 = {
          time: { currentQuarter: 1, currentYear: 2022, paused: false }, // Different object
          ui: uiObj // Same reference - sidebar should NOT re-render
        };
        render(state2);

        // Top bar SHOULD have been called (time changed)
        expect(topBarSpy).toHaveBeenCalledTimes(1);
        // CRITICAL: Verify renderSidebar was NOT called (optimization working)
        expect(sidebarSpy).not.toHaveBeenCalled();
        // Main content also should NOT re-render (ui didn't change)
        expect(dashboardSpy).not.toHaveBeenCalled();
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
        dashboardSpy.mockClear();

        // Keep same time reference, but new ui object
        const state2 = {
          time: state1.time, // Same reference - topBar should NOT re-render
          ui: { currentView: 'dashboard' } // New reference - sidebar SHOULD re-render
        };
        render(state2);

        // Verify sidebar WAS called (ui reference changed)
        expect(sidebarSpy).toHaveBeenCalledTimes(1);
        // Verify topBar was NOT called (time reference unchanged)
        expect(topBarSpy).not.toHaveBeenCalled();
      });

      it('skips ALL re-renders when same state references passed (spy verification)', () => {
        const timeObj = { currentQuarter: 1, currentYear: 2022, paused: true };
        const uiObj = { currentView: 'dashboard' };
        const state1 = { time: timeObj, ui: uiObj };

        render(state1);

        // Clear spy call counts after initial render
        sidebarSpy.mockClear();
        topBarSpy.mockClear();
        dashboardSpy.mockClear();

        // Create new state object but with SAME nested references
        const state2 = { time: timeObj, ui: uiObj };
        render(state2);

        // CRITICAL: Both should NOT be called (same references = optimization working)
        expect(sidebarSpy).not.toHaveBeenCalled();
        expect(topBarSpy).not.toHaveBeenCalled();
        expect(dashboardSpy).not.toHaveBeenCalled();
      });
    });

    describe('view switching', () => {
      it('renders placeholder for non-dashboard views', () => {
        const state = {
          time: { currentQuarter: 1, currentYear: 2022, paused: true },
          ui: { currentView: 'market' }
        };

        render(state);

        const mainContent = document.getElementById('main-content');
        expect(mainContent.textContent).toContain('Market');
        expect(mainContent.textContent).toContain('Coming in Epic 2');
        expect(placeholderSpy).toHaveBeenCalled();
      });

      it('renders dashboard when currentView is dashboard', () => {
        const state = {
          time: { currentQuarter: 1, currentYear: 2022, paused: true },
          ui: { currentView: 'dashboard' }
        };

        render(state);

        expect(dashboardSpy).toHaveBeenCalled();
        expect(placeholderSpy).not.toHaveBeenCalled();
      });

      it('switches from dashboard to placeholder when view changes', () => {
        const state1 = {
          time: { currentQuarter: 1, currentYear: 2022, paused: true },
          ui: { currentView: 'dashboard' }
        };
        render(state1);

        dashboardSpy.mockClear();
        placeholderSpy.mockClear();

        const state2 = {
          time: state1.time,
          ui: { currentView: 'design' }
        };
        render(state2);

        expect(placeholderSpy).toHaveBeenCalledWith(
          expect.any(HTMLElement),
          'design'
        );
        expect(dashboardSpy).not.toHaveBeenCalled();
        expect(document.getElementById('main-content').textContent).toContain('GPU Designer');
      });

      it('updates sidebar highlight when view changes', () => {
        const state1 = {
          time: { currentQuarter: 1, currentYear: 2022, paused: true },
          ui: { currentView: 'dashboard' }
        };
        render(state1);

        const state2 = {
          time: state1.time,
          ui: { currentView: 'intel' }
        };
        render(state2);

        const intelButton = document.querySelector('[data-view="intel"]');
        expect(intelButton.classList.contains('border-accent')).toBe(true);

        const dashboardButton = document.querySelector('[data-view="dashboard"]');
        expect(dashboardButton.classList.contains('border-accent')).toBe(false);
      });

      it('re-renders main content only when view actually changes, not just ui reference', () => {
        const state1 = {
          time: { currentQuarter: 1, currentYear: 2022, paused: true },
          ui: { currentView: 'dashboard' }
        };
        render(state1);

        dashboardSpy.mockClear();
        sidebarSpy.mockClear();

        // New ui reference but SAME currentView
        const state2 = {
          time: state1.time,
          ui: { currentView: 'dashboard' } // Same view, different reference
        };
        render(state2);

        // Sidebar re-renders (ui reference changed)
        expect(sidebarSpy).toHaveBeenCalledTimes(1);
        // Main content does NOT re-render (view didn't change)
        expect(dashboardSpy).not.toHaveBeenCalled();
      });
    });

    describe('performance logging', () => {
      it('does not warn when render is fast', () => {
        const warnSpy = vi.spyOn(console, 'warn');
        const state = {
          time: { currentQuarter: 1, currentYear: 2022, paused: true },
          ui: { currentView: 'dashboard' }
        };

        render(state);

        // Should not log warning for fast renders
        expect(warnSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
      });

      it('warns when render exceeds 16ms frame budget', () => {
        const warnSpy = vi.spyOn(console, 'warn');

        // Mock performance.now() to simulate slow render (20ms)
        let callCount = 0;
        const originalNow = performance.now;
        vi.spyOn(performance, 'now').mockImplementation(() => {
          callCount++;
          // First call (start): 0ms, Second call (end): 20ms = 20ms duration
          return callCount === 1 ? 0 : 20;
        });

        const state = {
          time: { currentQuarter: 1, currentYear: 2022, paused: true },
          ui: { currentView: 'dashboard' }
        };

        render(state);

        // Should log warning for slow render (>16ms)
        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining('[UI PERF] Render took')
        );
        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining('exceeds 16ms frame budget')
        );

        warnSpy.mockRestore();
        performance.now.mockRestore();
      });

      it('logs debug message for diff render', () => {
        const debugSpy = vi.spyOn(console, 'debug');
        const state = {
          time: { currentQuarter: 1, currentYear: 2022, paused: true },
          ui: { currentView: 'dashboard' }
        };

        render(state);

        expect(debugSpy).toHaveBeenCalledWith(expect.stringContaining('[UI] Diff render:'));
        debugSpy.mockRestore();
      });

      it('does not log debug when nothing rendered (same references)', () => {
        const timeObj = { currentQuarter: 1, currentYear: 2022, paused: true };
        const uiObj = { currentView: 'dashboard' };
        const state = { time: timeObj, ui: uiObj };

        render(state); // Initial render

        const debugSpy = vi.spyOn(console, 'debug');

        // Same references - nothing should render
        render({ time: timeObj, ui: uiObj });

        // No debug log when nothing rendered
        expect(debugSpy).not.toHaveBeenCalled();
        debugSpy.mockRestore();
      });
    });
  });
});
