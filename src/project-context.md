# Project Context - TechGame
Updated: 2025-12-06 | Stories: 1.1-1.7 complete

## Module Exports

### utils/ (no dependencies - import from anywhere)
```
formatters: formatCurrency(n)→"$1.23M" | formatPercent(n,{showSign?,decimals?})→"+12.34%" | formatDate({currentQuarter,currentYear})→"Q1 2022" | formatNumber(n)→"1.50M"
  - Currency/Number: min $0.01, max 999.99T, rounds to 2 decimals for small values
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
components/top-bar: renderTopBar(container,state)
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

## Layer Rules
```
utils → no imports allowed
state → no imports allowed
core → may import state
ui → may import state,core,utils
data → no imports allowed (JSON/constants only)
main → may import all
```
