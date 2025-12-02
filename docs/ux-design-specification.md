---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments:
  - docs/prd.md
  - docs/analysis/product-brief-TechGame-2025-12-01.md
workflowType: 'ux-design'
lastStep: 14
project_name: 'TechGame'
user_name: 'Djord'
date: '2025-12-02'
---

# UX Design Specification TechGame

**Author:** Djord
**Date:** 2025-12-02

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

TechGame is a personal tech industry sandbox simulation where players design GPUs with real specifications—cores, VRAM, clock speed, TDP, die size, nanometer process—and compete against NVIDIA, AMD, and Intel Arc in the consumer GPU market. The core experience centers on strategic anticipation: years of R&D investment paying off as competitors scramble to respond to your market-shaking product launches.

Built for a single player who loves deep strategy games (HOI4, Victoria 3, Software Inc), TechGame prioritizes technical depth that matters, reactive AI competitors, and the "one more turn" feeling of watching long-term investments reshape the market.

### Target Users

**Primary User: Tech-Savvy Strategist**
- Tech/IT/finance enthusiast who plays deep simulation and strategy games
- Expects beautiful, functional UI at HOI4/Victoria 3 tier
- Tolerates 15-minute learning curve but needs to feel depth quickly
- Motivated by anticipation of market impact from strategic investments
- Plays in ~1 hour sessions after work
- Zero tolerance for bugs, jank, or unpolished interactions

### Key Design Challenges

1. **Consequential Spec Decisions**: Making GPU design choices feel meaningful—each slider adjustment should communicate clear trade-offs between cost, performance, power, and market positioning

2. **Intelligent, Satisfying AI**: Competitor behavior must feel smart and logical. Watching NVIDIA pivot R&D, AMD undercut pricing, or Intel retreat from a segment should feel like observing real strategic minds at work—smooth, believable, satisfying to analyze

3. **Comprehensive Financial Visibility**: Players need full P/L transparency—cost breakdowns (design, R&D, per-part), manufacturing fees, taxes, profits, units sold, market share, and daily sales velocity. The numbers tell the story.

4. **GPU Comparison System**: On release, products must be compared against both that quarter's launches AND all historical products. Players need to see exactly where their GPU stands in the competitive landscape.

5. **Time System Balance**: 1 hour per tick at 1 tick/second means a day passes in 24 seconds. This pacing must feel right—fast enough to progress, slow enough to observe and react.

6. **Information Density Balance**: Expose deep simulation data (financials, market trends, competitor intelligence) without overwhelming—learnable complexity like HOI4

### Design Opportunities

1. **Cinematic Launch Moments**: Transform product launch day into an emotional peak with scrolling headlines, real-time market updates, comparative benchmarks against competition, and visible competitor reactions

2. **Competitor Intelligence as Core Gameplay**: Make watching and predicting competitor moves deeply engaging—their R&D allocations, strategic pivots, and market responses become a satisfying strategic layer to master

3. **GPU Designer as Creative Tool**: Elevate spec configuration beyond sliders to feel like crafting a competitive weapon with real-time feedback on projected costs, performance rankings, and market positioning

4. **Financial Dashboard as Narrative**: The P/L breakdown tells the story of your business—per-unit margins, daily sales velocity, market share trends. Numbers that make you feel the weight of your decisions

## Core User Experience

### Design Philosophy

**The Apple Standard**: Every interaction must feel beautiful, smooth, simple, and effortless—as Steve Jobs envisioned for Apple. No friction. No confusion. No ugly. This philosophy applies to EVERY element: buttons, charts, menus, transitions, feedback, data displays. If it doesn't feel like Apple designed it, it's wrong.

### Defining Experience

TechGame is an **observation game**. The core experience is watching your strategic investments play out against intelligent competitors in a living market.

**The Experience Loop:**
1. **Observe** - Watch the market, study competitors, see opportunities
2. **Design** - Craft a GPU to exploit what you've observed
3. **Invest** - Commit R&D time, manufacturing capacity, marketing spend
4. **Wait** - Time ticks forward, anticipation builds
5. **React** - Market responds, competitors move, adapt your strategy

The *designing* serves the *observing*. You design so you can watch what happens.

### Core Interaction: The Strategic Response

The critical experience is the **moment of strategic pressure**:

*A competitor releases a GPU that beats yours on raw TFLOPS and offers better FPS at the same price.*

Now you must choose:
- **Cut prices** → Erode margins, maintain volume
- **Hold prices** → Lose market share, preserve margins
- **Exit segment** → Extract remaining profit, pivot resources
- **Accelerate R&D** → Rush an upgraded model to market
- **Start fresh** → Begin a new architecture that leapfrogs them

This decision—under pressure, with real trade-offs, informed by visible data—IS the game. Everything else exists to create these moments and make them feel consequential.

### Platform Strategy

- **Platform:** Windows desktop application
- **Rendering:** Browser-based (vanilla HTML/CSS/JS)
- **Packaging:** Optional Neutralino.js for .exe distribution
- **Input:** Mouse + keyboard optimized
- **Connectivity:** Fully offline, zero external dependencies
- **Resolution:** Responsive design, optimized for 1080p+ displays

### Effortless Interactions

**Everything must be effortless. No exceptions.**

| Interaction | Must Feel Like |
|-------------|----------------|
| Checking competitor specs | Glancing at a dashboard—instant, always visible |
| Viewing P/L breakdown | One click, full transparency, beautifully formatted |
| Understanding market position | Visual hierarchy that communicates rank at a glance |
| Adjusting simulation speed | Seamless slider or hotkeys, zero interruption |
| Comparing products | Side-by-side, clear winners highlighted, no hunting |
| Reading financials | Clean tables, clear labels, logical groupings |
| Navigating between views | Instant transitions, no loading, no confusion |

### Critical Success Moments

1. **Product Launch** - The moment your GPU hits the market and benchmarks appear. Comparison against current quarter releases AND historical products. Clear visualization of where you stand.

2. **Market Reaction** - Watching market share shift in real-time. Daily sales velocity. Competitor stock prices moving. Headlines scrolling.

3. **Competitor Response** - Seeing AI competitors react. NVIDIA pivots R&D. AMD cuts prices. Intel reconsiders their roadmap. Smart, logical, satisfying to observe.

4. **Strategic Pressure** - The moment you're forced to respond. A competitor just beat you. What do you do? This decision, informed by beautiful data visualization, is the game.

### Experience Principles

1. **Observation Over Action**: The joy is in watching. Design interfaces that reward patient observation and make market dynamics visible and satisfying.

2. **Apple-Level Polish**: Beautiful, smooth, simple, effortless. Every pixel, every transition, every interaction. No exceptions, no compromises.

3. **Informed Decisions**: Every strategic choice should be supported by clear, accessible data. P/L breakdowns, market comparisons, competitor intelligence—always one glance away.

4. **Consequential Choices**: When you make a decision, you should *feel* the weight. Price cuts erode margins visibly. R&D investments delay other projects. Trade-offs are real and visible.

5. **Intelligent Opposition**: Competitors must feel smart. Their moves should be logical, their strategies readable, their responses satisfying to predict and observe.

## Desired Emotional Response

### Primary Emotional Goals

**The Core Feeling: Strategic Vindication**

TechGame should make the player feel like a mastermind whose long-term bets are paying off. The core emotional cocktail:

1. **Anticipation** - The slow build of tension as your investment approaches payoff. 100 days until launch. 5 years of R&D. The wait is part of the reward.

2. **Vindication** - The moment your strategy proves right. NVIDIA's market share drops. Headlines confirm your dominance. You were right.

3. **Strategic Mastery** - The satisfaction of reading the market correctly, predicting competitor moves, and outmaneuvering billion-dollar companies.

4. **Power** - You're not just playing a game. You're reshaping an industry. Competitors react to YOU.

**The "Tell a Friend" Moment:**
"I just designed a GPU that made NVIDIA pivot their entire product roadmap."

### Emotional Journey Mapping

| Stage | Desired Emotion | Design Implication |
|-------|-----------------|-------------------|
| First launch | **Awe + Curiosity** | Beautiful UI, visible depth, clear possibilities |
| Designing a GPU | **Creative Control** | Responsive sliders, real-time feedback, meaningful trade-offs |
| Waiting for launch | **Anticipation + Tension** | Countdown visibility, market monitoring, competitor tracking |
| Launch moment | **Excitement → Vindication/Pressure** | Cinematic reveal, comparative benchmarks, market reaction |
| Watching competitors | **Satisfaction** | Visible AI decision-making, logical reactions, satisfying animations |
| Strategic crisis | **Engaged Pressure** | Clear data for decision-making, meaningful options, recoverable situations |
| Long-term success | **Empire-Builder Pride** | Portfolio view, historical charts, legacy visualization |

### Micro-Emotions

**Emotions to Cultivate:**
- **Confidence** - Always know where you stand and what your options are
- **Trust** - The simulation feels fair, logical, and consistent
- **Excitement** - Each quarter tick could change everything
- **Accomplishment** - Every successful product launch feels earned
- **Curiosity** - What's the AI planning? What's the market doing?

**Emotions to Eliminate:**
- **Frustration** - Never from UI/UX. Only from strategic setbacks (which feel fair)
- **Confusion** - Everything is clear. Data is accessible. Never lost.
- **Boredom** - Smart AI and shifting markets keep engagement high
- **Overwhelm** - Deep but learnable. Complexity revealed at player's pace.
- **Distrust** - No hidden mechanics. No unfair AI advantages. Transparent simulation.

### Design Implications

| Emotional Goal | UX Design Approach |
|----------------|-------------------|
| Anticipation | Visible countdowns, progress bars for R&D, market trend indicators |
| Vindication | Celebration moments on successful launches, before/after comparisons, competitor reaction visibility |
| Strategic Mastery | Clear competitor intelligence, readable market data, historical pattern visibility |
| Power | News headlines featuring your company, competitor pivots in response to you, market share dominance charts |
| Creative Control | Responsive GPU designer, real-time cost/performance projections, spec comparison tools |
| Confidence | Always-visible key metrics, consistent UI patterns, predictable navigation |

### Emotional Design Principles

1. **Earned Satisfaction**: Every positive emotion should feel earned. Victories come from strategy, not luck. The UI celebrates success but never inflates it.

2. **Fair Pressure**: Strategic crises create engaged pressure, not frustration. The player always has options. The AI plays fair.

3. **Anticipation Architecture**: Build tension through visible countdowns, progress tracking, and market monitoring. The wait is part of the experience.

4. **Transparent Simulation**: Trust comes from understanding. Show how the market works. Show why competitors react. No black boxes.

5. **Beauty as Baseline**: The Apple Standard applies to emotional design too. A beautiful interface creates positive emotional priming before any action is taken.

## UX Pattern Analysis & Inspiration

### The Steve Jobs Standard

**The Ultimate Design Bar:**

This game shall feel like Apple put 20% of their free cash flow into it. Like Steve Jobs worked 6 days a week, 10 hours a day, for 3 years—and it was ABOVE iPhone on his priority list.

Every pixel. Every transition. Every hover state. Every click response. Every data visualization. Every font choice. Every spacing decision. Every color. Every animation. Every interaction.

**If Steve wouldn't ship it, neither do we.**

This standard applies to:
- The GPU designer interface
- The market visualization
- The competitor intelligence panels
- The financial dashboards
- The news feed
- The settings menu
- The loading states
- The error messages
- EVERYTHING

There is no "good enough." There is no "we'll polish it later." There is no "it's just a game."

This IS the bar. This IS the standard. This IS non-negotiable.

### Inspiring Products Analysis

#### Hearts of Iron 4 (HOI4)
**What they do exceptionally well:**
- Performant, fast, polished, beautiful, simple
- Complete AI transparency - see exactly what they're building (heavy tanks with mechanized, division compositions)
- Economy visibility - watch yours grow alongside competitors
- Information density that feels manageable

**What keeps you coming back:**
- Watching AI nations build, expand, and compete
- Clear visibility into both your progress and theirs
- The strategic depth revealed through observable AI behavior

**What to copy:** Almost everything - the performance standard, the polish, the AI transparency, the economic visibility.

**Limitation to address:** End-game stats screen shows global dominance data - TechGame needs this visible DURING gameplay, not just at the end.

#### Software Inc
**What they do exceptionally well:**
- Financial systems: company P/L, competitor financials, market share, IPOs
- Business simulation depth
- Startup replayability - different paths each playthrough

**What keeps you coming back:**
- Building different versions of startups
- The business/financial gameplay loop

**What NOT to copy:** Office/furniture design is clunky and tedious. No space management, no furniture placement, no physical building design in TechGame.

#### Computer Tycoon
**What they do exceptionally well:**
- Global world view with regional market dynamics
- See which company dominates which country, market, population segment
- Fan distribution, wealth distribution, market share by region
- Regional purchasing dynamics based on wealth (cheap products dominate poor countries, premium products in wealthy markets)
- Detailed competitive comparison: "AI's new PC has better CPU, that's why US buys 920/week vs my 320"

**What keeps you coming back:**
- Thrill of watching AI play, expand, dominate, compete
- Understanding WHY products sell: "Mine is cheap so India gives me 90% market share at 2000/day, but I only have 25% in US at 320/day"
- Population growth affecting market size over time
- Regional strategy depth

**Key insight to adopt:** The narrative of regional competition - understanding that your cheap GPU dominates India while NVIDIA owns the US premium market tells a STORY through data.

#### macOS / iOS (Apple)
**What they do exceptionally well:**
- Smooth, streamlined interactions
- Everything feels effortless and intentional
- Transitions and animations that enhance rather than slow down
- Visual hierarchy that guides without overwhelming

**What to copy:** The SOUL. TechGame doesn't just borrow Apple patterns—it BREATHES Apple. Every interaction feels like Steve personally approved it.

#### Bloomberg Terminal
**What they do exceptionally well:**
- Extreme information density that remains usable
- Real-time data visualization
- Professional-grade financial dashboards
- Data at a glance while supporting deep dives

**What to copy:** The ability to show massive amounts of financial data (P/L, market share, regional sales, competitor metrics) without feeling cluttered. Dense but readable. But make it BEAUTIFUL like Apple would.

### Transferable UX Patterns

