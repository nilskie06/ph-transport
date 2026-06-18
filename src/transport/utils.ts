// src/transport/utils.ts
import type { TransportMode } from './types.js';

const SPEED_KMH: Record<TransportMode, number> = {
  car: 60,
  bus: 40,
  train: 120,
  plane: 800,
  bicycle: 15,
  walking: 5,
};

/**
 * Calculate distance between two points using Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculate estimated time of arrival based on distance and transport mode
 */
export function calculateETA(distance: number, mode: TransportMode): number {
  const speed = SPEED_KMH[mode];
  return (distance / speed) * 60; // returns minutes
}

/**
 * Format distance for display
 */
export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
