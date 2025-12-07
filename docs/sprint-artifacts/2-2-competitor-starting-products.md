# Story 2.2: Competitor Starting Products

Status: Complete

## CRITICAL - READ FIRST

1. **Create `src/js/data/starting-products.js`** - new file containing all 2022 product data
2. **Update `src/js/main.js`** to populate `state.products` at initialization (NOT game-state.js - layer rules!)
3. **Products use ID format:** `{company}-{name-slug}-{launchQuarter}` (e.g., `nvidia-rtx-3080-2020q3`)
4. **Data layer rule:** `data/` has NO imports - all values must be constants/literals
5. **State layer rule:** `state/` has NO imports - game-state.js stays pure
6. **Specs should be ballpark accurate (NFR6)** - exact numbers less important than realistic relationships
7. **Manufacturing costs are realistic BOM estimates** - margins are a market outcome, not a constraint

## Story

As a developer,
I want NVIDIA, AMD, and Intel to have realistic 2022 product portfolios,
So that the market simulation has accurate starting data.

## Acceptance Criteria

### NVIDIA Products (AC 1-5)

1. **Given** a new game starts in Q1 2022 **When** the state initializes **Then** NVIDIA has RTX 3090 in the products registry with specs: ~10496 cores, 24GB VRAM, ~1.70GHz, 350W TDP, ~628mm², 8nm, $1499 MSRP

2. **Given** a new game starts **When** the state initializes **Then** NVIDIA has RTX 3080 with specs: ~8704 cores, 10GB VRAM, ~1.71GHz, 320W TDP, ~628mm², 8nm, $699 MSRP

3. **Given** a new game starts **When** the state initializes **Then** NVIDIA has RTX 3070 with specs: ~5888 cores, 8GB VRAM, ~1.73GHz, 220W TDP, ~392mm², 8nm, $499 MSRP

4. **Given** a new game starts **When** the state initializes **Then** NVIDIA has RTX 3060 with specs: ~3584 cores, 12GB VRAM, ~1.78GHz, 170W TDP, ~276mm², 8nm, $329 MSRP

5. **Given** NVIDIA products exist **When** I query `state.products` **Then** all 4 NVIDIA products have complete data: unique ID, launch date (RTX 3090/3080/3070: 2020 Q3, RTX 3060: 2021 Q1), company, specs, MSRP, manufacturingCost

### AMD Products (AC 6-9)

6. **Given** a new game starts **When** the state initializes **Then** AMD has RX 6900 XT with specs: ~5120 cores, 16GB VRAM, ~2.25GHz, 300W TDP, ~519mm², 7nm, $999 MSRP

7. **Given** a new game starts **When** the state initializes **Then** AMD has RX 6800 XT with specs: ~4608 cores, 16GB VRAM, ~2.25GHz, 300W TDP, ~519mm², 7nm, $649 MSRP

8. **Given** a new game starts **When** the state initializes **Then** AMD has RX 6700 XT with specs: ~2560 cores, 12GB VRAM, ~2.58GHz, 230W TDP, ~336mm², 7nm, $479 MSRP

9. **Given** AMD products exist **When** I query `state.products` **Then** all 3 AMD products have complete data: unique ID, launch date (RX 6900 XT/6800 XT: 2020 Q4, RX 6700 XT: 2021 Q1), company, specs, MSRP, manufacturingCost

### Intel Arc Products (AC 10-12)

> **Design Decision:** Intel Arc products are present at game start (Q1 2022) for gameplay balance, ensuring all three competitors exist from day one. In reality, Arc launched Q4 2022.

10. **Given** a new game starts in Q1 2022 **When** the state initializes **Then** Intel has Arc A770 with specs: ~4096 cores, 16GB VRAM, ~2.10GHz, 225W TDP, ~406mm², 6nm, $349 MSRP

11. **Given** a new game starts **When** the state initializes **Then** Intel has Arc A750 with specs: ~3584 cores, 8GB VRAM, ~2.05GHz, 225W TDP, ~406mm², 6nm, $289 MSRP

12. **Given** Intel products exist **When** I query `state.products` **Then** all 2 Intel products have complete data: unique ID, launch date (2022 Q1), company, specs, MSRP, manufacturingCost

### Product Structure (AC 13-17)

13. **Given** any product in the registry **When** I examine its structure **Then** it has: `id`, `company`, `name`, `launchDate`, `discontinuedDate`, `specs`, `msrp`, `manufacturingCost`, `status`

