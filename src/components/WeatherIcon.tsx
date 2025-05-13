
import React from 'react';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Snowflake,
  Moon,
  CloudMoon
} from 'lucide-react';
import { WeatherCondition, TimeOfDay } from '../types/weather';

interface WeatherIconProps {
  condition: WeatherCondition;
  timeOfDay?: TimeOfDay;
  size?: number;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  timeOfDay = 'day', 
  size = 24,
  className = ''
}) => {
  const getIcon = () => {
    if (timeOfDay === 'night') {
      switch (condition) {
        case 'sunny':
          return <Moon size={size} className={`text-white ${className}`} />;
        case 'partly-cloudy':
          return <CloudMoon size={size} className={`text-white ${className}`} />;
        default:
          // At night we use the same icons for other conditions
          break;
      }
    }

    switch (condition) {
      case 'sunny':
        return <Sun size={size} className={`text-yellow-400 ${className}`} />;
      case 'partly-cloudy':
        return <CloudSun size={size} className={`text-white ${className}`} />;
      case 'cloudy':
        return <Cloud size={size} className={`text-white ${className}`} />;
      case 'rainy':
        return <CloudRain size={size} className={`text-white ${className}`} />;
      case 'stormy':
        return <CloudLightning size={size} className={`text-white ${className}`} />;
      case 'snowy':
        return <Snowflake size={size} className={`text-white ${className}`} />;
      default:
        return <Sun size={size} className={`text-yellow-400 ${className}`} />;
    }
  };

  return (
    <div className="inline-flex items-center justify-center">
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;
