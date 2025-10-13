import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarBottom from '../components/NavbarBottom';
import ResultInfoCard from '../components/ResultInfoCard';
import NutrientBarChart from '../components/NutrientBarChart';
import { saveToHistory } from '../utils/api';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Component mount logic can go here if needed
  }, []);

  // Get fish data from navigation state
  const fishData = location.state?.fishData;
  const capturedImage = location.state?.capturedImage;
  const scanTime = location.state?.scanTime;
  const isTest = location.state?.isTest;

  // Fallback dummy data if no state is passed
  const defaultFishData = {
    species: 'Unknown Fish',
    confidence: 0,
    scientificName: 'N/A',
    description: 'No fish data available. Please try scanning again.',
    habitat: 'Unknown',
    diet: 'Unknown',
    averageSize: 'Unknown',
    weight: 'Unknown',
    conservation: 'Unknown',
    nutritionalInfo: {
      protein: 0,
      omega3: 0,
      vitamins: 0,
      minerals: 0
    }
  };

  const fish = fishData || defaultFishData;

  const ParticleField = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="particle absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );

  const handleSaveToHistory = async () => {
    setSaving(true);
    try {
      // Save to localStorage for now (can be replaced with API call later)
      const historyEntry = {
        ...fish,
        capturedImage,
        scanTime: scanTime || new Date().toISOString(),
        isTest
      };
      
      const existingHistory = JSON.parse(localStorage.getItem('fishHistory') || '[]');
      const newHistory = [historyEntry, ...existingHistory].slice(0, 50); // Keep last 50 entries
      localStorage.setItem('fishHistory', JSON.stringify(newHistory));
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save to history:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewHistory = () => {
    navigate('/history');
  };

    const getFreshnessColor = (freshness) => {
    switch (freshness?.toLowerCase()) {
      case 'very fresh':
        return 'text-green-400 bg-green-900 bg-opacity-20 border-green-400 border-opacity-50';
      case 'fresh':
        return 'text-emerald-400 bg-emerald-900 bg-opacity-20 border-emerald-400 border-opacity-50';
      case 'moderate':
        return 'text-yellow-400 bg-yellow-900 bg-opacity-20 border-yellow-400 border-opacity-50';
      case 'poor':
        return 'text-red-400 bg-red-900 bg-opacity-20 border-red-400 border-opacity-50';
      default:
        return 'text-marine-400 bg-marine-900 bg-opacity-20 border-marine-400 border-opacity-50';
    }
  };

  const confidenceColor = (confidence) => {
    if (confidence >= 95) return 'text-green-400';
    if (confidence >= 85) return 'text-emerald-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Enhanced underwater effects */}
      <div className="underwater-rays"></div>
      <div className="caustic-waves"></div>
      
      {/* Floating bubbles */}
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      <div className="floating-bubble"></div>
      
      {/* Particle field background */}
      <ParticleField />

      <div className="relative z-10 pb-20">
        {/* Header */}
        <header className="text-center pt-8 pb-6 px-4">
          <div className="animate-slide-down">
            <h1 className="text-3xl font-bold aurora-text mb-2 glow-text">
              Analysis Results
            </h1>
            <p className="text-marine-200 text-sm">
              AI-powered fish identification and analysis
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-4 space-y-6">
          {/* Scanned Image */}
          {capturedImage && (
            <section className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 opacity-20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <span className="text-xl mr-2">📷</span>
                    Captured Image
                    {isTest && <span className="ml-2 text-xs bg-green-500 px-2 py-1 rounded-full">TEST</span>}
                  </h3>
                  <div className="aspect-video rounded-xl overflow-hidden bg-black/20">
                    <img
                      src={capturedImage}
                      alt="Scanned fish"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-blue-500/20 flex items-center justify-center text-white/60" style={{display: 'none'}}>
                      📷 Sample Fish Image
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Fish Identification */}
          <section className="animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 opacity-20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4 animate-pulse">🐟</div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {fish.species}
                  </h2>
                  <p className="text-blue-200 italic mb-4 text-lg">
                    {fish.scientificName}
                  </p>
                  <div className={`inline-block px-6 py-3 rounded-full text-sm font-bold border-2 ${
                    fish.confidence >= 90 ? 'bg-green-500/20 border-green-400 text-green-300' :
                    fish.confidence >= 70 ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300' :
                    'bg-red-500/20 border-red-400 text-red-300'
                  }`}>
                    <span className="mr-2">🎯</span>
                    {fish.confidence}% Confidence
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fish Details */}
          <section className="animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <span className="text-xl mr-2">📖</span>
                Description
              </h3>
              <p className="text-blue-100 leading-relaxed">{fish.description}</p>
            </div>
          </section>

          {/* Habitat & Diet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up" style={{animationDelay: '0.7s'}}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <span className="text-xl mr-2">🌊</span>
                Habitat
              </h3>
              <p className="text-blue-100">{fish.habitat}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <span className="text-xl mr-2">🍽️</span>
                Diet
              </h3>
              <p className="text-blue-100">{fish.diet}</p>
            </div>
          </div>

          {/* Physical Characteristics */}
          <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{animationDelay: '0.8s'}}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
              <div className="text-2xl mb-2">📏</div>
              <div className="text-sm text-blue-200">Average Size</div>
              <div className="text-lg font-bold text-white">{fish.averageSize}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
              <div className="text-2xl mb-2">⚖️</div>
              <div className="text-sm text-blue-200">Weight</div>
              <div className="text-lg font-bold text-white">{fish.weight}</div>
            </div>
          </div>

          {/* Conservation Status */}
          <section className="animate-slide-up" style={{animationDelay: '0.9s'}}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <span className="text-xl mr-2">🌱</span>
                Conservation Status
              </h3>
              <div className={`inline-block px-4 py-2 rounded-full font-medium ${
                fish.conservation === 'Least Concern' ? 'bg-green-500/20 text-green-300' :
                fish.conservation === 'Vulnerable' ? 'bg-yellow-500/20 text-yellow-300' :
                fish.conservation === 'Endangered' || fish.conservation === 'Critically Endangered' ? 'bg-red-500/20 text-red-300' :
                'bg-gray-500/20 text-gray-300'
              }`}>
                {fish.conservation}
              </div>
            </div>
          </section>

          {/* Nutritional Information */}
          {fish.nutritionalInfo && (
            <section className="animate-slide-up" style={{animationDelay: '1.0s'}}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-semibold mb-4 flex items-center">
                  <span className="text-xl mr-2">📊</span>
                  Nutritional Profile
                </h3>
                <NutrientBarChart species={fish.species} nutrition={fish.nutritionalInfo} />
              </div>
            </section>
          )}

          {/* Success Message */}
          {saved && (
            <div className="bg-green-500/20 border border-green-400/30 rounded-2xl p-4 animate-slide-up">
              <p className="text-green-300 text-sm flex items-center justify-center">
                <span className="mr-2">✅</span>
                Saved to history successfully!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <section className="animate-slide-up space-y-4" style={{animationDelay: '1.1s'}}>
            <button
              onClick={handleSaveToHistory}
              disabled={saving || saved}
              className={`w-full py-4 px-6 rounded-2xl font-semibold flex items-center justify-center space-x-3 transition-all shadow-lg ${
                saved ? 'bg-green-500/20 border-green-400/50 text-green-300' :
                saving ? 'bg-gray-500/20 border-gray-400/50 text-gray-300' :
                'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
              } border disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="text-xl">💾</span>
              <span>{saving ? 'Saving...' : saved ? 'Saved!' : 'Save to History'}</span>
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleBackToHome}
                className="bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-2xl font-medium transition-colors backdrop-blur-sm border border-white/20"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>🏠</span>
                  <span>Home</span>
                </div>
              </button>
              
              <button
                onClick={() => navigate('/scanner')}
                className="bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-2xl font-medium transition-colors backdrop-blur-sm border border-white/20"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>�</span>
                  <span>Scan Again</span>
                </div>
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Floating Navigation */}
      <NavbarBottom />
    </div>
  );
};

export default ResultPage;