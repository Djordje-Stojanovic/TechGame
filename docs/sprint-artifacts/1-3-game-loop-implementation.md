# Story 1.3: Game Loop Implementation

Status: Ready for Review

## Story

As a developer,
I want a game loop that ticks at configurable speeds and triggers state updates,
So that the simulation can run in real-time.

## Acceptance Criteria

1. **Given** the game state exists **When** the game loop starts **Then** `tick()` is called at the configured `tickSpeed` (1, 2, or 4 ticks per second)

2. **And** each tick:
   - Checks if `state.time.paused` — if true, skips processing but still calls render
   - Advances `state.time.currentHour` by 1
   - Rolls over hours → days → months → quarters → years correctly
   - Calls `renderFn(state)` after tick completes

3. **And** the loop uses `setInterval` with calculated interval (1000ms / tickSpeed)

4. **And** errors during tick are caught, logged with `[GAME ERROR]` prefix, pause the game, and show error modal to user

## Tasks

- [x] **Task 1: Create game-loop.js** (AC: 1, 3)
  - Create `src/js/core/game-loop.js`
  - Export functions per signature table below
  - Use `setInterval` with interval = `1000 / state.time.tickSpeed`

- [x] **Task 2: Implement tick with pause check** (AC: 2)
  - Check `state.time.paused` at start
  - If paused, call render and return (UI stays updated)
  - If not paused, proceed with time advancement

- [x] **Task 3: Implement time advancement** (AC: 2)
  - Use constants, not magic numbers
  - Rollover order: hour → day → month → year → quarter (see Rollover Rules)
  - Return NEW object reference (spread operator)

- [x] **Task 4: Implement error handling** (AC: 4)
  - Wrap tick in try-catch
  - On error: log `[GAME ERROR]`, pause game, show modal
  - Call render after pausing so UI reflects paused state

- [x] **Task 5: Implement speed change** (AC: 3)
  - `updateLoopSpeed` clears and restarts interval
  - Works whether paused or not

- [x] **Task 6: Write tests** (AC: 1-4)
  - ALL rollover edge cases (see Test Requirements)
  - Pause behavior
  - Error handling
  - Speed changes

- [x] **Task 7: Integrate with main.js** (AC: 1)
  - Import game loop, create placeholder render
  - Start loop after state init
  - Verify in browser

## Dev Notes

### Key References

| Item | Value |
|------|-------|
| File | `src/js/core/game-loop.js` |
| Layer | `core/` — can import from all layers |
| Depends On | `state/game-state.js` |
| Test File | `src/js/core/game-loop.test.js` |

### Export Signatures

| Function | Signature | Purpose |
|----------|-----------|---------|
| `startGameLoop` | `(state, renderFn, onError?) → void` | Start interval, store refs. Optional error callback. |
| `stopGameLoop` | `() → void` | Clear interval, null refs |
| `updateLoopSpeed` | `(state) → void` | Restart interval with current tickSpeed |

### Time Constants

Define these locally or import from `data/constants.js` when it exists:

```javascript
const HOURS_PER_DAY = 24;
const DAYS_PER_MONTH = 30;
const MONTHS_PER_YEAR = 12;
const QUARTERS_PER_YEAR = 4;
```

### Rollover Rules

**Order matters. Process in this sequence:**

| Step | Condition | Action |
|------|-----------|--------|
| 1 | `hour >= 24` | `hour = 0`, `day++` |
| 2 | `day > 30` | `day = 1`, `month++` |
| 3 | `month > 12` | `month = 1`, `year++` |
| 4 | After year change | `quarter = Math.ceil(month / 3)` |
| 5 | Always | `quarter = Math.ceil(month / 3)` |

**Quarter is DERIVED from month, not tracked independently for rollover.**

Quarter mapping: months 1-3 = Q1, 4-6 = Q2, 7-9 = Q3, 10-12 = Q4

### Implementation

