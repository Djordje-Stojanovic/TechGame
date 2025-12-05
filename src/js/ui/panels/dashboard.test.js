// @vitest-environment jsdom

/**
 * @fileoverview Tests for dashboard panel component.
 * Uses jsdom environment for DOM manipulation testing.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderDashboard } from './dashboard.js';

describe('renderDashboard', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('main');
    container.id = 'main-content';
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders dashboard heading', () => {
    renderDashboard(container);

    expect(container.textContent).toContain('Dashboard');
  });

  it('renders placeholder text about Epic 2', () => {
    renderDashboard(container);

    expect(container.textContent).toContain('The Crushing Chart will appear here in Epic 2');
  });

  it('centers content vertically and horizontally', () => {
    renderDashboard(container);

    const wrapper = container.querySelector('.flex.items-center.justify-center.h-full');
    expect(wrapper).not.toBeNull();
  });

  it('applies correct text styling classes', () => {
    renderDashboard(container);

    const heading = container.querySelector('h1');
    expect(heading.classList.contains('text-2xl')).toBe(true);
    expect(heading.classList.contains('font-semibold')).toBe(true);
    expect(heading.classList.contains('text-text-primary')).toBe(true);
  });

  it('logs error when container is null', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    renderDashboard(null);

    expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Dashboard container not found');
    consoleSpy.mockRestore();
  });

  it('does not throw when container is null', () => {
    expect(() => renderDashboard(null)).not.toThrow();
  });

  it('renders paragraph with secondary text styling', () => {
    renderDashboard(container);

    const paragraph = container.querySelector('p');
    expect(paragraph.classList.contains('text-text-secondary')).toBe(true);
  });
});
