import { useAuth } from '@/hooks';
import Button from './Button';
import { debounceFn } from '@/utils/helpers';

type AddToCartButtonProps = {
  productQuantity: number;
  onClick: () => void;
};

export default function AddToCartButton({
  productQuantity,
  onClick,
}: AddToCartButtonProps) {
  const { isAuthenticated } = useAuth();

  const handleClick = debounceFn(onClick);

  return (
    <Button
      disabled={!productQuantity || !isAuthenticated}
      onClick={handleClick}
    >
      Add To Cart
    </Button>
  );
}
