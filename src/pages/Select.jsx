import React from 'react'

const Select = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - ORIGINAL LAYOUT RESTORED */}
      <div className="flex flex-row h-[64px] w-full justify-end py-3 mb-3 relative z-[1000]">
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]">
          ENTER CODE
        </button>
      </div>

      {/* SKINSTRIC - ITS OWN LINE YOU CAN MOVE */}
      <div className="absolute top-4 left-0">
        <div className="flex flex-row pt-1 scale-75 justify-start items-center">
          <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C]">
            SKINSTRIC
          </span>
          <img 
            alt="left-bracket" 
            className="w-[4px] h-[17px]" 
            src="/Image/left-bracket.svg" 
          />
          <p className="text-[#1a1b1c83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
          <img 
            alt="right-bracket" 
            className="w-[4px] h-[17px]" 
            src="/Image/right-bracket.svg" 
          />
        </div>
      </div>

      {/* Title Section */}
      <div className="absolute top-[65px] left-8 text-left">
        <h1 className="text-base font-semibold leading-[24px] tracking-tight">A.I. ANALYSIS</h1>
        <p className="text-sm mt-1 text-gray-600 uppercase leading-[24px]">
          A.I. has estimated the following.<br/>
          Fix estimated information if needed.
        </p>
      </div>

      {/* Main Content - DIAMOND GRID WITH GROUP HOVER */}
      <div className="h-[65vh] flex flex-col items-center justify-center bg-white">
        <div className="relative diamond-container group">
          
          {/* PERFECTLY SIZED DIAMOND OUTLINE - MATCHES IMAGE 2 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-5">
            <div className="w-[325px] h-[325px] border-2 border-dashed border-gray-600 rotate-45 transition-all duration-500 ease-in-out transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-70" />
          </div>

          {/* Background diamonds (invisible with opacity-0) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute transition-all duration-400 w-[400px] h-[400px] opacity-0">
              <img 
                alt="Diamond Small" 
                className="w-full h-full object-contain"
                src="/Image/diamond-small.svg"
              />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute transition-all duration-400 w-[400px] h-[400px] opacity-0">
              <img 
                alt="Diamond Medium" 
                className="w-full h-full object-contain"
                src="/Image/diamond-medium.svg"
              />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute transition-all duration-400 w-[400px] h-[400px] opacity-0">
              <img 
                alt="Diamond Large" 
                className="w-full h-full object-contain"
                src="/Image/diamond-large.svg"
              />
            </div>
          </div>

          {/* Grid of diamond buttons */}
          <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
            {/* Demographics - Top center */}
            <div className="flex items-center justify-center col-start-2">
              <a href="/summary">
                <button className="w-[153.88px] h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-[24px] tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300">
                  <span className="transform -rotate-45">Demographics</span>
                </button>
              </a>
            </div>

            {/* Cosmetic Concerns - Middle left */}
            <div className="flex items-center justify-center row-start-2 col-start-1">
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Cosmetic Concerns</span>
              </button>
            </div>

            {/* Skin Type Details - Middle right */}
            <div className="flex items-center justify-center row-start-2 col-start-3">
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Skin Type Details</span>
              </button>
            </div>

            {/* Weather - Bottom center */}
            <div className="flex items-center justify-center row-start-3 col-start-2">
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Weather</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation - OPTIMIZED TO FIT WITHOUT SCROLL */}
      <div className="pt-2 pb-4 bg-white absolute bottom-0 left-0 right-0">
        <div className="flex justify-between max-w-full mx-auto px-13 md:px-9">
          {/* Back Button */}
          <a href="/result">
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

          {/* Get Summary Button */}
          <a href="/summary">
            <div>
              <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">SUM</span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <span className="text-sm font-semibold hidden sm:block mr-5">GET SUMMARY</span>
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">▶</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Select












