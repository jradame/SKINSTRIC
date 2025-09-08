// Hero.jsx
import React, { useState, useEffect } from "react";

const Hero = () => {
  const [slideDirection, setSlideDirection] = useState(null); // "left" | "right" | null
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-white overflow-hidden text-[#1A1B1C] antialiased">
      {/* NAVBAR */}
      <header className="flex flex-row h-[64px] w-full justify-between py-3 mb-3 relative z-[1000]">
        <div className="flex flex-row pt-1 scale-75 justify-center items-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 leading-[16px]"
          >
            SKINSTRIC
          </a>
          {/* <img
            src="/_next/static/media/Rectangle%202710.61a74ed4.png"
            alt="left bracket"
            className="w-[4px] h-[17px]"
          /> */}
          <p className="text-[#1a1b1c83] font-semibold text-sm ml-1.5 mr-1.5">
            [ INTRO ]
          </p>
          {/* <img
            src="/_next/static/media/Rectangle%202711.b2b3b291.png"
            alt="right bracket"
            className="w-[4px] h-[17px]"
          /> */}
        </div>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors text-[#FCFCFC] text-[10px] bg-[#1A1B1C] h-9 px-4 py-2 mx-4 scale-[0.8] leading-[16px]">
          ENTER CODE
        </button>
      </header>

      {/* HERO */}
      <div className="max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6">
        <div className="flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          {/* MOBILE DIAMONDS */}
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[350px] h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[420px] h-[420px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
          </div>

          {/* MAIN HEADING */}
          <div
            id="main-heading"
            className={`relative z-10 text-center transition-all duration-[1500ms] ease-in-out ${
              fadeIn ? "opacity-100" : "opacity-0"
            } ${
              slideDirection === "left"
                ? "translate-x-[-20vw]" // slide left
                : slideDirection === "right"
                ? "translate-x-[20vw]" // slide right
                : ""
            }`}
          >
            <h1 className="text-[60px] lg:text-[100px] font-normal tracking-tighter leading-none">
              Sophisticated <br />
              <span className="block">skincare</span>
            </h1>
          </div>

          {/* MOBILE PARAGRAPH */}
          <p className="z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-[#1a1b1c83]">
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>

          {/* MOBILE BUTTON */}
          <div className="z-10 mt-4 lg:hidden">
            <a href="/testing">
              <button className="relative flex items-center gap-4 hover:scale-105 duration-300">
                <span className="text-[12px] font-bold cursor-pointer">
                  ENTER EXPERIENCE
                </span>
                <div className="w-[24px] h-[24px] border border-solid border-black rotate-45 cursor-pointer"></div>
                <span className="absolute left-[129px] scale-[0.5] hover:scale-60 duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-current text-black"
                  >
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                </span>
              </button>
            </a>
          </div>

          {/* DESKTOP BOTTOM LEFT PARAGRAPH (always visible) */}
          <div className="hidden lg:block fixed bottom-[calc(-7vh)] left-[calc(-20vw)] xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] [@media(width>=1920px)]:left-[calc(-33vw)] font-normal text-sm space-y-3 uppercase">
            <p>
              Skinstric developed an A.I. that creates a <br />
              highly-personalized routine tailored to <br />
              what your skin needs.
            </p>
          </div>

          {/* LEFT DIAMOND */}
          <div
            id="left-section"
            className={`hidden lg:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-700 ${
              slideDirection === "left" ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="relative w-full h-full">
              <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0"></div>
              <button
                id="discover-button"
                onMouseEnter={() => setSlideDirection("right")}
                onMouseLeave={() => setSlideDirection(null)}
                className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal cursor-pointer h-9 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6 px-3 py-1"
              >
                <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 group-hover:scale-110 duration-300"></div>
                <span className="absolute left-[18px] top-[8px] scale-[0.9] rotate-180 group-hover:scale-105 duration-300">
                  ▶
                </span>
                <span>DISCOVER A.I.</span>
              </button>
            </div>
          </div>

          {/* RIGHT DIAMOND */}
          <div
            id="right-section"
            className={`hidden lg:block fixed top-1/2 right-[calc(-53vw)] xl:right-[calc(-50vw)] -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-700 ${
              slideDirection === "right" ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="relative w-full h-full">
              <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 absolute inset-0"></div>
              <a href="/testing">
                <button
                  id="take-test-button"
                  onMouseEnter={() => setSlideDirection("left")}
                  onMouseLeave={() => setSlideDirection(null)}
                  className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal cursor-pointer h-9 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/5 xl:-translate-x-1/6 px-3 py-1"
                >
                  TAKE TEST
                  <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 group-hover:scale-110 duration-300"></div>
                  <span className="absolute left-[107px] top-[9px] scale-[0.9] cursor-pointer group-hover:scale-105 duration-300">
                    ▶
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;


















