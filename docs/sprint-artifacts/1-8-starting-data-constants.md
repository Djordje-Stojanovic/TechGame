# Story 1.8: Starting Data Constants

Status: Complete

## Story

As a developer,
I want game balance constants and starting data defined in dedicated data files,
So that simulation calculations have consistent baseline values and avoid magic numbers scattered across the codebase.

## Acceptance Criteria

### Game Balance Constants - `data/constants.js` (AC 1-8)

1. **Given** I import from `data/constants.js` **When** I access `STARTING_CASH` **Then** it equals `10_000_000` ($10M - player starting capital)

2. **Given** I import from `data/constants.js` **When** I access time constants **Then** I have:
   - `HOURS_PER_DAY`: 24
   - `DAYS_PER_MONTH`: 30
   - `MONTHS_PER_YEAR`: 12
   - `MONTHS_PER_QUARTER`: 3
   - `DAYS_PER_QUARTER`: 90
   - `HOURS_PER_QUARTER`: 2160

3. **Given** I import from `data/constants.js` **When** I access `TICK_SPEEDS` **Then** it equals `[1, 2, 4]`

4. **Given** I import from `data/constants.js` **When** I access `STARTING_YEAR` **Then** it equals `2022`

5. **Given** I import from `data/constants.js` **When** I access `STARTING_QUARTER` **Then** it equals `1`

6. **Given** I import from `data/constants.js` **When** I access view constants **Then** I have:
   - `VIEWS`: `['dashboard', 'market', 'design', 'competitors', 'financials']`
   - `DEFAULT_VIEW`: `'dashboard'`

7. **Given** I import from `data/constants.js` **When** I access segment price boundaries **Then** I have:
   - `BUDGET_MAX_PRICE`: 299
   - `MIDRANGE_MAX_PRICE`: 599

8. **Given** I import from `data/constants.js` **When** I access identifier arrays **Then** I have:
   - `COMPANY_IDS`: `['player', 'nvidia', 'amd', 'intel']`
   - `SEGMENT_KEYS`: `['budget', 'midrange', 'highend']`

### Market Data - `data/market-data.js` (AC 9-15)

9. **Given** I import from `data/market-data.js` **When** I access `USA_POPULATION_2022` **Then** it equals approximately 332 million

10. **Given** I import from `data/market-data.js` **When** I access `BASE_GPU_DEMAND_ANNUAL` **Then** it equals approximately 50 million units (USA discrete GPU market size)

11. **Given** I import from `data/market-data.js` **When** I access `POPULATION_GROWTH_RATE` **Then** it equals `0.005` (0.5% annual)

12. **Given** I import from `data/market-data.js` **When** I access `GPU_DEMAND_GROWTH_RATE` **Then** it equals `0.03` (3% annual - tech adoption trends)

13. **Given** I import from `data/market-data.js` **When** I access `MARKET_SEGMENTS` **Then** I have segment definitions matching game-state.js:
    - `budget`: { name, minPrice: 0, maxPrice: 299, demandShare: 0.40, priceWeight: 0.7, perfWeight: 0.3 }
    - `midrange`: { name, minPrice: 300, maxPrice: 599, demandShare: 0.40, priceWeight: 0.5, perfWeight: 0.5 }
    - `highend`: { name, minPrice: 600, maxPrice: 999999, demandShare: 0.20, priceWeight: 0.3, perfWeight: 0.7 }

14. **Given** I import from `data/market-data.js` **When** I call `getProductSegment(price)` **Then** it returns the correct segment key ('budget', 'midrange', or 'highend')

15. **Given** I import from `data/market-data.js` **When** I call `calculateMarketDemand(year)` **Then** it returns the projected annual demand for that year (with growth applied from 2022 baseline)

### Competitor Data - `data/competitor-data.js` (AC 16-21)

16. **Given** I import from `data/competitor-data.js` **When** I access `COMPETITOR_STARTING_CASH` **Then** I have:
    - `nvidia`: 15_000_000_000 ($15B)
    - `amd`: 3_000_000_000 ($3B)
    - `intel`: 25_000_000_000 ($25B)

17. **Given** I import from `data/competitor-data.js` **When** I access `COMPETITOR_PROFILES` **Then** each competitor has:
    - `name`: Display name (e.g., "NVIDIA", "AMD", "Intel Arc")
    - `color`: Brand color hex code
    - `startingCash`: Initial cash position
    - `rdBudgetPercent`: R&D as % of revenue (0.15-0.3)
    - `marketingBudgetPercent`: Marketing as % of revenue
    - `brandReputation`: Initial brand strength (0.0-1.0)

18. **Given** I import from `data/competitor-data.js` **When** I access `COMPETITOR_BRAND_COLORS` **Then** I have colors matching UX spec:
    - `nvidia`: '#76b900' (NVIDIA green)
    - `amd`: '#ed1c24' (AMD red)
    - `intel`: '#0071c5' (Intel blue)
    - `player`: '#3b82f6' (Accent blue)

