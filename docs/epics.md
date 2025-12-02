# TechGame - Epic Breakdown

**Author:** Djord
**Date:** 2025-12-02
**Project Level:** Personal Project
**Target Scale:** Single Player Desktop Application

---

## Overview

This document provides the complete epic and story breakdown for TechGame, decomposing the requirements from the [PRD](./prd.md) into implementable stories. Each story incorporates technical context from the [Architecture](./architecture.md) and UX patterns from the [UX Design Specification](./ux-design-specification.md).

**Key Principle:** Every story is sized for a single dev agent to complete in one focused session.

---

## Functional Requirements Inventory

### GPU Design (FR1-9)
| FR | Description |
|----|-------------|
| FR1 | Player can design a GPU by specifying core count |
| FR2 | Player can design a GPU by specifying VRAM amount |
| FR3 | Player can design a GPU by specifying clock speed |
| FR4 | Player can design a GPU by specifying TDP (power draw) |
| FR5 | Player can design a GPU by specifying die size |
| FR6 | Player can design a GPU by specifying nanometer process |
| FR7 | Player can view calculated performance metrics based on GPU specs |
| FR8 | Player can view manufacturing cost based on GPU specs |
| FR9 | Player can name their GPU product |

### Product Launch & Business (FR10-16)
| FR | Description |
|----|-------------|
| FR10 | Player can set retail price for a GPU |
| FR11 | Player can allocate manufacturing volume |
| FR12 | Player can allocate marketing budget |
| FR13 | Player can target marketing toward specific consumer segments |
| FR14 | Player can launch a product to market (quarterly) |
| FR15 | Player can view unit sales over time |
| FR16 | Player can view revenue, costs, and profit |

### Market Simulation (FR17-27)
| FR | Description |
|----|-------------|
| FR17 | System calculates market share based on price/performance of all products |
| FR18 | System simulates consumer purchasing behavior across segments |
| FR19 | System shifts consumer preferences over time |
| FR20 | System calculates realistic market size and TAM |
| FR21 | Game starts in 2022 (Intel Arc launch year) |
| FR22 | System simulates USA market only (MVP) |
| FR23 | USA demand derived from population and gaming adoption rate |
| FR24 | Population grows annually based on real growth rates |
| FR25 | Total GPU demand grows annually (tech adoption trends) |
| FR26 | All product launches occur on quarterly boundaries |
| FR27 | Market simulation ticks quarterly |

### Competitor AI (FR28-34)
| FR | Description |
|----|-------------|
| FR28 | System simulates NVIDIA with realistic product portfolio and financials |
| FR29 | System simulates AMD with realistic product portfolio and financials |
| FR30 | System simulates Intel Arc with realistic product portfolio and financials |
| FR31 | Competitor product launches roughly match real history (within same quarter) |
| FR32 | Competitors launch new products over time |
| FR33 | Competitors react to player market share gains |
| FR34 | Competitors may strategically deprioritize market segments |

### Feedback & Visualization (FR35-40)
| FR | Description |
|----|-------------|
| FR35 | Player can view market share chart over time |
| FR36 | Player can view competitor products and their specs |
| FR37 | Player can view news headlines reflecting market events |
| FR38 | Player can view competitor financials (revenue, R&D spend) |
| FR39 | Player can view own company financial dashboard |
| FR40 | Player can view USA market demand and trends |

### Game Flow (FR41-46)
| FR | Description |
|----|-------------|
| FR41 | Player can start a new game |
| FR42 | Player can save game state |
| FR43 | Player can load saved game state |
| FR44 | Player can advance time (quarterly tick) |
| FR45 | Player can adjust simulation speed |
| FR46 | Player can pause simulation |

---

## FR Coverage Map

*Coverage mapping will be completed as stories are created.*

---

## Epic Structure Plan

### Design Philosophy

Each epic delivers **user value**—something the player can actually experience and enjoy. Epics follow the core game loop:

> **Observe** → **Design** → **Launch** → **Watch** → **React**

### Epic Overview

| Epic | Title | User Value | FRs Covered |
|------|-------|------------|-------------|
| 1 | Foundation & Core Systems | Technical foundation enabling all gameplay | FR21, FR27 (partial) |
| 2 | The Living Market | Watch NVIDIA/AMD/Intel compete in a real-time market | FR35, FR44-46, FR28-30 (partial) |
| 3 | GPU Design & Product Launch | Design GPUs with real specs and launch them | FR1-14 |
| 4 | Market Dynamics & Competition | Your products compete and affect market share | FR17-20, FR22-27 |
| 5 | Intelligent Competitors | AI rivals react, adapt, and fight back | FR28-34, FR36, FR38 |
| 6 | Business Intelligence & Polish | Full financial systems, news, save/load | FR15-16, FR37, FR39-43 |

---

## Epic Technical Context

### Epic 1: Foundation & Core Systems

**User Value Statement:** None directly visible—this epic creates the technical foundation that enables all subsequent user experiences.

**PRD Coverage:** FR21 (2022 start), FR27 (quarterly ticks - infrastructure)

**Architecture Context:**
- Project structure from Architecture section 5 (complete directory tree)
- State management pattern (tick-synchronized, diff-based rendering)
- Game loop from `core/game-loop.js`
- ES6 modules, named exports only
- Tailwind CSS setup with design tokens from UX spec

**Dependencies:** None (first epic)

---

### Epic 2: The Living Market

**User Value Statement:** Player can watch a living market where NVIDIA, AMD, and Intel hold market share, with time controls to speed up, slow down, and pause the simulation.

**PRD Coverage:** FR35 (market share chart), FR44-46 (time controls), FR28-30 (competitor existence - partial)

**Architecture Context:**
- The Crushing Chart as custom SVG (`ui/charts/market-share-chart.js`)
- Time controls in `core/time-controls.js`
- Competitor data in `data/competitor-data.js`
- Diff-based rendering for real-time chart updates

**UX Integration:**
- Dark professional theme with competitor brand colors (NVIDIA green, AMD red, Intel blue)
- Smooth line interpolation on charts
- Time Control Bar always visible in top bar
- "Bloomberg meets Apple" aesthetic

**Dependencies:** Epic 1 complete

---

### Epic 3: GPU Design & Product Launch

**User Value Statement:** Player can design GPUs with meaningful spec choices (cores, VRAM, clock, TDP, die size, nm process), see real-time cost/performance feedback, and launch products to market.

**PRD Coverage:** FR1-14 (all GPU design and product launch requirements)

**Architecture Context:**
- GPU Designer panel (`ui/panels/gpu-designer.js`)
- Product launch panel (`ui/panels/product-launch.js`)
- GPU calculations (`simulation/gpu-calculations.js`)
- Quarterly events for launches (`simulation/quarterly-events.js`)
- Products registry in state (never deleted)

**UX Integration:**
- Slider inputs with real-time value display
- Constraint zones highlighted
- Cost/performance preview updates instantly
- Primary action button for launch

**Dependencies:** Epic 2 complete (need market to launch into)

---

### Epic 4: Market Dynamics & Competition

**User Value Statement:** Player's products actually compete in the market—market share shifts based on price/performance, consumers make purchasing decisions, and the player can see their impact.

**PRD Coverage:** FR17-20 (market share calculation, consumer behavior), FR22-27 (USA market, demand, time system)

**Architecture Context:**
- Market engine (`simulation/market-engine.js`)
- Business engine (`simulation/business-engine.js`)
- Daily history storage for queryable data
- Market share calculated from sales, not stored statically

**UX Integration:**
- Crushing Chart animates as market share shifts
- Numbers count up/down smoothly
- Real-time updates—no refresh needed

**Dependencies:** Epic 3 complete (need products to compete)

---

### Epic 5: Intelligent Competitors

**User Value Statement:** AI competitors (NVIDIA, AMD, Intel) make strategic decisions—launching new products, adjusting prices, pivoting R&D—and visibly react when the player takes their market share.

**PRD Coverage:** FR28-34 (full competitor AI), FR36 (view competitor products), FR38 (competitor financials)

**Architecture Context:**
- AI competitors module (`simulation/ai-competitors.js`)
- Competitor decision logic with transparent reasoning
- Historical product launches matching real timeline
- Strategic reactions to player success

**UX Integration:**
- Competitor Cards showing status, trend, R&D focus
- Alert states when competitors make moves
- Visible AI decision-making (HOI4-style transparency)

**Dependencies:** Epic 4 complete (need market dynamics for AI to respond to)

---

### Epic 6: Business Intelligence & Polish

**User Value Statement:** Complete business simulation with full financial dashboards, news system reflecting market events, and save/load functionality for persistent gameplay.

**PRD Coverage:** FR15-16 (sales/revenue tracking), FR37 (news headlines), FR39-40 (player financials, market trends), FR41-43 (new game, save/load)

**Architecture Context:**
- Financial panel (`ui/panels/financial-panel.js`)
- News ticker (`ui/panels/news-ticker.js`)
- Save/load system (`state/save-load.js`) using File System API
- `.techgame` file format (JSON, human-readable)

**UX Integration:**
- News ticker with scrolling headlines
- Financial Panel with P/L breakdown
- Save/load via main menu
- Celebration moments for major events

**Dependencies:** Epic 5 complete (need full simulation for meaningful financials/news)

---

## Epic 1: Foundation & Core Systems

**Goal:** Establish the technical foundation that enables all gameplay—project structure, state management, game loop, and basic UI shell.

**User Value:** None directly visible. This epic creates the architecture that makes everything else possible.

**FR Coverage:** FR21 (2022 start date), FR27 (quarterly tick infrastructure)

---

### Story 1.1: Project Initialization

As a developer,
I want the project structure set up with all directories and configuration files,
So that I can start building game modules immediately.

**Acceptance Criteria:**

**Given** I have cloned/created the TechGame directory
**When** I run `npm install` and `npx tailwindcss -i ./src/css/input.css -o ./dist/output.css`
**Then** the project compiles without errors

**And** the following directory structure exists:
```
TechGame/
├── index.html
├── package.json
├── tailwind.config.js
├── src/
│   ├── css/input.css
│   └── js/
│       ├── main.js
│       ├── core/
│       ├── state/
│       ├── simulation/
│       ├── ui/
│       ├── data/
│       └── utils/
└── dist/
```

