import { Dispatch, type SetStateAction } from 'react';
import { Sizes } from './productComponents/types';

type CustomCounterProps = {
  productQuantity: Record<Sizes, number> | undefined;
  size: Sizes;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

export default function CustomCounter({
  productQuantity,
  size,
  quantity,
  setQuantity,
}: CustomCounterProps) {
  const increase = () => {
    setQuantity((prevValue: number) => {
      if (productQuantity && prevValue >= productQuantity[size]) {
        return prevValue;
      }
      return prevValue + 1;
    });
  };

  const decrease = () => {
    setQuantity((prevValue: number) => {
      if (prevValue <= 0) {
        return 0;
      }
      return prevValue - 1;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && productQuantity) {
      if (value > productQuantity[size]) {
        setQuantity(productQuantity[size]);
      } else {
        setQuantity(value);
      }
    }
  };

  return (
    <div className="flex w-1/2 text-2xl items-center justify-around rounded border-2 border-black">
      <button className="p-2" onClick={decrease}>
        -
      </button>
      <input
        className="outline-none text-center w-full"
        id="product-quantity"
        value={quantity}
        onChange={handleChange}
      />
      <button className="p-2" onClick={increase}>
        +
      </button>
    </div>
  );
}
