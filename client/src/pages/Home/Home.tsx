import { MainLayout } from '@/components/layout';
import { Hero, MonthCategory, NewArrivals } from './components';

export default function Home() {
  

  return (
    <>
      <MainLayout>
        <div className="w-full">
          <Hero />
          <MonthCategory />
          <NewArrivals/>
        </div>
      </MainLayout>
    </>
  );
}
