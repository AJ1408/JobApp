import React, { useState } from 'react'; // 1. Fixed the import (removed 'use')
import { useNavigate, Link } from 'react-router-dom';
import api from '../API/api';// Make sure you have your api.js file

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
  

    const registrationData = {
      email: email,
      password: password,
      role: role,
    };

    try {
      await api.post('/api/auth/register', registrationData);
      alert('Registration successful! Please log in.');
      navigate('/'); // Navigate to login on success
    } catch (err) {
      console.error('Registration failed:', err);
      // 2. Adjust error handling to expect a plain string from your backend
      if (err.response && err.response.data) {
        setError(err.response.data); // Your backend sends a string, not an object with a .message property
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-800 justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-blue-500 bg-white"
          >
            <option value="STUDENT">I am a Student</option>
            <option value="RECRUITER">I am a Recruiter</option>
          </select>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;