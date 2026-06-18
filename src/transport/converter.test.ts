// src/transport/converter.test.ts
import { describe, it, expect } from 'vitest';
import {
  kmToMiles, milesToKm,
  kmhToMph, mphToKmh,
  kmhToMs, msToKmh,
  formatDuration, minutesToHoursMinutes,
} from './converter.js';

describe('distance conversions', () => {
  it('should convert km to miles', () => {
    expect(kmToMiles(100)).toBeCloseTo(62.137, 1);
  });

  it('should convert miles to km', () => {
    expect(milesToKm(62.137)).toBeCloseTo(100, 0);
  });
});

describe('speed conversions', () => {
  it('should convert km/h to mph', () => {
    expect(kmhToMph(100)).toBeCloseTo(62.14, 0);
  });

  it('should convert mph to km/h', () => {
    expect(mphToKmh(60)).toBeCloseTo(96.56, 0);
  });

  it('should convert km/h to m/s', () => {
    expect(kmhToMs(36)).toBe(10);
  });

  it('should convert m/s to km/h', () => {
    expect(msToKmh(10)).toBe(36);
  });
});

describe('time conversions', () => {
  it('should convert minutes to hours and minutes', () => {
    expect(minutesToHoursMinutes(90)).toEqual({ hours: 1, minutes: 30 });
  });

  it('should format duration with hours and minutes', () => {
    expect(formatDuration(90)).toBe('1h 30min');
  });

  it('should format duration with minutes only', () => {
    expect(formatDuration(45)).toBe('45 min');
  });

  it('should format duration with hours only', () => {
    expect(formatDuration(120)).toBe('2h');
  });
});
