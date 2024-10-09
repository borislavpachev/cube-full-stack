import { Button } from '@/components/buttons';
import { MainLayout } from '@/components/layout';
import { ROUTES } from '@/constants';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex md:w-3/4 flex-col items-start justify-start m-5">
        <div className="flex w-full items-center justify-center space-x-2 bg-white rounded p-2">
          <Button onClick={() => navigate(`${ROUTES.USER_PROFILE}/orders`)}>
            Orders
          </Button>
          <Button onClick={() => navigate(`${ROUTES.USER_PROFILE}/details`)}>
            Profile
          </Button>
          <Button onClick={() => {}}>Address</Button>
          <Button onClick={() => navigate(`${ROUTES.USER_PROFILE}/security`)}>
            Security
          </Button>
        </div>
        <div className="min-w-full mt-5">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}
