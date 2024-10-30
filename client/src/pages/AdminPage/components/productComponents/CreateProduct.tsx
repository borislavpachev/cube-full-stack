import { CustomDialogTrigger } from '@/components/buttons';
import {
  Form,
  FormInnerWrapper,
  Input,
  Label,
  Textarea,
} from '@/components/form';
import { ProductValue, Quantity, Sizes } from '@/components/product/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { productCategories, productSizes } from '@/constants';
import { useForm } from '@/hooks';
import { createNewProduct } from '@/services';
import { validateProductDescription, validateText } from '@/utils/validations';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CreateProductForm } from '../types';

type CreateProductProps = {
  setProducts: React.Dispatch<React.SetStateAction<ProductValue[]>>;
};

export default function CreateProduct({ setProducts }: CreateProductProps) {
  const [form, updateForm, clearForm] = useForm<CreateProductForm>({
    name: '',
    description: '',
    price: 0,
    gender: 'Women',
    color: 'White',
    category: 'Maths',
  });
  const [quantity, setQuantity] = useState<Quantity>({
    XS: 0,
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
    XXL: 0,
  });

  const updateQuantity =
    (prop: Sizes) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity({ ...quantity, [prop]: e.target.value });
    };

  const createProduct = async () => {
    const { name, description, price, gender, category } = form;
    const { XS, S, M, L, XL, XXL } = quantity;

    if (!validateText(name)) {
      toast.error('Product must have a name!');
      return;
    }
    if (!validateProductDescription(description)) {
      toast.error('Product description must be between 10 - 200 characters !');
      return;
    }
    if (!price) {
      toast.error('Product must have a price!');
      return;
    }
    if (!gender) {
      toast.error('Product must have gender!');
      return;
    }
    if (!category) {
      toast.error('Product must have a category!');
      return;
    }
    if (!XS || !S || !M || !L || !XL || !XXL) {
      toast.error('Product quantity can not be empty!');
      return;
    }

    try {
      const newProduct = { ...form, quantity };
      const result = await createNewProduct(newProduct);
      if (result.error) {
        toast.error(result.error);
        return;
      }

      const createdProduct = result.data.product;
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
      clearForm();
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  return (
    <div>
      <Dialog>
        <CustomDialogTrigger>
          <span>Create Product</span>
        </CustomDialogTrigger>
        <DialogContent className="h-screen max-w-2xl overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold mb-1">
              Create New Cube
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Please enter details
            </DialogDescription>
          </DialogHeader>
          <FormInnerWrapper size="w-full">
            <Form>
              <div className="flex gap-2">
                <div className="flex flex-col w-full">
                  <Label htmlFor="new-product-name">Product name</Label>
                  <Input
                    id="new-product-name"
                    name="new-product-name"
                    placeholder="Product name"
                    value={form.name}
                    onChange={updateForm('name')}
                  />
                </div>
                <div className="flex space-x-1 items-center w-full">
                  <div className="flex flex-col w-full">
                    <Label htmlFor="new-product-price">Price</Label>
                    <Input
                      id="new-product-price"
                      name="new-product-price"
                      type="number"
                      placeholder="20$"
                      value={form.price}
                      onChange={updateForm('price')}
                    />
                  </div>
                </div>
              </div>

              <Label htmlFor="new-product-description">Description</Label>
              <Textarea
                id="new-product-description"
                name="new-product-description"
                value={form.description}
                onChange={updateForm('description')}
              />

              <div className="flex gap-2 mb-5">
                <div className="flex flex-col w-full">
                  <Label htmlFor="new-product-category">Category</Label>
                  <select
                    id="new-product-category"
                    name="new-product-category"
                    className="text-lg w-full border border-black rounded focus:outline-black p-3"
                    onChange={updateForm('category')}
                  >
                    {productCategories.map((category, index) => {
                      return (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <Label htmlFor="new-product-gender">Gender</Label>
                  <select
                    id="new-product-gender"
                    name="new-product-gender"
                    className="text-lg w-full border border-black rounded focus:outline-black p-3"
                    onChange={updateForm('gender')}
                  >
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 mb-5 text-center">
                {productSizes.map((size: string, index) => {
                  return (
                    <div key={index} className="flex flex-col w-full">
                      <Label htmlFor={`new-product-size-${size}`}>{size}</Label>
                      <Input
                        id={`new-product-size-${size}`}
                        name={`new-product-size-${size}`}
                        type="number"
                        placeholder="100"
                        value={quantity[size as Sizes]}
                        onChange={updateQuantity(size as Sizes)}
                      />
                    </div>
                  );
                })}
              </div>

              <Label htmlFor="new-product-color">Color:</Label>
              <Input
                id="new-product-color"
                name="new-product-color"
                placeholder="White"
                value={form.color}
                onChange={updateForm('color')}
              />
              <CustomDialogTrigger type="submit" onClick={createProduct}>
                Create Cube
              </CustomDialogTrigger>
            </Form>
          </FormInnerWrapper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
