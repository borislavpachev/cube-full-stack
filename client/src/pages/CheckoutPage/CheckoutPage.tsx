import { CartTotal } from '@/components';
import { Button } from '@/components/buttons';
import { MainLayout } from '@/components/layout';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddressCard from './AddressCard';

export default function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.shoppingCart.length === 0) {
      navigate(ROUTES.SHOPPING_CART);
    }
  }, [navigate, user?.shoppingCart.length]);

  return (
    <MainLayout>
      <div className="w-full flex flex-col items-start justify-start p-0 md:p-10">
        <p className="text-3xl px-10">Checkout</p>
        <div className="flex flex-col md:flex-row w-full justify-between gap-5 mt-5">
          <div className="w-full flex flex-col">
            <AddressCard />
          </div>

          <div className="w-full md:w-1/3">
            <CartTotal button={<Button>Pay</Button>} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
