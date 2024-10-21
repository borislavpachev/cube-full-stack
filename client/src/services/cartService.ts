import { cartURL } from '@/constants';

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