14. **Given** a product's `specs` object **When** I examine it **Then** it contains: `cores`, `vram`, `clockSpeed`, `tdp`, `dieSize`, `nm`

15. **Given** a product's `launchDate` **When** I examine it **Then** it has: `quarter` (1-4), `year` (e.g., 2020)

16. **Given** products at game start **When** I check their status **Then** all have `status: 'active'` and `discontinuedDate: null`

17. **Given** the 9 total products **When** I examine their manufacturingCost **Then** costs reflect realistic BOM estimates (die + VRAM + packaging) - margins are determined by the market simulation, NOT hardcoded constraints

### Integration (AC 18-21)

18. **Given** `initialize()` is called in main.js **When** initialization completes **Then** `state.products` contains all 9 competitor products

19. **Given** `state.products` is populated **When** I access a product **Then** I can use `state.products['nvidia-rtx-3080-2020q3']` format

20. **Given** `state.companies.nvidia.products` **When** checked at game start **Then** it references all NVIDIA product IDs

21. **Given** the starting products **When** market simulation runs (Story 2.8) **Then** products are available for market share calculations

## Tasks

- [x] **Task 1: Create starting-products.js with NVIDIA lineup** (AC: 1-5, 13-16)
  - Create `src/js/data/starting-products.js`
  - Define NVIDIA_PRODUCTS array with RTX 3090, 3080, 3070, 3060
  - Use product structure: `{ id, company, name, launchDate, discontinuedDate, specs, msrp, manufacturingCost, status }`
  - ID format: `nvidia-rtx-3090-2020q3` (3090/3080/3070), `nvidia-rtx-3060-2021q1` (3060 launched Q1 2021!)
  - Use realistic BOM-based manufacturing costs (see reference table)

- [x] **Task 2: Add AMD lineup to starting-products.js** (AC: 6-9, 13-16)
  - Add AMD_PRODUCTS array with RX 6900 XT, 6800 XT, 6700 XT
  - Use same product structure
  - ID format: `amd-rx-6900-xt-2020q4` (6900 XT/6800 XT), `amd-rx-6700-xt-2021q1` (6700 XT launched Q1 2021!)
  - Use realistic BOM-based manufacturing costs

- [x] **Task 3: Add Intel Arc lineup to starting-products.js** (AC: 10-12, 13-16)
  - Add INTEL_PRODUCTS array with Arc A770, A750
  - Use same product structure
  - ID format: `intel-arc-a770-2022q1`, `intel-arc-a750-2022q1`
  - Game design: Both launch Q1 2022 (game start) for gameplay balance

- [x] **Task 4: Add realistic manufacturing costs** (AC: 17)
  - Use BOM-based cost estimation (see Product Reference Table)
  - Real-world estimates: RTX 3090 BOM ~$250-320, mid-range ~$150-200
  - Document cost basis in JSDoc comments
  - NO margin constraints - costs are physics, margins are market outcomes

- [x] **Task 5: Export combined products and helper functions** (AC: 18-19)
  - Export `STARTING_PRODUCTS` object with all products keyed by ID
  - Export `getStartingProductIds(company)` helper
  - Export `NVIDIA_PRODUCTS`, `AMD_PRODUCTS`, `INTEL_PRODUCTS` arrays
  - All exports as named exports (no default)

- [x] **Task 6: Update main.js to initialize products** (AC: 18-20)
  - Import `STARTING_PRODUCTS`, `getStartingProductIds` in main.js
  - In `initialize()` after `createInitialState()`:
    - Merge products into `state.products`
    - Populate `state.companies.{company}.products` with ID arrays
  - **DO NOT modify game-state.js** - state/ layer has no imports per project-context.md

- [x] **Task 7: Update competitor-data.js placeholder** (AC: 18)
  - Update `COMPETITOR_PLACEHOLDER_PRODUCTS` comment to reference `starting-products.js`
  - Keep the export for backwards compatibility but mark deprecated
  - No breaking changes to existing exports

- [x] **Task 8: Write starting-products.test.js** (AC: all)
  - Test all products exist with correct structure
  - Test ID format matches `{company}-{slug}-{quarter}` pattern
  - Test specs are within realistic ranges
  - Test manufacturing costs are positive numbers (no margin constraints!)
  - Test launch dates match real-world: RTX 3060 = 2021 Q1, RX 6700 XT = 2021 Q1
  - Test all products have 'active' status and null discontinuedDate
  - Test STARTING_PRODUCTS object has all 9 products
  - Test products fall into expected market segments using `getProductSegment()` from market-data.js