19. **Given** I import from `data/competitor-data.js` **When** I access `STARTING_MARKET_SHARE` **Then** I have 2022 baseline:
    - `nvidia`: 0.80 (80%)
    - `amd`: 0.18 (18%)
    - `intel`: 0.02 (2%)
    - `player`: 0.00 (0% - new entrant)

20. **Given** I import from `data/competitor-data.js` **When** I access `COMPETITOR_PLACEHOLDER_PRODUCTS` **Then** each competitor has an empty array `[]` (detailed products come in Story 2.2)

21. **Given** all data files exist **When** I run `npm test` **Then** all tests pass and constants are validated for correct types and reasonable ranges

## Tasks

- [x] **Task 1: Create data directory structure** (AC: all)
  - Ensure `src/js/data/` directory exists
  - Remove `.gitkeep` if present
  - This is prerequisite for all other tasks

- [x] **Task 2: Implement constants.js** (`src/js/data/constants.js`) (AC: 1-8)
  - Export all game balance constants with SCREAMING_SNAKE_CASE
  - Export time constants: `HOURS_PER_DAY`, `DAYS_PER_MONTH`, `MONTHS_PER_YEAR`, `MONTHS_PER_QUARTER`, `DAYS_PER_QUARTER`, `HOURS_PER_QUARTER`
  - Export `TICK_SPEEDS` array: `[1, 2, 4]` and `DEFAULT_TICK_SPEED`
  - Export starting conditions: `STARTING_CASH`, `STARTING_YEAR`, `STARTING_QUARTER`
  - Export view constants: `VIEWS`, `DEFAULT_VIEW`
  - Export segment boundaries: `BUDGET_MAX_PRICE`, `MIDRANGE_MAX_PRICE`
  - Export identifier arrays: `COMPANY_IDS`, `SEGMENT_KEYS`
  - All values must be JSON-serializable (no functions)
  - Add JSDoc comments for each constant

- [x] **Task 3: Implement market-data.js** (`src/js/data/market-data.js`) (AC: 9-15)
  - Export USA market constants: `USA_POPULATION_2022`, `BASE_GPU_DEMAND_ANNUAL`
  - Export growth rates: `POPULATION_GROWTH_RATE`, `GPU_DEMAND_GROWTH_RATE`
  - Export `MARKET_SEGMENTS` object with full segment definitions
  - Export `getProductSegment(price)` function that returns segment key
  - Export `calculateMarketDemand(year)` function for demand projection
  - Segment definitions must match `game-state.js` exactly
  - Add JSDoc comments with source/rationale for ballpark figures

- [x] **Task 4: Implement competitor-data.js** (`src/js/data/competitor-data.js`) (AC: 16-20)
  - Export `COMPETITOR_STARTING_CASH` object
  - Export `COMPETITOR_PROFILES` with name, color, cash, budgets, reputation
  - Export `COMPETITOR_BRAND_COLORS` matching UX spec
  - Export `STARTING_MARKET_SHARE` object
  - Export `COMPETITOR_PLACEHOLDER_PRODUCTS` (empty arrays - products added in Story 2.2)
  - Add JSDoc comments with source/rationale for financial figures

- [x] **Task 5: Write constants.test.js** (`src/js/data/constants.test.js`) (AC: 1-8, 21)
  - Test all constants exist and have correct values
  - Test types (numbers are numbers, arrays are arrays)
  - Test derived relationships (e.g., `DAYS_PER_QUARTER` = `DAYS_PER_MONTH` * `MONTHS_PER_QUARTER`, `HOURS_PER_QUARTER` = `HOURS_PER_DAY` * `DAYS_PER_QUARTER`)
  - Test `TICK_SPEEDS` array contents and `DEFAULT_TICK_SPEED` is valid
  - Test `COMPANY_IDS` and `SEGMENT_KEYS` include all expected values

- [x] **Task 6: Write market-data.test.js** (`src/js/data/market-data.test.js`) (AC: 9-15, 21)
  - Test market constants exist with exact values (`USA_POPULATION_2022`, `BASE_GPU_DEMAND_ANNUAL`, growth rates)
  - Test `MARKET_SEGMENTS` structure matches game-state.js
  - Test `getProductSegment()` returns correct segment for various prices
  - Test `calculateMarketDemand()` returns growing demand over years
  - Test boundary conditions (price exactly at segment boundaries)
  - Test cross-validation: `BUDGET_MAX_PRICE`/`MIDRANGE_MAX_PRICE` match segment maxPrice values
  - Test segment boundaries are contiguous (no gaps/overlaps)

- [x] **Task 7: Write competitor-data.test.js** (`src/js/data/competitor-data.test.js`) (AC: 16-20, 21)
  - Test all competitor constants exist
  - Test cash values are positive and reasonable
  - Test brand colors are valid hex codes
  - Test market shares sum to 1.0 (100%)
  - Test competitor profiles have all required fields

