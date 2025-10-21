import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'

const leftbracket = "/Image/left-bracket.svg"
const rightbracket = "/Image/right-bracket.svg"
const largediamond = "/Image/diamond-large.svg"
const mediumdiamond = "/Image/diamond-medium.svg"
const smalldiamond = "/Image/diamond-small.svg"

const Result = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showCameraPopup, setShowCameraPopup] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showCameraModal, setShowCameraModal] = useState(false)
  const [stream, setStream] = useState(null)

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

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

  const handleCameraClick = () => {
    setShowCameraPopup(true)
  }

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
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        setShowCameraModal(true)
      }
    } catch (error) {
      console.error('Camera access denied:', error)
      alert('Camera access was denied. Please allow camera permissions in your browser settings and try again.')
    }
  }

  const handleDenyCamera = () => {
    setShowCameraPopup(false)
  }

  const handleCloseCameraModal = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowCameraModal(false)
  }

  const handleCapturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return
    
    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageSrc = canvas.toDataURL('image/jpeg')
    
    setPreview(imageSrc)
    handleCloseCameraModal()
    setLoading(true)
    sendToAPI(imageSrc)
  }

  const handleSuccessOK = () => {
    setShowSuccessPopup(false)
    window.location.href = '/select'
  }

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
    }
  }

  const sendToAPI = async (base64) => {
    try {
      console.log('Sending image to API...')
      
      localStorage.setItem('uploadedImage', base64)
      
      const base64Data = base64.split(',')[1] || base64
      
      const response = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Image: base64Data
        })
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const result = await response.json()
      
      console.log('API Response:', result)
      
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

  const DiamondBackground = () => (
    <div className="absolute inset-0 flex items-center justify-center -z-10">
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

  return (
    <div className="min-h-screen bg-white">
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
          {/* Header */}
          <div className="flex flex-row h-[64px] w-full justify-between py-3 mb-3 relative z-[1000]">
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
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]">
              ENTER CODE
            </button>
          </div>

          <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center">
            {/* TO START ANALYSIS */}
            <div className="absolute top-2 left-9 md:left-8 text-left">
              <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
            </div>

            <div className="flex-[0.4] md:flex-1 flex flex-col items-center xl:justify-center relative mb-0 md:mb-30">
              
              <div className="flex justify-center items-center gap-[300px] absolute top-[240px] w-full z-20">
                
                {/* Camera Section */}
                <div className="relative flex flex-col items-center">
                  <DiamondBackground />
                  
                  <img 
                    src="/Image/camera-left.svg" 
                    alt="Camera Icon" 
                    className="w-[300px] h-[150px] cursor-pointer"
                    onClick={handleCameraClick}
                  />

                  <div className="absolute -top-[88px] right-[10px] flex flex-col items-center">
                    <div className="text-xs md:text-sm font-normal mb-2 leading-[20px] text-center translate-y-[40px] translate-x-[100px]">
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

                {/* Gallery Section */}
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
                      <p className="mb-1 translate-x-[20px] translate-y-[92px]">ALLOW A.I.</p>
                      <p className="translate-x-[-28px] translate-y-[88px]">ACCESS GALLERY</p>
                    </div>
                    <img 
                      src="/Image/gallery-line.svg" 
                      alt="Gallery Line" 
                      className="w-[60px] h-auto translate-x-[88px] translate-y-[8px]"
                    />
                  </div>
                </div>
              </div>

              {/* Preview Box - FIXED POSITIONING */}
              <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
                <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
                <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden bg-gray-50">
                  {preview && <img src={preview} alt="Preview" className="w-full h-full object-cover" />}
                </div>
              </div>

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

            {/* Back Button - FIXED POSITIONING */}
            <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
              <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
                <a className="relative" aria-label="Back" href="/introduce">
                  <div>
                    <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                      <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
                    </div>
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

      {/* Hidden canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Camera Permission Popup */}
      {showCameraPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" />
          <div className="fixed inset-0 flex items-center justify-center z-[9999]">
            <div className="relative">
              <img 
                src="/Image/float-info.svg" 
                alt="Camera Permission" 
                className="w-auto h-auto"
              />
              <button 
                onClick={handleAllowCamera}
                className="absolute bottom-4 right-8 w-20 h-8 bg-transparent hover:bg-white hover:bg-opacity-10 rounded"
              />
              <button 
                onClick={handleDenyCamera}
                className="absolute bottom-4 left-8 w-16 h-8 bg-transparent hover:bg-white hover:bg-opacity-10 rounded"
              />
            </div>
          </div>
        </>
      )}

      {/* Live Camera Modal */}
      {showCameraModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-90 z-[9998]" />
          <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] p-4">
            <div className="w-full max-w-2xl bg-black rounded-lg overflow-hidden">
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
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

      {/* Success Popup */}
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











































