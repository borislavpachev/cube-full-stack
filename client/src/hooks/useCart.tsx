import { Sizes } from '@/components/product/types';
import { addToShoppingCart, removeFromShoppingCart } from '@/services';
import toast from 'react-hot-toast';
import useAuth from './useAuth';
import { User } from '@/contexts/types';

export default function useCart(
  id: string,
  size: Sizes,
  price: number,
  quantity: number = 1
) {
  const { user, setUser } = useAuth();

  const addToCart = async () => {
    try {
      const productToAdd = {
        _id: id,
        quantity: quantity,
        size: size,
        price: price,
      };
      const result = await addToShoppingCart(productToAdd);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      const updatedCart = result.data.shoppingCart;
      setUser({ ...(user as User), shoppingCart: updatedCart });

      toast.success('Product added to shopping cart');
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  const removeFromCart = async () => {
    try {
      const productToRemove = {
        _id: id,
        quantity: quantity,
        size: size,
        price: price,
      };
      const result = await removeFromShoppingCart(productToRemove);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      const updatedCart = result.data.shoppingCart;
      setUser({ ...(user as User), shoppingCart: updatedCart });

      toast.success('Product removed from shopping cart');
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  return { addToCart, removeFromCart };
}
