import { ProtectedRoute } from '@/components';
// import { ProductComponent } from '@/components/productComponents';
import { ROUTES } from '@/constants';
import {
  AdminPage,
  CategoryPage,
  ErrorPage,
  HomePage,
  LoginPage,
  ProfilePage,
  ProductsPage,
  ShoppingCartPage,
  SignUpPage,
  SingleProductPage,
} from '@/pages';
import { ProductPanel } from '@/pages/AdminPage/components/productComponents';
import { UsersPanel } from '@/pages/AdminPage/components/userComponents';
import {
  Address,
  Favorites,
  Orders,
  ProfileDetails,
  Security,
} from '@/pages/ProfilePage/components';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route
        path={ROUTES.PRODUCTS}
        element={<Navigate to={`${ROUTES.PRODUCTS}/women`} />}
      />
      <Route path={`${ROUTES.PRODUCTS}/:gender`} element={<CategoryPage />} />
      <Route
        path={`${ROUTES.PRODUCTS}/:gender/:category`}
        element={<ProductsPage />}
      />
      <Route path={`${ROUTES.PRODUCT}/:id`} element={<SingleProductPage />} />

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
        <Route path="users" element={<UsersPanel />} />
        <Route path="products" element={<ProductPanel />} />
      </Route>
      <Route
        path={ROUTES.SHOPPING_CART}
        element={
          <ProtectedRoute>
            <ShoppingCartPage />
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
            <ProfilePage />
          </ProtectedRoute>
        }
      >
        <Route path="orders" element={<Orders />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="details" element={<ProfileDetails />} />
        <Route path="address" element={<Address />} />
        <Route path="security" element={<Security />} />
      </Route>

      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
      <Route path={ROUTES.ERROR} element={<ErrorPage />} />
    </Routes>
  );
}
