import { useMemo } from 'react';
import useAuth from './useAuth';
import { ShoppingCartType } from '@/contexts/types';

export default function useTotalPrice() {
  
  const { user } = useAuth();
  const totalPrice = useMemo(() => {
    return user?.shoppingCart.reduce(
      (total: number, item: ShoppingCartType) => {
        total += item.quantity * item.price;
        return total;
      },
      0
    );
  }, [user?.shoppingCart]);

  return {totalPrice};
}
