import { Section } from '@/components/layout';
import { User } from '@/contexts/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createUserColumns } from './columnsUsers';
import {
  getAllUsers,
  blockUser,
  deleteUser,
  unBlockUser,
  updateUser,
} from '@/services';
import DataTableUsers from './DataTableUsers';
import { Loading } from '@/components';

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
      toast.error('An unexpected error occurred. Please try again!');
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
      toast.error('An unexpected error occurred. Please try again!');
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
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  const switchUserRole = async (id: string, role: 'Admin' | 'User') => {
    const newRole = role === 'User' ? 'Admin' : 'User';

    try {
      const result = await updateUser(id, newRole);

      if (result.error) {
        toast.error(result.error);
        return;
      }
      const updatedUsers = users.map((user) => {
        return user._id === id ? { ...user, role: newRole } : user;
      });

      setUsers(updatedUsers as User[]);
      toast.success('User role updated successfully !');
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  const columns = createUserColumns(
    switchUserRole,
    deleteUserById,
    unBlockUserById,
    blockUserById
  );

  if (loading) {
    return <Loading top={false} />;
  }

  return (
    <Section>
      <DataTableUsers columns={columns} data={users} setUsers={setUsers} />
    </Section>
  );
}
