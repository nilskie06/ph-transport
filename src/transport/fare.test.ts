// src/transport/fare.test.ts
import { describe, it, expect } from 'vitest';
import { calculateFare, getFareBreakdown, compareFares } from './fare.js';

describe('calculateFare', () => {
  it('should calculate fare for car', () => {
    const fare = calculateFare(10, 'car');
    expect(fare).toBe(120); // 10 km * 12 PHP/km
  });

  it('should calculate fare for bus with base fare', () => {
    const fare = calculateFare(10, 'bus');
    expect(fare).toBe(40); // 15 base + (10 * 2.5)
  });

  it('should return 0 for walking', () => {
    const fare = calculateFare(10, 'walking');
    expect(fare).toBe(0);
  });

  it('should accept custom rates', () => {
    const fare = calculateFare(10, 'car', { perKm: 15 });
    expect(fare).toBe(150);
  });
});

describe('getFareBreakdown', () => {
  it('should return detailed breakdown', () => {
    const breakdown = getFareBreakdown(10, 'bus');
    expect(breakdown).toEqual({
      mode: 'bus',
      distance: 10,
      baseFare: 15,
      distanceFare: 25,
      totalFare: 40,
      currency: 'PHP',
    });
  });
});

describe('compareFares', () => {
  it('should return fares for all modes', () => {
    const fares = compareFares(50);
    expect(fares).toHaveLength(6);
    expect(fares.find((f) => f.mode === 'walking')?.totalFare).toBe(0);
  });
});
