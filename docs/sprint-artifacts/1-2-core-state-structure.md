# Story 1.2: Core State Structure

Status: Done

## Story

As a developer,
I want the central game state object defined with all required sections,
So that all modules can read/write game data consistently.

## Acceptance Criteria

1. **Given** the project is initialized **When** I import from `state/game-state.js` **Then** I can access `createInitialState()` function

2. **And** the returned state object has this structure:
```javascript
{
  time: { currentHour, currentDay, currentMonth, currentQuarter, currentYear, tickSpeed, paused },
  player: { name, cash, products: [], rdProjects: [], marketingBudget },
  companies: { nvidia: {...}, amd: {...}, intel: {...} },
  market: { totalDemand, segments: {...}, preferences: {...} },
  products: {},
  history: { daily: [], events: [] },
  ui: { currentView, selectedProduct, gpuDesigner: {...} }
}
```

3. **And** the state meets these requirements:
   - `time.currentYear` defaults to 2022 (FR21)
   - `time.currentQuarter` defaults to 1
   - All state keys use camelCase
   - `JSON.stringify(state)` succeeds without errors

## Tasks

- [x] **Task 1: Create file and export function**
  - Create `src/js/state/game-state.js`
  - Remove `.gitkeep` from `src/js/state/` if present
  - Export `createInitialState()` as named function

- [x] **Task 2: Implement complete state structure**
  - Copy the complete state structure from Dev Notes below
  - Ensure all values match the specification exactly

- [x] **Task 3: Integrate with main.js**
  - Import and call `createInitialState()` in main.js
  - Log state to verify structure

- [x] **Task 4: Verify all acceptance criteria**
  - Verify year=2022, quarter=1
  - Verify `JSON.stringify(state)` works
  - Verify all keys are camelCase

## Dev Notes

### Quick Reference

| Item | Value |
|------|-------|
| **File** | `src/js/state/game-state.js` |
| **Export** | `createInitialState()` (named export, NOT default) |
| **Layer** | `state/` — can only import from `utils/` |

**CRITICAL RULES:**
1. Use `maxPrice: 999999` for highend segment (NOT `Infinity` — breaks JSON)
2. Named exports only — no `export default`
3. Function must return fresh object each call (no shared references)

---

### Complete State Structure

Copy this exactly:

```javascript
/**
 * Creates the initial game state object.
 * Called once when starting a new game.
 * @returns {Object} Fresh game state object (JSON-serializable)
 */
export function createInitialState() {
  return {
    // Time & simulation control (Story 1.3 handles rollover: hour→day→month→quarter→year)
    time: {
      currentHour: 0,
      currentDay: 1,
      currentMonth: 1,
      currentQuarter: 1,
      currentYear: 2022,
      tickSpeed: 1,
      paused: true
    },

    // Player company (name configurable in Story 6.6 new game setup)
    player: {
      name: "PlayerCorp",
      cash: 10000000,
      products: [],
      rdProjects: [],
      marketingBudget: 0
    },

    // AI competitors
    companies: {
      nvidia: {
        name: "NVIDIA",
        cash: 15000000000,
        products: [],
        rdProjects: [],
        marketingBudget: 0,
        rdFocus: null
      },
      amd: {
        name: "AMD",
        cash: 3000000000,
        products: [],
        rdProjects: [],
        marketingBudget: 0,
        rdFocus: null
      },
      intel: {
        name: "Intel Arc",
        cash: 25000000000,
        products: [],
        rdProjects: [],
        marketingBudget: 0,
        rdFocus: null
      }
    },

    // Market state
    market: {
      totalDemand: 50000000,
      segments: {
        budget: {
          name: "Budget",
          minPrice: 0,
          maxPrice: 299,
          demandShare: 0.40,
          priceWeight: 0.7,
          perfWeight: 0.3
        },
        midrange: {
          name: "Midrange",
          minPrice: 300,
          maxPrice: 599,
          demandShare: 0.40,
          priceWeight: 0.5,
          perfWeight: 0.5
        },
        highend: {
          name: "High-end",
          minPrice: 600,
          maxPrice: 999999,
          demandShare: 0.20,
          priceWeight: 0.3,
          perfWeight: 0.7
        }
      },
      preferences: {
        performanceWeight: 0.5,
        priceWeight: 0.5,
        efficiencyWeight: 0.0,
        brandWeight: 0.2
      }
    },

    // Products registry (key format: {company}-{name-slug}-{launchQuarter})
    products: {},

    // Historical data
    history: {
      daily: [],
      events: []
    },

    // UI state
    ui: {
      currentView: 'dashboard',
      selectedProduct: null,
      gpuDesigner: {
        specs: {
          cores: 4096,
          vram: 8,
          clockSpeed: 1.8,
          tdp: 200,
          dieSize: 300,
          nm: 7
        },
        name: '',
        price: 0
      }
    }
  };
}
```

