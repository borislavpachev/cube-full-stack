import { useAuth } from '@/hooks';
import Button from './Button';
import debounce from 'lodash.debounce';

type AddToCartButtonProps = {
  productQuantity: number;
  onClick: () => void;
};

export default function AddToCartButton({
  productQuantity,
  onClick,
}: AddToCartButtonProps) {
  const { isAuthenticated } = useAuth();

  const handleClick = debounce(
    () => {
      onClick();
    },
    1500,
    { leading: true, trailing: false }
  );

  return (
    <Button
      disabled={!productQuantity || !isAuthenticated}
      onClick={handleClick}
    >
      Add To Cart
    </Button>
  );
}
