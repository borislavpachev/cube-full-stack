import { NewArrivals, ProductCard } from '@/components';
import { MainLayout, Section } from '@/components/layout';
import { ProductValue } from '@/components/product/types';
import { useForm } from '@/hooks';
import { getAllProducts } from '@/services';
import { useEffect, useMemo, useState } from 'react';
import { Filters } from './components';

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const { form, setForm, updateForm } = useForm({
    gender: '',
    category: '',
  });
  const [allProducts, setAllProducts] = useState<ProductValue[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        const products = res.data.products;

        setAllProducts(products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const nameMatch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const categoryMatch = form.category
        ? product.category === form.category
        : true;
      const genderMatch = form.gender ? product.gender === form.gender : true;
      return nameMatch && categoryMatch && genderMatch;
    });
  }, [allProducts, search, form.category, form.gender]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
  };

  const resetFilters = () => {
    setSearch('');
    setForm({
      gender: '',
      category: '',
    });
  };

  return (
    <MainLayout>
      <div className="space-y-10 mb-16 flex flex-col justify-center w-full">
        <div className="px-20 flex flex-col md:flex-row mt-5">
          <Filters
            search={search}
            form={form}
            handleSearch={handleSearch}
            updateForm={updateForm}
            reset={resetFilters}
          />
          <Section>
            {filteredProducts.length ? (
              <>
                <p className="self-start text-3xl mb-5">{`${
                  !search && !form.gender && !form.category
                    ? `All products`
                    : `Results for '${search}/${form.gender}/${form.category}'`
                }`}</p>
                <div className="flex flex-wrap w-full gap-10 justify-center">
                  {filteredProducts.map((item) => {
                    return <ProductCard key={item._id} id={item._id} />;
                  })}
                </div>
              </>
            ) : (
              <Section>
                <div
                  className="w-full flex flex-col mt-10 md:mt-0 
                  items-center justify-center px-10"
                >
                  <p className="text-center text-xl flex items-center">
                    No search results.
                  </p>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    Set search criteria to find the best deals for you.
                  </p>
                </div>
              </Section>
            )}
          </Section>
        </div>
        <NewArrivals />
      </div>
    </MainLayout>
  );
}
