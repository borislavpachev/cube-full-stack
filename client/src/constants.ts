export const ROUTES = {
  ADMIN: '/admin',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  HOME: '/home',
  ERROR: '*',
  FAVORITES: '/favorites',
  PRODUCT: '/product',
  PRODUCTS: '/products',
  SHOPPING_CART: '/cart',
  USER_PROFILE: '/profile',
  SEARCH: '/search',
};

export const AWS_BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;

export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const usersURL = `${API_BASE_URL}users`;
export const ordersURL = `${API_BASE_URL}orders`;
export const productsURL = `${API_BASE_URL}products`;
export const favoritesURL = `${API_BASE_URL}favorites`;
export const cartURL = `${API_BASE_URL}cart`;

export const productCategories = [
  {
    name: 'Maths',
    background: '/categories/Maths.jpg',
  },
  {
    name: 'Space',
    background: '/categories/Space.png',
  },
  {
    name: 'Nature',
    background: '/categories/Nature.jpg',
  },
  {
    name: 'Art',
    background: '/categories/Art.png',
  },
  {
    name: 'Love',
    background: '/categories/Love.jpg',
  },
  {
    name: 'Technology',
    background: '/categories/Technology.jpg',
  },
];

export const productSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const SearchItemsPerPage = 9;
