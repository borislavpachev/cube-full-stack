import { getProduct } from '@/services/productService';
import { useEffect, useState } from 'react';
import { Button } from './buttons';

type CardProps = {
  id: string;
  size: string;
};

type ProductValue = {
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

export default function Card({ id, size }: CardProps) {
  const [product, setProduct] = useState<ProductValue | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    getProduct(id).then((res) => {
      const item = res.data.product;

      setProduct(item);
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
            <img
              src="/images/heart.svg"
              alt="favorite"
              width={35}
              height={35}
              className="p-1"
            />
          ) : (
            <img
            src="/images/heart-red-2.svg"
            alt="favorite"
            width={35}
            height={35}
            className="p-1"
            style={{ fill: 'red' }}
          />
          )}
        </div>

        <img src="/images/Back.png" alt="product-cover" />
        <div className="flex flex-col text-center p-5">
          <h1 className="text-3xl">{product?.name}</h1>
          <p className="text-sm text-gray-400 line-clamp-1">
            {product?.description}
          </p>
          <p className="mt-2">size: {size}</p>
          <div className="flex items-center justify-center m-5">
            <Button disabled={false} onClick={() => {}}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
