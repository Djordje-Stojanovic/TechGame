# Story 2.3: Market Share State Initialization

Status: Done

## CRITICAL - READ FIRST

1. **Create `src/js/utils/queries.js`** - new file for market share calculation from history
2. **Create `src/js/simulation/history-init.js`** - new file to initialize Day 1 history data
3. **Update `src/js/main.js`** - call history initialization after products are populated
4. **Market share is CALCULATED, not stored** - use `getMarketShare(state, company, timeRange)`
5. **Layer rules:** `utils/` has NO imports, `simulation/` may import `state`, `data/`, `utils`
6. **Starting shares:** NVIDIA ~80%, AMD ~18%, Intel ~2%, Player: 0%
7. **DO NOT modify game-state.js** - keep state/ layer pure (no imports)

## Story

As a developer,
I want market share calculated from products and stored in history,
So that the Crushing Chart has data to display.

## Acceptance Criteria

### Market State Structure (AC 1-4)

1. **Given** a new game starts with competitor products **When** the initial state is created **Then** `state.market.totalDemand` contains annual GPU demand for USA market (~50M units from `calculateMarketDemand(2022)`)

2. **Given** a new game starts **When** I examine `state.market.segments` **Then** it contains segment definitions: Budget (<$300), Midrange ($300-600), High-end (>$600) with demand percentages

3. **Given** `state.market.segments` exists **When** I check segment properties **Then** each segment has: `minPrice`, `maxPrice`, `demandShare`, `name` (NOTE: existing market-data.js uses `demandShare`, not `demandPercent`)

4. **Given** market segments are defined **When** demand shares are summed **Then** they total 1.0 (budget: 0.40, midrange: 0.40, highend: 0.20)

### History Initialization (AC 5-9)

5. **Given** a new game starts with competitor products **When** state initializes **Then** `state.history.daily` contains at least one entry for Day 1

6. **Given** Day 1 history entry **When** I examine it **Then** it has structure: `{ day, month, year, sales: { nvidia: {...}, amd: {...}, intel: {...}, player: {...} }, companyTotals: {...} }`

7. **Given** Day 1 history entry **When** I examine `sales.nvidia` **Then** each active NVIDIA product has daily units/revenue/cost reflecting ~80% market share

8. **Given** Day 1 history entry **When** I examine company distribution **Then** NVIDIA has ~80% of units, AMD ~18%, Intel ~2%, Player 0%

9. **Given** Day 1 history entry **When** I sum all `companyTotals.{company}.units` **Then** total equals `totalDemand / 365` (daily demand)

### Market Share Calculation (AC 10-14)

10. **Given** history contains daily sales data **When** I call `getMarketShare(state, 'nvidia', 'day')` **Then** it returns NVIDIA's share for the most recent day

11. **Given** market share calculation **When** computed for all companies **Then** shares sum to 1.0 (100%)

12. **Given** `getMarketShare` function **When** called with timeRange 'day' **Then** it uses most recent day's data

13. **Given** `getMarketShare` function **When** called with timeRange 'quarter' **Then** it aggregates last 90 days (or all available if less)

14. **Given** market share at game start **When** calculated from Day 1 **Then** returns: NVIDIA ~0.80, AMD ~0.18, Intel ~0.02, Player 0.00

### Integration (AC 15-18)

15. **Given** `initialize()` in main.js **When** initialization completes **Then** `state.history.daily` has been populated with Day 1 data

16. **Given** state.market **When** I check `state.market.totalDemand` **Then** it matches `calculateMarketDemand(state.time.currentYear)` from market-data.js

17. **Given** `getMarketShare` function **When** player has no products **Then** it returns 0 for player's share

18. **Given** Crushing Chart (Story 2.4) **When** it queries market share **Then** it can use `getMarketShare(state, company, 'day')` to get data for display

## Tasks

- [x] **Task 1: Create queries.js with market share calculation** (AC: 10-14, 17)
  - Create `src/js/utils/queries.js`
  - Implement `getMarketShare(state, company, timeRange)` function
  - Implement and export `getTimeRangeDays(timeRange)` helper (for testability)
  - Support timeRanges: 'day', 'week', 'month', 'quarter', 'year', 'ttm'
  - Return 0 for companies with no sales
  - Return null/0 if no history data exists
  - Pure function, no side effects (utils/ layer)