**Navigation & Information Patterns:**
| Pattern | Source | Application in TechGame |
|---------|--------|------------------------|
| AI Transparency | HOI4 | See exactly what competitors are building, their R&D focus, strategic pivots |
| Global Market Map | Computer Tycoon | Regional view showing market share, fan distribution, sales velocity by country |
| Financial Dashboard | Software Inc + Bloomberg | Company and competitor P/L, margins, market share, IPO potential |
| Real-time Comparison | Computer Tycoon | Side-by-side product comparison showing WHY one outsells another |
| Economic Growth Visibility | HOI4 | Watch economies grow over time - yours and competitors |

**Interaction Patterns:**
| Pattern | Source | Application in TechGame |
|---------|--------|------------------------|
| Effortless Transitions | Apple | Every screen change, every hover, every click feels like Steve designed it |
| Information Density | Bloomberg | Show lots of data without clutter - dense but readable |
| Performance First | HOI4 | Zero lag, instant response, smooth simulation |
| Intentional Everything | Apple | No accidental design. Every element exists for a reason. |

**Visual Patterns:**
| Pattern | Source | Application in TechGame |
|---------|--------|------------------------|
| Steve Jobs Polish | Apple | Every pixel reviewed. Every detail considered. No compromises. |
| Data Storytelling | Computer Tycoon | Numbers that tell a narrative (why India loves your GPU) |
| Clean Hierarchy | iOS | Know where to look, what matters, what's secondary |
| Beautiful Density | Bloomberg + Apple | Bloomberg's data depth with Apple's visual refinement |

### Anti-Patterns to Avoid

| Anti-Pattern | Source | Why to Avoid |
|--------------|--------|--------------|
| Physical space management | Software Inc | Furniture/office design is tedious and off-topic for TechGame |
| End-game only stats | HOI4 | Global dominance data must be visible DURING play, not just at quit |
| Clunky interactions | Software Inc office designer | Anything that requires fiddly placement or micro-management |
| Hidden AI logic | Generic games | AI decisions must be observable and understandable |
| Slow/laggy performance | Any | Zero tolerance - HOI4-level performance is the bar |
| "Good enough" design | Anywhere | Steve wouldn't ship it. Neither do we. |
| Unpolished elements | Anywhere | Every pixel matters. Every interaction matters. No exceptions. |

### Design Inspiration Strategy

**ADOPT (Copy Directly):**
- HOI4's performance and polish standard
- HOI4's AI transparency (see what competitors are building)
- Software Inc's financial dashboard depth
- Computer Tycoon's global market view with regional dynamics
- Bloomberg's information density approach
- Apple's soul - the game BREATHES Apple design philosophy

**ADAPT (Modify for TechGame):**
- HOI4's end-game stats → Make visible during gameplay as live global market view
- Computer Tycoon's regional view → Focus on GPU market specifically, tie to consumer wealth/preferences
- Bloomberg density → Simplify for game context while maintaining depth, but make it BEAUTIFUL

**AVOID (Explicitly Reject):**
- Software Inc's office/furniture design - no physical space management
- Any clunky micro-management interactions
- Hidden or opaque AI decision-making
- Performance compromises of any kind
- Information that only appears at game end
- ANYTHING Steve Jobs wouldn't personally approve

**The Synthesis:**
TechGame should feel like Bloomberg Terminal had a baby with HOI4, raised by Apple, with Computer Tycoon's global market storytelling. Dense, beautiful, transparent, performant, and every number tells a story about why your GPU is crushing it in India while NVIDIA owns the US.

**But above all:** It should feel like Apple put 20% of FCF into this game. Like Steve Jobs worked 6 days a week, 10 hours a day, for 3 years—and this was ABOVE iPhone on his priority list.

The game doesn't just look like Apple designed it. It BREATHES Apple. It IS Apple-level. No compromises. No "good enough." No shortcuts.

**If Steve wouldn't ship it, we don't ship it.**

## Design System Foundation

### Design System Choice

**Tailwind CSS (Standard npm Installation)**

The most LLM-friendly choice. Standard Tailwind with npm is the most documented CSS approach in existence. LLMs have trained on millions of Tailwind examples, making development faster, more consistent, and less bug-prone.

### Rationale for Selection

1. **LLM Reliability**: LLMs produce consistent, predictable Tailwind code. `bg-blue-500 hover:bg-blue-600` works every time—no invented class names, no inconsistent patterns.

2. **Steve Jobs Standard Achievable**: Tailwind is fully customizable. Apple-level polish is absolutely achievable—many world-class sites use Tailwind. Custom CSS can supplement where needed.

3. **Speed**: Utility-first means faster iteration. No context-switching between HTML and CSS files.

4. **Documentation**: The most documented CSS framework. When the LLM needs to look something up, it knows Tailwind.

5. **Consistency**: Design tokens built into `tailwind.config.js`. Colors, spacing, typography—all centralized.

### Implementation Approach

**Setup:**
```bash
npm init -y
npm install -D tailwindcss
npx tailwindcss init
```

**File Structure:**
```
/src
  /css
    input.css          # Tailwind directives + custom CSS
  /js
    game.js            # Game logic
index.html             # Main game file
tailwind.config.js     # Design tokens, custom colors, spacing
```

**Build Command:**
```bash
npx tailwindcss -i ./src/css/input.css -o ./dist/output.css --watch
```

