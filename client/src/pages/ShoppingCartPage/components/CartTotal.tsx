import { Button } from '@/components/buttons';

type CartTotalProps = {
  totalPrice: number;
};

export default function CartTotal({ totalPrice }: CartTotalProps) {
  return (
    <div className="w-full p-4 space-y-10 rounded border">
      <h2 className="text-center font-semibold text-2xl">Checkout</h2>
      <div className="flex font-bold justify-between py-5 border-y-2">
        <p>Total Price:</p>
        <p>${totalPrice}</p>
      </div>

      <Button>Proceed to Checkout</Button>
    </div>
  );
}
