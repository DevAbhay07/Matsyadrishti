import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PopularFishSlider from '../components/PopularFishSlider';
import NavbarBottom from '../components/NavbarBottom';
import Icons from '../components/Icons';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Reduced number of particles for cleaner look
  const ParticleField = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="particle absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 via-white to-sky-50 relative overflow-hidden">
      {/* Subtle daisy-blue background with gentle atmosphere */}
      
      {/* Full viewport container with proper spacing for navbar */}
      <div className="min-h-screen pb-20 flex flex-col">
        {/* Compact Title section */}
        <header className="flex-shrink-0 pt-4 sm:pt-6 px-4 sm:px-6">
          <div className="animate-fade-in">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-wide mb-1">
              Matsya Drishti
            </h1>
          </div>
        </header>
        
        {/* Main content with flexible height */}
        <div className={`flex-1 flex flex-col justify-start items-center px-4 sm:px-6 pt-6 sm:pt-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Unified Scan section */}
        <div className="mb-6 w-full max-w-sm">
          {/* Glass panel with unified scan button */}
          <div className="py-6 sm:py-8 px-4 sm:px-6 rounded-xl glass-panel relative overflow-hidden">
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Unified Square Scan Button */}
              <button
                onClick={() => navigate('/scanner')}
                className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 
                          rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 
                          hover:scale-105 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700
                          flex flex-col items-center justify-center group relative overflow-hidden
                          border border-blue-400/20"
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent 
                              rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Camera Icon */}
                <Icons.Camera className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-1 relative z-10" />
                
                {/* Scan Label */}
                <span className="text-white text-xs sm:text-sm font-semibold relative z-10">Scan</span>
              </button>
            </div>
          </div>
        </div>

          
          {/* Popular Species Section - Responsive with full height */}
          <div className="w-full flex-1 flex flex-col">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-left">Popular Species</h2>
            <div className="flex-1">
              <PopularFishSlider />
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <NavbarBottom />
      </div>
    </div>
  );
};

export default HomePage;