**input.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom CSS for anything Tailwind can't handle */
```

### Customization Strategy

**tailwind.config.js — The Source of Truth:**
```javascript
module.exports = {
  content: ["./**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        // TechGame brand colors
        'surface': '#0a0a0a',
        'surface-elevated': '#141414',
        'accent': '#0066ff',
        'success': '#00cc66',
        'warning': '#ffaa00',
        'danger': '#ff3333',
      },
      fontFamily: {
        'display': ['SF Pro Display', 'system-ui', 'sans-serif'],
        'mono': ['SF Mono', 'monospace'],
      },
      spacing: {
        // Custom spacing if needed
      }
    }
  },
  plugins: []
}
```

**Custom Components via @apply:**
```css
@layer components {
  .btn-primary {
    @apply bg-accent hover:bg-accent/90 text-white font-medium px-4 py-2 rounded-lg transition-all;
  }

  .card {
    @apply bg-surface-elevated rounded-xl border border-white/5 p-6;
  }

  .data-cell {
    @apply font-mono text-sm tabular-nums;
  }
}
```

### The Steve Jobs Standard with Tailwind

Tailwind is the foundation, not the ceiling. Every element must still meet the Apple standard:

- **Transitions**: Add `transition-all duration-200` to everything interactive
- **Hover States**: Every clickable element needs a hover state
- **Focus States**: Keyboard navigation must be beautiful
- **Spacing**: Use consistent spacing scale, never arbitrary values
- **Colors**: Define the palette in config, never use arbitrary colors
- **Typography**: Font sizes, weights, line-heights—all from the system

**If Steve wouldn't ship it, we don't ship it.** Tailwind makes it easier to ship consistently—but the bar remains unchanged.

## Defining Experience

### The Core Experience Statement

> "In my game you can outdesign NVIDIA on the same node if you are smart, outsell them, push them off a market, outcompete them, and fundamentally bankrupt them. And you can watch all that in a fucking beautiful chart that is going to show you crushing them."

This is TechGame. Everything else exists to serve this moment.

### 2.1 Defining Experience

**"Crush the giants and watch it happen."**

The defining experience of TechGame is strategic domination visualized beautifully. You don't just win—you WATCH yourself win. The chart showing NVIDIA's market share collapsing while yours rises IS the game.

**The One-Sentence Pitch:**
"Outdesign NVIDIA, outsell them, outcompete them, bankrupt them—and watch it all unfold in a beautiful chart."

**What Makes This Special:**
- You're not fighting abstract enemies—you're crushing NVIDIA, AMD, Intel
- Victory isn't a score—it's watching real companies crumble
- The visualization IS the reward—a beautiful chart of your domination
- Same node, same tools—you win because you're SMARTER

### 2.2 User Mental Model

**How the Player Thinks:**
- "If I design a better GPU at the right price, I should take their market share"
- "If I keep winning, they should eventually fail"
- "I want to SEE my success—not just be told about it"
- "The AI should fight back, but I should be able to beat them if I'm smart"

**Expectations:**
- Cause and effect should be visible and logical
- Market share charts should update in real-time
- Competitor health (revenue, margins, stock price) should visibly decline
- Bankruptcy should be achievable—not just "losing some share"

**Mental Model for Victory:**
The player expects a STORY told through data:
1. I design a better GPU
2. My market share rises
3. Their market share falls
4. Their revenue drops
5. Their margins compress
6. They cut R&D
7. Their products get worse
8. I take MORE share
9. Death spiral
10. Bankruptcy

Each step should be VISIBLE in the UI.

### 2.3 Success Criteria

**The Core Experience Succeeds When:**

| Criteria | What It Means |
|----------|---------------|
| Crushing feels earned | Victory comes from smart design choices, not luck |
| Victory is visible | Charts, numbers, headlines all show your dominance |
| Competitors feel real | NVIDIA's decline feels like NVIDIA dying, not "enemy 1" |
| The chart is beautiful | Steve Jobs would approve of this visualization |
| Bankruptcy is achievable | You can actually kill NVIDIA if you play well enough |
| The journey is satisfying | Every step of their decline is visible and enjoyable |

**Success Indicators:**
- Player takes a screenshot of the market share chart to show friends
- Player says "I bankrupted NVIDIA" not "I won the game"
- The decline chart becomes the memorable image of the game
- Players watch the chart for minutes, just enjoying the visualization

### 2.4 Experience Patterns

**Established Patterns We're Using:**
- Line charts for market share over time (Bloomberg, trading apps)
- Real-time data updates (stock tickers, sports scores)
- Competitor dashboards (business games, strategy games)

**Novel Patterns We're Creating:**
- **The Crushing Chart**: A single beautiful visualization that tells the complete story of your domination. Not just "you won"—but the full narrative arc of their destruction.
- **Death Spiral Visibility**: Showing the cascading effects of competition (revenue → margins → R&D cuts → worse products → more share loss)
- **Bankruptcy as Endgame**: Most games don't let you actually KILL the competition. TechGame does.

**The Innovation:**
The crushing chart isn't just data—it's NARRATIVE. It tells the story of how you, a nobody, systematically destroyed a trillion-dollar company through superior strategy.

### 2.5 Experience Mechanics

**The Crushing Chart — Core Visualization:**

**What It Shows:**
- Market share over time (your line rising, theirs falling)
- Key events marked (your launches, their launches, price cuts, bankruptcies)
- Multiple competitors tracked simultaneously
- Time range adjustable (last quarter, last year, all time)

**Visual Requirements:**
- Apple-level beautiful—smooth lines, perfect colors, elegant typography
- Real-time updates—watch the lines move as simulation ticks
- Emotional design—your color is triumphant, their decline is visible
- Information density—lots of data, but never cluttered

**Interaction:**
- Hover for details at any point in time
- Click to see what caused a shift
- Zoom in/out on time ranges
- Toggle competitors on/off

**The Moment of Crushing:**

1. **Your GPU launches** → Your line ticks up, their line ticks down
2. **Headlines appear** → "NVIDIA loses ground to newcomer"
3. **Their response** → Price cuts (visible), R&D pivot (visible)
4. **The spiral** → Each quarter, the gap widens
5. **The kill** → Their line hits zero. Bankruptcy announced.
6. **The screenshot** → Player captures the chart showing complete domination

**If Steve wouldn't ship this chart, we don't ship the game.**

## Visual Design Foundation

### Color System

**Theme: Dark Professional**

A dark theme optimized for long sessions, data density, and the Steve Jobs standard. Cool blues for trust and professionalism, with semantic colors for market data.

**Core Palette:**

| Token | Hex | Usage |
|-------|-----|-------|
| `surface-base` | `#0a0a0a` | App background |
| `surface-elevated` | `#141414` | Cards, panels |
| `surface-overlay` | `#1a1a1a` | Modals, dropdowns |
| `border-subtle` | `#ffffff0d` | Subtle dividers (5% white) |
| `border-default` | `#ffffff1a` | Default borders (10% white) |
| `text-primary` | `#ffffff` | Primary text |
| `text-secondary` | `#a1a1a1` | Secondary text |
| `text-muted` | `#6b6b6b` | Disabled, hints |

**Accent Colors:**

| Token | Hex | Usage |
|-------|-----|-------|
| `accent` | `#3b82f6` | Primary actions, links, your company |
| `accent-hover` | `#2563eb` | Hover states |

**Semantic Colors (Data):**

| Token | Hex | Usage |
|-------|-----|-------|
| `success` | `#22c55e` | Gains, positive trends, your rising line |
| `danger` | `#ef4444` | Losses, negative trends, competitors falling |
| `warning` | `#f59e0b` | Caution, neutral changes |
| `info` | `#06b6d4` | Informational, neutral data |

**Competitor Brand Colors:**

| Token | Hex | Usage |
|-------|-----|-------|
| `nvidia` | `#76b900` | NVIDIA's line on charts |
| `amd` | `#ed1c24` | AMD's line on charts |
| `intel` | `#0071c5` | Intel's line on charts |
| `player` | `#3b82f6` | Your company (matches accent) |

**Tailwind Config:**
```javascript
colors: {
  surface: {
    base: '#0a0a0a',
    elevated: '#141414',
    overlay: '#1a1a1a',
  },
  border: {
    subtle: 'rgba(255,255,255,0.05)',
    default: 'rgba(255,255,255,0.1)',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a1a1a1',
    muted: '#6b6b6b',
  },
  accent: {
    DEFAULT: '#3b82f6',
    hover: '#2563eb',
  },
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#06b6d4',
  nvidia: '#76b900',
  amd: '#ed1c24',
  intel: '#0071c5',
}
```

### Typography System

**Primary Font: System UI Stack**

Fast, native, Apple-quality on Mac, clean on Windows. Zero loading time.

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Monospace Font: System Mono**

For financial data, specs, numbers. Bloomberg density.

```css
font-family: 'SF Mono', 'Cascadia Code', 'Consolas', monospace;
```

