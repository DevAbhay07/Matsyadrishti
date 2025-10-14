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
    <div>
      <div className="relative">
        {/* Grid container with vertical scroll - seamless with background */}
        <div className="relative mx-2 sm:mx-4">
          <div 
            className="p-3 sm:p-4 max-h-80 overflow-y-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* 3x3 Grid layout - responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularFishSlider;