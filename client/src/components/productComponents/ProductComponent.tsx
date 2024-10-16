import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../buttons';
import CustomCarousel from '../CustomCarousel';
import { MainLayout, Section } from '../layout';
import { useEffect, useState } from 'react';
import { getProduct } from '@/services/productService';
import { HeartIcon } from '../icons';
import Loading from '../Loading';
import ProductElement from './ProductElement';
import { ProductValue, Sizes } from './types';

const images = [{ src: '/images/Front.png' }, { src: '/images/Back.png' }];

export default function ProductComponent() {
  const [product, setProduct] = useState<ProductValue | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<Sizes>('M');
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();

  const productQuantity = product?.quantity[selectedSize];

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value as Sizes);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <MainLayout>
      <Section>
        <div className="flex flex-col space-y-10 md:space-y-0 md:space-x-10 md:flex-row items-start p-10">
          <CustomCarousel items={images} />

          <div className="space-y-8 w-full">
            <div className="flex flex-col md:flex-row items-start justify-between py-1">
              <h1 className="text-4xl font-bold">{product?.name}</h1>
              <HeartIcon size={40} />
            </div>
            <div>
              <ProductElement>{product?.gender}</ProductElement>
              <p className="text-gray-500">{product?.description}</p>
            </div>

            <div className="flex flex-col justify-start space-y-3">
              <p className="text-3xl font-bold">${product?.price.toFixed(2)}</p>

              <div className="space-y-3">
                <ProductElement>Category</ProductElement>
                <div className="w-1/2">
                  <Button onClick={() => navigate('/')}>
                    {product?.category}
                  </Button>
                </div>
              </div>

              <div>
                <ProductElement>Color</ProductElement>
                <div
                  className={`bg-${product?.color} w-16 h-16 border-2 border-black rounded`}
                  title={`${product?.color.toUpperCase()}`}
                ></div>
              </div>
              <div>
                <ProductElement>Size</ProductElement>

                <select
                  className="appearance-auto rounded outline-none py-4 text-xl w-16 h-16 border-2 border-black"
                  name="sizes"
                  id="select-sizes"
                  value={selectedSize}
                  onChange={handleChange}
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
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
                <div className="flex w-1/2 text-2xl items-center justify-around rounded border-2 border-black">
                  <button
                    className="p-2"
                    onClick={() => setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <div>{quantity}</div>
                  <button
                    className="p-2"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <Button onClick={() => {}}>Add To Cart</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start w-full px-10 mb-14">
          <p className="text-2xl border-b-2 border-black w-fit">
            Full Description
          </p>
          <div className="border-b-2"></div>
          <p className="text-gray-500 text-lg my-3">{product?.description}</p>
        </div>
      </Section>
    </MainLayout>
  );
}
