---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments:
  - docs/prd.md
  - docs/ux-design-specification.md
  - docs/analysis/product-brief-TechGame-2025-12-01.md
workflowType: 'architecture'
lastStep: 8
status: 'complete'
completedAt: '2025-12-02'
project_name: 'TechGame'
user_name: 'Djord'
date: '2025-12-02'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (46 total):**

| Category | Count | Architectural Impact |
|----------|-------|---------------------|
| GPU Design (FR1-9) | 9 | Spec input system, cost/performance calculations |
| Product Launch & Business (FR10-16) | 7 | Pricing engine, manufacturing/marketing allocation |
| Market Simulation (FR17-27) | 11 | Core simulation engine, demand modeling, hourly tick system |
| Competitor AI (FR28-34) | 7 | AI decision engine, strategic response system |
| Feedback & Visualization (FR35-40) | 6 | Chart components, real-time data displays |
| Game Flow (FR41-46) | 6 | Save/load, time controls, simulation speed |

**Non-Functional Requirements (16 total):**

| Category | Key Requirements | Architectural Impact |
|----------|-----------------|---------------------|
| Performance (NFR1-5) | <100ms UI, <1s sim tick, no frame drops | Efficient rendering, optimized calculations |
| Data Accuracy (NFR6-9) | Ballpark real-world accuracy, logical consistency | Validated data models, realistic formulas |
| UI/UX Quality (NFR10-13) | HOI4/Victoria 3 tier, no repetitive clicking | Apple-level polish, streamlined interactions |
| Reliability (NFR14-16) | Zero calculation errors, no save corruption | Robust state management, data validation |

**Scale & Complexity:**

- Primary domain: Client-side game simulation with data visualization
- Complexity level: Medium-High
- Estimated architectural components: 8-12 major modules

### Time System Architecture

**Simulation Tick Model:**
- **Tick granularity**: 1 tick = 1 in-game hour
- **Configurable speed**: 1, 2, 4+ ticks per real-time second
- **Time math**: At 1 tick/sec, a 24-hour day passes in 24 seconds; a quarter (~2,160 hours) in ~36 minutes

**Action Timing Constraints:**

| Action Type | When Allowed | Architectural Implication |
|-------------|--------------|--------------------------|
| GPU Design | Anytime (continuous) | UI always responsive, design state separate from sim |
| R&D Allocation | Anytime (continuous) | Resource allocation editable mid-tick |
| Pricing Changes | Anytime (continuous) | Price updates apply immediately to market calc |
| Product Releases | Quarterly boundaries only | Queue system for scheduled launches |
| Market Simulation | Every tick (hourly) | Lightweight hourly updates, heavier quarterly rollups |

### Technical Constraints & Dependencies

**Already Decided (from PRD/UX):**
- Stack: Vanilla HTML/CSS/JS + Tailwind CSS (npm for build only)
- Platform: Windows 11, Chrome browser, 1080p-4K
- Distribution: Offline desktop app, optional Neutralino.js packaging
- No external runtime dependencies

**Implied Constraints:**
- All simulation runs client-side (no server)
- State must be serializable for save/load
- Real-time UI requires reactive architecture pattern
- Hourly ticks must complete fast enough for high-speed play (4+ ticks/sec = <250ms per tick max)

### Cross-Cutting Concerns Identified

1. **State Management**: Central game state drives all UI, simulation, and persistence
2. **Real-Time Rendering**: All components must update automatically when state changes
3. **Simulation Engine**: Hourly tick processing with quarterly business events
4. **Data Validation**: Zero tolerance for calculation errors requires validation layer
5. **Performance**: 60fps UI + fast tick processing for high-speed simulation
6. **Save/Load System**: Complete game state serialization and restoration
7. **Time Control**: Pause/play/speed controls with simulation state sync

## Starter Template Evaluation

### Primary Technology Domain

Client-side browser application (game/simulation) - no server component needed.

### Starter Options Considered