- [x] **Task 8: Update project-context.md** (AC: all)
  - Add `data/` section to Module Exports
  - Document all exported constants and functions
  - Add to Layer Rules: "data → no imports allowed (JSON/constants only)"

- [x] **Task 9: Run all tests and verify** (AC: 21)
  - Run `npm test` to verify all new tests pass
  - Verify existing tests still pass (312 pre-existing tests)
  - Expected: ~50-70 new tests for data module

## Dev Notes

### Quick Reference

| Item | Value |
|------|-------|
| **New Files** | `src/js/data/constants.js`, `src/js/data/market-data.js`, `src/js/data/competitor-data.js` |
| **New Test Files** | `src/js/data/constants.test.js`, `src/js/data/market-data.test.js`, `src/js/data/competitor-data.test.js` |
| **Layer** | `data/` — bottom layer, no imports from other layers |
| **Depends On** | Nothing (data is a foundation layer alongside utils) |
| **Used By** | `state/`, `simulation/`, `ui/` - all layers reference these constants |
| **Total ACs** | 21 |

### Architecture Pattern (from docs/architecture.md)

**Data Layer Rules:**
- `data/` cannot import from any other layer
- Contains only static data definitions and pure helper functions
- All constants use SCREAMING_SNAKE_CASE
- Named exports only (no `export default`)
- Values must be JSON-serializable (for save/load compatibility)
- Pure functions allowed for derived calculations (no side effects)

```
┌─────────────────────────────────────────────────────────────┐
│   data/ (BOTTOM LAYER - imports nothing)                    │
│   - constants.js      (game balance, time, views)           │
│   - market-data.js    (USA market, segments, demand)        │
│   - competitor-data.js (NVIDIA/AMD/Intel profiles)          │
│   - gpu-specs.js      (future: Story 3.1)                   │
│   - starting-products.js (future: Story 2.2)                │
└─────────────────────────────────────────────────────────────┘
```

### Consistency with Existing Code

**CRITICAL:** Values in implementation examples below MUST match existing `game-state.js` and `game-loop.js`. Use this table to validate before implementation:

| Constant | Existing Location | Required Value |
|----------|------------------|----------------|
| Player cash | `game-state.js:22` | 10,000,000 |
| NVIDIA cash | `game-state.js:32` | 15,000,000,000 |
| AMD cash | `game-state.js:40` | 3,000,000,000 |
| Intel cash | `game-state.js:48` | 25,000,000,000 |
| Total demand | `game-state.js:58` | 50,000,000 |
| Hours per day | `game-loop.js:4` | 24 |
| Days per month | `game-loop.js:5` | 30 |
| Months per year | `game-loop.js:6` | 12 |
| Tick speeds | `game-loop.js:88` | [1, 2, 4] |
| Segment maxPrice (highend) | `game-state.js:79` | 999999 |
| Segment definitions | `game-state.js:59-84` | Match exactly |

> **Dev Agent Note:** If any value in the implementation examples below differs from this table, the TABLE is authoritative. Fix the example to match.

### Constants Implementation

```javascript
// src/js/data/constants.js

/**
 * Game Balance Constants
 * Single source of truth for all magic numbers.
 * Named exports only - use SCREAMING_SNAKE_CASE.
 */

// Time System
export const HOURS_PER_DAY = 24;
export const DAYS_PER_MONTH = 30;
export const MONTHS_PER_YEAR = 12;
export const MONTHS_PER_QUARTER = 3;
export const DAYS_PER_QUARTER = DAYS_PER_MONTH * MONTHS_PER_QUARTER; // 90
export const HOURS_PER_QUARTER = HOURS_PER_DAY * DAYS_PER_QUARTER; // 2160

// Simulation Speed
export const TICK_SPEEDS = [1, 2, 4];
export const DEFAULT_TICK_SPEED = 1;

// Game Start Conditions
export const STARTING_YEAR = 2022;
export const STARTING_QUARTER = 1;
export const STARTING_CASH = 10_000_000; // $10M player starting capital

// UI Views
export const VIEWS = ['dashboard', 'market', 'design', 'competitors', 'financials'];
export const DEFAULT_VIEW = 'dashboard';

// Market Segment Price Boundaries
export const BUDGET_MAX_PRICE = 299;
export const MIDRANGE_MAX_PRICE = 599;
// High-end: $600+ (no upper limit)

// Company Identifiers
export const COMPANY_IDS = ['player', 'nvidia', 'amd', 'intel'];

// Market Segment Identifiers (prevents typos, enables validation)
export const SEGMENT_KEYS = ['budget', 'midrange', 'highend'];
```

### Market Data Implementation

