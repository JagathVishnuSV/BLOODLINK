import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { name, email, phone, password, bloodGroup, location });
      localStorage.setItem("emailForVerification", email);
      navigate('/verify');
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Registration failed'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('No response from server. Is it running?');
      } else {
        console.error('Error setting up request:', error.message);
        alert('Unexpected error during registration.');
      }
    }
    
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-rose-100 via-red-200 to-rose-400 text-red-900 px-6 py-12">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-red-800">Create an Account</h1>
          <p className="text-gray-600 mt-1">Sign up to join BloodLink</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group
            </label>
            <input
              type="text"
              id="bloodGroup"
              placeholder="Your blood group (e.g., A+, B-)"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition -colors"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-medium shadow-md hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Register
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account? 
            <a href="/login" className="text-red-600 font-medium hover:text-red-800 ml-1">
              Sign In
            </a>
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-white/80 text-sm">
        &copy; {new Date().getFullYear()} BloodLink. All rights reserved.
      </div>
    </div>
  );
};

export default Register;