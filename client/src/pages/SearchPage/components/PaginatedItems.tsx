import { ProductCard } from '@/components';
import { ProductValue } from '@/components/product/types';
import { Button } from '@/components/ui/button';
import { SearchItemsPerPage } from '@/constants';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

type PaginatedItemsProps = {
  products: ProductValue[];
};

export default function PaginatedItems({ products }: PaginatedItemsProps) {
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);

  const endOffset = itemOffset + SearchItemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / SearchItemsPerPage);

  useEffect(() => {
    setSelectedPage(0);
    setItemOffset(0);
  }, [products]);

  const handlePageClick = (e: { selected: number }) => {
    setSelectedPage(e.selected);
    const newOffset = (e.selected * SearchItemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="flex flex-wrap w-full gap-14 justify-center md:justify-start">
        {currentItems.map((item) => {
          return <ProductCard key={item._id} id={item._id} />;
        })}
      </div>
      <ReactPaginate
        className="flex items-center gap-3 mt-5"
        activeClassName="rounded border border-black p-1"
        breakLabel="..."
        previousLabel={<Button>previous</Button>}
        nextLabel={<Button>next</Button>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        forcePage={selectedPage}
        renderOnZeroPageCount={null}
      />
    </>
  );
}