```javascript
// src/js/data/market-data.js

/**
 * USA GPU Market Data
 * Ballpark realistic figures for 2022 baseline (NFR6-7).
 * Sources: Steam Hardware Survey, Jon Peddie Research, IDC estimates.
 */

// USA Market Baseline (2022)
export const USA_POPULATION_2022 = 332_000_000; // ~332M
export const GAMING_POPULATION_PERCENT = 0.45; // ~45% of population games
export const GPU_UPGRADE_RATE = 0.15; // 15% upgrade annually

// Derived: ~50M discrete GPU units annually
export const BASE_GPU_DEMAND_ANNUAL = 50_000_000;

// Annual Growth Rates
export const POPULATION_GROWTH_RATE = 0.005; // 0.5%
export const GPU_DEMAND_GROWTH_RATE = 0.03; // 3% annual (tech adoption trends)

/**
 * Market segments with consumer behavior weights.
 * Must match game-state.js segments EXACTLY.
 */
export const MARKET_SEGMENTS = {
  budget: {
    name: 'Budget',
    minPrice: 0,
    maxPrice: 299,
    demandShare: 0.40,
    priceWeight: 0.7,
    perfWeight: 0.3,
    description: 'Price-conscious gamers, entry-level builds'
  },
  midrange: {
    name: 'Midrange',
    minPrice: 300,
    maxPrice: 599,
    demandShare: 0.40,
    priceWeight: 0.5,
    perfWeight: 0.5,
    description: 'Balanced value seekers, 1080p/1440p gaming'
  },
  highend: {
    name: 'High-end',
    minPrice: 600,
    maxPrice: 999999,
    demandShare: 0.20,
    priceWeight: 0.3,
    perfWeight: 0.7,
    description: 'Performance enthusiasts, 4K/VR gaming'
  }
};

/**
 * Determines which market segment a product belongs to based on price.
 * @param {number} price - Product retail price in USD
 * @returns {string} Segment key: 'budget', 'midrange', or 'highend'
 */
export function getProductSegment(price) {
  if (price <= MARKET_SEGMENTS.budget.maxPrice) return 'budget';
  if (price <= MARKET_SEGMENTS.midrange.maxPrice) return 'midrange';
  return 'highend';
}

/**
 * Calculates projected annual GPU demand for a given year.
 * Applies compound growth from 2022 baseline.
 * @param {number} year - Target year (2022+)
 * @returns {number} Projected annual demand in units
 */
export function calculateMarketDemand(year) {
  const yearsFromBaseline = year - 2022;
  if (yearsFromBaseline < 0) return BASE_GPU_DEMAND_ANNUAL;
  return Math.floor(BASE_GPU_DEMAND_ANNUAL * Math.pow(1 + GPU_DEMAND_GROWTH_RATE, yearsFromBaseline));
}
```

### Competitor Data Implementation

```javascript
// src/js/data/competitor-data.js

/**
 * Competitor Starting Data
 * NVIDIA, AMD, Intel Arc profiles for 2022 baseline.
 * Cash figures are GPU division estimates (not total company value).
 */

// Starting Cash (GPU division working capital estimate)
export const COMPETITOR_STARTING_CASH = {
  nvidia: 15_000_000_000, // $15B - dominant player
  amd: 3_000_000_000,     // $3B - competitive challenger
  intel: 25_000_000_000   // $25B - new entrant with deep pockets
};

// Brand Colors (from UX Spec)
export const COMPETITOR_BRAND_COLORS = {
  nvidia: '#76b900',
  amd: '#ed1c24',
  intel: '#0071c5',
  player: '#3b82f6'
};

// Starting Market Share (Q1 2022 discrete GPU market)
export const STARTING_MARKET_SHARE = {
  nvidia: 0.80,  // ~80% - dominant
  amd: 0.18,     // ~18% - competitive
  intel: 0.02,   // ~2% - Arc just launching
  player: 0.00   // New entrant
};

/**
 * Complete competitor profiles with all simulation parameters.
 */
export const COMPETITOR_PROFILES = {
  nvidia: {
    id: 'nvidia',
    name: 'NVIDIA',
    displayName: 'NVIDIA Corporation',
    color: COMPETITOR_BRAND_COLORS.nvidia,
    startingCash: COMPETITOR_STARTING_CASH.nvidia,
    rdBudgetPercent: 0.20,        // 20% of revenue to R&D
    marketingBudgetPercent: 0.08, // 8% of revenue to marketing
    brandReputation: 0.95,        // Very strong brand (0-1)
    strengths: ['performance', 'software', 'mindshare'],
    weaknesses: ['pricing'],
    aiAggressiveness: 0.6         // Moderate - defends position
  },
  amd: {
    id: 'amd',
    name: 'AMD',
    displayName: 'Advanced Micro Devices',
    color: COMPETITOR_BRAND_COLORS.amd,
    startingCash: COMPETITOR_STARTING_CASH.amd,
    rdBudgetPercent: 0.22,        // 22% - higher R&D intensity
    marketingBudgetPercent: 0.06, // 6% - smaller marketing budget
    brandReputation: 0.75,        // Strong but not dominant (0-1)
    strengths: ['value', 'efficiency'],
    weaknesses: ['software', 'mindshare'],
    aiAggressiveness: 0.8         // Aggressive - challenger mentality
  },
  intel: {
    id: 'intel',
    name: 'Intel Arc',
    displayName: 'Intel Corporation',
    color: COMPETITOR_BRAND_COLORS.intel,
    startingCash: COMPETITOR_STARTING_CASH.intel,
    rdBudgetPercent: 0.25,        // 25% - heavy R&D investment
    marketingBudgetPercent: 0.10, // 10% - aggressive marketing for new entry
    brandReputation: 0.40,        // Low in GPU space (0-1)
    strengths: ['resources', 'manufacturing'],
    weaknesses: ['drivers', 'experience', 'reputation'],
    aiAggressiveness: 0.5         // Conservative - building presence
  }
};

/**
 * Placeholder for competitor starting products.
 * Populated in Story 2.2 with RTX 30 series, RX 6000 series, Arc A-series.
 */
export const COMPETITOR_PLACEHOLDER_PRODUCTS = {
  nvidia: [], // RTX 3090, 3080, 3070, 3060 added in Story 2.2
  amd: [],    // RX 6900 XT, 6800 XT, 6700 XT added in Story 2.2
  intel: []   // Arc A770, A750 added in Story 2.2
};
```

