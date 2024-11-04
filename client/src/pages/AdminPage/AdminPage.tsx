import { MainLayout } from '@/components/layout';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { AdminNav } from './components';

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role !== 'Admin') {
        navigate('/error');
      }
    }
  }, [user, navigate]);

  return (
    <MainLayout>
      <div className="w-full flex flex-col items-start justify-start p-10">
        <p className="text-3xl">Admin</p>
        <div className="w-full flex flex-col md:flex-row mt-5">
          <AdminNav />
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}
