import { MainLayout } from '@/components/layout';
import { Outlet } from 'react-router-dom';
import { SideNav } from './components';

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="w-full flex flex-col items-start justify-start px-20 py-10">
        <p className="text-3xl">My Profile</p>
        <div className="w-full flex flex-col md:flex-row mt-10">
          <SideNav />
          <Outlet/>
        </div>
      </div>
    </MainLayout>
  );
}