### Test Templates

```javascript
// src/js/data/constants.test.js
// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import {
  HOURS_PER_DAY, DAYS_PER_MONTH, MONTHS_PER_YEAR,
  MONTHS_PER_QUARTER, DAYS_PER_QUARTER, HOURS_PER_QUARTER,
  TICK_SPEEDS, DEFAULT_TICK_SPEED,
  STARTING_YEAR, STARTING_QUARTER, STARTING_CASH,
  VIEWS, DEFAULT_VIEW,
  BUDGET_MAX_PRICE, MIDRANGE_MAX_PRICE,
  COMPANY_IDS, SEGMENT_KEYS
} from './constants.js';

describe('constants.js', () => {
  describe('Time Constants', () => {
    it('HOURS_PER_DAY equals 24', () => {
      expect(HOURS_PER_DAY).toBe(24);
    });

    it('DAYS_PER_MONTH equals 30', () => {
      expect(DAYS_PER_MONTH).toBe(30);
    });

    it('MONTHS_PER_YEAR equals 12', () => {
      expect(MONTHS_PER_YEAR).toBe(12);
    });

    it('MONTHS_PER_QUARTER equals 3', () => {
      expect(MONTHS_PER_QUARTER).toBe(3);
    });

    it('DAYS_PER_QUARTER is derived correctly', () => {
      expect(DAYS_PER_QUARTER).toBe(DAYS_PER_MONTH * MONTHS_PER_QUARTER);
      expect(DAYS_PER_QUARTER).toBe(90);
    });

    it('HOURS_PER_QUARTER is derived correctly', () => {
      expect(HOURS_PER_QUARTER).toBe(HOURS_PER_DAY * DAYS_PER_QUARTER);
      expect(HOURS_PER_QUARTER).toBe(2160);
    });
  });

  describe('Tick Speed Constants', () => {
    it('TICK_SPEEDS is [1, 2, 4]', () => {
      expect(TICK_SPEEDS).toEqual([1, 2, 4]);
    });

    it('DEFAULT_TICK_SPEED is in TICK_SPEEDS', () => {
      expect(TICK_SPEEDS).toContain(DEFAULT_TICK_SPEED);
    });
  });

  describe('Starting Conditions', () => {
    it('STARTING_YEAR equals 2022', () => {
      expect(STARTING_YEAR).toBe(2022);
    });

    it('STARTING_QUARTER equals 1', () => {
      expect(STARTING_QUARTER).toBe(1);
    });

    it('STARTING_CASH equals $10M', () => {
      expect(STARTING_CASH).toBe(10_000_000);
    });
  });

  describe('View Constants', () => {
    it('VIEWS includes all expected views', () => {
      expect(VIEWS).toContain('dashboard');
      expect(VIEWS).toContain('market');
      expect(VIEWS).toContain('design');
      expect(VIEWS).toContain('competitors');
      expect(VIEWS).toContain('financials');
    });

    it('DEFAULT_VIEW is in VIEWS', () => {
      expect(VIEWS).toContain(DEFAULT_VIEW);
    });
  });

  describe('Segment Price Boundaries', () => {
    it('BUDGET_MAX_PRICE equals 299', () => {
      expect(BUDGET_MAX_PRICE).toBe(299);
    });

    it('MIDRANGE_MAX_PRICE equals 599', () => {
      expect(MIDRANGE_MAX_PRICE).toBe(599);
    });
  });

  describe('Company Identifiers', () => {
    it('COMPANY_IDS includes all companies', () => {
      expect(COMPANY_IDS).toContain('player');
      expect(COMPANY_IDS).toContain('nvidia');
      expect(COMPANY_IDS).toContain('amd');
      expect(COMPANY_IDS).toContain('intel');
    });

    it('COMPANY_IDS has exactly 4 entries', () => {
      expect(COMPANY_IDS).toHaveLength(4);
    });
  });

  describe('Segment Identifiers', () => {
    it('SEGMENT_KEYS includes all segments', () => {
      expect(SEGMENT_KEYS).toContain('budget');
      expect(SEGMENT_KEYS).toContain('midrange');
      expect(SEGMENT_KEYS).toContain('highend');
    });

    it('SEGMENT_KEYS has exactly 3 entries', () => {
      expect(SEGMENT_KEYS).toHaveLength(3);
    });

    it('SEGMENT_KEYS order matches price tiers (low to high)', () => {
      expect(SEGMENT_KEYS).toEqual(['budget', 'midrange', 'highend']);
    });
  });
});
```