| Option | Verdict | Reason |
|--------|---------|--------|
| Manual Setup | ✅ Selected | Maximum LLM compatibility, zero framework churn |
| Vite (vanilla) | ❌ Rejected | Adds build complexity, version sensitivity |
| Any framework | ❌ Rejected | PRD explicitly forbids, reduces LLM reliability |

### Selected Approach: Manual Setup

**Rationale:**
- LLMs have trained on billions of vanilla HTML/CSS/JS examples
- Web platform APIs are stable for decades (no breaking changes)
- Tailwind CSS core utilities unchanged since 2021
- Zero version sensitivity - no "works in v4.2, breaks in v4.3" issues
- Maximum simplicity = maximum LLM accuracy

**Project Structure:**

```
TechGame/
├── index.html              # Main entry point
├── package.json            # Just for Tailwind
├── tailwind.config.js      # Design tokens
├── src/
│   ├── css/
│   │   └── input.css       # Tailwind directives + custom CSS
│   └── js/
│       ├── main.js         # Entry point
│       └── modules/        # Game logic modules
└── dist/
    └── output.css          # Compiled Tailwind (gitignored)
```

**Initialization Commands:**

```bash
mkdir TechGame && cd TechGame
npm init -y
npm install -D tailwindcss
npx tailwindcss init
```

**Build Command:**

```bash
npx tailwindcss -i ./src/css/input.css -o ./dist/output.css --watch
```

### Architectural Decisions Established

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Language | Vanilla JavaScript (ES6+) | Maximum LLM familiarity |
| Styling | Tailwind CSS | Utility classes stable since 2021 |
| Build Tools | Tailwind CLI only | Minimal tooling, zero framework overhead |
| Module System | ES6 modules (native) | Browser-native, no bundler needed |
| Type Safety | None (vanilla JS) | Simplicity over safety for solo project |
| Testing | Manual + browser DevTools | Keep it simple |

**Note:** Project initialization should be the first implementation task.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Game loop and tick system architecture
- State structure and persistence format
- UI rendering approach

**Important Decisions (Shape Architecture):**
- Module organization pattern
- Chart rendering approach
- AI competitor decision system structure

**Deferred Decisions (Post-MVP):**
- Neutralino.js packaging specifics
- Performance optimization strategies
- Advanced save features (compression, cloud sync)

### Data Architecture

**Save/Load System (HOI4-Style):**
- **Approach**: File system saves
- **Location**: `Documents/TechGame/saves/`
- **Format**: `.techgame` files (JSON, human-readable)
- **Rationale**: User control, easy backup/sharing, familiar pattern for strategy gamers

**State Structure:**
- Single centralized state object containing all game data
- Fully serializable (JSON.stringify for saves)
- No circular references, no class instances in state

### State Management Pattern

**Approach**: Tick-synchronized UI refresh (game engine pattern)

**How it works:**
1. Game loop calls `tick()` at configured speed (1/2/4 ticks per second)
2. `tick()` updates central state object (simulation calculations, AI decisions)
3. After tick completes, `render()` refreshes entire UI from current state
4. UI is always a pure reflection of state - no async, no subscriptions

**Rationale:**
- Matches HOI4/Clausewitz engine architecture
- Simpler than reactive patterns (no subscription management)
- Predictable, debuggable (state at any tick is deterministic)
- Natural fit for simulation games with discrete time steps

### Visualization Architecture

**Approach**: Custom SVG rendering

**Implementation:**
- SVG elements for all charts (market share lines, financial graphs)
- Updated synchronously during render phase
- Full control over aesthetics (Apple-level polish achievable)
- Zero external dependencies

**Chart Types Needed:**
- Line chart (market share over time - "The Crushing Chart")
- Area chart (revenue/cost visualization)
- Bar chart (product comparisons)

### Module Organization

**Pattern**: Layer-based separation

```
src/js/
├── core/           # Game loop, tick system, time controls, initialization
├── state/          # GameState object, save/load, state validation
├── simulation/     # Market engine, AI competitors, GPU calculations
├── ui/             # DOM updates, SVG charts, component rendering
├── data/           # Static configs, starting data, competitor templates
└── utils/          # Formatters, math helpers, validation functions
```

**Layer Responsibilities:**

