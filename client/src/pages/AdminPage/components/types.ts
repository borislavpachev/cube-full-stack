import { Quantity } from '@/components/product/types';

export type CreateProductForm = {
  name: string;
  description: string;
  price: number;
  gender: string;
  color: string;
  category: string;
};

export type CreateProductFormWithQuantity = CreateProductForm & {
  quantity: Quantity;
};

export type CreateUserForm = {
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'User';
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
};
