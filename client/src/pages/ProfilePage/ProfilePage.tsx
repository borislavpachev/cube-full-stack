import { MainLayout } from '@/components/layout';
import { Outlet } from 'react-router-dom';
import { ProfileNav } from './components';

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="w-full flex flex-col items-start justify-start px-20 py-10">
        <p className="text-3xl">My Profile</p>
        <div className="w-full flex flex-col md:flex-row mt-10">
          <ProfileNav />
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}