```javascript
// src/js/data/market-data.test.js
// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import {
  USA_POPULATION_2022, GAMING_POPULATION_PERCENT, GPU_UPGRADE_RATE,
  BASE_GPU_DEMAND_ANNUAL,
  POPULATION_GROWTH_RATE, GPU_DEMAND_GROWTH_RATE,
  MARKET_SEGMENTS, getProductSegment, calculateMarketDemand
} from './market-data.js';
import { BUDGET_MAX_PRICE, MIDRANGE_MAX_PRICE, SEGMENT_KEYS } from './constants.js';

describe('market-data.js', () => {
  describe('USA Market Constants', () => {
    it('USA_POPULATION_2022 equals 332M', () => {
      expect(USA_POPULATION_2022).toBe(332_000_000);
    });

    it('BASE_GPU_DEMAND_ANNUAL equals 50M', () => {
      expect(BASE_GPU_DEMAND_ANNUAL).toBe(50_000_000);
    });

    it('POPULATION_GROWTH_RATE equals 0.5%', () => {
      expect(POPULATION_GROWTH_RATE).toBe(0.005);
    });

    it('GPU_DEMAND_GROWTH_RATE equals 3%', () => {
      expect(GPU_DEMAND_GROWTH_RATE).toBe(0.03);
    });
  });

  describe('MARKET_SEGMENTS', () => {
    it('has budget, midrange, highend segments', () => {
      expect(MARKET_SEGMENTS).toHaveProperty('budget');
      expect(MARKET_SEGMENTS).toHaveProperty('midrange');
      expect(MARKET_SEGMENTS).toHaveProperty('highend');
    });

    it('budget segment has correct structure', () => {
      expect(MARKET_SEGMENTS.budget.minPrice).toBe(0);
      expect(MARKET_SEGMENTS.budget.maxPrice).toBe(299);
      expect(MARKET_SEGMENTS.budget.demandShare).toBe(0.40);
    });

    it('midrange segment has correct structure', () => {
      expect(MARKET_SEGMENTS.midrange.minPrice).toBe(300);
      expect(MARKET_SEGMENTS.midrange.maxPrice).toBe(599);
      expect(MARKET_SEGMENTS.midrange.demandShare).toBe(0.40);
    });

    it('highend segment has correct structure', () => {
      expect(MARKET_SEGMENTS.highend.minPrice).toBe(600);
      expect(MARKET_SEGMENTS.highend.maxPrice).toBe(999999);
      expect(MARKET_SEGMENTS.highend.demandShare).toBe(0.20);
    });

    it('demand shares sum to 1.0', () => {
      const total = MARKET_SEGMENTS.budget.demandShare +
                   MARKET_SEGMENTS.midrange.demandShare +
                   MARKET_SEGMENTS.highend.demandShare;
      expect(total).toBe(1.0);
    });

    it('segment keys match SEGMENT_KEYS constant', () => {
      const segmentKeys = Object.keys(MARKET_SEGMENTS);
      expect(segmentKeys).toEqual(SEGMENT_KEYS);
    });
  });

  describe('Cross-validation with constants.js', () => {
    it('BUDGET_MAX_PRICE matches MARKET_SEGMENTS.budget.maxPrice', () => {
      expect(MARKET_SEGMENTS.budget.maxPrice).toBe(BUDGET_MAX_PRICE);
    });

    it('MIDRANGE_MAX_PRICE matches MARKET_SEGMENTS.midrange.maxPrice', () => {
      expect(MARKET_SEGMENTS.midrange.maxPrice).toBe(MIDRANGE_MAX_PRICE);
    });

    it('segment boundaries are contiguous (no gaps or overlaps)', () => {
      // Budget ends at 299, midrange starts at 300
      expect(MARKET_SEGMENTS.budget.maxPrice + 1).toBe(MARKET_SEGMENTS.midrange.minPrice);
      // Midrange ends at 599, highend starts at 600
      expect(MARKET_SEGMENTS.midrange.maxPrice + 1).toBe(MARKET_SEGMENTS.highend.minPrice);
    });
  });

  describe('getProductSegment', () => {
    it('returns budget for $0-299', () => {
      expect(getProductSegment(0)).toBe('budget');
      expect(getProductSegment(150)).toBe('budget');
      expect(getProductSegment(299)).toBe('budget');
    });

    it('returns midrange for $300-599', () => {
      expect(getProductSegment(300)).toBe('midrange');
      expect(getProductSegment(450)).toBe('midrange');
      expect(getProductSegment(599)).toBe('midrange');
    });

    it('returns highend for $600+', () => {
      expect(getProductSegment(600)).toBe('highend');
      expect(getProductSegment(999)).toBe('highend');
      expect(getProductSegment(1999)).toBe('highend');
    });
  });

  describe('calculateMarketDemand', () => {
    it('returns base demand for 2022', () => {
      expect(calculateMarketDemand(2022)).toBe(BASE_GPU_DEMAND_ANNUAL);
    });

    it('returns growing demand for future years', () => {
      const demand2023 = calculateMarketDemand(2023);
      const demand2024 = calculateMarketDemand(2024);
      expect(demand2023).toBeGreaterThan(BASE_GPU_DEMAND_ANNUAL);
      expect(demand2024).toBeGreaterThan(demand2023);
    });

    it('returns base demand for years before 2022', () => {
      expect(calculateMarketDemand(2021)).toBe(BASE_GPU_DEMAND_ANNUAL);
      expect(calculateMarketDemand(2020)).toBe(BASE_GPU_DEMAND_ANNUAL);
    });
  });
});
```

