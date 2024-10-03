import { authenticate } from '@/services/authService';
import { createContext, type ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'User';
  phoneNumber: string;
  favorites: [];
  shoppingCart: [];
  password: string;
};

type AuthContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const initialValue = {
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext<AuthContextValue | null>(initialValue);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialValue.user);

  useEffect(() => {
    authenticate()
      .then((data) => {
        setUser(data.user);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
