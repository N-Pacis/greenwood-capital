import { createContext, useContext, useState, useCallback } from 'react';
import { DEMO_USERS, getAllDemoUsers } from '../data/mockData';

const AuthContext = createContext(null);

/**
 * Mock Authentication Provider
 *
 * For demo purposes, this simulates authentication without a real backend.
 * Users can switch between demo personas to see different score profiles.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate login with demo user
  const login = useCallback(async (userId) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const demoUser = Object.values(DEMO_USERS).find(u => u.id === userId);
    if (demoUser) {
      setUser(demoUser);
      localStorage.setItem('demo_user_id', userId);
    }
    setIsLoading(false);
    return demoUser;
  }, []);

  // Login with email (for demo, maps to a demo user)
  const loginWithEmail = useCallback(async (email) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user by email or default to Maria
    const demoUser = Object.values(DEMO_USERS).find(u => u.email === email) || DEMO_USERS.maria;
    setUser(demoUser);
    localStorage.setItem('demo_user_id', demoUser.id);
    setIsLoading(false);
    return demoUser;
  }, []);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('demo_user_id');
  }, []);

  // Switch demo user (for testing different personas)
  const switchUser = useCallback(async (userId) => {
    return login(userId);
  }, [login]);

  // Check for existing session on mount
  const checkSession = useCallback(async () => {
    const savedUserId = localStorage.getItem('demo_user_id');
    if (savedUserId) {
      await login(savedUserId);
    }
  }, [login]);

  // Get all available demo users
  const getDemoUsers = useCallback(() => {
    return getAllDemoUsers();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    loginWithEmail,
    logout,
    switchUser,
    checkSession,
    getDemoUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
