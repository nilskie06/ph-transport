// src/transport/index.ts
export { calculateDistance, calculateETA, formatDistance } from './utils.js';
export { calculateFare, getFareBreakdown, compareFares } from './fare.js';
export { calculateFuelConsumption, calculateCO2Emissions, compareFuelCosts } from './fuel.js';
export {
  kmToMiles, milesToKm,
  kmhToMph, mphToKmh,
  kmhToMs, msToKmh,
  celsiusToFahrenheit, fahrenheitToCelsius,
  minutesToHoursMinutes, formatDuration,
  convertDistance, convertSpeed,
} from './converter.js';
export {
  getRouteOptions, getRouteRecommendations,
  createRoute, calculateMultiStopRoute,
} from './route.js';
export type { TransportMode, Route } from './types.js';
