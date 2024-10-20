import { useAuth } from '@/hooks';
import { logout } from '@/services/authService';
import toast from 'react-hot-toast';

export default function LogoutButton() {
  const { setUser, setIsAuthenticated } = useAuth();

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(
        'An unexpected error occurred during logout. Please try again!'
      );
    }
  };

  return (
    <button
      onClick={logoutUser}
      className="bg-black text-white py-1 px-3 rounded active:scale-90"
    >
      Logout
    </button>
  );
}
