import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Demographics = () => {
  const [analysisData, setAnalysisData] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // FIXED: Use the correct localStorage key that matches Result.jsx
    const storedData = localStorage.getItem('skinstricApiResponse')
    if (storedData) {
      setAnalysisData(JSON.parse(storedData))
      setLoading(false)
    } else {
      // If no data, redirect back to result page
      navigate('/result')
    }
  }, [navigate])

  const handleBack = () => {
    navigate('/result')
  }

  const handleReset = () => {
    localStorage.removeItem('skinstricApiResponse')
    localStorage.removeItem('uploadedImage')
    navigate('/result')
  }

  const handleConfirm = () => {
    // Navigate to next step (you can define this later)
    navigate('/select')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-white">
        <div className="text-lg">Loading demographics...</div>
      </div>
    )
  }

  if (!analysisData) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-white">
        <div className="text-lg">No analysis data found</div>
      </div>
    )
  }

  // Extract the highest confidence race
  const raceData = analysisData.race || {}
  const topRace = Object.entries(raceData).reduce((a, b) => raceData[a[0]] > raceData[b[0]] ? a : b)
  const topRaceName = topRace[0].replace('_', ' ')
  const topRacePercentage = Math.round(topRace[1] * 100)

  // Extract age range
  const ageData = analysisData.age || {}
  const topAge = Object.entries(ageData).reduce((a, b) => ageData[a[0]] > ageData[b[0]] ? a : b)
  const ageRange = topAge[0].replace('_', '-')

  // Extract gender
  const genderData = analysisData.gender || {}
  const topGender = Object.entries(genderData).reduce((a, b) => genderData[a[0]] > genderData[b[0]] ? a : b)
  const gender = topGender[0]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex flex-row h-16 w-full justify-between py-3 mb-3 relative z-[1000]">
        <div className="flex flex-row pt-1 scale-75 justify-center items-center">
          <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 leading-4 text-[#1A1B1C]">
            SKINSTRIC
          </span>
          <span className="text-[#1a1b1c83] font-semibold text-sm ml-1.5 mr-1.5">
            [ ANALYSIS ]
          </span>
        </div>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors text-[#FCFCFC] text-xs bg-[#1A1B1C] h-9 px-4 py-2 mx-4 scale-75 leading-4">
          ENTER CODE
        </button>
      </header>

      {/* Page Title */}
      <div className="px-8 mb-6">
        <p className="text-xs font-bold mb-2">A.I. ANALYSIS</p>
        <h1 className="text-4xl font-normal">DEMOGRAPHICS</h1>
        <p className="text-sm text-gray-600">PREDICTED RACE & AGE</p>
      </div>

      <div className="flex px-8 gap-8">
        {/* Left Sidebar */}
        <div className="w-32">
          <div className="space-y-2">
            <div className="bg-black text-white px-3 py-2 text-sm font-semibold">
              {topRaceName.toUpperCase()}
            </div>
            <div className="text-sm font-semibold text-gray-700 px-3 py-1">
              RACE
            </div>
            <div className="bg-black text-white px-3 py-2 text-sm font-semibold">
              {ageRange}
            </div>
            <div className="text-sm font-semibold text-gray-700 px-3 py-1">
              AGE
            </div>
            <div className="bg-black text-white px-3 py-2 text-sm font-semibold">
              {gender.toUpperCase()}
            </div>
            <div className="text-sm font-semibold text-gray-700 px-3 py-1">
              SEX
            </div>
          </div>
        </div>

        {/* Center - Circular Chart */}
        <div className="flex-1 flex items-center justify-center">
          <div className="border-2 border-blue-400 p-8 bg-gray-50">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">{topRaceName}</h2>
            </div>
            
            {/* Circular Progress */}
            <div className="relative w-64 h-64 mx-auto">
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
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${topRacePercentage * 2.827} 282.7`}
                  className="text-black"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold">{topRacePercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Detailed Breakdown */}
        <div className="w-64">
          <div className="mb-4">
            <p className="text-xs font-bold mb-2">RACE:</p>
            <p className="text-xs text-gray-600 mb-4">A.I. CONFIDENCE</p>
          </div>
          
          <div className="space-y-2">
            {Object.entries(raceData).map(([race, confidence]) => (
              <div key={race} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <span className="capitalize">{race.replace('_', ' ')}</span>
                </div>
                <span>{Math.round(confidence * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-8 w-full flex justify-between px-8">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
        >
          <div className="w-8 h-8 border border-black rotate-45 flex items-center justify-center">
            <span className="rotate-[-45deg] text-xs">←</span>
          </div>
          <span className="text-sm font-semibold">BACK</span>
        </button>

        <div className="flex gap-4">
          <button 
            onClick={handleReset}
            className="px-6 py-2 border border-gray-400 text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            RESET
          </button>
          <button 
            onClick={handleConfirm}
            className="px-6 py-2 bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  )
}

export default Demographics

