/**
 * Creates the initial game state object.
 * Called once when starting a new game.
 * @returns {Object} Fresh game state object (JSON-serializable)
 */
export function createInitialState() {
  return {
    // Time & simulation control (Story 1.3 handles rollover: hour→day→month→quarter→year)
    time: {
      currentHour: 0,
      currentDay: 1,
      currentMonth: 1,
      currentQuarter: 1,
      currentYear: 2022,
      tickSpeed: 1,
      paused: true
    },

    // Player company (name configurable in Story 6.6 new game setup)
    player: {
      name: "PlayerCorp",
      cash: 10000000,
      products: [],
      rdProjects: [],
      marketingBudget: 0
    },

    // AI competitors
    companies: {
      nvidia: {
        name: "NVIDIA",
        cash: 15000000000,
        products: [],
        rdProjects: [],
        marketingBudget: 0,
        rdFocus: null
      },
      amd: {
        name: "AMD",
        cash: 3000000000,
        products: [],
        rdProjects: [],
        marketingBudget: 0,
        rdFocus: null
      },
      intel: {
        name: "Intel Arc",
        cash: 25000000000,
        products: [],
        rdProjects: [],
        marketingBudget: 0,
        rdFocus: null
      }
    },

    // Market state
    market: {
      totalDemand: 50000000,
      segments: {
        budget: {
          name: "Budget",
          minPrice: 0,
          maxPrice: 299,
          demandShare: 0.40,
          priceWeight: 0.7,
          perfWeight: 0.3
        },
        midrange: {
          name: "Midrange",
          minPrice: 300,
          maxPrice: 599,
          demandShare: 0.40,
          priceWeight: 0.5,
          perfWeight: 0.5
        },
        highend: {
          name: "High-end",
          minPrice: 600,
          maxPrice: 999999,
          demandShare: 0.20,
          priceWeight: 0.3,
          perfWeight: 0.7
        }
      },
      preferences: {
        performanceWeight: 0.5,
        priceWeight: 0.5,
        efficiencyWeight: 0.0,
        brandWeight: 0.2
      }
    },

    // Products registry (key format: {company}-{name-slug}-{launchQuarter})
    products: {},

    // Historical data
    history: {
      daily: [],
      events: []
    },

    // UI state
    ui: {
      currentView: 'dashboard',
      selectedProduct: null,
      gpuDesigner: {
        specs: {
          cores: 4096,
          vram: 8,
          clockSpeed: 1.8,
          tdp: 200,
          dieSize: 300,
          nm: 7
        },
        name: '',
        price: 0
      }
    }
  };
}
