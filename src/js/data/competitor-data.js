/**
 * Competitor Starting Data
 * NVIDIA, AMD, Intel Arc profiles for 2022 baseline.
 * Cash figures are GPU division estimates (not total company value).
 *
 * Layer: data/ (no imports allowed)
 */

// Starting Cash (GPU division working capital estimate)
/** Competitor starting cash positions */
export const COMPETITOR_STARTING_CASH = {
  nvidia: 15_000_000_000, // $15B - dominant player
  amd: 3_000_000_000,     // $3B - competitive challenger
  intel: 25_000_000_000   // $25B - new entrant with deep pockets
};

// Brand Colors (from UX Spec)
/** Brand colors for all companies */
export const COMPETITOR_BRAND_COLORS = {
  nvidia: '#76b900', // NVIDIA green
  amd: '#ed1c24',    // AMD red
  intel: '#0071c5',  // Intel blue
  player: '#3b82f6'  // Accent blue
};

// Starting Market Share (Q1 2022 discrete GPU market)
/** Starting market share percentages */
export const STARTING_MARKET_SHARE = {
  nvidia: 0.80,  // ~80% - dominant
  amd: 0.18,     // ~18% - competitive
  intel: 0.02,   // ~2% - Arc just launching
  player: 0.00   // New entrant
};

/**
 * Complete competitor profiles with all simulation parameters.
 */
export const COMPETITOR_PROFILES = {
  nvidia: {
    id: 'nvidia',
    name: 'NVIDIA',
    displayName: 'NVIDIA Corporation',
    color: COMPETITOR_BRAND_COLORS.nvidia,
    startingCash: COMPETITOR_STARTING_CASH.nvidia,
    rdBudgetPercent: 0.20,        // 20% of revenue to R&D
    marketingBudgetPercent: 0.08, // 8% of revenue to marketing
    brandReputation: 0.95,        // Very strong brand (0-1)
    strengths: ['performance', 'software', 'mindshare'],
    weaknesses: ['pricing'],
    aiAggressiveness: 0.6         // Moderate - defends position
  },
  amd: {
    id: 'amd',
    name: 'AMD',
    displayName: 'Advanced Micro Devices',
    color: COMPETITOR_BRAND_COLORS.amd,
    startingCash: COMPETITOR_STARTING_CASH.amd,
    rdBudgetPercent: 0.22,        // 22% - higher R&D intensity
    marketingBudgetPercent: 0.06, // 6% - smaller marketing budget
    brandReputation: 0.75,        // Strong but not dominant (0-1)
    strengths: ['value', 'efficiency'],
    weaknesses: ['software', 'mindshare'],
    aiAggressiveness: 0.8         // Aggressive - challenger mentality
  },
  intel: {
    id: 'intel',
    name: 'Intel Arc',
    displayName: 'Intel Corporation',
    color: COMPETITOR_BRAND_COLORS.intel,
    startingCash: COMPETITOR_STARTING_CASH.intel,
    rdBudgetPercent: 0.25,        // 25% - heavy R&D investment
    marketingBudgetPercent: 0.10, // 10% - aggressive marketing for new entry
    brandReputation: 0.40,        // Low in GPU space (0-1)
    strengths: ['resources', 'manufacturing'],
    weaknesses: ['drivers', 'experience', 'reputation'],
    aiAggressiveness: 0.5         // Conservative - building presence
  }
};

/**
 * Placeholder for competitor starting products.
 * Populated in Story 2.2 with RTX 30 series, RX 6000 series, Arc A-series.
 */
export const COMPETITOR_PLACEHOLDER_PRODUCTS = {
  nvidia: [], // RTX 3090, 3080, 3070, 3060 added in Story 2.2
  amd: [],    // RX 6900 XT, 6800 XT, 6700 XT added in Story 2.2
  intel: []   // Arc A770, A750 added in Story 2.2
};
