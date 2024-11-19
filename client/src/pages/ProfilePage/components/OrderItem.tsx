import { CustomDialogTrigger } from '@/components/buttons';
import { OrderType } from './Orders';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { ItemCard } from '@/components';
import { Sizes } from '@/components/product/types';
import moment from 'moment';

type OrderItemProps = {
  order: OrderType;
};

type ProductItem = {
  _id: string;
  quantity: number;
  size: Sizes;
};

export default function OrderItem({ order }: OrderItemProps) {
  const formattedDate = moment(order.createdAt).format(
    'MMMM Do, YYYY h:mm'
  );

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
              Created at: <span className="font-semibold">{formattedDate}</span>
            </p>
          </div>

          <div>
            <span className="font-semibold">
              ${order.totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="rounded">
            <Dialog>
              <CustomDialogTrigger>
                <p className="flex items-center justify-center space-x-2">
                  <span>View Order</span>
                </p>
              </CustomDialogTrigger>
              <DialogContent className="w-full h-1/2 md:w-1/2 md:h-3/4 overflow-auto items-center justify-center">
                <DialogHeader>
                  <DialogTitle>
                    <p className="text-center text-xl mt-5">Order Details</p>
                  </DialogTitle>
                  <DialogDescription className="text-center text-gray-500 text-md">
                    <span className="text-gray-500 text-center">
                      List of products in your order
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <div>
                  {order.products.map((product) => {
                    const typedProduct = product as ProductItem;
                    return (
                      <ItemCard
                        key={typedProduct._id}
                        id={typedProduct._id}
                        quantity={typedProduct.quantity}
                        size={typedProduct.size}
                      />
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