---

### State Section Reference

#### time
| Field | Type | Default | Notes |
|-------|------|---------|-------|
| currentHour | number | 0 | 0-23, advances each tick |
| currentDay | number | 1 | 1-90 (days per quarter) |
| currentMonth | number | 1 | 1-12 |
| currentQuarter | number | 1 | 1-4 |
| currentYear | number | 2022 | FR21 requirement |
| tickSpeed | number | 1 | 1, 2, or 4 ticks/sec |
| paused | boolean | true | Game starts paused |

#### player / companies.{nvidia|amd|intel}
| Field | Type | Default | Notes |
|-------|------|---------|-------|
| name | string | varies | Display name |
| cash | number | varies | Player: $10M, NVIDIA: $15B, AMD: $3B, Intel: $25B |
| products | array | [] | Product ID references |
| rdProjects | array | [] | Active R&D |
| marketingBudget | number | 0 | Current allocation |
| rdFocus | string\|null | null | AI only - strategic focus (Epic 5) |

#### market.segments.{budget|midrange|highend}
| Field | Type | Notes |
|-------|------|-------|
| name | string | UI display label |
| minPrice | number | Segment floor |
| maxPrice | number | Segment ceiling (highend: 999999) |
| demandShare | number | Fraction of total demand |
| priceWeight | number | How much segment values price (0-1) |
| perfWeight | number | How much segment values performance (0-1) |

**Segment weights:** These define how consumers IN EACH SEGMENT prioritize price vs performance. Budget buyers care 70% about price, high-end buyers care 70% about performance.

#### market.preferences
| Field | Type | Default | Notes |
|-------|------|---------|-------|
| performanceWeight | number | 0.5 | Global market trend |
| priceWeight | number | 0.5 | Global market trend |
| efficiencyWeight | number | 0.0 | Grows over time (Story 4.6) |
| brandWeight | number | 0.2 | Brand loyalty factor |

**Global preferences:** These represent market-wide trends that shift over time (Story 4.6). They modify the base segment weights. When `efficiencyWeight` increases, ALL segments start caring more about power efficiency.

#### products
Empty object `{}`. Products keyed by ID format: `{company}-{name-slug}-{launchQuarter}`

Examples: `nvidia-rtx-3080-2020q4`, `player-phoenix-gtx-2022q2`

#### history
- `daily: []` — Per-day sales/financial records (populated by simulation)
- `events: []` — News events, milestones, bankruptcies

#### ui
Separate from simulation state. Only UI modules write to this section.

---

### State Mutation Pattern

**CRITICAL for future stories.** When updating state in simulation code:

```javascript
// ✅ CORRECT - creates new reference, triggers re-render
state.time = { ...state.time, currentHour: newHour };

// ❌ WRONG - mutates in place, render won't detect change
state.time.currentHour = newHour;
```

---

### Verification

After implementation, verify in browser console:

```javascript
import { createInitialState } from './src/js/state/game-state.js';
const state = createInitialState();
console.log(state.time.currentYear);    // 2022
console.log(state.time.currentQuarter); // 1
JSON.stringify(state);                  // No error
```

---

### Previous Story Learnings (Story 1.1)

- Named exports only (established pattern)
- Kebab-case file naming: `game-state.js`
- ES6 module format with `type="module"` in index.html

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes List

- Created `src/js/state/game-state.js` with complete state structure per spec
- Removed `.gitkeep` placeholder from state directory
- Integrated state initialization in `main.js` with console logging
- Verified all acceptance criteria:
  - `time.currentYear` = 2022 ✓
  - `time.currentQuarter` = 1 ✓
  - `JSON.stringify(state)` succeeds (1266 chars) ✓
  - All keys use camelCase ✓
  - Fresh object returned per call (no shared references) ✓
- Used `maxPrice: 999999` for highend segment (not Infinity) per critical rule
- Named export only, no default export per project pattern

### File List

- `src/js/state/game-state.js` (created)
- `src/js/state/game-state.test.js` (created) - [Code Review Fix]
- `src/js/main.js` (modified)
- `src/js/state/.gitkeep` (deleted)
- `index.html` (modified) - [Code Review Fix]
- `package.json` (modified) - [Code Review Fix]
- `.gitattributes` (created) - [Code Review Fix]
- `docs/sprint-artifacts/sprint-status.yaml` (modified)

### Code Review Fixes Applied

1. **Added vitest testing framework** - package.json updated with vitest ^2.1.0
2. **Added 18 comprehensive tests** - game-state.test.js covers all ACs
3. **Fixed auto-initialization side effect** - main.js no longer auto-runs on import
4. **Updated index.html** - explicit initialize() call
5. **Added .gitattributes** - consistent LF line endings
