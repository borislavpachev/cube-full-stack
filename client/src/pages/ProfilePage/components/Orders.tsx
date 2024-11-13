import { NoData } from '@/components';
import { Button } from '@/components/buttons';
import { Section } from '@/components/layout';
import { getMyOrders } from '@/services/orderService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type OrdersType = {
  _id: string;
  createdAt: Date;
  products: [];
  totalPrice: number;
  userId: string;
};

export default function Orders() {
  const [orders, setOrders] = useState<OrdersType[]>([]);
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
          {orders.map((order) => {
            return <p key={order._id}>{order._id}</p>;
          })}
        </Section>
      )}
    </>
  );
}
