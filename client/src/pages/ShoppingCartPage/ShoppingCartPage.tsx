import { Button } from '@/components/buttons';
import { MainLayout, Section } from '@/components/layout';
import { ShoppingCartType } from '@/contexts/types';
import { getShoppingCart } from '@/services/cartService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ShoppingCartPage() {
  const [cart, setCart] = useState<ShoppingCartType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getShoppingCart()
      .then((res) => {
        console.log(res);
        
        const fetchedCart = res.data.shoppingCart;
        setCart(fetchedCart);
      })
      .catch((error) => {
        setCart([]);
        console.log(error);
      });
  }, []);

  return (
    <MainLayout>
      <div className="w-full flex flex-col items-start justify-start px-20 py-10">
        <p className="text-3xl">Shopping cart</p>
        <div className="w-full mt-10 items-center justify-center">
          {!cart.length ? (
            <Section>
              <p className="text-center text-xl flex items-center">
                You don't have items in your shopping cart yet.
              </p>
              <p className="text-center text-sm text-gray-500 mt-2">
                Check our deals and feel free to add anything you like.
              </p>
              <div className="mt-12">
                <Button
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Continue shopping
                </Button>
              </div>
            </Section>
          ) : (
            <Section>yes</Section>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
