# Project Context - TechGame
Updated: 2025-12-07 | Stories: 1.1-1.8, 2.1 complete

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
                 STARTING_MARKET_SHARE{nvidia=0.8,amd=0.18,intel=0.02,player=0} | COMPETITOR_PROFILES | COMPETITOR_PLACEHOLDER_PRODUCTS
```

### utils/ (no dependencies - import from anywhere)
```
formatters: formatCurrency(n)→"$1.23M" | formatPercent(n,{showSign?,decimals?})→"+12.34%" | formatDate({currentQuarter,currentYear})→"Q1 2022" | formatDetailedTime({currentMonth,currentDay,currentHour})→"M03 D15 H08" | formatNumber(n)→"1.50M"
  - Currency/Number: min $0.01, max 999.99T, rounds to 2 decimals for small values
  - formatDetailedTime: Shows time progression within quarters (month, day, hour) - all values zero-padded to 2 digits
math: clamp(val,min,max) | lerp(start,end,t) | randomInRange(min,max) | roundTo(val,decimals)
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
state.products: {} // key: "{company}-{slug}-{quarter}"
state.history: {daily[],events[]}
state.ui: {currentView,selectedProduct,gpuDesigner:{specs:{cores,vram,clockSpeed,tdp,dieSize,nm},name,price}}
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
core → may import state
ui → may import state,core,utils
data → no imports allowed (JSON/constants only)
main → may import all
```
