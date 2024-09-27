import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Button } from '../../components/buttons';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row h-screen items-center justify-center">
      <img
        src="/images/404_error_page.png"
        alt="404 Error Image"
        className="w-[300px] h-auto"
      />
      <div className="flex flex-col items-center justify-center space-y-10 p-10">
        <p className="text-2xl text-center">This page could not be found.</p>
        <Button onClick={() => navigate(ROUTES.HOME)}>Home page</Button>
      </div>
    </div>
  );
}
