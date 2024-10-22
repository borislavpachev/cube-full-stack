import { Section } from '@/components/layout';
import { User } from '@/contexts/types';
import { useEffect, useState } from 'react';
import toast, { LoaderIcon } from 'react-hot-toast';
import DataTable from './DataTable';
import { createColumns } from './columns';
import { getAllUsers, blockUser, deleteUser, unBlockUser } from '@/services';

export default function UsersPanel() {
  const [users, setUsers] = useState<User[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
          return;
        }
        const allUsers = res.data.users;
        setUsers(allUsers);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteUserById = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success('User deleted successfully !');
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
      toast.error(
        'An unexpected error occurred during sign up. Please try again!'
      );
    }
  };

  const unBlockUserById = async (id: string) => {
    try {
      await unBlockUser(id);
      toast.success('User is unblocked successfully !');
      const updatedUsers = users.map((user) =>
        user._id === id ? { ...user, isBlocked: false } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
      toast.error(
        'An unexpected error occurred during sign up. Please try again!'
      );
    }
  };

  const blockUserById = async (id: string) => {
    try {
      await blockUser(id);
      toast.success('User is blocked successfully !');
      const updatedUsers = users.map((user) =>
        user._id === id ? { ...user, isBlocked: true } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
      toast.error(
        'An unexpected error occurred during sign up. Please try again!'
      );
    }
  };

  const columns = createColumns(deleteUserById, unBlockUserById, blockUserById);

  return (
    <Section>
      {loading && <LoaderIcon className="w-32 h-32" />}
      <DataTable columns={columns} data={users} setUsers={setUsers} />
    </Section>
  );
}
