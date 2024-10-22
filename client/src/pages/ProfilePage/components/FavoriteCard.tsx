import { useEffect, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import { Button } from '@/components/buttons';
import { TrashIcon } from '@/components/icons';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { priceFormatted } from '@/utils/helpers';
import { ProductValue, Sizes } from '@/components/product/types';
import { useAuth, useCart } from '@/hooks';
import { User } from '@/contexts/types';
import { ProductQuantity } from '@/components/product';
import { getProduct, removeFavorite } from '@/services';

type CardProps = {
  id: string;
  size: Sizes;
  deleteFavorite: (id: string, size: Sizes) => void;
};

export default function FavoriteCard({ id, size, deleteFavorite }: CardProps) {
  const { user, setUser } = useAuth();
  const [product, setProduct] = useState<ProductValue | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(id, size);

  const roundedPrice = priceFormatted(product?.price);
  const productQuantity = product?.quantity[size];

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
      const product = { _id: id, size: size };
      const result = await removeFavorite(product);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      deleteFavorite(id, size);
      const updatedFavorites = user?.favorites.filter((item) => {
        if (item.productId !== id && item.productSize !== size) {
          return item;
        }
      }) as { productId: string; productSize: Sizes }[];
      setUser({ ...(user as User), favorites: updatedFavorites });
    } catch (error) {
      console.error(error);
      toast.error(
        'An unexpected error occurred during delete. Please try again!'
      );
    }
  };

  const handleAddToCart = async () => {
    await addToCart();
    const updatedCount = (product?.quantity[size] as number) - 1;
    const newQuantity = {
      ...product?.quantity,
      [size]: updatedCount,
    } as Record<Sizes, number>;

    setProduct({
      ...(product as ProductValue),
      quantity: newQuantity,
    });
  };

  if (loading) {
    return <LoaderIcon className="h-10 w-10" />;
  }

  return (
    <>
      <div className="max-w-xs flex flex-col rounded border-2">
        <div className="relative">
          <div className="absolute bg-white rounded-full right-0 m-1">
            <div
              className="p-1 cursor-pointer"
              onClick={removeProductFromFavorites}
            >
              <TrashIcon size={25} fillColor="red" />
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
        <div className="flex flex-col cursor-default p-5">
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
            <ProductQuantity
              quantity={productQuantity as number}
              size="small"
              fontSize="text-xs"
            />
            <Button disabled={!productQuantity} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
