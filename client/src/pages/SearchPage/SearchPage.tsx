import { NewArrivals } from '@/components';
import { Input } from '@/components/form';
import { MainLayout, Section } from '@/components/layout';

export default function SearchPage() {
  return (
    <MainLayout>
      <div className="space-y-20 mb-16">
        <Section>
          <div className='px-10 w-full'>
            <div className="flex w-1/3 self-start">
              <Input
                id="header-search-bar-component"
                name="header-search-bar-component"
                type="search"
                value=""
                onChange={() => {}}
                placeholder="Search items"
              />
            </div>
          </div>
        </Section>
        <NewArrivals />
      </div>
    </MainLayout>
  );
}
