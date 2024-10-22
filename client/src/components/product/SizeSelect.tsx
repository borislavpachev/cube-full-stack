import { productSizes } from '@/constants';
import { Sizes } from './types';
import { Dispatch, SetStateAction } from 'react';

type SizeSelectProps = {
  size: Sizes;
  setSize: Dispatch<SetStateAction<Sizes>>;
  className?: string;
};

export default function SizeSelect({
  size,
  setSize,
  className,
}: SizeSelectProps) {
  const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSize(e.target.value as Sizes);
  };

  return (
    <select
      className={className}
      name="sizes"
      value={size}
      onChange={handleSize}
    >
      {productSizes.map((size, index) => {
        return (
          <option key={index} value={size}>
            {size}
          </option>
        );
      })}
    </select>
  );
}
