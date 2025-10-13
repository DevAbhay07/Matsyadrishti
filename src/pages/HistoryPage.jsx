import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarBottom from '../components/NavbarBottom';
import { getHistory, clearHistory } from '../utils/api';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

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

  const loadHistory = async () => {
    try {
      setLoading(true);
      const result = await getHistory();
      setHistory(result.data || []);
    } catch (err) {
      setError('Failed to load history');
      console.error('History loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      return;
    }

    try {
      setClearing(true);
      await clearHistory();
      setHistory([]);
    } catch (err) {
      setError('Failed to clear history');
      console.error('Clear history error:', err);
    } finally {
      setClearing(false);
    }
  };

  const handleItemClick = (item) => {
    navigate('/result', { 
      state: { 
        result: item.result,
        image: null
      } 
    });
  };

  const getFreshnessColor = (freshness) => {
    switch (freshness?.toLowerCase()) {
      case 'very fresh':
        return 'text-green-400 bg-green-900 bg-opacity-20 border-green-400 border-opacity-30';
      case 'fresh':
        return 'text-emerald-400 bg-emerald-900 bg-opacity-20 border-emerald-400 border-opacity-30';
      case 'moderate':
        return 'text-yellow-400 bg-yellow-900 bg-opacity-20 border-yellow-400 border-opacity-30';
      case 'poor':
        return 'text-red-400 bg-red-900 bg-opacity-20 border-red-400 border-opacity-30';
      default:
        return 'text-marine-400 bg-marine-900 bg-opacity-20 border-marine-400 border-opacity-30';
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
      
      <ParticleField />
      <div className="relative z-10 pb-20">
        <header className="text-center pt-8 pb-6 px-4">
          <div className="animate-slide-down">
            <h1 className="text-3xl font-bold aurora-text mb-2 glow-text">
              Scan History
            </h1>
            <p className="text-marine-200 text-sm">
              View your previous fish identification results
            </p>
          </div>
        </header>

        <div className="px-4 space-y-6">
          {history.length > 0 && (
            <section className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="text-center">
                <button
                  onClick={handleClearHistory}
                  disabled={clearing}
                  className="btn-glass group text-red-400 border-red-400 border-opacity-50 hover:bg-red-900 hover:bg-opacity-20"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>🗑️</span>
                    <span>{clearing ? 'Clearing...' : 'Clear History'}</span>
                  </span>
                </button>
              </div>
            </section>
          )}

          {error && (
            <section className="animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="glass-card p-4 border border-red-400 border-opacity-50 bg-red-900 bg-opacity-20">
                <p className="text-red-300 text-sm flex items-center justify-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              </div>
            </section>
          )}

          {loading && (
            <section className="animate-slide-up" style={{animationDelay: '0.6s'}}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
                <div className="relative glass-panel p-8 text-center">
                  <div className="text-4xl mb-4 animate-float">⏳</div>
                  <p className="text-marine-200">Loading history...</p>
                </div>
              </div>
            </section>
          )}

          {!loading && history.length === 0 && !error && (
            <section className="animate-slide-up" style={{animationDelay: '0.6s'}}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
                <div className="relative glass-panel p-8 text-center">
                  <div className="text-6xl mb-4 animate-float">📝</div>
                  <h3 className="text-xl font-bold text-marine-200 mb-2">No History Yet</h3>
                  <p className="text-marine-400 mb-6">
                    Start scanning fish to build your history!
                  </p>
                  <button
                    onClick={() => navigate('/scan')}
                    className="btn-3d group"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <span className="text-xl">🔍</span>
                      <span>Start Scanning</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-marine-400 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </section>
          )}

          {!loading && history.length > 0 && (
            <section className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={item.id || index}
                  className="animate-slide-up cursor-pointer group"
                  style={{animationDelay: `${0.6 + index * 0.1}s`}}
                  onClick={() => handleItemClick(item)}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
                    <div className="relative glass-panel p-6 group-hover:bg-opacity-30 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                          🐟
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-marine-200 group-hover:text-white transition-colors duration-300 truncate">
                                {item.result?.species || 'Unknown Species'}
                              </h3>
                              <p className="text-sm text-marine-400 italic truncate">
                                {item.result?.scientificName || 'Scientific name unavailable'}
                              </p>
                            </div>
                            {item.result?.confidence && (
                              <div className={`text-xs font-medium px-2 py-1 rounded-full ${confidenceColor(item.result.confidence)}`}>
                                {item.result.confidence}%
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            {item.result?.freshness && (
                              <div className={`text-xs px-2 py-1 rounded-full border ${getFreshnessColor(item.result.freshness)}`}>
                                {item.result.freshness}
                              </div>
                            )}
                            <div className="text-xs text-marine-500">
                              {item.scannedAt ? new Date(item.scannedAt).toLocaleDateString() : 'Unknown date'}
                            </div>
                          </div>
                        </div>
                        <div className="text-marine-400 group-hover:text-marine-300 transform group-hover:translate-x-1 transition-all duration-300">
                          →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}

          {!loading && history.length > 0 && (
            <section className="animate-slide-up" style={{animationDelay: `${0.6 + history.length * 0.1 + 0.2}s`}}>
              <div className="text-center">
                <button
                  onClick={() => navigate('/scan')}
                  className="btn-3d group"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span className="text-xl">➕</span>
                    <span>Scan Another Fish</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
      <NavbarBottom />
    </div>
  );
};

export default HistoryPage;