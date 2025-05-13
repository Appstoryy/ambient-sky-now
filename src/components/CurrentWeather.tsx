
import React from 'react';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { Droplets, Wind, Eye, ThermometerSun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { current, location } = data;
  
  return (
    <div className="text-white py-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-medium">{location.city}</h1>
        <p className="text-xl opacity-90">{location.country}</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4">
        <WeatherIcon condition={current.condition} timeOfDay={current.timeOfDay} size={96} className="animate-float" />
        
        <div className="text-center">
          <div className="text-7xl font-light">{current.temp}°</div>
          <div className="text-xl capitalize opacity-90">{current.description}</div>
          <div className="text-lg opacity-75">Feels like {current.feelsLike}°</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-4">
        <div className={cn(
          "flex flex-col items-center p-3 glass rounded-xl",
          current.timeOfDay === 'night' ? 'glass-dark' : ''
        )}>
          <Droplets size={20} className="mb-2" />
          <span className="text-sm opacity-80">Humidity</span>
          <span className="text-lg font-medium">{current.humidity}%</span>
        </div>

        <div className={cn(
          "flex flex-col items-center p-3 glass rounded-xl",
          current.timeOfDay === 'night' ? 'glass-dark' : ''
        )}>
          <Wind size={20} className="mb-2" />
          <span className="text-sm opacity-80">Wind</span>
          <span className="text-lg font-medium">{current.windSpeed} mph</span>
        </div>

        <div className={cn(
          "flex flex-col items-center p-3 glass rounded-xl",
          current.timeOfDay === 'night' ? 'glass-dark' : ''
        )}>
          <Eye size={20} className="mb-2" />
          <span className="text-sm opacity-80">Visibility</span>
          <span className="text-lg font-medium">{current.visibility} mi</span>
        </div>

        <div className={cn(
          "flex flex-col items-center p-3 glass rounded-xl",
          current.timeOfDay === 'night' ? 'glass-dark' : ''
        )}>
          <ThermometerSun size={20} className="mb-2" />
          <span className="text-sm opacity-80">UV Index</span>
          <span className="text-lg font-medium">{current.uvIndex}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
