// @vitest-environment jsdom

/**
 * Tests for Competitor Starting Products
 * Validates product data structure, specs, and market segment coverage.
 */

import { describe, it, expect } from 'vitest';
import {
  NVIDIA_PRODUCTS,
  AMD_PRODUCTS,
  INTEL_PRODUCTS,
  STARTING_PRODUCTS,
  getStartingProductIds
} from './starting-products.js';
import { getProductSegment } from './market-data.js';
import { COMPANY_IDS, SEGMENT_KEYS } from './constants.js';

// Product ID format pattern: {company}-{slug}-{year}q{quarter}
const ID_PATTERN = /^(nvidia|amd|intel)-[a-z0-9-]+-\d{4}q[1-4]$/;

// Required product fields
const REQUIRED_FIELDS = ['id', 'company', 'name', 'launchDate', 'discontinuedDate', 'specs', 'msrp', 'manufacturingCost', 'status'];
const REQUIRED_SPEC_FIELDS = ['cores', 'vram', 'clockSpeed', 'tdp', 'dieSize', 'nm'];

describe('NVIDIA_PRODUCTS', () => {
  it('contains 4 products', () => {
    expect(NVIDIA_PRODUCTS).toHaveLength(4);
  });

  it('RTX 3090/3080/3070 have launch Q3 2020', () => {
    const q3Products = NVIDIA_PRODUCTS.filter(p =>
      ['RTX 3090', 'RTX 3080', 'RTX 3070'].includes(p.name)
    );
    expect(q3Products).toHaveLength(3);
    q3Products.forEach(p => {
      expect(p.launchDate).toEqual({ quarter: 3, year: 2020 });
    });
  });

  it('RTX 3060 has launch Q1 2021', () => {
    const rtx3060 = NVIDIA_PRODUCTS.find(p => p.name === 'RTX 3060');
    expect(rtx3060).toBeDefined();
    expect(rtx3060.launchDate).toEqual({ quarter: 1, year: 2021 });
  });

  it('all have valid ID format {company}-{slug}-{year}q{quarter}', () => {
    NVIDIA_PRODUCTS.forEach(p => {
      expect(p.id).toMatch(ID_PATTERN);
      expect(p.id).toMatch(/^nvidia-/);
    });
  });

  it('all have complete specs object with 6 properties', () => {
    NVIDIA_PRODUCTS.forEach(p => {
      REQUIRED_SPEC_FIELDS.forEach(field => {
        expect(p.specs).toHaveProperty(field);
        expect(typeof p.specs[field]).toBe('number');
      });
    });
  });

  it('manufacturingCost is positive for all', () => {
    NVIDIA_PRODUCTS.forEach(p => {
      expect(p.manufacturingCost).toBeGreaterThan(0);
    });
  });

  it('RTX 3090 has correct specs (AC1)', () => {
    const rtx3090 = STARTING_PRODUCTS['nvidia-rtx-3090-2020q3'];
    expect(rtx3090.specs.cores).toBe(10496);
    expect(rtx3090.specs.vram).toBe(24);
    expect(rtx3090.specs.clockSpeed).toBeCloseTo(1.70, 1);
    expect(rtx3090.specs.tdp).toBe(350);
    expect(rtx3090.specs.dieSize).toBe(628);
    expect(rtx3090.specs.nm).toBe(8);
    expect(rtx3090.msrp).toBe(1499);
  });

  it('RTX 3080 has correct specs (AC2)', () => {
    const rtx3080 = STARTING_PRODUCTS['nvidia-rtx-3080-2020q3'];
    expect(rtx3080.specs.cores).toBe(8704);
    expect(rtx3080.specs.vram).toBe(10);
    expect(rtx3080.specs.clockSpeed).toBeCloseTo(1.71, 1);
    expect(rtx3080.specs.tdp).toBe(320);
    expect(rtx3080.specs.dieSize).toBe(628);
    expect(rtx3080.specs.nm).toBe(8);
    expect(rtx3080.msrp).toBe(699);
  });

  it('RTX 3070 has correct specs (AC3)', () => {
    const rtx3070 = STARTING_PRODUCTS['nvidia-rtx-3070-2020q3'];
    expect(rtx3070.specs.cores).toBe(5888);
    expect(rtx3070.specs.vram).toBe(8);
    expect(rtx3070.specs.clockSpeed).toBeCloseTo(1.73, 1);
    expect(rtx3070.specs.tdp).toBe(220);
    expect(rtx3070.specs.dieSize).toBe(392);
    expect(rtx3070.specs.nm).toBe(8);
    expect(rtx3070.msrp).toBe(499);
  });

  it('RTX 3060 has correct specs (AC4)', () => {
    const rtx3060 = STARTING_PRODUCTS['nvidia-rtx-3060-2021q1'];
    expect(rtx3060.specs.cores).toBe(3584);
    expect(rtx3060.specs.vram).toBe(12);
    expect(rtx3060.specs.clockSpeed).toBeCloseTo(1.78, 1);
    expect(rtx3060.specs.tdp).toBe(170);
    expect(rtx3060.specs.dieSize).toBe(276);
    expect(rtx3060.specs.nm).toBe(8);
    expect(rtx3060.msrp).toBe(329);
  });
});