```javascript
// src/js/data/competitor-data.test.js
// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import {
  COMPETITOR_STARTING_CASH, COMPETITOR_BRAND_COLORS,
  STARTING_MARKET_SHARE, COMPETITOR_PROFILES,
  COMPETITOR_PLACEHOLDER_PRODUCTS
} from './competitor-data.js';

describe('competitor-data.js', () => {
  describe('COMPETITOR_STARTING_CASH', () => {
    it('NVIDIA has $15B', () => {
      expect(COMPETITOR_STARTING_CASH.nvidia).toBe(15_000_000_000);
    });

    it('AMD has $3B', () => {
      expect(COMPETITOR_STARTING_CASH.amd).toBe(3_000_000_000);
    });

    it('Intel has $25B', () => {
      expect(COMPETITOR_STARTING_CASH.intel).toBe(25_000_000_000);
    });

    it('all cash values are positive', () => {
      Object.values(COMPETITOR_STARTING_CASH).forEach(cash => {
        expect(cash).toBeGreaterThan(0);
      });
    });
  });

  describe('COMPETITOR_BRAND_COLORS', () => {
    it('has valid hex colors for all companies', () => {
      const hexPattern = /^#[0-9A-Fa-f]{6}$/;
      expect(COMPETITOR_BRAND_COLORS.nvidia).toMatch(hexPattern);
      expect(COMPETITOR_BRAND_COLORS.amd).toMatch(hexPattern);
      expect(COMPETITOR_BRAND_COLORS.intel).toMatch(hexPattern);
      expect(COMPETITOR_BRAND_COLORS.player).toMatch(hexPattern);
    });

    it('NVIDIA is green (#76b900)', () => {
      expect(COMPETITOR_BRAND_COLORS.nvidia).toBe('#76b900');
    });

    it('AMD is red (#ed1c24)', () => {
      expect(COMPETITOR_BRAND_COLORS.amd).toBe('#ed1c24');
    });

    it('Intel is blue (#0071c5)', () => {
      expect(COMPETITOR_BRAND_COLORS.intel).toBe('#0071c5');
    });

    it('Player is accent blue (#3b82f6)', () => {
      expect(COMPETITOR_BRAND_COLORS.player).toBe('#3b82f6');
    });
  });

  describe('STARTING_MARKET_SHARE', () => {
    it('shares sum to 1.0 (100%)', () => {
      const total = STARTING_MARKET_SHARE.nvidia +
                   STARTING_MARKET_SHARE.amd +
                   STARTING_MARKET_SHARE.intel +
                   STARTING_MARKET_SHARE.player;
      expect(total).toBe(1.0);
    });

    it('NVIDIA dominates at 80%', () => {
      expect(STARTING_MARKET_SHARE.nvidia).toBe(0.80);
    });

    it('AMD has 18%', () => {
      expect(STARTING_MARKET_SHARE.amd).toBe(0.18);
    });

    it('Intel has 2%', () => {
      expect(STARTING_MARKET_SHARE.intel).toBe(0.02);
    });

    it('Player starts at 0%', () => {
      expect(STARTING_MARKET_SHARE.player).toBe(0);
    });
  });

  describe('COMPETITOR_PROFILES', () => {
    const requiredFields = ['id', 'name', 'color', 'startingCash', 'rdBudgetPercent', 'brandReputation'];

    ['nvidia', 'amd', 'intel'].forEach(company => {
      describe(company, () => {
        it('has all required fields', () => {
          requiredFields.forEach(field => {
            expect(COMPETITOR_PROFILES[company]).toHaveProperty(field);
          });
        });

        it('has brandReputation between 0 and 1', () => {
          expect(COMPETITOR_PROFILES[company].brandReputation).toBeGreaterThanOrEqual(0);
          expect(COMPETITOR_PROFILES[company].brandReputation).toBeLessThanOrEqual(1);
        });

        it('has rdBudgetPercent between 0 and 1', () => {
          expect(COMPETITOR_PROFILES[company].rdBudgetPercent).toBeGreaterThan(0);
          expect(COMPETITOR_PROFILES[company].rdBudgetPercent).toBeLessThan(1);
        });
      });
    });
  });

  describe('COMPETITOR_PLACEHOLDER_PRODUCTS', () => {
    it('exists for all competitors', () => {
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS).toHaveProperty('nvidia');
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS).toHaveProperty('amd');
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS).toHaveProperty('intel');
    });

    it('all are empty arrays (products added in Story 2.2)', () => {
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS.nvidia).toEqual([]);
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS.amd).toEqual([]);
      expect(COMPETITOR_PLACEHOLDER_PRODUCTS.intel).toEqual([]);
    });
  });
});
```

