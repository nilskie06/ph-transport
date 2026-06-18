# my-awesome-lib

npm package for transport system

## Installation

```bash
npm install my-awesome-lib
```

## Usage

```typescript
import { calculateDistance, calculateETA, formatDistance } from 'my-awesome-lib';

// Calculate distance between two coordinates
const distance = calculateDistance(14.5995, 120.9842, 10.3157, 123.8854);
console.log(formatDistance(distance)); // "570.5 km"

// Calculate ETA based on transport mode
const eta = calculateETA(distance, 'car');
console.log(`${eta} minutes`); // "570.5 minutes"
```

## API

### `calculateDistance(lat1, lon1, lat2, lon2)`

Calculate distance between two geographic coordinates using Haversine formula.

- Returns: distance in kilometers

### `calculateETA(distance, mode)`

Calculate estimated time based on distance and transport mode.

- `mode`: 'car' | 'bus' | 'train' | 'plane' | 'bicycle' | 'walking'
- Returns: time in minutes

### `formatDistance(km)`

Format distance for display.

- Returns: formatted string (e.g., "5.5 km" or "500 m")

## License

MIT
