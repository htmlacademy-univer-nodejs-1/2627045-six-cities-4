import { City } from './city.enum.js';
import { Coordinates } from './coordinates.js';

export const cityCoordinates: Record<City, Coordinates> = {
  [City.Hamburg]: { latitude: 53.550341, longitude: 10.000654 },
  [City.Cologne]: { latitude: 50.938361, longitude: 6.959974 },
  [City.Brussels]: { latitude: 50.846557, longitude: 4.351697 },
  [City.Amsterdam]: { latitude: 52.370216, longitude: 4.895168 },
  [City.Paris]: { latitude: 48.87661, longitude: 2.350499 },
  [City.Dusseldorf]: { latitude: 51.225402, longitude: 6.776314 },
};
