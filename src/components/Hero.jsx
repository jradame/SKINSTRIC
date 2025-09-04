import React, { useState } from 'react';

const Hero = ({ onAnalyze, loading, skinData }) => {
  const [formData, setFormData] = useState({
    skinType: '',
    concerns: '',
    age: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.skinType && formData.concerns && formData.age) {
      await onAnalyze(formData);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Main elegant view - just the sophisticated title
  if (!skinData) {
    return (
      <div className="relative min-h-screen flex flex-col justify-center items-center px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-none text-black">
            Sophisticated<br />
            skincare
          </h1>
        </div>
        
        {/* Text positioned in bottom left corner */}
        <div className="absolute bottom-8 left-8">
          <p className="text-xs tracking-widest text-gray-600 uppercase leading-relaxed">
            SKINETIC DEVELOPED AN AI THAT CREATES<br />
            HIGHLY PERSONALIZED ROUTINE TAILORED TO<br />
            YOUR SKIN NEEDS
          </p>
        </div>
      </div>
    );
  }

  // Results state (after API call)
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-8 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-gray-50 p-8 rounded-lg text-left">
          <h3 className="text-2xl font-serif mb-4">Your Personalized Routine</h3>
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(skinData, null, 2)}</pre>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 bg-black text-white py-3 px-6 text-sm tracking-wider hover:bg-gray-800 transition-colors"
        >
          START OVER
        </button>
      </div>
    </div>
  );
};

export default Hero;



