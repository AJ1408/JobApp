import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import api from '../API/api';


function Login() {
  const [email ,setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Send only email and password to the backend
      const response = await api.post('/api/auth/login', {
        email: email,
        password: password,
      });

      // 2. ✅ Receive BOTH the token and the role from the backend
      const { token, role } = response.data;

      // 3. ✅ Store BOTH the token and the role in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role); // Store the role

      // 4. ✅ Redirect based on the role
      if (role === 'STUDENT') {
        navigate('/student-dashboard');
      } else if (role === 'RECRUITER') {
        navigate('/recruiter-dashboard');
      } else {
        navigate('/dashboard'); // A generic fallback
      }

    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password. Please try again.');
    }

    const googleLoginUrl = "http://localhost:8080/oauth2/authorization/google";
  };
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-800'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <form onSubmit={handleSubmit} method="post" className="space-y-4">
          <input 
            type='email' 
            placeholder='Email'
            className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
           />
           <input 
            type='password' 
            placeholder='PassWord'
            className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value) 
            }
            required
           />

           <button type="submit"
           className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 "
           >
            Login
           </button>

           <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
        </div>

        {/* ✅ Add the Google Login Button */}
        <a href={googleLoginUrl}
           className="w-full flex justify-center items-center bg-white text-gray-700 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="w-5 h-5 mr-2" />
          <span>Login with Google</span>
        </a>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?
          <Link to= "/register" className="text blue 600 hover:underline" >
          Register
          </Link>
        </p>

      </div>
      
    </div>
  )
}

export default Login
