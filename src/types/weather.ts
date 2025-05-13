
export type WeatherCondition = 
  | 'sunny'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rainy'
  | 'stormy'
  | 'snowy';

export type TimeOfDay = 'day' | 'night';

export interface WeatherData {
  location: {
    city: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    condition: WeatherCondition;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    timeOfDay: TimeOfDay;
    description: string;
  };
  daily: Array<{
    date: string;
    condition: WeatherCondition;
    tempMax: number;
    tempMin: number;
    description: string;
  }>;
  hourly: Array<{
    time: string;
    temp: number;
    condition: WeatherCondition;
  }>;
}

export interface LocationData {
  city: string;
  country: string;
  lat: number;
  lon: number;
}
