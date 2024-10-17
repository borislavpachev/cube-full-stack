import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/buttons';
import { Section } from '@/components/layout';
import { getAllFavorites } from '@/services/favoriteService';
import toast from 'react-hot-toast';
import FavoriteCard from './FavoriteCard';

export type FavoriteType = {
  productId: string;
  productSize: string;
};

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
        toast.error(error);
      });
  }, []);

  const deleteFavorite = async (id: string) => {
    setFavorites((prevFavorites) => {
      return prevFavorites?.filter((item) => {
        return item.productId !== id;
      });
    });
  };

  const navigate = useNavigate();

  return (
    <>
      {!favorites?.length ? (
        <Section>
          <p className="text-center text-xl flex items-center">
            No products added to your favorites.
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            Check our deals and feel free to add anything you like.
          </p>
          <div className="mt-12">
            <Button
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
                  <FavoriteCard
                    id={item?.productId}
                    size={item?.productSize}
                    liked={true}
                    deleteFavorite={deleteFavorite}
                  />
                </div>
              );
            })}
          </div>
        </Section>
      )}
    </>
  );
}
