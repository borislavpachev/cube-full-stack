import { Sizes } from '@/components/product/types';
import { type ReactNode } from 'react';

export type AuthProviderProps = {
  children: ReactNode;
};

export type FavoriteType = {
  productId: string;
  productSize: Sizes;
};

export type ShoppingCartType = {
  _id: string;
  quantity: number;
  size: Sizes;
  price: number;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'User';
  phoneNumber: string;
  deliveryAddress: {
    street?: string;
    city?: string;
    additionalInfo?: string;
  };
  favorites: FavoriteType[];
  shoppingCart: ShoppingCartType[];
  password: string;
  isBlocked: boolean;
};

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  loading: boolean;
};
