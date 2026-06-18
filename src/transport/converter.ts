// src/transport/converter.ts

/**
 * Convert kilometers to miles
 */
export function kmToMiles(km: number): number {
  return Math.round(km * 0.621371 * 1000) / 1000;
}

/**
 * Convert miles to kilometers
 */
export function milesToKm(miles: number): number {
  return Math.round(miles * 1.60934 * 1000) / 1000;
}

/**
 * Convert km/h to mph
 */
export function kmhToMph(kmh: number): number {
  return Math.round(kmh * 0.621371 * 100) / 100;
}

/**
 * Convert mph to km/h
 */
export function mphToKmh(mph: number): number {
  return Math.round(mph * 1.60934 * 100) / 100;
}

/**
 * Convert km/h to m/s
 */
export function kmhToMs(kmh: number): number {
  return Math.round((kmh / 3.6) * 100) / 100;
}

/**
 * Convert m/s to km/h
 */
export function msToKmh(ms: number): number {
  return Math.round(ms * 3.6 * 100) / 100;
}

/**
 * Convert Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9/5 + 32) * 100) / 100;
}

/**
 * Convert Fahrenheit to Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5/9) * 100) / 100;
}

/**
 * Convert minutes to hours and minutes
 */
export function minutesToHoursMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return { hours, minutes: mins };
}

/**
 * Format duration as human-readable string
 */
export function formatDuration(minutes: number): string {
  const { hours, minutes: mins } = minutesToHoursMinutes(minutes);
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

/**
 * Convert distance based on unit preference
 */
export function convertDistance(km: number, toMiles: boolean): number {
  return toMiles ? kmToMiles(km) : km;
}

/**
 * Convert speed based on unit preference
 */
export function convertSpeed(kmh: number, toMph: boolean): number {
  return toMph ? kmhToMph(kmh) : kmh;
}