describe('AMD_PRODUCTS', () => {
  it('contains 3 products', () => {
    expect(AMD_PRODUCTS).toHaveLength(3);
  });

  it('RX 6900 XT/6800 XT have launch Q4 2020', () => {
    const q4Products = AMD_PRODUCTS.filter(p =>
      ['RX 6900 XT', 'RX 6800 XT'].includes(p.name)
    );
    expect(q4Products).toHaveLength(2);
    q4Products.forEach(p => {
      expect(p.launchDate).toEqual({ quarter: 4, year: 2020 });
    });
  });

  it('RX 6700 XT has launch Q1 2021', () => {
    const rx6700xt = AMD_PRODUCTS.find(p => p.name === 'RX 6700 XT');
    expect(rx6700xt).toBeDefined();
    expect(rx6700xt.launchDate).toEqual({ quarter: 1, year: 2021 });
  });

  it('all have valid ID format', () => {
    AMD_PRODUCTS.forEach(p => {
      expect(p.id).toMatch(ID_PATTERN);
      expect(p.id).toMatch(/^amd-/);
    });
  });

  it('all have complete specs object with 6 properties', () => {
    AMD_PRODUCTS.forEach(p => {
      REQUIRED_SPEC_FIELDS.forEach(field => {
        expect(p.specs).toHaveProperty(field);
        expect(typeof p.specs[field]).toBe('number');
      });
    });
  });

  it('RX 6900 XT has correct specs (AC6)', () => {
    const rx6900xt = STARTING_PRODUCTS['amd-rx-6900-xt-2020q4'];
    expect(rx6900xt.specs.cores).toBe(5120);
    expect(rx6900xt.specs.vram).toBe(16);
    expect(rx6900xt.specs.clockSpeed).toBeCloseTo(2.25, 1);
    expect(rx6900xt.specs.tdp).toBe(300);
    expect(rx6900xt.specs.dieSize).toBe(519);
    expect(rx6900xt.specs.nm).toBe(7);
    expect(rx6900xt.msrp).toBe(999);
  });

  it('RX 6800 XT has correct specs (AC7)', () => {
    const rx6800xt = STARTING_PRODUCTS['amd-rx-6800-xt-2020q4'];
    expect(rx6800xt.specs.cores).toBe(4608);
    expect(rx6800xt.specs.vram).toBe(16);
    expect(rx6800xt.specs.clockSpeed).toBeCloseTo(2.25, 1);
    expect(rx6800xt.specs.tdp).toBe(300);
    expect(rx6800xt.specs.dieSize).toBe(519);
    expect(rx6800xt.specs.nm).toBe(7);
    expect(rx6800xt.msrp).toBe(649);
  });

  it('RX 6700 XT has correct specs (AC8)', () => {
    const rx6700xt = STARTING_PRODUCTS['amd-rx-6700-xt-2021q1'];
    expect(rx6700xt.specs.cores).toBe(2560);
    expect(rx6700xt.specs.vram).toBe(12);
    expect(rx6700xt.specs.clockSpeed).toBeCloseTo(2.58, 1);
    expect(rx6700xt.specs.tdp).toBe(230);
    expect(rx6700xt.specs.dieSize).toBe(336);
    expect(rx6700xt.specs.nm).toBe(7);
    expect(rx6700xt.msrp).toBe(479);
  });
});

