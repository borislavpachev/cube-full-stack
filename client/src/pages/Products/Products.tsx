import { MainLayout } from '@/components/layout';
import { CategoryCard } from '@/components/productComponents';
import { productCategories } from '@/constants';

export default function Products() {
  return (
    <MainLayout>
      <div className="max-w-5xl my-10 m-auto flex flex-col md:grid md:grid-cols-[repeat(auto-fill,minmax(265px,1fr))] gap-10">
        {productCategories.map((category, index) => {
          return <CategoryCard key={index} category={category} />;
        })}
      </div>
    </MainLayout>
  );
}
