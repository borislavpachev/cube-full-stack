import { getProduct } from '@/services/productService';
import { useContext, useEffect, useState } from 'react';
import { Button } from '../buttons';
import { HeartIcon } from '../icons';
import toast, { LoaderIcon } from 'react-hot-toast';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/contexts/types';
import { FavoriteType } from '@/pages/Profile/components/Favorites';
import { addFavorite, removeFavorite } from '@/services/favoriteService';

type CardProps = {
  id: string;
  size?: string;
  liked: boolean;
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
  const { user } = useContext(AuthContext) as AuthContextType;
  const [product, setProduct] = useState<ProductValue | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
          return;
        }
        const item = res.data.product;

        user?.favorites.some((fav: FavoriteType) =>
          setIsLiked(fav.productId === item._id)
        );

        setProduct(item);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

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
      toast.error(
        'An unexpected error occurred during sign up. Please try again!'
      );
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
      toast.error(
        'An unexpected error occurred during sign up. Please try again!'
      );
    }
  };

  if (loading) {
    return <LoaderIcon className="h-10 w-10" />;
  }

  return (
    <>
      <div className="flex flex-col rounded border-2">
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
          <img
            src="/images/Back.png"
            alt="product-cover"
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col cursor-default p-5">
          <h1 className="text-xl">{product?.name}</h1>
          <p
            className="text-gray-500 text-ellipsis text-nowrap overflow-hidden"
            title={product?.description}
          >
            {product?.description}
          </p>
          <div className="flex mt-3 justify-between">
            <p className="text-lg">${product?.price}</p>
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
