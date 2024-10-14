import { getProduct } from '@/services/productService';
import { useEffect, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { removeFavorite } from '@/services/favoriteService';
import { Button } from '@/components/buttons';
import { TrashIcon } from '@/components/icons';

type CardProps = {
  id: string;
  size?: string;
  liked: boolean;
  deleteFavorite: (id: string) => void;
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

export default function FavoriteCard({ id, size, deleteFavorite }: CardProps) {
  const [product, setProduct] = useState<ProductValue | null>(null);
  const [loading, setLoading] = useState(true);

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

  const removeProductFromFavorites = async () => {
    try {
      const product = { _id: id, size: 'M' };
      const result = await removeFavorite(product);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      deleteFavorite(id);
    } catch (error) {
      console.error(error);
      toast.error(
        'An unexpected error occurred during delete. Please try again!'
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
          <div className="absolute bg-white rounded-full right-0 m-1">
            <div className="p-1 cursor-pointer" onClick={removeProductFromFavorites}>
              <TrashIcon size={25} fillColor='red'/>
            </div>
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