```javascript
// src/js/core/game-loop.js

const HOURS_PER_DAY = 24;
const DAYS_PER_MONTH = 30;
const MONTHS_PER_YEAR = 12;

let intervalId = null;
let currentState = null;
let renderCallback = null;
let errorCallback = null;

function advanceTime(time) {
  let { currentHour, currentDay, currentMonth, currentYear } = time;

  currentHour += 1;

  if (currentHour >= HOURS_PER_DAY) {
    currentHour = 0;
    currentDay += 1;
  }

  if (currentDay > DAYS_PER_MONTH) {
    currentDay = 1;
    currentMonth += 1;
  }

  if (currentMonth > MONTHS_PER_YEAR) {
    currentMonth = 1;
    currentYear += 1;
  }

  // Quarter derived from month - always correct
  const currentQuarter = Math.ceil(currentMonth / 3);

  return { ...time, currentHour, currentDay, currentMonth, currentQuarter, currentYear };
}

function showErrorModal(message) {
  // Minimal implementation - enhance in Story 1.5 UI Shell
  console.warn('[ERROR MODAL]', message);
  alert(message); // Placeholder until proper modal exists
}

function tick() {
  if (currentState.time.paused) {
    if (renderCallback) renderCallback(currentState);
    return;
  }

  try {
    currentState.time = advanceTime(currentState.time);
    if (renderCallback) renderCallback(currentState);
  } catch (error) {
    console.error('[GAME ERROR]', error);
    currentState.time = { ...currentState.time, paused: true };
    showErrorModal('Game paused due to error. Check console.');
    if (errorCallback) errorCallback(error);
    if (renderCallback) renderCallback(currentState);
  }
}

export function startGameLoop(state, renderFn, onError = null) {
  stopGameLoop();
  currentState = state;
  renderCallback = renderFn;
  errorCallback = onError;
  const interval = 1000 / state.time.tickSpeed;
  intervalId = setInterval(tick, interval);
}

export function stopGameLoop() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

export function updateLoopSpeed(state) {
  currentState = state;
  if (intervalId !== null) {
    stopGameLoop();
    startGameLoop(state, renderCallback, errorCallback);
  }
}
```

### Test Requirements

**File:** `src/js/core/game-loop.test.js`

**Required test cases:**

```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { startGameLoop, stopGameLoop, updateLoopSpeed } from './game-loop.js';
import { createInitialState } from '../state/game-state.js';

describe('game-loop', () => {
  let state;
  let renderFn;

  beforeEach(() => {
    vi.useFakeTimers();
    state = createInitialState();
    state.time.paused = false;
    renderFn = vi.fn();
  });

  afterEach(() => {
    stopGameLoop();
    vi.useRealTimers();
  });

  // TICK EXECUTION
  it('calls render at configured tickSpeed', () => {
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalledTimes(1);
  });

  it('calls render multiple times at higher speeds', () => {
    state.time.tickSpeed = 4;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalledTimes(4);
  });

  // PAUSE BEHAVIOR
  it('calls render but skips time advancement when paused', () => {
    state.time.paused = true;
    const initialHour = state.time.currentHour;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalled();
    expect(state.time.currentHour).toBe(initialHour);
  });

  // HOUR → DAY ROLLOVER
  it('rolls hour 23 → 0 and increments day', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 1;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentHour).toBe(0);
    expect(state.time.currentDay).toBe(2);
  });

  // DAY → MONTH ROLLOVER
  it('rolls day 30 → 1 and increments month', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 30;
    state.time.currentMonth = 1;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentDay).toBe(1);
    expect(state.time.currentMonth).toBe(2);
  });

  // MONTH → YEAR ROLLOVER
  it('rolls month 12 → 1 and increments year', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 30;
    state.time.currentMonth = 12;
    state.time.currentYear = 2022;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentMonth).toBe(1);
    expect(state.time.currentYear).toBe(2023);
  });

  // QUARTER DERIVATION
  it('calculates quarter correctly from month', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 30;
    state.time.currentMonth = 3; // End of Q1
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentMonth).toBe(4);
    expect(state.time.currentQuarter).toBe(2);
  });

  // FULL YEAR ROLLOVER
  it('handles full year rollover correctly', () => {
    state.time.currentHour = 23;
    state.time.currentDay = 30;
    state.time.currentMonth = 12;
    state.time.currentQuarter = 4;
    state.time.currentYear = 2022;
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(state.time.currentHour).toBe(0);
    expect(state.time.currentDay).toBe(1);
    expect(state.time.currentMonth).toBe(1);
    expect(state.time.currentQuarter).toBe(1);
    expect(state.time.currentYear).toBe(2023);
  });

  // ERROR HANDLING
  it('pauses game and calls render on error', () => {
    const badRender = vi.fn(() => { throw new Error('Test error'); });
    const errorHandler = vi.fn();
    startGameLoop(state, badRender, errorHandler);
    vi.advanceTimersByTime(1000);
    expect(state.time.paused).toBe(true);
    expect(errorHandler).toHaveBeenCalled();
  });

  // SPEED CHANGE
  it('updates interval when speed changes', () => {
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalledTimes(1);

    state.time.tickSpeed = 2;
    updateLoopSpeed(state);
    renderFn.mockClear();
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalledTimes(2);
  });

  // STOP LOOP
  it('stops calling render after stopGameLoop', () => {
    startGameLoop(state, renderFn);
    vi.advanceTimersByTime(1000);
    expect(renderFn).toHaveBeenCalledTimes(1);

    stopGameLoop();
    renderFn.mockClear();
    vi.advanceTimersByTime(1000);
    expect(renderFn).not.toHaveBeenCalled();
  });
});
```

