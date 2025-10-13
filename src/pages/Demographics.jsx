import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Demographics = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("skinstricApiResponse");
    if (storedData) {
      setAnalysisData(JSON.parse(storedData));
      setLoading(false);
    } else {
      navigate("/result");
    }
  }, [navigate]);

  const handleBack = () => navigate("/select");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-white">
        <div className="text-2xl">Loading demographics...</div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-white">
        <div className="text-2xl">No analysis data found</div>
      </div>
    );
  }

  // Extract data
  const raceData = analysisData.race || {};
  const topRace = Object.entries(raceData).reduce((a, b) =>
    raceData[a[0]] > raceData[b[0]] ? a : b
  );
  const topRaceName = topRace[0].replace("_", " ");
  const topRacePercentage = Math.round(topRace[1] * 100);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex flex-row h-16 w-full py-3 mb-6 relative z-[1000]">
        {/* Left Logo Section */}
        <div className="absolute -left-[346px] top-0 h-16 flex flex-row pt-1 scale-90 items-center pl-4 bg-white z-[1001]">
          <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold text-base mr-2 text-[#1A1B1C]">
            SKINSTRIC
          </span>
          <span className="text-[#1a1b1c83] font-semibold text-sm ml-1.5">
            [ INTRO ]
          </span>
        </div>
        
        {/* Right Button Section */}
        <div className="absolute -right-[346px] top-0 h-16 flex items-center pr-4 bg-white z-[1001] scale-90">
          <button className="inline-flex items-center justify-center gap-1 whitespace-nowrap font-semibold text-xs bg-[#1A1B1C] text-white px-3 py-1">
            ENTER CODE
          </button>
        </div>
      </header>

      {/* Page Title */}
      <div className="w-[800px] mb-12 flex flex-col justify-start items-start -ml-[20rem] mt-[-1rem]">
        <h2 className="font-semibold mb-2 leading-[24px] text-[14px]">
          A.I. ANALYSIS
        </h2>
        <h3 className="font-normal leading-[60px] tracking-tighter text-[70px]">
          DEMOGRAPHICS
        </h3>
        <h4 className="mt-3 leading-[24px] text-gray-600 text-[14px]">
          PREDICTED RACE & AGE
        </h4>
      </div>

      {/* Main Layout - Full Width Grid */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] grid grid-cols-12 items-stretch">
        {/* Left Sidebar */}
        <div className="col-span-2 flex flex-col gap-6 p-6">
          <img src="/Image/race1.svg" alt="Race" className="cursor-pointer hover:opacity-80 w-full" />
          <img src="/Image/age1.svg" alt="Age" className="cursor-pointer hover:opacity-80 w-full" />
          <img src="/Image/sex1.svg" alt="Sex" className="cursor-pointer hover:opacity-80 w-full" />
        </div>

        {/* Middle Chart */}
        <div className="col-span-7 flex items-stretch">
          <div className="w-full bg-[#F5F6F7] border border-gray-300 p-14 flex justify-between items-center">
            <div className="text-5xl font-medium capitalize">
              {topRaceName}
            </div>
            <div className="relative w-96 h-96 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" stroke="#D1D5DB" strokeWidth="6" fill="none" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  stroke="#111" 
                  strokeWidth="6" 
                  fill="none"
                  strokeDasharray={`${topRacePercentage * 2.827} 282.7`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold">{topRacePercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3 flex items-stretch p-6">
          <img src="/Image/race2.svg" alt="Race breakdown" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-4 md:pt-[37px] pb-6 bg-white sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16 relative">
        <div className="flex justify-between items-center w-full">
          {/* Back Button */}
          <button onClick={handleBack} className="absolute left-8 transform translate-y-10">
            <div>
              {/* Mobile Version */}
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
              </div>
              {/* Desktop Version */}
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">▶</span>
                <span className="text-sm font-semibold hidden sm:block ml-6">BACK</span>
              </div>
            </div>
          </button>

          {/* Center Text */}
          <div className="text-sm text-gray-500 text-center hidden sm:block absolute left-1/2 transform -translate-x-1/2 translate-y-6 -translate-x-[260px]">
            If A.I. estimate is wrong, select the correct one.
          </div>

          {/* Home Button */}
          <button onClick={() => navigate("/")} className="absolute right-8 transform translate-y-10">
            <div>
              {/* Mobile Version */}
              <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">HOME</span>
              </div>
              {/* Desktop Version */}
              <div className="hidden sm:flex flex-row relative justify-center items-center">
                <span className="text-sm font-semibold hidden sm:block mr-5">HOME</span>
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85]"></div>
                <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block">▶</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demographics;







