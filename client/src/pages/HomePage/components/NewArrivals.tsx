import { useEffect, useState } from 'react';
import { getAllProducts } from '@/services/productService';
import { ProductCard } from '@/components/productComponents';
import { ProductValue } from '@/components/productComponents/ProductCard';

export default function NewArrivals() {
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

  return (
    <div className="flex flex-col md:flex-row p-10">
      <div className="flex flex-col p-10 bg-slate-100 w-full">
        <div className="text-center mb-10">
          <p className="text-4xl md:text-5xl">New Arrivals</p>
          <div className="italic text-xl mt-5">
            <p>Fresh designs just waiting to be your next favorite.</p>
            <p>Explore now and find your perfect fit!</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-5">
          {allProducts.map((product, index) => {
            return (
              <div key={index} className="w-[300px]">
                <ProductCard id={product._id} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
