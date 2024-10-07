import { MainLayout } from '@/components/layout';
import { CategoryCard } from '@/components/productComponents';
import { productCategories } from '@/constants';

export default function Products() {
  return (
    <MainLayout>
      <div className="grid md:grid-rows-2 md:grid-flow-col gap-5 m-5">
        {productCategories.map((category, index) => {
          return <CategoryCard key={index} category={category} />;
        })}
      </div>
    </MainLayout>
  );
}
