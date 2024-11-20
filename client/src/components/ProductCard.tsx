import { getProduct } from '@/services/productService';
import { useEffect, useState } from 'react';
import { AddToCartButton } from './buttons';
import { HeartIcon } from './icons';
import toast from 'react-hot-toast';
import { ProductValue, Sizes } from './product/types';
import { NavLink } from 'react-router-dom';
import { productSizes, ROUTES } from '@/constants';
import { priceFormatted } from '@/utils/helpers';
import { useFavorites, useCart } from '@/hooks';
import { ProductQuantity } from '@/components/product';
import { Select } from '@/components/form';

type CardProps = {
  id: string;
};

export default function ProductCard({ id }: CardProps) {
  const [product, setProduct] = useState<ProductValue | null>(null);
  const [selectedSize, setSelectedSize] = useState<Sizes>('XS');
  const { isLiked, handleToggleFavorite } = useFavorites(id, selectedSize);
  const { addToCart } = useCart(id, selectedSize, product?.price as number);

  const roundedPrice = priceFormatted(product?.price);
  const productQuantity = product?.quantity[selectedSize];

  useEffect(() => {
    getProduct(id)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
          return;
        }
        const item = res.data.product;

        setProduct(item);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [id]);

  const handleAddToCart = async () => {
    await addToCart();
    const updatedCount = (product?.quantity[selectedSize] as number) - 1;
    const newQuantity = {
      ...product?.quantity,
      [selectedSize]: updatedCount,
    } as Record<Sizes, number>;

    setProduct({
      ...(product as ProductValue),
      quantity: newQuantity,
    });
  };

  const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value as Sizes);
  };

  return (
    <>
      <div className="max-w-xs flex flex-col break-words w-full rounded border-2">
        <div className="relative">
          <div className="absolute bg-white cursor-pointer rounded-full right-0 m-1">
            <div className="p-1" onClick={handleToggleFavorite}>
              {!isLiked ? (
                <HeartIcon size={25} />
              ) : (
                <HeartIcon size={25} fillColor="red" />
              )}
            </div>
          </div>
          <NavLink to={`${ROUTES.PRODUCT}/${id}`}>
            <img
              src="/images/Back.png"
              alt="product-cover"
              className="w-full h-full"
            />
          </NavLink>
        </div>
        <div className="flex flex-col cursor-default p-5 bg-white">
          <NavLink to={`${ROUTES.PRODUCT}/${id}`}>
            <h1 className="text-xl">{product?.name}</h1>
          </NavLink>
          <p className="text-gray-500 line-clamp-1">{product?.description}</p>
          <div className="flex mt-3 justify-between">
            <p className="text-lg">${roundedPrice}</p>
            <Select
              name="sizes"
              onChange={handleSize}
              options={productSizes}
              value={selectedSize}
              className="text-lg focus:outline-none"
            />
          </div>

          <div className="mt-5">
            <ProductQuantity
              quantity={productQuantity as number}
              size="small"
              fontSize="text-xs"
            />
            <AddToCartButton
              productQuantity={productQuantity as number}
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </>
  );
}
