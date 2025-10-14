import React, { useState } from 'react';

const FishCard = ({ fish, onClick, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = (e) => {
    // Better fallback with proper encoding and our theme colors
    const fallbackUrl = `https://via.placeholder.com/200x150/2196F3/ffffff?text=${encodeURIComponent(fish.name.substring(0, 8))}`;
    if (e.target.src !== fallbackUrl) {
      e.target.src = fallbackUrl;
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div 
      className={`group relative overflow-hidden fish-card ${className}`}
      onClick={() => onClick && onClick(fish)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container - responsive for both slider and grid */}
      <div className="relative h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden bg-gray-100 mb-2 flex-shrink-0">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-white to-transparent opacity-30 animate-shimmer"></div>
          </div>
        )}
        
        <img
          src={fish.image || `https://via.placeholder.com/150x100/2196F3/ffffff?text=${encodeURIComponent(fish.name)}`}
          alt={fish.name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        
        {/* Simple overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        
        {/* Confidence badge - always visible */}
        {fish.confidence && (
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-green-500/80 backdrop-blur-sm rounded text-white text-xs font-medium">
            {fish.confidence}%
          </div>
        )}
      </div>
      
      {/* Compact Content section */}
      <div className="text-center px-2 pb-2">
        <h3 className="font-medium text-gray-700 text-xs sm:text-sm group-hover:text-blue-600 transition-colors duration-300 leading-tight truncate">
          {fish.name}
        </h3>
      </div>

      {/* Subtle hover effect */}
      {isHovered && (
        <div className="absolute inset-0 border border-blue-500 border-opacity-40 rounded-xl"></div>
      )}
    </div>
  );
};

export default FishCard;