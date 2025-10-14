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
      <div className="h-full flex flex-col">
        <div className="relative flex-1">
          {/* Modern loading grid with enhanced styling */}
          <div className="relative mx-2 sm:mx-4 h-full">
            <div className="p-4 sm:p-6 h-full overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div key={i} 
                       className="modern-fish-card animate-pulse aspect-square p-4"
                       style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="w-full h-2/3 bg-gradient-to-br from-blue-200/50 to-purple-200/50 
                                  rounded-xl mb-3"></div>
                    <div className="space-y-2 px-2">
                      <div className="h-3 bg-gradient-to-r from-blue-300/60 to-purple-300/60 
                                    rounded-full mx-auto w-3/4"></div>
                      <div className="h-2 bg-gradient-to-r from-blue-200/40 to-purple-200/40 
                                    rounded-full mx-auto w-1/2"></div>
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
        {/* Modern grid container with enhanced styling */}
        <div className="relative mx-2 sm:mx-4 h-full">
          <div 
            className="p-4 sm:p-6 h-full overflow-y-auto scrollbar-hide"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              minHeight: '320px',
              maxHeight: 'calc(100vh - 280px)'
            }}
          >
            {/* Enhanced responsive grid with staggered animations */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pb-6">
              {popularFish.map((fish, index) => (
                <div
                  key={fish.id}
                  className={`modern-fish-card card-animate-${Math.min(index + 1, 6)} 
                            transition-all duration-500 hover:scale-105 cursor-pointer
                            transform hover:-translate-y-2`}
                  onClick={() => handleFishClick(fish)}
                >
                  <FishCard
                    fish={fish}
                    onClick={handleFishClick}
                    className="h-full w-full border-0 bg-transparent shadow-none"
                  />
                </div>
              ))}
              
              {/* Maintain grid structure */}
              {popularFish.length % 3 !== 0 && [...Array(3 - (popularFish.length % 3))].map((_, index) => (
                <div key={`empty-${index}`} className="hidden sm:block" />
              ))}
            </div>
            
            {/* Enhanced bottom gradient with modern styling */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t 
                          from-blue-50/80 via-indigo-50/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularFishSlider;