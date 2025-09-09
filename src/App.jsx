// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Introduce from "./pages/Introduce";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/introduce" element={<Introduce />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;