- [x] **Task 9: Write main.js integration tests** (AC: 18-20)
  - Test `initialize()` populates state.products with all 9 products
  - Test products are accessible by ID
  - Test state.companies.nvidia.products has 4 IDs
  - Test state.companies.amd.products has 3 IDs
  - Test state.companies.intel.products has 2 IDs

- [x] **Task 10: Update project-context.md** (AC: all)
  - Add starting-products.js exports to data/ section
  - Document product structure and ID format
  - Note that initialization happens in main.js, not game-state.js

## Dev Notes

### Quick Reference

| Item | Value |
|------|-------|
| **New Files** | `src/js/data/starting-products.js`, `src/js/data/starting-products.test.js` |
| **Modified Files** | `src/js/main.js`, `src/js/data/competitor-data.js` |
| **NOT Modified** | `src/js/state/game-state.js` (layer rules - no imports allowed!) |
| **Updated Docs** | `src/project-context.md` |
| **Layer** | `data/` - NO imports allowed (constants/literals only) |
| **Depends On** | Story 1.2 (game-state.js), Story 1.8 (competitor-data.js) |
| **Total ACs** | 21 |

### Architecture Compliance

**Layer Rules (from project-context.md - the project bible):**
```
utils → no imports allowed
state → no imports allowed  <-- game-state.js stays pure!
core → may import state
ui → may import state,core,utils
data → no imports allowed (JSON/constants only)
main → may import all  <-- Products initialized HERE
```

**Why main.js, not game-state.js?**
- `game-state.js` is in the `state/` layer which has NO imports
- `main.js` can import from all layers including `data/`
- This keeps `createInitialState()` pure and testable
- Products are merged after state creation, maintaining immutability pattern

### Product Reference Table

| Company | Product | ID | Launch | MSRP | BOM Est. | Segment |
|---------|---------|-----|--------|------|----------|---------|
| NVIDIA | RTX 3090 | nvidia-rtx-3090-2020q3 | Q3 2020 | $1499 | ~$280 | highend |
| NVIDIA | RTX 3080 | nvidia-rtx-3080-2020q3 | Q3 2020 | $699 | ~$250 | highend |
| NVIDIA | RTX 3070 | nvidia-rtx-3070-2020q3 | Q3 2020 | $499 | ~$170 | midrange |
| NVIDIA | RTX 3060 | nvidia-rtx-3060-2021q1 | **Q1 2021** | $329 | ~$140 | midrange |
| AMD | RX 6900 XT | amd-rx-6900-xt-2020q4 | Q4 2020 | $999 | ~$240 | highend |
| AMD | RX 6800 XT | amd-rx-6800-xt-2020q4 | Q4 2020 | $649 | ~$220 | highend |
| AMD | RX 6700 XT | amd-rx-6700-xt-2021q1 | **Q1 2021** | $479 | ~$160 | midrange |
| Intel | Arc A770 | intel-arc-a770-2022q1 | Q1 2022* | $349 | ~$200 | midrange |
| Intel | Arc A750 | intel-arc-a750-2022q1 | Q1 2022* | $289 | ~$170 | budget |

*Intel Arc: Q1 2022 for gameplay balance (real launch was Q4 2022)

**BOM estimates based on industry analysis:**
- RTX 3090 real-world BOM: ~$190-320 (we use ~$280)
- Wholesale to distributors: ~$700 for RTX 3090
- These are COSTS, not prices - margins are market outcomes

**Segment boundaries** (use `getProductSegment(price)` from `market-data.js`, boundaries from `constants.js`):
- Budget: $0-$BUDGET_MAX_PRICE (299)
- Midrange: $300-$MIDRANGE_MAX_PRICE (599)
- Highend: $600+

### Complete Implementation

> **Note:** Implementation code provided as reference. Dev agent may optimize based on actual file structure at implementation time.

