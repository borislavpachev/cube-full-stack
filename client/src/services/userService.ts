import { API_BASE_URL } from '@/constants';
import { UpdateForm } from '@/pages/Profile/components/ProfileDetails';

export const updateCurrentUserData = async (form: UpdateForm) => {
  const url = `${API_BASE_URL}users/me`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ...form,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error.message || 'User update failed! Please try again!',
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const updateCurrentUserPassword = async (
  password: string,
  passwordConfirm: string
) => {
  const url = `${API_BASE_URL}users/me/update-password`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        password,
        passwordConfirm,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error.message || 'Password update failed! Please try again!',
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const deleteCurrentUser = async () => {
  const url = `${API_BASE_URL}users/me`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      return {
        error: 'Deletion Failed! Please try again!',
      };
    }

    return response;
  } catch (error) {
    console.log(error);
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};
