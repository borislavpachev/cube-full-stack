import { Sidebar } from '@/components/layout';
import { Input, Label, Select } from '@/components/form';
import { productCategories } from '@/constants';
import { Button } from '@/components/buttons';

type FiltersProps = {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: { gender: string; category: string; price: number };
  updateForm: (
    prop: 'gender' | 'category' | 'price'
  ) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  reset: () => void;
  maxPrice: number;
};

export default function Filters({
  search,
  form,
  handleSearch,
  updateForm,
  reset,
  maxPrice,
}: FiltersProps) {
  return (
    <Sidebar>
      <div className="px-5 my-1">
        <Input
          id="app-search-bar"
          name="app-search-bar"
          value={search}
          onChange={handleSearch}
          placeholder="Search by name"
        />
        <div className="flex flex-col w-full mb-5">
          <Label htmlFor="search-gender-select">Filter by Gender</Label>
          <Select
            id="search-gender-select"
            name="search-gender-select"
            onChange={updateForm('gender')}
            options={['', 'Women', 'Men']}
            value={form.gender}
          />
        </div>
        <div className="flex flex-col w-full mb-6">
          <Label htmlFor="search-category-select">Filter by Category</Label>
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
        <div>
          <Label htmlFor="search-price-select">Filter by Price</Label>
          <input
            type="range"
            name="search-price-select"
            id="search-price-select"
            min={0}
            max={maxPrice}
            value={form.price}
            onChange={updateForm('price')}
            className="w-full accent-black"
          />
          <p className="tracking-wider text-center mb-5">{`Price: $0-$${!form.price ? maxPrice : form.price}`}</p>
        </div>
        <Button onClick={reset}>Reset</Button>
      </div>
    </Sidebar>
  );
}
