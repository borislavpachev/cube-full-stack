import { type ReactNode } from 'react';

export type AuthProviderProps = {
  children: ReactNode;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'User';
  phoneNumber: string;
  deliveryAddress: string;
  favorites: [];
  shoppingCart: [];
  password: string;
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  loading: boolean;
};
