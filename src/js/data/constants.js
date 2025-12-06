/**
 * Game Balance Constants
 * Single source of truth for all magic numbers.
 * Named exports only - use SCREAMING_SNAKE_CASE.
 *
 * Layer: data/ (no imports allowed)
 */

// Time System
/** Hours in a game day */
export const HOURS_PER_DAY = 24;

/** Days in a game month */
export const DAYS_PER_MONTH = 30;

/** Months in a game year */
export const MONTHS_PER_YEAR = 12;

/** Months in a game quarter */
export const MONTHS_PER_QUARTER = 3;

/** Days in a game quarter (derived: 30 * 3 = 90) */
export const DAYS_PER_QUARTER = DAYS_PER_MONTH * MONTHS_PER_QUARTER;

/** Hours in a game quarter (derived: 24 * 90 = 2160) */
export const HOURS_PER_QUARTER = HOURS_PER_DAY * DAYS_PER_QUARTER;

// Simulation Speed
/** Valid tick speeds for the game loop */
export const TICK_SPEEDS = [1, 2, 4];

/** Default tick speed when starting a new game */
export const DEFAULT_TICK_SPEED = 1;

// Game Start Conditions
/** Starting year for new games */
export const STARTING_YEAR = 2022;

/** Starting quarter for new games */
export const STARTING_QUARTER = 1;

/** Player starting capital ($10M) */
export const STARTING_CASH = 10_000_000;

// UI Views
/** All available view identifiers */
export const VIEWS = ['dashboard', 'market', 'design', 'competitors', 'financials'];

/** Default view when game starts */
export const DEFAULT_VIEW = 'dashboard';

// Market Segment Price Boundaries
/** Maximum price for budget segment ($299) */
export const BUDGET_MAX_PRICE = 299;

/** Maximum price for midrange segment ($599) */
export const MIDRANGE_MAX_PRICE = 599;
// High-end: $600+ (no upper limit)

// Company Identifiers
/** All company identifiers in the game */
export const COMPANY_IDS = ['player', 'nvidia', 'amd', 'intel'];

// Market Segment Identifiers
/** All market segment keys (prevents typos, enables validation) */
export const SEGMENT_KEYS = ['budget', 'midrange', 'highend'];
