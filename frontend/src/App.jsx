import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Signup } from './signup'
import { Login } from './login' 
import { Private } from './Private' 
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<Private />} />
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App



