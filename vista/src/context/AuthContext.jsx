import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Cargar el correo del localStorage al iniciar
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    }
  }, []);

  const login = (email) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};