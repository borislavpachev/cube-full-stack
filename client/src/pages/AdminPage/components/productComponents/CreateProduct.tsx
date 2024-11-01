import { Button, CustomDialogTrigger } from '@/components/buttons';
import {
  FileInput,
  Form,
  FormInnerWrapper,
  Input,
  Label,
  Select,
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
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CreateProductForm } from '../types';
import {
  getFrontCoverFromBucket,
  uploadFileToBucket,
} from '@/services/awsService';
import CreateGallery from './CreateGallery';

type CreateProductProps = {
  setProducts: React.Dispatch<React.SetStateAction<ProductValue[]>>;
};

export default function CreateProduct({ setProducts }: CreateProductProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { form, updateForm, setForm, clearForm } = useForm<CreateProductForm>({
    name: '',
    description: '',
    price: 0,
    frontCover: '',
    backCover: '',
    gender: '',
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
  const [, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (form.gender) {
      getFrontCoverFromBucket(form.gender)
        .then((data) => {
          setForm({ ...form, frontCover: data as string });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [form.gender]);

  const updateQuantity =
    (prop: Sizes) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuantity({ ...quantity, [prop]: e.target.value });
    };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      try {
        const url = await uploadFileToBucket(form.gender, selectedFile);

        if (!url) return;
        setForm({ ...form, backCover: url });
        toast.success('Cover added successfully');
      } catch (error) {
        toast.error('Unexpected error occurred! Please try again!');
        console.error(error);
      }
    }
  };

  const createProduct = async () => {
    const {
      name,
      description,
      price,
      frontCover,
      backCover,
      gender,
      category,
    } = form;
    const { XS, S, M, L, XL, XXL } = quantity;

    if (!validateText(name)) {
      toast.error('Product must have a name!');
      return;
    }
    if (!frontCover || !backCover) {
      toast.error('Product must have Front and Back cover');
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
      toast.success('Product created successfully');
      clearForm();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  return (
    <div>
      <Dialog open={isOpen} modal={isOpen} onOpenChange={setIsOpen}>
        <CustomDialogTrigger>Create Product</CustomDialogTrigger>
        <DialogContent className="h-screen max-w-2xl overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold mb-1">
              Create New Cube
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Please enter details
            </DialogDescription>
          </DialogHeader>
          <CreateGallery
            frontCover={form.frontCover}
            backCover={form.backCover}
          />
          <FormInnerWrapper size="w-full">
            <Form>
              <div className="flex gap-2 mb-5 items-end">
                <div className="flex flex-col w-full">
                  <Label htmlFor="new-product-gender">Gender</Label>
                  <Select
                    id="new-product-gender"
                    name="new-product-gender"
                    onChange={updateForm('gender')}
                    options={['', 'Women', 'Men']}
                  />
                </div>

                <div className="flex flex-col items-start w-full">
                  <Label htmlFor="back-cover-file-input">Back Cover</Label>
                  <FileInput
                    id="back-cover-file-input"
                    disabled={!form.gender}
                    onChange={handleFileChange}
                  />
                </div>
              </div>

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
                placeholder="Product Description"
                value={form.description}
                onChange={updateForm('description')}
              />

              <div className="flex gap-2 mb-5">
                <div className="flex flex-col w-full">
                  <Label htmlFor="new-product-category">Category</Label>
                  <Select
                    id="new-product-category"
                    name="new-product-category"
                    onChange={updateForm('category')}
                    options={productCategories.map((category) => {
                      return category.name;
                    })}
                  />
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
              <Button type="button" onClick={createProduct}>
                Create Cube
              </Button>
            </Form>
          </FormInnerWrapper>
        </DialogContent>
      </Dialog>
    </div>
  );
}
