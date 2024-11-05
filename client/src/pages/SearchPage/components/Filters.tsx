import { Sidebar } from '@/components/layout';
import { Input, Label, Select } from '@/components/form';
import { productCategories } from '@/constants';
import { Button } from '@/components/buttons';

type FiltersProps = {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: { gender: string; category: string };
  updateForm: (
    prop: 'gender' | 'category'
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  reset: () => void;
};

export default function Filters({
  search,
  form,
  handleSearch,
  updateForm,
  reset,
}: FiltersProps) {
  return (
    <Sidebar>
      <div className="px-5 my-1">
        <Input
          id="app-search-bar"
          name="app-search-bar"
          value={search}
          onChange={handleSearch}
          placeholder="Search items"
        />
        <div className="flex flex-col w-full mb-5">
          <Label htmlFor="search-gender-select">Gender</Label>
          <Select
            id="search-gender-select"
            name="search-gender-select"
            onChange={updateForm('gender')}
            options={['', 'Women', 'Men']}
            value={form.gender}
          />
        </div>
        <div className="flex flex-col w-full mb-6">
          <Label htmlFor="search-category-select">Categories</Label>
          <Select
            id="search-category-select"
            name="search-category-select"
            onChange={updateForm('category')}
            value={form.category}
            options={[{ name: '' }, ...productCategories].map((category) => {
              return category.name;
            })}
          />
        </div>
        <Button onClick={reset}>Reset</Button>
      </div>
    </Sidebar>
  );
}
