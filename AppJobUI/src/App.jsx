import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import DashBoard from './Pages/DashBoard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OAuth2RedirectHandler from './oAuth/OAuth2RedirectHandler';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path ="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route path="/student-dashboard" element={<DashBoard />} />
        <Route path="/recruiter-dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
