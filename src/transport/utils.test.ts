// src/transport/utils.test.ts
import { describe, it, expect } from 'vitest';
import { calculateDistance, calculateETA, formatDistance } from './utils.js';

describe('calculateDistance', () => {
  it('should calculate distance between two points', () => {
    // Manila to Cebu (approximately 570 km)
    const distance = calculateDistance(14.5995, 120.9842, 10.3157, 123.8854);
    expect(distance).toBeGreaterThan(500);
    expect(distance).toBeLessThan(650);
  });

  it('should return 0 for same point', () => {
    const distance = calculateDistance(14.5995, 120.9842, 14.5995, 120.9842);
    expect(distance).toBe(0);
  });
});

describe('calculateETA', () => {
  it('should calculate ETA for car', () => {
    const eta = calculateETA(60, 'car'); // 60 km at 60 km/h
    expect(eta).toBe(60); // 60 minutes
  });

  it('should calculate ETA for train', () => {
    const eta = calculateETA(120, 'train'); // 120 km at 120 km/h
    expect(eta).toBe(60); // 60 minutes
  });
});

describe('formatDistance', () => {
  it('should format kilometers', () => {
    expect(formatDistance(5.5)).toBe('5.5 km');
  });

  it('should format meters for short distances', () => {
    expect(formatDistance(0.5)).toBe('500 m');
  });
});