describe('INTEL_PRODUCTS', () => {
  it('contains 2 products', () => {
    expect(INTEL_PRODUCTS).toHaveLength(2);
  });

  it('both have launch Q1 2022 (game start)', () => {
    INTEL_PRODUCTS.forEach(p => {
      expect(p.launchDate).toEqual({ quarter: 1, year: 2022 });
    });
  });

  it('all have valid ID format', () => {
    INTEL_PRODUCTS.forEach(p => {
      expect(p.id).toMatch(ID_PATTERN);
      expect(p.id).toMatch(/^intel-/);
    });
  });

  it('Arc A770 has correct specs (AC10)', () => {
    const arcA770 = STARTING_PRODUCTS['intel-arc-a770-2022q1'];
    expect(arcA770.specs.cores).toBe(4096);
    expect(arcA770.specs.vram).toBe(16);
    expect(arcA770.specs.clockSpeed).toBeCloseTo(2.10, 1);
    expect(arcA770.specs.tdp).toBe(225);
    expect(arcA770.specs.dieSize).toBe(406);
    expect(arcA770.specs.nm).toBe(6);
    expect(arcA770.msrp).toBe(349);
  });

  it('Arc A750 has correct specs (AC11)', () => {
    const arcA750 = STARTING_PRODUCTS['intel-arc-a750-2022q1'];
    expect(arcA750.specs.cores).toBe(3584);
    expect(arcA750.specs.vram).toBe(8);
    expect(arcA750.specs.clockSpeed).toBeCloseTo(2.05, 1);
    expect(arcA750.specs.tdp).toBe(225);
    expect(arcA750.specs.dieSize).toBe(406);
    expect(arcA750.specs.nm).toBe(6);
    expect(arcA750.msrp).toBe(289);
  });
});

describe('STARTING_PRODUCTS', () => {
  it('contains all 9 products', () => {
    expect(Object.keys(STARTING_PRODUCTS)).toHaveLength(9);
  });

  it('all accessible by ID key', () => {
    const expectedIds = [
      'nvidia-rtx-3090-2020q3',
      'nvidia-rtx-3080-2020q3',
      'nvidia-rtx-3070-2020q3',
      'nvidia-rtx-3060-2021q1',
      'amd-rx-6900-xt-2020q4',
      'amd-rx-6800-xt-2020q4',
      'amd-rx-6700-xt-2021q1',
      'intel-arc-a770-2022q1',
      'intel-arc-a750-2022q1'
    ];
    expectedIds.forEach(id => {
      expect(STARTING_PRODUCTS[id]).toBeDefined();
      expect(STARTING_PRODUCTS[id].id).toBe(id);
    });
  });

  it('no duplicate IDs', () => {
    const ids = Object.keys(STARTING_PRODUCTS);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all products have required fields (AC13)', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      REQUIRED_FIELDS.forEach(field => {
        expect(product).toHaveProperty(field);
      });
    });
  });

  it('all products have active status and null discontinuedDate (AC16)', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      expect(product.status).toBe('active');
      expect(product.discontinuedDate).toBeNull();
    });
  });

  it('all manufacturingCost values are positive numbers (AC17)', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      expect(typeof product.manufacturingCost).toBe('number');
      expect(product.manufacturingCost).toBeGreaterThan(0);
    });
  });
});

describe('getStartingProductIds', () => {
  const competitors = COMPANY_IDS.filter(id => id !== 'player');

  it('returns 4 IDs for nvidia', () => {
    const ids = getStartingProductIds('nvidia');
    expect(ids).toHaveLength(4);
  });

  it('returns 3 IDs for amd', () => {
    const ids = getStartingProductIds('amd');
    expect(ids).toHaveLength(3);
  });

  it('returns 2 IDs for intel', () => {
    const ids = getStartingProductIds('intel');
    expect(ids).toHaveLength(2);
  });

  it('returns empty array for player', () => {
    const ids = getStartingProductIds('player');
    expect(ids).toEqual([]);
  });

  it('returns empty array for unknown company', () => {
    const ids = getStartingProductIds('unknown');
    expect(ids).toEqual([]);
  });

  competitors.forEach(company => {
    it(`returns only IDs belonging to ${company}`, () => {
      const ids = getStartingProductIds(company);
      ids.forEach(id => {
        expect(id).toMatch(new RegExp(`^${company}-`));
        expect(STARTING_PRODUCTS[id].company).toBe(company);
      });
    });
  });
});

