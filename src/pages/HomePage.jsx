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

  const WaveBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute bottom-0 w-full h-56 text-marine-900 opacity-5" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,60 C300,120 600,0 900,60 C1050,90 1200,30 1200,60 L1200,120 L0,120 Z" fill="currentColor" className="animate-wave"/>
      </svg>
      <svg className="absolute bottom-0 w-full h-40 text-marine-800 opacity-10" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M0,80 C300,20 600,100 900,40 C1050,10 1200,70 1200,40 L1200,120 L0,120 Z" fill="currentColor" className="animate-wave" style={{animationDelay: '1s'}}/>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-underwater relative overflow-hidden flex flex-col">
      {/* Simplified background effects for mobile performance */}
      <div className="underwater-rays opacity-60 hidden sm:block"></div>
      <div className="caustic-waves opacity-50 hidden sm:block"></div>
      
      {/* Reduced floating bubbles for mobile */}
      <div className="floating-bubble hidden sm:block"></div>
      <div className="floating-bubble hidden sm:block"></div>
      <div className="floating-bubble hidden sm:block"></div>
      
      {/* Background elements - reduced for mobile */}
      <div className="hidden sm:block">
        <ParticleField />
      </div>
      <WaveBackground />
      
      {/* Compact Title section */}
      <header className="flex-shrink-0 pt-4 sm:pt-6 px-4 sm:px-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide mb-1 drop-shadow-lg">
            Matsya Drishti
          </h1>
          <p className="text-white/90 text-xs sm:text-sm font-medium tracking-wider uppercase drop-shadow-md">
            AI-POWERED MARINE INTELLIGENCE
          </p>
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
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-4 text-center drop-shadow-md">Popular Species</h2>
          <PopularFishSlider />
        </div>
      </div>

      {/* Bottom Navigation */}
      <NavbarBottom />
    </div>
  );
};

export default HomePage;