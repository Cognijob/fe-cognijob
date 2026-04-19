import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import RegisterSelection from './pages/RegisterSelection'
import Register from './pages/Register'
import Login from './pages/Login' 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Halaman Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterSelection />} />
        <Route path="/register/:role" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App