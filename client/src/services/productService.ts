import { productsURL } from '@/constants';

export const getProduct = async (id: string) => {
  const url = `${productsURL}/${id}`;
  try {
    const response = await fetch(url, {
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
          error.message ||
          `Error getting product with id: ${id}! Please try again!`,
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const getAllProducts = async () => {
  const url = `${productsURL}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error.message || `Error getting All products`,
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};
