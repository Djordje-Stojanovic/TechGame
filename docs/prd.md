---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
inputDocuments:
  - docs/analysis/product-brief-TechGame-2025-12-01.md
workflowType: 'prd'
lastStep: 11
project_name: 'TechGame'
user_name: 'Djord'
date: '2025-12-01'
---

# Product Requirements Document - TechGame

**Author:** Djord
**Date:** 2025-12-01

## Executive Summary

TechGame is a personal GUI-based tech industry sandbox simulation focused on GPU design and market competition. Players design chips with real specifications—cores, VRAM, clock speed, TDP, die size, nanometer process—then compete against NVIDIA, AMD, and Intel in the consumer GPU market.

The core experience: design better tech than the giants, watch the market react in real-time as competitors scramble to respond.

### What Makes This Special

- **Technical depth that matters:** Specs aren't cosmetic—nanometers, die size, TDP drive real market outcomes
- **Reactive competitors:** AI rivals research, redesign, and fight back when you take their market share
- **Living market:** Consumer desires shift over time; no permanently optimal product exists
- **Built for one:** Optimized for personal enjoyment, not mass market appeal

## Project Classification

**Technical Type:** Desktop Application (Game/Simulation)
**Domain:** General (personal project)
**Complexity:** Simple

Tycoon-style simulation comparable to Software Inc or Computer Tycoon. MVP focuses on a single market segment (consumer GPUs) with a tight design-price-market loop before expanding to datacenter, CPUs, foundries, and full ecosystem play.

## Success Criteria

### User Success

**The Only KPI That Matters:**
> "Do I want to keep playing?" — Yes/No

**Validation Milestone:**
First time you design a GPU that outcompetes an AI rival and watch their market share decline = core loop validated.

**"One More Turn" Triggers:**
- "100 more days until our GPU launches - 5 years of R&D, 80% of FCF invested - I want to watch the market collapse"
- Anticipation of market-shaking impact after strategic investment

### Technical Success

**ZERO FUCKING TOLERANCE FOR BUGS.**

No UI bugs. No UX bugs. No data bugs. No gameplay bugs. No memory bugs. No smoothness bugs. No input bugs. None. Period.

If it ships with a bug, it failed.

### Quality Bar (Non-Negotiable)

- Zero bugs or miscalculations
- Real-world statistics are ballpark accurate (not precise quarterly figures, but realistic scale and proportions)
- Smooth, responsive feel - not clunky
- Fast - no performance issues
- Perfectly balanced complexity - not too simple, not too complex
- Makes logical sense
- UI/UX quality at the tier of HOI4, Victoria 3, Software Inc, Computer Tycoon

### Anti-Success Indicators (Immediate Failure)

- Any single bug or miscalculation
- Data that doesn't pass the sniff test
- Clunky interactions
- Performance issues
- Feels unfinished or janky

### Measurable Outcomes

| Metric | Target |
|--------|--------|
| Bug count at launch | 0 |
| Core loop validation | Player designs GPU → outcompetes rival → market share shifts visibly |
| Session hook | "One more turn" feeling within first 15 minutes |
| Data accuracy | Ballpark realistic (e.g., in-game NVIDIA starting ~$140-180B revenue range, growing based on market dynamics) |

## Product Scope

### MVP - Minimum Viable Product

- GPU design with meaningful spec choices (cores, VRAM, clock speed, TDP, die size, nanometer process)
- Business loop: pricing, manufacturing costs, logistics, marketing
- Consumer GPU market only
- Three AI competitors: NVIDIA, AMD, Intel Arc
- Market share simulation based on price/performance
- News and feedback system showing market reactions
- Competitors react to player moves (R&D pivots, new designs)

### Growth Features (Post-MVP)

**Phase 2 - Datacenter & CPU Expansion:**
- Datacenter GPU market with enterprise demand
- CPU design (compete with Intel, AMD processors)
- TPU / AI accelerator design
- Enterprise customers with different needs
- Server/workstation market segments

**Phase 3 - Foundry & Manufacturing:**
- Foundries (build fabs, compete with TSMC, Samsung, Intel Foundry, GlobalFoundries)
- Real semiconductor economics:
  - Wafer costs, dies per wafer, yield rates
  - Yield curves (new nodes start ~50-60%, improve over time)
  - Fab capacity constraints (wafers/month)
  - Node development R&D (years of research, billions in investment)
- Flexible process nodes (not just 3/4/5nm - any value like 3.3nm, 2.83nm)
- Freedom to skip nodes (e.g., skip 4nm, go direct to 3nm)
- Vertical integration: design company can build own foundry mid-game

**Phase 4 - Memory & Storage:**
- Memory design & manufacturing:
  - DRAM (DDR4, DDR5, DDR6+)
  - GDDR (GDDR6, GDDR6X, GDDR7+)
  - HBM (HBM2, HBM3, HBM4+)
- Memory companies: SK Hynix, Micron, Samsung Memory
- Storage products:
  - SSD design (NAND flash, controllers)
  - HDD design (for completeness)
  - NVMe controllers
- Memory bandwidth physics: bus width × memory clock × channels × type efficiency
- Storage performance: IOPS, sequential read/write, latency

