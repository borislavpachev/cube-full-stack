import { Product } from '@/components';
import { MainLayout } from '@/components/layout';

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="h-screen my-10">
          <Product />
        </div>
      </MainLayout>
    </>
  );
}
