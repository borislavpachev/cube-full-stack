import { Sizes } from '@/components/product/types';
import { cartURL } from '@/constants';

type Product = {
  _id: string;
  quantity?: number;
  size: Sizes;
};

export const getShoppingCart = async () => {
  try {
    const response = await fetch(cartURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error:
          error.message || 'Error getting shopping cart! Please try again!',
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const addToShoppingCart = async (product: Product) => {
  try {
    const response = await fetch(cartURL, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error:
          error.message || 'Add product to cart failed! Please try again!',
      };
    }

    const data = response.json();
    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const removeFromShoppingCart = async (product: Product) => {
  try {
    const response = await fetch(cartURL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error:
        error.message || 'Remove product from cart failed! Please try again!',
      };
    }

    const data = response.json();
    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};