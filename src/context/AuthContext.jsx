import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('rentease_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    if (email && password) {
      let role = 'customer';
      if (email.startsWith('admin')) role = 'admin';
      
      const mockUser = {
        id: 'usr-' + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email: email,
        role: role,
        token: 'mock-jwt-token-xyz'
      };
      
      setUser(mockUser);
      localStorage.setItem('rentease_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const register = async (name, email, password) => {
    if (name && email && password) {
      const mockUser = {
        id: 'usr-' + Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        role: 'customer',
        token: 'mock-jwt-token-abc'
      };
      setUser(mockUser);
      localStorage.setItem('rentease_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
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