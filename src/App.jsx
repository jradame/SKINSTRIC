import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import existing components
import Result from './pages/Result'
import Analysis from './pages/Analysis'  
import Select from './pages/Select'
import Demographics from './pages/Demographics'
import Hero from './pages/Hero'
import Introduce from './pages/Introduce'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main flow */}
          <Route path="/" element={<Hero />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/result" element={<Result />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/select" element={<Select />} />
          <Route path="/demographics" element={<Demographics />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

















