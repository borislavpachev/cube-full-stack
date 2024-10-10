import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {
  ErrorPage,
  Favorites,
  Home,
  Login,
  Products,
  Profile,
  ShoppingCart,
  SignUp,
} from './pages';
import { ROUTES } from './constants';
import { Footer, Header } from './components/layout';
import { ProtectedRoute } from './components';
import { Orders, ProfileDetails, Security } from './pages/Profile/components';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/sign-up' && (
        <Header />
      )}
      <Toaster />
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route
          path={ROUTES.PRODUCTS}
          element={<Navigate to={`${ROUTES.PRODUCTS}/women`} />}
        />
        <Route path={`${ROUTES.PRODUCTS}/:g`} element={<Products />} />
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
        <Route
          path={ROUTES.USER_PROFILE}
          element={<Navigate to={`${ROUTES.USER_PROFILE}/orders`} />}
        />
        <Route
          path={`${ROUTES.USER_PROFILE}`}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path="orders" element={<Orders />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="security" element={<Security />} />
        </Route>

        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.ERROR} element={<ErrorPage />} />
      </Routes>
      {location.pathname !== '/login' && location.pathname !== '/sign-up' && (
        <Footer />
      )}
    </>
  );
}

export default App;
