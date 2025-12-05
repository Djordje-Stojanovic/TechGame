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
    it('updates top bar on every render', () => {
      const state1 = { time: { currentQuarter: 1, currentYear: 2022, paused: true }, ui: { currentView: 'dashboard' } };
      render(state1);
      expect(document.getElementById('top-bar').textContent).toContain('Q1 2022');

      const state2 = { time: { currentQuarter: 2, currentYear: 2022, paused: false }, ui: { currentView: 'dashboard' } };
      render(state2);
      expect(document.getElementById('top-bar').textContent).toContain('Q2 2022');
      expect(document.getElementById('top-bar').textContent).not.toContain('(PAUSED)');
    });

    it('does not re-render sidebar on subsequent renders', () => {
      const state1 = { time: { currentQuarter: 1, currentYear: 2022, paused: true }, ui: { currentView: 'dashboard' } };
      render(state1);

      // Mark sidebar to detect if it re-renders
      const sidebar = document.getElementById('sidebar');
      sidebar.setAttribute('data-rendered', 'true');

      const state2 = { time: { currentQuarter: 2, currentYear: 2022, paused: false }, ui: { currentView: 'market' } };
      render(state2);

      // Sidebar should still have the marker (wasn't re-rendered)
      expect(sidebar.getAttribute('data-rendered')).toBe('true');
    });
  });
});
