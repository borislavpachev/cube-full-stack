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
        <DropdownMenuItem onClick={handleClick}>
          Update Product
        </DropdownMenuItem>

        <UpdateProduct
          open={isOpen}
          setOpen={setIsOpen}
          product={product}
          setProducts={setProducts}
        />

        <DropdownMenuItem onClick={() => deleteProductById(product._id)}>
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
