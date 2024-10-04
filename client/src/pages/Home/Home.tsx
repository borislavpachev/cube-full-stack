import { Product } from '@/components';
import { MainLayout } from '@/components/layout';

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="h-[100vh] mt-20">
          <Product />
        </div>
      </MainLayout>
    </>
  );
}
