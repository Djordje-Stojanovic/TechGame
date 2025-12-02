# Story 1.1: Project Initialization

Status: Done

## Story

As a developer,
I want the project structure set up with all directories and configuration files,
So that I can start building game modules immediately.

## Acceptance Criteria

1. **Given** I have the TechGame directory **When** I run `npm install` and `npx tailwindcss -i ./src/css/input.css -o ./dist/output.css` **Then** the project compiles without errors

2. **And** the following directory structure exists:
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

3. **And** `tailwind.config.js` includes all design tokens from UX spec:
   - Colors: surface-base (#0a0a0a), surface-elevated (#141414), accent (#3b82f6)
   - Competitor colors: nvidia (#76b900), amd (#ed1c24), intel (#0071c5)
   - Font families: system-ui stack, monospace stack

4. **And** `index.html` loads `dist/output.css` and `src/js/main.js` (type="module")

5. **And** package.json only has tailwindcss as devDependency

## Tasks / Subtasks

- [x] Task 1: Initialize npm project (AC: #5)
  - [x] Run `npm init -y` to create package.json
  - [x] Install tailwindcss as devDependency: `npm install -D tailwindcss`
  - [x] Initialize tailwind config: `npx tailwindcss init`

- [x] Task 2: Create directory structure (AC: #2)
  - [x] Create `src/css/` directory
  - [x] Create `src/js/` directory
  - [x] Create `src/js/core/` directory
  - [x] Create `src/js/state/` directory
  - [x] Create `src/js/simulation/` directory
  - [x] Create `src/js/ui/` directory
  - [x] Create `src/js/data/` directory
  - [x] Create `src/js/utils/` directory
  - [x] Create `dist/` directory
  - [x] Add `.gitkeep` to empty directories if needed

- [x] Task 3: Configure Tailwind CSS (AC: #3)
  - [x] Update `tailwind.config.js` with complete design tokens
  - [x] Add surface colors: base (#0a0a0a), elevated (#141414), overlay (#1a1a1a)
  - [x] Add border colors with opacity values
  - [x] Add text colors: primary, secondary, muted
  - [x] Add accent colors with hover variant
  - [x] Add semantic colors: success, danger, warning, info
  - [x] Add competitor brand colors: nvidia, amd, intel
  - [x] Add font family definitions

- [x] Task 4: Create input.css (AC: #1, #3)
  - [x] Create `src/css/input.css` with Tailwind directives
  - [x] Add @tailwind base, components, utilities

- [x] Task 5: Create index.html (AC: #4)
  - [x] Create HTML5 boilerplate
  - [x] Link `dist/output.css` stylesheet
  - [x] Load `src/js/main.js` as ES6 module
  - [x] Set page title to "TechGame"
  - [x] Apply dark background to body

- [x] Task 6: Create main.js entry point (AC: #2)
  - [x] Create `src/js/main.js`
  - [x] Add placeholder initialization comment
  - [x] Use ES6 module format

- [x] Task 7: Build and verify (AC: #1)
  - [x] Run Tailwind build command
  - [x] Verify `dist/output.css` is generated
  - [x] Open `index.html` in browser and verify no console errors

## Dev Notes

### Architecture Compliance

**CRITICAL - Follow these patterns exactly:**

1. **ES6 Modules**: Use native browser ES6 modules (type="module"). No bundler, no transpilation.

2. **Named Exports Only**: All JS modules must use named exports, never default exports.
   ```javascript
   // ✅ Correct
   export function initialize() { }
   export const CONFIG = { };

   // ❌ Wrong
   export default { initialize, CONFIG };
   ```

3. **Kebab-Case Files**: All file names use kebab-case (e.g., `game-loop.js`, `market-engine.js`)

4. **Layer-Based Structure**:
   - `core/` - Game loop, time controls, initialization
   - `state/` - GameState object, save/load, validation
   - `simulation/` - Market engine, AI, calculations
   - `ui/` - DOM/SVG rendering, panels, components
   - `data/` - Static configs, starting data, constants
   - `utils/` - Pure helper functions (formatters, math)

5. **Import Flow Rules**:
   - `core/` can import from all layers
   - `simulation/` imports: state, data, utils
   - `ui/` imports: state, utils
   - `state/` imports: utils
   - `data/` and `utils/` have no imports

### Technology Stack

- **Vanilla JavaScript ES6+** - No frameworks, no React, no Vue
- **Tailwind CSS** - Utility-first CSS via npm
- **Native Browser Features** - ES6 modules, File System API for saves

### Design Tokens (from UX Spec)

Complete Tailwind config must include:

```javascript
module.exports = {
  content: ["./**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
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
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'Cascadia Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### Project Structure Notes

**Complete directory tree from Architecture:**
```
TechGame/
├── index.html
├── package.json
├── tailwind.config.js
├── .gitignore
├── src/
│   ├── css/
│   │   └── input.css
│   └── js/
│       ├── main.js
│       ├── core/
│       ├── state/
│       ├── simulation/
│       ├── ui/
│       │   ├── charts/
│       │   ├── panels/
│       │   └── components/
│       ├── data/
│       └── utils/
├── dist/
│   └── output.css
├── saves/
│   └── .gitkeep
└── docs/
```

### Testing Standards

- Open `index.html` in Chrome via local HTTP server
- Check browser console for any errors
- Verify Tailwind CSS compiled successfully
- Test that dark theme (#0a0a0a background) applies

### References

- [Source: docs/architecture.md#Starter Template Evaluation]
- [Source: docs/architecture.md#Project Structure & Boundaries]
- [Source: docs/ux-design-specification.md#Design System Foundation]
- [Source: docs/epics.md#Story 1.1: Project Initialization]

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

### Completion Notes List

- Initialized npm project with `npm init -y`
- Installed Tailwind CSS v3.4.18 (v4 was initially installed but uses different configuration approach, switched to v3 to match story requirements for tailwind.config.js)
- Created complete directory structure per architecture spec including ui/charts, ui/panels, ui/components subdirectories
- Added .gitkeep files to preserve empty directories in version control
- Configured tailwind.config.js with all design tokens from UX spec
- Created input.css with Tailwind directives
- Created index.html with dark theme body class and ES6 module script loading
- Created main.js with named export following architecture patterns
- Verified Tailwind build completes successfully (10KB output.css generated)
- All 5 acceptance criteria verified and passing

**Code Review Fixes (2025-12-02):**
- Updated browserslist database (caniuse-lite)
- Cleaned package.json: removed cruft fields (main, description, keywords, author, directories, type), added `build` and `watch` npm scripts
- Created README.md with setup and development instructions
- Fixed main.js: now auto-calls initialize() on module load (no dead code)

### File List

- .gitignore (created)
- package.json (created, updated in code review)
- package-lock.json (created)
- tailwind.config.js (created)
- index.html (created)
- README.md (created in code review)
- src/css/input.css (created)
- src/js/main.js (created, updated in code review)
- dist/output.css (generated, not tracked)
- src/js/core/.gitkeep (created)
- src/js/state/.gitkeep (created)
- src/js/simulation/.gitkeep (created)
- src/js/ui/charts/.gitkeep (created)
- src/js/ui/panels/.gitkeep (created)
- src/js/ui/components/.gitkeep (created)
- src/js/data/.gitkeep (created)
- src/js/utils/.gitkeep (created)
- saves/.gitkeep (created)
- node_modules/ (created, not tracked)
