// Introduce.jsx
import React from "react";

const Introduce = () => {
  return (
    <main className="relative min-h-screen bg-white text-[#1A1B1C] overflow-hidden">
      {/* Header */}
      <header className="flex flex-row h-[64px] w-full justify-between items-start py-3 px-9 fixed top-0 left-0 right-0 z-[1000]">
        {/* Left Section: SKINSTRIC [ INTRO ] + TO START ANALYSIS inline */}
        <div className="flex flex-col items-start">
          <div className="flex flex-row items-center scale-75">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 leading-[16px]"
            >
              SKINSTRIC
            </a>
            <p className="text-[#1a1b1c83] font-semibold text-sm ml-1.5 mr-1.5">
              [ INTRO ]
            </p>
            <p className="font-bold text-xs ml-4 text-black">TO START ANALYSIS</p>
          </div>
        </div>

        {/* Right Section: ENTER CODE */}
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors text-[#FCFCFC] text-[10px] bg-[#1A1B1C] h-9 px-4 py-2 scale-[0.8] leading-[16px]">
          ENTER CODE
        </button>
      </header>

      {/* Center Form */}
      <div className="relative flex flex-col items-center justify-center h-screen">
        <p className="text-sm text-gray-400 tracking-wider uppercase mb-1 z-10">
          CLICK TO TYPE
        </p>
        <form className="relative z-10">
          <input
            className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C]"
            placeholder="Introduce Yourself"
            type="text"
            autoComplete="off"
            autoFocus
            name="name"
          />
          <button type="submit" className="sr-only">
            Submit
          </button>
        </form>

        {/* Spinning Diamonds (SVGs) */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <img
            src="/Image/diamond-large.svg"
            alt="Diamond Large"
            className="absolute w-[480px] h-[480px] md:w-[762px] md:h-[762px] animate-spin-slow"
          />
          <img
            src="/Image/diamond-medium.svg"
            alt="Diamond Medium"
            className="absolute w-[400px] h-[400px] md:w-[682px] md:h-[682px] animate-spin-slower"
          />
          <img
            src="/Image/diamond-small.svg"
            alt="Diamond Small"
            className="absolute w-[320px] h-[320px] md:w-[602px] md:h-[602px] animate-spin-slowest"
          />
        </div>
      </div>

      {/* Bottom Back Button */}
      <div className="absolute bottom-8 w-full flex justify-start px-9">
        <a href="/" className="group flex flex-row items-center gap-2">
          <div className="w-12 h-12 border border-[#1A1B1C] rotate-45 flex items-center justify-center group-hover:scale-105 transition duration-300">
            <span className="rotate-[-45deg] text-xs font-semibold">BACK</span>
          </div>
        </a>
      </div>
    </main>
  );
};

export default Introduce;




