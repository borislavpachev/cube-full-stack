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
import UpdateProduct from './UpdateProduct';
import React, { useState } from 'react';
import { ProductValue } from '@/components/product/types';
import DeleteProduct from './DeleteProduct';

type ProductActionsProps = {
  product: ProductValue;
  setProducts: React.Dispatch<React.SetStateAction<ProductValue[]>>;
  deleteProductById: (id: string) => void;
};

export default function ProductActions({
  product,
  setProducts,
  deleteProductById,
}: ProductActionsProps) {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleClickUpdate = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOpenUpdate(true);
  };

  const handleClickDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOpenDelete(true);
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
        <DropdownMenuItem onClick={handleClickUpdate}>
          Update Product
        </DropdownMenuItem>

        <UpdateProduct
          open={isOpenUpdate}
          setOpen={setIsOpenUpdate}
          product={product}
          setProducts={setProducts}
        />

        <DropdownMenuItem onClick={handleClickDelete}>
          Delete Product
        </DropdownMenuItem>
        <DeleteProduct
          open={isOpenDelete}
          setOpen={setIsOpenDelete}
          id={product._id as string}
          deleteProductById={deleteProductById}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