| Layer | Responsibility | Depends On |
|-------|---------------|------------|
| core | Game loop, tick dispatch | state, simulation, ui |
| state | Data structure, persistence | utils |
| simulation | All calculations, AI logic | state, data, utils |
| ui | DOM/SVG rendering | state, utils |
| data | Static definitions | - |
| utils | Pure helper functions | - |

**Data Flow:**
```
User Input → state (queue action)
     ↓
Game Loop → simulation.tick(state) → mutates state
     ↓
         → ui.render(state) → updates DOM/SVG
```

### Infrastructure & Deployment

**Development**:
- Run via local HTTP server (Python `http.server` or VS Code Live Server)
- Tailwind watch for CSS compilation

**Distribution**:
- Browser-based during development
- Neutralino.js packaging for final `.exe` (deferred to post-MVP)

## Implementation Patterns & Consistency Rules

### Why These Patterns Matter

These patterns ensure any LLM (ChatGPT, Gemini, Claude) produces compatible code across sessions. Without explicit rules, different agents make different choices that break integration.

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| JS files | kebab-case | `market-engine.js`, `gpu-designer.js` |
| CSS files | kebab-case | `main-dashboard.css` |
| Functions | camelCase | `calculateMarketShare()`, `renderCompanies()` |
| Variables | camelCase | `playerCash`, `currentQuarter` |
| Constants | SCREAMING_SNAKE | `MAX_TICK_SPEED`, `STARTING_CASH` |
| State keys | camelCase | `state.player.cash`, `state.market.shares` |

**Enforcement:** All code must follow these conventions. No exceptions.

### State Structure Pattern

**Domain-grouped nested objects:**

```javascript
const state = {
  // Time & simulation
  time: {
    currentHour: 0,
    currentDay: 1,
    currentMonth: 1,
    currentQuarter: 1,
    currentYear: 2022,
    tickSpeed: 1,
    paused: false
  },

  // Player company
  player: {
    name: "PlayerCorp",
    cash: 10000000,
    products: [],
    rdProjects: [],
    marketingBudget: 0
  },

  // AI competitors (same structure as player)
  companies: {
    nvidia: { name: "NVIDIA", cash: 50000000000, products: [], ... },
    amd: { name: "AMD", cash: 10000000000, products: [], ... },
    intel: { name: "Intel Arc", cash: 80000000000, products: [], ... }
  },

  // Market state
  market: {
    totalDemand: 50000000,
    shares: { player: 0, nvidia: 0.80, amd: 0.18, intel: 0.02 },
    segments: { budget: {...}, midrange: {...}, highend: {...} }
  },

  // UI state (separate from game state)
  ui: {
    currentView: 'dashboard',
    selectedProduct: null,
    gpuDesigner: { specs: {...}, name: '', price: 0 }
  }
};
```

**Rules:**
- Top-level keys are domains: `time`, `player`, `companies`, `market`, `ui`
- No flat state with prefixes
- UI state is separate from game simulation state

### Module Export Pattern

**Named exports only:**

```javascript
// ✅ Good - named exports
export function tick(state) { ... }
export function calculateMarketShare(state) { ... }
export const MARKET_CONSTANTS = { ... };

// ❌ Bad - default exports
export default { tick, calculateMarketShare };

// ❌ Bad - classes
export default class MarketEngine { ... }
```

**Rationale:** Named exports are explicit, LLM-friendly, and prevent naming conflicts.

### UI Rendering Pattern

**Diff-based selective rendering:**

```javascript
let prevState = null;

export function render(state) {
  // Only re-render sections whose state changed (reference comparison)
  if (state.market !== prevState?.market) {
    renderMarketChart(state.market);
  }
  if (state.player !== prevState?.player) {
    renderPlayerPanel(state.player);
  }
  if (state.companies !== prevState?.companies) {
    renderCompetitorCards(state.companies);
  }
  if (state.time !== prevState?.time) {
    renderTimeControls(state.time);
  }
  if (state.ui !== prevState?.ui) {
    renderActiveView(state);
  }

  prevState = state;
}
```

**Critical Rule for Simulation Code:**

