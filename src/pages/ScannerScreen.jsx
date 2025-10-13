import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera as CameraIcon, RefreshCw } from 'lucide-react';

const ScannerScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Dummy fish data for testing
  const dummyFishData = [
    {
      id: 1,
      species: 'Atlantic Salmon',
      confidence: 95,
      scientificName: 'Salmo salar',
      description: 'A popular migratory fish known for its pink flesh and excellent taste. Atlantic salmon are anadromous, meaning they live in the ocean but spawn in freshwater rivers.',
      habitat: 'Cold oceans and rivers of the North Atlantic',
      diet: 'Crustaceans, small fish, squid, and marine worms',
      averageSize: '70-76 cm',
      weight: '2.8-4.5 kg',
      conservation: 'Least Concern',
      nutritionalInfo: {
        protein: 85,
        omega3: 90,
        vitamins: 75,
        minerals: 70
      }
    },
    {
      id: 2,
      species: 'Bluefin Tuna',
      confidence: 92,
      scientificName: 'Thunnus thynnus',
      description: 'A large, fast-swimming fish prized for its rich, red meat. Bluefin tuna are among the fastest fish in the ocean and can dive to depths of over 1000 meters.',
      habitat: 'Warm and temperate waters worldwide',
      diet: 'Small schooling fish, squid, and crustaceans',
      averageSize: '200-250 cm',
      weight: '200-400 kg',
      conservation: 'Critically Endangered',
      nutritionalInfo: {
        protein: 95,
        omega3: 85,
        vitamins: 80,
        minerals: 75
      }
    },
    {
      id: 3,
      species: 'Rainbow Trout',
      confidence: 88,
      scientificName: 'Oncorhynchus mykiss',
      description: 'A colorful freshwater fish popular among anglers. Rainbow trout are known for their distinctive pink stripe and excellent fighting ability when hooked.',
      habitat: 'Cold freshwater streams, rivers, and lakes',
      diet: 'Insects, small fish, and aquatic invertebrates',
      averageSize: '30-40 cm',
      weight: '0.5-2 kg',
      conservation: 'Least Concern',
      nutritionalInfo: {
        protein: 80,
        omega3: 70,
        vitamins: 85,
        minerals: 65
      }
    },
    {
      id: 4,
      species: 'Red Snapper',
      confidence: 89,
      scientificName: 'Lutjanus campechanus',
      description: 'A popular game and food fish with distinctive red coloration. Red snappers are prized for their firm, white flesh and mild flavor.',
      habitat: 'Gulf of Mexico and southeastern Atlantic coast',
      diet: 'Fish, shrimp, crabs, and other crustaceans',
      averageSize: '35-60 cm',
      weight: '1-15 kg',
      conservation: 'Vulnerable',
      nutritionalInfo: {
        protein: 90,
        omega3: 60,
        vitamins: 70,
        minerals: 80
      }
    }
  ];

  useEffect(() => {
    // Start camera when component mounts
    startCamera();
    
    // Cleanup when component unmounts
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('🎥 Attempting to access camera...');
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      console.log('🎥 Camera access granted');
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsLoading(false);
    } catch (error) {
      console.error('🚫 Error accessing camera:', error);
      let errorMessage = 'Camera access denied. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera permissions and try again.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Camera not supported in this browser.';
      } else {
        errorMessage += error.message || 'Unknown error occurred.';
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    setIsScanning(true);
    
    let imageDataUrl = null;
    
    // Capture image if camera is available
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    }
    
    // Simulate scanning delay
    setTimeout(() => {
      const randomFish = dummyFishData[Math.floor(Math.random() * dummyFishData.length)];
      
      // Stop camera
      stopCamera();
      
      // Navigate to results page with dummy data
      navigate('/result', { 
        state: { 
          fishData: randomFish,
          capturedImage: imageDataUrl || '/images/sample-fish.jpg',
          scanTime: new Date().toISOString()
        } 
      });
    }, 2000); // 2 second delay to simulate processing
  };

  const handleTestScan = () => {
    // Quick test with dummy data (no camera needed)
    const randomFish = dummyFishData[0]; // Always use salmon for test
    navigate('/result', { 
      state: { 
        fishData: randomFish,
        capturedImage: '/images/sample-salmon.jpg',
        scanTime: new Date().toISOString(),
        isTest: true
      } 
    });
  };

  const handleClose = () => {
    stopCamera();
    navigate('/');
  };

  const handleRetry = () => {
    setError(null);
    startCamera();
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-indigo-500 to-purple-600 flex flex-col">
      {/* Header */}
      <div className="relative flex items-center justify-between p-6 bg-black/20">
        <div className="text-center flex-1">
          <h1 className="text-2xl font-bold text-white mb-1">Matsya Drishti</h1>
          <p className="text-white/80 text-xs uppercase tracking-wider">AI-Powered Marine Intelligence</p>
          <p className="text-white/70 text-xs mt-1">Position the fish clearly in the frame and capture</p>
        </div>
        
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 flex flex-col px-4 pb-4">
        {error ? (
          <div className="flex-1 bg-white/90 p-6 text-center rounded-xl flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CameraIcon className="w-8 h-8 text-red-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Camera Access Required</h4>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              <button
                onClick={handleClose}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-md font-medium transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Camera Preview */}
            <div className="flex-1 relative overflow-hidden rounded-2xl shadow-xl" style={{ minHeight: '60vh' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                style={{ objectFit: 'cover' }}
              />
              
              {/* Loading State */}
              {isLoading && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white rounded-2xl">
                  <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                  <p className="text-sm font-medium text-white">Initializing Camera...</p>
                </div>
              )}

              {/* Scanning State */}
              {isScanning && (
                <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white rounded-2xl">
                  <div className="w-20 h-20 border-4 border-purple-400/20 border-t-purple-400 rounded-full animate-spin mb-6"></div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white mb-2">Analyzing Fish...</p>
                    <p className="text-sm text-purple-200">AI is processing your capture</p>
                  </div>
                  <div className="mt-6 flex space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}
              
              {/* Camera Frame Overlay */}
              {!isLoading && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Main frame */}
                    <div className="border-2 border-purple-400 absolute inset-10 shadow-[0_0_15px_rgba(147,51,234,0.5)] rounded-lg"></div>
                    
                    {/* Corner markers */}
                    <div className="absolute top-10 left-10 w-12 h-12 border-l-4 border-t-4 border-purple-400 rounded-tl-xl"></div>
                    <div className="absolute top-10 right-10 w-12 h-12 border-r-4 border-t-4 border-purple-400 rounded-tr-xl"></div>
                    <div className="absolute bottom-10 left-10 w-12 h-12 border-l-4 border-b-4 border-purple-400 rounded-bl-xl"></div>
                    <div className="absolute bottom-10 right-10 w-12 h-12 border-r-4 border-b-4 border-purple-400 rounded-br-xl"></div>
                    
                    {/* Center crosshair */}
                    <div className="absolute top-1/2 left-1/2 w-12 h-12 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-purple-400 transform -translate-y-1/2 opacity-80"></div>
                      <div className="absolute left-1/2 top-0 h-full w-0.5 bg-purple-400 transform -translate-x-1/2 opacity-80"></div>
                      <div className="absolute inset-0 border border-purple-400 rounded-full animate-ping opacity-30"></div>
                    </div>
                    
                    {/* Helper text */}
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-black/30 px-4 py-1.5 rounded-full">
                      <p className="text-white text-xs font-medium">Center fish in frame</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 py-6 bg-gradient-to-t from-black/30 to-transparent">
              {/* Primary Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleCapture}
                  disabled={isLoading || isScanning}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <CameraIcon className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    {isScanning ? 'Analyzing...' : isLoading ? 'Loading...' : 'Capture & Identify'}
                  </span>
                </button>
                
                <button
                  onClick={handleClose}
                  disabled={isScanning}
                  className="px-6 bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl font-medium transition-colors backdrop-blur-sm disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>

              {/* Test Button */}
              <button
                onClick={handleTestScan}
                disabled={isScanning}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-lg disabled:opacity-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium">🐟 Test with Dummy Data</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ScannerScreen;