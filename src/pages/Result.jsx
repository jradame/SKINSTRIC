import React, { useRef, useState } from 'react'
import axios from 'axios'

// Direct paths to public/Image/ folder
const leftbracket = "/Image/left-bracket.svg"
const rightbracket = "/Image/right-bracket.svg"
const largediamond = "/Image/diamond-large.svg"
const mediumdiamond = "/Image/diamond-medium.svg"
const smalldiamond = "/Image/diamond-small.svg"

const Result = () => {
  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showCameraPopup, setShowCameraPopup] = useState(false)

  // Handle camera icon click - show custom popup
  const handleCameraClick = () => {
    setShowCameraPopup(true)
  }

  // Handle custom popup "ALLOW" click - use file picker for now
  const handleAllowCamera = () => {
    setShowCameraPopup(false)
    // Open file picker directly
    cameraInputRef.current?.click()
  }

  // Handle custom popup "DENY" click
  const handleDenyCamera = () => {
    setShowCameraPopup(false)
  }

  // Handle file input change (for both camera and gallery)
  const handleChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async () => {
      const base64 = reader.result
      // Don't store in localStorage - causes quota exceeded error
      setPreview(base64) // Only for UI preview
      await sendToAPI(base64)
    }
  }

  const sendToAPI = async (base64) => {
    try {
      console.log('Sending image to API...')
      
      // FOR TESTING: Skip API and use dummy data
      const dummyData = {
        race: {
          "White": 0.65,
          "Hispanic": 0.20,
          "Black": 0.10,
          "Asian": 0.05
        },
        age: {
          "25-32": 0.45,
          "33-40": 0.30,
          "18-24": 0.15,
          "41-50": 0.10
        },
        gender: {
          "Male": 0.75,
          "Female": 0.25
        }
      }
      
      // Store dummy data and redirect
      localStorage.setItem('skinstricApiResponse', JSON.stringify(dummyData))
      setTimeout(() => {
        window.location.href = '/analysis'
      }, 2000) // 2 second delay to show loading
      
    } catch (error) {
      console.error('Analysis failed:', error)
      setLoading(false)
    }
  }

  // Diamond Background Component
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
            
            {/* Text and dots centered in the middle of diamonds */}
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
          <header className="w-full h-[80px] relative bg-white">
            {/* ENTER CODE BUTTON */}
            <div className="absolute -top-4 right-0 -mr-[300px]">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none h-9 px-4 py-2 scale-75 text-[#FCFCFC] text-xs bg-[#1A1B1C] leading-4">
                ENTER CODE
              </button>
            </div>

            {/* SKINSTRIC [ INTRO ] */}
            <div className="absolute -top-4 left-[-330px]">
              <div className="flex flex-row pt-1 scale-75 justify-start items-center">
                <a 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-4 text-[#1A1B1C]" 
                  href="/"
                >
                  SKINSTRIC
                </a>
                <img className="w-1 h-4" src={leftbracket} alt="" />
                <p className="text-[#1a1b1c83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
                <img className="w-1 h-4" src={rightbracket} alt="" />
              </div>
            </div>
          </header>

          <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-16 justify-center transition-all duration-300">
            {/* TO START ANALYSIS */}
            <div className="absolute -top-14 left-[-295px]">
              <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
            </div>

            {/* Main Content */}
            <div className="flex-[0.4] md:flex-1 flex flex-col items-center xl:justify-center relative mb-0 md:mb-30">
              
              {/* Camera + Gallery Icons */}
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

                  {/* Camera Text + Scan Line */}
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

                  {/* Gallery Text + Line */}
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

              {/* Preview Box */}
              <div className="absolute -top-14 right-0 -mr-[300px] md:-top-14 md:right-0 md:-mr-[300px] transition-opacity duration-300 opacity-100">
                <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
                <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden bg-gray-50">
                  {preview && <img src={preview} alt="Preview" className="w-full h-full object-cover" />}
                </div>
              </div>

              {/* Hidden File Inputs */}
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

            {/* Back Button */}
            <div className="absolute bottom-16 left-[-280px]">
              <a className="relative" href="/introduce">
                <div>
                  <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-100 sm:hidden">
                    <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
                  </div>
                  <div className="group hidden sm:flex flex-row relative justify-center items-center">
                    <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-85 group-hover:scale-92 ease duration-300" />
                    <span className="absolute left-4 bottom-3 scale-90 rotate-180 hidden sm:block group-hover:scale-92 ease duration-300">▶</span>
                    <span className="text-sm font-semibold hidden sm:block ml-6">BACK</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Custom Camera Permission Popup */}
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
              {/* Invisible clickable areas over ALLOW and DENY */}
              <button 
                onClick={handleAllowCamera}
                className="absolute bottom-4 right-8 w-20 h-8 bg-transparent hover:bg-white hover:bg-opacity-10 rounded"
                aria-label="Allow camera access"
              />
              <button 
                onClick={handleDenyCamera}
                className="absolute bottom-4 left-8 w-16 h-8 bg-transparent hover:bg-white hover:bg-opacity-10 rounded"
                aria-label="Deny camera access"
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Result










































