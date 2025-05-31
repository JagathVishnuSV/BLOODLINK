import React, { createContext, useState, useEffect } from 'react';
import axios from '../axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUser  = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser (null);
        setLoading(false); // Set loading to false if no token
        return;
      }

      try {
        const response = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser (response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('token'); // Clear invalid token
          setUser (null);
        }
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUser ();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser , loading }}>
      {children}
    </AuthContext.Provider>
  );
};
