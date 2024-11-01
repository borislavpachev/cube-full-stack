import { CustomDialogTrigger } from '@/components/buttons';
import { ProductValue, Quantity, Sizes } from '@/components/product/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from '@/hooks';
import { type Dispatch, type SetStateAction, useState } from 'react';
import {
  Form,
  FormInnerWrapper,
  Input,
  Label,
  Textarea,
} from '@/components/form';
import { productCategories, productSizes } from '@/constants';
import { updateProduct } from '@/services';
import toast from 'react-hot-toast';
import { validateProductDescription, validateText } from '@/utils/validations';
import { UpdateProductForm } from '../types';

type UpdateProductProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  product: ProductValue;
  setProducts: Dispatch<SetStateAction<[] | ProductValue[]>>;
};

export default function UpdateProduct({
  open,
  setOpen,
  product,
  setProducts,
}: UpdateProductProps) {
  const { form, updateForm, clearForm } = useForm<UpdateProductForm>({
    name: product.name,
    description: product.description,
    price: product.price,
    gender: product.gender,
    color: product.color,
    category: product.category,
  });
  const [quantity, setQuantity] = useState<Quantity>({
    XS: product.quantity.XS,
    S: product.quantity.S,
    M: product.quantity.M,
    L: product.quantity.L,
    XL: product.quantity.XL,
    XXL: product.quantity.XXL,
  });

  const updateQuantity =
    (prop: Sizes) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity({ ...quantity, [prop]: e.target.value });
    };

  const updateProductById = async () => {
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
      const result = await updateProduct(product._id, newProduct);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      const updatedProduct = result.data.product;

      setProducts((prevProducts: ProductValue[]) => {
        return prevProducts.map((prevProduct) =>
          prevProduct._id === product._id ? updatedProduct : prevProduct
        );
      });

      clearForm();
      toast.success('Product updated successfully');
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  return (
    <div className="mb-1">
      <Dialog open={open} onOpenChange={setOpen} modal={open}>
        <DialogContent className="h-screen max-w-2xl overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold mb-1">
              Update Cube
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
              <CustomDialogTrigger onClick={updateProductById}>
                Update Cube
              </CustomDialogTrigger>
            </Form>
          </FormInnerWrapper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
