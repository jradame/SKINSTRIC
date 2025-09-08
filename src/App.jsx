// App.jsx
import React, { useState } from "react";
import Hero from "./components/Hero"; // ✅ Keep only Hero

function App() {
  const [skinData, setSkinData] = useState(null);
  const [loading, setLoading] = useState(false);

  // You can still keep this function if you'll connect API later
  const handleAnalyzeSkin = async (userData) => {
    setLoading(true);
    try {
      // API call placeholder
      console.log("Analyzing skin with data:", userData);
      setSkinData({ result: "Sample result" });
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Hero onAnalyze={handleAnalyzeSkin} loading={loading} skinData={skinData} />
    </div>
  );
}

export default App;






