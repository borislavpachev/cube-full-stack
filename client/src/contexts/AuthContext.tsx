import { authenticate } from '@/services/authService';
import { createContext, useEffect, useState } from 'react';
import { AuthContextType, AuthProviderProps, User } from './types';
import { Loading } from '@/components';

const initialValue = {
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
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
          setUser(initialValue.user);
          setIsAuthenticated(initialValue.isAuthenticated);
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
    return <Loading top={false} />;
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
