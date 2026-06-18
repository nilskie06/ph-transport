// src/transport/fuel.ts
type FuelType = 'gasoline' | 'diesel' | 'electric' | 'hybrid';

interface FuelConsumption {
  fuelType: FuelType;
  consumptionPer100km: number; // liters or kWh per 100km
  pricePerUnit: number; // price per liter or per kWh
  currency: string;
}

const DEFAULT_FUEL: Record<FuelType, FuelConsumption> = {
  gasoline: { fuelType: 'gasoline', consumptionPer100km: 8, pricePerUnit: 65, currency: 'PHP' },
  diesel: { fuelType: 'diesel', consumptionPer100km: 6, pricePerUnit: 55, currency: 'PHP' },
  electric: { fuelType: 'electric', consumptionPer100km: 15, pricePerUnit: 12, currency: 'PHP' },
  hybrid: { fuelType: 'hybrid', consumptionPer100km: 4, pricePerUnit: 65, currency: 'PHP' },
};

/**
 * Calculate fuel consumption for a trip
 */
export function calculateFuelConsumption(distance: number, fuelType: FuelType = 'gasoline') {
  const fuel = DEFAULT_FUEL[fuelType];
  const litersNeeded = (distance / 100) * fuel.consumptionPer100km;
  const cost = litersNeeded * fuel.pricePerUnit;

  return {
    distance,
    fuelType,
    fuelNeeded: Math.round(litersNeeded * 100) / 100,
    costPerUnit: fuel.pricePerUnit,
    totalCost: Math.round(cost * 100) / 100,
    currency: fuel.currency,
  };
}

/**
 * Calculate CO2 emissions based on fuel type and distance
 */
export function calculateCO2Emissions(distance: number, fuelType: FuelType = 'gasoline') {
  const emissionsPerLiter: Record<FuelType, number> = {
    gasoline: 2.31, // kg CO2 per liter
    diesel: 2.68,
    electric: 0, // zero direct emissions
    hybrid: 1.15,
  };

  const fuel = DEFAULT_FUEL[fuelType];
  const litersUsed = (distance / 100) * fuel.consumptionPer100km;
  const co2 = litersUsed * emissionsPerLiter[fuelType];

  return {
    distance,
    fuelType,
    fuelUsed: Math.round(litersUsed * 100) / 100,
    co2Emissions: Math.round(co2 * 100) / 100,
    unit: 'kg CO2',
  };
}

/**
 * Compare fuel costs across fuel types
 */
export function compareFuelCosts(distance: number) {
  const types: FuelType[] = ['gasoline', 'diesel', 'electric', 'hybrid'];
  return types.map((fuelType) => ({
    ...calculateFuelConsumption(distance, fuelType),
    co2: calculateCO2Emissions(distance, fuelType).co2Emissions,
  }));
}