### Integration with Existing Code

**Future Refactoring (Not in this story):**

After Story 1.8, these files could be updated to import from data layer:

| File | Current | Future (Epic 2+) |
|------|---------|------------------|
| `game-state.js` | Inline player/competitor cash values | Import from `data/constants.js`, `data/competitor-data.js` |
| `game-state.js` | Inline segment definitions | Import `MARKET_SEGMENTS` from `data/market-data.js` |
| `game-loop.js` | `HOURS_PER_DAY=24` inline (line 4) | Import from `data/constants.js` |
| `game-loop.js` | `DAYS_PER_MONTH=30` inline (line 5) | Import from `data/constants.js` |
| `game-loop.js` | `MONTHS_PER_YEAR=12` inline (line 6) | Import from `data/constants.js` |
| `game-loop.js` | `VALID_TICK_SPEEDS` inline (line 88) | Import `TICK_SPEEDS` from `data/constants.js` |

**For Story 1.8:** Create the data files. Do NOT modify existing files yet - consistency is maintained by using the same values.

### Ballpark Realism Notes (NFR6-7)

**USA GPU Market (2022 baseline):**
- Total discrete GPU market: ~50M units/year (includes gaming + workstation)
- Steam Hardware Survey shows ~65% NVIDIA share
- Adjusted for all GPUs sold (not just Steam users): ~80% NVIDIA
- AMD ~18%, Intel Arc launching ~2%
- Source: Jon Peddie Research, Steam Hardware Survey Q1 2022

**Competitor Cash Positions:**
- These are "GPU division working capital" estimates, not total company value
- NVIDIA: $15B - reflects gaming segment dominance
- AMD: $3B - smaller but competitive
- Intel: $25B - large corporate backing for new GPU division
- Source: SEC filings, analyst estimates (ballpark for game balance)

**Market Growth:**
- Population: ~0.5% annual (US Census projection)
- GPU demand: ~3% annual (tech adoption, gaming growth)
- Combined: ~3-3.5% market growth per year

### References

- [Source: docs/architecture.md#Module Organization]
- [Source: docs/architecture.md#Layer Boundaries]
- [Source: docs/epics.md#Story 1.8: Starting Data Constants]
- [Source: docs/ux-design-specification.md#Color System] - brand colors
- [Source: src/js/state/game-state.js] - existing values for consistency
- [Source: src/js/core/game-loop.js] - existing time constants

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Fixed market-data.test.js test for decimal prices: 299.99 > 299 so it's midrange (boundary is exact)
- Code review: Added negative price edge case test for getProductSegment()

### Completion Notes List

- ✅ Created data/ layer with 3 module files implementing all 21 ACs
- ✅ constants.js: All time constants, tick speeds, starting conditions, views, segment boundaries, identifiers
- ✅ market-data.js: USA market data, MARKET_SEGMENTS matching game-state.js, getProductSegment(), calculateMarketDemand()
- ✅ competitor-data.js: NVIDIA/AMD/Intel profiles with cash, colors, market share, placeholder products
- ✅ All values verified against existing game-state.js and game-loop.js
- ✅ 129 new tests (34 constants + 43 market-data + 52 competitor-data), total 441 tests passing
- ✅ project-context.md updated with data/ exports documentation

### File List

**New Files:**
- `src/js/data/constants.js` - Game balance constants (time, ticks, views, segments, identifiers)
- `src/js/data/market-data.js` - USA market data, segments, getProductSegment(), calculateMarketDemand()
- `src/js/data/competitor-data.js` - NVIDIA/AMD/Intel profiles, colors, market share
- `src/js/data/constants.test.js` - 34 tests for constants
- `src/js/data/market-data.test.js` - 43 tests for market data
- `src/js/data/competitor-data.test.js` - 52 tests for competitor data

**Modified Files:**
- `src/project-context.md` - Added data/ section to Module Exports

**Removed Files:**
- `src/js/data/.gitkeep` - Removed placeholder file

### Change Log

- 2025-12-06: Story 1.8 implementation complete - all 9 tasks done, 128 new tests, 21 ACs satisfied