When updating state, ALWAYS create new object references for changed sections:

```javascript
// ✅ Correct - creates new reference, triggers re-render
state.market = {
  ...state.market,
  shares: calculateNewShares(state)
};

// ❌ Wrong - mutates in place, render won't detect change
state.market.shares = calculateNewShares(state);
```

### Error Handling Pattern

**Try-catch at game loop boundary:**

```javascript
// In core/game-loop.js
function gameLoop() {
  if (state.time.paused) return;

  try {
    tick(state);
    render(state);
  } catch (error) {
    console.error('[GAME ERROR]', error);
    state.time.paused = true;
    showErrorModal('Game paused due to error. Check console.');
  }
}
```

**Rules:**
- Simulation code does NOT try-catch internally (let errors bubble)
- Game loop catches all errors and pauses game
- Errors are logged with `[GAME ERROR]` prefix
- User sees "game paused" message, not cryptic error

### File Organization Rules

```
src/js/
├── core/
│   ├── game-loop.js      # Main loop, tick dispatch
│   ├── time-controls.js  # Pause, speed, skip quarter
│   └── init.js           # Game initialization
├── state/
│   ├── game-state.js     # State object definition, defaults
│   ├── save-load.js      # File system persistence
│   └── validation.js     # State validation helpers
├── simulation/
│   ├── market-engine.js  # Market share calculations
│   ├── ai-competitors.js # AI decision logic
│   ├── gpu-calculations.js # Performance/cost formulas
│   └── quarterly-events.js # Quarter-end processing
├── ui/
│   ├── render.js         # Main render coordinator
│   ├── charts/           # SVG chart components
│   │   ├── market-share-chart.js
│   │   └── financial-chart.js
│   ├── panels/           # UI panel renderers
│   │   ├── dashboard.js
│   │   ├── gpu-designer.js
│   │   └── competitor-view.js
│   └── components/       # Reusable UI elements
│       ├── buttons.js
│       └── tables.js
├── data/
│   ├── starting-state.js # Initial game state
│   ├── competitor-data.js # NVIDIA/AMD/Intel templates
│   └── constants.js      # Game balance constants
└── utils/
    ├── formatters.js     # Number/date formatting
    ├── math.js           # Math helpers
    └── dom.js            # DOM manipulation helpers
```

**Rules:**
- One responsibility per file
- Files under 300 lines (split if larger)
- No circular imports between layers
- `data/` contains only static data, no logic

### Enforcement Guidelines

**All AI Agents MUST:**

1. Follow naming conventions exactly (kebab-case files, camelCase code)
2. Use named exports only
3. Create new object references when mutating state
4. Place code in correct layer directory
5. Keep files under 300 lines
6. Not add try-catch inside simulation code

**Pattern Verification:**
- File names match `kebab-case.js` pattern
- No `export default` in codebase
- State mutations use spread operator
- Imports only flow downward in layer hierarchy

## Project Structure & Boundaries

### Complete Project Directory Structure

