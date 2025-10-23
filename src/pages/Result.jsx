import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'

// ========================================
// IMAGE ASSETS
// ========================================
const leftbracket = "/Image/left-bracket.svg"
const rightbracket = "/Image/right-bracket.svg"
const largediamond = "/Image/diamond-large.svg"
const mediumdiamond = "/Image/diamond-medium.svg"
const smalldiamond = "/Image/diamond-small.svg"

// ========================================
// RESULT COMPONENT
// Main page for image capture and upload
// Features: Live camera, gallery upload, API analysis
// ========================================
const Result = () => {
  // ========================================
  // REFS
  // ========================================
  const videoRef = useRef(null)           // Reference to video element for camera stream
  const canvasRef = useRef(null)          // Reference to canvas for image capture
  const cameraInputRef = useRef(null)     // Hidden file input for camera
  const galleryInputRef = useRef(null)    // Hidden file input for gallery

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const [preview, setPreview] = useState(null)                    // Stores preview image base64
  const [loading, setLoading] = useState(false)                   // Loading state during API call
  const [showCameraPopup, setShowCameraPopup] = useState(false)   // Camera permission popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false) // Success message popup
  const [showCameraModal, setShowCameraModal] = useState(false)   // Live camera modal
  const [stream, setStream] = useState(null)                      // Active camera stream

  // ========================================
  // CLEANUP EFFECT
  // Stops camera stream when component unmounts
  // ========================================
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  // ========================================
  // IMAGE COMPRESSION
  // Compresses gallery images before sending to API
  // Params: file (File), maxWidth (number), quality (number)
  // Returns: Promise<string> - base64 compressed image
  // ========================================
  const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
        resolve(compressedBase64)
      }
      
      img.src = URL.createObjectURL(file)
    })
  }

  // ========================================
  // CAMERA HANDLERS
  // ========================================
  
  // Opens camera permission popup
  const handleCameraClick = () => {
    setShowCameraPopup(true)
  }

  // Requests camera access and opens live camera modal
  const handleAllowCamera = async () => {
    setShowCameraPopup(false)
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      })
      
      setStream(mediaStream)
      setShowCameraModal(true)
      
      // Wait for modal to render before attaching stream
      setTimeout(() => {
        if (videoRef.current && mediaStream) {
          videoRef.current.srcObject = mediaStream
          videoRef.current.play()
        }
      }, 100)
      
    } catch (error) {
      console.error('Camera access denied:', error)
      alert('Camera access was denied. Please allow camera permissions in your browser settings and try again.')
    }
  }

  // Closes camera permission popup without activating camera
  const handleDenyCamera = () => {
    setShowCameraPopup(false)
  }

  // Stops camera stream and closes modal
  const handleCloseCameraModal = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowCameraModal(false)
  }

  // Captures photo from live camera feed
  const handleCapturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return
    
    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    // Set canvas size to match video dimensions
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageSrc = canvas.toDataURL('image/jpeg', 0.9)
    
    // Display preview and start analysis
    setPreview(imageSrc)
    handleCloseCameraModal()
    setLoading(true)
    
    try {
      await sendToAPI(imageSrc)
    } catch (error) {
      console.error('Failed to send to API:', error)
      setLoading(false)
      alert('Failed to analyze image. Please try again.')
    }
  }

  // ========================================
  // GALLERY UPLOAD HANDLER
  // ========================================
  const handleChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      const compressedBase64 = await compressImage(file)
      setPreview(compressedBase64)
      setLoading(true)
      await sendToAPI(compressedBase64)
    } catch (error) {
      console.error('Image compression failed:', error)
      setLoading(false)
    }
  }

  // ========================================
  // SUCCESS HANDLER
  // Redirects to demographics selection page
  // ========================================
  const handleSuccessOK = () => {
    setShowSuccessPopup(false)
    window.location.href = '/select'
  }

  // ========================================
  // API INTEGRATION
  // Sends image to analysis endpoint
  // NOTE: API expects lowercase 'image' field with base64 data (no prefix)
  // ========================================
  const sendToAPI = async (base64) => {
    try {
      console.log('Sending image to API...')
      
      // Store image in localStorage for later use
      localStorage.setItem('uploadedImage', base64)
      
      // Strip the data:image/jpeg;base64, prefix
      let base64Data = base64
      if (base64.includes(',')) {
        base64Data = base64.split(',')[1]
      }
      
      // API expects lowercase 'image' field (case-sensitive)
      const payload = {
        image: base64Data
      }
      
      console.log('Sending payload with image length:', base64Data.length)
      
      const response = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()
      console.log('API Response:', result)
      
      // Check for successful response
      if (!response.ok || !result.success) {
        throw new Error(result.message || `API Error: ${response.status}`)
      }
      
      // Store analysis results and show success popup
      if (result.data) {
        localStorage.setItem('skinstricApiResponse', JSON.stringify(result.data))
        setLoading(false)
        setShowSuccessPopup(true)
      } else {
        throw new Error('Invalid API response format')
      }
      
    } catch (error) {
      console.error('Analysis failed:', error)
      setLoading(false)
      alert('Failed to analyze image. Please try again.')
    }
  }

  // ========================================
  // DIAMOND BACKGROUND COMPONENT
  // Animated spinning diamond background for camera/gallery sections
  // ========================================
  const DiamondBackground = () => (
    <div className="absolute inset-0 flex items-center justify-center -z-10">
      {/* Large diamond - slowest rotation */}
      <div 
        className="absolute animate-spin-slow bg-black opacity-90"
        style={{ 
          width: '500px', 
          height: '500px',
          maskImage: `url(${largediamond})`,
          WebkitMaskImage: `url(${largediamond})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center'
        }}
      />
      {/* Medium diamond - medium rotation */}
      <div 
        className="absolute animate-spin-slower bg-black opacity-90"
        style={{ 
          width: '450px', 
          height: '450px',
          maskImage: `url(${mediumdiamond})`,
          WebkitMaskImage: `url(${mediumdiamond})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center'
        }}
      />
      {/* Small diamond - fastest rotation */}
      <div 
        className="absolute animate-spin-slowest bg-black opacity-90"
        style={{ 
          width: '400px', 
          height: '400px',
          maskImage: `url(${smalldiamond})`,
          WebkitMaskImage: `url(${smalldiamond})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center'
        }}
      />
    </div>
  )

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="min-h-screen bg-white">
      {/* ==================== LOADING SCREEN ==================== */}
      {loading ? (
        <div className="fixed inset-0 w-screen h-screen bg-white z-[9999] flex flex-col justify-center items-center">
          <div className="relative flex items-center justify-center">
            <img src={largediamond} alt="Large-Diamond" className="animate-spin-slow" />
            <img src={mediumdiamond} alt="Medium-Diamond" className="animate-spin-slower absolute" />
            <img src={smalldiamond} alt="Small-Diamond" className="animate-spin-slowest absolute" />
            
            <div className="absolute flex flex-col items-center justify-center z-10">
              <p className="text-lg font-semibold text-[#1A1B1C] whitespace-nowrap">
                PREPARING YOUR ANALYSIS
              </p>
              <div className="flex space-x-2 mt-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* ==================== HEADER ==================== */}
          <div className="flex flex-row h-[64px] w-full justify-between py-3 mb-3 relative z-[1000]">
            {/* Logo and breadcrumb */}
            <div className="flex flex-row pt-1 scale-75 justify-center items-center">
              <a 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C] z-1000" 
                href="/"
              >
                SKINSTRIC
              </a>
              <img className="w-[4px] h-[17px]" src={leftbracket} alt="left-bracket" />
              <p className="text-[#1a1b1c83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
              <img className="w-[4px] h-[17px]" src={rightbracket} alt="right-bracket" />
            </div>
            {/* Enter Code button */}
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]">
              ENTER CODE
            </button>
          </div>

          {/* ==================== MAIN CONTENT ==================== */}
          <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
            {/* Title */}
            <div className="absolute top-2 left-9 md:left-8 text-left">
              <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
            </div>

            <div className="flex-[0.4] md:flex-1 flex flex-col items-center xl:justify-center relative mb-0 md:mb-30">
              
              {/* Camera and Gallery Options */}
              <div className="flex justify-center items-center gap-[300px] absolute top-[240px] w-full z-20">
                
                {/* ==================== CAMERA SECTION ==================== */}
                <div className="relative flex flex-col items-center">
                  <DiamondBackground />
                  
                  <img 
                    src="/Image/camera-left.svg" 
                    alt="Camera Icon" 
                    className="w-[300px] h-[150px] cursor-pointer"
                    onClick={handleCameraClick}
                  />

                  <div className="absolute -top-[88px] right-[10px] flex flex-col items-center">
                    <div className="text-xs md:text-sm font-normal mb-2 leading-[20px] text-center translate-y-[40px] translate-x-[110px]">
                      <p className="-translate-x-[34px]">ALLOW A.I.</p>
                      <p>TO SCAN YOUR FACE</p>
                    </div>
                    <img 
                      src="/Image/scanline.svg" 
                      alt="Scan Line" 
                      className="w-[60px] h-auto translate-y-[12px] rotate-180"
                    />
                  </div>
                </div>

                {/* ==================== GALLERY SECTION ==================== */}
                <div className="relative flex flex-col items-center">
                  <DiamondBackground />
                  
                  <img 
                    src="/Image/gallery-right.svg" 
                    alt="Gallery Icon" 
                    className="w-[300px] h-[150px] cursor-pointer"
                    onClick={() => galleryInputRef.current?.click()}
                  />

                  <div className="absolute bottom-[-20px] left-[-40px] flex flex-col items-start">
                    <div className="text-xs md:text-sm font-normal leading-[20px] text-left">
                      <p className="mb-1 translate-x-[10px] translate-y-[92px]">ALLOW A.I.</p>
                      <p className="translate-x-[-38px] translate-y-[88px]">ACCESS GALLERY</p>
                    </div>
                    <img 
                      src="/Image/gallery-line.svg" 
                      alt="Gallery Line" 
                      className="w-[60px] h-auto translate-x-[88px] translate-y-[8px]"
                    />
                  </div>
                </div>
              </div>

              {/* ==================== PREVIEW BOX ==================== */}
              <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
                <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
                <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden bg-gray-50">
                  {preview && <img src={preview} alt="Preview" className="w-full h-full object-cover" />}
                </div>
              </div>

              {/* Hidden file inputs */}
              <input
                ref={cameraInputRef}
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleChange}
              />
              <input
                ref={galleryInputRef}
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleChange}
              />
            </div>

            {/* ==================== BACK BUTTON ==================== */}
            <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
              <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
                <a className="relative" aria-label="Back" href="/introduce">
                  <div>
                    {/* Mobile back button */}
                    <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                      <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
                    </div>
                    {/* Desktop back button */}
                    <div className="group hidden sm:flex flex-row relative justify-center items-center">
                      <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                      <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">▶</span>
                      <span className="text-sm font-semibold hidden sm:block ml-6">BACK</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== HIDDEN CANVAS ==================== */}
      {/* Used for capturing camera screenshots */}
      <canvas ref={canvasRef} className="hidden" />

      {/* ==================== CAMERA PERMISSION POPUP ==================== */}
      {showCameraPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" onClick={handleDenyCamera} />
          <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
            <div className="relative pointer-events-auto">
              <img 
                src="/Image/float-info.svg" 
                alt="Camera Permission" 
                className="w-auto h-auto max-w-[90vw]"
              />
              {/* DENY button overlay - left side */}
              <button 
                onClick={handleDenyCamera}
                className="absolute bottom-[8%] left-[15%] w-[30%] h-[12%] bg-transparent cursor-pointer"
                aria-label="Deny camera"
              >
                <span className="sr-only">Deny</span>
              </button>
              {/* ALLOW button overlay - right side */}
              <button 
                onClick={handleAllowCamera}
                className="absolute bottom-[8%] right-[15%] w-[30%] h-[12%] bg-transparent cursor-pointer"
                aria-label="Allow camera"
              >
                <span className="sr-only">Allow</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* ==================== LIVE CAMERA MODAL ==================== */}
      {showCameraModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-90 z-[9998]" />
          <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] p-4">
            <div className="w-full max-w-2xl bg-black rounded-lg overflow-hidden">
              {/* Live video feed */}
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Controls */}
              <div className="flex justify-between items-center p-4 bg-[#1A1B1C]">
                <button 
                  onClick={handleCloseCameraModal}
                  className="px-4 py-2 bg-gray-700 text-white rounded text-sm font-medium hover:bg-gray-600 transition-colors"
                >
                  CANCEL
                </button>
                <button 
                  onClick={handleCapturePhoto}
                  className="px-6 py-2 bg-[#4a9eff] text-white rounded text-sm font-medium hover:bg-[#3a8eef] transition-colors"
                >
                  CAPTURE
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ==================== SUCCESS POPUP ==================== */}
      {showSuccessPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" />
          <div className="fixed inset-0 flex items-center justify-center z-[9999]">
            <div className="bg-[#2a2a2a] text-white p-6 rounded-lg max-w-sm mx-4 text-center">
              <div className="mb-4">
                <p className="text-sm text-gray-300 mb-2">skinstric-wandag.vercel.app says</p>
                <p className="text-white font-medium">Image analyzed successfully!</p>
              </div>
              <button 
                onClick={handleSuccessOK}
                className="px-8 py-2 bg-[#4a9eff] text-white rounded-full text-sm font-medium hover:bg-[#3a8eef] transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Result


















































