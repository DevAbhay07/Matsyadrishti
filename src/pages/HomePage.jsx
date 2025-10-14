import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScanButton from '../components/ScanButton';
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 relative overflow-hidden flex flex-col">
      {/* Light daisy white background effects - subtle and clean */}
      
      {/* Compact Title section */}
      <header className="flex-shrink-0 pt-4 sm:pt-6 px-4 sm:px-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-wide mb-1">
            Matsya Drishti
          </h1>
        </div>
      </header>
      
      {/* More compact main content */}
      <div className={`flex-1 flex flex-col justify-start items-center px-4 sm:px-6 pt-6 sm:pt-8 pb-20 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Compact Scan section */}
        <div className="mb-6 w-full max-w-sm">
          {/* More compact glass panel */}
          <div className="py-4 sm:py-6 px-4 sm:px-6 rounded-xl glass-panel relative overflow-hidden">
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Smaller scan button for mobile */}
              <div className="mb-4 text-center">
                <ScanButton size="medium" />
              </div>
              
              {/* Responsive start scan button */}
              <button
                onClick={() => navigate('/scanner')}
                className="btn-primary px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold
                          flex items-center space-x-2 sm:space-x-3 transition-all duration-300 
                          hover:scale-105 w-full justify-center"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7C4 5.89543 4.89543 5 6 5H8L10 3H14L16 5H18C19.1046 5 20 5.89543 20 7V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Start Scan</span>
              </button>
            </div>
          </div>
        </div>

        
        {/* Popular Species Section - More responsive */}
        <div className="w-full">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 text-left">Popular Species</h2>
          <PopularFishSlider />
        </div>
      </div>

      {/* Bottom Navigation */}
      <NavbarBottom />
    </div>
  );
};

export default HomePage;