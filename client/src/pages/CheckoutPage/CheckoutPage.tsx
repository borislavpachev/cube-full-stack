import { CartNav, CartTotal } from '@/components';
import { Button } from '@/components/buttons';
import { MainLayout } from '@/components/layout';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddressCard, ItemCard } from './components';
import toast from 'react-hot-toast';
import { createOrder } from '@/services';
import { User } from '@/contexts/types';

export default function CheckoutPage() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.shoppingCart.length === 0) {
      navigate(ROUTES.SHOPPING_CART);
    }
  }, [navigate, user?.shoppingCart.length]);

  const placeOrder = async () => {
    try {
      const result = await createOrder();
      toast.success('Order created successfully');
      if (result) {
        setUser({ ...(user as User), shoppingCart: [] });
      }
      navigate(`${ROUTES.USER_PROFILE}`);
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  return (
    <MainLayout>
      <div className="w-full flex flex-col items-start justify-start p-0 md:p-10">
        <p className="text-3xl px-10">Checkout</p>
        <div className="flex flex-col md:flex-row w-full justify-between gap-5 mt-5">
          <div className="w-full flex flex-col">
            <AddressCard />
            <CartNav />
            {user &&
              user.shoppingCart.map((item) => {
                return (
                  <ItemCard
                    id={item._id}
                    quantity={item.quantity}
                    size={item.size}
                    key={`${item._id}-${item.size}`}
                  />
                );
              })}
          </div>

          <div className="w-full md:w-1/3">
            <CartTotal button={<Button onClick={placeOrder}>Pay</Button>} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