**File: `src/js/data/starting-products.js`**
```javascript
/**
 * Competitor Starting Products for Q1 2022
 * NVIDIA RTX 30 series, AMD RX 6000 series, Intel Arc A-series
 *
 * Layer: data/ (no imports allowed - all values are literals)
 *
 * Product ID format: {company}-{name-slug}-{launchQuarter}
 * Manufacturing costs are BOM estimates - margins determined by market simulation
 *
 * BOM estimates based on industry teardowns and analysis:
 * - Die cost: ~$0.25-0.35/mm² depending on process node
 * - VRAM: ~$6/GB (GDDR6/GDDR6X average)
 * - Packaging + PCB: ~$60-70 fixed
 */

/**
 * @typedef {Object} ProductSpecs
 * @property {number} cores - GPU core count
 * @property {number} vram - VRAM in GB
 * @property {number} clockSpeed - Clock speed in GHz
 * @property {number} tdp - Thermal Design Power in Watts
 * @property {number} dieSize - Die size in mm²
 * @property {number} nm - Process node in nanometers
 */

/**
 * @typedef {Object} Product
 * @property {string} id - Unique ID: {company}-{slug}-{quarter} (e.g., 'nvidia-rtx-3080-2020q3')
 * @property {string} company - Company ID: 'nvidia', 'amd', 'intel', or 'player'
 * @property {string} name - Display name (e.g., 'RTX 3080')
 * @property {{quarter: number, year: number}} launchDate - Launch date
 * @property {{quarter: number, year: number}|null} discontinuedDate - Discontinued date or null if active
 * @property {ProductSpecs} specs - Technical specifications
 * @property {number} msrp - Manufacturer's suggested retail price in USD
 * @property {number} manufacturingCost - BOM cost in USD
 * @property {'active'|'discontinued'} status - Product lifecycle status
 */

/** NVIDIA GeForce RTX 30 Series (Samsung 8nm) */
export const NVIDIA_PRODUCTS = [
  {
    id: 'nvidia-rtx-3090-2020q3',
    company: 'nvidia',
    name: 'RTX 3090',
    launchDate: { quarter: 3, year: 2020 },
    discontinuedDate: null,
    specs: { cores: 10496, vram: 24, clockSpeed: 1.70, tdp: 350, dieSize: 628, nm: 8 },
    msrp: 1499,
    manufacturingCost: 280,
    status: 'active'
  },
  {
    id: 'nvidia-rtx-3080-2020q3',
    company: 'nvidia',
    name: 'RTX 3080',
    launchDate: { quarter: 3, year: 2020 },
    discontinuedDate: null,
    specs: { cores: 8704, vram: 10, clockSpeed: 1.71, tdp: 320, dieSize: 628, nm: 8 },
    msrp: 699,
    manufacturingCost: 250,
    status: 'active'
  },
  {
    id: 'nvidia-rtx-3070-2020q3',
    company: 'nvidia',
    name: 'RTX 3070',
    launchDate: { quarter: 3, year: 2020 },
    discontinuedDate: null,
    specs: { cores: 5888, vram: 8, clockSpeed: 1.73, tdp: 220, dieSize: 392, nm: 8 },
    msrp: 499,
    manufacturingCost: 170,
    status: 'active'
  },
  {
    id: 'nvidia-rtx-3060-2021q1',
    company: 'nvidia',
    name: 'RTX 3060',
    launchDate: { quarter: 1, year: 2021 },
    discontinuedDate: null,
    specs: { cores: 3584, vram: 12, clockSpeed: 1.78, tdp: 170, dieSize: 276, nm: 8 },
    msrp: 329,
    manufacturingCost: 140,
    status: 'active'
  }
];

/** AMD Radeon RX 6000 Series (TSMC 7nm) */
export const AMD_PRODUCTS = [
  {
    id: 'amd-rx-6900-xt-2020q4',
    company: 'amd',
    name: 'RX 6900 XT',
    launchDate: { quarter: 4, year: 2020 },
    discontinuedDate: null,
    specs: { cores: 5120, vram: 16, clockSpeed: 2.25, tdp: 300, dieSize: 519, nm: 7 },
    msrp: 999,
    manufacturingCost: 240,
    status: 'active'
  },
  {
    id: 'amd-rx-6800-xt-2020q4',
    company: 'amd',
    name: 'RX 6800 XT',
    launchDate: { quarter: 4, year: 2020 },
    discontinuedDate: null,
    specs: { cores: 4608, vram: 16, clockSpeed: 2.25, tdp: 300, dieSize: 519, nm: 7 },
    msrp: 649,
    manufacturingCost: 220,
    status: 'active'
  },
  {
    id: 'amd-rx-6700-xt-2021q1',
    company: 'amd',
    name: 'RX 6700 XT',
    launchDate: { quarter: 1, year: 2021 },
    discontinuedDate: null,
    specs: { cores: 2560, vram: 12, clockSpeed: 2.58, tdp: 230, dieSize: 336, nm: 7 },
    msrp: 479,
    manufacturingCost: 160,
    status: 'active'
  }
];

/** Intel Arc A-Series (TSMC 6nm) - Q1 2022 for gameplay balance */
export const INTEL_PRODUCTS = [
  {
    id: 'intel-arc-a770-2022q1',
    company: 'intel',
    name: 'Arc A770',
    launchDate: { quarter: 1, year: 2022 },
    discontinuedDate: null,
    specs: { cores: 4096, vram: 16, clockSpeed: 2.10, tdp: 225, dieSize: 406, nm: 6 },
    msrp: 349,
    manufacturingCost: 200,
    status: 'active'
  },
  {
    id: 'intel-arc-a750-2022q1',
    company: 'intel',
    name: 'Arc A750',
    launchDate: { quarter: 1, year: 2022 },
    discontinuedDate: null,
    specs: { cores: 3584, vram: 8, clockSpeed: 2.05, tdp: 225, dieSize: 406, nm: 6 },
    msrp: 289,
    manufacturingCost: 170,
    status: 'active'
  }
];

/** All starting products keyed by ID for state.products */
export const STARTING_PRODUCTS = Object.fromEntries([
  ...NVIDIA_PRODUCTS,
  ...AMD_PRODUCTS,
  ...INTEL_PRODUCTS
].map(p => [p.id, p]));

/**
 * Get product IDs for a specific company
 * @param {string} company - Company ID: 'nvidia', 'amd', or 'intel'
 * @returns {string[]} Array of product IDs for that company
 */
export function getStartingProductIds(company) {
  return Object.values(STARTING_PRODUCTS)
    .filter(p => p.company === company)
    .map(p => p.id);
}
```