```
TechGame/
├── index.html                    # Main entry point
├── package.json                  # Tailwind dependency only
├── tailwind.config.js            # Design tokens from UX spec
├── .gitignore
├── README.md
│
├── src/
│   ├── css/
│   │   └── input.css             # Tailwind directives + custom CSS
│   │
│   └── js/
│       ├── main.js               # App bootstrap, imports all modules
│       │
│       ├── core/
│       │   ├── game-loop.js      # Main loop, tick dispatch, requestAnimationFrame
│       │   ├── time-controls.js  # Pause, play, speed (1/2/4x), skip to quarter
│       │   └── init.js           # New game setup, initial state creation
│       │
│       ├── state/
│       │   ├── game-state.js     # State object definition, createInitialState()
│       │   ├── save-load.js      # File System API, .techgame file handling
│       │   └── validation.js     # State integrity checks
│       │
│       ├── simulation/
│       │   ├── market-engine.js      # Market share calc, demand distribution
│       │   ├── ai-competitors.js     # NVIDIA/AMD/Intel decision logic
│       │   ├── gpu-calculations.js   # Performance scores, manufacturing costs
│       │   ├── business-engine.js    # Revenue, costs, profit calculations
│       │   └── quarterly-events.js   # Quarter-end processing, product launches
│       │
│       ├── ui/
│       │   ├── render.js             # Main render coordinator (diff-based)
│       │   │
│       │   ├── charts/
│       │   │   ├── market-share-chart.js   # "The Crushing Chart" - SVG line chart
│       │   │   ├── financial-chart.js      # Revenue/profit area charts
│       │   │   └── chart-utils.js          # SVG helpers, scaling, axes
│       │   │
│       │   ├── panels/
│       │   │   ├── dashboard.js            # Main dashboard view
│       │   │   ├── gpu-designer.js         # Spec sliders, cost preview
│       │   │   ├── product-launch.js       # Pricing, marketing, launch queue
│       │   │   ├── competitor-view.js      # AI company details
│       │   │   ├── financial-panel.js      # Player P/L, cash, market cap
│       │   │   └── news-ticker.js          # Scrolling headlines
│       │   │
│       │   └── components/
│       │       ├── buttons.js              # Button styles and handlers
│       │       ├── sliders.js              # Spec slider component
│       │       ├── tables.js               # Data table rendering
│       │       ├── modals.js               # Modal/dialog system
│       │       └── tooltips.js             # Hover tooltips
│       │
│       ├── data/
│       │   ├── starting-state.js       # Initial game state (2022 Q1)
│       │   ├── competitor-data.js      # NVIDIA/AMD/Intel starting products
│       │   ├── market-data.js          # USA market size, segment definitions
│       │   ├── gpu-specs.js            # Valid spec ranges, nm process costs
│       │   └── constants.js            # Balance constants, magic numbers
│       │
│       └── utils/
│           ├── formatters.js           # Currency, %, numbers, dates
│           ├── math.js                 # Clamp, lerp, random range
│           ├── dom.js                  # DOM helpers, element creation
│           └── svg.js                  # SVG element creation helpers
│
├── dist/
│   └── output.css                # Compiled Tailwind (gitignored)
│
├── saves/                        # Default save location (dev mode)
│   └── .gitkeep
│
└── docs/                         # Project documentation
    ├── prd.md
    ├── ux-design-specification.md
    └── architecture.md
```

### Architectural Boundaries

**Layer Boundaries (Import Rules):**

```
┌─────────────────────────────────────────────┐
│                   core/                      │
│         (can import from all layers)         │
└─────────────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
┌─────────────┐ ┌───────────┐ ┌─────────┐
│ simulation/ │ │    ui/    │ │ state/  │
│(imports:    │ │(imports:  │ │(imports:│
│ state,data, │ │ state,    │ │ utils)  │
│ utils)      │ │ utils)    │ │         │
└─────────────┘ └───────────┘ └─────────┘
        │             │             │
        └─────────────┼─────────────┘
                      ▼
              ┌─────────────┐
              │    data/    │
              │  (no imports│
              │   except    │
              │   constants)│
              └─────────────┘
                      │
                      ▼
              ┌─────────────┐
              │   utils/    │
              │(no imports) │
              └─────────────┘
```

**Forbidden Imports:**
- `ui/` cannot import from `simulation/` (separation of concerns)
- `simulation/` cannot import from `ui/`
- `data/` cannot import from any other layer
- `utils/` cannot import from any other layer

**State Boundaries:**

| State Section | Written By | Read By |
|---------------|------------|---------|
| `state.time` | `core/game-loop.js` | All |
| `state.player` | `simulation/business-engine.js` | `ui/`, `simulation/` |
| `state.companies` | `simulation/ai-competitors.js` | `ui/`, `simulation/` |
| `state.market` | `simulation/market-engine.js` | `ui/`, `simulation/` |
| `state.ui` | `ui/` modules only | `ui/` only |

