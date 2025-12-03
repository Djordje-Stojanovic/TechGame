# Story 1.4: Time Controls

Status: Ready for Review

## Story

As a player,
I want to pause, play, and adjust simulation speed,
So that I can control the pace of the game.

## Acceptance Criteria

1. **Given** the game is running **When** I call `pauseGame(state)` **Then** `state.time.paused` becomes `true` and ticks stop processing

2. **Given** the game is paused **When** I call `playGame(state)` **Then** `state.time.paused` becomes `false` and ticks resume

3. **Given** the game is running **When** I call `setSpeed(state, speed)` with speed 1, 2, or 4 **Then** `state.time.tickSpeed` updates and the game loop adjusts interval

4. **Given** any game state **When** I call `skipToNextQuarter(state)` **Then** time advances to hour 0, day 1 of the next quarter's first month instantly (with year rollover if Q4→Q1)

## Tasks

- [x] **Task 0: Export VALID_TICK_SPEEDS from game-loop.js** (AC: 3)
  - Change `const VALID_TICK_SPEEDS` to `export const VALID_TICK_SPEEDS` in game-loop.js
  - This enables import in time-controls.js and future UI components

- [x] **Task 1: Create time-controls.js** (AC: 1-4)
  - Create `src/js/core/time-controls.js`
  - Export all 5 functions as named exports (pauseGame, playGame, togglePause, setSpeed, skipToNextQuarter)
  - Import `updateLoopSpeed, VALID_TICK_SPEEDS` from game-loop.js
  - Remove `.gitkeep` from `src/js/core/` if still present

- [x] **Task 2: Implement pauseGame** (AC: 1)
  - Set `state.time.paused = true` using spread operator
  - Return state for chaining (optional)

- [x] **Task 3: Implement playGame** (AC: 2)
  - Set `state.time.paused = false` using spread operator
  - Return state for chaining (optional)

- [x] **Task 4: Implement setSpeed** (AC: 3)
  - Validate speed is 1, 2, or 4 (throw Error if invalid)
  - Update `state.time.tickSpeed` using spread operator
  - Call `updateLoopSpeed(state)` from game-loop.js to restart interval
  - Return state for chaining (optional)

- [x] **Task 5: Implement skipToNextQuarter** (AC: 4)
  - Calculate next quarter from current month
  - Handle Q4→Q1 year rollover
  - Set hour=0, day=1, month=first month of next quarter
  - Derive quarter from new month using `Math.ceil(month / 3)`
  - Use spread operator for state mutation
  - Return state for chaining (optional)

- [x] **Task 6: Write comprehensive tests** (AC: 1-4)
  - All 4 functions with valid inputs
  - Edge cases: Q4→Q1 rollover, invalid speed values
  - Integration: verify updateLoopSpeed is called for setSpeed

- [x] **Task 7: Integration** (AC: 1-4)
  - Add exports to main.js for external access
  - Verify in browser console

## Dev Notes

### Quick Reference

| Item | Value |
|------|-------|
| **File** | `src/js/core/time-controls.js` |
| **Exports** | `pauseGame`, `playGame`, `togglePause`, `setSpeed`, `skipToNextQuarter` (named exports) |
| **Layer** | `core/` — can import from all layers |
| **Depends On** | `core/game-loop.js` (for `updateLoopSpeed`) |
| **Test File** | `src/js/core/time-controls.test.js` |

### Export Signatures

| Function | Signature | Purpose |
|----------|-----------|---------|
| `pauseGame` | `(state) → state` | Set paused=true |
| `playGame` | `(state) → state` | Set paused=false |
| `togglePause` | `(state) → state` | Toggle pause state (for UI buttons) |
| `setSpeed` | `(state, speed) → state` | Update tickSpeed, restart loop |
| `skipToNextQuarter` | `(state) → state` | Jump to next quarter boundary |

### Valid Tick Speeds

**ACTION REQUIRED:** Add export to `game-loop.js`:
```javascript
export const VALID_TICK_SPEEDS = [1, 2, 4];
```

Then import in time-controls.js:
```javascript
import { updateLoopSpeed, VALID_TICK_SPEEDS } from './game-loop.js';
```

