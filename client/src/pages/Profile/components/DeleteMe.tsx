import { Button } from '@/components/buttons';
import Modal from '@/components/Modal';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/contexts/types';
import { deleteCurrentUser } from '@/services/userService';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function DeleteMe() {
  const { setUser, setIsAuthenticated } = useContext(
    AuthContext
  ) as AuthContextType;
  const navigate = useNavigate();

  const deleteUser = async () => {
    try {
      await deleteCurrentUser();
      toast.success('Your profile has been deleted successfully!');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(
        'An unexpected error occurred during sign up. Please try again!'
      );
    }
  };

  return (
    <div className="mt-10 bg-red-500">
      <Modal
        trigger={<Button>Delete my profile</Button>}
        title={
          <p className="text-center mt-5">
            Are you sure you want to delete your profile ?
          </p>
        }
        content={
          <div className="flex mx-10 mt-5 space-x-5">
            <Button onClick={deleteUser}>Yes</Button>
            <Button>No</Button>
          </div>
        }
      />
    </div>
  );
}
