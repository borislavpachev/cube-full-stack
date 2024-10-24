import { Button } from '@/components/buttons';
import { Section } from '@/components/layout';
import { getMyOrders } from '@/services/orderService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
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
        <Section>
          <p className="text-center text-xl flex items-center">
            You haven't ordered yet.
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
          {orders.map((order, index) => {
            return <p key={index}>{order}</p>;
          })}
        </Section>
      )}
    </>
  );
}
