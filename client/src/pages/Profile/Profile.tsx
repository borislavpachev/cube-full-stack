import { Button } from '@/components/buttons';
import { MainLayout } from '@/components/layout';
import { ROUTES } from '@/constants';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="flex flex-col md:w-3/4 items-center justify-start m-5">
        <div className="max-w-5xl flex w-full items-center justify-center space-x-2 bg-white rounded p-2">
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
        <div className="max-w-5xl w-full flex flex-col items-center justify-center mt-5">
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}
