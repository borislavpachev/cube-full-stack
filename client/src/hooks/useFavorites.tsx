import { Sizes } from '@/components/product/types';
import useAuth from './useAuth';
import { addFavorite, removeFavorite } from '@/services';
import { FavoriteType, User } from '@/contexts/types';
import toast from 'react-hot-toast';

export default function useFavorites(id: string, selectedSize: Sizes) {
  const { user, setUser } = useAuth();
  const isLiked = user?.favorites.some(
    (favorite: FavoriteType) =>
      favorite.productId === id && favorite.productSize === selectedSize
  );

  const addProductToFavorites = async () => {
    try {
      const product = { _id: id, size: selectedSize };
      const result = await addFavorite(product);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      const updatedProduct = { productId: id, productSize: selectedSize };
      const updatedFavorites = [
        ...(user?.favorites as { productId: string; productSize: Sizes }[]),
        updatedProduct,
      ];
      setUser({
        ...(user as User),
        favorites: updatedFavorites,
      });
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  const removeProductFromFavorites = async () => {
    try {
      const product = { _id: id, size: selectedSize };
      const result = await removeFavorite(product);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      const updatedFavorites = user?.favorites.filter((item) => {
        if (item.productId !== id && item.productSize !== selectedSize) {
          return item;
        }
      }) as { productId: string; productSize: Sizes }[];

      setUser({ ...(user as User), favorites: updatedFavorites });
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  const handleToggleFavorite = async () => {
    if (isLiked) {
      await removeProductFromFavorites();
    } else {
      await addProductToFavorites();
    }
  };

  return { isLiked, handleToggleFavorite };
}
