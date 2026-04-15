import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('aesthetic-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    // For portfolio: check against users in localStorage
    const users = JSON.parse(localStorage.getItem('aesthetic-users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPass } = foundUser;
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
    
    const { password: _, ...userWithoutPass } = newUser;
    setUser(userWithoutPass);
    localStorage.setItem('aesthetic-user', JSON.stringify(userWithoutPass));
    return { success: true };
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem('aesthetic-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
