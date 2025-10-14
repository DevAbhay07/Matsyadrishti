import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Camera as CameraIcon, RefreshCw, Upload } from 'lucide-react';

const ScannerScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

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

  useEffect(() => {
    // Handle captured image from location state (from ScanButton)
    if (location.state && location.state.capturedImage) {
      setCapturedImage(location.state.capturedImage);
      // Clear the location state to prevent re-processing
      navigate('/scanner', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    // Automatically process uploaded image when capturedImage is set
    if (capturedImage) {
      processImage(capturedImage);
    }
  }, [capturedImage]);

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

  const processImage = (imageDataUrl) => {
    setIsScanning(true);
    
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

  const handleCapture = () => {
    let imageDataUrl = null;
    
    // Check if we have a captured image from upload
    if (capturedImage) {
      imageDataUrl = capturedImage;
    } else if (videoRef.current && canvasRef.current) {
      // Capture image from camera if available
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    }
    
    processImage(imageDataUrl);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setCapturedImage(imageDataUrl);
        // Process the uploaded image
        processImage(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-yellow-50 via-white to-sky-50 flex flex-col">
      {/* Header */}
      <div className="relative flex items-center justify-between p-6">
        {/* Top-left icon button */}
        <button 
          onClick={handleClose}
          className="w-10 h-10 rounded-full bg-blue-100/40 flex items-center justify-center hover:bg-blue-100/60 transition-colors backdrop-blur-sm shadow-sm"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="text-center flex-1 px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Matsya Drishti</h1>
          <p className="text-gray-600 text-sm mt-1">Position the fish clearly in the frame and capture</p>
        </div>
        
        {/* Top-right icon button */}
        <button 
          className="w-10 h-10 rounded-full bg-blue-100/40 flex items-center justify-center hover:bg-blue-100/60 transition-colors backdrop-blur-sm shadow-sm"
        >
          <CameraIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Camera View */}
      <div className="flex-1 flex flex-col px-4 pb-4">
        {error ? (
          <div className="flex-1 bg-white/95 p-6 text-center rounded-xl flex flex-col items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)' }}>
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CameraIcon className="w-8 h-8 text-blue-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Camera Access Required</h4>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleRetry}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              <button
                onClick={handleClose}
                className="bg-blue-100 hover:bg-blue-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
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
                <div className="absolute inset-0 bg-blue-900/40 flex flex-col items-center justify-center text-white rounded-2xl backdrop-blur-sm">
                  <div className="w-16 h-16 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin mb-4"></div>
                  <p className="text-sm font-medium text-white">Initializing Camera...</p>
                </div>
              )}

              {/* Scanning State */}
              {isScanning && (
                <div className="absolute inset-0 bg-blue-900/60 flex flex-col items-center justify-center text-white rounded-2xl backdrop-blur-sm">
                  <div className="w-20 h-20 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin mb-6"></div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white mb-2">Analyzing Fish...</p>
                    <p className="text-sm text-blue-200">AI is processing your capture</p>
                  </div>
                  <div className="mt-6 flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}
              
              {/* Camera Frame Overlay */}
              {!isLoading && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Main frame */}
                    <div className="border-2 border-blue-400 absolute inset-10 shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-lg"></div>
                    
                    {/* Corner markers */}
                    <div className="absolute top-10 left-10 w-12 h-12 border-l-4 border-t-4 border-blue-400 rounded-tl-xl"></div>
                    <div className="absolute top-10 right-10 w-12 h-12 border-r-4 border-t-4 border-blue-400 rounded-tr-xl"></div>
                    <div className="absolute bottom-10 left-10 w-12 h-12 border-l-4 border-b-4 border-blue-400 rounded-bl-xl"></div>
                    <div className="absolute bottom-10 right-10 w-12 h-12 border-r-4 border-b-4 border-blue-400 rounded-br-xl"></div>
                    
                    {/* Center crosshair */}
                    <div className="absolute top-1/2 left-1/2 w-12 h-12 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-400 transform -translate-y-1/2 opacity-80"></div>
                      <div className="absolute left-1/2 top-0 h-full w-0.5 bg-blue-400 transform -translate-x-1/2 opacity-80"></div>
                      <div className="absolute inset-0 border border-blue-400 rounded-full animate-ping opacity-30"></div>
                    </div>
                    
                    {/* Helper text */}
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-blue-900/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
                      <p className="text-white text-xs font-medium">Center fish in frame</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 py-6 bg-gradient-to-t from-blue-100/30 to-transparent backdrop-blur-sm">
              {/* Primary Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleCapture}
                  disabled={isLoading || isScanning}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <CameraIcon className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    {isScanning ? 'Analyzing...' : isLoading ? 'Loading...' : 'Capture & Identify'}
                  </span>
                </button>
                
                <button
                  onClick={handleUploadClick}
                  disabled={isScanning}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <Upload className="w-5 h-5" />
                  <span className="text-sm font-semibold">Upload Image</span>
                </button>
              </div>
              
              {/* Secondary Actions */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleClose}
                  disabled={isScanning}
                  className="flex-1 bg-blue-100/60 hover:bg-blue-100/80 text-gray-700 py-4 rounded-xl font-medium transition-colors backdrop-blur-sm disabled:opacity-50 shadow-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default ScannerScreen;