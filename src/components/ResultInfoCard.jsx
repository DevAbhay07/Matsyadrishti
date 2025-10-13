import React from 'react';

const ResultInfoCard = ({ title, value, unit, icon, className = '' }) => {
  return (
    <div className={`card p-4 text-center ${className}`}>
      {icon && (
        <div className="text-2xl mb-2">{icon}</div>
      )}
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <div className="flex items-baseline justify-center">
        <span className="text-xl font-bold text-gray-800">{value}</span>
        {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
      </div>
    </div>
  );
};

export default ResultInfoCard;