import { Button } from '@/components/buttons';
import { MainLayout } from '@/components/layout';
import { useAuth } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const { user } = useAuth();
  const favorites = user?.favorites;
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="h-[100vh]">
        <h1 className="mt-10 text-2xl border-2 border-t-blue-200 text-center bg-white/30 rounded-t p-6 -mb-2">
          Favorites
        </h1>
        {!favorites?.length ? (
          <section
            className="max-w-3xl bg-white rounded flex flex-col 
            items-center justify-center shadow-xl p-14"
          >
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
          </section>
        ) : (
          <section
            className="max-w-3xl bg-white rounded flex flex-col 
            items-center justify-center shadow-xl p-14"
          >
            <p>FAVS: {user?.favorites.length}</p>
          </section>
        )}
      </div>
    </MainLayout>
  );
}