**Phase 5 - Components & Systems:**
- PSU design (efficiency ratings, wattage tiers)
- Motherboard design (chipsets, form factors)
- Cooling solutions (air, AIO, custom loop)
- PC case design (form factors, airflow)
- Full system integration: build complete PCs, workstations, servers

**Phase 6 - OEM & Consumer Products:**
- OEM products (phones, tablets, consoles, laptops, desktops)
- Console partnerships (Sony, Microsoft, Nintendo)
- Cloud gaming hardware (Google Stadia-style, Xbox Cloud, GeForce Now)
- Cloud compute (AWS, Azure, GCP as customers AND competitors)
- Laptop/mobile GPU variants (power-limited designs)

### Ultimate Vision

**Phase 7+ - Complete Tech Industry Sandbox:**
- Software / OS design
- Joint ventures and co-branded products
- IP licensing and design royalties
- Acquisitions and mergers
- Global market (expand beyond USA)
- Geopolitics (trade wars, export controls, fab locations)
- Stock market / IPO mechanics
- Any role in the value chain: fabless designer, IDM, foundry, memory, OEM, or conglomerate
- Start anywhere, expand anywhere: GPU company adds foundry, foundry adds chip design, etc.

### Simulation Realism Principles (All Phases)

These principles apply across ALL phases as features are added:

1. **Real Physics** - All calculations based on actual engineering relationships
   - Memory bandwidth = bus width × clock × channels × efficiency factor
   - Die cost = f(wafer cost, die size, yield rate, defect density)
   - Power = voltage² × capacitance × frequency (simplified but real)

2. **Real Economics** - Market determines outcomes, not arbitrary constraints
   - No hardcoded margins - price whatever you want, market decides if it sells
   - Competitors use same simulation rules as player
   - Supply/demand dynamics affect pricing

3. **Real Freedom** - Player chooses their path
   - Skip process nodes, target custom nodes (3.71nm if you want)
   - Vertical integration at any time
   - Enter/exit any market segment
   - R&D priorities fully controllable

4. **Real Companies** - Accurate starting positions, realistic behavior
   - NVIDIA, AMD, Intel, TSMC, Samsung, SK Hynix, Micron, etc.
   - Financials ballpark accurate to real world
   - AI uses same constraints as player

## User Journeys

### Journey 1: First Launch - Seeing the Depth

You launch TechGame for the first time. The main menu shows a beautiful interface - clean, professional, no clutter. You start a new game and immediately see the market dashboard: NVIDIA dominates with 80% market share, AMD holds 18%, Intel Arc scrapes by at 2%. Real numbers, real scale.

You open your company panel. Empty. No products, modest starting capital, a blank R&D pipeline. But the GPU designer is right there, inviting you in. You click it and see the spec sliders: cores, VRAM, clock speed, TDP, die size, nanometer process. Each one affects performance, cost, power draw. The relationships make sense.

Within 10 minutes you've designed your first GPU - nothing special, a budget card to test the waters. You set a price, allocate marketing budget toward budget-conscious gamers, and hit launch. The simulation runs. News tickers update. Your card appears in the market. It sells - not much, but it sells. You've validated the loop. Now you want to see what happens when you design something actually competitive.

### Journey 2: The Core Loop - Designing to Dominate

Six months into your campaign. You've learned the market. NVIDIA's RTX 5080 dominates the high-end - 16GB VRAM, 2.5GHz boost clock, 250W TDP on 4nm. Consumers love it but complain about price ($799) and power draw.

You see the gap. You spend 18 months on R&D designing a competitor: same performance tier, 14GB VRAM (enough for most), 2.4GHz clock, but only 180W TDP on 3nm. Manufacturing costs are higher due to the smaller process, but you price it at $699 - undercutting NVIDIA while offering better efficiency.

Launch day. News headlines: "New challenger threatens NVIDIA's grip on high-end gaming." You watch the market share chart. NVIDIA drops from 80% to 74% over the next quarter. Their stock price dips. Intel's stock rises on speculation. AMD accelerates their own R&D. The market reacted. You caused that.

### Journey 3: The Payoff - Watching Them Scramble

Three years in. You've been patient. While competitors fought over the mid-range, you invested everything into next-gen architecture. 80% of free cash flow, five years of R&D, a massive gamble on 2nm process.

Launch day arrives. Your flagship destroys everything on the market - 40% better performance than NVIDIA's best, 30% lower power consumption, priced aggressively. You watch the simulation tick forward.

Week 1: Tech news explodes. "Industry disrupted."
Month 1: Your market share jumps from 12% to 28%.
Month 3: NVIDIA's market share drops below 50% for the first time. They announce emergency R&D reallocation - pivoting resources toward datacenter and AI where margins are higher.
Month 6: AMD pivots their entire product line. Intel considers exiting the consumer GPU market.

You did that. Five years of setup. This is the "one more turn" moment - except now you're planning the next five years.

### Journey Requirements Summary

