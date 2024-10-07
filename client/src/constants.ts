export const ROUTES = {
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  HOME: '/home',
  ERROR: '*',
  FAVORITES: '/favorites',
  PRODUCTS: '/products',
  SHOPPING_CART: '/cart',
  USER_PROFILE: '/profile',
};

export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const productCategories = [
  {
    name: 'Maths',
    background: '/categories/Maths.jpg',
  },
  {
    name: 'Space',
    background: '/categories/Space.png',
  },{
    name: 'Nature',
    background: '/categories/Nature.jpg',
  },{
    name: 'Art',
    background: '/categories/Art.png',
  },{
    name: 'Love',
    background: '/categories/Love.jpg',
  },{
    name: 'Technology',
    background: '/categories/Technology.jpg',
  },
];