This avoids duplicate definitions and lets UI components also import valid speeds for rendering speed buttons.

### Quarter Derivation

Quarter is always derived from month: `Math.ceil(month / 3)`

First month of each quarter: Q1=1, Q2=4, Q3=7, Q4=10 (formula: `quarter * 3 - 2`)

### skipToNextQuarter Logic

**IMPORTANT - Skip is INSTANT:**
- Does NOT process intermediate ticks (no simulation runs for skipped time)
- Does NOT record history for skipped days (no sales, no events)
- Does NOT call render (caller must trigger render after skip)
- Just teleports time to the start of next quarter

```javascript
// Calculate first month of next quarter
const currentQuarter = Math.ceil(currentMonth / 3);
let nextQuarterFirstMonth = currentQuarter * 3 + 1; // Q1→4, Q2→7, Q3→10, Q4→13
let nextYear = currentYear;

if (nextQuarterFirstMonth > 12) {
  nextQuarterFirstMonth = 1; // Q4 → Q1
  nextYear += 1;
}

// Reset to start of next quarter (set quarter for immediate UI consistency)
state.time = {
  ...state.time,
  currentHour: 0,
  currentDay: 1,
  currentMonth: nextQuarterFirstMonth,
  currentQuarter: Math.ceil(nextQuarterFirstMonth / 3),
  currentYear: nextYear
};
return state;
```

### Implementation Template

```javascript
// src/js/core/time-controls.js
import { updateLoopSpeed, VALID_TICK_SPEEDS } from './game-loop.js';

/**
 * Pauses the game simulation.
 * @param {Object} state - Game state object
 * @returns {Object} Updated state
 */
export function pauseGame(state) {
  state.time = { ...state.time, paused: true };
  return state;
}

/**
 * Resumes the game simulation.
 * @param {Object} state - Game state object
 * @returns {Object} Updated state
 */
export function playGame(state) {
  state.time = { ...state.time, paused: false };
  return state;
}

/**
 * Toggles pause state (convenience for UI buttons).
 * @param {Object} state - Game state object
 * @returns {Object} Updated state
 */
export function togglePause(state) {
  return state.time.paused ? playGame(state) : pauseGame(state);
}

/**
 * Sets the simulation speed.
 * @param {Object} state - Game state object
 * @param {number} speed - Tick speed (1, 2, or 4)
 * @returns {Object} Updated state
 * @throws {Error} If speed is not 1, 2, or 4
 */
export function setSpeed(state, speed) {
  if (!VALID_TICK_SPEEDS.includes(speed)) {
    throw new Error(`Invalid speed: ${speed}. Must be one of: ${VALID_TICK_SPEEDS.join(', ')}`);
  }
  state.time = { ...state.time, tickSpeed: speed };
  updateLoopSpeed(state);
  return state;
}

/**
 * Advances time instantly to the start of the next quarter.
 * @param {Object} state - Game state object
 * @returns {Object} Updated state
 */
export function skipToNextQuarter(state) {
  if (!state?.time?.currentMonth || !state?.time?.currentYear) {
    throw new Error('skipToNextQuarter requires valid state.time with currentMonth and currentYear');
  }
  const { currentMonth, currentYear } = state.time;
  const currentQuarter = Math.ceil(currentMonth / 3);

  let nextQuarterFirstMonth = currentQuarter * 3 + 1;
  let nextYear = currentYear;

  if (nextQuarterFirstMonth > 12) {
    nextQuarterFirstMonth = 1;
    nextYear += 1;
  }

  // Note: We DO set currentQuarter here for immediate UI consistency,
  // even though game-loop also derives it. Both use same formula.
  state.time = {
    ...state.time,
    currentHour: 0,
    currentDay: 1,
    currentMonth: nextQuarterFirstMonth,
    currentQuarter: Math.ceil(nextQuarterFirstMonth / 3),
    currentYear: nextYear
  };

  return state;
}
```

### Test Template

