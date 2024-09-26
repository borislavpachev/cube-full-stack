import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

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
        <button
          className="py-3 px-3 border-black border-2 rounded transition-colors ease-in duration-300
          hover:border-transparent hover:bg-black hover:text-white"
          onClick={() => navigate(ROUTES.HOME)}
        >
          Home page
        </button>
      </div>
    </div>
  );
}
