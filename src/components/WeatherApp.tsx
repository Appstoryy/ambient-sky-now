
import React, { useState, useEffect } from 'react';
import { WeatherData, LocationData } from '../types/weather';
import { getWeatherData, getCurrentLocation, getBackgroundClass } from '../services/weatherService';
import CurrentWeather from './CurrentWeather';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';
import LocationSearch from './LocationSearch';
import WeatherAnimation from './WeatherAnimation';
import { toast } from "@/components/ui/sonner";

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchWeatherForLocation = async (location?: LocationData) => {
    setLoading(true);
    setError(null);
    
    try {
      let weatherData;
      
      if (location) {
        weatherData = await getWeatherData(location.lat, location.lon);
        // In a real app we'd use the specified location
      } else {
        // Try to get user's current location
        const currentLocation = await getCurrentLocation();
        weatherData = await getWeatherData(currentLocation.lat, currentLocation.lon);
      }
      
      setWeatherData(weatherData);
    } catch (err) {
      setError('Failed to load weather data. Please try again.');
      toast.error('Failed to load weather data');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchWeatherForLocation();
  }, []);
  
  const handleLocationSelect = (location: LocationData) => {
    fetchWeatherForLocation(location);
  };
  
  const backgroundClass = weatherData 
    ? getBackgroundClass(weatherData.current.condition, weatherData.current.timeOfDay)
    : 'bg-gradient-to-b from-blue-400 to-blue-600';

  return (
    <div className={`min-h-screen ${backgroundClass} text-white p-4 md:p-8`}>
      {weatherData && (
        <WeatherAnimation 
          condition={weatherData.current.condition}
          timeOfDay={weatherData.current.timeOfDay}
        />
      )}
      
      <div className="max-w-md mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            <p className="mt-4 text-white text-xl">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-xl text-white mb-4">{error}</p>
            <button 
              className="px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30"
              onClick={() => fetchWeatherForLocation()}
            >
              Try Again
            </button>
          </div>
        ) : weatherData && (
          <>
            <LocationSearch 
              onLocationSelect={handleLocationSelect}
              timeOfDay={weatherData.current.timeOfDay}
            />
            <CurrentWeather data={weatherData} />
            <HourlyForecast data={weatherData} />
            <DailyForecast data={weatherData} />
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
