import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('nova_token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const savedToken = localStorage.getItem('nova_token');
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.getCurrentUser();
        if (response.success && response.data.user) {
          setUser(response.data.user);
          setToken(savedToken);
        } else {
          logout();
        }
      } catch (error) {
        console.warn('Session verification failed, clear stale token:', error.message);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await api.loginUser(credentials);
      if (response.success && response.data.token) {
        const authToken = response.data.token;
        const authUser = response.data.user;

        localStorage.setItem('nova_token', authToken);
        setToken(authToken);
        setUser(authUser);
        return { success: true, user: authUser };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await api.registerUser(userData);
      if (response.success && response.data.token) {
        const authToken = response.data.token;
        const authUser = response.data.user;

        localStorage.setItem('nova_token', authToken);
        setToken(authToken);
        setUser(authUser);
        return { success: true, user: authUser };
      }
      return { success: false, message: response.message || 'Registration failed' };
    } catch (err) {
      return { success: false, message: err.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('nova_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
