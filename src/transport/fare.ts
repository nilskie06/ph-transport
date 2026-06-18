// src/transport/fare.ts
import type { TransportMode } from './types.js';

interface FareRates {
  baseFare: number;
  perKm: number;
  currency: string;
}

const DEFAULT_RATES: Record<TransportMode, FareRates> = {
  car: { baseFare: 0, perKm: 12, currency: 'PHP' },
  bus: { baseFare: 15, perKm: 2.5, currency: 'PHP' },
  train: { baseFare: 20, perKm: 1.8, currency: 'PHP' },
  plane: { baseFare: 500, perKm: 5, currency: 'PHP' },
  bicycle: { baseFare: 0, perKm: 0, currency: 'PHP' },
  walking: { baseFare: 0, perKm: 0, currency: 'PHP' },
};

/**
 * Calculate fare based on distance and transport mode
 */
export function calculateFare(
  distance: number,
  mode: TransportMode,
  customRates?: Partial<FareRates>
): number {
  const rates = { ...DEFAULT_RATES[mode], ...customRates };
  const fare = rates.baseFare + distance * rates.perKm;
  return Math.round(fare * 100) / 100;
}

/**
 * Get fare breakdown with details
 */
export function getFareBreakdown(
  distance: number,
  mode: TransportMode,
  customRates?: Partial<FareRates>
) {
  const rates = { ...DEFAULT_RATES[mode], ...customRates };
  const distanceFare = distance * rates.perKm;
  const totalFare = rates.baseFare + distanceFare;

  return {
    mode,
    distance,
    baseFare: rates.baseFare,
    distanceFare: Math.round(distanceFare * 100) / 100,
    totalFare: Math.round(totalFare * 100) / 100,
    currency: rates.currency,
  };
}

/**
 * Compare fares across all transport modes
 */
export function compareFares(distance: number) {
  const modes: TransportMode[] = ['car', 'bus', 'train', 'plane', 'bicycle', 'walking'];
  return modes.map((mode) => getFareBreakdown(distance, mode));
}
