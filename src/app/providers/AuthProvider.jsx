'use client';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getToken, setToken, clearToken, getStoredUser, setStoredUser, clearStoredUser } from '../utils/auth';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({ user: null, token: null, login: async () => {}, logout: () => {} });

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [token, setTok] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = getToken();
    const u = getStoredUser();
    if (t) setTok(t);
    if (u) setUser(u);
    setReady(true);
  }, []);

  const login = useCallback((t, u) => {
    setToken(t); setStoredUser(u);
    setTok(t); setUser(u);
  }, []);

  const logout = useCallback(() => {
    clearToken(); clearStoredUser();
    setTok(null); setUser(null);
    router.push('/');
  }, [router]);

  const value = { user, token, login, logout, ready };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;


