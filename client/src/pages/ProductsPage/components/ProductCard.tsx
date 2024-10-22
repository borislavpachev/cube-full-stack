import { getProduct } from '@/services/productService';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/buttons';
import { HeartIcon } from '../../../components/icons';
import toast, { LoaderIcon } from 'react-hot-toast';
import { ProductValue, Sizes } from '../../../components/product/types';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { priceFormatted } from '@/utils/helpers';
import { useFavorites, useCart } from '@/hooks';
import { ProductQuantity, SizeSelect } from '@/components/product';

type CardProps = {
  id: string;
};

export default function ProductCard({ id }: CardProps) {
  const [product, setProduct] = useState<ProductValue | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<Sizes>('M');
  const { isLiked, handleToggleFavorite } = useFavorites(id, selectedSize);
  const { addToCart } = useCart(id, selectedSize);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <LoaderIcon className="h-10 w-10" />;
  }

  return (
    <>
      <div className="max-w-xs flex flex-col rounded border-2">
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
          <p
            className="text-gray-500 line-clamp-1"
            title={product?.description}
          >
            {product?.description}
          </p>
          <div className="flex mt-3 justify-between">
            <p className="text-lg">${roundedPrice}</p>
            <SizeSelect size={selectedSize} setSize={setSelectedSize} />
          </div>

          <div className="mt-5">
            <ProductQuantity
              quantity={productQuantity as number}
              size={2}
              fontSize="text-xs"
            />
            <Button disabled={!productQuantity} onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
