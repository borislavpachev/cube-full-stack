import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomCarousel from '../CustomCarousel';
import { Button } from '../buttons';
import { HeartIcon } from '../icons';
import { Section } from '../layout';
import Loading from '../Loading';
import ProductElement from './ProductElement';
import { getProduct } from '@/services/productService';
import { ProductValue, Sizes } from './types';
import { productSizes, ROUTES } from '@/constants';
import { priceFormatted } from '@/utils/helpers';
import CustomCounter from '../CustomCounter';

const images = [{ src: '/images/Front.png' }, { src: '/images/Back.png' }];

export default function ProductComponent() {
  const [product, setProduct] = useState<ProductValue | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<Sizes>('M');
  const [quantity, setQuantity] = useState(1);

  const roundedPrice = priceFormatted(product?.price);
  const productQuantity = product?.quantity[selectedSize];

  const { id } = useParams();
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

  const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value as Sizes);
  };

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
            <HeartIcon size={40} />
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

              <select
                className="rounded outline-none text-xl w-16 h-16 border-2 border-black"
                name="sizes"
                id="select-sizes"
                value={selectedSize}
                onChange={handleSize}
              >
                {productSizes.map((size, index) => {
                  return (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <p className="mb-1">
              <span className="inline-block mr-1 rounded-full bg-green-400 w-3 h-3"></span>
              <span className="font-semibold">
                {`${productQuantity} pcs left in stock`}
              </span>
            </p>

            <div className="flex space-x-5">
              <CustomCounter
                productQuantity={product?.quantity}
                quantity={quantity}
                size={selectedSize}
                setQuantity={setQuantity}
              />
              <Button onClick={() => {}}>Add To Cart</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start w-full px-20 mb-14">
        <p className="text-2xl border-b-2 border-black w-fit">
          Full Description
        </p>
        <div className="border-b-2"></div>
        <p className="text-gray-500 text-lg my-3">{product?.description}</p>
      </div>
    </Section>
  );
}