```javascript
// src/js/core/time-controls.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { pauseGame, playGame, togglePause, setSpeed, skipToNextQuarter } from './time-controls.js';
import { createInitialState } from '../state/game-state.js';
import * as gameLoop from './game-loop.js';

describe('time-controls', () => {
  let state;

  beforeEach(() => {
    state = createInitialState();
  });

  describe('pauseGame', () => {
    it('sets paused to true', () => {
      playGame(state); // Start from known state
      pauseGame(state);
      expect(state.time.paused).toBe(true);
    });

    it('is safe when already paused (idempotent)', () => {
      pauseGame(state);
      pauseGame(state); // Call again
      expect(state.time.paused).toBe(true);
    });

    it('returns state for chaining', () => {
      const result = pauseGame(state);
      expect(result).toBe(state);
    });
  });

  describe('playGame', () => {
    it('sets paused to false', () => {
      pauseGame(state); // Start from known state
      playGame(state);
      expect(state.time.paused).toBe(false);
    });

    it('is safe when already playing (idempotent)', () => {
      playGame(state);
      playGame(state); // Call again
      expect(state.time.paused).toBe(false);
    });

    it('returns state for chaining', () => {
      const result = playGame(state);
      expect(result).toBe(state);
    });
  });

  describe('togglePause', () => {
    it('pauses when playing', () => {
      playGame(state);
      togglePause(state);
      expect(state.time.paused).toBe(true);
    });

    it('plays when paused', () => {
      pauseGame(state);
      togglePause(state);
      expect(state.time.paused).toBe(false);
    });

    it('returns state for chaining', () => {
      const result = togglePause(state);
      expect(result).toBe(state);
    });
  });

  describe('setSpeed', () => {
    beforeEach(() => {
      vi.spyOn(gameLoop, 'updateLoopSpeed').mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('sets tickSpeed to valid values (1, 2, 4)', () => {
      setSpeed(state, 1);
      expect(state.time.tickSpeed).toBe(1);

      setSpeed(state, 2);
      expect(state.time.tickSpeed).toBe(2);

      setSpeed(state, 4);
      expect(state.time.tickSpeed).toBe(4);
    });

    it('throws on invalid speed', () => {
      expect(() => setSpeed(state, 3)).toThrow('Invalid speed');
      expect(() => setSpeed(state, 0)).toThrow('Invalid speed');
      expect(() => setSpeed(state, -1)).toThrow('Invalid speed');
    });

    it('calls updateLoopSpeed after setting speed', () => {
      setSpeed(state, 2);
      expect(gameLoop.updateLoopSpeed).toHaveBeenCalledWith(state);
    });

    it('is safe when setting same speed (idempotent)', () => {
      state.time.tickSpeed = 2;
      setSpeed(state, 2); // Same speed
      expect(state.time.tickSpeed).toBe(2);
      expect(gameLoop.updateLoopSpeed).toHaveBeenCalled(); // Still restarts loop (ok)
    });

    it('returns state for chaining', () => {
      const result = setSpeed(state, 2);
      expect(result).toBe(state);
    });

    it('actually changes loop timing when loop is running', () => {
      vi.restoreAllMocks(); // Use real updateLoopSpeed for this test
      vi.useFakeTimers();
      const { startGameLoop, stopGameLoop } = gameLoop;
      const renderFn = vi.fn();

      state.time.tickSpeed = 1;
      state.time.paused = false;
      startGameLoop(state, renderFn);

      vi.advanceTimersByTime(1000);
      expect(renderFn).toHaveBeenCalledTimes(1); // 1 tick/sec

      renderFn.mockClear();
      setSpeed(state, 4); // Change to 4x speed

      vi.advanceTimersByTime(1000);
      expect(renderFn).toHaveBeenCalledTimes(4); // Now 4 ticks/sec

      stopGameLoop();
      vi.useRealTimers();
    });
  });

  describe('skipToNextQuarter', () => {
    it('skips Q1 → Q2 (month 1 → 4)', () => {
      state.time.currentMonth = 1;
      state.time.currentQuarter = 1;
      state.time.currentYear = 2022;

      skipToNextQuarter(state);

      expect(state.time.currentMonth).toBe(4);
      expect(state.time.currentQuarter).toBe(2);
      expect(state.time.currentYear).toBe(2022);
    });

    it('skips Q2 → Q3 (month 4 → 7)', () => {
      state.time.currentMonth = 6;
      state.time.currentQuarter = 2;

      skipToNextQuarter(state);

      expect(state.time.currentMonth).toBe(7);
      expect(state.time.currentQuarter).toBe(3);
    });

    it('skips Q3 → Q4 (month 7 → 10)', () => {
      state.time.currentMonth = 9;
      state.time.currentQuarter = 3;

      skipToNextQuarter(state);

      expect(state.time.currentMonth).toBe(10);
      expect(state.time.currentQuarter).toBe(4);
    });

    it('skips Q4 → Q1 with year rollover', () => {
      state.time.currentMonth = 12;
      state.time.currentQuarter = 4;
      state.time.currentYear = 2022;

      skipToNextQuarter(state);

      expect(state.time.currentMonth).toBe(1);
      expect(state.time.currentQuarter).toBe(1);
      expect(state.time.currentYear).toBe(2023);
    });

    it('resets hour and day to start of quarter', () => {
      state.time.currentHour = 15;
      state.time.currentDay = 20;
      state.time.currentMonth = 2;

      skipToNextQuarter(state);

      expect(state.time.currentHour).toBe(0);
      expect(state.time.currentDay).toBe(1);
    });

    it('returns state for chaining', () => {
      const result = skipToNextQuarter(state);
      expect(result).toBe(state);
    });
  });
});
```

