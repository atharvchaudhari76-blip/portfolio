import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user on mount
    const savedUser = localStorage.getItem('aesthetic-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // For portfolio: check against users in localStorage
    const users = JSON.parse(localStorage.getItem('aesthetic-users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPass } = foundUser;
      setUser(userWithoutPass);
      localStorage.setItem('aesthetic-user', JSON.stringify(userWithoutPass));
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('aesthetic-users') || '[]');
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'User already exists' };
    }
    
    const newUser = { name, email, password, joinedAt: new Date().toISOString() };
    localStorage.setItem('aesthetic-users', JSON.stringify([...users, newUser]));
    
    const { password: p, ...userWithoutPass } = newUser;
    setUser(userWithoutPass);
    localStorage.setItem('aesthetic-user', JSON.stringify(userWithoutPass));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aesthetic-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
