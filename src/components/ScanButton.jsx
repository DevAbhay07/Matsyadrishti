import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CameraModal from './CameraModal';
import Icons from './Icons';

const ScanButton = ({ className = '', size = 'large' }) => {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);
  const [showRipple, setShowRipple] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Even more compact size classes for modern design
  const sizeClasses = {
    small: 'w-14 h-14 text-xl',
    medium: 'w-20 h-20 text-2xl',
    large: 'w-28 h-28 text-3xl',
  };

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('🎥 Attempting to access camera...');
      
      // Check if getUserMedia is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not supported in this browser');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera for fish scanning
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      console.log('🎥 Camera access granted');
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
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
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleScanClick = () => {
    console.log('📱 Scan button clicked');
    setIsPressed(true);
    setShowRipple(true);
    
    // Enhanced animation sequence
    setTimeout(() => {
      setShowRipple(false);
    }, 800);
    
    setTimeout(() => {
      setIsPressed(false);
    }, 300);
    
    // Navigate to dedicated scanner screen instead of modal
    setTimeout(() => {
      console.log('📱 Navigating to scanner screen');
      navigate('/scanner');
    }, 400);
  };

  const handleCameraCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      
      // Stop camera and close modal
      stopCamera();
      setIsCameraOpen(false);
      
      // Fully restore body styles
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      
      // Navigate to scan page with captured image
      navigate('/scan', { state: { capturedImage: imageDataUrl } });
    }
  };

  const handleCameraClose = () => {
    stopCamera();
    setIsCameraOpen(false);
    setError(null);
    
    // Fully restore body styles
    document.body.style.overflow = ''; 
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.height = '';
  };

  const handleRetry = () => {
    setError(null);
    startCamera();
  };

  return (
    <>
      <div className="relative">
        {/* Modern scan button with animated gradient background */}
        <button
          onClick={handleScanClick}
          className={`
            ${sizeClasses[size]}
            relative group
            bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700
            hover:from-indigo-700 hover:via-blue-700 hover:to-indigo-800
            text-white rounded-xl
            transition-all duration-200 ease-out
            transform
            hover:scale-102
            shadow-lg
            border border-indigo-400/20
            overflow-hidden
            ${isPressed ? 'scale-95' : ''}
            ${className}
          `}
          style={{
            backdropFilter: "blur(8px)",
            boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)"
          }}
        >
        {/* Dynamic glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-20 rounded-2xl"></div>
        
        {/* Interactive shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        
        {/* Enhanced click ripple effect */}
        {showRipple && (
          <div className="absolute inset-0 rounded-2xl bg-white opacity-30 animate-ripple"></div>
        )}
        
        {/* More compact modern scan icon with animation */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="relative">
            <Icons.Camera className="w-10 h-10 text-white opacity-90" />
            <div className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 border-2 border-white animate-pulse"></div>
          </div>
        </div>
        
        {/* Subtle glow animation */}
        <div className="absolute inset-0 rounded-xl border border-white/0 group-hover:border-white/20 group-hover:scale-105 transition-all duration-500 ease-out"></div>
      </button>

      {/* Minimalist tooltip that fades in on hover */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center w-max">
        <div className="bg-indigo-900/50 backdrop-blur-md px-2 py-1 rounded-md shadow-lg 
                      border border-indigo-400/10
                      opacity-0 group-hover:opacity-100 
                      transition-opacity duration-200">
          <span className="text-white text-xs font-light tracking-wide">Scan</span>
        </div>
      </div>
    </div>

    {/* Camera Modal - Portal-style for complete separation from parent */}
    {isCameraOpen && (
      <CameraModal
        isOpen={isCameraOpen}
        videoRef={videoRef}
        error={error}
        isLoading={isLoading}
        onCapture={handleCameraCapture}
        onClose={handleCameraClose}
        onRetry={handleRetry}
        title="Fish Scanner"
        description="Position the fish clearly in the frame and capture"
      />
    )}
    
    {/* Hidden canvas for capturing */}
    <canvas ref={canvasRef} className="hidden" />
    </>
  );
};

export default ScanButton;