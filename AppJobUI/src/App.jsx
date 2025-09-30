import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import RecruiterDashBoard from './Pages/RecruiterDashBoard'
import StudentDashBoard from './Pages/StudentDashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OAuth2RedirectHandler from './oAuth/OAuth2RedirectHandler';
import  {Navigate} from 'react-router-dom'
import Navbar from './Components/Navbar';  // Navbar import added
import ProtectedRoute from './API/ProtectedRoute'  

import ServicesPage from './Pages/ServicePages'
function App() {
  

  return (
    <>
      <Router>
      <Navbar />  {/* Navbar included here */}
      <main className="pt-16">
      <Routes>
        <Route path="/" element={<ServicesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path ="/oauth2/redirect" element={<OAuth2RedirectHandler />}/>
        <Route path="/" element={<Navigate to="/login" />} />  {/* Redirect root to login */}
        <Route element={<ProtectedRoute />}>
            <Route path="/student-dashboard" element={<StudentDashBoard />} />
            <Route path="/recruiter-dashboard" element={<RecruiterDashBoard />} />
            {/* Add any other future protected routes here */}
          </Route>
      </Routes>
      </main>
    </Router>
    </>
  )
}

export default App
