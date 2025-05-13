
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { LocationData } from '../types/weather';
import { searchLocations } from '../services/weatherService';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationSearchProps {
  onLocationSelect: (location: LocationData) => void;
  timeOfDay: 'day' | 'night';
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect, timeOfDay }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim().length < 2) return;
    
    setIsSearching(true);
    try {
      const locations = await searchLocations(searchTerm);
      setResults(locations);
    } catch (error) {
      console.error('Error searching locations:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Input
            placeholder="Search location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              "pl-10 bg-white/20 text-white border-0 placeholder:text-white/70",
              timeOfDay === 'night' ? 'bg-white/10' : ''
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" 
            size={18}
          />
        </div>
        <Button 
          onClick={handleSearch}
          className={cn(
            "bg-white/20 hover:bg-white/30 text-white border-0",
            timeOfDay === 'night' ? 'bg-white/10 hover:bg-white/20' : ''
          )}
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {results.length > 0 && (
        <div className={cn(
          "mt-2 glass rounded-xl overflow-hidden",
          timeOfDay === 'night' ? 'glass-dark' : ''
        )}>
          <ul>
            {results.map((location, index) => (
              <li 
                key={index}
                className="px-4 py-3 text-white hover:bg-white/10 cursor-pointer"
                onClick={() => {
                  onLocationSelect(location);
                  setResults([]);
                  setSearchTerm('');
                }}
              >
                {location.city}, {location.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
