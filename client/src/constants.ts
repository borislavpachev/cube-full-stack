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
  CHECKOUT: '/checkout',
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

export const productDescription = {
  Men: `XS: Chest Width 81-86 cm, Length 66 cm,
S: Chest Width 86-91 cm, Length 69 cm,
M: Chest Width 96-101 cm, Length 71 cm,
L: Chest Width 106-111 cm, Length 74 cm,
XL: Chest Width 116-121 cm, Length 76 cm,
XXL: Chest Width 127-132 cm, Length 79 cm`,
  Women: `XS: Chest Width 76-81 cm, Length 62 cm
S: Chest Width 81-86 cm, Length 64 cm
M: Chest Width 91-96 cm, Length 66 cm
L: Chest Width 101-106 cm, Length 69 cm
XL: Chest Width 111-116 cm, Length 71 cm
XXL: Chest Width 121-127 cm, Length 74 cm`,
};
