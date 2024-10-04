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
        <h1>Favorites</h1>
        {!favorites?.length ? (
          <section className="max-w-3xl bg-white rounded flex flex-col items-center justify-center border-2 border-blue-200 p-5">
            <p>
              No products added to your shopping cart. Check our deals and feel
              free to add anything you like.
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
          <p>MYYYYYYYYYYY FAVS</p>
        )}
      </div>
    </MainLayout>
  );
}
