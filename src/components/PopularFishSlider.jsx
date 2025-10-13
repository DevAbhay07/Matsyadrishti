import React, { useState, useEffect, useRef } from 'react';
import FishCard from './FishCard';
import { getPopularFish } from '../utils/api';

const PopularFishSlider = () => {
  const [popularFish, setPopularFish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

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

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const cardWidth = 140; // Approximate card width
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="relative">
          {/* Compact loading container */}
          <div className="relative glass-strong rounded-xl mx-2 sm:mx-4">
            <div className="px-3 sm:px-4 py-3 sm:py-4">
              <div className="flex space-x-2 sm:space-x-3 overflow-x-auto scrollbar-hide">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="min-w-[100px] sm:min-w-[120px] h-24 sm:h-32 bg-white bg-opacity-10 rounded-lg animate-pulse flex-shrink-0">
                    <div className="w-full h-14 sm:h-20 bg-white bg-opacity-20 rounded-lg mb-1 sm:mb-2"></div>
                    <div className="space-y-1 px-2">
                      <div className="h-2 bg-white bg-opacity-15 rounded mx-auto w-12 sm:w-16"></div>
                      <div className="h-1 bg-white bg-opacity-10 rounded mx-auto w-8 sm:w-12"></div>
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
        {/* Compact container */}
        <div className="relative glass-strong rounded-xl mx-2 sm:mx-4">
          {/* Fish carousel - compact and responsive */}
          <div 
            ref={scrollRef}
            className="flex space-x-2 sm:space-x-3 px-3 sm:px-4 py-3 sm:py-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {popularFish.map((fish, index) => (
              <div
                key={fish.id}
                className="min-w-[100px] sm:min-w-[120px] md:min-w-[140px] flex-shrink-0 snap-start transition-all duration-300"
                style={{ 
                  animationDelay: `${index * 100}ms`
                }}
              >
                <FishCard
                  fish={fish}
                  onClick={handleFishClick}
                  className="h-full hover:scale-105 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Compact scroll indicators */}
        <div className="flex justify-center mt-2 space-x-1">
          {[...Array(Math.ceil(popularFish.length / 4))].map((_, index) => (
            <div
              key={index}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / 4) === index 
                  ? 'w-6 bg-blue-400' 
                  : 'w-2 bg-white bg-opacity-40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularFishSlider;