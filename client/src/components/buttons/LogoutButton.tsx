import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/contexts/types';
import { logout } from '@/services/authService';
import { useContext } from 'react';
import toast from 'react-hot-toast';

export default function LogoutButton() {
  const { setUser, setIsAuthenticated } = useContext(
    AuthContext
  ) as AuthContextType;

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      setIsAuthenticated(false);
      console.log('test');
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
