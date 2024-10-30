import { User } from '@/contexts/types';
import { ColumnDef } from '@tanstack/react-table';
import { TableSortButton } from '@/components/buttons';
import UserActions from './UserActions';

export const createUserColumns = (
  switchUserRole: (id: string, role: 'Admin' | 'User') => void,
  deleteUserById: (id: string) => void,
  unBlockUserById: (id: string) => void,
  blockUserById: (id: string) => void
): ColumnDef<User>[] => {
  return [
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <TableSortButton
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
          </TableSortButton>
        );
      },
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => {
        return (
          <TableSortButton
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            First name
          </TableSortButton>
        );
      },
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => {
        return (
          <TableSortButton
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Last name
          </TableSortButton>
        );
      },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => {
        return (
          <TableSortButton
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Role
          </TableSortButton>
        );
      },
    },
    {
      accessorKey: 'isBlocked',
      header: ({ column }) => {
        return (
          <TableSortButton
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Blocked
          </TableSortButton>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;

        return (
          <UserActions
            user={user}
            unBlockUser={unBlockUserById}
            blockUser={blockUserById}
            deleteUser={deleteUserById}
            switchUserRole={switchUserRole}
          />
        );
      },
    },
  ];
};
