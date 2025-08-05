
import './App.css'
import  {BrowserRouter as Router, Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Forgot from './pages/auth/Forgot.jsx'
import Reset from './pages/auth/Reset.jsx'
function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={< Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot/>} />
      <Route path="/resetPassword/ :resetToken " element={<Reset/>} />
      
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
