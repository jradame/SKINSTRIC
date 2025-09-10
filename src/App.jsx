import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Introduce from "./pages/Introduce";
import Result from "./pages/Result"; // NEW

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/result" element={<Result />} /> {/* NEW */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;














