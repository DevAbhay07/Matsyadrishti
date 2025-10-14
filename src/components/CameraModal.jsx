import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

import { X, ScanLine, Camera as CameraIcon, Loader2, RefreshCw } from 'lucide-react'

const CameraModal = ({
  isOpen = false,
  videoRef,
  error = null,
  isLoading = false,
  onCapture,
  onClose,
  onDownload,
  title = "Fish Scanner",
  description = "Position the fish clearly in the frame and capture",
  onRetry
}) => {
  if (!isOpen) return null

  console.log('📱 CameraModal render - isLoading:', isLoading, 'error:', error)

  // Handle video loaded data
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedData = () => {
        console.log('📱 Video loaded and ready to play')
      }
      
      video.addEventListener('loadeddata', handleLoadedData)
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
      }
    }
  }, [videoRef])

  const modalContent = (
    <div 
      className="camera-modal-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10000,
        background: 'linear-gradient(135deg, #E6F3FF 0%, #F5FAFF 50%, #E0F2FE 100%)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header with title and navigation buttons */}
      <div className="relative flex items-center justify-between p-6">
        {/* Top-left icon button */}
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-blue-100/40 flex items-center justify-center hover:bg-blue-100/60 transition-colors backdrop-blur-sm shadow-sm"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="text-center flex-1 px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Matsya Drishti</h1>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>
        
        {/* Top-right icon button */}
        <button 
          className="w-10 h-10 rounded-full bg-blue-100/40 flex items-center justify-center hover:bg-blue-100/60 transition-colors backdrop-blur-sm shadow-sm"
        >
          <ScanLine className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Main Camera View - Full Screen */}
      <div className="flex-1 flex flex-col relative" style={{ minHeight: 'calc(100vh - 100px)' }}>
        {error ? (
          <div className="flex-1 bg-white/95 p-6 text-center rounded-xl flex flex-col items-center justify-center mx-4 mb-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)' }}>
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CameraIcon className="w-8 h-8 text-blue-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Camera Access Required</h4>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{error}</p>
            <div className="flex gap-3 justify-center">
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="bg-blue-100 hover:bg-blue-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Camera container - Full Screen */}
            <div className="flex-1 relative overflow-hidden mx-4 mb-4 rounded-2xl shadow-xl" style={{ minHeight: '60vh' }}>
              {/* Video Element - Full Camera Preview */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                style={{ objectFit: 'cover' }}
                onLoadedData={() => console.log('📱 Video loaded')}
                onCanPlay={() => console.log('📱 Video can play')}
              />
                
                {/* Loading State */}
                {isLoading && (
                  <div className="absolute inset-0 bg-blue-900/40 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                    <div className="w-16 h-16 border-4 border-blue-200/30 border-t-blue-400 rounded-full animate-spin mb-4"></div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-white">Initializing Camera...</p>
                    </div>
                  </div>
                )}
                
                {/* Modern frame overlay with blue glowing effect */}
                {!isLoading && (
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Full frame with corner markers and blue borders */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Main blue rectangle with glow */}
                      <div className="border-2 border-blue-400 absolute inset-10 shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-lg"></div>
                      
                      {/* Corner L-shapes with modern design */}
                      <div className="absolute top-10 left-10 w-12 h-12 border-l-4 border-t-4 border-blue-400 rounded-tl-xl"></div>
                      <div className="absolute top-10 right-10 w-12 h-12 border-r-4 border-t-4 border-blue-400 rounded-tr-xl"></div>
                      <div className="absolute bottom-10 left-10 w-12 h-12 border-l-4 border-b-4 border-blue-400 rounded-bl-xl"></div>
                      <div className="absolute bottom-10 right-10 w-12 h-12 border-r-4 border-b-4 border-blue-400 rounded-br-xl"></div>
                      
                      {/* Center crosshair with pulse animation */}
                      <div className="absolute top-1/2 left-1/2 w-12 h-12 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-400 transform -translate-y-1/2 opacity-80"></div>
                        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-blue-400 transform -translate-x-1/2 opacity-80"></div>
                        <div className="absolute inset-0 border border-blue-400 rounded-full animate-ping opacity-30"></div>
                      </div>
                      
                      {/* Helper text at the top of the frame */}
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-blue-900/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
                        <p className="text-white text-xs font-medium">Center fish in frame</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            {/* Clean, Modern Action Buttons with home page styling */}
            <div className="flex items-center justify-between px-4 py-6 bg-gradient-to-t from-blue-100/30 to-transparent backdrop-blur-sm">
              {/* Capture button with home page styling */}
                <button
                  onClick={onCapture}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed mr-3 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-sky-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                      <CameraIcon className="w-5 h-5" />
                    </span>
                  </div>
                  <span className="text-sm font-semibold ml-8 mr-2">
                    {isLoading ? 'Processing...' : 'Capture & Identify'}
                  </span>
                </button>
                
                {onDownload && (
                  <button
                    onClick={onDownload}
                    disabled={isLoading}
                    className="flex-1 bg-blue-100/60 hover:bg-blue-100/80 text-gray-700 py-4 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mr-3 backdrop-blur-sm shadow-sm"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      <span>Save</span>
                    </div>
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="flex-1 bg-blue-100/60 hover:bg-blue-100/80 text-gray-700 py-4 rounded-xl font-medium transition-colors backdrop-blur-sm shadow-sm"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </div>
                </button>
              </div>
            </>
          )}
      </div>
    </div>
  )

  // Use createPortal to render the modal outside the component tree
  return createPortal(modalContent, document.body)
}

export default CameraModal