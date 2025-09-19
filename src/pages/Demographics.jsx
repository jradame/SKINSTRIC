import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Demographics = () => {
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const storedData = localStorage.getItem('skinstricApiResponse')
    if (storedData) {
      setAnalysisData(JSON.parse(storedData))
      setLoading(false)
    } else {
      navigate('/result')
    }
  }, [navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-pulse text-2xl">Loading analysis data...</div>
      </div>
    )
  }

  if (!analysisData) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-lg">No analysis data found</div>
      </div>
    )
  }

  // Extract top values
  const raceData = analysisData.race || {}
  const topRace = Object.entries(raceData).reduce((a, b) =>
    raceData[a[0]] > raceData[b[0]] ? a : b
  )
  const topRaceName = topRace[0].replace('_', ' ')
  const topRacePercentage = Math.round(topRace[1] * 100)

  const ageData = analysisData.age || {}
  const topAge = Object.entries(ageData).reduce((a, b) =>
    ageData[a[0]] > ageData[b[0]] ? a : b
  )
  const ageRange = topAge[0].replace('_', '-')

  const genderData = analysisData.gender || {}
  const topGender = Object.entries(genderData).reduce((a, b) =>
    genderData[a[0]] > genderData[b[0]] ? a : b
  )
  const gender = topGender[0]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex flex-row h-[64px] w-full justify-between py-3 mb-3 relative z-[1000]">
        <div className="flex flex-row pt-1 scale-75 justify-center items-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 leading-4 text-[#1A1B1C]"
          >
            SKINSTRIC
          </a>
          <p className="text-[#1a1b1c83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">
            [ INTRO ]
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors text-[#FCFCFC] text-[10px] bg-[#1A1B1C] h-9 px-4 py-2 mx-4 scale-[0.8] leading-[16px]">
          ENTER CODE
        </button>
      </div>

      {/* Title */}
      <div className="text-start ml-4 mb-6 md:mb-10 md:ml-8">
        <h2 className="text-base font-semibold mb-1 leading-[24px]">A.I. ANALYSIS</h2>
        <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">
          DEMOGRAPHICS
        </h3>
        <h4 className="text-sm mt-2 leading-[24px]">PREDICTED RACE & AGE</h4>
      </div>

      {/* Content */}
      <div className="flex flex-1 px-4 gap-6">
        {/* Left Sidebar with ONLY SVGs (tighter, hover highlight) */}
        <div className="w-40 flex flex-col items-start space-y-1">
          <img
            src="/Image/race1.svg"
            alt="Race block"
            className="w-full transition-transform transform hover:scale-105 hover:opacity-80 cursor-pointer"
          />
          <img
            src="/Image/age1.svg"
            alt="Age block"
            className="w-full transition-transform transform hover:scale-105 hover:opacity-80 cursor-pointer"
          />
          <img
            src="/Image/sex1.svg"
            alt="Sex block"
            className="w-full transition-transform transform hover:scale-105 hover:opacity-80 cursor-pointer"
          />
        </div>

        {/* Middle */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
          <h2 className="text-2xl font-semibold mb-4">{topRaceName}</h2>
          <div className="relative w-64 h-64">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-300"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="black"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${topRacePercentage * 2.827} 282.7`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{topRacePercentage}%</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64">
          <div className="flex justify-between text-xs font-bold border-b border-gray-200 pb-2 mb-2">
            <span>RACE</span>
            <span>A.I. CONFIDENCE</span>
          </div>
          <div className="space-y-2">
            {Object.entries(raceData).map(([race, confidence]) => {
              const percentage = Math.round(confidence * 100)
              const isTop =
                race.toLowerCase().replace('_', ' ') === topRaceName.toLowerCase()
              return (
                <div
                  key={race}
                  className={`flex justify-between items-center px-2 py-1 text-sm ${
                    isTop ? 'bg-black text-white' : ''
                  }`}
                >
                  <span className="capitalize">{race.replace('_', ' ')}</span>
                  <span>{percentage}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 pb-6 bg-white mt-8">
        <div className="flex justify-between max-w-full mx-auto px-4 md:px-0">
          {/* Back */}
          <a href="/select">
            <div className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
              <div className="w-8 h-8 border border-black rotate-45 flex items-center justify-center">
                <span className="rotate-[-45deg] text-xs">←</span>
              </div>
              <span className="text-sm font-semibold">BACK</span>
            </div>
          </a>

          {/* Home */}
          <a href="/">
            <div className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
              <span className="text-sm font-semibold">HOME</span>
              <div className="w-8 h-8 border border-black rotate-45 flex items-center justify-center">
                <span className="rotate-[-45deg] text-xs">→</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Helper Text */}
      <div className="text-center text-xs text-gray-400 mb-6">
        If A.I. estimate is wrong, select the correct one.
      </div>
    </div>
  )
}

export default Demographics