**Update in `src/js/main.js`:**
```javascript
import { createInitialState } from './state/game-state.js';
import { STARTING_PRODUCTS, getStartingProductIds } from './data/starting-products.js';
// ... other existing imports

export function initialize() {
  const state = createInitialState();

  // Populate products from starting data (main.js can import from data/)
  // Merge pattern allows for future extensibility (e.g., save/load with existing products)
  if (Object.keys(state.products).length > 0) {
    console.warn('[INIT] state.products not empty, merging with starting products');
  }
  state.products = { ...state.products, ...STARTING_PRODUCTS };

  // Link products to companies
  state.companies.nvidia.products = getStartingProductIds('nvidia');
  state.companies.amd.products = getStartingProductIds('amd');
  state.companies.intel.products = getStartingProductIds('intel');

  initializeUI(state);
  startGameLoop(state, render, handleGameError);
  initKeyboardShortcuts(state, render);

  return state;
}
```

### Test Strategy

**Unit Tests (`starting-products.test.js`):**
```javascript
import { getProductSegment } from '../market-data.js';
import { COMPANY_IDS, SEGMENT_KEYS } from './constants.js';

describe('NVIDIA_PRODUCTS', () => {
  it('contains 4 products');
  it('RTX 3090/3080/3070 have launch Q3 2020');
  it('RTX 3060 has launch Q1 2021'); // Critical: different quarter!
  it('all have valid ID format {company}-{slug}-{year}q{quarter}');
  it('all have complete specs object with 6 properties');
  it('manufacturingCost is positive for all');
});

describe('AMD_PRODUCTS', () => {
  it('contains 3 products');
  it('RX 6900 XT/6800 XT have launch Q4 2020');
  it('RX 6700 XT has launch Q1 2021'); // Critical: different quarter!
});

describe('INTEL_PRODUCTS', () => {
  it('contains 2 products');
  it('both have launch Q1 2022 (game start)');
});

describe('STARTING_PRODUCTS', () => {
  it('contains all 9 products');
  it('all accessible by ID key');
  it('no duplicate IDs');
});

describe('getStartingProductIds', () => {
  // Use COMPANY_IDS constant for consistency with other tests
  const competitors = COMPANY_IDS.filter(id => id !== 'player');

  it('returns 4 IDs for nvidia');
  it('returns 3 IDs for amd');
  it('returns 2 IDs for intel');
  it('returns empty array for player');
  it('returns empty array for unknown company');

  competitors.forEach(company => {
    it(`returns only IDs belonging to ${company}`, () => {
      const ids = getStartingProductIds(company);
      ids.forEach(id => expect(id).toMatch(new RegExp(`^${company}-`)));
    });
  });
});

describe('Product ID Format Validation', () => {
  const idPattern = /^(nvidia|amd|intel)-[a-z0-9-]+-\d{4}q[1-4]$/;

  it('all product IDs match expected format', () => {
    Object.keys(STARTING_PRODUCTS).forEach(id => {
      expect(id).toMatch(idPattern);
    });
  });
});

describe('Market Segment Coverage', () => {
  it('Arc A750 ($289) is in budget segment');
  it('RTX 3070, 3060, RX 6700 XT, Arc A770 are in midrange segment');
  it('RTX 3090, 3080, RX 6900 XT, 6800 XT are in highend segment');

  it('products cover all segments', () => {
    const segments = Object.values(STARTING_PRODUCTS).map(p => getProductSegment(p.msrp));
    SEGMENT_KEYS.forEach(segment => {
      expect(segments).toContain(segment);
    });
  });

  it('segment distribution is reasonable for market simulation', () => {
    const segments = Object.values(STARTING_PRODUCTS).map(p => getProductSegment(p.msrp));
    expect(segments.filter(s => s === 'budget').length).toBeGreaterThanOrEqual(1);
    expect(segments.filter(s => s === 'midrange').length).toBeGreaterThanOrEqual(2);
    expect(segments.filter(s => s === 'highend').length).toBeGreaterThanOrEqual(3);
  });
});
```

