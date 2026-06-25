/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User } from '../types';
import * as api from '../services/api';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (nombre: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

function getInitialUser(): User | null {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  if (token && storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
  return null;
}

function getInitialToken(): string | null {
  return localStorage.getItem('token');
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [token, setToken] = useState<string | null>(getInitialToken);
  const [, setLoading] = useState(false);

  const saveAuth = (tokenVal: string, userVal: User) => {
    localStorage.setItem('token', tokenVal);
    localStorage.setItem('user', JSON.stringify(userVal));
    setToken(tokenVal);
    setUser(userVal);
  };

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      saveAuth(res.token, res.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (nombre: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await api.register({ nombre, email, password });
      saveAuth(res.token, res.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading: false, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
