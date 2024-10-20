import { Button, CustomDialogTrigger } from '@/components/buttons';
import { TrashIcon } from '@/components/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks';
import { deleteCurrentUser } from '@/services/userService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function DeleteMe() {
  const { setUser, setIsAuthenticated } = useAuth();
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
    <div className="rounded">
      <Dialog>
        <CustomDialogTrigger>
          <p className="flex items-center justify-center space-x-2">
            <span>Delete profile</span>{' '}
            <TrashIcon size={25} fillColor="red" />
          </p>
        </CustomDialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {' '}
              <p className="text-center mt-5">
                Are you sure you want to delete your profile ?
              </p>
            </DialogTitle>
            <DialogDescription className="text-center text-gray-500 text-md">
              <span className="text-gray-500 text-center">
                This action is irreversible !
              </span>
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="flex mx-10 mt-5 space-x-5">
              <Button onClick={deleteUser}>Yes</Button>
              <CustomDialogTrigger>
                <span>No</span>
              </CustomDialogTrigger>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
