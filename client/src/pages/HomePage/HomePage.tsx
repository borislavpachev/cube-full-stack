import { MainLayout } from '@/components/layout';
import { Hero, MonthCategory } from './components';
import { NewArrivals } from '@/components';

export default function HomePage() {
  return (
    <>
      <MainLayout>
        <div className="w-full space-y-20 mb-16">
          <Hero />
          <MonthCategory />
          <NewArrivals />
        </div>
      </MainLayout>
    </>
  );
}
