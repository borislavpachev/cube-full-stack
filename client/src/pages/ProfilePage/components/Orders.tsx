import { NoData } from '@/components';
import { Button } from '@/components/buttons';
import { Section } from '@/components/layout';
import { getMyOrders } from '@/services/orderService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderItem from './OrderItem';

export type OrderType = {
  _id: string;
  createdAt: Date;
  products: [];
  totalPrice: number;
  userId: string;
  status: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyOrders()
      .then((res) => {
        const fetchedOrders = res.data.orders;

        setOrders(fetchedOrders);
      })
      .catch((error) => {
        setOrders([]);
        console.log(error);
      });
  }, []);

  return (
    <>
      {!orders.length ? (
        <NoData
          main={`You haven't ordered yet.`}
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
          <div className="flex flex-col w-full">
            {orders.map((order) => {
              return <OrderItem key={order._id} order={order} />;
            })}
          </div>
        </Section>
      )}
    </>
  );
}
