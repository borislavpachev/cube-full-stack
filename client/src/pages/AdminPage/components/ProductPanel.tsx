import { Section } from '@/components/layout';
import { useEffect, useState } from 'react';
import { ProductValue } from '@/components/product/types';
import { deleteProduct, getAllProducts } from '@/services';
import toast, { LoaderIcon } from 'react-hot-toast';
import { createProductColumns } from './columnsProducts';
import DataTableProducts from './DataTableProducts';

export default function ProductPanel() {
  const [products, setProducts] = useState<ProductValue[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
          return;
        }
        const allProducts = res.data.products;
        setProducts(allProducts);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteProductById = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success('Product deleted successfully !');
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred. Please try again!');
    }
  };

  const columns = createProductColumns(deleteProductById);

  return (
    <Section>
      {loading && <LoaderIcon className="w-32 h-32" />}
      <DataTableProducts
        columns={columns}
        data={products}
        setProducts={setProducts}
      />
    </Section>
  );
}
