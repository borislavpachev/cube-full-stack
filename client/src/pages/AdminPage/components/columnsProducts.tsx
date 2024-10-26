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
import { ProductValue } from '@/components/product/types';

export const createProductColumns = (): ColumnDef<ProductValue>[] => {
  return [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <TableSortButton
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
          </TableSortButton>
        );
      },
    },
    {
      accessorKey: 'category',
      header: ({ column }) => {
        return (
          <TableSortButton
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Category
          </TableSortButton>
        );
      },
    },
    {
      accessorKey: 'price',
      header: ({ column }) => {
        return (
          <TableSortButton
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Price
          </TableSortButton>
        );
      },
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => {
        return (
          <TableSortButton
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Gender
          </TableSortButton>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const product = row.original;
        console.log(product);

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
              <DropdownMenuItem>1</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
