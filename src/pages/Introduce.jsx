import React, { useState } from "react"

const Introduce = () => {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [city, setCity] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1 && name.trim()) {
      setStep(2)
    } else if (step === 2 && city.trim()) {
      // Save to localStorage
      localStorage.setItem("userName", name.trim())
      localStorage.setItem("userCity", city.trim())
      setStep(3)
      console.log("Saved to localStorage:", name.trim(), city.trim())
    }
  }

  return (
    <main className="relative min-h-screen bg-white text-[#1A1B1C] overflow-hidden">
      {/* Header */}
      <header className="flex flex-row h-[64px] w-full justify-between items-start py-3 px-9 fixed top-0 left-0 right-0 z-[1000]">
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
          </div>
          <p className="font-bold text-xs mt-1 ml-8 text-black">
            TO START ANALYSIS
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors text-[#FCFCFC] text-[10px] bg-[#1A1B1C] h-9 px-4 py-2 scale-[0.8] leading-[16px]">
          ENTER CODE
        </button>
      </header>

      {/* Center Content */}
      <div className="relative flex flex-col items-center justify-center h-screen">
        {step < 3 && (
          <p className="text-sm text-gray-400 tracking-wider uppercase mb-1">
            CLICK TO TYPE
          </p>
        )}

        <form className="relative z-10" onSubmit={handleSubmit}>
          {step === 1 && (
            <input
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C]"
              placeholder="Introduce Yourself"
              type="text"
              autoComplete="off"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {step === 2 && (
            <input
              className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[400px] sm:w-[460px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C]"
              placeholder="your city name"
              type="text"
              autoComplete="off"
              autoFocus
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          )}

          <button type="submit" className="sr-only">
            Submit
          </button>
        </form>

        {step === 3 && (
          <div className="flex flex-col items-center gap-4 z-10">
            <p className="text-2xl font-normal text-[#1A1B1C] tracking-wide">
              Thank you!
            </p>
            <p className="text-lg text-gray-600">Proceed to the next step</p>
          </div>
        )}

        {/* Spinning Diamonds */}
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

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 w-full flex justify-between md:px-9 px-13">
        {/* Back Button */}
        <a href="/" className="inset-0" aria-label="Back">
          <div>
            <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
              <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">
                BACK
              </span>
            </div>
            <div className="group hidden sm:flex flex-row relative justify-center items-center">
              <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300" />
              <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">
                ▶
              </span>
              <span className="text-sm font-semibold hidden sm:block ml-6">
                BACK
              </span>
            </div>
          </div>
        </a>

        {/* Proceed Button */}
        {step === 3 && (
          <a
            href="/result"
            className="inline-block transform opacity-0 animate-proceedSlideIn"
          >
            <div className="group hidden sm:flex flex-row relative justify-center items-center">
              <span className="text-sm font-semibold hidden sm:block mr-5">
                PROCEED
              </span>
              <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300" />
              <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">
                ▶
              </span>
            </div>
          </a>
        )}
      </div>
    </main>
  )
}

export default Introduce














