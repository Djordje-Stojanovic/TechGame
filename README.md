# TechGame

GPU industry tycoon simulation game.

## Setup

```bash
npm install
npm run build
```

## Development

Run Tailwind in watch mode (auto-rebuilds CSS when you change files):

```bash
npm run watch
```

Then open `index.html` in your browser.

## Project Structure

```
TechGame/
├── index.html          # Main entry point
├── src/
│   ├── css/input.css   # Tailwind directives
│   └── js/
│       ├── main.js     # Entry point
│       ├── core/       # Game loop, time controls
│       ├── state/      # Game state, save/load
│       ├── simulation/ # Market engine, AI
│       ├── ui/         # DOM rendering, panels
│       ├── data/       # Static configs, constants
│       └── utils/      # Helper functions
└── dist/output.css     # Generated (run npm run build)
```