**Type Scale:**

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-xs` | 11px | 400 | Fine print, timestamps |
| `text-sm` | 13px | 400 | Secondary info, labels |
| `text-base` | 15px | 400 | Body text |
| `text-lg` | 17px | 500 | Emphasized body |
| `text-xl` | 20px | 600 | Section headers |
| `text-2xl` | 24px | 600 | Panel titles |
| `text-3xl` | 30px | 700 | Page titles |
| `text-4xl` | 36px | 700 | Hero numbers (market share %) |

**Data Typography:**

| Usage | Style |
|-------|-------|
| Financial numbers | Monospace, tabular-nums, right-aligned |
| Percentages | Monospace, color-coded (green up, red down) |
| Currency | Monospace, 2 decimal places |
| Dates | Monospace, consistent format |

### Spacing & Layout Foundation

**Base Unit: 4px**

All spacing derives from 4px increments. Tailwind default scale.

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight gaps |
| `space-2` | 8px | Icon padding, small gaps |
| `space-3` | 12px | Button padding |
| `space-4` | 16px | Card padding, section gaps |
| `space-6` | 24px | Panel padding |
| `space-8` | 32px | Section separation |
| `space-12` | 48px | Major section breaks |

**Layout Principles:**

1. **Dense but breathable** — Bloomberg data density, Apple spacing rhythm
2. **Consistent gutters** — 16px between cards, 24px panel padding
3. **Visual hierarchy through spacing** — More space = more importance
4. **No arbitrary values** — Always use the scale

**Grid System:**

- 12-column grid for complex layouts
- Flexible sidebars (collapsible)
- Main content area fluid
- Fixed-width data panels for consistency

### Accessibility Considerations

**Contrast Ratios (WCAG AA Compliant):**

| Combination | Ratio | Status |
|-------------|-------|--------|
| text-primary on surface-base | 21:1 | ✅ Pass |
| text-secondary on surface-base | 7.4:1 | ✅ Pass |
| text-muted on surface-base | 4.6:1 | ✅ Pass |
| accent on surface-base | 4.5:1 | ✅ Pass |
| success on surface-base | 5.2:1 | ✅ Pass |
| danger on surface-base | 4.6:1 | ✅ Pass |

**Additional Accessibility:**

- All interactive elements have visible focus states
- Color is never the only indicator (icons + color for status)
- Minimum touch target 44x44px for any clickable element
- Reduced motion option respects `prefers-reduced-motion`

**If Steve wouldn't ship it, we don't ship it.** This visual foundation ensures every pixel meets the Apple standard.

## Design Direction

### Chosen Direction: "Bloomberg Meets Apple"

A single, unified design direction based on our established principles:

**The Vision:**
Bloomberg Terminal's information density married with Apple's polish. Dark, professional, data-rich, but every pixel intentional. A strategy game interface that feels like a premium financial tool.

### Layout Architecture

**Primary Layout: Dashboard with Contextual Panels**

```
┌─────────────────────────────────────────────────────────────┐
│  Top Bar: Date/Time | Speed Controls | Company Stats       │
├────────────┬────────────────────────────────────────────────┤
│            │                                                │
│  Left      │           Main Content Area                    │
│  Sidebar   │                                                │
│            │    (Charts, GPU Designer, Market View)         │
│  - Market  │                                                │
│  - Company │                                                │
│  - Design  │                                                │
│  - Intel   │                                                │
│            │                                                │
├────────────┴────────────────────────────────────────────────┤
│  Bottom: News Ticker / Event Log                            │
└─────────────────────────────────────────────────────────────┘
```

**Key Layout Decisions:**

| Element | Approach |
|---------|----------|
| Navigation | Left sidebar, icon + label, collapsible |
| Main Content | Single focus area, context-dependent |
| Data Panels | Right slide-out for details |
| Charts | Full-width when focused, thumbnail in sidebar |
| Time Controls | Always visible top bar |
| News Feed | Persistent bottom ticker |

### Interaction Patterns

**Core Interactions:**

| Interaction | Pattern |
|-------------|---------|
| Navigation | Click sidebar → Main content swaps instantly |
| Hover | Subtle highlight, tooltip after 300ms delay |
| Click | Immediate response, no loading states |
| Drag | GPU spec sliders, smooth with value preview |
| Scroll | Smooth, momentum-based |

**Transitions:**

- View switches: 150ms fade/slide
- Panel open/close: 200ms ease-out
- Data updates: Animated number changes
- Chart updates: Smooth line interpolation

### Component Strategy

**Primary Components:**

| Component | Purpose | Style |
|-----------|---------|-------|
| Card | Container for data groups | Elevated surface, subtle border |
| Chart | Market share, financials | Full-width, interactive, beautiful |
| Table | Product specs, comparisons | Dense, monospace numbers, sortable |
| Slider | GPU spec inputs | Smooth, value preview, constraints visible |
| Button | Actions | Minimal, clear hierarchy (primary/secondary/ghost) |
| Badge | Status indicators | Color-coded, compact |
| Tooltip | Contextual info | Dark, appears on hover, rich content |

**The Crushing Chart (Hero Component):**

The market share chart is THE most important visual element:
- Full-width when focused
- Smooth animated lines
- Your color rising, their colors falling
- Event markers on timeline
- Hover for point-in-time details
- Time range selector
- Competitor toggles

### Visual Weight Distribution

**Information Hierarchy:**

1. **Hero Zone** (60% attention): The Crushing Chart / Active Task
2. **Context Zone** (25% attention): Sidebar navigation, company stats
3. **Ambient Zone** (15% attention): News ticker, timestamps, secondary data

**Density Zones:**

| Zone | Density | Example |
|------|---------|---------|
| Charts | Medium | Clear visualization, not cluttered |
| Data Tables | High | Bloomberg-style, monospace, compact |
| Controls | Low | Breathing room around buttons |
| Navigation | Medium | Clear icons, readable labels |

### Design Direction Rationale

**Why This Direction:**

1. **Matches Core Experience**: An observation game needs a dashboard, not a game UI
2. **Supports Data Density**: Bloomberg patterns handle the financial complexity
3. **Enables the Crushing Chart**: Full-width hero zone for the defining experience
4. **Feels Professional**: Dark theme + clean typography = serious strategy tool
5. **Steve Jobs Approved**: Every element intentional, nothing decorative

**What This Is NOT:**

- Not a colorful game UI with fantasy elements
- Not a minimal app with hidden features
- Not a cluttered spreadsheet
- Not a flashy dashboard with unnecessary animations

**This IS:**

A beautiful, professional strategy tool where crushing NVIDIA looks as satisfying as it feels.

## User Journey Flows

### Journey 1: First Launch — The Hook

**Goal:** Player understands the game and feels the depth within 15 minutes.

**Flow:**

```
Launch Game
    ↓
Main Menu (Beautiful, minimal)
    ↓
"New Game" → Company Setup
    ↓
Enter Company Name → Confirm
    ↓
Dashboard Loads (2022, Q1)
    ├─ Market Overview visible (NVIDIA 80%, AMD 18%, Intel 2%)
    ├─ Your Company Panel (Empty portfolio, starting capital)
    └─ "Design Your First GPU" prompt highlighted
    ↓
Click GPU Designer
    ↓
