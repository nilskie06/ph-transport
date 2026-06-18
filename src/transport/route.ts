// src/transport/route.ts
import type { TransportMode, Route } from './types.js';
import { calculateETA } from './utils.js';
import { calculateFare } from './fare.js';

interface RouteOption {
  mode: TransportMode;
  duration: number; // minutes
  fare: number;
  distance: number;
}

interface RouteRecommendation {
  fastest: RouteOption;
  cheapest: RouteOption;
  balanced: RouteOption;
  options: RouteOption[];
}

/**
 * Get all route options for a given distance
 */
export function getRouteOptions(distance: number): RouteOption[] {
  const modes: TransportMode[] = ['car', 'bus', 'train', 'plane', 'bicycle', 'walking'];
  
  return modes
    .filter((mode) => {
      // Filter out unrealistic modes for very long distances
      if (distance > 500 && (mode === 'bicycle' || mode === 'walking')) return false;
      if (distance > 50 && mode === 'walking') return false;
      if (distance > 20 && mode === 'bicycle') return false;
      return true;
    })
    .map((mode) => ({
      mode,
      duration: calculateETA(distance, mode),
      fare: calculateFare(distance, mode),
      distance,
    }));
}

/**
 * Get route recommendations (fastest, cheapest, balanced)
 */
export function getRouteRecommendations(distance: number): RouteRecommendation {
  const options = getRouteOptions(distance);

  if (options.length === 0) {
    throw new Error('No valid route options for this distance');
  }

  const fastest = options.reduce((a, b) => (a.duration < b.duration ? a : b));
  const cheapest = options.reduce((a, b) => (a.fare < b.fare ? a : b));
  
  // Balanced: weighted score (60% time, 40% cost)
  const maxDuration = Math.max(...options.map((o) => o.duration));
  const maxFare = Math.max(...options.map((o) => o.fare));
  
  const balanced = options.reduce((a, b) => {
    const scoreA = (a.duration / maxDuration) * 0.6 + (a.fare / (maxFare || 1)) * 0.4;
    const scoreB = (b.duration / maxDuration) * 0.6 + (b.fare / (maxFare || 1)) * 0.4;
    return scoreA < scoreB ? a : b;
  });

  return { fastest, cheapest, balanced, options };
}

/**
 * Create a route object
 */
export function createRoute(
  origin: string,
  destination: string,
  distance: number,
  mode: TransportMode
): Route {
  return {
    origin,
    destination,
    distance,
    mode,
    estimatedTime: calculateETA(distance, mode),
  };
}

/**
 * Calculate multi-stop route total distance and time
 */
export function calculateMultiStopRoute(stops: Array<{ distance: number; mode: TransportMode }>) {
  let totalDistance = 0;
  let totalTime = 0;

  for (const stop of stops) {
    totalDistance += stop.distance;
    totalTime += calculateETA(stop.distance, stop.mode);
  }

  return {
    totalDistance,
    totalTime,
    segments: stops.map((stop) => ({
      distance: stop.distance,
      mode: stop.mode,
      time: calculateETA(stop.distance, stop.mode),
    })),
  };
}
