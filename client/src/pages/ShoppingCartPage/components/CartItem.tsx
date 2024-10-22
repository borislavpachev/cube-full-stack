import { TrashIcon } from '@/components/icons';
import { CustomCounter } from '@/components/product';
import { ProductValue, Sizes } from '@/components/product/types';
import { ROUTES } from '@/constants';
import { useCart } from '@/hooks';
import { getProduct } from '@/services';
import { priceFormatted } from '@/utils/helpers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

type CartItemProps = {
  id: string;
  quantity: number;
  size: Sizes;
  deleteCartItem: (id: string, size: Sizes) => void;
};

export default function CartItem({
  id,
  quantity,
  size,
  deleteCartItem,
}: CartItemProps) {
  const [product, setProduct] = useState<ProductValue | null>(null);
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const { removeFromCart } = useCart(
    id,
    size,
    product?.price as number,
    quantity
  );

  const roundedPrice = priceFormatted(product?.price);
  const totalPrice =
    priceFormatted((product?.price as number) * itemQuantity) || 0;

  useEffect(() => {
    getProduct(id)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
          return;
        }
        const item = res.data.product;

        setProduct(item);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [id]);

  const handleDelete = async () => {
    await removeFromCart();
    deleteCartItem(id, size);
  };

  return (
    <div className="flex flex-col md:flex-row w-full px-0 md:px-5 py-5 items-center space-x-0 space-y-2 md:space-x-10 md:space-y-0 border-b">
      <NavLink to={`${ROUTES.PRODUCT}/${id}`}>
        <img
          src="/images/Back.png"
          alt="product-img"
          className="w-36 h-36 md:w-24 md:h-24 md:mr-2 rounded object-cover"
        />
      </NavLink>
      <div className="w-full flex flex-col md:w-1/6 md:mr-2 items-center md:items-start justify-center">
        <NavLink to={`${ROUTES.PRODUCT}/${id}`}>
          <p className="font-semibold line-clamp-1 text-xl">{product?.name}</p>
        </NavLink>
        <p>
          Size: <span className="font-semibold">{size}</span>
        </p>
      </div>
      <div className="w-full md:w-1/6 md:mr-2 flex justify-center font-semibold">
        ${roundedPrice}
      </div>
      <div className="w-1/2 md:w-1/6 md:mr-2 flex justify-center">
        <CustomCounter
          productQuantity={product?.quantity}
          quantity={itemQuantity}
          size={size}
          setQuantity={setItemQuantity}
        />
      </div>
      <div className="w-full flex md:w-1/6 md:mr-2 justify-center">
        <p className="font-semibold text-center">${totalPrice}</p>
      </div>
      <div
        onClick={handleDelete}
        className="cursor-pointer flex md:mr-2 justify-center"
      >
        <TrashIcon size={25} />
      </div>
    </div>
  );
}
