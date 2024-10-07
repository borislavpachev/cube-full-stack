import { authenticate } from '@/services/authService';
import { createContext, useEffect, useState } from 'react';
import { AuthContextType, AuthProviderProps, User } from './types';
import { Loading } from '@/components';

const initialValue = {
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  loading: true,
};

export const AuthContext = createContext<AuthContextType | null>(initialValue);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialValue.user);
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialValue.isAuthenticated
  );
  const [loading, setLoading] = useState(initialValue.loading);

  useEffect(() => {
    authenticate()
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setUser(initialValue.user);
        setIsAuthenticated(initialValue.isAuthenticated);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
