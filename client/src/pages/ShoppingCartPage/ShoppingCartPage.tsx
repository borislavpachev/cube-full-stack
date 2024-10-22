import { Button } from '@/components/buttons';
import { MainLayout, Section } from '@/components/layout';
import { ShoppingCartType } from '@/contexts/types';
import { getShoppingCart } from '@/services/cartService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, CartNav, CartTotal } from './components';
import toast from 'react-hot-toast';

export default function ShoppingCartPage() {
  const [cart, setCart] = useState<ShoppingCartType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getShoppingCart()
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
          return;
        }

        const fetchedCart = res.data.shoppingCart;
        setCart(fetchedCart);

        const price = fetchedCart.reduce(
          (total: number, item: ShoppingCartType) => {
            total += item.quantity * item.price;
            return total;
          },
          0
        );
        setTotalPrice(price);
      })
      .catch((error) => {
        setCart([]);
        console.log(error);
      });
  }, []);

  const deleteCartItem = (id: string, size: string) => {
    setCart((prevCart) => {
      return prevCart?.filter((item) => {
        return item._id !== id || (item._id === id && item.size !== size);
      });
    });
  };

  return (
    <MainLayout>
      <div className="w-full flex flex-col items-start justify-start p-0 md:p-10">
        <p className="text-3xl px-10">Shopping cart</p>
        <div className="w-full flex mt-5 items-center justify-center">
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
            <Section>
              <div className="flex flex-col md:flex-row gap-5 w-full">
                <div className="w-full">
                  <CartNav />
                  {cart.map((item, index) => {
                    return (
                      <CartItem
                        id={item._id}
                        quantity={item.quantity}
                        size={item.size}
                        key={index}
                        deleteCartItem={deleteCartItem}
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
