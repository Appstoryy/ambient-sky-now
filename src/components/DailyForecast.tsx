
import React from 'react';
import { WeatherData } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import { cn } from '@/lib/utils';

interface DailyForecastProps {
  data: WeatherData;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data }) => {
  const { daily, current } = data;

  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className={cn(
      "glass p-5 mt-6 rounded-3xl",
      current.timeOfDay === 'night' ? 'glass-dark' : ''
    )}>
      <h2 className="text-white text-xl font-medium mb-4">7-Day Forecast</h2>
      <div className="space-y-4">
        {daily.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="w-16 text-white">
              {index === 0 ? 'Today' : formatDay(day.date)}
            </div>
            <div className="flex items-center w-16">
              <WeatherIcon condition={day.condition} size={24} />
            </div>
            <div className="flex justify-between w-28 text-white">
              <span className="font-medium">{day.tempMax}°</span>
              <span className="opacity-70">{day.tempMin}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