### Previous Story Learnings

**From Story 2.1:**
- Enhanced existing files rather than creating duplicates
- 501 tests total passing - maintain high coverage
- Code review caught edge cases

**From Story 1.8 (competitor-data.js):**
- `COMPETITOR_PLACEHOLDER_PRODUCTS` exists - update comment to reference starting-products.js
- All exports are named exports
- Layer rule: data/ has NO imports

**From Story 1.2 (game-state.js):**
- Products registry uses `state.products` with ID keys
- State must be JSON-serializable
- **game-state.js has NO imports** - keep it pure per project-context.md

### References

- [Source: docs/architecture.md#Data Model] - Products registry pattern
- [Source: docs/prd.md#Simulation Realism Principles] - No hardcoded margins
- [Source: src/project-context.md] - Layer rules (state/ has no imports!)
- [Source: src/js/data/market-data.js] - getProductSegment() for segment tests
- [Source: src/js/data/competitor-data.js] - Placeholder to update
- [Source: src/js/main.js] - Where product initialization belongs

## Dev Agent Record

### Context Reference

Story file, project-context.md, existing data layer files

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None - clean implementation

### Completion Notes List

- Created `starting-products.js` with all 9 competitor products (NVIDIA 4, AMD 3, Intel 2)
- All products follow exact structure: id, company, name, launchDate, discontinuedDate, specs, msrp, manufacturingCost, status
- Product IDs use format: `{company}-{slug}-{year}q{quarter}` (e.g., 'nvidia-rtx-3080-2020q3')
- Manufacturing costs are realistic BOM estimates based on industry analysis
- Layer rules respected: data/ has no imports, game-state.js untouched
- Products initialized in main.js via merge pattern for future extensibility
- Marked COMPETITOR_PLACEHOLDER_PRODUCTS as deprecated
- Updated project-context.md with new exports and product structure documentation
- 52 unit tests for starting-products.js, 14 integration tests for main.js
- All 567 tests pass (66 new tests added)

### File List

**New Files:**
- src/js/data/starting-products.js
- src/js/data/starting-products.test.js
- src/js/main.test.js

**Modified Files:**
- src/js/main.js (added product imports and initialization)
- src/js/data/competitor-data.js (marked placeholder as deprecated)
- src/project-context.md (added product exports and structure)
- docs/sprint-artifacts/sprint-status.yaml (status: in-progress → review)

### Change Log

- 2025-12-07: Implemented Story 2.2 - Competitor Starting Products with all 9 GPU products, 66 new tests
- 2025-12-07: Code Review Fixes - Fixed DOM ID mismatch in main.test.js (main-panel→main-content), added stopGameLoop/cleanupKeyboardShortcuts cleanup to afterEach

