import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
      <h1 className="text-6xl font-bold text-red-700">404</h1>
      <p className="text-xl mb-6 text-red-600">Page Not Found</p>
      <Link
        to="/"
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;