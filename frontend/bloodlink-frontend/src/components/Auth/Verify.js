import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('emailForVerification');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/verify-email', { email, otp });
      localStorage.setItem('token', response.data.token);
      navigate('/home');
      localStorage.removeItem('emailForVerification');
      alert('Email verified successfully!');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'OTP verification failed');
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post('/auth/resend-otp', { email });
      alert('OTP resent successfully!');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to resend OTP');
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-rose-100 via-red-200 to-rose-400 text-red-900 px-6 py-12">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold text-red-800">Verify Your Email</h1>
          <p className="text-gray-600 mt-1">Enter the OTP sent to <strong>{email}</strong></p>
          <button type="button" onClick={handleResendOtp}
            className="text-sm text-red-600 hover:text-red-800 underline mt-2">
            Resend OTP
        </button>

        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-medium shadow-md hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Verify OTP
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-white/80 text-sm">
        &copy; {new Date().getFullYear()} BloodLink. All rights reserved.
      </div>
    </div>
  );
};

export default Verify;
