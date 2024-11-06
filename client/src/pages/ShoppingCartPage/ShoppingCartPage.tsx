import { Button } from '@/components/buttons';
import { MainLayout, Section } from '@/components/layout';
import { useNavigate } from 'react-router-dom';
import { CartItem, CartNav, CartTotal } from './components';
import { useAuth } from '@/hooks';
import { useEffect, useState } from 'react';
import { ShoppingCartType } from '@/contexts/types';
import { NoData } from '@/components';

export default function ShoppingCartPage() {
  const { user } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const price = user?.shoppingCart.reduce(
      (total: number, item: ShoppingCartType) => {
        total += item.quantity * item.price;
        return total;
      },
      0
    );
    setTotalPrice(price as number);
  }, [user?.shoppingCart]);

  return (
    <MainLayout>
      <div className="w-full flex flex-col items-start justify-start p-0 md:p-10">
        <p className="text-3xl px-10">Shopping cart</p>
        <div className="w-full flex mt-5 items-center justify-center">
          {!user?.shoppingCart.length ? (
            <NoData
              main={`You don't have items in your shopping cart yet.`}
              secondary="Check our deals and feel free to add anything you like."
              button={
                <Button
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Continue shopping
                </Button>
              }
            />
          ) : (
            <Section>
              <div className="flex flex-col md:flex-row gap-5 w-full">
                <div className="w-full">
                  <CartNav />
                  {user.shoppingCart.map((item) => {
                    return (
                      <CartItem
                        id={item._id}
                        quantity={item.quantity}
                        size={item.size}
                        key={`${item._id}-${item.size}`}
                      />
                    );
                  })}
                </div>
                <div className="my-10 md:my-16 w-full md:w-1/3">
                  <CartTotal totalPrice={totalPrice} />
                </div>
              </div>
            </Section>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
