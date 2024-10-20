import { getProduct } from '@/services/productService';
import { useEffect, useState } from 'react';
import { Button } from '../buttons';
import { HeartIcon } from '../icons';
import toast, { LoaderIcon } from 'react-hot-toast';
import { FavoriteType } from '@/pages/ProfilePage/components/Favorites';
import { addFavorite, removeFavorite } from '@/services/favoriteService';
import { ProductValue } from './types';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { priceFormatted } from '@/utils/helpers';
import { useAuth } from '@/hooks';

type CardProps = {
  id: string;
  size?: string;
};

export default function ProductCard({ id, size }: CardProps) {
  const { user } = useAuth();
  const [product, setProduct] = useState<ProductValue | null>(null);

  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const roundedPrice = priceFormatted(product?.price);

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

  useEffect(() => {
    const existAsFavorite = user?.favorites?.some((fav: FavoriteType) => {
      return fav.productId === id;
    });

    setIsLiked(!!existAsFavorite);
  }, [user?.favorites, id]);

  const addProductToFavorites = async () => {
    try {
      const product = { _id: id, size: 'M' };
      const result = await addFavorite(product);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setIsLiked(true);
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  const removeProductFromFavorites = async () => {
    try {
      const product = { _id: id, size: 'M' };
      const result = await removeFavorite(product);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setIsLiked(false);
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  if (loading) {
    return <LoaderIcon className="h-10 w-10" />;
  }

  return (
    <>
      <div className="max-w-xs flex flex-col rounded border-2">
        <div className="relative">
          <div className="absolute bg-white cursor-pointer rounded-full right-0 m-1">
            {!isLiked ? (
              <div className="p-1" onClick={addProductToFavorites}>
                <HeartIcon size={25} />
              </div>
            ) : (
              <div className="p-1" onClick={removeProductFromFavorites}>
                <HeartIcon size={25} fillColor="red" />
              </div>
            )}
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
            {size && <p>size: {size}</p>}
          </div>
          <div className="mt-5">
            <Button onClick={() => {}}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </>
  );
}