- [x] **Task 2: Create history-init.js for Day 1 initialization** (AC: 5-9, 15)
  - Create `src/js/simulation/` directory if it doesn't exist
  - Create `src/js/simulation/history-init.js`
  - Implement `initializeHistory(state)` function
  - Calculate daily demand: `totalDemand / 365`
  - Distribute daily demand by starting market share (80/18/2/0)
  - Distribute company sales across their products (proportional to MSRP tiers)
  - Calculate revenue: `units * msrp`, cost: `units * manufacturingCost`
  - Add Day 1 entry to `state.history.daily`

- [x] **Task 3: Verify segment structure in market-data.js** (AC: 2-4)
  - **EXISTING CODE IS COMPLETE** - `MARKET_SEGMENTS` already has all required fields
  - Fields present: `name`, `minPrice`, `maxPrice`, `demandShare` (0.40/0.40/0.20)
  - NOTE: Uses `demandShare` (decimal 0.40) not `demandPercent` - this is correct
  - No changes needed unless adding new fields for future features

- [x] **Task 4: Update main.js to initialize history** (AC: 15-16)
  - Import `initializeHistory` from `simulation/history-init.js`
  - Import `calculateMarketDemand` from `data/market-data.js`
  - In `initialize()` after product setup:
    - Set `state.market.totalDemand = calculateMarketDemand(state.time.currentYear)`
    - Call `initializeHistory(state)`
  - Order: createInitialState() → products → market demand → history

- [x] **Task 5: Write queries.test.js** (AC: 10-14, 17)
  - Test `getMarketShare` returns correct values for all companies
  - Test shares sum to 1.0
  - Test 'day' timeRange uses most recent data
  - Test player returns 0 when no products
  - Test handles empty history gracefully
  - Test 'quarter' aggregates multiple days

- [x] **Task 6: Write history-init.test.js** (AC: 5-9)
  - Test history entry has correct structure
  - Test Day 1 is created
  - Test daily units match daily demand
  - Test market share distribution (~80/18/2/0)
  - Test all companies have entries
  - Test player has zero sales

- [x] **Task 7: Update project-context.md** (AC: all)
  - Add queries.js exports to utils/ section
  - Add history-init.js exports to simulation/ section
  - Document history structure in State Structure section
  - Add market share calculation notes

## Dev Notes

### Quick Reference