### Data Flow Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        User Input                             │
│         (clicks, slider drags, keyboard shortcuts)            │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                     ui/ Event Handlers                        │
│              (update state.ui, queue actions)                 │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    core/game-loop.js                          │
│                  setInterval at tickSpeed                     │
│                                                               │
│   1. if (paused) return                                       │
│   2. simulation/market-engine.tick(state)                     │
│   3. simulation/ai-competitors.tick(state)                    │
│   4. simulation/business-engine.tick(state)                   │
│   5. if (quarterEnd) simulation/quarterly-events.process()    │
│   6. state.time = advanceTime(state.time)                     │
│   7. ui/render.render(state)                                  │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                      ui/render.js                             │
│              (diff-based selective DOM updates)               │
└──────────────────────────────────────────────────────────────┘
```

### FR Category to File Mapping

**GPU Design (FR1-9):**
- FR1-6 (Spec inputs): `ui/panels/gpu-designer.js`
- FR7-8 (Calculations): `simulation/gpu-calculations.js`
- FR9 (Product naming): `ui/panels/gpu-designer.js`
- Static data: `data/gpu-specs.js`

**Product Launch & Business (FR10-16):**
- FR10-13 (Pricing/marketing): `ui/panels/product-launch.js`
- FR14 (Quarterly launch): `simulation/quarterly-events.js`
- FR15-16 (Sales/revenue): `simulation/business-engine.js`

**Market Simulation (FR17-27):**
- FR17-20 (Market share): `simulation/market-engine.js`
- FR21-27 (Time/geography): `data/market-data.js`, `core/game-loop.js`

**Competitor AI (FR28-34):**
- All: `simulation/ai-competitors.js`
- Starting data: `data/competitor-data.js`

**Feedback & Visualization (FR35-40):**
- FR35 (Market chart): `ui/charts/market-share-chart.js`
- FR36-38 (Competitor view): `ui/panels/competitor-view.js`
- FR39-40 (Financials): `ui/panels/financial-panel.js`

**Game Flow (FR41-46):**
- FR41 (New game): `core/init.js`
- FR42-43 (Save/load): `state/save-load.js`
- FR44-46 (Time control): `core/time-controls.js`, `core/game-loop.js`

### File Size Guidelines

| File Type | Target Lines | Max Lines |
|-----------|-------------|-----------|
| Data files | 50-150 | 300 |
| Utility functions | 50-100 | 200 |
| UI panel renderers | 100-200 | 300 |
| Simulation engines | 150-250 | 300 |
| Chart renderers | 100-200 | 300 |

**If a file exceeds 300 lines:** Split by sub-responsibility
- Example: `ai-competitors.js` → `ai-nvidia.js`, `ai-amd.js`, `ai-intel.js`, `ai-shared.js`

### Development Workflow

**Dev Server:**
```bash
# Terminal 1: Tailwind watch
npx tailwindcss -i ./src/css/input.css -o ./dist/output.css --watch