- GPU designer with meaningful spec trade-offs (cores, VRAM, clock, TDP, die size, nm process)
- Market simulation showing real-time share changes
- News/feedback system reflecting player impact
- Competitor AI that visibly reacts and adapts
- Time progression with anticipation mechanics
- **Realistic competitor behavior**: Large players like NVIDIA have R&D advantages and strategic options - they may cede market segments voluntarily to pursue higher-margin opportunities rather than being "crushed"

## Technical Requirements

### Platform & Technology

**Target Platform:** Windows (desktop)
**Distribution:** Manual builds (no auto-update)
**Connectivity:** Fully offline

### Technology Stack

**Core Stack:** Vanilla HTML / CSS / JavaScript
- No frameworks, no build tools, no npm
- Maximum LLM compatibility - most documented stack in existence
- Simple file structure: index.html, style.css, game.js (+ additional .js modules as needed)

**Development:** Run directly in browser (or local Python server for file access)

**Desktop Packaging (optional):** Neutralino.js
- ~2-3MB executable
- Pure JS - no Rust/compiled languages
- Add when .exe distribution is needed

### Architecture Principles

- Zero external dependencies where possible
- Vanilla JS over frameworks
- Simple, expandable file structure
- All development in VSCode

## Scoping & Risk Mitigation

### MVP Philosophy

**Approach:** Experience MVP - get the core loop feeling good before expanding.

Focus on delivering the "one more turn" feeling with minimal features. Resist adding Phase 2/3 features until MVP is validated and enjoyable.

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Simulation complexity | Start with simplified models, refine based on feel |
| Balancing | Playtest constantly, tune numbers iteratively |
| Scope creep | Stick to MVP, resist adding Phase 2 features early |
| Motivation | Get core loop working fast so you can actually play |

## Functional Requirements

### GPU Design

- FR1: Player can design a GPU by specifying core count
- FR2: Player can design a GPU by specifying VRAM amount
- FR3: Player can design a GPU by specifying clock speed
- FR4: Player can design a GPU by specifying TDP (power draw)
- FR5: Player can design a GPU by specifying die size
- FR6: Player can design a GPU by specifying nanometer process
- FR7: Player can view calculated performance metrics based on GPU specs
- FR8: Player can view manufacturing cost based on GPU specs
- FR9: Player can name their GPU product

### Product Launch & Business

- FR10: Player can set retail price for a GPU
- FR11: Player can allocate manufacturing volume
- FR12: Player can allocate marketing budget
- FR13: Player can target marketing toward specific consumer segments
- FR14: Player can launch a product to market (quarterly)
- FR15: Player can view unit sales over time
- FR16: Player can view revenue, costs, and profit

### Market Simulation

- FR17: System calculates market share based on price/performance of all products
- FR18: System simulates consumer purchasing behavior across segments
- FR19: System shifts consumer preferences over time
- FR20: System calculates realistic market size and TAM
- FR21: Game starts in 2022 (Intel Arc launch year)
- FR22: System simulates USA market only (MVP)
- FR23: USA demand derived from population and gaming adoption rate
- FR24: Population grows annually based on real growth rates
- FR25: Total GPU demand grows annually (tech adoption trends)
- FR26: All product launches occur on quarterly boundaries
- FR27: Market simulation ticks quarterly

### Competitor AI

- FR28: System simulates NVIDIA with realistic product portfolio and financials
- FR29: System simulates AMD with realistic product portfolio and financials
- FR30: System simulates Intel Arc with realistic product portfolio and financials
- FR31: Competitor product launches roughly match real history (within same quarter)
- FR32: Competitors launch new products over time
- FR33: Competitors react to player market share gains
- FR34: Competitors may strategically deprioritize market segments

### Feedback & Visualization

- FR35: Player can view market share chart over time
- FR36: Player can view competitor products and their specs
- FR37: Player can view news headlines reflecting market events
- FR38: Player can view competitor financials (revenue, R&D spend)
- FR39: Player can view own company financial dashboard
- FR40: Player can view USA market demand and trends

### Game Flow

- FR41: Player can start a new game
- FR42: Player can save game state
- FR43: Player can load saved game state
- FR44: Player can advance time (quarterly tick)
- FR45: Player can adjust simulation speed
- FR46: Player can pause simulation

## Non-Functional Requirements

### Performance

- NFR1: UI interactions respond within 100ms (no perceptible lag)
- NFR2: Quarterly simulation tick completes within 1 second
- NFR3: Game loads from save within 3 seconds
- NFR4: No frame drops or stuttering during normal gameplay
- NFR5: Memory usage stays stable over long sessions (no leaks)

### Data Accuracy

- NFR6: Real-world company financials are ballpark accurate (within 20% of actual scale)
- NFR7: Population and demographic data based on real statistics
- NFR8: GPU specs and performance relationships are logically consistent
- NFR9: Market simulation produces plausible outcomes (passes "sniff test")

### UI/UX Quality

- NFR10: UI aesthetic quality comparable to HOI4, Victoria 3, Software Inc
- NFR11: All information displays are readable and logically organized
- NFR12: No repetitive clicking required for common actions
- NFR13: Charts and visualizations are clear and informative

### Reliability

- NFR14: Zero tolerance for calculation errors
- NFR15: Save files never corrupt
- NFR16: No crashes during normal gameplay
