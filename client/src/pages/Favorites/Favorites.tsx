import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/buttons';
import { MainLayout, Section, SectionTitle } from '@/components/layout';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/contexts/types';
import { ProductCard } from '@/components/productComponents';

type FavoriteType = {
  productId: string;
  productSize: string;
};

export default function Favorites() {
  const { user } = useContext(AuthContext) as AuthContextType;
  const [favorites, setFavorites] = useState<FavoriteType[] | undefined>(
    user?.favorites || []
  );
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="w-full p-10">
        <SectionTitle>Favorites</SectionTitle>
        {!favorites?.length ? (
          <Section>
            <p className="text-center text-xl flex items-center">
              No products added to your favorites. Check our deals and feel free
              to add anything you like.
            </p>
            <div className="w-1/2 mt-12">
              <Button
                disabled={false}
                onClick={() => {
                  navigate('/');
                }}
              >
                Continue shopping
              </Button>
            </div>
          </Section>
        ) : (
          <Section>
            <div className="flex flex-wrap w-full justify-center md:justify-start items-center gap-5">
              {favorites.map((item, index) => {
                return (
                  <div key={index} className="w-[300px]">
                    <ProductCard id={item?.productId} size={item.productSize} />
                  </div>
                );
              })}
            </div>
          </Section>
        )}
      </div>
    </MainLayout>
  );
}
