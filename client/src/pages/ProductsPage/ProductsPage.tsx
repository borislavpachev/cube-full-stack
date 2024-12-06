import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants';
import toast from 'react-hot-toast';
import { Button } from '@/components/buttons';
import { MainLayout, Section } from '@/components/layout';
import { ProductValue } from '@/components/product/types';
import { getProductsByGenderAndCategory } from '@/services/productService';
import { capitalizeFirstLetter } from '@/utils/helpers';
import { PointerRightIcon } from '@/components/icons';
import { Loading, NoData, ProductCard } from '@/components';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductValue[] | undefined>([]);
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [capitalizedGender, capitalizedCategory]);

  if (loading) {
    return <Loading top={false} />;
  }

  return (
    <MainLayout>
      {!products?.length ? (
        <NoData
          main={`No products in ${capitalizedCategory} category.`}
          secondary="Check our products in the other categories."
          button={
            <Button
              onClick={() => {
                navigate(`${ROUTES.PRODUCTS}/${gender}`);
              }}
            >
              Continue shopping
            </Button>
          }
        />
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

            <div className=" flex flex-wrap w-full gap-y-4 md:px-[100px] lg:px-[200px] md:gap-x-16 lg:gap-x-24 justify-center items-center">
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
