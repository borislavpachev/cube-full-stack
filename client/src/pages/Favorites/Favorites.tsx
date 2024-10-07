import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/buttons';
import { MainLayout, Section } from '@/components/layout';
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
      <div>
        <h1 className="mt-10 text-2xl border-2 border-t-blue-200 text-center bg-white/30 rounded-t p-6 -mb-2">
          Favorites
        </h1>
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
            <div
              className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]
          place-items-center gap-x-2 gap-y-2 overflow-auto"
            >
              {favorites.map((item, index) => {
                return (
                  <ProductCard
                    key={index}
                    id={item?.productId}
                    size={item.productSize}
                  />
                );
              })}
            </div>
          </Section>
        )}
      </div>
    </MainLayout>
  );
}