**And** `tailwind.config.js` includes all design tokens from UX spec:
- Colors: surface-base (#0a0a0a), surface-elevated (#141414), accent (#3b82f6)
- Competitor colors: nvidia (#76b900), amd (#ed1c24), intel (#0071c5)
- Font families: system-ui stack, monospace stack

**And** `index.html` loads `dist/output.css` and `src/js/main.js` (type="module")

**Technical Notes:**
- Use ES6 modules (native browser, no bundler)
- Named exports only (Architecture pattern)
- All files use kebab-case naming
- package.json only needs tailwindcss as devDependency

**Prerequisites:** None

---

### Story 1.2: Core State Structure

As a developer,
I want the central game state object defined with all required sections,
So that all modules can read/write game data consistently.

**Acceptance Criteria:**

**Given** the project is initialized
**When** I import from `state/game-state.js`
**Then** I can access `createInitialState()` function

**And** the returned state object has this structure:
```javascript
{
  time: { currentHour, currentDay, currentMonth, currentQuarter, currentYear, tickSpeed, paused },
  player: { name, cash, products: [], rdProjects: [], marketingBudget },
  companies: { nvidia: {...}, amd: {...}, intel: {...} },
  market: { totalDemand, segments: {...} },
  products: {},  // Registry of all products ever created
  history: { daily: [], events: [] },
  ui: { currentView, selectedProduct, gpuDesigner: {...} }
}
```

**And** `time.currentYear` defaults to 2022 (FR21)
**And** `time.currentQuarter` defaults to 1
**And** all state keys use camelCase (Architecture pattern)

**Technical Notes:**
- File: `src/js/state/game-state.js`
- State must be fully JSON-serializable (no classes, no circular refs)
- Domain-grouped nested objects (Architecture section: State Structure Pattern)
- Export `createInitialState()` as named export

**Prerequisites:** Story 1.1

---

### Story 1.3: Game Loop Implementation

As a developer,
I want a game loop that ticks at configurable speeds and triggers state updates,
So that the simulation can run in real-time.

**Acceptance Criteria:**

**Given** the game state exists
**When** the game loop starts
**Then** `tick()` is called at the configured `tickSpeed` (1, 2, or 4 ticks per second)

**And** each tick:
1. Checks if `state.time.paused` — if true, skips processing
2. Advances `state.time.currentHour` by 1
3. Rolls over hours → days → months → quarters → years correctly
4. Calls `render(state)` after tick completes

**And** the loop uses `setInterval` with calculated interval (1000ms / tickSpeed)

**And** errors during tick are caught, logged with `[GAME ERROR]` prefix, and pause the game

**Technical Notes:**
- File: `src/js/core/game-loop.js`
- Export: `startGameLoop(state)`, `stopGameLoop()`
- 1 tick = 1 in-game hour (Architecture: Time System)
- At 1 tick/sec: 24-hour day passes in 24 real seconds
- Quarter = ~2,160 hours (90 days × 24 hours)
- Error handling at loop boundary only (Architecture pattern)

**Prerequisites:** Story 1.2

---

### Story 1.4: Time Controls

As a player,
I want to pause, play, and adjust simulation speed,
So that I can control the pace of the game.

**Acceptance Criteria:**

**Given** the game is running
**When** I call `pauseGame(state)`
**Then** `state.time.paused` becomes `true` and ticks stop processing

**When** I call `playGame(state)`
**Then** `state.time.paused` becomes `false` and ticks resume

**When** I call `setSpeed(state, speed)` with speed 1, 2, or 4
**Then** `state.time.tickSpeed` updates and the game loop adjusts interval

**When** I call `skipToNextQuarter(state)`
**Then** time advances to hour 0 of the next quarter instantly

**Technical Notes:**
- File: `src/js/core/time-controls.js`
- Exports: `pauseGame`, `playGame`, `setSpeed`, `skipToNextQuarter`
- Speed changes must restart the interval with new timing
- State mutations create new object references (spread operator)

**Prerequisites:** Story 1.3

---

### Story 1.5: Basic UI Shell & Layout

As a player,
I want to see the main application layout with navigation sidebar and content area,
So that I can navigate between different views.

**Acceptance Criteria:**

**Given** I open `index.html` in Chrome
**When** the page loads
**Then** I see a dark-themed layout matching UX spec:
- Left sidebar with navigation items (placeholder icons/labels)
- Top bar with date display and time controls area
- Main content area (empty for now)
- Bottom area for future news ticker

**And** the background uses `surface-base` (#0a0a0a)
**And** the sidebar uses `surface-elevated` (#141414)
**And** text uses the system UI font stack
**And** the layout is responsive from 1080p to 4K

**Technical Notes:**
- File: `index.html` for structure, `src/js/ui/render.js` for dynamic content
- Use Tailwind classes exclusively (no custom CSS unless necessary)
- Layout uses CSS Grid or Flexbox
- Navigation items are placeholders—actual navigation comes in Epic 2

**Prerequisites:** Story 1.1

---

### Story 1.6: Render Coordinator with Diff-Based Updates

As a developer,
I want a render system that efficiently updates only changed UI sections,
So that the game maintains 60fps during simulation.

**Acceptance Criteria:**

**Given** the UI shell exists
**When** `render(state)` is called
**Then** it compares current state to previous state by reference
**And** only re-renders sections whose state objects changed:
- `state.time` changed → re-render time display
- `state.market` changed → re-render market charts
- `state.player` changed → re-render player panel
- `state.ui` changed → re-render active view

**And** the render function stores `prevState` for comparison
**And** initial render (no prevState) renders everything

**Technical Notes:**
- File: `src/js/ui/render.js`
- Export: `render(state)`
- Reference comparison only (Architecture: UI Rendering Pattern)
- Simulation code MUST create new object refs when mutating state
- Example: `state.time = { ...state.time, currentHour: newHour }`

**Prerequisites:** Story 1.5

---

### Story 1.7: Utility Functions

As a developer,
I want common utility functions for formatting and math operations,
So that I can use consistent helpers across all modules.

**Acceptance Criteria:**

**Given** I import from utils modules
**When** I call formatting functions
**Then** they return correctly formatted strings:

- `formatCurrency(1234567)` → `"$1.23M"`
- `formatCurrency(1234567890)` → `"$1.23B"`
- `formatPercent(0.1234)` → `"+12.34%"` (with sign)
- `formatPercent(-0.05)` → `"-5.00%"`
- `formatDate(state.time)` → `"Q1 2022"`

**And** math helpers work correctly:
- `clamp(value, min, max)` → value bounded to range
- `lerp(a, b, t)` → linear interpolation
- `randomInRange(min, max)` → random number in range

**Technical Notes:**
- Files: `src/js/utils/formatters.js`, `src/js/utils/math.js`
- Named exports only
- Pure functions with no side effects
- Use `Intl.NumberFormat` for locale-aware formatting

**Prerequisites:** Story 1.1

---

### Story 1.8: Starting Data Constants

As a developer,
I want game balance constants and starting data defined,
So that simulation calculations have consistent baseline values.

**Acceptance Criteria:**

**Given** I import from data modules
**When** I access constants
**Then** I have access to:

**Game Balance (`data/constants.js`):**
- `STARTING_CASH`: Player starting capital
- `HOURS_PER_DAY`: 24
- `DAYS_PER_QUARTER`: 90
- `TICK_SPEEDS`: [1, 2, 4]

**Market Data (`data/market-data.js`):**
- USA population 2022
- Base GPU demand (units per year)
- Segment definitions: budget, midrange, highend

**Competitor Data (`data/competitor-data.js`):**
- NVIDIA, AMD, Intel starting financials (cash, revenue scale)
- Placeholder product portfolios (detailed in Epic 2)

**Technical Notes:**
- Files in `src/js/data/` directory
- Use SCREAMING_SNAKE_CASE for constants
- Named exports only
- Values should be ballpark realistic (NFR6-7)

**Prerequisites:** Story 1.1

---

### Epic 1 Summary

**Stories Created:** 8
**FR Coverage:** FR21 (2022 start), FR27 (tick infrastructure)
**Architecture Sections Used:** State Structure Pattern, UI Rendering Pattern, Module Organization, Naming Conventions
**UX Patterns Incorporated:** Color system, typography, layout architecture

**After Epic 1:** The technical foundation is complete. The game loop runs, state updates, and the UI shell renders. No visible gameplay yet, but all infrastructure is ready for Epic 2.

---

## Epic 2: The Living Market

**Goal:** Deliver the first playable experience—a living market visualization where the player can watch NVIDIA, AMD, and Intel compete, with full time controls.

**User Value:** Player can observe a real-time market simulation with the Crushing Chart, control time (pause/play/speed), and see competitor market positions.

**FR Coverage:** FR35 (market share chart), FR44-46 (time controls), FR28-30 (competitor existence - partial)

---

### Story 2.1: Time Control UI Bar

As a player,
I want to see the current game date and control simulation speed from the top bar,
So that I can manage the pace of the game.

**Acceptance Criteria:**

**Given** the game is running
**When** I look at the top bar
**Then** I see:
- Current date displayed as "Q1 2022" format
- Play/Pause button (toggles state)
- Speed indicator showing current speed (1x, 2x, 4x)
- Speed adjustment buttons or selector

**When** I click the Pause button
**Then** the simulation pauses immediately
**And** the button changes to Play icon
**And** the date display shows a "PAUSED" indicator

**When** I click a speed button (1x, 2x, 4x)
**Then** the simulation speed changes immediately
**And** the speed indicator updates to show new speed

**And** keyboard shortcuts work:
- `Space` toggles pause/play
- `1`, `2`, `4` set speed directly

**Technical Notes:**
- File: `src/js/ui/components/time-bar.js`
- Integrates with `core/time-controls.js` functions
- Uses diff-based rendering (only update on state.time change)
- UX spec: Time Control Bar always visible, 150ms transitions

**Prerequisites:** Story 1.4, Story 1.5

---

### Story 2.2: Competitor Starting Products

As a developer,
I want NVIDIA, AMD, and Intel to have realistic 2022 product portfolios,
So that the market simulation has accurate starting data.

**Acceptance Criteria:**

**Given** a new game starts in Q1 2022
**When** the state initializes
**Then** each competitor has products in the `state.products` registry:

**NVIDIA (example products):**
- RTX 3090: 10496 cores, 24GB VRAM, 1.70GHz, 350W TDP, 628mm², 8nm, $1499
- RTX 3080: 8704 cores, 10GB VRAM, 1.71GHz, 320W TDP, 628mm², 8nm, $699
- RTX 3070: 5888 cores, 8GB VRAM, 1.73GHz, 220W TDP, 392mm², 8nm, $499
- RTX 3060: 3584 cores, 12GB VRAM, 1.78GHz, 170W TDP, 276mm², 8nm, $329

**AMD (example products):**
- RX 6900 XT: 5120 cores, 16GB VRAM, 2.25GHz, 300W TDP, 519mm², 7nm, $999
- RX 6800 XT: 4608 cores, 16GB VRAM, 2.25GHz, 300W TDP, 519mm², 7nm, $649
- RX 6700 XT: 2560 cores, 12GB VRAM, 2.58GHz, 230W TDP, 336mm², 7nm, $479

**Intel Arc (launching Q1 2022):**
- Arc A770: 4096 cores, 16GB VRAM, 2.10GHz, 225W TDP, ~400mm², 6nm, $349
- Arc A750: 3584 cores, 8GB VRAM, 2.05GHz, 225W TDP, ~400mm², 6nm, $289

**And** each product has:
- Unique ID: `{company}-{name}-{launchQuarter}`
- Launch date, company, specs, MSRP, manufacturing cost

**Technical Notes:**
- File: `src/js/data/starting-products.js`
- Products added to `state.products` registry on game init
- Specs should be ballpark accurate (NFR6) - exact numbers less important than realistic relationships
- Use real 2022 pricing and relative performance tiers

**Prerequisites:** Story 1.2, Story 1.8

---

### Story 2.3: Market Share State Initialization

As a developer,
I want market share calculated from products and stored in history,
So that the Crushing Chart has data to display.

**Acceptance Criteria:**

**Given** a new game starts with competitor products
**When** the initial state is created
**Then** `state.market` contains:
- `totalDemand`: Annual GPU demand for USA market (~50M units)
- `segments`: Budget (<$300), Midrange ($300-600), High-end (>$600)

**And** `state.history.daily` is initialized with Day 1 data:
- Per-company sales (simulated starting distribution)
- NVIDIA: ~80% share, AMD: ~18%, Intel: ~2%, Player: 0%

**And** market share is CALCULATED from daily sales, not stored directly

**Technical Notes:**
- File: `src/js/data/market-data.js` for constants
- File: `src/js/state/game-state.js` updated for history initialization
- Market share = company units / total units (calculated on demand)
- Starting shares based on real 2022 GPU market

**Prerequisites:** Story 2.2

---

### Story 2.4: The Crushing Chart - SVG Line Chart

As a player,
I want to see a beautiful market share chart showing all competitors over time,
So that I can visualize market dominance and track my progress.

**Acceptance Criteria:**

**Given** the dashboard view is active
**When** I see the Crushing Chart
**Then** it displays:
- Line chart with market share % (0-100%) on Y-axis
- Time on X-axis (quarters/years)
- One line per company (NVIDIA green, AMD red, Intel blue, Player accent blue)
- Current values shown on each line's end point
- Legend with company names and current share %

**And** the chart uses competitor brand colors from UX spec:
- NVIDIA: #76b900
- AMD: #ed1c24
- Intel: #0071c5
- Player: #3b82f6

**And** the chart renders as SVG (no external library)
**And** lines are smooth (bezier curves or line interpolation)
**And** the chart has subtle grid lines on Y-axis (20%, 40%, 60%, 80%)

**Technical Notes:**
- File: `src/js/ui/charts/market-share-chart.js`
- Export: `renderMarketShareChart(container, historyData, companies)`
- Pure SVG generation using `src/js/utils/svg.js` helpers
- Chart dimensions responsive to container
- UX spec: "The Crushing Chart" is THE hero component

**Prerequisites:** Story 2.3, Story 1.6

---

### Story 2.5: Chart Real-Time Updates

As a player,
I want the Crushing Chart to animate smoothly as time passes,
So that I can watch market share shift in real-time.

**Acceptance Criteria:**

**Given** the Crushing Chart is visible and simulation is running
**When** a new day/quarter of data is recorded
**Then** the chart updates automatically without page refresh
**And** new data points are added smoothly (line extends)
**And** Y-axis values animate if scale changes

**When** I hover over a point on any line
**Then** a tooltip appears showing:
- Date (Q1 2022)
- Company name
- Exact market share %
- Change from previous quarter (+/- %)

**And** updates happen within the same tick cycle (no perceptible delay)
**And** chart maintains 60fps during updates

**Technical Notes:**
- Chart re-renders when `state.history` reference changes
- Use CSS transitions for smooth line updates where possible
- Tooltip: 300ms delay before show (UX spec)
- SVG path updates should be optimized (update `d` attribute, not recreate)

**Prerequisites:** Story 2.4

---

### Story 2.6: Dashboard View with Chart Focus

As a player,
I want a dashboard view that prominently displays the Crushing Chart and key metrics,
So that I can observe the market at a glance.

**Acceptance Criteria:**

**Given** the game is running
**When** I'm on the Dashboard view (default view)
**Then** I see:
- Crushing Chart taking 60%+ of main content area (hero position)
- Company summary cards below or beside the chart
- Each card shows: Company name, market share %, trend arrow (+/- vs last quarter)

**And** the layout follows UX spec:
- Left sidebar with navigation (Dashboard highlighted as active)
- Top bar with time controls
- Main content area with chart + summary cards

**When** I click a company card
**Then** that company's line is highlighted on the chart
**And** other lines fade slightly (but remain visible)

**Technical Notes:**
- File: `src/js/ui/panels/dashboard.js`
- Dashboard is `state.ui.currentView === 'dashboard'`
- Company cards use `surface-elevated` background
- Trend arrows: green up, red down, based on quarter-over-quarter change

**Prerequisites:** Story 2.4, Story 2.5

---

### Story 2.7: Navigation Sidebar

As a player,
I want to navigate between different views using the sidebar,
So that I can access different parts of the game.

**Acceptance Criteria:**

**Given** I'm in the game
**When** I look at the left sidebar
**Then** I see navigation items:
- Dashboard (chart icon) — active by default
- Market (graph icon) — placeholder for now
- Company (building icon) — placeholder for now
- Design (chip icon) — placeholder for now
- Intel (eye icon) — placeholder for now

**When** I click Dashboard
**Then** the main content shows the dashboard view
**And** Dashboard nav item shows active state (left border accent, elevated background)

**When** I click a placeholder item
**Then** the main content shows "Coming Soon" placeholder
**And** that nav item shows active state

**And** navigation is instant (no loading, 150ms fade transition)
**And** `state.ui.currentView` updates on navigation

**Technical Notes:**
- File: `src/js/ui/components/sidebar.js`
- Active state: `bg-surface-elevated border-l-2 border-accent`
- Hover state: `bg-surface-elevated/50`
- Icons can be simple SVG or Unicode symbols for now

**Prerequisites:** Story 1.5, Story 1.6

---

### Story 2.8: Basic Simulation Tick Processing

As a developer,
I want the simulation to process each tick and record daily data,
So that the market has activity to visualize.

**Acceptance Criteria:**

**Given** the game is running (not paused)
**When** each hourly tick occurs
**Then** the simulation:
1. Advances time (hour → day → month → quarter → year)
2. Records daily sales data to `state.history.daily` (once per day)
3. Triggers quarterly rollup processing at quarter boundaries

**And** daily sales recording includes:
- Simulated unit sales per company per product (simplified for now)
- Company totals for the day

**And** state mutations create new object references:
- `state.time = { ...state.time, currentHour: newHour }`
- `state.history = { ...state.history, daily: [...state.history.daily, newDay] }`

**Technical Notes:**
- File: `src/js/simulation/market-engine.js` (basic version)
- For Epic 2: Use simplified sales distribution based on starting market share
- Full market dynamics (price/performance competition) comes in Epic 4
- This story enables the chart to have SOMETHING to show as time passes

**Prerequisites:** Story 1.3, Story 2.3

---

### Epic 2 Summary

**Stories Created:** 8
**FR Coverage:** FR35 (market share chart), FR44-46 (time controls), FR28-30 (competitor presence)
**Architecture Sections Used:** SVG charts, diff-based rendering, state mutation patterns
**UX Patterns Incorporated:** Crushing Chart specs, time control bar, navigation sidebar, company colors, dark theme

**After Epic 2:** Player opens the game and sees a LIVING MARKET. NVIDIA dominates at 80%, AMD holds 18%, Intel scrapes by at 2%. Time ticks forward. The Crushing Chart shows their lines. The player can pause, speed up, and watch the market exist. Now they want to PARTICIPATE.

---

## Epic 3: GPU Design & Product Launch

**Goal:** Enable the player to design GPUs with meaningful spec choices and launch them into the market.

**User Value:** Player can design GPUs with real specifications (cores, VRAM, clock, TDP, die size, nm process), see real-time cost/performance feedback, set pricing and marketing, and launch products quarterly.

**FR Coverage:** FR1-14 (all GPU design and product launch requirements)

---

### Story 3.1: GPU Spec Constraints & Ranges

As a developer,
I want valid ranges and constraints defined for all GPU specifications,
So that the GPU designer enforces realistic boundaries.

**Acceptance Criteria:**

**Given** I import from `data/gpu-specs.js`
**When** I access spec constraints
**Then** I have realistic ranges for each spec:

| Spec | Min | Max | Step | Unit |
|------|-----|-----|------|------|
| Cores | 1024 | 16384 | 256 | cores |
| VRAM | 4 | 48 | 2 | GB |
| Clock Speed | 1.0 | 3.0 | 0.05 | GHz |
| TDP | 75 | 450 | 5 | W |
| Die Size | 150 | 800 | 10 | mm² |
| Process (nm) | 3 | 14 | - | nm |

**And** process nodes are discrete options: [3, 4, 5, 6, 7, 8, 10, 12, 14]
**And** each process node has an associated cost multiplier (smaller = more expensive)
**And** constraints include interdependencies:
- More cores require larger die size
- Higher clock speeds increase TDP
- Smaller nm process increases manufacturing cost

**Technical Notes:**
- File: `src/js/data/gpu-specs.js`
- Export: `GPU_SPEC_RANGES`, `PROCESS_NODES`, `PROCESS_COST_MULTIPLIERS`
- Values should produce realistic cost/performance relationships
- These constraints feed into validation and calculations

**Prerequisites:** Story 1.8

---

### Story 3.2: GPU Performance Calculation

As a player,
I want to see calculated performance metrics for my GPU design,
So that I can understand how competitive my product will be.

**Acceptance Criteria:**

**Given** I have specified GPU specs
**When** I view the GPU designer
**Then** I see calculated performance metrics:

- **Raw TFLOPS**: Based on cores × clock speed × ops per cycle
- **Gaming Performance Score**: Weighted combination of TFLOPS, VRAM, memory bandwidth
- **Power Efficiency**: Performance per watt (score / TDP)
- **Relative Ranking**: How this compares to current market products (percentile)

**And** the calculation formula is transparent and consistent:
```
tflops = (cores * clockSpeed * 2) / 1000  // FP32 TFLOPS approximation
gamingScore = (tflops * 0.6) + (vram * 0.25) + (memoryBandwidth * 0.15)
efficiency = gamingScore / tdp
```

**And** performance updates in real-time as I adjust sliders

**Technical Notes:**
- File: `src/js/simulation/gpu-calculations.js`
- Export: `calculatePerformance(specs)`, `calculateEfficiency(specs)`
- Formula should produce scores that match real-world GPU relative rankings
- NFR8: Specs and performance relationships must be logically consistent

**Prerequisites:** Story 3.1

---

### Story 3.3: GPU Manufacturing Cost Calculation

As a player,
I want to see the manufacturing cost for my GPU design,
So that I can price my product profitably.

**Acceptance Criteria:**

**Given** I have specified GPU specs
**When** I view the GPU designer
**Then** I see manufacturing cost breakdown:

- **Die Cost**: Based on die size × process node cost multiplier
- **VRAM Cost**: Based on VRAM amount × memory price per GB
- **Packaging & Assembly**: Fixed base + per-component costs
- **Total Manufacturing Cost**: Sum of all components

**And** cost updates in real-time as I adjust specs

**And** smaller process nodes (3nm, 4nm) are significantly more expensive than larger (8nm, 14nm)

**And** the cost formula produces realistic margins:
- Budget GPUs: ~30-40% margin at typical pricing
- High-end GPUs: ~40-50% margin at typical pricing

**Technical Notes:**
- File: `src/js/simulation/gpu-calculations.js`
- Export: `calculateManufacturingCost(specs)`
- Costs should be ballpark realistic for 2022 (NFR6)
- Example: RTX 3080 manufacturing ~$320, sold at $699 = ~54% margin

**Prerequisites:** Story 3.1

---

### Story 3.4: GPU Designer Panel UI

As a player,
I want an intuitive GPU design interface with sliders for each specification,
So that I can craft competitive products.

**Acceptance Criteria:**

**Given** I navigate to the GPU Designer view
**When** the designer panel loads
**Then** I see sliders for each specification:
- Core Count (with current value displayed)
- VRAM (GB)
- Clock Speed (GHz)
- TDP (W)
- Die Size (mm²)
- Process Node (nm) — dropdown or discrete selector

**And** each slider shows:
- Current value prominently
- Min/max range labels
- Filled track indicating position
- Constraint zones highlighted in red/warning color if approaching limits

**When** I drag any slider
**Then** the value updates immediately (no submit button)
**And** cost and performance previews update in real-time
**And** the slider feels smooth (no lag or jank)

**Technical Notes:**
- File: `src/js/ui/panels/gpu-designer.js`
- Slider component: `src/js/ui/components/sliders.js`
- Use `<input type="range">` styled with Tailwind
- Real-time updates via `oninput` event (not `onchange`)
- UX spec: Smooth drag response, constraint zones visible

**Prerequisites:** Story 3.2, Story 3.3, Story 2.7

---

### Story 3.5: GPU Designer Cost & Performance Preview

As a player,
I want to see real-time cost and performance feedback while designing,
So that I can make informed spec trade-off decisions.

**Acceptance Criteria:**

**Given** I'm in the GPU Designer
**When** I adjust any specification
**Then** I see a live preview panel showing:

**Cost Section:**
- Manufacturing Cost: $XXX (breakdown available on hover)
- Suggested Retail Range: $XXX - $XXX (based on typical margins)

**Performance Section:**
- Gaming Score: XXX (with bar visualization)
- TFLOPS: XX.X
- Efficiency: XX.X perf/W

**Comparison Section:**
- "Comparable to: [closest competitor product]"
- Percentile ranking: "Top XX% of current market"

**And** values animate smoothly when they change (count up/down)
**And** color coding indicates competitiveness:
- Green: Above market average
- Yellow: Market average
- Red: Below market average

**Technical Notes:**
- Part of `src/js/ui/panels/gpu-designer.js`
- Use `formatCurrency()` and number animation utilities
- Comparison pulls from `state.products` registry
- Update on every slider change (debounce if needed for performance)

**Prerequisites:** Story 3.4

---

### Story 3.6: GPU Naming & Product Creation

As a player,
I want to name my GPU and save it as a product design,
So that I can prepare it for launch.

**Acceptance Criteria:**

**Given** I have configured GPU specs in the designer
**When** I enter a product name (e.g., "Phoenix GTX 1000")
**Then** the name input validates:
- 3-50 characters
- No duplicate names in my portfolio
- Real-time validation feedback

**When** I click "Save Design" or "Prepare for Launch"
**Then** the GPU is saved to `state.player.products` as a pending design
**And** I see confirmation: "Phoenix GTX 1000 saved to your portfolio"
**And** the designer resets or allows me to continue editing

**And** the saved product includes:
- All specifications
- Calculated performance metrics
- Calculated manufacturing cost
- Creation date
- Status: "designed" (not yet launched)

**Technical Notes:**
- File: `src/js/ui/panels/gpu-designer.js`
- Product saved to `state.player.products[]`
- Product ID format: `player-{name-slug}-{quarter}`
- Status flow: designed → queued → launched → active → discontinued

**Prerequisites:** Story 3.5

---

### Story 3.7: Product Launch Panel

As a player,
I want to configure pricing and marketing before launching a product,
So that I can position my GPU competitively.

**Acceptance Criteria:**

**Given** I have a designed (not yet launched) product
**When** I open the Product Launch panel
**Then** I see:

**Product Summary:**
- GPU name and key specs
- Manufacturing cost
- Performance score

**Pricing Section:**
- Retail price input (number field)
- Margin calculation: (price - cost) / price = XX%
- Margin color: Green (>40%), Yellow (20-40%), Red (<20%)

**Marketing Section:**
- Marketing budget slider ($0 - $XX million)
- Target segment selector: Budget / Midrange / High-end
- Segment description: "Budget: Price-conscious gamers, <$300 products"

**Launch Queue:**
- "Launch in: Q2 2022" (next quarter)
- Explanation: "Products launch at the start of each quarter"

**When** I click "Queue for Launch"
**Then** the product is queued for next quarter launch
**And** status changes to "queued"
**And** I see confirmation with launch date

**Technical Notes:**
- File: `src/js/ui/panels/product-launch.js`
- FR10: Set retail price
- FR11: Manufacturing volume (simplified: demand-based for MVP)
- FR12: Marketing budget allocation
- FR13: Target segment selection
- FR14: Quarterly launch queue

**Prerequisites:** Story 3.6

---

### Story 3.8: Quarterly Product Launch Processing

As a developer,
I want products to launch at quarter boundaries,
So that the market receives new products on a predictable schedule.

**Acceptance Criteria:**

**Given** products are queued for launch
**When** the simulation reaches a new quarter (Q1→Q2, Q2→Q3, etc.)
**Then** the quarterly events processor:

1. Finds all products with status "queued" and launch quarter matching current
2. Changes each product status to "active"
3. Adds product to `state.products` registry with launch date
4. Creates a news event: "[Company] launches [Product Name]"
5. Product becomes available for market competition

**And** the player's queued products launch alongside any competitor launches
**And** launch events appear in the news ticker
**And** the Crushing Chart will eventually reflect market impact

**Technical Notes:**
- File: `src/js/simulation/quarterly-events.js`
- Export: `processQuarterlyEvents(state)`
- Called by game loop when quarter boundary detected
- Creates new state references for all modified sections
- FR26: All product launches occur on quarterly boundaries

**Prerequisites:** Story 2.8, Story 3.7

---

### Story 3.9: Player Product Portfolio View

As a player,
I want to see all my designed and launched products,
So that I can manage my product lineup.

**Acceptance Criteria:**

**Given** I navigate to the Company view
**When** I see the Products section
**Then** I see a list/grid of all my products:

**For each product:**
- Name
- Status badge: Designed / Queued / Active / Discontinued
- Key specs summary (cores, VRAM, price)
- Performance score
- Launch date (if launched)
- Current sales velocity (if active)

**And** products are grouped or filterable by status
**And** I can click a product to see full details
**And** I can click "Launch" on designed products to go to launch panel

**Technical Notes:**
- File: `src/js/ui/panels/company-view.js` (partial - products section)
- Product cards use consistent styling with competitor product cards
- Status badges use semantic colors (designed=info, queued=warning, active=success)

**Prerequisites:** Story 3.6, Story 2.7

---

### Epic 3 Summary

**Stories Created:** 9
**FR Coverage:** FR1-14 (all GPU design and product launch requirements)
**Architecture Sections Used:** GPU calculations module, quarterly events, product registry
**UX Patterns Incorporated:** Slider inputs, real-time feedback, form validation, launch flow

**After Epic 3:** Player can PARTICIPATE in the market. They design a GPU—choosing specs that balance cost, performance, and efficiency. They set a price, target a segment, allocate marketing, and queue for launch. Next quarter, their GPU enters the market. They watch the Crushing Chart... but nothing happens yet. Their product exists, but the market doesn't respond to it. That comes in Epic 4.

---

## Epic 4: Market Dynamics & Competition

**Goal:** Make products actually compete—market share shifts based on price/performance, consumers make purchasing decisions, and the player sees real impact from their launches.

**User Value:** Player's products compete against NVIDIA/AMD/Intel. Better price/performance gains market share. The Crushing Chart moves in response to player actions. The core game loop is complete.

**FR Coverage:** FR17-20 (market share, consumer behavior, preferences, TAM), FR22-27 (USA market, demand, time system)

---

### Story 4.1: Price/Performance Score Calculation

As a developer,
I want a unified price/performance score for all products,
So that consumer purchasing decisions have a clear basis.

**Acceptance Criteria:**

**Given** any GPU product (player or competitor)
**When** I calculate its price/performance score
**Then** the formula produces:

```javascript
pricePerformance = performanceScore / price * 1000
```

**And** higher scores are better (more performance per dollar)
**And** the score normalizes across different price tiers
**And** products can be ranked by this score within segments

**Example calculations:**
- RTX 3080: Score 85, Price $699 → PP = 121.6
- RX 6800 XT: Score 82, Price $649 → PP = 126.3
- Player GPU: Score 80, Price $549 → PP = 145.7 (best value!)

**Technical Notes:**
- File: `src/js/simulation/market-engine.js`
- Export: `calculatePricePerformance(product)`
- This score drives consumer purchasing decisions
- Marketing budget adds a modifier (higher marketing = perceived better value)

**Prerequisites:** Story 3.2

---

### Story 4.2: Market Segment Definition

As a developer,
I want clearly defined market segments with distinct consumer behaviors,
So that products compete within appropriate tiers.

**Acceptance Criteria:**

**Given** the market is initialized
**When** I access segment definitions
**Then** I have three segments:

| Segment | Price Range | % of Market | Consumer Priority |
|---------|-------------|-------------|-------------------|
| Budget | $0 - $299 | 40% | Price > Performance |
| Midrange | $300 - $599 | 40% | Balanced |
| High-end | $600+ | 20% | Performance > Price |

**And** each segment has:
- Price threshold boundaries
- Percentage of total market demand
- Consumer weighting (how much they value price vs performance)
- Brand loyalty factor (how much brand reputation matters)

**And** products are automatically assigned to segments based on price
**And** products only compete within their segment (primarily)

**Technical Notes:**
- File: `src/js/data/market-data.js`
- Export: `MARKET_SEGMENTS`, `getProductSegment(price)`
- Consumer weights: Budget (0.7 price, 0.3 perf), Midrange (0.5/0.5), High-end (0.3/0.7)
- Some cross-segment competition exists (high-end shoppers might consider top midrange)

**Prerequisites:** Story 2.3

---

### Story 4.3: Consumer Purchasing Decision Engine

As a developer,
I want consumers to make purchasing decisions based on product attributes,
So that market share reflects actual product competitiveness.

**Acceptance Criteria:**

**Given** multiple products exist in a segment
**When** the simulation calculates daily sales
**Then** each product's market share within the segment is calculated:

```javascript
// For each product in segment
attractiveness = (pricePerformance * priceWeight) +
                 (performanceScore * perfWeight) +
                 (brandReputation * brandWeight) +
                 (marketingBoost * marketingWeight)

// Normalize to get share
productShare = productAttractiveness / totalSegmentAttractiveness
dailySales = segmentDailyDemand * productShare
```

**And** the calculation respects segment consumer priorities
**And** brand new products have reduced initial sales (market awareness ramp-up)
**And** marketing budget increases attractiveness (diminishing returns)

**Technical Notes:**
- File: `src/js/simulation/market-engine.js`
- Export: `calculateDailySales(state)`
- Called every day (24 ticks)
- Results stored in `state.history.daily`
- Marketing effect: `marketingBoost = log(marketingBudget + 1) * 0.1`

**Prerequisites:** Story 4.1, Story 4.2

---

### Story 4.4: Market Share Calculation from Sales

As a developer,
I want market share calculated from actual sales data,
So that the Crushing Chart reflects real market dynamics.

**Acceptance Criteria:**

**Given** daily sales are being recorded
**When** I query market share for any time period
**Then** the calculation uses:

```javascript
// For any time range (day, week, month, quarter, TTM)
companyShare = companyUnitsSold / totalUnitsSold
```

**And** I can query share by:
- Current day
- Last 7 days (weekly)
- Last 30 days (monthly)
- Last 90 days (quarterly)
- Last 365 days (TTM - trailing twelve months)

**And** the Crushing Chart uses quarterly aggregation by default
**And** share percentages always sum to 100%

**Technical Notes:**
- File: `src/js/utils/queries.js`
- Export: `getMarketShare(state, company, timeRange)`
- Market share is CALCULATED, never stored as static value (Architecture requirement)
- Query functions work with `state.history.daily` array

**Prerequisites:** Story 4.3

---

### Story 4.5: USA Market Demand Model

As a developer,
I want realistic USA market demand that grows over time,
So that the total addressable market feels authentic.

**Acceptance Criteria:**

**Given** the game starts in Q1 2022
**When** market demand is calculated
**Then** the base values are:

- USA population 2022: ~332 million
- Gaming population: ~65% of 15-54 age group
- Annual GPU upgrade rate: ~15% of gaming population
- Base annual demand: ~40-50 million GPUs

**And** demand grows annually:
- Population growth: ~0.5% per year
- Gaming adoption growth: ~2% per year
- Combined effect: ~2.5% annual market growth

**And** demand is distributed across segments per Story 4.2
**And** daily demand = annual demand / 365

**Technical Notes:**
- File: `src/js/data/market-data.js`
- Export: `calculateMarketDemand(year)`, `USA_MARKET_BASE`
- FR22: USA market only for MVP
- FR23: Demand from population and adoption
- FR24: Population grows annually
- FR25: GPU demand grows annually

**Prerequisites:** Story 1.8

---

### Story 4.6: Consumer Preference Drift

As a developer,
I want consumer preferences to shift over time,
So that no single product strategy stays optimal forever.

**Acceptance Criteria:**

**Given** the simulation is running
**When** time passes (quarterly)
**Then** consumer preferences gradually shift:

**Possible shifts:**
- Efficiency becomes more important (climate awareness)
- Raw performance matters more (new demanding games)
- Budget segment grows (economic factors)
- High-end segment grows (prosperity)
- VRAM requirements increase (game texture sizes)

**And** shifts are:
- Gradual (not sudden)
- Somewhat predictable (trends visible)
- Impactful (change optimal product design)

**And** preference shifts generate news events:
- "Consumers increasingly value power efficiency"
- "New game releases drive demand for high-VRAM cards"

**Technical Notes:**
- File: `src/js/simulation/market-engine.js`
- Export: `updateConsumerPreferences(state)`
- Called at quarter boundaries
- FR19: Consumer preferences shift over time
- Shifts modify segment weights and attractiveness calculations

**Prerequisites:** Story 4.3

---

### Story 4.7: Real-Time Market Share Updates

As a player,
I want to see market share update in real-time after my product launches,
So that I can watch my impact on the market.

**Acceptance Criteria:**

**Given** my product has launched and is active
**When** I watch the Crushing Chart
**Then** I see my company's line appear/grow
**And** competitor lines adjust based on my product's competitiveness
**And** changes are smooth and animated (not jumpy)

**When** my product is more competitive than competitors
**Then** my market share increases over time
**And** their market share decreases proportionally
**And** the effect is gradual (weeks to see significant change)

**When** my product is less competitive
**Then** my market share grows slowly or declines
**And** I can see I need a better product

**Technical Notes:**
- Chart updates every time `state.history` reference changes
- Smooth transitions on line positions
- Player line uses accent color (#3b82f6)
- Market awareness ramp: new products reach full potential over ~30 days

**Prerequisites:** Story 4.4, Story 2.5

---

### Story 4.8: Sales & Revenue Tracking

As a player,
I want to see my daily sales and revenue,
So that I can track my business performance.

**Acceptance Criteria:**

**Given** my products are active in the market
**When** I view the Company panel
**Then** I see:

**Daily Metrics:**
- Units sold today: XXX
- Revenue today: $X.XXM
- Trend vs yesterday: +/-X%

**Product Breakdown:**
- Per-product daily sales
- Per-product daily revenue
- Per-product margin (revenue - cost)

**And** these numbers update in real-time as the simulation runs
**And** numbers animate smoothly when changing

**Technical Notes:**
- File: `src/js/ui/panels/company-view.js` (expanded)
- Query data from `state.history.daily`
- FR15: View unit sales over time
- FR16: View revenue, costs, profit
- Real-time updates via diff-based rendering

**Prerequisites:** Story 4.3, Story 3.9

---

### Story 4.9: Market View Panel

As a player,
I want a dedicated market view showing demand and segment breakdown,
So that I can understand the competitive landscape.

**Acceptance Criteria:**

**Given** I navigate to the Market view
**When** the panel loads
**Then** I see:

**Overall Market:**
- Total annual demand: XX million units
- Current year vs last year growth: +X%
- USA market indicator

**Segment Breakdown:**
- Budget: XX% of market, $XXM TAM
- Midrange: XX% of market, $XXM TAM
- High-end: XX% of market, $XXM TAM

**Products by Segment:**
- List of active products in each segment
- Sorted by price/performance score
- Shows: Name, Company, Price, PP Score, Share%

**Consumer Trends:**
- Current preference indicators
- Recent shifts (from Story 4.6)

**Technical Notes:**
- File: `src/js/ui/panels/market-view.js`
- Replaces "Market" placeholder from Story 2.7
- FR20: Realistic market size and TAM
- FR40: View USA market demand and trends

**Prerequisites:** Story 4.5, Story 4.6, Story 2.7

---

### Epic 4 Summary

**Stories Created:** 9
**FR Coverage:** FR17-20, FR22-27 (market simulation, consumer behavior, USA market, time system)
**Architecture Sections Used:** Market engine, daily history, query functions
**UX Patterns Incorporated:** Real-time updates, animated charts, data tables

**After Epic 4:** THE CORE LOOP IS COMPLETE. Player designs a GPU → launches it → market responds → share shifts → Crushing Chart updates. If the player designs a better product at a better price, they take share from NVIDIA. They can watch their line rise while NVIDIA's falls. The game is playable. But competitors are static—they don't fight back yet. That's Epic 5.

---

## Epic 5: Intelligent Competitors

**Goal:** Make AI competitors feel alive—they launch new products, adjust prices, pivot R&D, and react strategically when the player threatens their market position.

**User Value:** The game becomes a true competition. NVIDIA, AMD, and Intel fight back. When you take their market share, they respond. When they launch a killer product, you must adapt. Victory feels earned.

**FR Coverage:** FR28-34 (full competitor AI), FR36 (competitor products), FR38 (competitor financials)

---

### Story 5.1: Competitor Product Roadmap System

As a developer,
I want each competitor to have a product roadmap based on real history,
So that their launches feel authentic and predictable.

**Acceptance Criteria:**

**Given** the game starts in Q1 2022
**When** the competitor roadmap is loaded
**Then** each company has planned product launches matching real history:

**NVIDIA 2022-2024 (examples):**
- Q3 2022: RTX 4090, RTX 4080 (Ada Lovelace)
- Q1 2023: RTX 4070 Ti, RTX 4070
- Q2 2023: RTX 4060 Ti, RTX 4060

**AMD 2022-2024 (examples):**
- Q4 2022: RX 7900 XTX, RX 7900 XT (RDNA 3)
- Q2 2023: RX 7600

**Intel 2022-2024 (examples):**
- Already launched: A770, A750 (Q1 2022)
- Q1 2024: Battlemage generation (speculative)

**And** roadmap includes:
- Launch quarter
- Product specs (based on real specs)
- Planned MSRP
- Target segment

**Technical Notes:**
- File: `src/js/data/competitor-roadmaps.js`
- Export: `NVIDIA_ROADMAP`, `AMD_ROADMAP`, `INTEL_ROADMAP`
- FR31: Launches roughly match real history (within same quarter)
- Specs should be ballpark accurate for planned products

**Prerequisites:** Story 2.2

---

### Story 5.2: Competitor Scheduled Product Launches

As a developer,
I want competitors to automatically launch products according to their roadmaps,
So that the market evolves realistically over time.

**Acceptance Criteria:**

**Given** the simulation is running
**When** a quarter matches a roadmap launch date
**Then** the competitor automatically:
1. Creates the product from roadmap specs
2. Adds it to `state.products` registry
3. Sets status to "active"
4. Generates a news event: "NVIDIA launches RTX 4090"

**And** multiple products can launch in the same quarter
**And** launches happen at the start of the quarter (same as player)
**And** the Crushing Chart reflects new competitive pressure

**Technical Notes:**
- File: `src/js/simulation/ai-competitors.js`
- Export: `processCompetitorRoadmap(state, company)`
- Called during quarterly events processing
- FR32: Competitors launch new products over time

**Prerequisites:** Story 5.1, Story 3.8

---

### Story 5.3: Competitor Financial Model

As a developer,
I want competitors to have realistic financial metrics that respond to market performance,
So that their health and capacity can be tracked.

**Acceptance Criteria:**

**Given** competitors are selling products
**When** financial metrics are calculated
**Then** each competitor has:

**Income Statement (Quarterly):**
- Revenue: Sum of (units sold × price) for all products
- COGS: Sum of (units sold × manufacturing cost)
- Gross Profit: Revenue - COGS
- R&D Spend: Percentage of revenue (NVIDIA ~20%, AMD ~22%, Intel ~25%)
- Operating Profit: Gross Profit - R&D - Marketing

**Balance Sheet (Simplified):**
- Cash: Starting cash + cumulative profits - R&D investments
- Market Cap: Revenue × industry multiple (varies by growth)

**And** financials update daily based on sales
**And** R&D budget affects future product development speed

**Technical Notes:**
- File: `src/js/simulation/business-engine.js`
- Export: `calculateCompanyFinancials(state, company)`
- FR28-30: Realistic financials for each competitor
- NVIDIA starting cash ~$15B, AMD ~$3B, Intel ~$25B (GPU division proxy)

**Prerequisites:** Story 4.3

---

### Story 5.4: Competitor Intelligence Panel

As a player,
I want to view detailed information about each competitor,
So that I can understand their strategy and plan accordingly.

**Acceptance Criteria:**

**Given** I navigate to the Intel (Intelligence) view
**When** I select a competitor (NVIDIA, AMD, or Intel)
**Then** I see:

**Company Overview:**
- Name, logo/color indicator
- Current market share (with trend)
- Financial health indicator (healthy/stressed/critical)

**Product Portfolio:**
- All active products with specs, prices, performance scores
- Discontinued products (grayed out)
- Upcoming launches (if roadmap is known/leaked)

**Financial Summary:**
- Quarterly revenue
- R&D spend (absolute and % of revenue)
- Cash position
- Market cap

**Strategic Indicators:**
- Current focus: "Defending high-end" / "Expanding midrange"
- R&D direction: "Next-gen architecture" / "Cost reduction"
- Threat level to player: Low/Medium/High

**Technical Notes:**
- File: `src/js/ui/panels/competitor-view.js`
- Replaces "Intel" placeholder from Story 2.7
- FR36: View competitor products and specs
- FR38: View competitor financials

**Prerequisites:** Story 5.3, Story 2.7

---

### Story 5.5: AI Strategic Response - Price Adjustments

As a developer,
I want competitors to adjust prices when losing market share,
So that they actively defend their position.

**Acceptance Criteria:**

**Given** a competitor is losing market share in a segment
**When** their share drops by more than 5% in a quarter
**Then** the AI considers price cuts:

**Decision Logic:**
```javascript
if (shareChange < -0.05 && margin > 0.25) {
  // Cut prices to defend share
  newPrice = currentPrice * (0.9 to 0.95)  // 5-10% cut
  generateNews("NVIDIA cuts RTX 4080 price by $50")
}
```

**And** price cuts respect minimum margin (won't go below ~20%)
**And** price cuts generate news events
**And** the market recalculates with new prices

**When** market share stabilizes
**Then** prices remain stable (no further cuts)

**Technical Notes:**
- File: `src/js/simulation/ai-competitors.js`
- Export: `evaluatePriceStrategy(state, company)`
- Called at quarter boundaries
- FR33: Competitors react to player market share gains

**Prerequisites:** Story 5.3, Story 4.4

---

### Story 5.6: AI Strategic Response - R&D Pivots

As a developer,
I want competitors to shift R&D focus based on market conditions,
So that their future products respond to competitive pressure.

**Acceptance Criteria:**

**Given** a competitor faces sustained market share loss
**When** they lose significant share over multiple quarters
**Then** the AI may pivot R&D:

**Possible Pivots:**
- **Accelerate next-gen**: Rush development, launch sooner (reduced time to market)
- **Refocus segment**: Shift resources from struggling to promising segment
- **Efficiency focus**: Next products prioritize efficiency over raw performance
- **Price focus**: Next products prioritize cost reduction

**And** R&D pivots affect future roadmap products:
- Accelerated products may launch 1 quarter early
- Refocused products may have different specs than planned

**And** pivots generate news events:
- "NVIDIA reportedly accelerating next-gen GPU development"
- "AMD shifts R&D focus toward midrange market"

**Technical Notes:**
- File: `src/js/simulation/ai-competitors.js`
- Export: `evaluateRDStrategy(state, company)`
- Pivots modify `state.companies[company].rdFocus`
- This is HOI4-style transparency: player can SEE what competitors are doing

**Prerequisites:** Story 5.3

---

### Story 5.7: AI Strategic Response - Segment Exit

As a developer,
I want competitors to potentially exit unprofitable segments,
So that realistic strategic retreats occur.

**Acceptance Criteria:**

**Given** a competitor has low share and losses in a segment
**When** segment share is below 5% for 4+ quarters AND segment is unprofitable
**Then** the AI may decide to exit:

**Exit Decision:**
```javascript
if (segmentShare < 0.05 && segmentProfit < 0 && quartersUnprofitable >= 4) {
  // Consider strategic exit
  if (otherSegmentsHealthy) {
    exitSegment(company, segment)
    generateNews("Intel exits high-end GPU market, focuses on mainstream")
  }
}
```

**And** exiting means:
- No new products in that segment
- Existing products may be discontinued
- R&D reallocated to remaining segments

**And** exit is a strategic choice, not forced bankruptcy
**And** generates significant news coverage

**Technical Notes:**
- File: `src/js/simulation/ai-competitors.js`
- Export: `evaluateSegmentStrategy(state, company)`
- FR34: Competitors may strategically deprioritize market segments
- Intel exiting high-end is a realistic scenario based on Arc history

**Prerequisites:** Story 5.5, Story 5.6

---

### Story 5.8: AI Decision Transparency

As a player,
I want to understand WHY competitors make decisions,
So that their behavior feels intelligent and predictable.

**Acceptance Criteria:**

**Given** a competitor makes a strategic decision
**When** the decision is processed
**Then** the reasoning is logged and accessible:

**Decision Log Entry:**
```javascript
{
  company: "nvidia",
  decision: "price_cut",
  products: ["rtx-4080"],
  reasoning: "Lost 8% high-end share to Player. Margin healthy at 42%. Cutting price 7% to defend.",
  quarter: "Q3 2023"
}
```

**And** recent decisions are visible in Competitor Intelligence panel
**And** news headlines hint at the reasoning
**And** players can learn to predict AI behavior

**Technical Notes:**
- Store in `state.companies[company].decisions[]`
- Display in competitor-view.js "Recent Moves" section
- HOI4 inspiration: AI transparency makes the game satisfying to analyze

**Prerequisites:** Story 5.4, Story 5.5, Story 5.6

---

### Story 5.9: Competitor Death Spiral & Bankruptcy

As a developer,
I want competitors to potentially fail completely if outcompeted,
So that the player can achieve total market domination.

**Acceptance Criteria:**

**Given** a competitor's financial health deteriorates
**When** the following conditions are met:
- Cash position below operating costs for 2+ quarters
- Market share below 5% overall
- No profitable segments remaining

**Then** bankruptcy proceedings begin:
1. News: "[Company] announces major restructuring"
2. Products discontinued over 2 quarters
3. News: "[Company] exits GPU market"
4. Company removed from active competition
5. Market share redistributed to remaining competitors

**And** bankruptcy is achievable but difficult (requires sustained dominance)
**And** the moment is CELEBRATED:
- Major news coverage
- Crushing Chart shows their line going to zero
- This is THE screenshot moment

**Technical Notes:**
- File: `src/js/simulation/ai-competitors.js`
- Export: `checkBankruptcy(state, company)`
- Add to `state.history.events` for historical record
- This fulfills the core fantasy: "Crush the giants"

**Prerequisites:** Story 5.3, Story 5.7

---

### Epic 5 Summary

**Stories Created:** 9
**FR Coverage:** FR28-34 (complete competitor AI), FR36 (competitor products), FR38 (competitor financials)
**Architecture Sections Used:** AI competitors module, decision logging, bankruptcy handling
**UX Patterns Incorporated:** Competitor cards, decision transparency, news generation, celebration moments

**After Epic 5:** The game is a TRUE COMPETITION. NVIDIA launches the RTX 4090 and takes the performance crown. AMD undercuts on price. Intel struggles in high-end. When you take share, they cut prices. When you dominate, they pivot R&D. And if you outcompete them completely—they go bankrupt. The Crushing Chart shows your line rising as theirs falls to zero. This is the game.

---

## Epic 6: Business Intelligence & Polish

**Goal:** Complete the game experience with full financial dashboards, a news system that tells the market story, and save/load for persistent gameplay.

**User Value:** Full business simulation transparency—see exactly how your company is performing. News headlines make the market feel alive. Save your progress and continue later.

**FR Coverage:** FR15-16 (sales/revenue detail), FR37 (news headlines), FR39-40 (player financials, market trends), FR41-43 (new game, save/load)

---

### Story 6.1: Player Financial Dashboard

As a player,
I want a comprehensive financial dashboard for my company,
So that I can understand my business performance in detail.

**Acceptance Criteria:**

**Given** I navigate to the Company view
**When** I see the Financial Dashboard
**Then** I see:

**Income Statement (Current Quarter):**
- Revenue: $XX.XXM (units × price, per product breakdown available)
- COGS: $XX.XXM (units × manufacturing cost)
- Gross Profit: $XX.XXM (Revenue - COGS)
- Gross Margin: XX%
- R&D Expense: $XX.XXM
- Marketing Expense: $XX.XXM
- Operating Profit: $XX.XXM
- Operating Margin: XX%

**Trends (vs Last Quarter):**
- Revenue: +/-XX%
- Profit: +/-XX%
- Units Sold: +/-XX%

**Cash Position:**
- Current Cash: $XX.XXM
- Quarterly Cash Flow: +/-$XX.XXM

**And** all numbers update in real-time as the quarter progresses
**And** numbers are color-coded (green positive, red negative)
**And** I can click any line item to see detailed breakdown

**Technical Notes:**
- File: `src/js/ui/panels/financial-panel.js`
- Query from `state.history.daily` aggregated by quarter
- FR16: View revenue, costs, profit
- FR39: Player company financial dashboard

**Prerequisites:** Story 4.8, Story 5.3

---

### Story 6.2: Historical Financial Charts

As a player,
I want to see my financial performance over time in charts,
So that I can track my business trajectory.

**Acceptance Criteria:**

**Given** I'm viewing my Financial Dashboard
**When** I look at the charts section
**Then** I see:

**Revenue Chart:**
- Line chart showing quarterly revenue over time
- Comparison line showing total market revenue (optional toggle)

**Profit Chart:**
- Line chart showing quarterly profit
- Break-even line at $0

**Market Share Chart:**
- My share over time (same data as Crushing Chart, focused on player)

**And** charts cover all historical quarters since game start
**And** I can hover for exact values at any point
**And** charts animate smoothly when new data arrives

**Technical Notes:**
- Reuse chart components from `ui/charts/`
- Same SVG rendering approach as Crushing Chart
- Data from `state.history.daily` aggregated by quarter

**Prerequisites:** Story 6.1, Story 2.4

---

### Story 6.3: News Event Generation System

As a developer,
I want a system that generates news events for all significant market activities,
So that the news ticker has meaningful content.

**Acceptance Criteria:**

**Given** the simulation is running
**When** significant events occur
**Then** news events are generated and stored:

**Event Types:**
| Event | Example Headline |
|-------|-----------------|
| Product Launch | "NVIDIA launches RTX 4090 at $1,599" |
| Price Cut | "AMD slashes RX 7900 XTX price by 15%" |
| Market Milestone | "Player Corp captures 10% market share" |
| Quarterly Results | "NVIDIA reports $8.2B quarterly revenue" |
| R&D Announcement | "Intel pivots R&D focus to mainstream GPUs" |
| Segment Exit | "Intel exits high-end GPU market" |
| Bankruptcy | "AMD files for bankruptcy protection" |
| Consumer Trend | "Gamers increasingly prioritize power efficiency" |

**And** each event has:
- Headline text
- Timestamp (quarter and day)
- Category (product, financial, market, strategic)
- Severity (normal, important, critical)
- Related companies

**And** events are stored in `state.history.events[]`

**Technical Notes:**
- File: `src/js/simulation/news-generator.js`
- Export: `generateNewsEvent(type, data)`
- Called by various simulation modules when events occur
- FR37: News headlines reflecting market events

**Prerequisites:** Story 1.8

---

### Story 6.4: News Ticker UI

As a player,
I want to see news headlines scrolling at the bottom of the screen,
So that I stay informed about market events without leaving my current view.

**Acceptance Criteria:**

**Given** the game is running
**When** I look at the bottom of the screen
**Then** I see a news ticker showing recent headlines

**Ticker Behavior:**
- Headlines scroll horizontally (right to left)
- Scroll pauses on hover
- Click headline to see full details in modal
- Most recent headlines appear first
- Old headlines cycle out after ~10 items

**Visual Styling:**
- Category icon before each headline
- Critical news highlighted (different color/icon)
- Timestamps shown
- Smooth scrolling animation

**When** a new critical event occurs
**Then** the ticker briefly highlights/flashes
**And** the new headline appears immediately

**Technical Notes:**
- File: `src/js/ui/panels/news-ticker.js`
- Pull from `state.history.events[]` (most recent N events)
- CSS animation for smooth scrolling
- UX spec: News ticker as ambient information feed

**Prerequisites:** Story 6.3, Story 1.5

---

### Story 6.5: News Detail Modal

As a player,
I want to click a news headline to see full details,
So that I can understand the context and implications.

**Acceptance Criteria:**

**Given** I see a news headline in the ticker
**When** I click on it
**Then** a modal opens showing:

**News Detail:**
- Full headline
- Date/time (Q2 2023, Day 45)
- Category badge
- Full description paragraph explaining the event
- Related data (if applicable):
  - Product launch: Show product specs and price
  - Financial results: Show key metrics
  - Market milestone: Show chart snippet

**And** I can close the modal with X button, clicking outside, or pressing Escape
**And** modal has smooth open/close animation

**Technical Notes:**
- File: `src/js/ui/components/modals.js`
- News events need extended `description` field for detail view
- UX spec: Modal centered, dimmed backdrop, scale animation

**Prerequisites:** Story 6.4

---

### Story 6.6: Main Menu & New Game

As a player,
I want a main menu to start new games,
So that I can begin fresh campaigns.

**Acceptance Criteria:**

**Given** I launch the game
**When** the application loads
**Then** I see the main menu:

**Menu Options:**
- **New Game** → Start company setup
- **Load Game** → Open save file browser
- **Settings** → (placeholder for future)
- **Quit** → Close application (if packaged)

**When** I click "New Game"
**Then** I see company setup:
- Company name input (required)
- Starting year: 2022 (fixed for MVP)
- "Start Game" button

**When** I enter a name and click "Start Game"
**Then** a new game state is created
**And** I enter the main game dashboard
**And** the tutorial/first-time experience begins (if implemented)

**Technical Notes:**
- File: `src/js/ui/panels/main-menu.js`
- File: `src/js/core/init.js` for game initialization
- FR41: Player can start a new game
- Main menu is `state.ui.currentView === 'menu'`

**Prerequisites:** Story 1.2, Story 1.5

---

### Story 6.7: Save Game System

As a player,
I want to save my game progress to a file,
So that I can continue playing later.

**Acceptance Criteria:**

**Given** I'm playing the game
**When** I click "Save Game" (from pause menu or keyboard shortcut)
**Then** a save dialog appears:
- Save name input (default: "TechGame_Q2_2023")
- Save location: Documents/TechGame/saves/
- "Save" button

**When** I click "Save"
**Then** the entire game state is serialized to JSON
**And** written to a `.techgame` file
**And** I see confirmation: "Game saved successfully"
**And** the game continues without interruption

**Save File Format:**
```json
{
  "version": "1.0",
  "savedAt": "2025-12-02T10:30:00Z",
  "gameTime": { "quarter": 2, "year": 2023 },
  "state": { /* full game state */ }
}
```

**And** save files are human-readable JSON
**And** keyboard shortcut: Ctrl+S (or Cmd+S)

**Technical Notes:**
- File: `src/js/state/save-load.js`
- Use File System Access API for file writing
- FR42: Player can save game state
- Architecture: `.techgame` files in Documents/TechGame/saves/

**Prerequisites:** Story 1.2, Story 6.6

---

### Story 6.8: Load Game System

As a player,
I want to load a previously saved game,
So that I can continue my campaign.

**Acceptance Criteria:**

**Given** I'm at the main menu OR in a game
**When** I click "Load Game"
**Then** a file browser opens showing `.techgame` files

**For each save file, I see:**
- Save name
- Game date (Q2 2023)
- Company name
- Real-world save date
- File size

**When** I select a file and click "Load"
**Then** the save file is read and parsed
**And** game state is restored completely
**And** I enter the game at the saved state
**And** the Crushing Chart shows all historical data

**When** loading fails (corrupted file)
**Then** I see error message: "Could not load save file"
**And** I remain at the menu/current game

**Technical Notes:**
- File: `src/js/state/save-load.js`
- Use File System Access API for file reading
- FR43: Player can load saved game state
- Validate save file version compatibility

**Prerequisites:** Story 6.7

---

### Story 6.9: In-Game Pause Menu

As a player,
I want to access save/load and settings during gameplay,
So that I can manage my game session without returning to main menu.

**Acceptance Criteria:**

**Given** I'm playing the game
**When** I press Escape (or click menu button)
**Then** the game pauses and a pause menu appears:

**Pause Menu Options:**
- **Resume** → Close menu, continue game
- **Save Game** → Open save dialog
- **Load Game** → Open load dialog (with warning about losing progress)
- **Settings** → (placeholder)
- **Main Menu** → Return to main menu (with confirmation)
- **Quit** → Exit application (if packaged)

**And** the game simulation is paused while menu is open
**And** the menu has semi-transparent backdrop
**And** Escape closes the menu (resumes game)

**Technical Notes:**
- File: `src/js/ui/components/pause-menu.js`
- Pause menu sets `state.time.paused = true`
- Confirm dialog for destructive actions (Main Menu, Quit)
- UX spec: Modal pattern with dimmed backdrop

**Prerequisites:** Story 6.6, Story 6.7, Story 6.8

---

### Story 6.10: Market Trends & Consumer Insights Panel

As a player,
I want detailed market trend information,
So that I can make informed strategic decisions.

**Acceptance Criteria:**

**Given** I navigate to the Market view
**When** I see the Trends section
**Then** I see:

**Current Consumer Preferences:**
- Performance importance: XX% (bar visualization)
- Price sensitivity: XX% (bar visualization)
- Efficiency weight: XX% (bar visualization)
- Brand loyalty: XX% (bar visualization)

**Trend History:**
- How preferences have shifted over past 4 quarters
- Directional arrows showing trends

**Market Forecasts:**
- "Efficiency becoming more important"
- "Budget segment expected to grow"
- (Based on current trend trajectories)

**Segment Analysis:**
- Budget: XX units/quarter, $XXM TAM, trending ↑/↓
- Midrange: XX units/quarter, $XXM TAM, trending ↑/↓
- High-end: XX units/quarter, $XXM TAM, trending ↑/↓

**Technical Notes:**
- Part of `src/js/ui/panels/market-view.js`
- FR40: View USA market demand and trends
- Trends from `state.market.preferences` (Story 4.6)

**Prerequisites:** Story 4.9, Story 4.6

---

### Epic 6 Summary

**Stories Created:** 10
**FR Coverage:** FR15-16 (detailed), FR37 (news system), FR39-40 (financials/trends), FR41-43 (game flow)
**Architecture Sections Used:** Save/load system, news generation, financial calculations
**UX Patterns Incorporated:** Financial dashboards, news ticker, modals, main menu, pause menu

**After Epic 6:** THE GAME IS COMPLETE.

The player has:
- Full financial visibility (P/L, cash flow, margins)
- News system that tells the market story
- Save/load for persistent campaigns
- Complete market intelligence

Combined with Epics 1-5:
- A living market to observe
- GPU design with meaningful trade-offs
- Products that compete for market share
- Intelligent AI competitors that fight back
- The ability to crush NVIDIA and watch it happen

**TechGame MVP is ready.**

---

## Final Validation

### FR Coverage Matrix

Every functional requirement from the PRD is mapped to specific stories:

| FR | Description | Epic | Stories |
|----|-------------|------|---------|
| **GPU Design** |
| FR1 | Core count specification | 3 | 3.1, 3.4 |
| FR2 | VRAM specification | 3 | 3.1, 3.4 |
| FR3 | Clock speed specification | 3 | 3.1, 3.4 |
| FR4 | TDP specification | 3 | 3.1, 3.4 |
| FR5 | Die size specification | 3 | 3.1, 3.4 |
| FR6 | Nanometer process specification | 3 | 3.1, 3.4 |
| FR7 | Performance metrics calculation | 3 | 3.2, 3.5 |
| FR8 | Manufacturing cost calculation | 3 | 3.3, 3.5 |
| FR9 | Product naming | 3 | 3.6 |
| **Product Launch & Business** |
| FR10 | Set retail price | 3 | 3.7 |
| FR11 | Allocate manufacturing volume | 3 | 3.7 |
| FR12 | Allocate marketing budget | 3 | 3.7 |
| FR13 | Target consumer segments | 3 | 3.7 |
| FR14 | Quarterly product launch | 3 | 3.8 |
| FR15 | View unit sales | 4, 6 | 4.8, 6.1 |
| FR16 | View revenue/costs/profit | 4, 6 | 4.8, 6.1, 6.2 |
| **Market Simulation** |
| FR17 | Market share from price/performance | 4 | 4.1, 4.3, 4.4 |
| FR18 | Consumer purchasing behavior | 4 | 4.3 |
| FR19 | Consumer preference shifts | 4 | 4.6 |
| FR20 | Market size and TAM | 4 | 4.5, 4.9 |
| FR21 | Game starts 2022 | 1 | 1.2, 1.8 |
| FR22 | USA market only | 4 | 4.5 |
| FR23 | Demand from population | 4 | 4.5 |
| FR24 | Population growth | 4 | 4.5 |
| FR25 | GPU demand growth | 4 | 4.5 |
| FR26 | Quarterly launch boundaries | 3 | 3.8 |
| FR27 | Quarterly simulation ticks | 1, 2 | 1.3, 2.8 |
| **Competitor AI** |
| FR28 | NVIDIA simulation | 2, 5 | 2.2, 5.1-5.3 |
| FR29 | AMD simulation | 2, 5 | 2.2, 5.1-5.3 |
| FR30 | Intel Arc simulation | 2, 5 | 2.2, 5.1-5.3 |
| FR31 | Launches match real history | 5 | 5.1, 5.2 |
| FR32 | Competitors launch products | 5 | 5.2 |
| FR33 | Competitors react to player | 5 | 5.5, 5.6 |
| FR34 | Competitors deprioritize segments | 5 | 5.7 |
| **Feedback & Visualization** |
| FR35 | Market share chart | 2 | 2.4, 2.5, 2.6 |
| FR36 | View competitor products | 5 | 5.4 |
| FR37 | News headlines | 6 | 6.3, 6.4, 6.5 |
| FR38 | View competitor financials | 5 | 5.4 |
| FR39 | Player financial dashboard | 6 | 6.1, 6.2 |
| FR40 | USA market demand/trends | 4, 6 | 4.9, 6.10 |
| **Game Flow** |
| FR41 | Start new game | 6 | 6.6 |
| FR42 | Save game state | 6 | 6.7 |
| FR43 | Load saved game | 6 | 6.8 |
| FR44 | Advance time (tick) | 1, 2 | 1.3, 2.1 |
| FR45 | Adjust simulation speed | 1, 2 | 1.4, 2.1 |
| FR46 | Pause simulation | 1, 2 | 1.4, 2.1 |

### Coverage Summary

| Category | FRs | Coverage |
|----------|-----|----------|
| GPU Design | FR1-9 | ✅ 100% (9/9) |
| Product Launch | FR10-16 | ✅ 100% (7/7) |
| Market Simulation | FR17-27 | ✅ 100% (11/11) |
| Competitor AI | FR28-34 | ✅ 100% (7/7) |
| Feedback & Visualization | FR35-40 | ✅ 100% (6/6) |
| Game Flow | FR41-46 | ✅ 100% (6/6) |
| **TOTAL** | **FR1-46** | **✅ 100% (46/46)** |

### Architecture Integration Summary

| Architecture Section | Stories Using It |
|---------------------|------------------|
| State Structure Pattern | 1.2, 2.3, 4.4, 5.3 |
| Game Loop & Time System | 1.3, 1.4, 2.1, 2.8 |
| Diff-Based Rendering | 1.6, 2.5, 4.7 |
| Layer Organization | All stories |
| SVG Chart System | 2.4, 2.5, 6.2 |
| Save/Load System | 6.7, 6.8 |
| Daily History Model | 2.8, 4.3, 4.4, 6.1 |
| Named Exports Pattern | All stories |

### UX Design Integration Summary

| UX Component | Stories Implementing It |
|--------------|------------------------|
| The Crushing Chart | 2.4, 2.5, 2.6, 4.7 |
| GPU Designer | 3.4, 3.5, 3.6 |
| Time Control Bar | 2.1 |
| Navigation Sidebar | 2.7 |
| Competitor Cards | 2.6, 5.4 |
| Financial Panel | 6.1, 6.2 |
| News Ticker | 6.4 |
| Dark Theme & Colors | 1.1, 1.5 |
| Modals & Panels | 6.5, 6.9 |

---

## Document Summary

### Total Stories: 53

| Epic | Stories | Focus |
|------|---------|-------|
| Epic 1 | 8 | Foundation & Core Systems |
| Epic 2 | 8 | The Living Market |
| Epic 3 | 9 | GPU Design & Product Launch |
| Epic 4 | 9 | Market Dynamics & Competition |
| Epic 5 | 9 | Intelligent Competitors |
| Epic 6 | 10 | Business Intelligence & Polish |

### Implementation Order

Epics must be implemented in order (1 → 2 → 3 → 4 → 5 → 6) due to dependencies.

Within each epic, stories can often be parallelized where dependencies allow.

### Story Sizing Principle

Every story is designed to be completable by a single dev agent in one focused session. If any story proves too large during implementation, it should be split further while maintaining user value.

### Ready for Development

This epic breakdown provides:
- ✅ 100% FR coverage (46/46 requirements)
- ✅ Full Architecture integration
- ✅ Complete UX Design incorporation
- ✅ Clear dependencies and implementation order
- ✅ Detailed acceptance criteria for every story
- ✅ Technical notes with specific file locations

**Next Step:** Begin implementation with Epic 1, Story 1.1 (Project Initialization).

---

*Generated: 2025-12-02*
*For implementation: Use the sprint-planning workflow to track story completion.*

