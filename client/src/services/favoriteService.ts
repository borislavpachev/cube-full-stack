import { favoritesURL } from "@/constants";

type Product = {
  _id: string;
  size: string;
};

export const getAllFavorites = async () => {
  try {
    const response = await fetch(favoritesURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error.message || `Error getting all favorites`,
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const addFavorite = async (product: Product) => {
  try {
    const response = await fetch(favoritesURL, {
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
        error: error.message || `Failed to add product to favorites`,
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const removeFavorite = async (product: Product) => {
  try {
    const response = await fetch(favoritesURL, {
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
        error: error.message || `Failed to remove product from favorites`,
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};
