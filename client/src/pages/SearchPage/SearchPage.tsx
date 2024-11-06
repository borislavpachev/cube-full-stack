import { NewArrivals, NoData, ProductCard } from '@/components';
import { MainLayout, Section } from '@/components/layout';
import { ProductValue } from '@/components/product/types';
import { useForm } from '@/hooks';
import { getAllProducts } from '@/services';
import { useEffect, useMemo, useState } from 'react';
import { Filters } from './components';

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(0);
  const { form, setForm, updateForm } = useForm({
    gender: '',
    category: '',
    price: 0,
  });
  const [allProducts, setAllProducts] = useState<ProductValue[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        const products = res.data.products;

        setAllProducts(products);

        const maxProductPrice = products.reduce(
          (acc: number, product: ProductValue) => {
            if (product.price >= acc) {
              acc = product.price;
            }
            return acc;
          },
          0
        );

        setMaxPrice(maxProductPrice);
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

      const priceMatch = form.price ? product.price <= form.price : true;
      return nameMatch && categoryMatch && genderMatch && priceMatch;
    });
  }, [allProducts, search, form.category, form.gender, form.price]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
  };

  const resetFilters = () => {
    setSearch('');
    setForm({
      gender: '',
      category: '',
      price: 0,
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
            maxPrice={maxPrice}
          />
          <Section>
            {filteredProducts.length ? (
              <>
                <p className="self-start text-3xl mb-5">{`${
                  !search && !form.gender && !form.category && !form.price
                    ? `All products`
                    : `Results ${search ? `for '${search}'` : ''}`
                }`}</p>
                <div className="flex flex-wrap w-full gap-10 justify-center">
                  {filteredProducts.map((item) => {
                    return <ProductCard key={item._id} id={item._id} />;
                  })}
                </div>
              </>
            ) : (
              <NoData
                main={'No search results.'}
                secondary="Set search criteria to find the best deals for you."
              />
            )}
          </Section>
        </div>
        <NewArrivals />
      </div>
    </MainLayout>
  );
}
