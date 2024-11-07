import { useTotalPrice } from '@/hooks';

type CartTotalProps = {
  button: JSX.Element;
};
export default function CartTotal({ button }: CartTotalProps) {
  const { totalPrice } = useTotalPrice();

  return (
    <div className="w-full p-4 space-y-10 rounded border">
      <h2 className="text-center font-semibold text-2xl">Checkout</h2>
      <div className="flex font-bold justify-between py-5 border-y-2">
        <p>Total Price:</p>
        <p>${totalPrice}</p>
      </div>

      {button}
    </div>
  );
}
