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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute rounded-full bg-gradient-to-r from-blue-300/20 to-purple-300/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${8 + Math.random() * 16}px`,
              height: `${8 + Math.random() * 16}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Full viewport container */}
      <div className="min-h-screen pb-20 flex flex-col relative z-10">
        {/* Modern Header */}
        <header className="flex-shrink-0 pt-8 sm:pt-12 px-6 sm:px-8">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 tracking-tight mb-2">
              Matsya Drishti
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </header>
        
        {/* Main content */}
        <div className={`flex-1 flex flex-col justify-start items-center px-6 sm:px-8 pt-12 sm:pt-16 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        
        {/* Enhanced Scan Section */}
        <div className="mb-12 w-full max-w-md">
          {/* Modern glass panel with backdrop blur */}
          <div className="modern-glass-panel py-8 sm:py-10 px-6 sm:px-8 rounded-3xl relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10 animate-pulse"></div>
            
            {/* Subtle accent lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              {/* Enhanced Large Scan Button */}
              <button
                onClick={() => navigate('/scanner')}
                className="scan-button-enhanced w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 
                          rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform transition-all duration-500 
                          hover:scale-110 hover:rotate-1 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800
                          flex flex-col items-center justify-center group relative overflow-hidden
                          border border-white/20 backdrop-blur-sm"
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent 
                              rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 
                              transform group-hover:translate-x-2 group-hover:-translate-y-2"></div>
                
                {/* Glowing ring effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 
                              opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500 scale-110"></div>
                
                {/* Camera Icon */}
                <Icons.Camera className="w-12 h-12 sm:w-16 sm:h-16 text-white mb-2 relative z-10 
                                       group-hover:scale-110 transition-transform duration-300" />
                
                {/* Scan Label */}
                <span className="text-white text-lg sm:text-xl font-bold relative z-10 
                               group-hover:text-blue-100 transition-colors duration-300">Scan</span>
                
                {/* Pulsing dot indicator */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full 
                              animate-pulse shadow-lg shadow-green-400/50"></div>
              </button>
              
              {/* Floating action hint */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AI-powered detection</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Popular Species Section */}
        <div className="w-full flex-1 flex flex-col">
          <div className="flex items-center mb-6">
            {/* Modern accent bar */}
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-4"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">Popular Species</h2>
          </div>
          <div className="flex-1">
            <PopularFishSlider />
          </div>
        </div>
        </div>

        {/* Floating Bottom Navigation */}
        <NavbarBottom />
      </div>
    </div>
  );
};

export default HomePage;