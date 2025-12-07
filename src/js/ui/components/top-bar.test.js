// @vitest-environment jsdom

/**
 * @fileoverview Tests for top bar component with time controls.
 * Uses jsdom environment for DOM manipulation testing.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderTopBar, initKeyboardShortcuts, cleanupKeyboardShortcuts } from './top-bar.js';

// Mock render module to prevent circular dependency issues in tests
vi.mock('../render.js', () => ({
  render: vi.fn()
}));

// Mock time-controls module - MUST create new objects like real code does
// Real code does: state.time = { ...state.time, paused: true }
// This matters for diff-based rendering which compares references
vi.mock('../../core/time-controls.js', () => ({
  togglePause: vi.fn((state) => {
    // Create NEW time object like real implementation
    state.time = { ...state.time, paused: !state.time.paused };
    return state;
  }),
  setSpeed: vi.fn((state, speed) => {
    // Create NEW time object like real implementation
    state.time = { ...state.time, tickSpeed: speed };
    return state;
  })
}));

import { togglePause, setSpeed } from '../../core/time-controls.js';
import { render } from '../render.js';

describe('renderTopBar', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('header');
    container.id = 'top-bar';
    document.body.appendChild(container);
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    cleanupKeyboardShortcuts();
  });

  // ===== Date Display Tests (AC: 1-3) =====

  describe('date display', () => {
    it('displays quarter and year from state in Q{n} {year} format (AC: 1)', () => {
      const state = { time: { currentQuarter: 3, currentYear: 2024, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      expect(container.textContent).toContain('Q3 2024');
    });

    it('displays Q1 2022 for initial state', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };

      renderTopBar(container, state);

      expect(container.textContent).toContain('Q1 2022');
    });

    it('updates date display when quarter changes (AC: 2)', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };
      renderTopBar(container, state);
      expect(container.textContent).toContain('Q1 2022');

      // Simulate quarter change
      state.time.currentQuarter = 2;
      renderTopBar(container, state);
      expect(container.textContent).toContain('Q2 2022');
    });

    it('shows PAUSED indicator when paused (AC: 3)', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };

      renderTopBar(container, state);

      expect(container.textContent).toContain('(PAUSED)');
    });

    it('displays detailed time (month, day, hour) for time progression visibility', () => {
      const state = { time: {
        currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false,
        currentMonth: 2, currentDay: 15, currentHour: 8
      }};

      renderTopBar(container, state);

      const detailedTime = container.querySelector('[data-testid="detailed-time"]');
      expect(detailedTime).not.toBeNull();
      expect(detailedTime.textContent).toBe('M02 D15 H08');
    });

    it('updates detailed time when hours advance', () => {
      const state = { time: {
        currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false,
        currentMonth: 1, currentDay: 1, currentHour: 0
      }};

      renderTopBar(container, state);
      expect(container.querySelector('[data-testid="detailed-time"]').textContent).toBe('M01 D01 H00');

      // Simulate time advancing
      state.time.currentHour = 5;
      renderTopBar(container, state);
      expect(container.querySelector('[data-testid="detailed-time"]').textContent).toBe('M01 D01 H05');
    });

    it('hides PAUSED indicator visually when not paused (opacity-0)', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      // PAUSED indicator is always in DOM for smooth transitions, but visually hidden
      const pausedIndicator = container.querySelector('[data-testid="paused-indicator"]');
      expect(pausedIndicator).not.toBeNull();
      expect(pausedIndicator.className).toContain('opacity-0');
    });

    it('shows placeholder when state.time is missing', () => {
      const state = {};

      renderTopBar(container, state);

      expect(container.textContent).toContain('---');
    });

    it('shows placeholder when state is null', () => {
      renderTopBar(container, null);

      expect(container.textContent).toContain('---');
    });

    it('defaults to paused when paused property is missing', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1 } };

      renderTopBar(container, state);

      expect(container.textContent).toContain('(PAUSED)');
    });
  });

  // ===== Error Handling Tests =====

  describe('error handling', () => {
    it('logs error when container is null', () => {
      const consoleSpy = vi.spyOn(console, 'error');
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1 } };

      renderTopBar(null, state);

      expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Top bar container not found');
      consoleSpy.mockRestore();
    });

    it('does not throw when container is null', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1 } };

      expect(() => renderTopBar(null, state)).not.toThrow();
    });
  });

  // ===== Play/Pause Button Tests (AC: 4-7) =====

  describe('play/pause button', () => {
    it('creates play/pause button (AC: 4, 5)', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };

      renderTopBar(container, state);

      const playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
      expect(playPauseBtn).not.toBeNull();
    });

    it('shows play icon when paused', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };

      renderTopBar(container, state);

      const playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
      expect(playPauseBtn.textContent).toContain('▶');
    });

    it('shows pause icon when playing', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
      expect(playPauseBtn.textContent).toContain('⏸');
    });

    it('calls togglePause when play/pause clicked (AC: 4, 5)', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };

      renderTopBar(container, state);

      const playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
      playPauseBtn.click();

      expect(togglePause).toHaveBeenCalledWith(state);
    });

    it('button icon changes after click (AC: 6)', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };
      const mockRender = vi.fn((s) => renderTopBar(container, s));

      renderTopBar(container, state);
      let playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
      expect(playPauseBtn.textContent).toContain('▶');

      // Simulate the click and re-render
      playPauseBtn.click();
      renderTopBar(container, state); // Re-render with updated state

      playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
      expect(playPauseBtn.textContent).toContain('⏸');
    });

    it('uses accent styling when paused (AC: 7)', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };

      renderTopBar(container, state);

      const playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
      expect(playPauseBtn.classList.contains('bg-accent') || playPauseBtn.className.includes('bg-accent')).toBe(true);
    });
  });

  // ===== Speed Selector Tests (AC: 8-11) =====

  describe('speed selector', () => {
    it('creates speed buttons for 1x, 2x, 4x (AC: 8)', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const speedBtns = container.querySelectorAll('[data-testid="speed-btn"]');
      expect(speedBtns.length).toBe(3);
      expect(speedBtns[0].textContent).toContain('1x');
      expect(speedBtns[1].textContent).toContain('2x');
      expect(speedBtns[2].textContent).toContain('4x');
    });

    it('calls setSpeed when speed button clicked (AC: 9)', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const speedBtns = container.querySelectorAll('[data-testid="speed-btn"]');
      speedBtns[1].click(); // Click 2x

      expect(setSpeed).toHaveBeenCalledWith(state, 2);
    });

    it('calls setSpeed with correct speed value for each button', () => {
      // Start with speed 2 so clicking 1x will trigger (optimization skips same-speed clicks)
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 2, paused: false } };
      const mockRender = vi.fn();

      renderTopBar(container, state, mockRender);
      const speedBtns = container.querySelectorAll('[data-testid="speed-btn"]');

      speedBtns[0].click(); // 1x (different from current 2x)
      expect(setSpeed).toHaveBeenCalledWith(state, 1);

      // Update state to match what setSpeed would do, then re-render
      state.time = { ...state.time, tickSpeed: 1 };
      renderTopBar(container, state);
      const speedBtns2 = container.querySelectorAll('[data-testid="speed-btn"]');

      speedBtns2[1].click(); // 2x (different from current 1x)
      expect(setSpeed).toHaveBeenCalledWith(state, 2);

      state.time = { ...state.time, tickSpeed: 2 };
      renderTopBar(container, state);
      const speedBtns3 = container.querySelectorAll('[data-testid="speed-btn"]');

      speedBtns3[2].click(); // 4x (different from current 2x)
      expect(setSpeed).toHaveBeenCalledWith(state, 4);
    });

    it('highlights active speed button (AC: 10)', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 2, paused: false } };

      renderTopBar(container, state);

      const speedBtns = container.querySelectorAll('[data-testid="speed-btn"]');
      // 2x is active (index 1)
      expect(speedBtns[1].className).toContain('bg-accent');
      expect(speedBtns[0].className).not.toContain('bg-accent');
      expect(speedBtns[2].className).not.toContain('bg-accent');
    });

    it('updates active speed highlight when speed changes', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);
      let speedBtns = container.querySelectorAll('[data-testid="speed-btn"]');
      expect(speedBtns[0].className).toContain('bg-accent');

      // Change speed to 4x
      state.time.tickSpeed = 4;
      renderTopBar(container, state);

      speedBtns = container.querySelectorAll('[data-testid="speed-btn"]');
      expect(speedBtns[2].className).toContain('bg-accent');
      expect(speedBtns[0].className).not.toContain('bg-accent');
    });

    it('inactive speed buttons have subtle styling', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 2, paused: false } };

      renderTopBar(container, state);

      const speedBtns = container.querySelectorAll('[data-testid="speed-btn"]');
      // 1x and 4x are inactive
      expect(speedBtns[0].className).toContain('bg-gray-800');
      expect(speedBtns[2].className).toContain('bg-gray-800');
    });
  });

  // ===== Layout and Structure Tests (AC: 15, 17) =====

  describe('layout and structure', () => {
    it('uses flexbox layout for time controls', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const timeControls = container.querySelector('[data-testid="time-controls"]');
      expect(timeControls).not.toBeNull();
      expect(timeControls.className).toContain('flex');
    });

    it('has date display section', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const dateDisplay = container.querySelector('[data-testid="date-display"]');
      expect(dateDisplay).not.toBeNull();
    });

    it('has speed controls section', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const speedControls = container.querySelector('[data-testid="speed-controls"]');
      expect(speedControls).not.toBeNull();
    });

    it('renders company stats placeholder', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      expect(container.textContent).toContain('Company stats coming later');
    });
  });

  // ===== Visual Theme Tests (AC: 15) =====

  describe('visual theme', () => {
    it('date display uses monospace font', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const dateDisplay = container.querySelector('[data-testid="date-display"]');
      expect(dateDisplay.className).toContain('font-mono');
    });

    it('PAUSED indicator uses amber color', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };

      renderTopBar(container, state);

      const pausedIndicator = container.querySelector('[data-testid="paused-indicator"]');
      expect(pausedIndicator).not.toBeNull();
      expect(pausedIndicator.className).toContain('text-amber');
    });
  });

  // ===== Immediate Render on Click Tests (Issue 7) =====
  // Note: These tests pass a mockRender function directly to renderTopBar
  // because top-bar.js now uses moduleRenderFn instead of importing render
  // to avoid circular dependencies.

  describe('immediate render on click', () => {
    it('calls render immediately when play/pause button is clicked', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };
      const mockRender = vi.fn();

      renderTopBar(container, state, mockRender);
      vi.clearAllMocks(); // Clear any calls from initial setup

      const playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
      playPauseBtn.click();

      expect(mockRender).toHaveBeenCalled();
      expect(mockRender).toHaveBeenCalledWith(state);
    });

    it('calls render immediately when speed button is clicked', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };
      const mockRender = vi.fn();

      renderTopBar(container, state, mockRender);
      vi.clearAllMocks(); // Clear any calls from initial setup

      const speedBtns = container.querySelectorAll('[data-testid="speed-btn"]');
      speedBtns[1].click(); // Click 2x

      expect(mockRender).toHaveBeenCalled();
      expect(mockRender).toHaveBeenCalledWith(state);
    });

    it('renders and updates state in correct order for play/pause', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };
      const callOrder = [];

      // Track call order - mockRender passed to renderTopBar
      const mockRender = vi.fn(() => {
        callOrder.push('render');
      });

      togglePause.mockImplementation((s) => {
        callOrder.push('togglePause');
        s.time = { ...s.time, paused: !s.time.paused };
        return s;
      });

      renderTopBar(container, state, mockRender);
      callOrder.length = 0; // Reset after initial render

      const playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
      playPauseBtn.click();

      expect(callOrder).toEqual(['togglePause', 'render']);
    });
  });

  // ===== PAUSED Indicator Transition Tests (Issue 3) =====

  describe('PAUSED indicator transition', () => {
    it('PAUSED indicator is always in DOM with transition-opacity class', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const pausedIndicator = container.querySelector('[data-testid="paused-indicator"]');
      expect(pausedIndicator).not.toBeNull();
      expect(pausedIndicator.className).toContain('transition-opacity');
    });

    it('PAUSED indicator has opacity-100 when paused', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };

      renderTopBar(container, state);

      const pausedIndicator = container.querySelector('[data-testid="paused-indicator"]');
      expect(pausedIndicator.className).toContain('opacity-100');
      expect(pausedIndicator.className).not.toContain('opacity-0');
    });

    it('PAUSED indicator has opacity-0 when not paused', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const pausedIndicator = container.querySelector('[data-testid="paused-indicator"]');
      expect(pausedIndicator.className).toContain('opacity-0');
      expect(pausedIndicator.className).not.toContain('opacity-100');
    });
  });

  // ===== Accessibility Tests (Issue 5) =====

  describe('accessibility', () => {
    it('time controls have role="group" with aria-label', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const timeControls = container.querySelector('[data-testid="time-controls"]');
      expect(timeControls.getAttribute('role')).toBe('group');
      expect(timeControls.getAttribute('aria-label')).toBe('Time controls');
    });

    it('play/pause button has aria-label', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };

      renderTopBar(container, state);

      const playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
      expect(playPauseBtn.getAttribute('aria-label')).toBe('Play simulation');
    });

    it('play/pause button aria-label changes based on state', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const playPauseBtn = container.querySelector('[data-testid="play-pause-btn"]');
      expect(playPauseBtn.getAttribute('aria-label')).toBe('Pause simulation');
    });

    it('speed buttons have aria-label and aria-pressed', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 2, paused: false } };

      renderTopBar(container, state);

      const speedBtns = container.querySelectorAll('[data-testid="speed-btn"]');

      expect(speedBtns[0].getAttribute('aria-label')).toBe('Set speed to 1x');
      expect(speedBtns[0].getAttribute('aria-pressed')).toBe('false');

      expect(speedBtns[1].getAttribute('aria-label')).toBe('Set speed to 2x');
      expect(speedBtns[1].getAttribute('aria-pressed')).toBe('true');

      expect(speedBtns[2].getAttribute('aria-label')).toBe('Set speed to 4x');
      expect(speedBtns[2].getAttribute('aria-pressed')).toBe('false');
    });

    it('speed controls group has role="group" and aria-label', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const speedControls = container.querySelector('[data-testid="speed-controls"]');
      expect(speedControls.getAttribute('role')).toBe('group');
      expect(speedControls.getAttribute('aria-label')).toBe('Simulation speed');
    });

    it('date display has aria-live for screen reader updates', () => {
      const state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: false } };

      renderTopBar(container, state);

      const dateDisplay = container.querySelector('[data-testid="date-display"]');
      const dateText = dateDisplay.querySelector('[aria-live]');
      expect(dateText).not.toBeNull();
      expect(dateText.getAttribute('aria-live')).toBe('polite');
    });
  });
});

// ===== Keyboard Shortcuts Tests (AC: 12-14) =====

describe('keyboard shortcuts', () => {
  let container;
  let state;
  let renderFn;

  beforeEach(() => {
    container = document.createElement('header');
    container.id = 'top-bar';
    document.body.appendChild(container);
    state = { time: { currentQuarter: 1, currentYear: 2022, tickSpeed: 1, paused: true } };
    renderFn = vi.fn();
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    cleanupKeyboardShortcuts();
  });

  it('Space toggles pause (AC: 12)', () => {
    initKeyboardShortcuts(state, renderFn);

    const event = new KeyboardEvent('keydown', { key: ' ' });
    document.dispatchEvent(event);

    expect(togglePause).toHaveBeenCalledWith(state);
    expect(renderFn).toHaveBeenCalledWith(state);
  });

  it('1 key sets speed to 1 (AC: 13)', () => {
    initKeyboardShortcuts(state, renderFn);

    const event = new KeyboardEvent('keydown', { key: '1' });
    document.dispatchEvent(event);

    expect(setSpeed).toHaveBeenCalledWith(state, 1);
    expect(renderFn).toHaveBeenCalledWith(state);
  });

  it('2 key sets speed to 2 (AC: 13)', () => {
    initKeyboardShortcuts(state, renderFn);

    const event = new KeyboardEvent('keydown', { key: '2' });
    document.dispatchEvent(event);

    expect(setSpeed).toHaveBeenCalledWith(state, 2);
    expect(renderFn).toHaveBeenCalledWith(state);
  });

  it('4 key sets speed to 4 (AC: 13)', () => {
    initKeyboardShortcuts(state, renderFn);

    const event = new KeyboardEvent('keydown', { key: '4' });
    document.dispatchEvent(event);

    expect(setSpeed).toHaveBeenCalledWith(state, 4);
    expect(renderFn).toHaveBeenCalledWith(state);
  });

  it('3 key does nothing (not a valid speed)', () => {
    initKeyboardShortcuts(state, renderFn);

    const event = new KeyboardEvent('keydown', { key: '3' });
    document.dispatchEvent(event);

    expect(setSpeed).not.toHaveBeenCalled();
    expect(renderFn).not.toHaveBeenCalled();
  });

  it('ignores shortcuts when input is focused', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    initKeyboardShortcuts(state, renderFn);

    // Create event with target as input
    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    Object.defineProperty(event, 'target', { value: input, writable: false });
    document.dispatchEvent(event);

    expect(togglePause).not.toHaveBeenCalled();
  });

  it('ignores shortcuts when textarea is focused', () => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.focus();

    initKeyboardShortcuts(state, renderFn);

    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    Object.defineProperty(event, 'target', { value: textarea, writable: false });
    document.dispatchEvent(event);

    expect(togglePause).not.toHaveBeenCalled();
  });

  it('cleanupKeyboardShortcuts removes listener', () => {
    initKeyboardShortcuts(state, renderFn);

    // Verify listener works
    const event1 = new KeyboardEvent('keydown', { key: ' ' });
    document.dispatchEvent(event1);
    expect(togglePause).toHaveBeenCalledTimes(1);

    // Cleanup
    cleanupKeyboardShortcuts();
    vi.clearAllMocks();

    // Verify listener is removed
    const event2 = new KeyboardEvent('keydown', { key: ' ' });
    document.dispatchEvent(event2);
    expect(togglePause).not.toHaveBeenCalled();
  });

  it('reinitializing cleans up previous listener', () => {
    initKeyboardShortcuts(state, renderFn);
    initKeyboardShortcuts(state, renderFn); // Second init should cleanup first

    const event = new KeyboardEvent('keydown', { key: ' ' });
    document.dispatchEvent(event);

    // Should only be called once, not twice (no duplicate listeners)
    expect(togglePause).toHaveBeenCalledTimes(1);
  });

  it('Space prevents default (no page scroll)', () => {
    initKeyboardShortcuts(state, renderFn);

    const event = new KeyboardEvent('keydown', { key: ' ', cancelable: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    document.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
