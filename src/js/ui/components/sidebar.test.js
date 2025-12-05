// @vitest-environment jsdom

/**
 * @fileoverview Tests for sidebar component.
 * Uses jsdom environment for DOM manipulation testing.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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

  it('renders navigation items with emoji icons', () => {
    renderSidebar(container, 'dashboard');

    expect(container.textContent).toContain('📊');
    expect(container.textContent).toContain('📈');
    expect(container.textContent).toContain('🏢');
    expect(container.textContent).toContain('🔧');
    expect(container.textContent).toContain('🔍');
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

  it('applies inactive styling to non-active views', () => {
    renderSidebar(container, 'dashboard');

    const marketButton = container.querySelector('[data-view="market"]');
    expect(marketButton.classList.contains('text-text-secondary')).toBe(true);
    expect(marketButton.classList.contains('border-accent')).toBe(false);
  });

  it('logs error when container is null', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    renderSidebar(null, 'dashboard');

    expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Sidebar container not found');
    consoleSpy.mockRestore();
  });

  it('does not throw when container is null', () => {
    expect(() => renderSidebar(null, 'dashboard')).not.toThrow();
  });

  it('renders buttons with data-view attributes', () => {
    renderSidebar(container, 'dashboard');

    const buttons = container.querySelectorAll('[data-view]');
    expect(buttons.length).toBe(5);
    expect(buttons[0].getAttribute('data-view')).toBe('dashboard');
    expect(buttons[1].getAttribute('data-view')).toBe('market');
    expect(buttons[2].getAttribute('data-view')).toBe('company');
    expect(buttons[3].getAttribute('data-view')).toBe('design');
    expect(buttons[4].getAttribute('data-view')).toBe('intel');
  });
});
