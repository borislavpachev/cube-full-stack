import { User } from '@/contexts/types';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontalIcon } from 'lucide-react';
import { TableSortButton } from '@/components/buttons';

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {user.isBlocked ? (
                  <span
                    onClick={() => {
                      unBlockUserById(user._id);
                    }}
                  >
                    Unblock User
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      blockUserById(user._id);
                    }}
                  >
                    Block User
                  </span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteUserById(user._id)}>
                Delete User
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => switchUserRole(user._id, user.role)}
              >
                Switch User Role
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
