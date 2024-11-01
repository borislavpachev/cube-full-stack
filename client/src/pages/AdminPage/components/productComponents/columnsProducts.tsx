import { ColumnDef } from '@tanstack/react-table';
import { TableSortButton } from '@/components/buttons';
import { ProductValue, Quantity, Sizes } from '@/components/product/types';
import { type Dispatch, type SetStateAction } from 'react';
import ProductActions from './ProductActions';

export const createProductColumns = (
  deleteProductById: (id: string) => void,
  setProducts: Dispatch<SetStateAction<[] | ProductValue[]>>
): ColumnDef<ProductValue>[] => {
  return [
    {
      header: 'Cover',
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center justify-center">
            <img
              src={product.backCover}
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
          <ProductActions
            product={product}
            setProducts={setProducts}
            deleteProductById={deleteProductById}
          />
        );
      },
    },
  ];
};