| Item | Value |
|------|-------|
| **New Files** | `src/js/utils/queries.js`, `src/js/simulation/history-init.js` |
| **New Directory** | `src/js/simulation/` (create if doesn't exist) |
| **New Test Files** | `src/js/utils/queries.test.js`, `src/js/simulation/history-init.test.js` |
| **Modified Files** | `src/js/main.js` |
| **NOT Modified** | `src/js/state/game-state.js` (layer rules!), `src/js/data/market-data.js` (already complete) |
| **Updated Docs** | `src/project-context.md` |
| **Depends On** | Story 2.2 (starting products), Story 1.8 (market-data.js) |
| **Total ACs** | 18 |

### Architecture Compliance

**Layer Rules (from project-context.md):**
```
utils → no imports allowed (queries.js is here)
state → no imports allowed
core → may import state
simulation → may import state, data, utils (history-init.js is here)
data → no imports allowed (JSON/constants only)
main → may import all
```

**Critical: Market Share is CALCULATED, not stored**
From architecture.md:
> Market share = company units / total units (calculated on demand)
> NOT stored as static value

### Starting Market Share Distribution

Based on real 2022 GPU market:
- NVIDIA: ~80% (dominates discrete GPU market)
- AMD: ~18% (solid #2 position)
- Intel: ~2% (Arc just launching)
- Player: 0% (new entrant)

### Daily Demand Calculation

```javascript
const yearlyDemand = calculateMarketDemand(2022); // ~50M units
const dailyDemand = yearlyDemand / 365; // ~137,000 units/day

// Distribute by market share
const nvidiaDaily = dailyDemand * 0.80;  // ~109,600 units
const amdDaily = dailyDemand * 0.18;     // ~24,660 units
const intelDaily = dailyDemand * 0.02;   // ~2,740 units
const playerDaily = 0;                    // No products yet
```

### Product Sales Distribution Within Company

Distribute company's daily units across their products based on inverse price (cheaper sells more):

```javascript
// NVIDIA has 4 products with MSRPs: $329, $499, $699, $1499
// Weight by inverse price normalized
function distributeByPrice(products, totalUnits) {
  const inverseWeights = products.map(p => 1 / p.msrp);
  const totalWeight = inverseWeights.reduce((a, b) => a + b, 0);
  return products.map((p, i) => ({
    ...p,
    units: Math.round(totalUnits * (inverseWeights[i] / totalWeight))
  }));
}
```

### History Entry Structure

From architecture.md:
```javascript
{
  day: 1, month: 1, year: 2022,
  sales: {
    nvidia: {
      'nvidia-rtx-3090-2020q3': { units: 12000, revenue: 17988000, cost: 3360000 },
      'nvidia-rtx-3080-2020q3': { units: 28000, revenue: 19572000, cost: 7000000 },
      // ... other products
    },
    amd: { /* per-product breakdown */ },
    intel: { /* per-product breakdown */ },
    player: {} // Empty at start
  },
  companyTotals: {
    nvidia: { units: 109600, revenue: 45000000, costs: 18000000, rdSpend: 0, marketing: 0 },
    amd: { units: 24660, revenue: 12000000, costs: 4500000, rdSpend: 0, marketing: 0 },
    intel: { units: 2740, revenue: 900000, costs: 480000, rdSpend: 0, marketing: 0 },
    player: { units: 0, revenue: 0, costs: 0, rdSpend: 0, marketing: 0 }
  }
}
```

### getMarketShare Implementation

```javascript
/**
 * Calculate market share for a company over a time range
 * @param {Object} state - Game state with history.daily
 * @param {string} company - Company ID: 'nvidia', 'amd', 'intel', 'player'
 * @param {string} timeRange - 'day', 'week', 'month', 'quarter', 'year', 'ttm'
 * @returns {number} Market share as decimal (0.0 to 1.0)
 */
export function getMarketShare(state, company, timeRange = 'day') {
  const days = getTimeRangeDays(timeRange);
  const history = state.history.daily;

  if (!history || history.length === 0) return 0;

  // Get relevant days (most recent N days)
  const relevantDays = history.slice(-days);

  // Sum company units and total units
  let companyUnits = 0;
  let totalUnits = 0;

  for (const day of relevantDays) {
    companyUnits += day.companyTotals[company]?.units || 0;
    for (const comp of ['nvidia', 'amd', 'intel', 'player']) {
      totalUnits += day.companyTotals[comp]?.units || 0;
    }
  }

  return totalUnits > 0 ? companyUnits / totalUnits : 0;
}

export function getTimeRangeDays(timeRange) {
  switch (timeRange) {
    case 'day': return 1;
    case 'week': return 7;
    case 'month': return 30;
    case 'quarter': return 90;
    case 'year': return 365;
    case 'ttm': return 365;
    default: return 1;
  }
}
```

### Existing Constants Reference

From `constants.js`:
- `BUDGET_MAX_PRICE = 299`
- `MIDRANGE_MAX_PRICE = 599`
- `COMPANY_IDS = ['nvidia', 'amd', 'intel', 'player']`

From `market-data.js`:
- `USA_POPULATION_2022 = 332_000_000`
- `BASE_GPU_DEMAND_ANNUAL = 50_000_000`
- `calculateMarketDemand(year)` - returns yearly demand

From `competitor-data.js`:
- `STARTING_MARKET_SHARE = { nvidia: 0.80, amd: 0.18, intel: 0.02, player: 0 }`

### Previous Story Learnings

**From Story 2.2:**
- Products initialized in main.js, not game-state.js (layer rules)
- Product IDs: `{company}-{slug}-{year}q{quarter}`
- All 9 products accessible via `state.products[id]`
- `getStartingProductIds(company)` returns array of product IDs
- 567 tests total - maintain high coverage
- Code review caught DOM ID mismatch, cleanup issues

**From Story 1.8:**
- `calculateMarketDemand(year)` already exists and returns ~50M
- `MARKET_SEGMENTS` exists with segment definitions
- `getProductSegment(price)` returns segment key

**From Story 1.7:**
- Formatters available: `formatCurrency`, `formatPercent`
- Math helpers: `clamp`, `lerp`, `randomInRange`, `roundTo`

### Test Strategy

**Unit Tests (`queries.test.js`):**
```javascript
describe('getMarketShare', () => {
  it('returns 0 for empty history');
  it('returns correct share for single day');
  it('sums multiple days for quarter range');
  it('returns 0 for company with no sales');
  it('shares sum to 1.0 across all companies');
  it('handles missing company gracefully');
});

describe('getTimeRangeDays (exported)', () => {
  it('returns 1 for day');
  it('returns 7 for week');
  it('returns 30 for month');
  it('returns 90 for quarter');
  it('returns 365 for year and ttm');
  it('returns 1 for unknown timeRange (default)');
});
```

**Integration Tests (`history-init.test.js`):**
```javascript
describe('initializeHistory', () => {
  it('creates Day 1 entry in state.history.daily');
  it('Day 1 has correct structure');
  it('daily units match yearly demand / 365');
  it('nvidia gets ~80% of units');
  it('amd gets ~18% of units');
  it('intel gets ~2% of units');
  it('player gets 0 units');
  it('all active products have sales entries');
  it('revenue = units * msrp for each product');
  it('cost = units * manufacturingCost for each product');
});
```

### References

- [Source: docs/architecture.md#Daily Data Model] - History structure, market share calculation
- [Source: docs/epics.md#Story 2.3] - Acceptance criteria source
- [Source: src/project-context.md] - Layer rules, existing exports
- [Source: src/js/data/market-data.js] - calculateMarketDemand, MARKET_SEGMENTS
- [Source: src/js/data/competitor-data.js] - STARTING_MARKET_SHARE
- [Source: src/js/data/starting-products.js] - Product data, getStartingProductIds

## Dev Agent Record

### Context Reference

Story file, project-context.md, architecture.md, market-data.js, starting-products.js

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Fixed rounding issue in history-init.js: daily demand distribution needed remainder assignment to NVIDIA to ensure total equals `dailyDemand` exactly

### Completion Notes List

- ✅ Created `queries.js` with `getMarketShare()` and `getTimeRangeDays()` - pure functions, no imports (utils layer)
- ✅ Created `history-init.js` with `initializeHistory()` - imports STARTING_MARKET_SHARE from data layer
- ✅ Market share calculated from history (not stored) - company units / total units
- ✅ Day 1 history initialized with starting market shares: NVIDIA ~80%, AMD ~18%, Intel ~2%, Player 0%
- ✅ Product sales distributed by inverse price (cheaper products sell more)
- ✅ Updated main.js to set market demand and initialize history after product setup
- ✅ 57 new tests added (24 queries + 28 history-init + 5 main.js)
- ✅ All 624 tests pass, no regressions
- ✅ Updated project-context.md with new exports and simulation layer

### Code Review Fixes Applied

- ✅ Added tests for `getMarketShare(null, ...)` and `getMarketShare(undefined, ...)` edge cases
- ✅ Added test for all products discontinued scenario in history-init
- ✅ Added 5 integration tests: `initialize()` → `getMarketShare()` verification
- ✅ Added `console.warn` for invalid timeRange values (helps catch typos like 'quarterly')
- ✅ Added documentation comment explaining 'cost' vs 'costs' naming convention
- ✅ 10 new tests added (634 total), all passing

### File List

**New Files:**
- `src/js/utils/queries.js`
- `src/js/utils/queries.test.js`
- `src/js/simulation/history-init.js`
- `src/js/simulation/history-init.test.js`

**Modified Files:**
- `src/js/main.js`
- `src/js/main.test.js`
- `src/project-context.md`

**Unchanged (as specified):**
- `src/js/state/game-state.js` (layer rules)
- `src/js/data/market-data.js` (already complete)
