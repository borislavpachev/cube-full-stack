import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomCarousel from '../../../components/CustomCarousel';
import { Button } from '../../../components/buttons';
import { HeartIcon } from '../../../components/icons';
import { Section } from '../../../components/layout';
import Loading from '../../../components/Loading';
import ProductElement from './ProductElement';
import { getProduct } from '@/services/productService';
import { ProductValue, Sizes } from '../../../components/product/types';
import { ROUTES } from '@/constants';
import { priceFormatted } from '@/utils/helpers';
import { useCart, useFavorites } from '@/hooks';
import ProductDescription from './ProductDescription';
import {
  ProductQuantity,
  SizeSelect,
  CustomCounter,
} from '@/components/product';

const images = [{ src: '/images/Front.png' }, { src: '/images/Back.png' }];

export default function ProductComponent() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductValue | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<Sizes>('M');
  const [quantity, setQuantity] = useState(1);

  const { isLiked, handleToggleFavorite } = useFavorites(
    id as string,
    selectedSize
  );
  const { addToCart } = useCart(id as string, selectedSize, quantity);

  const roundedPrice = priceFormatted(product?.price);
  const productQuantity = product?.quantity[selectedSize];

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/error');
      return;
    }

    getProduct(id)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((error) => {
        navigate('/error');
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Section>
      <div className="flex flex-col space-y-10 md:space-y-0 md:space-x-10 md:flex-row items-start p-10 mx-20">
        <CustomCarousel items={images} />

        <div className="space-y-4 w-full">
          <div className="flex flex-col md:flex-row items-start justify-between py-1">
            <h1 className="text-4xl font-bold">{product?.name}</h1>
            <div className="p-1" onClick={handleToggleFavorite}>
              {!isLiked ? (
                <HeartIcon size={40} />
              ) : (
                <HeartIcon size={40} fillColor="red" />
              )}
            </div>
          </div>
          <div>
            <ProductElement>{product?.gender}</ProductElement>
            <p className="text-gray-500 line-clamp-1">{product?.description}</p>
          </div>

          <div className="flex flex-col justify-start space-y-3">
            <p className="text-3xl font-bold">${roundedPrice}</p>

            <div>
              <ProductElement>Category</ProductElement>
              <div className="w-1/2">
                <Button
                  onClick={() =>
                    navigate(
                      `${ROUTES.PRODUCTS}/${product?.gender}/${product?.category}`
                    )
                  }
                >
                  {product?.category}
                </Button>
              </div>
            </div>

            <div>
              <ProductElement>Color</ProductElement>
              <div
                className={`bg-${product?.color} w-16 h-16 border-2 border-black rounded`}
                title={`${product?.color}`}
              ></div>
            </div>
            <div>
              <ProductElement>Size</ProductElement>
              <SizeSelect
                size={selectedSize}
                setSize={setSelectedSize}
                className="rounded outline-none text-xl w-16 h-16 border-2 border-black"
              />
            </div>
          </div>

          <div>
            <ProductQuantity
              quantity={productQuantity as number}
              size={3}
              fontSize="text-sm"
            />

            <div className="flex space-x-5">
              <CustomCounter
                productQuantity={product?.quantity}
                quantity={quantity}
                size={selectedSize}
                setQuantity={setQuantity}
              />
              <Button disabled={!productQuantity} onClick={addToCart}>
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProductDescription description={product?.description as string} />
    </Section>
  );
}