describe('Product ID Format Validation', () => {
  it('all product IDs match expected format', () => {
    Object.keys(STARTING_PRODUCTS).forEach(id => {
      expect(id).toMatch(ID_PATTERN);
    });
  });

  it('product ID matches product company', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      expect(product.id).toMatch(new RegExp(`^${product.company}-`));
    });
  });
});

describe('Market Segment Coverage', () => {
  it('Arc A750 ($289) is in budget segment', () => {
    const arcA750 = STARTING_PRODUCTS['intel-arc-a750-2022q1'];
    expect(getProductSegment(arcA750.msrp)).toBe('budget');
  });

  it('RTX 3070, 3060, RX 6700 XT, Arc A770 are in midrange segment', () => {
    const midrangeProducts = [
      'nvidia-rtx-3070-2020q3',
      'nvidia-rtx-3060-2021q1',
      'amd-rx-6700-xt-2021q1',
      'intel-arc-a770-2022q1'
    ];
    midrangeProducts.forEach(id => {
      const product = STARTING_PRODUCTS[id];
      expect(getProductSegment(product.msrp)).toBe('midrange');
    });
  });

  it('RTX 3090, 3080, RX 6900 XT, 6800 XT are in highend segment', () => {
    const highendProducts = [
      'nvidia-rtx-3090-2020q3',
      'nvidia-rtx-3080-2020q3',
      'amd-rx-6900-xt-2020q4',
      'amd-rx-6800-xt-2020q4'
    ];
    highendProducts.forEach(id => {
      const product = STARTING_PRODUCTS[id];
      expect(getProductSegment(product.msrp)).toBe('highend');
    });
  });

  it('products cover all segments', () => {
    const segments = Object.values(STARTING_PRODUCTS).map(p => getProductSegment(p.msrp));
    SEGMENT_KEYS.forEach(segment => {
      expect(segments).toContain(segment);
    });
  });

  it('segment distribution is reasonable for market simulation', () => {
    const segments = Object.values(STARTING_PRODUCTS).map(p => getProductSegment(p.msrp));
    expect(segments.filter(s => s === 'budget').length).toBeGreaterThanOrEqual(1);
    expect(segments.filter(s => s === 'midrange').length).toBeGreaterThanOrEqual(2);
    expect(segments.filter(s => s === 'highend').length).toBeGreaterThanOrEqual(3);
  });
});

describe('LaunchDate Format Validation (AC15)', () => {
  it('all launchDates have quarter 1-4', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      expect(product.launchDate.quarter).toBeGreaterThanOrEqual(1);
      expect(product.launchDate.quarter).toBeLessThanOrEqual(4);
    });
  });

  it('all launchDates have realistic year (2020-2022)', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      expect(product.launchDate.year).toBeGreaterThanOrEqual(2020);
      expect(product.launchDate.year).toBeLessThanOrEqual(2022);
    });
  });
});

describe('Specs Validation (AC14)', () => {
  it('all products have realistic core counts', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      expect(product.specs.cores).toBeGreaterThanOrEqual(2000);
      expect(product.specs.cores).toBeLessThanOrEqual(15000);
    });
  });

  it('all products have realistic VRAM (8-24GB)', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      expect(product.specs.vram).toBeGreaterThanOrEqual(8);
      expect(product.specs.vram).toBeLessThanOrEqual(24);
    });
  });

  it('all products have realistic clock speeds (1.5-3.0GHz)', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      expect(product.specs.clockSpeed).toBeGreaterThanOrEqual(1.5);
      expect(product.specs.clockSpeed).toBeLessThanOrEqual(3.0);
    });
  });

  it('all products have realistic TDP (150-400W)', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      expect(product.specs.tdp).toBeGreaterThanOrEqual(150);
      expect(product.specs.tdp).toBeLessThanOrEqual(400);
    });
  });

  it('all products have realistic die size (200-700mm²)', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      expect(product.specs.dieSize).toBeGreaterThanOrEqual(200);
      expect(product.specs.dieSize).toBeLessThanOrEqual(700);
    });
  });

  it('all products have realistic process node (5-10nm)', () => {
    Object.values(STARTING_PRODUCTS).forEach(product => {
      expect(product.specs.nm).toBeGreaterThanOrEqual(5);
      expect(product.specs.nm).toBeLessThanOrEqual(10);
    });
  });
});
