import { AuthContext } from '@/contexts/AuthContext';
import { useContext, type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContextType } from '@/contexts/types';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  if (isAuthenticated) {
    if (location.pathname === '/login' || location.pathname === '/sign-up') {
      return <Navigate replace to="/" />;
    }
  }

  return <>{children}</>;
}
