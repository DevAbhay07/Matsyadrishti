import React from 'react';

const NutrientBarChart = ({ species, nutrition, className = '' }) => {
  // Use nutrition prop or fallback to data prop for backward compatibility
  const nutritionData = nutrition || {};
  const maxValue = 100; // Use fixed scale of 100 for percentage-based display

  const nutrients = [
    { key: 'protein', label: 'Protein', color: 'bg-blue-400', icon: '🥩' },
    { key: 'omega3', label: 'Omega-3', color: 'bg-green-400', icon: '🐟' },
    { key: 'vitamins', label: 'Vitamins', color: 'bg-yellow-400', icon: '💊' },
    { key: 'minerals', label: 'Minerals', color: 'bg-purple-400', icon: '⚡' },
  ];

  return (
    <div className={`${className}`}>
      <div className="space-y-4">
        {nutrients.map((nutrient) => {
          const value = nutritionData[nutrient.key] || 0;
          const percentage = Math.min(value, 100);
          
          return (
            <div key={nutrient.key} className="flex items-center space-x-3">
              <div className="flex items-center w-24 text-sm font-medium text-white">
                <span className="mr-2">{nutrient.icon}</span>
                {nutrient.label}
              </div>
              <div className="flex-1">
                <div className="bg-white/20 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full ${nutrient.color} transition-all duration-1000 ease-out rounded-full`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-sm font-semibold text-white text-right">
                {value}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NutrientBarChart;