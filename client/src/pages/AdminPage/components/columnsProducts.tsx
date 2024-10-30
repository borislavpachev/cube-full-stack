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
import { ProductValue, Quantity, Sizes } from '@/components/product/types';
import UpdateProduct from './UpdateProduct';
import { type Dispatch, type SetStateAction } from 'react';

export const createProductColumns = (
  deleteProductById: (id: string) => void,
  setProducts: Dispatch<SetStateAction<[] | ProductValue[]>>
): ColumnDef<ProductValue>[] => {
  return [
    {
      header: 'Cover',
      cell: () => {
        return (
          <div className="flex items-center justify-center">
            <img
              src="/images/Back.png"
              alt="product-cover"
              className="w-[150px] h-[150px] rounded object-cover"
            />
          </div>
        );
      },
    },
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
      accessorKey: 'quantity',
      cell: ({ getValue }) => {
        const quantity = getValue() as Quantity;
        return (
          <div>
            {Object.keys(quantity).map((size, index) => (
              <div key={index}>
                {size}: {quantity[size as Sizes]}
              </div>
            ))}
          </div>
        );
      },
      header: 'Quantity',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const product = row.original;

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

              <DropdownMenuItem onClick={(e) => e.preventDefault()}>
                <UpdateProduct product={product} setProducts={setProducts} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="p-3"
                onClick={() => deleteProductById(product._id)}
              >
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