### Browser Verification

After implementation, verify in browser console:

```javascript
import { startGameLoop, stopGameLoop } from './src/js/core/game-loop.js';
import { createInitialState } from './src/js/state/game-state.js';

const state = createInitialState();
state.time.paused = false;

startGameLoop(state, (s) => {
  console.log(`H:${s.time.currentHour} D:${s.time.currentDay} M:${s.time.currentMonth} Q${s.time.currentQuarter} Y:${s.time.currentYear}`);
});

// Expected at 1 tick/sec after 5 seconds:
// H:1, H:2, H:3, H:4, H:5 (day stays 1)
// After 24 seconds: H:0, D:2

// Stop with: stopGameLoop();
```

### Gotchas

1. **Tab backgrounding**: Browser throttles `setInterval` in background tabs. Acceptable for single-player.
2. **Render when paused**: Always call render, even when paused, so UI reflects current state.
3. **Quarter derived**: Don't track quarter rollover manually. Calculate from month.

### Previous Story Learnings (1.2)

- Named exports only, no `export default`
- Vitest for testing (18 tests baseline)
- Spread operator for state mutations
- Fresh objects per call
- `main.js` exports `initialize()`, no side effects on import

### Definition of Done

- [x] `game-loop.js` created with all 3 exports
- [x] Time advances: hour→day→month→year with quarter derived
- [x] Pause check: render called, time frozen
- [x] Errors: logged, game paused, modal shown, optional callback
- [x] Speed changes restart interval
- [x] 24 tests pass covering all rollover cases, validation, edge cases (exceeded 12+ requirement)
- [x] Browser verification: main.js integrated with placeholder render
- [x] Code review passed with all issues fixed

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- **Task 1-5 Implementation**: Created `src/js/core/game-loop.js` with all three exports (`startGameLoop`, `stopGameLoop`, `updateLoopSpeed`) plus internal `advanceTime` and `tick` functions.
- **Time Constants**: Used named constants `HOURS_PER_DAY=24`, `DAYS_PER_MONTH=30`, `MONTHS_PER_YEAR=12` for clarity.
- **Rollover Logic**: Implemented correct sequence hour→day→month→year with quarter derived via `Math.ceil(month/3)`.
- **Pause Handling**: When paused, render is called but time doesn't advance.
- **Error Handling**: Wrapped tick in try-catch. On error: logs `[GAME ERROR]`, pauses game, shows modal via `showErrorModal()`, calls optional error callback, then attempts render (with nested try-catch to prevent double-throw).
- **Speed Change**: `updateLoopSpeed` clears and restarts interval with new tickSpeed.
- **Testing**: 16 comprehensive tests covering all tick speeds (1/2/4), pause behavior, all rollover edge cases (hour→day, day→month, month→year, quarter transitions Q1→Q2→Q3→Q4→Q1), full year rollover, error handling, speed changes, stop behavior, and double-start prevention.
- **Main.js Integration**: Added imports, placeholder render function logging time, error handler, and re-exports for external control.

### File List

- `src/js/core/game-loop.js` (created)
- `src/js/core/game-loop.test.js` (created)
- `src/js/main.js` (modified)
- `docs/sprint-artifacts/sprint-status.yaml` (modified)
- `docs/bmm-workflow-status.yaml` (modified)

### Change Log

- 2025-12-03: Story 1.3 implementation complete - game loop with configurable tick speed, time advancement, pause handling, error handling, and 16 tests
- 2025-12-03: Code review fixes applied:
  - Added tickSpeed validation (must be 1, 2, or 4)
  - Fixed module state reset in stopGameLoop
  - Fixed updateLoopSpeed to preserve callbacks when restarting
  - Changed showErrorModal to use console.error for consistency
  - Added tests for error modal, updateLoopSpeed when stopped, tickSpeed validation
  - Test count increased from 16 to 24
