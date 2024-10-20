import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/contexts/types';
import { useContext } from 'react';

export default function useAuth() {
  const context = useContext(AuthContext) as AuthContextType | undefined;

  if (!context) {
    throw new Error('Auth hook must be used within Auth.Provider');
  }
  const { user, setUser, isAuthenticated, setIsAuthenticated } = context;
  return { user, setUser, isAuthenticated, setIsAuthenticated };
}
