import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Footer, Header } from './components/layout';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/sign-up' && (
        <Header />
      )}
      <Toaster />
      <AppRoutes />
      {location.pathname !== '/login' && location.pathname !== '/sign-up' && (
        <Footer />
      )}
    </>
  );
}

export default App;
