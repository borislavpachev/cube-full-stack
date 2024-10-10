import { API_BASE_URL } from '@/constants';

export const getMyOrders = async () => {
  const url = `${API_BASE_URL}orders`;
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
        error: error.message || 'Failed to get your orders! Please try again!',
      };
    }

    const data = await response.json();
   
    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};
