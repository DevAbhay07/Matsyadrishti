import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import NavbarBottom from '../components/NavbarBottom';
import { uploadFishImage } from '../utils/api';

const ScanPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if we have a captured image from camera
    if (location.state?.capturedImage) {
      setSelectedImage(location.state.capturedImage);
      // Clear the state to prevent re-setting on refresh
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

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

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      setError('');
      setSelectedImage(file);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCapture = () => {
    // In a real app, this would access the camera
    // For demo purposes, we'll just trigger file input
    fileInputRef.current?.click();
  };

  const handleScan = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let imageData = selectedImage;
      
      // If selectedImage is a data URL (from camera), convert it to a File object
      if (typeof selectedImage === 'string' && selectedImage.startsWith('data:')) {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        imageData = new File([blob], `fish-scan-${Date.now()}.jpg`, { type: 'image/jpeg' });
      }
      
      const result = await uploadFishImage(imageData);
      // Navigate to results page with the scan result
      navigate('/result', { state: { result, image: selectedImage } });
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Scan error:', err);
    } finally {
      setLoading(false);
    }
  };

  const previewUrl = selectedImage ? 
    (typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)) : 
    null;

  return (
    <div className="min-h-screen hero-gradient relative overflow-hidden">
      {/* Particle field background */}
      <ParticleField />

      <div className="relative z-10 pb-20">
        {/* Header */}
        <header className="text-center pt-8 pb-6 px-4">
          <div className="animate-slide-down">
            <h1 className="text-3xl font-bold aurora-text mb-2 glow-text">
              Fish Scanner
            </h1>
            <p className="text-marine-200 text-sm">
              Capture or upload a fish image for AI analysis
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="px-4 space-y-6">
          {/* Image Preview */}
          <section className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
              <div className="relative glass-panel p-6">
                {selectedImage ? (
                  <div className="relative group">
                    <div className="aspect-video rounded-2xl overflow-hidden bg-marine-900 bg-opacity-50">
                      <img
                        src={previewUrl}
                        alt="Selected fish"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 bg-opacity-80 rounded-full flex items-center justify-center text-white text-sm hover:bg-opacity-100 transition-all duration-300"
                    >
                      ✕
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-t from-marine-900 via-transparent to-transparent opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity duration-300"></div>
                  </div>
                ) : (
                  <div className="glass-card p-8 text-center border-2 border-dashed border-marine-500 border-opacity-30 rounded-2xl">
                    <div className="text-6xl mb-4 animate-float">📷</div>
                    <p className="text-marine-200 mb-2 font-medium">No image selected</p>
                    <p className="text-sm text-marine-400">
                      Maximum file size: 5MB<br />
                      Supported formats: JPG, PNG, WEBP
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Error Message */}
          {error && (
            <section className="animate-slide-up" style={{animationDelay: '0.4s'}}>
              <div className="glass-card p-4 border border-red-400 border-opacity-50 bg-red-900 bg-opacity-20">
                <p className="text-red-300 text-sm flex items-center">
                  <span className="mr-2">⚠️</span>
                  {error}
                </p>
              </div>
            </section>
          )}

          {/* Action Buttons */}
          <section className="animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
              <div className="relative glass-panel p-6">
                <div className="space-y-4">
                  <button
                    onClick={handleCapture}
                    disabled={loading}
                    className="btn-3d w-full group"
                  >
                    <span className="relative z-10 flex items-center justify-center space-x-3">
                      <span className="text-2xl">📷</span>
                      <span>Take Photo</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-marine-400 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
                  </button>
                  
                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="btn-glass w-full group"
                  >
                    <span className="flex items-center justify-center space-x-3">
                      <span className="text-2xl">📁</span>
                      <span>Upload from Gallery</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Scan Button */}
          {selectedImage && (
            <section className="animate-slide-up" style={{animationDelay: '0.8s'}}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
                <div className="relative glass-panel p-6">
                  {loading ? (
                    <div className="text-center py-8">
                      <Loader text="Analyzing fish..." size="large" />
                    </div>
                  ) : (
                    <button
                      onClick={handleScan}
                      className="btn-3d w-full group"
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-3">
                        <span className="text-2xl">🔍</span>
                        <span className="text-lg">Analyze Fish</span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"></div>
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Tips */}
          <section className="animate-slide-up" style={{animationDelay: '1s'}}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-marine-900 via-marine-800 to-marine-900 opacity-10 rounded-3xl blur-2xl"></div>
              <div className="relative glass-panel p-6">
                <h3 className="font-bold text-marine-200 mb-4 flex items-center">
                  <span className="text-xl mr-2">💡</span>
                  Tips for Better Results
                </h3>
                <ul className="text-sm text-marine-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">•</span>
                    Ensure good lighting conditions
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">•</span>
                    Keep the fish in focus and centered
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">•</span>
                    Avoid shadows and reflections
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">•</span>
                    Capture the whole fish if possible
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">•</span>
                    Clean the camera lens for clarity
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            capture="environment"
          />
        </div>
      </div>

      {/* Floating Navigation */}
      <NavbarBottom />
    </div>
  );
};

export default ScanPage;