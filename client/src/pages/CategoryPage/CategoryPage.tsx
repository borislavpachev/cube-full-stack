import { MainLayout, Section } from '@/components/layout';
import { productCategories } from '@/constants';
import { CategoryCard } from './components';

export default function CategoryPage() {
  return (
    <MainLayout>
      <Section>
        <div className="w-6xl m-auto flex flex-wrap items-center justify-center p-10 gap-14 mb-10">
          {productCategories.map((category, index) => {
            return <CategoryCard key={index} category={category} />;
          })}
        </div>
      </Section>
    </MainLayout>
  );
}
