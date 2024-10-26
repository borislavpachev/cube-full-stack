import { Section } from '@/components/layout';
import { useEffect, useState } from 'react';
import { ProductValue } from '@/components/product/types';
import { getAllProducts } from '@/services';
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

  const columns = createProductColumns();

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
