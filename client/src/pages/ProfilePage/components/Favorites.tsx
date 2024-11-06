import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/buttons';
import { Section } from '@/components/layout';
import { getAllFavorites } from '@/services/favoriteService';
import toast from 'react-hot-toast';
import FavoriteCard from './FavoriteCard';
import { Sizes } from '@/components/product/types';
import { FavoriteType } from '@/contexts/types';
import { NoData } from '@/components';

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteType[] | undefined>([]);

  useEffect(() => {
    getAllFavorites()
      .then((res) => {
        if (res.error) {
          toast.error(res.error);
          return;
        }
        const userFavorites = res.data.favorites;
        setFavorites(userFavorites);
      })
      .catch((error) => {
        setFavorites([]);
        toast.error(error);
      });
  }, []);

  const deleteFavorite = async (id: string, size: Sizes) => {
    setFavorites((prevFavorites) => {
      return prevFavorites?.filter((item) => {
        return (
          item.productId !== id ||
          (item.productId === id && item.productSize !== size)
        );
      });
    });
  };

  const navigate = useNavigate();

  return (
    <>
      {!favorites?.length ? (
        <NoData
          main="No products added to your favorites."
          secondary="Check our deals and feel free to add anything you like."
          button={
            <Button
              onClick={() => {
                navigate('/');
              }}
            >
              Continue shopping
            </Button>
          }
        />
      ) : (
        <Section>
          <div className="flex flex-wrap w-full mb-10 gap-14 justify-center md:justify-start">
            {favorites.map((item) => {
              return (
                <FavoriteCard
                  key={`${item.productId}-${item.productSize}`}
                  id={item?.productId}
                  size={item?.productSize}
                  deleteFavorite={deleteFavorite}
                />
              );
            })}
          </div>
        </Section>
      )}
    </>
  );
}
