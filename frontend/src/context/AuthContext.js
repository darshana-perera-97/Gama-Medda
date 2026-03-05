import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_authenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('admin_authenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const login = (username, password) => {
    // Authentication using environment variables
    const adminUsername = process.env.REACT_APP_ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD || 'admin123';
    
    // Debug logging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('Login attempt:', { username, passwordLength: password.length });
      console.log('Expected:', { adminUsername, adminPasswordLength: adminPassword.length });
    }
    
    if (username === adminUsername && password === adminPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

