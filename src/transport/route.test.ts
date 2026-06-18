// src/transport/route.test.ts
import { describe, it, expect } from 'vitest';
import { getRouteOptions, getRouteRecommendations, createRoute, calculateMultiStopRoute } from './route.js';

describe('getRouteOptions', () => {
  it('should return route options for medium distance', () => {
    const options = getRouteOptions(100);
    expect(options.length).toBeGreaterThan(0);
    expect(options.every((o) => o.mode && o.duration >= 0 && o.fare >= 0)).toBe(true);
  });

  it('should filter out walking for long distances', () => {
    const options = getRouteOptions(600);
    const walkingOption = options.find((o) => o.mode === 'walking');
    expect(walkingOption).toBeUndefined();
  });
});

describe('getRouteRecommendations', () => {
  it('should return fastest, cheapest, and balanced', () => {
    const rec = getRouteRecommendations(100);
    expect(rec.fastest).toBeDefined();
    expect(rec.cheapest).toBeDefined();
    expect(rec.balanced).toBeDefined();
    expect(rec.options.length).toBeGreaterThan(0);
  });

  it('fastest should have minimum duration', () => {
    const rec = getRouteRecommendations(100);
    const minDuration = Math.min(...rec.options.map((o) => o.duration));
    expect(rec.fastest.duration).toBe(minDuration);
  });

  it('cheapest should have minimum fare', () => {
    const rec = getRouteRecommendations(100);
    const minFare = Math.min(...rec.options.map((o) => o.fare));
    expect(rec.cheapest.fare).toBe(minFare);
  });
});

describe('createRoute', () => {
  it('should create a route object', () => {
    const route = createRoute('Manila', 'Cebu', 570, 'plane');
    expect(route.origin).toBe('Manila');
    expect(route.destination).toBe('Cebu');
    expect(route.distance).toBe(570);
    expect(route.mode).toBe('plane');
    expect(route.estimatedTime).toBeGreaterThan(0);
  });
});

describe('calculateMultiStopRoute', () => {
  it('should calculate total distance and time', () => {
    const stops = [
      { distance: 50, mode: 'car' as const },
      { distance: 100, mode: 'train' as const },
    ];
    const result = calculateMultiStopRoute(stops);
    expect(result.totalDistance).toBe(150);
    expect(result.segments).toHaveLength(2);
    expect(result.segments[0].distance).toBe(50);
    expect(result.segments[1].distance).toBe(100);
  });
});
