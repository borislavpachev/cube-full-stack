import { NewArrivals, ProductCard } from '@/components';
import { Input } from '@/components/form';
import { MainLayout, Section } from '@/components/layout';
import { ProductValue } from '@/components/product/types';
import { getAllProducts } from '@/services';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const [search, setSearch] = useState('');
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (search) {
      setAllProducts((prevProduct) => {
        return prevProduct.filter((product: ProductValue) => {
          return product.name.includes(search);
        });
      });
    }
  };

  return (
    <MainLayout>
      <div className="space-y-20 mb-16 flex flex-col justify-center w-full">
        <div className="px-10 w-full">
          <div className="flex px-10 w-full md:w-1/3 self-start mt-5">
            <Input
              id="app-search-bar"
              name="app-search-bar"
              value={search}
              onChange={handleSearch}
              placeholder="Search items"
            />
          </div>
          {!search ? (
            <Section>
              <div
                className="w-full flex flex-col mt-10 md:mt-0 
              items-center justify-center px-10"
              >
                <p className="text-center text-xl flex items-center">
                  No search results.
                </p>
                <p className="text-center text-sm text-gray-500 mt-2">
                  Type and find the best deals for you.
                </p>
              </div>
            </Section>
          ) : (
            <Section>
              <p className="self-start text-3xl mb-5">{`Results for '${search}'`}</p>
              <div className="flex flex-wrap w-full gap-14 justify-center">
                {allProducts.map((item) => {
                  return <ProductCard key={item._id} id={item._id} />;
                })}
              </div>
            </Section>
          )}
        </div>
        <NewArrivals />
      </div>
    </MainLayout>
  );
}
