'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

export interface IAuthContext {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (value: boolean) => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Checks if the user is logged in when the app starts
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsUserLoggedIn(!!user);

    // This function will be called whenever the local storage changes
    const handleStorageChange = () => {
      const userInStorage = localStorage.getItem('user');
      setIsUserLoggedIn(!!userInStorage);
    };

    // Add the event listener
    window.addEventListener('storage', handleStorageChange);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
