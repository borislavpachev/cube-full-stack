import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import {
  ErrorPage,
  Favorites,
  Home,
  Login,
  Products,
  ShoppingCart,
  SignUp,
} from './pages';
import { ROUTES } from './constants';
import { Footer, Header } from './components/layout';
import { ProtectedRoute } from './components';

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PRODUCTS} element={<Products />} />

        <Route
          path={ROUTES.FAVORITES}
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SHOPPING_CART}
          element={
            <ProtectedRoute>
              <ShoppingCart />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.LOGIN} element={<ProtectedRoute><Login /></ProtectedRoute>} />
        <Route path={ROUTES.SIGN_UP} element={<ProtectedRoute><SignUp /></ProtectedRoute>} />
        <Route path={ROUTES.ERROR} element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