GPU Designer Opens
    ├─ Spec sliders: Cores, VRAM, Clock, TDP, Die Size, Process
    ├─ Real-time cost/performance preview
    └─ "This is my first GPU — make something competitive"
    ↓
Set Specs → Name GPU → Set Price → Launch
    ↓
Quarterly Tick Runs
    ↓
Results Appear
    ├─ Sales numbers
    ├─ Market share (tiny, but visible)
    ├─ News headline: "New entrant joins GPU market"
    └─ Revenue in company panel
    ↓
HOOK ACHIEVED: Player sees the loop works, wants to design something better
```

**Key UX Moments:**
- Dashboard must feel premium immediately (Steve Jobs standard)
- GPU Designer must be intuitive — sliders make sense
- First launch results must show VISIBLE impact (even if small)
- News headline validates player action

---

### Journey 2: The Core Loop — Design to Dominate

**Goal:** Player designs a competitive GPU, launches it, watches market react.

**Flow:**

```
Player Observes Market
    ├─ Crushing Chart shows current standings
    ├─ Competitor products visible (specs, prices, market share)
    └─ Player identifies opportunity (gap in mid-range, NVIDIA overpriced)
    ↓
Open GPU Designer
    ↓
Design Phase
    ├─ Adjust specs to target gap
    ├─ See real-time cost projection
    ├─ See estimated performance vs competition
    └─ Balance: Better specs = higher cost = lower margin OR higher price
    ↓
Finalize Design
    ├─ Name the GPU
    ├─ Set retail price
    ├─ Allocate marketing budget
    └─ Choose target segment (budget/mid-range/high-end)
    ↓
Queue for Launch (next quarter)
    ↓
Wait (anticipation builds)
    ├─ Watch competitors move
    ├─ Monitor market trends
    └─ Countdown visible
    ↓
Launch Quarter Arrives
    ↓
Launch Moment
    ├─ GPU enters market
    ├─ Comparison panel: Your GPU vs competition (that quarter + historical)
    ├─ Performance benchmarks
    └─ Price/performance ratio
    ↓
Market Reacts
    ├─ Sales start flowing
    ├─ Market share updates (Crushing Chart animates)
    ├─ News headlines appear
    └─ Competitor AI evaluates response
    ↓
Competitor Response (visible)
    ├─ NVIDIA cuts prices? → You see it
    ├─ AMD accelerates R&D? → You see it
    └─ Intel reconsiders segment? → You see it
    ↓
Loop Repeats: Observe → Design → Launch → Watch
```

**Key UX Moments:**
- Opportunity identification must be clear from data
- Design decisions must show real-time trade-offs
- Launch moment must feel CINEMATIC
- Competitor response must be VISIBLE and LOGICAL

---

### Journey 3: The Payoff — Crushing Them

**Goal:** Player's long-term strategy pays off, competitor enters death spiral.

**Flow:**

```
Multi-Year Setup
    ├─ Player invests heavily in R&D
    ├─ Delays short-term profits for long-term tech advantage
    └─ 80% of FCF into next-gen architecture
    ↓
Years of Waiting
    ├─ Competitors dominate current market
    ├─ Player's market share stays modest
    └─ BUT: R&D progress bar advancing toward breakthrough
    ↓
Breakthrough Achieved
    ├─ New architecture unlocked
    ├─ Performance leap visible in GPU Designer
    └─ Player designs flagship
    ↓
The Big Launch
    ↓
Launch Moment (CINEMATIC)
    ├─ GPU enters market
    ├─ Benchmarks DESTROY competition
    │   └─ "40% faster, 30% more efficient, same price"
    └─ Headlines: "Industry disrupted"
    ↓
Week 1
    ├─ Market share jumps
    ├─ Crushing Chart shows YOUR line rising rapidly
    └─ News feed explodes
    ↓
Month 1
    ├─ NVIDIA's share drops below 70%
    ├─ AMD panics (visible R&D pivot)
    └─ Intel reconsiders (visible strategy shift)
    ↓
Month 3
    ├─ NVIDIA below 50%
    ├─ Your share above 30%
    └─ Death spiral begins
    ↓
The Spiral (VISIBLE)
    ├─ Competitor revenue drops → R&D budget cuts
    ├─ R&D cuts → Worse products
    ├─ Worse products → More share loss
    └─ Each step VISIBLE in UI
    ↓
The Kill
    ├─ Competitor revenue can't sustain operations
    ├─ Bankruptcy announcement
    └─ News headline: "NVIDIA files for bankruptcy"
    ↓
THE SCREENSHOT MOMENT
    └─ Crushing Chart shows complete domination
