
import React from 'react';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { cn } from '@/lib/utils';

interface HourlyForecastProps {
  data: WeatherData;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  const { hourly, current } = data;

  return (
    <div className={cn(
      "glass p-5 mt-4 rounded-3xl",
      current.timeOfDay === 'night' ? 'glass-dark' : ''
    )}>
      <h2 className="text-white text-xl font-medium mb-4">Hourly Forecast</h2>
      
      <div className="flex overflow-x-auto pb-4 space-x-6">
        {hourly.map((hour, index) => (
          <div key={index} className="flex flex-col items-center min-w-20">
            <span className="text-white mb-1">{hour.time}</span>
            <WeatherIcon condition={hour.condition} size={24} />
            <span className="text-white font-medium mt-1">{hour.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
