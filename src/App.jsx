import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './pages/Hero'
import Introduce from './pages/Introduce'
import Result from './pages/Result'
import Demographics from './pages/Demographics'  // Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/result" element={<Result />} />
        <Route path="/demographic" element={<Demographics />} />  {/* Add this route */}
      </Routes>
    </Router>
  )
}

export default App















