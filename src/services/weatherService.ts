
import { WeatherData, LocationData, WeatherCondition, TimeOfDay } from '../types/weather';

// Mock data for initial development
const mockWeatherData: WeatherData = {
  location: {
    city: 'San Francisco',
    country: 'US',
    lat: 37.7749,
    lon: -122.4194,
  },
  current: {
    temp: 68,
    condition: 'partly-cloudy',
    feelsLike: 65,
    humidity: 75,
    windSpeed: 8,
    pressure: 1015,
    visibility: 10,
    uvIndex: 6,
    timeOfDay: 'day',
    description: 'Partly cloudy',
  },
  daily: [
    {
      date: '2025-05-13',
      condition: 'partly-cloudy',
      tempMax: 68,
      tempMin: 54,
      description: 'Partly cloudy',
    },
    {
      date: '2025-05-14',
      condition: 'sunny',
      tempMax: 72,
      tempMin: 57,
      description: 'Sunny',
    },
    {
      date: '2025-05-15',
      condition: 'cloudy',
      tempMax: 67,
      tempMin: 55,
      description: 'Overcast clouds',
    },
    {
      date: '2025-05-16',
      condition: 'rainy',
      tempMax: 66,
      tempMin: 54,
      description: 'Light rain',
    },
    {
      date: '2025-05-17',
      condition: 'sunny',
      tempMax: 71,
      tempMin: 57,
      description: 'Clear sky',
    },
    {
      date: '2025-05-18',
      condition: 'partly-cloudy',
      tempMax: 73,
      tempMin: 58,
      description: 'Scattered clouds',
    },
    {
      date: '2025-05-19',
      condition: 'sunny',
      tempMax: 75,
      tempMin: 59,
      description: 'Sunny',
    },
  ],
  hourly: [
    { time: '12:00', temp: 67, condition: 'partly-cloudy' },
    { time: '13:00', temp: 68, condition: 'partly-cloudy' },
    { time: '14:00', temp: 68, condition: 'sunny' },
    { time: '15:00', temp: 67, condition: 'sunny' },
    { time: '16:00', temp: 66, condition: 'partly-cloudy' },
    { time: '17:00', temp: 64, condition: 'cloudy' },
    { time: '18:00', temp: 62, condition: 'cloudy' },
    { time: '19:00', temp: 60, condition: 'cloudy' },
    { time: '20:00', temp: 58, condition: 'cloudy' },
    { time: '21:00', temp: 56, condition: 'partly-cloudy' },
    { time: '22:00', temp: 55, condition: 'partly-cloudy' },
    { time: '23:00', temp: 54, condition: 'partly-cloudy' },
  ],
};

const popularLocations: LocationData[] = [
  { city: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
  { city: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
  { city: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
  { city: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
  { city: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
  { city: 'Berlin', country: 'DE', lat: 52.5200, lon: 13.4050 },
];

// Determine the background gradient based on weather condition and time of day
export const getBackgroundClass = (condition: WeatherCondition, timeOfDay: TimeOfDay): string => {
  if (timeOfDay === 'night') return 'weather-gradient-night';

  switch (condition) {
    case 'sunny':
      return 'weather-gradient-sunny';
    case 'partly-cloudy':
    case 'cloudy':
      return 'weather-gradient-cloudy';
    case 'rainy':
    case 'snowy':
      return 'weather-gradient-rainy';
    case 'stormy':
      return 'weather-gradient-stormy';
    default:
      return 'weather-gradient-sunny';
  }
};

// In a real app, this would make an API call to a weather service
export const getWeatherData = async (lat?: number, lon?: number): Promise<WeatherData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeatherData);
    }, 500);
  });
};

// In a real app, this would make an API call to get location data based on search term
export const searchLocations = async (searchTerm: string): Promise<LocationData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = popularLocations.filter(location => 
        location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};

// Simulated geolocation service
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockWeatherData.location);
    }, 1000);
  });
};
