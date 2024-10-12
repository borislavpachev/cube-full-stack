import { getProduct } from '@/services/productService';
import { useEffect, useState } from 'react';
import { Button } from '../buttons';
import { HeartIcon } from '../icons';

type CardProps = {
  id: string;
  size?: string;
};

export type ProductValue = {
  _id: string;
  category: string;
  color: string;
  description: string;
  gallery: string[];
  gender: string;
  name: string;
  price: number;
  quantity: [];
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
};

export default function ProductCard({ id, size }: CardProps) {
  const [product, setProduct] = useState<ProductValue | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    getProduct(id)
      .then((res) => {
        const item = res.data.product;

        setProduct(item);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      <div className="relative flex flex-col rounded border-2">
        <div
          className="absolute bg-white rounded-full right-0 m-1"
          onClick={() => {
            setIsLiked(!isLiked);
          }}
        >
          {!isLiked ? (
            <div className="p-1">
              <HeartIcon size={25} />
            </div>
          ) : (
            <div className="p-1">
              <HeartIcon size={25} fillColor="red" />
            </div>
          )}
        </div>
        <div>
          <img
            src="/images/Back.png"
            alt="product-cover"
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col text-center p-5">
          <h1 className="text-3xl">{product?.name}</h1>
          <p className="text-sm text-gray-500 line-clamp-1">
            {product?.description}
          </p>
          {size && <p className="mt-2">size: {size}</p>}
          <div className="flex items-center justify-center m-5">
            <Button onClick={() => {}}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </>
  );
}
