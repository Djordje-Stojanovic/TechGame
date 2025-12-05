// @vitest-environment jsdom

/**
 * @fileoverview Tests for placeholder panel component.
 * Tests view display names, epic mapping, and error handling.
 */

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
    vi.restoreAllMocks();
  });

  describe('view name display', () => {
    it('renders view name as heading', () => {
      renderPlaceholder(container, 'market');

      expect(container.textContent).toContain('Market');
    });

    it('uses proper display names from VIEW_DISPLAY_NAMES', () => {
      renderPlaceholder(container, 'design');
      expect(container.textContent).toContain('GPU Designer');

      renderPlaceholder(container, 'intel');
      expect(container.textContent).toContain('Intelligence');
    });

    it('handles unknown view names gracefully (uses raw view name)', () => {
      renderPlaceholder(container, 'unknown-view');

      expect(container.textContent).toContain('unknown-view');
    });
  });

  describe('epic mapping', () => {
    it('shows epic info for known views', () => {
      renderPlaceholder(container, 'design');

      expect(container.textContent).toContain('Coming in Epic 3');
    });

    it('shows correct epic number from VIEW_EPIC_MAP for market', () => {
      renderPlaceholder(container, 'market');
      expect(container.textContent).toContain('Coming in Epic 2');
    });

    it('shows correct epic number from VIEW_EPIC_MAP for company', () => {
      renderPlaceholder(container, 'company');
      expect(container.textContent).toContain('Coming in Epic 3');
    });

    it('shows correct epic number from VIEW_EPIC_MAP for design', () => {
      renderPlaceholder(container, 'design');
      expect(container.textContent).toContain('Coming in Epic 3');
    });

    it('shows correct epic number from VIEW_EPIC_MAP for intel', () => {
      renderPlaceholder(container, 'intel');
      expect(container.textContent).toContain('Coming in Epic 5');
    });

    it('shows generic coming soon for unknown views', () => {
      renderPlaceholder(container, 'unknown-future-view');

      expect(container.textContent).toContain('Coming soon');
    });
  });

  describe('error handling', () => {
    it('logs error when container is null', () => {
      const consoleSpy = vi.spyOn(console, 'error');

      renderPlaceholder(null, 'market');

      expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Placeholder container not found');
    });

    it('logs error when container is undefined', () => {
      const consoleSpy = vi.spyOn(console, 'error');

      renderPlaceholder(undefined, 'market');

      expect(consoleSpy).toHaveBeenCalledWith('[UI ERROR] Placeholder container not found');
    });

    it('does not throw when container is missing', () => {
      expect(() => renderPlaceholder(null, 'market')).not.toThrow();
    });
  });

  describe('re-rendering', () => {
    it('can be re-rendered safely', () => {
      renderPlaceholder(container, 'market');
      renderPlaceholder(container, 'company');

      expect(container.textContent).toContain('Company');
      expect(container.textContent).not.toContain('Market');
    });

    it('replaces previous content completely', () => {
      renderPlaceholder(container, 'market');
      expect(container.textContent).toContain('Epic 2');

      renderPlaceholder(container, 'intel');
      expect(container.textContent).toContain('Epic 5');
      expect(container.textContent).not.toContain('Epic 2');
    });
  });
});