### main.js Integration

Add to exports:
```javascript
import { pauseGame, playGame, togglePause, setSpeed, skipToNextQuarter } from './core/time-controls.js';

// ... existing code ...

// Re-export time controls for external use
export { pauseGame, playGame, togglePause, setSpeed, skipToNextQuarter };
```

### Browser Verification

After integration, test in console: `initialize()` → `playGame(state)` → `pauseGame(state)` → `setSpeed(state, 4)` → `skipToNextQuarter(state)`. Verify time changes as expected.

### Architecture Compliance

**CRITICAL - Follow these patterns exactly:**

1. **Named exports only** - No `export default`
2. **Spread operator for state mutations** - Creates new object references
3. **Import from same layer or below** - `core/` can import from `core/`
4. **Kebab-case file naming** - `time-controls.js`
5. **camelCase function/variable names** - `pauseGame`, `tickSpeed`

### Previous Story Learnings (Story 1.3)

- `updateLoopSpeed(state)` already exists in game-loop.js - import and use it, don't recreate
- game-loop.js has internal `VALID_TICK_SPEEDS = [1, 2, 4]` - we need our own copy until it's exported

### Testing Standards

- Vitest framework (already configured in package.json)
- Test file: `*.test.js` in same directory as implementation
- Mock external module calls with `vi.spyOn()`
- Test all valid inputs AND error cases
- Test return values for chaining

### References

- [Source: docs/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: docs/architecture.md#State Structure Pattern]
- [Source: docs/epics.md#Story 1.4: Time Controls]
- [Source: src/js/core/game-loop.js - updateLoopSpeed implementation]
- [Source: src/js/state/game-state.js - time state structure]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

### Completion Notes List

- ✅ Task 0: Exported `VALID_TICK_SPEEDS` from game-loop.js for reuse
- ✅ Tasks 1-5: Created time-controls.js with all 5 functions (pauseGame, playGame, togglePause, setSpeed, skipToNextQuarter)
- ✅ Task 6: Wrote 23 comprehensive tests covering all functions, edge cases (Q4→Q1 rollover), and integration with game-loop
- ✅ Task 7: Integrated time controls into main.js with re-exports for external access
- All 65 tests pass (42 existing + 23 new)
- Removed .gitkeep from src/js/core/ as it now has real files

### File List

- `src/js/core/game-loop.js` - Modified: exported VALID_TICK_SPEEDS
- `src/js/core/time-controls.js` - Created: pauseGame, playGame, togglePause, setSpeed, skipToNextQuarter
- `src/js/core/time-controls.test.js` - Created: 23 tests
- `src/js/main.js` - Modified: imports and re-exports time controls
- `src/js/core/.gitkeep` - Deleted

