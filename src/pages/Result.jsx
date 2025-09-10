import React, { useRef, useState } from 'react'
import axios from 'axios';

// Direct paths to public/Image/ folder
const leftbracket = "/Image/left-bracket.svg";
const rightbracket = "/Image/right-bracket.svg";
const largediamond = "/Image/diamond-large.svg";
const mediumdiamond = "/Image/diamond-medium.svg";
const smalldiamond = "/Image/diamond-small.svg";
const camera = "/Image/camera-left.svg";
const galllery = "/Image/gallery-right.svg";
const scanline = "/Image/scan-line.svg";
const leftscanline = "/Image/gallery-line.svg";

const Result = () => {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const handlePick = () => {
    inputRef.current.click();
  };

  const handleTakePhoto = async () => {
    setShowPermissionModal(false);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      video.srcObject = stream;
      await video.play();
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        setTimeout(() => {
          canvas.getContext('2d').drawImage(video, 0, 0);
          const base64 = canvas.toDataURL('image/png');
          stream.getTracks().forEach(track => track.stop());
          setPreview(base64);
          localStorage.setItem('previewImage', base64);
          sendToAPI(base64);
        }, 1000);
      };
    } catch (err) {
      console.error('Camera access denied or failed:', err);
    }
  };

  const handleAllow = () => {
    setShowPermissionModal(false);
    window.location.href = '/camera';
  };

  const handleDeny = () => {
    setShowPermissionModal(false);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64 = reader.result;
      localStorage.setItem('previewImage', base64);
      setPreview(base64);
      sendToAPI(base64);
    };
  };

  const sendToAPI = async (base64) => {
    try {
      const res = await axios.post('https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo', {image:base64});
      console.log('Full API response:', res.data); 
      const { age, gender, race } = res.data.data;
      localStorage.setItem('analysisResult', JSON.stringify({ age, gender, race }));
      console.log('Analysis Result:', { age, gender, race });
      setAnalysisDone(true);
    } catch (err) {
      console.error('Analysis failed:', err);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleOkClick = () => {
    window.location.href = '/select';
  };

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 w-screen h-screen bg-white z-[9999] flex flex-col justify-center items-center">
          <p className="text-lg mb-5">Preparing your analysis...</p>
          <img src={largediamond} alt="Large-Diamond" className="animate-spin-slow" />
          <img src={mediumdiamond} alt="Medium-Diamond" className="animate-spin-slower absolute" />
          <img src={smalldiamond} alt="Small-Diamond" className="animate-spin-slowest absolute" />
        </div>
      ) : (
        <div>
          {/* Header */}
          <div className="flex flex-row h-16 w-full justify-between py-3 mb-3 relative z-[1000]">
            <div className="flex flex-row pt-1 scale-75 justify-center items-center">
              <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-4 text-[#1A1B1C]" href="/">
                SKINSTRIC
              </a>
              <img className="w-1 h-4" src={leftbracket} alt="" />
              <p className="text-[#1a1b1c83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
              <img className="w-1 h-4" src={rightbracket} alt="" />
            </div>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none h-9 px-4 py-2 mx-4 scale-75 text-[#FCFCFC] text-xs bg-[#1A1B1C] leading-4">
              ENTER CODE
            </button>
          </div>
          
          <div className={`min-h-[92vh] flex flex-col bg-white relative md:pt-16 justify-center transition-all duration-300 ${showPermissionModal ? 'blur-sm' : ''}`}>
            {/* Title */}
            <div className="absolute top-2 left-9 md:left-8 text-left">
              <p className="font-semibold text-xs md:text-sm">TO START ANALYSIS</p>
            </div>
          
            {/* Main Content */}
            <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0">
              
              {/* Left Section (Camera) */}
              <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-0 -translate-y-1 md:-translate-x-full flex flex-col items-center justify-center">
                <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px] relative">
                  <img className="absolute w-full h-full animate-spin-slow" style={{transform: 'rotate(200deg)'}} src={largediamond} alt="Large-Diamond"/>
                  <img className="absolute w-[230px] h-[230px] md:w-[444px] md:h-[444px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slower" style={{transform: 'rotate(190deg) translate(-50%, -50%)'}} src={mediumdiamond} alt="Medium-Diamond"/>
                  <img className="absolute w-[190px] h-[190px] md:w-[405px] md:h-[405px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slowest" src={smalldiamond} alt="Small-Diamond" />
                  
                  {/* Camera Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <img 
                      className="w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-110 duration-700 ease-in-out cursor-pointer z-10" 
                      src={camera} 
                      alt="Camera" 
                      onClick={() => setShowPermissionModal(true)} 
                    />
                  </div>
                </div>
                
                {/* Camera Text */}
                <div className="absolute bottom-1 right-[90px] md:top-[30.9%] md:right-[-12px] -translate-y-5">
                  <p className="text-xs md:text-sm font-normal mt-1 leading-6">
                    ALLOW A.I.<br/>TO SCAN YOUR FACE
                  </p>
                  <img className="absolute hidden md:block md:right-36 md:top-5" src={scanline} alt="Scan Line" />
                </div>
              </div>
              
              {/* Right Section (Gallery) */}
              <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-0 -translate-y-10 transition-opacity duration-300 opacity-100">
                <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px] relative">
                  <img className="absolute w-full h-full animate-spin-slow" style={{transform: 'rotate(205deg)'}} src={largediamond} alt="Large-Diamond"/>
                  <img className="absolute w-[230px] h-[230px] md:w-[444px] md:h-[444px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slower" style={{transform: 'rotate(195deg) translate(-50%, -50%)'}} src={mediumdiamond} alt="Medium-Diamond"/>
                  <img className="absolute w-[190px] h-[190px] md:w-[405px] md:h-[405px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slowest" src={smalldiamond} alt="Small-Diamond" />
                  
                  {/* Gallery Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <img 
                      className="w-[100px] h-[100px] md:w-[136px] md:h-[136px] hover:scale-110 duration-700 ease-in-out cursor-pointer z-10" 
                      src={galllery} 
                      alt="Gallery" 
                      onClick={handlePick}
                    />
                  </div>
                </div>
                
                {/* Gallery Text */}
                <div className="absolute top-3/4 md:top-[70%] md:left-4 -translate-y-10">
                  <p className="text-xs md:text-sm font-normal mt-2 leading-6 text-right">
                    ALLOW A.I.<br/>ACCESS GALLERY
                  </p>
                  <img className="absolute hidden md:block md:left-30 md:bottom-10" src={leftscanline} alt="Gallery Line" />
                </div>
              </div>
              
              {/* Preview Box */}
              <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
                <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
                <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden bg-gray-50">
                  {preview && <img src={preview} alt="Preview" className="w-full h-full object-cover" />}
                </div>
              </div>
              
              <input ref={inputRef} accept="image/*" className="hidden" type="file" onChange={handleChange} />
            </div>
            
            {/* Back Button */}
            <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
              <a className="relative" href="/testing">
                <div>
                  <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-100 sm:hidden">
                    <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
                  </div>
                  <div className="group hidden sm:flex flex-row relative justify-center items-center">
                    <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-85 group-hover:scale-92 ease duration-300"></div>
                    <span className="absolute left-4 bottom-3 scale-90 rotate-180 hidden sm:block group-hover:scale-92 ease duration-300">▶</span>
                    <span className="text-sm font-semibold hidden sm:block ml-6">BACK</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Analysis Success Modal */}
      {analysisDone && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[998]" />
          <div className="fixed inset-0 flex items-center justify-center z-[999]">
            <div className="bg-[#1A1B1C] p-6 rounded-lg">
              <p className="text-white mb-4">Image analyzed successfully!</p>
              <button 
                onClick={handleOkClick}
                className="bg-white text-[#1A1B1C] px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* Permission Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[999]">
          <div className="bg-[#1A1B1C] pt-4 pb-2">
            <h2 className="text-[#FCFCFC] text-base font-semibold mb-12 leading-6 px-4">
              ALLOW A.I. TO ACCESS YOUR CAMERA.
            </h2>
            <div className="flex mt-4 border-t border-[#FCFCFC] pt-2">
              <button 
                onClick={handleDeny} 
                className="bg-[#1A1B1C] px-7 transform translate-x-11 text-[#fcfcfca1] font-normal text-sm leading-4 cursor-pointer"
              >
                Deny
              </button>
              <button 
                onClick={handleAllow} 
                className="bg-[#1A1B1C] px-5 transform translate-x-11 text-[#fcfcfc] font-semibold text-sm leading-4 cursor-pointer"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Result







