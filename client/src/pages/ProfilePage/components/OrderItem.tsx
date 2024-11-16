import { Button } from '@/components/buttons';
import { OrderType } from './Orders';

type OrderItemProps = {
  order: OrderType;
};

export default function OrderItem({ order }: OrderItemProps) {
  return (
    <div
      key={order._id}
      className="flex flex-col md:flex-row items-center justify-between border-b gap-2 py-8"
    >
      <div className="w-28 h-28">
        <img src="/images/icons/cube-favicon.svg" alt="Cube shape" />
      </div>

      <div className="flex flex-col w-full gap-5">
        <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row justify-between">
          <p className="font-semibold md:mb-5 line-clamp-1">#{order._id}</p>
          <p>
            {order.status === 'In Progress' ? (
              <span className="bg-yellow-200 text-yellow-900 p-2 rounded">
                {order.status}
              </span>
            ) : (
              <span className="bg-green-200 text-green-900 p-2 rounded">
                {order.status}
              </span>
            )}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-5 space-y-5 md:space-y-0 items-start md:items-center justify-between">
          <div>
            <p>
              Items:{' '}
              <span className="font-semibold">{order.products.length}</span>
            </p>
            <p>
              Created at:{' '}
              <span className="font-semibold">
                {order.createdAt.toString()}
              </span>
            </p>
          </div>

          <div>
            <span className="font-semibold">
              ${order.totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col items-center gap-5">
            <Button>View Order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
