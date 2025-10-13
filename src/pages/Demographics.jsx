import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Demographics = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('race'); // New state for category
  const [selectedItem, setSelectedItem] = useState(null);
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

  // Set initial selected item when data loads or category changes
  useEffect(() => {
    if (analysisData) {
      if (selectedCategory === 'race') {
        setSelectedItem({
          name: 'Latino hispanic',
          percentage: 72,
          key: 'latino_hispanic',
          category: 'race'
        });
      } else if (selectedCategory === 'age') {
        setSelectedItem({
          name: '3-9',
          percentage: 86,
          key: '3_9',
          category: 'age'
        });
      } else if (selectedCategory === 'sex') {
        setSelectedItem({
          name: 'Female',
          percentage: 52,
          key: 'female',
          category: 'sex'
        });
      }
    }
  }, [analysisData, selectedCategory]);

  const handleBack = () => navigate("/select");

  const handleItemClick = (itemKey, itemName, percentage, category) => {
    setSelectedItem({
      name: itemName,
      percentage: percentage,
      key: itemKey,
      category: category
    });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

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

  // Race data
  const raceList = [
    { key: 'latino_hispanic', name: 'Latino hispanic', percentage: 72 },
    { key: 'white', name: 'White', percentage: 11 },
    { key: 'east_asian', name: 'East asian', percentage: 5 },
    { key: 'middle_eastern', name: 'Middle eastern', percentage: 4 },
    { key: 'southeast_asian', name: 'Southeast asian', percentage: 3 },
    { key: 'black', name: 'Black', percentage: 2 },
    { key: 'south_asian', name: 'South asian', percentage: 0 }
  ].map(race => ({
    ...race,
    isSelected: selectedItem?.key === race.key && selectedCategory === 'race'
  }));

  // Age data
  const ageList = [
    { key: '3_9', name: '3-9', percentage: 86 },
    { key: '10_19', name: '10-19', percentage: 4 },
    { key: '30_39', name: '30-39', percentage: 4 },
    { key: '50_59', name: '50-59', percentage: 3 },
    { key: '0_2', name: '0-2', percentage: 0 },
    { key: '20_29', name: '20-29', percentage: 0 },
    { key: '40_49', name: '40-49', percentage: 0 },
    { key: '60_69', name: '60-69', percentage: 0 },
    { key: '70_plus', name: '70+', percentage: 0 }
  ].map(age => ({
    ...age,
    isSelected: selectedItem?.key === age.key && selectedCategory === 'age'
  }));

  // Sex/Gender data from your screenshot
  const sexList = [
    { key: 'female', name: 'FEMALE', percentage: 52 },
    { key: 'male', name: 'MALE', percentage: 47 }
  ].map(sex => ({
    ...sex,
    isSelected: selectedItem?.key === sex.key && selectedCategory === 'sex'
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex flex-row h-16 w-full py-3 mb-6 relative z-[1000]">
        <div className="absolute -left-[346px] top-0 h-16 flex flex-row pt-1 scale-90 items-center pl-4 bg-white z-[1001]">
          <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold text-base mr-2 text-[#1A1B1C]">
            SKINSTRIC
          </span>
          <span className="text-[#1a1b1c83] font-semibold text-sm ml-1.5">
            [ INTRO ]
          </span>
        </div>
        
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
        {/* Left Sidebar - Clickable category icons */}
        <div className="col-span-2 flex flex-col gap-6 p-6">
          <img 
            src="/Image/race1.svg" 
            alt="Race" 
            className={`cursor-pointer hover:opacity-80 w-full transition-all duration-200 ${
              selectedCategory === 'race' ? 'ring-4 ring-black ring-opacity-50 scale-105' : ''
            }`}
            onClick={() => handleCategoryClick('race')}
          />
          <img 
            src="/Image/age1.svg" 
            alt="Age" 
            className={`cursor-pointer hover:opacity-80 w-full transition-all duration-200 ${
              selectedCategory === 'age' ? 'ring-4 ring-black ring-opacity-50 scale-105' : ''
            }`}
            onClick={() => handleCategoryClick('age')}
          />
          <img 
            src="/Image/sex1.svg" 
            alt="Sex" 
            className={`cursor-pointer hover:opacity-80 w-full transition-all duration-200 ${
              selectedCategory === 'sex' ? 'ring-4 ring-black ring-opacity-50 scale-105' : ''
            }`}
            onClick={() => handleCategoryClick('sex')}
          />
        </div>

        {/* Middle Chart - Updates based on selected item */}
        <div className="col-span-7 flex items-stretch">
          <div className="w-full bg-[#F5F6F7] border border-gray-300 p-14 flex justify-between items-center">
            <div className="text-5xl font-medium capitalize">
              {selectedItem ? selectedItem.name : "Latino hispanic"}
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
                  strokeDasharray={`${selectedItem ? selectedItem.percentage * 2.827 : 72 * 2.827} 282.7`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold">
                  {selectedItem ? selectedItem.percentage : 72}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Dynamic list based on selected category */}
        <div className="col-span-3 flex items-stretch p-6">
          <div className="w-full bg-white border border-gray-300 p-6">
            <div className="mb-4 border-b border-gray-300 pb-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                {selectedCategory.toUpperCase()}
              </h3>
              <h4 className="text-lg font-semibold">A.I. CONFIDENCE</h4>
            </div>
            
            <div className="space-y-3">
              {/* Race List */}
              {selectedCategory === 'race' && raceList.map((race, index) => (
                <div 
                  key={race.key} 
                  className={`flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                    race.isSelected ? 'bg-black text-white' : ''
                  }`}
                  onClick={() => handleItemClick(race.key, race.name, race.percentage, 'race')}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 mr-3 ${
                      race.isSelected ? 'bg-white' : 'border border-gray-300'
                    }`}></div>
                    <span className={`text-sm ${
                      race.isSelected ? 'font-semibold text-white' : 'text-gray-700'
                    }`}>
                      {race.name}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    race.isSelected ? 'text-white' : 'text-gray-700'
                  }`}>
                    {race.percentage}%
                  </span>
                </div>
              ))}

              {/* Age List */}
              {selectedCategory === 'age' && ageList.map((age, index) => (
                <div 
                  key={age.key} 
                  className={`flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                    age.isSelected ? 'bg-black text-white' : ''
                  }`}
                  onClick={() => handleItemClick(age.key, age.name, age.percentage, 'age')}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 mr-3 ${
                      age.isSelected ? 'bg-white' : 'border border-gray-300'
                    }`}></div>
                    <span className={`text-sm ${
                      age.isSelected ? 'font-semibold text-white' : 'text-gray-700'
                    }`}>
                      {age.name}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    age.isSelected ? 'text-white' : 'text-gray-700'
                  }`}>
                    {age.percentage}%
                  </span>
                </div>
              ))}

              {/* Sex/Gender List */}
              {selectedCategory === 'sex' && sexList.map((sex, index) => (
                <div 
                  key={sex.key} 
                  className={`flex justify-between items-center py-2 px-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                    sex.isSelected ? 'bg-black text-white' : ''
                  }`}
                  onClick={() => handleItemClick(sex.key, sex.name, sex.percentage, 'sex')}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 mr-3 ${
                      sex.isSelected ? 'bg-white' : 'border border-gray-300'
                    }`}></div>
                    <span className={`text-sm ${
                      sex.isSelected ? 'font-semibold text-white' : 'text-gray-700'
                    }`}>
                      {sex.name}
                    </span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    sex.isSelected ? 'text-white' : 'text-gray-700'
                  }`}>
                    {sex.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-4 md:pt-[37px] pb-6 bg-white sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16 relative">
        <div className="flex justify-between items-center w-full">
          <button onClick={handleBack} className="absolute left-8 transform translate-y-10">
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
          </button>

          <div className="text-sm text-gray-500 text-center hidden sm:block absolute left-1/2 transform -translate-x-1/2 translate-y-6 -translate-x-[260px]">
            If A.I. estimate is wrong, select the correct one.
          </div>

          <button onClick={() => navigate("/")} className="absolute right-8 transform translate-y-10">
            <div>
              <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">HOME</span>
              </div>
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






