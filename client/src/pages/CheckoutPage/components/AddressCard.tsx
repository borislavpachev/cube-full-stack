import { Button } from '@/components/buttons';
import { ROUTES } from '@/constants';
import { useAuth } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export default function AddressCard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full px-2 md:px-5 py-2 border-y">
      <p className="font-semibold text-center md:text-start text-xl my-5">Shipping Address</p>
      <div className="flex flex-col md:flex-row items-center justify-between mb-5">
        <div>
          <p className="font-semibold text-lg mb-1">{`${user?.firstName} ${user?.lastName}`}</p>
          <p>{`${user?.deliveryAddress.street}, ${user?.deliveryAddress.city}`}</p>
          {user?.deliveryAddress.additionalInfo && (
            <p>{`Additional info: ${user?.deliveryAddress.additionalInfo}`}</p>
          )}
        </div>
        <div className="mt-10 md:mt-0">
          <Button onClick={() => navigate(`${ROUTES.USER_PROFILE}/address`)}>Edit</Button>
        </div>
      </div>
    </div>
  );
}
