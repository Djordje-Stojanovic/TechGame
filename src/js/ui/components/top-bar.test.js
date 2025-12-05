// @vitest-environment jsdom

/**
 * @fileoverview Tests for top bar component.
 * Uses jsdom environment for DOM manipulation testing.
 */

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

  it('displays quarter and year from state in Q{n} {year} format', () => {
    const state = { time: { currentQuarter: 3, currentYear: 2024, paused: false } };

    renderTopBar(container, state);

    expect(container.textContent).toContain('Q3 2024');
  });

  it('displays Q1 2022 for initial state', () => {
    const state = { time: { currentQuarter: 1, currentYear: 2022, paused: true } };

    renderTopBar(container, state);

    expect(container.textContent).toContain('Q1 2022');
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

  it('shows placeholder when state is null', () => {
    renderTopBar(container, null);

    expect(container.textContent).toContain('---');
  });

  it('defaults to paused when paused property is missing', () => {
    const state = { time: { currentQuarter: 1, currentYear: 2022 } };

    renderTopBar(container, state);

    expect(container.textContent).toContain('(PAUSED)');
  });

  it('logs error when container is null', () => {
    const consoleSpy = vi.spyOn(console, 'error');
    const state = { time: { currentQuarter: 1, currentYear: 2022 } };

    renderTopBar(null, state);

    expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Top bar container not found');
    consoleSpy.mockRestore();
  });

  it('does not throw when container is null', () => {
    const state = { time: { currentQuarter: 1, currentYear: 2022 } };

    expect(() => renderTopBar(null, state)).not.toThrow();
  });

  it('renders time controls placeholder', () => {
    const state = { time: { currentQuarter: 1, currentYear: 2022, paused: false } };

    renderTopBar(container, state);

    expect(container.textContent).toContain('Speed controls coming soon');
  });

  it('renders company stats placeholder', () => {
    const state = { time: { currentQuarter: 1, currentYear: 2022, paused: false } };

    renderTopBar(container, state);

    expect(container.textContent).toContain('Company stats coming later');
  });
});
