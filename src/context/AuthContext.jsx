import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api.js'; // FIXED: Import the real API service pipeline

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load active session token layout on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('rentease_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('rentease_user');
      }
    }
    setLoading(false);
  }, []);

  // FIXED: Removed mock object, connected directly to Express /auth/login route
  const login = async (email, password) => {
    try {
      const data = await api.login({ email, password });
      
      setUser(data);
      localStorage.setItem('rentease_user', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("❌ Authentication Gateway Login Error:", error.response?.data?.message || error.message);
      return false;
    }
  };

  // FIXED: Wrapped payload to pass 'city' parameters directly down to Mongoose database
  const register = async (name, email, password, city) => {
    try {
      const data = await api.register({ name, email, password, city });
      
      setUser(data);
      localStorage.setItem('rentease_user', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error("❌ Authentication Gateway Onboarding Error:", error.response?.data?.message || error.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rentease_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};