import { useEffect, useState } from 'react';
import { getAllProducts } from '@/services/productService';
import { ProductCard } from '@/pages/ProductsPage/components';
import { ProductValue } from '@/components/product/types';
import { shuffleArray } from '@/utils/helpers';

export default function NewArrivals() {
  const [allProducts, setAllProducts] = useState<ProductValue[]>([]);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        const products = res.data.products;

        const randomProducts = shuffleArray(products).slice(0, 3);

        setAllProducts(randomProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row px-20">
      <div className="flex flex-col p-10 bg-slate-100 w-full">
        <div className="text-center mb-10">
          <p className="text-4xl md:text-5xl">New Arrivals</p>
          <div className="italic text-xl mt-5">
            <p>Fresh designs just waiting to be your next favorite.</p>
            <p>Explore now and find your perfect fit!</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-14">
          {allProducts.map((product) => {
            return <ProductCard id={product._id} key={product._id} />;
          })}
        </div>
      </div>
    </div>
  );
}
