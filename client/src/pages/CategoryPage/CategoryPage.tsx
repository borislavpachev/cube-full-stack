import { MainLayout, Section } from '@/components/layout';
import { productCategories } from '@/constants';
import { CategoryCard } from './components';
import { useParams } from 'react-router-dom';

export default function CategoryPage() {
  const {gender} = useParams();

  return (
    <MainLayout>
      <Section>
        <div className={`w-6xl ${gender === 'women' ? 'bg-red-100/50' : 'bg-blue-100/50'} m-auto flex flex-wrap items-center justify-center p-10 gap-14 mb-10`}>
          {productCategories.map((category, index) => {
            return <CategoryCard key={index} category={category} />;
          })}
        </div>
      </Section>
    </MainLayout>
  );
}
