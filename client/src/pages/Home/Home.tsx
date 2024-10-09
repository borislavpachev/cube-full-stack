import { MainLayout } from '@/components/layout';
import { ProductComponent } from '@/components/productComponents';

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="h-screen my-10">
          <ProductComponent />
        </div>
      </MainLayout>
    </>
  );
}
