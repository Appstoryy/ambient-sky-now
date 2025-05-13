
import React from 'react';
import { WeatherCondition, TimeOfDay } from '../types/weather';

interface RainDropProps {
  key: number;
  style: React.CSSProperties;
}

const RainDrop: React.FC<RainDropProps> = ({ style }) => {
  return <div className="absolute bg-white/60 rounded-full w-0.5 h-3" style={style}></div>;
};

interface SnowFlakeProps {
  key: number;
  style: React.CSSProperties;
}

const SnowFlake: React.FC<SnowFlakeProps> = ({ style }) => {
  return <div className="absolute bg-white rounded-full w-2 h-2" style={style}></div>;
};

interface CloudProps {
  key: number;
  style: React.CSSProperties;
}

const Cloud: React.FC<CloudProps> = ({ style }) => {
  return (
    <div 
      className="absolute bg-white/20 rounded-full" 
      style={{
        ...style,
        width: `${style.width}px`,
        height: `${style.height}px`,
        boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.2)',
      }}
    ></div>
  );
};

interface SunRayProps {
  key: number;
  style: React.CSSProperties;
}

const SunRay: React.FC<SunRayProps> = ({ style }) => {
  return (
    <div 
      className="absolute bg-yellow-300/30" 
      style={{
        ...style,
        transformOrigin: 'center',
        boxShadow: '0 0 15px 5px rgba(255, 215, 0, 0.3)',
      }}
    ></div>
  );
};

interface WeatherAnimationProps {
  condition: WeatherCondition;
  timeOfDay: TimeOfDay;
}

const WeatherAnimation: React.FC<WeatherAnimationProps> = ({ condition, timeOfDay }) => {
  const renderRain = () => {
    const drops = [];
    for (let i = 0; i < 100; i++) {
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${Math.random() * 1 + 0.5}s`;
      const animationDelay = `${Math.random() * 2}s`;
      const style = {
        left,
        animationDuration,
        animationDelay,
        animation: `fall linear infinite ${animationDuration}`,
        opacity: Math.random() * 0.6 + 0.4,
        top: `-10px`,
      };
      drops.push(<RainDrop key={i} style={style} />);
    }
    return drops;
  };

  const renderSnow = () => {
    const flakes = [];
    for (let i = 0; i < 50; i++) {
      const left = `${Math.random() * 100}%`;
      const animationDuration = `${Math.random() * 5 + 5}s`;
      const animationDelay = `${Math.random() * 5}s`;
      const style = {
        left,
        animationDuration,
        animationDelay,
        animation: `snowfall linear infinite ${animationDuration}`,
        opacity: Math.random() * 0.6 + 0.4,
        top: `-10px`,
      };
      flakes.push(<SnowFlake key={i} style={style} />);
    }
    return flakes;
  };

  const renderClouds = () => {
    const clouds = [];
    for (let i = 0; i < 10; i++) {
      const top = `${Math.random() * 50}%`;
      const left = `${Math.random() * 100}%`;
      const size = Math.random() * 100 + 50;
      const animationDuration = `${Math.random() * 60 + 30}s`;
      const opacity = Math.random() * 0.2 + 0.1;
      
      const style = {
        top,
        left,
        width: size,
        height: size / 2,
        animation: `float linear infinite ${animationDuration}`,
        opacity,
      };
      clouds.push(<Cloud key={i} style={style} />);
    }
    return clouds;
  };

  const renderSunRays = () => {
    const rays = [];
    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 4,
    };
    
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const width = 5;
      const length = Math.random() * 100 + 50;
      
      const style = {
        left: `calc(50% - ${width / 2}px)`,
        top: '20%',
        width: `${width}px`,
        height: `${length}px`,
        transform: `rotate(${angle}rad)`,
        opacity: Math.random() * 0.3 + 0.1,
        animation: `pulse-slow 4s ease-in-out infinite ${Math.random() * 4}s`,
      };
      
      rays.push(<SunRay key={i} style={style} />);
    }
    return rays;
  };

  let animationElements = null;

  switch (condition) {
    case 'rainy':
      animationElements = renderRain();
      break;
    case 'snowy':
      animationElements = renderSnow();
      break;
    case 'cloudy':
    case 'partly-cloudy':
      animationElements = renderClouds();
      break;
    case 'sunny':
      const elements = [];
      if (timeOfDay === 'day') {
        elements.push(...renderSunRays());
      }
      // For sunny days, we still have some light clouds in the background
      if (condition === 'sunny') {
        elements.push(...renderClouds());
      }
      animationElements = elements;
      break;
    case 'stormy':
      animationElements = renderRain(); // We could enhance this with lightning effects
      break;
    default:
      animationElements = null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {animationElements}
    </div>
  );
};

export default WeatherAnimation;
