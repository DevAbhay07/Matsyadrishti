import React from 'react';

const Loader = ({ size = 'medium', text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin-slow mb-4`}>
        <div className="w-full h-full border-4 border-marine-200 border-t-marine-600 rounded-full"></div>
      </div>
      {text && (
        <p className="text-gray-600 text-sm font-medium animate-pulse-slow">{text}</p>
      )}
    </div>
  );
};

export default Loader;