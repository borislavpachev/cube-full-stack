import { MainLayout } from '@/components/layout';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/contexts/types';
import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SimpleNav } from './components';

export default function AdminPage() {
  const { user } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== 'Admin') {
      navigate('/error');
    }
  }, [user?.role, navigate]);

  return (
    <MainLayout>
      <div className="w-full flex flex-col items-start justify-start p-10">
        <p className="text-3xl">Admin</p>
        <div className="w-full flex flex-col md:flex-row mt-5">
          <SimpleNav />
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}
