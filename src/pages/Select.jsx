import React from 'react'

const Select = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex flex-row h-16 w-full justify-between py-3 mb-3 relative z-[1000]">
        <div className="flex flex-row pt-1 scale-75 justify-center items-center">
          <a 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-4 text-[#1A1B1C]" 
            href="/"
          >
            SKINSTRIC
          </a>
          <img className="w-1 h-4" src="/Image/left-bracket.svg" alt="" />
          <p className="text-[#1a1b1c83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
          <img className="w-1 h-4" src="/Image/right-bracket.svg" alt="" />
        </div>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none h-9 px-4 py-2 mx-4 scale-75 text-[#FCFCFC] text-xs bg-[#1A1B1C] leading-4">
          ENTER CODE
        </button>
      </div>

      {/* Title Section */}
      <div className="absolute top-10 left-8 text-left mt-5">
        <h1 className="text-base font-semibold leading-6 tracking-tight">A.I. ANALYSIS</h1>
        <p className="text-sm mt-1 text-gray-600 uppercase leading-6">
          A.I. has estimated the following.<br/>
          Fix estimated information if needed.
        </p>
      </div>

      {/* Main Content - Diamond Grid */}
      <div className="h-[78.3vh] flex flex-col items-center justify-center bg-white">
        <div className="relative">
          {/* Background diamonds (optional/invisible) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute transition-all duration-400 w-[400px] h-[400px] opacity-0">
              {/* Background diamond images would go here if needed */}
            </div>
          </div>

          {/* Grid of diamond buttons */}
          <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
            {/* Demographics - Top center */}
            <div className="flex items-center justify-center col-start-2">
              <a href="/summary">
                <button className="w-[153.88px] h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-6 tracking-tight uppercase hover:scale-105 transition-transform duration-300">
                  <span className="transform -rotate-45">Demographics</span>
                </button>
              </a>
            </div>

            {/* Cosmetic Concerns - Middle left */}
            <div className="flex items-center justify-center row-start-2 col-start-1">
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-6 tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Cosmetic Concerns</span>
              </button>
            </div>

            {/* Skin Type Details - Middle right */}
            <div className="flex items-center justify-center row-start-2 col-start-3">
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-6 tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Skin Type Details</span>
              </button>
            </div>

            {/* Weather - Bottom center */}
            <div className="flex items-center justify-center row-start-3 col-start-2">
              <button className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-6 tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45">Weather</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 md:pt-12 pb-8 bg-white sticky md:static bottom-40 mb-0 md:mb-0">
        <div className="flex justify-between max-w-full mx-auto px-13 md:px-9">
          {/* Back Button */}
          <a href="/result">
            <div>
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-100 sm:hidden">
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
              <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-100 sm:hidden">
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
