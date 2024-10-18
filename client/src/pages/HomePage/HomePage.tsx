import { MainLayout } from '@/components/layout';
import { Hero, MonthCategory, NewArrivals } from './components';

export default function HomePage() {
  

  return (
    <>
      <MainLayout>
        <div className="w-full space-y-20 mb-16">
          <Hero />
          <MonthCategory />
          <NewArrivals/>
        </div>
      </MainLayout>
    </>
  );
}
