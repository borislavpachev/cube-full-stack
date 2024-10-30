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
import { User } from '@/contexts/types';
import { useState } from 'react';
import DeleteUser from './DeleteUser';

type UserActionsProps = {
  user: User;
  unBlockUser: (id: string) => void;
  blockUser: (id: string) => void;
  deleteUser: (id: string) => void;
  switchUserRole: (id: string, role: 'Admin' | 'User') => void;
};
export default function UserActions({
  user,
  unBlockUser,
  blockUser,
  deleteUser,
  switchUserRole,
}: UserActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };
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
                unBlockUser(user._id);
              }}
            >
              Unblock User
            </span>
          ) : (
            <span
              onClick={() => {
                blockUser(user._id);
              }}
            >
              Block User
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchUserRole(user._id, user.role)}>
          Switch User Role
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleClick}>Delete User</DropdownMenuItem>
        <DeleteUser
          open={isOpen}
          setOpen={setIsOpen}
          id={user._id}
          deleteUser={deleteUser}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
