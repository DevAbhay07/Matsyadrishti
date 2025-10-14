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
      className={`group relative overflow-hidden fish-card bg-gradient-to-br from-blue-50 to-blue-25 rounded-lg shadow-sm ${className}`}
      onClick={() => onClick && onClick(fish)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        background: 'linear-gradient(135deg, #E6F3FF 0%, #F5FAFF 100%)'
      }}
    >
      {/* Image container - complements blue gradient card */}
      <div className="relative h-16 sm:h-20 md:h-24 rounded-lg overflow-hidden bg-blue-25/30 mb-2 flex-shrink-0">
        {/* Loading skeleton - blend with blue gradient */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-blue-100/40 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 via-blue-50 to-transparent opacity-50 animate-shimmer"></div>
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
        
        {/* Subtle overlay on hover - blue theme */}
        <div className="absolute inset-0 bg-blue-200 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        
        {/* Confidence badge - softened for seamless look */}
        {fish.confidence && (
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-green-400/70 rounded text-white text-xs font-medium shadow-sm">
            {fish.confidence}%
          </div>
        )}
      </div>
      
      {/* Content section - seamless with background */}
      <div className="text-center px-2 pb-2">
        <h3 className="font-medium text-gray-700 text-xs sm:text-sm group-hover:text-gray-900 transition-colors duration-300 leading-tight truncate">
          {fish.name}
        </h3>
      </div>

      {/* Very subtle hover effect - complements blue gradient */}
      {isHovered && (
        <div className="absolute inset-0 bg-blue-100/20 rounded-lg transition-all duration-300"></div>
      )}
    </div>
  );
};

export default FishCard;