import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants';
import toast from 'react-hot-toast';
import { Button } from '@/components/buttons';
import { MainLayout, Section } from '@/components/layout';
import { ProductCard } from '@/pages/ProductsPage/components';
import { ProductValue } from '@/components/product/types';
import { getProductsByGenderAndCategory } from '@/services/productService';
import { capitalizeFirstLetter } from '@/utils/helpers';
import { PointerRightIcon } from '@/components/icons';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductValue[] | undefined>([]);

  const { gender, category } = useParams();
  const navigate = useNavigate();

  let capitalizedGender: string = '';
  let capitalizedCategory: string = '';

  if (gender && category) {
    capitalizedGender = capitalizeFirstLetter(gender);
    capitalizedCategory = capitalizeFirstLetter(category);
  }

  useEffect(() => {
    getProductsByGenderAndCategory(capitalizedGender, capitalizedCategory)
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
          return;
        }
        const result = res.data.products;

        setProducts(result);
      })
      .catch((error) => {
        setProducts([]);
        toast.error(error);
      });
  }, [capitalizedGender, capitalizedCategory]);

  return (
    <MainLayout>
      {!products?.length ? (
        <Section>
          <p className="text-center text-xl flex items-center">
            {`No products in ${capitalizedCategory} category.`}
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            Check our products in the other categories.
          </p>
          <div className="mt-12">
            <Button
              onClick={() => {
                navigate(`${ROUTES.PRODUCTS}/${gender}`);
              }}
            >
              Continue shopping
            </Button>
          </div>
        </Section>
      ) : (
        <Section>
          <div className="mb-20 space-y-12 w-full">
            {capitalizedGender && capitalizedCategory && (
              <p className="mx-10 md:mt-5 w-full tracking-wider cursor-default flex items-end text-xl md:text-2xl underline underline-offset-4">
                <span>{`${capitalizedGender}'s Wear`}</span>
                <span>
                  <PointerRightIcon size={30} />
                </span>
                <span>{`${capitalizedCategory}`}</span>
              </p>
            )}

            <div className=" flex flex-wrap w-full gap-14 justify-center items-center">
              {products.map((item) => {
                return <ProductCard id={item._id} key={item._id} />;
              })}
            </div>
          </div>
        </Section>
      )}
    </MainLayout>
  );
}
