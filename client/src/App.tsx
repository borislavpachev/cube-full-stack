import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {
  AdminPage,
  ErrorPage,
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
import {
  Address,
  Favorites,
  Orders,
  ProfileDetails,
  Security,
} from './pages/Profile/components';
import { ProductComponent } from './components/productComponents';
import { Users } from './pages/AdminPage/components';

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
        <Route path={`${ROUTES.PRODUCT}/:id`} element={<ProductComponent />} />

        <Route
          path={ROUTES.ADMIN}
          element={<Navigate to={`${ROUTES.ADMIN}/users`} />}
        />
        <Route
          path={ROUTES.ADMIN}
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route path="users" element={<Users />} />
          {/* <Route path="products" element={<Users />} /> */}
        </Route>
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
          <Route path="favorites" element={<Favorites />} />
          <Route path="details" element={<ProfileDetails />} />
          <Route path="address" element={<Address />} />
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