```

**Key UX Moments:**
- Long-term investment must feel like a CHOICE (sacrifice now for later)
- Breakthrough moment must feel EARNED
- Launch must be the most CINEMATIC moment in the game
- Death spiral must be VISIBLE step by step
- Bankruptcy headline is the peak emotional moment

---

### Journey Patterns

**Common Patterns Across All Journeys:**

| Pattern | Implementation |
|---------|----------------|
| Observation First | Every action starts with observing data/market |
| Clear Trade-offs | Every decision shows what you gain AND lose |
| Visible Consequences | Every action has visible market reaction |
| AI Transparency | Competitor decisions are always explained |
| Anticipation Building | Countdowns and progress bars create tension |
| Cinematic Payoffs | Key moments (launches, bankruptcies) are celebrated |

### Flow Optimization Principles

1. **Minimum Clicks to Value**: Design GPU in <10 clicks, launch in <3
2. **Always Show Impact**: No action without visible consequence
3. **Never Hide AI Logic**: Player always knows WHY market shifted
4. **Build Anticipation**: Time between action and result creates tension
5. **Celebrate Victories**: Headlines, chart animations, sound for wins
6. **Make Failure Interesting**: Losing to smart AI is engaging, not frustrating

## Component Strategy

### Design System Coverage

**Tailwind CSS provides:**
- Utility classes for all styling (spacing, colors, typography, etc.)
- Responsive design utilities
- State variants (hover, focus, active, disabled)
- Animation utilities
- NO pre-built components

**Everything below is custom-built using Tailwind utilities.**

### Real-Time Architecture (CRITICAL)

**100% Real-Time. Zero Reloads. Everything Live.**

When the simulation clock ticks—hours pass, days pass, months pass, quarters close—EVERY piece of data updates automatically. No refresh buttons. No page reloads. No manual updates. The player watches the world change in real-time.

**What Updates Automatically:**
- Crushing Chart lines animate as market share shifts
- Financial statements update the moment a quarter closes
- Daily sales numbers tick up in real-time
- Competitor status changes as AI makes decisions
- News ticker populates as events occur
- Product performance metrics update continuously
- Cash position changes with every transaction
- Market cap adjusts with every share movement

**Technical Approach:**
- Reactive state management (all UI bound to simulation state)
- When simulation ticks → state updates → UI re-renders automatically
- No polling, no manual refresh, no stale data
- Smooth number transitions (animate from old value to new)
- Chart lines interpolate smoothly, not jump
- Everything feels ALIVE

**The Standard:**
If the player is watching the Crushing Chart and the clock ticks to a new quarter, they should SEE the lines move. Not click refresh. Not navigate away and back. The chart MOVES in front of their eyes.

This is non-negotiable. This IS the observation game.

### Core Components

#### The Crushing Chart

**Purpose:** The hero component. Market share visualization showing your rise and competitors' fall.

**Anatomy:**
- Line chart with multiple series (you + competitors)
- Time axis (quarters/years)
- Event markers (launches, price cuts, bankruptcies)
- Interactive hover states with point details
- Time range selector
- Competitor toggles

**States:**
- Default: All competitors visible
- Focused: Single competitor highlighted
- Hover: Point details tooltip
- Animating: Lines updating in real-time

**Real-Time Behavior:**
- New data points append smoothly as time passes
- Lines animate to new positions
- No flicker, no jump, no reload

**Technical:** Chart.js or custom SVG with Tailwind styling for controls.

---

#### GPU Designer

**Purpose:** The creative tool. Design GPUs with real specs and real-time feedback.

**Anatomy:**
- Spec sliders (Cores, VRAM, Clock, TDP, Die Size, Process)
- Real-time cost display
- Real-time performance estimate
- Comparison preview vs competition
- Name input
- Price input
- Launch button

**States:**
- Designing: Sliders active, feedback updating
- Valid: All specs within bounds
- Warning: Approaching constraints (power, cost)
- Ready: Name + price set, launch enabled

**Interaction:**
- Drag sliders → Instant cost/performance update
- No submit button for specs—changes are live

---

#### Competitor Card

**Purpose:** At-a-glance competitor status.

**Anatomy:**
- Company logo/name
- Market share (large number)
- Trend indicator (up/down arrow + %)
- Revenue bar
- R&D spend indicator
- Quick action: View details

**Variants:**
- Compact (sidebar)
- Expanded (full panel)
- Alert (when competitor makes move)

**Real-Time Behavior:**
- Market share number animates when it changes
- Trend arrow updates automatically
- Alert state triggers instantly when AI acts

---

#### Financial Panel

**Purpose:** Your company P/L at a glance.

**Anatomy:**
- Revenue (current quarter + trend)
- Costs breakdown (manufacturing, R&D, marketing)
- Profit/Loss (large, color-coded)
- Cash position
- Market cap (if public)

**States:**
- Healthy (green accents)
- Warning (yellow accents)
- Critical (red accents)

**Real-Time Behavior:**
- All numbers animate to new values as simulation progresses
- Quarter close triggers full update with smooth transitions
- Daily revenue ticks up as sales occur

---

#### Product Card

**Purpose:** Display a GPU product (yours or competitor's).

**Anatomy:**
- Product name
- Key specs (cores, VRAM, clock, TDP, process)
- Price
- Performance score
- Market segment badge
- Sales velocity (if active)

**Variants:**
- Compact (list view)
- Detailed (comparison view)
- Historical (discontinued products)

**Real-Time Behavior:**
- Sales velocity updates continuously
- Total units sold ticks up in real-time

---

#### News Ticker

**Purpose:** Ambient information feed showing market events.

**Anatomy:**
- Scrolling headlines
- Timestamp
- Category icon (launch, price cut, earnings, etc.)
- Click to expand details

**States:**
- Normal: Continuous scroll
- Paused: On hover
- Highlighted: Major event (your launch, bankruptcy)

**Real-Time Behavior:**
- New headlines appear instantly as events occur
- No manual refresh needed

---

#### Time Control Bar

**Purpose:** Always-visible simulation controls.

**Anatomy:**
- Current date display (Q1 2024)
- Speed controls (1x, 2x, 5x, 10x)
- Pause/Play button
- Skip to next quarter button

**States:**
- Playing (speed visible)
- Paused (clear indicator)
- Event pending (countdown to your launch)

---

#### Data Table

**Purpose:** Dense tabular data (products, financials, comparisons).

**Anatomy:**
- Sortable headers
- Monospace numbers (right-aligned)
- Row hover highlighting
- Color-coded values (green positive, red negative)
- Expandable rows for details

**States:**
- Default
- Sorted (indicator on column)
- Row selected
- Row expanded

**Real-Time Behavior:**
- Cell values animate when they change
- New rows appear smoothly
- Sort order updates if values change

---

#### Slider Input

**Purpose:** GPU spec input with constraints.

**Anatomy:**
- Label
- Current value display
- Slider track with filled portion
- Min/max labels
- Constraint indicators (red zones)

**States:**
- Default
- Dragging
- At constraint (visual warning)
- Disabled

---

#### Modal/Panel

**Purpose:** Contextual detail views.

**Anatomy:**
- Header with title
- Close button
- Scrollable content area
- Action buttons (if applicable)

**States:**
- Opening (animate in)
- Open
- Closing (animate out)

---

### Component Implementation Strategy

**Build Order (by user journey priority):**

**Phase 1 — Core Loop Components:**
1. Crushing Chart — The hero, must be perfect
2. GPU Designer — Core interaction
3. Time Control Bar — Always needed
4. Product Card — Comparison views

**Phase 2 — Dashboard Components:**
5. Financial Panel — Your company status
6. Competitor Card — AI status
7. News Ticker — Ambient feedback
8. Data Table — Detailed views

**Phase 3 — Polish Components:**
9. Modal/Panel — Detail views
10. Slider Input — Refined GPU designer
11. Tooltips — Contextual help

**Implementation Principles:**

1. **Real-Time First**: Every component subscribes to reactive state. When state changes, UI updates automatically. No exceptions.

2. **Tailwind First**: Every component uses Tailwind utilities. No custom CSS unless absolutely necessary.

3. **Component Extraction**: Build inline first, extract to reusable component when pattern repeats 3+ times.

4. **State via Classes**: Use Tailwind state variants (`hover:`, `focus:`, `disabled:`) for all states.

5. **Accessibility Built-in**: ARIA labels, keyboard navigation, focus indicators from day one.

6. **Animation Consistency**: Use `transition-all duration-200` as default, `duration-150` for micro-interactions. Numbers animate, charts interpolate, nothing jumps.

7. **Smooth & Effortless**: Everything must feel smooth. Every transition, every update, every interaction. Apple-level polish.

**If Steve wouldn't ship it, we don't ship it.** Every component meets the Apple standard before it's considered complete.

## UX Consistency Patterns

### Button Hierarchy

**Primary Action (Blue)**
- One per view maximum
- The main action: "Launch GPU", "Start Game", "Confirm"
- `bg-accent hover:bg-accent-hover text-white`

**Secondary Action (Ghost/Outline)**
- Supporting actions: "Cancel", "View Details", "Compare"
- `border border-border-default hover:bg-surface-elevated text-text-primary`

**Danger Action (Red)**
- Destructive actions: "Delete", "Discontinue Product"
- `bg-danger hover:bg-danger/90 text-white`
- Always require confirmation

**Text/Link Action**
- Inline actions, navigation links
- `text-accent hover:underline`

**Disabled State**
- All buttons: `opacity-50 cursor-not-allowed`
- Never hide—show why disabled via tooltip

---

### Feedback Patterns

**Success Feedback**
- Color: `success` green
- Duration: 3 seconds auto-dismiss
- Use for: Product launched, settings saved, action completed
- Animation: Slide in from top-right

**Error Feedback**
- Color: `danger` red
- Duration: Persist until dismissed
- Use for: Failed actions, validation errors
- Must include: What went wrong + how to fix

**Warning Feedback**
- Color: `warning` amber
- Duration: 5 seconds or until acknowledged
- Use for: Low cash, approaching constraint, competitor move

**Info Feedback**
- Color: `info` cyan
- Duration: 3 seconds
- Use for: Tips, neutral notifications, status updates

**Real-Time Event Feedback**
- News ticker for ambient events
- Toast for player-relevant events
- Modal for critical events (bankruptcy, major launch)

---

### Navigation Patterns

**Primary Navigation (Left Sidebar)**
- Always visible (collapsible on small screens)
- Icon + label for each section
- Active state: `bg-surface-elevated border-l-2 border-accent`
- Hover state: `bg-surface-elevated/50`

**View Switching**
- Click sidebar item → Main content swaps instantly
- No page reload, no loading spinner
- Transition: 150ms fade

**Breadcrumbs**
- Not needed—flat navigation structure
- Current view shown in top bar instead

**Back Navigation**
- Slide-out panels have close button
- Modals have close button + click-outside-to-close
- No browser back button dependency

---

### Data Display Patterns

**Numbers**
- Always monospace: `font-mono tabular-nums`
- Right-aligned in tables
- Animate on change (count up/down)
- Color-coded: green positive, red negative, white neutral

**Percentages**
- Always show direction: `+12.5%` or `-3.2%`
- Color-coded with trend
- Animate smoothly between values

**Currency**
- Format: `$1,234.56M` or `$1.2B`
- Monospace, right-aligned
- Animate on change

**Dates/Time**
- Format: `Q1 2024` for quarters, `Jan 15, 2024` for specific dates
- Relative time for recent: "2 days ago"
- Always visible current date in top bar

**Charts**
- Smooth line interpolation
- Animate new data points
- Hover shows tooltip with exact values
- Event markers on timeline

---

### Form Patterns

**Slider Inputs (GPU Designer)**
- Real-time value display
- Constraint zones highlighted (red)
- Smooth drag response
- No submit—changes are instant

**Text Inputs**
- Minimal: just border-bottom in default state
- Focus: full border with accent color
- Error: red border + message below
- Character count for names

**Dropdowns/Selects**
- Custom styled to match theme
- Smooth open/close animation
- Keyboard navigable

**Validation**
- Real-time as user types
- Red border + message for errors
- Green checkmark for valid (subtle)
- Never block—guide toward valid state

---

### Loading & Empty States

**Loading (Rare—most things are instant)**
- Skeleton screens for initial load only
- Never show spinners during gameplay
- Simulation runs client-side—no server waits

**Empty States**
- Clear message: "No products yet"
- Call to action: "Design your first GPU"
- Never leave blank—always guide user

**No Data**
- Charts show flat line or placeholder
- Tables show "No data for this period"
- Always explain WHY empty

---

### Modal & Panel Patterns

**Modals (Blocking)**
- Use for: Confirmations, critical decisions
- Centered, dimmed backdrop
- ESC or click-outside to close
- Animation: Scale up from 95% + fade

**Slide Panels (Non-blocking)**
- Use for: Details, comparisons, settings
- Slide from right
- Can interact with main content while open
- Animation: Slide 300ms ease-out

**Tooltips**
- Delay: 300ms before show
- Position: Auto (prefer top)
- Rich content allowed (specs, mini-charts)
- Dismiss on mouse leave

---

### Animation Patterns

**Micro-interactions**
- Duration: 150ms
- Easing: ease-out
- Use for: Button hover, focus states, toggles

**View Transitions**
- Duration: 200ms
- Easing: ease-out
- Use for: Panel open/close, view switch

**Data Animations**
- Duration: 300-500ms
- Easing: ease-in-out
- Use for: Number counting, chart line drawing

**Celebration Moments**
- Duration: 500ms+
- Use for: Product launch success, bankruptcy announcement
- Can be more elaborate—this is the payoff

**Performance Rule**
- Never animate during simulation tick processing
- All animations must be 60fps smooth
- Prefer CSS transitions over JS animation

---

### Keyboard Patterns

**Global Shortcuts**
- `Space` — Pause/Play simulation
- `1-5` — Speed controls
- `Escape` — Close modal/panel
- `?` — Show keyboard shortcuts

**Focus Navigation**
- Tab order: logical left-to-right, top-to-bottom
- Visible focus ring on all interactive elements
- Skip-to-main-content link (hidden until focused)

---

### Consistency Rules

1. **Same action, same appearance** — If it launches a product, it's always a primary blue button
2. **Same feedback, same pattern** — Success is always green toast from top-right
3. **Same data, same format** — Percentages always have sign and are color-coded
4. **Same animation, same timing** — Micro-interactions are always 150ms
5. **Real-time everything** — No action requires a refresh to see results

**If Steve wouldn't ship it, we don't ship it.** Every pattern must feel intentional, consistent, and polished.

## Responsive Design & Accessibility

### Platform Reality

**TechGame is a Windows 11 desktop application running in Chrome.**

- Platform: Windows 11 only
- Browser: Chrome only
- Resolutions: 1080p, 1440p, 4K
- Single user: the developer (Djord)

Nothing else. No edge cases. No legacy support.

### Supported Resolutions

| Resolution | Name | Layout |
|------------|------|--------|
| 1920x1080 | 1080p | Base layout, comfortable density |
| 2560x1440 | 1440p | More breathing room, larger charts |
| 3840x2160 | 4K | Maximum data density, all panels visible |

**Scaling Between Resolutions:**
- 1080p to 1440p: Fluid scaling, more whitespace
- 1440p to 4K: Fluid scaling, increased density

**No Support For:**
- 720p or below
- Ultrawide monitors (nice-to-have later, not MVP)
- Mobile, tablet, or touch devices
- Any browser other than Chrome
- Any OS other than Windows 11

### Accessibility (Practical)

**Keyboard Navigation (Essential for Speed):**
- `Space` — Pause/Play simulation
- `1-5` — Speed controls
- `Escape` — Close modals/panels
- `Tab` — Navigate UI elements
- `Enter` — Confirm actions

**Visual Clarity:**
- All contrast ratios already defined and passing
- Color + icon for all status indicators
- Visible focus states on all interactive elements

**Not Prioritized:**
- Screen reader support
- ARIA live regions
- Skip links
- High contrast mode

### Performance Requirements (CRITICAL)

**Real-Time is Non-Negotiable:**

| Requirement | Target |
|-------------|--------|
| Animation framerate | 60fps always |
| Simulation tick processing | < 16ms |
| UI re-render on state change | Instant |
| Chart update on new data | Smooth interpolation |
| Number animation | Smooth counting |

**What This Means:**
- When the clock ticks, EVERYTHING updates automatically
- No refresh buttons, no stale data, no manual updates
- Charts animate, numbers count, panels refresh—all in real-time
- Player watches the simulation unfold, never waits for UI

**Testing:**
- Chrome DevTools Performance profiling
- Memory usage over multi-hour sessions
- Frame rate monitoring during heavy simulation

**If Steve wouldn't ship it, we don't ship it.** Performance is part of polish.
