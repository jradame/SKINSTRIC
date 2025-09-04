import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import { skinstricAPI } from './services/apiService';

function App() {
  const [skinData, setSkinData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyzeSkin = async (userData) => {
    setLoading(true);
    try {
      const result = await skinstricAPI.analyzeSkin(userData);
      setSkinData(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Header />
      <Sidebar />
      <Hero 
        onAnalyze={handleAnalyzeSkin} 
        loading={loading}
        skinData={skinData}
      />
    </div>
  );
}

export default App;
