import React, { useState, useEffect } from 'react';
import FishCard from './FishCard';
import { getPopularFish } from '../utils/api';

const PopularFishSlider = () => {
  const [popularFish, setPopularFish] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularFish = async () => {
      try {
        const response = await getPopularFish();
        if (response.success) {
          setPopularFish(response.data);
        }
      } catch (error) {
        console.error('Failed to load popular fish:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPopularFish();
  }, []);

  const handleFishClick = (fish) => {
    console.log('Fish clicked:', fish);
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="relative">
          {/* Loading grid container - seamless with background */}
          <div className="relative mx-2 sm:mx-4">
            <div className="p-3 sm:p-4 max-h-80 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} className="bg-yellow-50 bg-opacity-30 rounded-lg animate-pulse aspect-square">
                    <div className="w-full h-2/3 bg-yellow-100 bg-opacity-40 rounded-lg mb-2"></div>
                    <div className="space-y-1 px-2">
                      <div className="h-2 bg-yellow-200 bg-opacity-50 rounded mx-auto w-3/4"></div>
                      <div className="h-1.5 bg-yellow-200 bg-opacity-30 rounded mx-auto w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="relative flex-1">
        {/* Grid container with responsive height - seamless with background */}
        <div className="relative mx-2 sm:mx-4 h-full">
          <div 
            className="p-3 sm:p-4 h-full overflow-y-auto scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              minHeight: '320px', // Minimum height for content
              maxHeight: 'calc(100vh - 280px)' // Dynamic max height based on viewport
            }}
          >
            {/* Responsive Grid layout - adapts to screen size */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 pb-4">
              {popularFish.map((fish, index) => (
                <div
                  key={fish.id}
                  className="transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                  style={{ 
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <FishCard
                    fish={fish}
                    onClick={handleFishClick}
                    className="h-full w-full"
                  />
                </div>
              ))}
              
              {/* Add empty cards to maintain grid structure if needed */}
              {popularFish.length % 3 !== 0 && [...Array(3 - (popularFish.length % 3))].map((_, index) => (
                <div key={`empty-${index}`} className="hidden sm:block" />
              ))}
            </div>
            
            {/* Subtle bottom fade gradient to indicate more content or smooth ending */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none opacity-30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularFishSlider;