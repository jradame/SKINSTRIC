import React, { useState, useEffect } from 'react'

const Analysis = () => {
  const [apiData, setApiData] = useState(null)

  useEffect(() => {
    // Get data from localStorage
    const data = localStorage.getItem('skinstricApiResponse')
    if (data) {
      setApiData(JSON.parse(data))
    }
  }, [])

  // Timed redirect to select page
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/select'
    }, 8000) // Redirect after 8 seconds

    return () => clearTimeout(timer) // Cleanup timer on unmount
  }, [])

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
          Analysis complete. Redirecting to selection...
        </p>
      </div>

      {/* Main Content */}
      <div className="h-[78.3vh] flex flex-col items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Demographics Analysis Complete</h2>
          
          {apiData && (
            <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-3">Results:</h3>
              
              {apiData.race && (
                <div className="mb-3">
                  <strong>Race:</strong>
                  <div className="text-sm">
                    {Object.entries(apiData.race).map(([key, value]) => (
                      <div key={key}>{key}: {(value * 100).toFixed(1)}%</div>
                    ))}
                  </div>
                </div>
              )}
              
              {apiData.age && (
                <div className="mb-3">
                  <strong>Age:</strong>
                  <div className="text-sm">
                    {Object.entries(apiData.age).map(([key, value]) => (
                      <div key={key}>{key}: {(value * 100).toFixed(1)}%</div>
                    ))}
                  </div>
                </div>
              )}
              
              {apiData.gender && (
                <div className="mb-3">
                  <strong>Gender:</strong>
                  <div className="text-sm">
                    {Object.entries(apiData.gender).map(([key, value]) => (
                      <div key={key}>{key}: {(value * 100).toFixed(1)}%</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <p className="mt-6 text-gray-600">
            Automatically redirecting in 8 seconds...
          </p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 md:pt-12 pb-8 bg-white sticky md:static bottom-40 mb-0 md:mb-0">
        <div className="flex justify-between max-w-full mx-auto px-13 md:px-9">
          <a href="/result">
            <div className="text-sm font-semibold">← BACK</div>
          </a>
          <a href="/select">
            <div className="text-sm font-semibold">CONTINUE →</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Analysis

