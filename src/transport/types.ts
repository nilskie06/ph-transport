// src/transport/types.ts
export type TransportMode = 'car' | 'bus' | 'train' | 'plane' | 'bicycle' | 'walking';

export interface Route {
  origin: string;
  destination: string;
  distance: number; // in kilometers
  mode: TransportMode;
  estimatedTime?: number; // in minutes
}
