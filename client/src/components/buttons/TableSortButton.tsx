import { ArrowUpDown } from 'lucide-react';
import { type ReactNode } from 'react';
import { Button } from '../ui/button';

type TableSortButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

export default function TableSortButton({
  onClick,
  children,
  ...props
}: TableSortButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="w-full rounded hover:bg-white"
      variant="ghost"
      {...props}
    >
      {children}
      <ArrowUpDown className="ml-2 h-5 w-5" />
    </Button>
  );
}