# Terminal 2: HTTP server
python -m http.server 8080
# or
npx live-server
```

**File Access (Dev Mode):**
- Save files go to `./saves/` directory via File System Access API
- Browser prompts for permission on first save

**Build (Future - Neutralino.js):**
- Deferred to post-MVP
- Will bundle all JS, include Tailwind output, create .exe

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices (vanilla JS, Tailwind CSS, ES6 modules, File System API) work together without conflicts. No external dependencies that could cause version issues.

**Pattern Consistency:**
- Naming conventions (kebab-case files, camelCase code) apply uniformly
- Layer-based structure supports the tick-synchronized rendering model
- Diff-based rendering aligns with immutable state update pattern

**Structure Alignment:**
Project structure directly maps to architectural layers. Clear boundaries between simulation logic and UI rendering.

### Requirements Coverage Validation ✅

**Functional Requirements (46 total):**
All FRs have clear architectural homes. Each FR category maps to specific files in the project structure.

**Non-Functional Requirements (16 total):**
- **Performance (NFR1-5):** Addressed via diff-based rendering, efficient tick processing, no framework overhead
- **Data Accuracy (NFR6-9):** Supported by validation layer and real-world baseline data
- **UI/UX Quality (NFR10-13):** Enabled by Tailwind design system and component architecture
- **Reliability (NFR14-16):** Ensured by game loop error handling and JSON-based save format

### Implementation Readiness Validation ✅

**Decision Completeness:**
- All critical decisions documented
- Technology stack fully specified (vanilla JS, Tailwind, no frameworks)
- Implementation patterns include concrete code examples

**Structure Completeness:**
- Complete file tree with 30+ specific files defined
- All directories and their purposes documented
- FR-to-file mapping explicit

**Pattern Completeness:**
- Naming conventions cover all code elements
- State mutation pattern clearly specified
- Error handling approach defined
- Import rules and layer boundaries documented

### Critical Addition: Daily Data Model with Full Historical Access

**Design Principle:** Store granular, query flexible. Bloomberg Terminal-level data archaeology.

**Products Registry (Never Deleted):**

```javascript
state.products = {
  'nvidia-rtx-3080-2020q4': {
    id: 'nvidia-rtx-3080-2020q4',
    company: 'nvidia',
    name: 'RTX 3080',
    launchDate: { day: 1, month: 10, year: 2020 },
    discontinuedDate: null, // or { day, month, year }
    specs: { cores: 8704, vram: 10, clockSpeed: 1.71, tdp: 320, dieSize: 628, nm: 8 },
    msrp: 699,
    manufacturingCost: 320
  }
  // All products ever created stay here forever (even bankrupt companies)
};
```

**Daily History (Granular Per-Product):**

```javascript
state.history = {
  daily: [
    {
      day: 15, month: 3, year: 2023,
      // Per-company, per-product breakdown
      sales: {
        nvidia: {
          'nvidia-rtx-4080-2022q4': { units: 1200, revenue: 1439880, cost: 480000 },
          'nvidia-rtx-4070-2023q1': { units: 2100, revenue: 1259790, cost: 630000 }
        },
        amd: { ... },
        player: { ... },
        intel: { ... }
      },
      // Company-level daily totals
      companyTotals: {
        nvidia: { units: 3300, revenue: 2699670, costs: 1110000, rdSpend: 150000, marketing: 80000 },
        amd: { units: 800, revenue: 799920, costs: 280000, rdSpend: 60000, marketing: 40000 },
        player: { units: 3500, revenue: 2449300, costs: 875000, rdSpend: 100000, marketing: 50000 },
        intel: { units: 0, revenue: 0, costs: 0, rdSpend: 20000, marketing: 5000 }
      }
    }
  ],
  events: [
    { day: 15, month: 6, year: 2025, type: 'bankruptcy', company: 'intel', message: 'Intel exits GPU market' }
  ]
};
```

**Queryable Data (Any Metric, Any Time Range, Any Company/Product):**

| Query Example | Possible |
|---------------|----------|
| NVIDIA daily sales for RTX 4080, last 180 days | ✅ |
| My manufacturing cost per unit for any product | ✅ |
| Intel's market share in Q2 2024 (even if bankrupt now) | ✅ |
| Bankrupt company's 2023 product lineup and specs | ✅ |
| AMD's net profit trend 2022-2025 | ✅ |
| Compare any GPU vs competitor at any historical point | ✅ |
| TTM revenue for any company | ✅ |
| Daily/Weekly/Monthly/Quarterly/Annual/TTM aggregations | ✅ |

**Market Share Calculation:**
- NOT stored as static value
- Calculated from daily sales: `myUnits / totalUnits` for any time range
- Supports daily, weekly, monthly, quarterly, TTM, all-time views

**New Files for Data Access:**

| File | Purpose |
|------|---------|
| `utils/queries.js` | Flexible historical data queries |
| `data/starting-products.js` | NVIDIA/AMD/Intel 2022 product lineup |
| `ui/panels/data-explorer.js` | UI for browsing any historical data |
| `ui/panels/reports.js` | Formal quarterly/annual report views |

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Medium-High)
- [x] Technical constraints identified (vanilla JS, offline, Windows/Chrome)
- [x] Cross-cutting concerns mapped (state, rendering, simulation, persistence)

**✅ Architectural Decisions**
- [x] Critical decisions documented (save system, state management, rendering)
- [x] Technology stack fully specified (vanilla JS + Tailwind)
- [x] No external dependency versions to track
- [x] Performance considerations addressed (diff-based, hourly ticks)

**✅ Implementation Patterns**
- [x] Naming conventions established (kebab-case files, camelCase code)
- [x] Structure patterns defined (layer-based)
- [x] Communication patterns specified (state mutations, render cycle)
- [x] Process patterns documented (error handling, validation)

**✅ Project Structure**
- [x] Complete directory structure defined (35+ files)
- [x] Component boundaries established (layer import rules)
- [x] Integration points mapped (data flow diagram)
- [x] Requirements to structure mapping complete (FR → file table)

**✅ Data Model**
- [x] Daily granularity for all financial/sales data
- [x] Per-product tracking for complete history
- [x] Products registry (never deleted, even discontinued/bankrupt)
- [x] TTM and flexible time range queries supported
- [x] Market share calculated, not stored

### Architecture Readiness Assessment

**Overall Status:** ✅ READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**Key Strengths:**
1. Maximum LLM compatibility (vanilla JS, no framework churn)
2. Clear layer separation with explicit import rules
3. HOI4-inspired patterns (tick-synchronized, file saves)
4. Comprehensive code examples for all patterns
5. Every FR mapped to specific implementation location
6. Bloomberg-level data access (any metric, any time range, any entity)

**Areas for Future Enhancement:**
1. Neutralino.js packaging (deferred to post-MVP)
2. Performance profiling and optimization (if needed)
3. Extended save features (compression, multiple slots)
4. Data export (CSV, JSON for external analysis)

### Implementation Handoff

**AI Agent Guidelines:**
- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and layer boundaries
- Create new object references when mutating state (spread operator)
- Use named exports only (no `export default`)
- Keep files under 300 lines
- Store all data daily, calculate aggregations on demand
- Never delete products from registry (even discontinued)

**First Implementation Priority:**
1. Initialize project structure (directories, package.json, tailwind.config.js)
2. Create `state/game-state.js` with complete state shape including products and history
3. Build `core/game-loop.js` with hourly tick system
4. Implement `utils/queries.js` for flexible data access
5. Create basic `ui/render.js` to verify architecture works

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2025-12-02
**Document Location:** docs/architecture.md

### Final Architecture Deliverables

**Complete Architecture Document**
- All architectural decisions documented (HOI4-style saves, tick-synchronized rendering, layer-based structure)
- Implementation patterns ensuring AI agent consistency
- Complete project structure with 35+ files defined
- Requirements to architecture mapping for all 46 FRs and 16 NFRs
- Validation confirming coherence and completeness

**Implementation Ready Foundation**
- 12+ major architectural decisions made
- 8 implementation patterns defined
- 6 architectural layers specified
- 62 requirements fully supported
- Bloomberg-level data access architecture

**AI Agent Implementation Guide**
- Technology stack: Vanilla JS + Tailwind CSS (maximum LLM compatibility)
- Consistency rules that prevent implementation conflicts
- Project structure with clear layer boundaries and import rules
- Data flow architecture with tick-synchronized rendering

### Quality Assurance Checklist

**✅ Architecture Coherence**
- [x] All decisions work together without conflicts
- [x] Technology choices are compatible (vanilla JS, Tailwind, ES6 modules)
- [x] Patterns support the architectural decisions
- [x] Structure aligns with all choices

**✅ Requirements Coverage**
- [x] All 46 functional requirements are supported
- [x] All 16 non-functional requirements are addressed
- [x] Cross-cutting concerns are handled (state, rendering, persistence)
- [x] Integration points are defined (data flow diagram)

**✅ Implementation Readiness**
- [x] Decisions are specific and actionable
- [x] Patterns prevent agent conflicts
- [x] Structure is complete and unambiguous
- [x] Code examples provided for all major patterns

**✅ Data Model**
- [x] Daily granularity for all financial/sales data
- [x] Per-product tracking for complete history
- [x] Products registry (never deleted)
- [x] TTM and flexible time range queries supported
- [x] Market share calculated on demand, not stored

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.

**Document Maintenance:** Update this architecture when major technical decisions are made during implementation.
