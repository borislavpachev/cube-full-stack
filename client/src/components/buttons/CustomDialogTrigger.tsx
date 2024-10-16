import { type ReactNode } from 'react';
import { DialogTrigger } from '../ui/dialog';

type CustomDialogTriggerProps = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  children: ReactNode;
  onClick?: () => void;
};

export default function CustomDialogTrigger({
  type = 'button',
  onClick,
  children,
  ...props
}: CustomDialogTriggerProps) {
  return (
    <DialogTrigger
      type={type}
      onClick={onClick}
      {...props}
      className="w-full py-3 px-3 tracking-wider border-black border-2 rounded transition-colors ease-in duration-300
          hover:border-transparent hover:bg-black hover:text-white"
    >
      {children}
    </DialogTrigger>
  );
}
