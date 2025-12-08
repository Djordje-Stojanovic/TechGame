# Project Context - TechGame
Updated: 2025-12-08 | Stories: 1.1-1.8, 2.1-2.3 complete

## Module Exports

### data/ (no dependencies - import from anywhere)
```
constants: HOURS_PER_DAY=24 | DAYS_PER_MONTH=30 | MONTHS_PER_YEAR=12 | MONTHS_PER_QUARTER=3 | DAYS_PER_QUARTER=90 | HOURS_PER_QUARTER=2160
          TICK_SPEEDS=[1,2,4] | DEFAULT_TICK_SPEED=1 | STARTING_YEAR=2022 | STARTING_QUARTER=1 | STARTING_CASH=10M
          VIEWS=['dashboard','market','design','competitors','financials'] | DEFAULT_VIEW='dashboard'
          BUDGET_MAX_PRICE=299 | MIDRANGE_MAX_PRICE=599 | COMPANY_IDS | SEGMENT_KEYS
market-data: USA_POPULATION_2022=332M | BASE_GPU_DEMAND_ANNUAL=50M | POPULATION_GROWTH_RATE=0.005 | GPU_DEMAND_GROWTH_RATE=0.03
             MARKET_SEGMENTS{budget,midrange,highend} | getProductSegment(price)→segmentKey | calculateMarketDemand(year)→units
competitor-data: COMPETITOR_STARTING_CASH{nvidia,amd,intel} | COMPETITOR_BRAND_COLORS{nvidia,amd,intel,player}
                 STARTING_MARKET_SHARE{nvidia=0.8,amd=0.18,intel=0.02,player=0} | COMPETITOR_PROFILES | COMPETITOR_PLACEHOLDER_PRODUCTS(deprecated)
starting-products: NVIDIA_PRODUCTS[4] | AMD_PRODUCTS[3] | INTEL_PRODUCTS[2] | STARTING_PRODUCTS{9 products keyed by ID}
                   getStartingProductIds(company)→string[] | Product ID format: {company}-{slug}-{year}q{quarter}
```

### utils/ (no dependencies - import from anywhere)
```
formatters: formatCurrency(n)→"$1.23M" | formatPercent(n,{showSign?,decimals?})→"+12.34%" | formatDate({currentQuarter,currentYear})→"Q1 2022" | formatDetailedTime({currentMonth,currentDay,currentHour})→"M03 D15 H08" | formatNumber(n)→"1.50M"
  - Currency/Number: min $0.01, max 999.99T, rounds to 2 decimals for small values
  - formatDetailedTime: Shows time progression within quarters (month, day, hour) - all values zero-padded to 2 digits
math: clamp(val,min,max) | lerp(start,end,t) | randomInRange(min,max) | roundTo(val,decimals)
queries: getMarketShare(state,company,timeRange?)→decimal(0-1) | getTimeRangeDays(timeRange)→number
  - timeRange: 'day'(1), 'week'(7), 'month'(30), 'quarter'(90), 'year'(365), 'ttm'(365)
  - Market share calculated from history (not stored) - company units / total units
```

### state/
```
game-state: createInitialState()→state object
```

### core/ (imports: state)
```
game-loop: startGameLoop(state,renderFn,onError?) | stopGameLoop() | updateLoopSpeed(state) | VALID_TICK_SPEEDS=[1,2,4]
time-controls: pauseGame(state) | playGame(state) | togglePause(state) | setSpeed(state,speed) | skipToNextQuarter(state)
```

### simulation/ (imports: state, data, utils)
```
history-init: initializeHistory(state) - Creates Day 1 history entry with starting market conditions
  - Called once after products are populated
  - Distributes daily demand by STARTING_MARKET_SHARE (80/18/2/0)
  - Distributes company units across products by inverse price (cheaper sells more)
```

### ui/ (imports: state,core,utils)
```
render: render(state) | initializeUI(state) | resetRenderState()
components/top-bar: renderTopBar(container,state,renderFn?) | initKeyboardShortcuts(state,renderFn) | cleanupKeyboardShortcuts()
components/sidebar: renderSidebar(container,activeView?)
panels/dashboard: renderDashboard(container)
panels/placeholder: renderPlaceholder(container,viewName)
```

## State Structure
```
state.time: {currentHour,currentDay,currentMonth,currentQuarter,currentYear,tickSpeed,paused}
state.player: {name,cash,products[],rdProjects[],marketingBudget}
state.companies.{nvidia|amd|intel}: {name,cash,products[],rdProjects[],marketingBudget,rdFocus}
state.market: {totalDemand,segments:{budget,midrange,highend},preferences}
state.products: {} // key: "{company}-{slug}-{year}q{quarter}" - populated by main.js from starting-products.js
state.history: {daily[],events[]}
  daily[]: {day,month,year,sales:{company:{productId:{units,revenue,cost}}},companyTotals:{company:{units,revenue,costs,rdSpend,marketing}}}
  - Initialized with Day 1 data by initializeHistory() in main.js
state.ui: {currentView,selectedProduct,gpuDesigner:{specs:{cores,vram,clockSpeed,tdp,dieSize,nm},name,price}}
```

## Product Structure
```
Product: {id,company,name,launchDate:{quarter,year},discontinuedDate,specs,msrp,manufacturingCost,status}
ProductSpecs: {cores,vram,clockSpeed,tdp,dieSize,nm}
Product ID format: {company}-{slug}-{year}q{quarter} (e.g., 'nvidia-rtx-3080-2020q3')
Note: Products initialized in main.js (NOT game-state.js - layer rules!)
```

## Constants
```
Start: 2022 Q1 | Ticks: 1,2,4/sec | Views: dashboard,market,design,competitors,financials
Segments: budget($0-299), midrange($300-599), highend($600+)
Cash: Player=$10M, NVIDIA=$15B, AMD=$3B, Intel=$25B
```

## Keyboard Controls
```
Space: Toggle pause/play
1/2/4: Set simulation speed (1x, 2x, 4x ticks/sec)
Note: Shortcuts ignored when typing in input/textarea fields
```

## Layer Rules
```
utils → no imports allowed
state → no imports allowed
data → no imports allowed (JSON/constants only)
core → may import state
simulation → may import state, data, utils
ui → may import state,core,utils
main → may import all
```
