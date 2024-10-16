import { usersURL } from '@/constants';

type UserForm = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  deliveryAddress?: {
    street: string;
    city: string;
    additionalInfo?: string;
  };
};

export const updateCurrentUserData = async (form: UserForm) => {
  const url = `${usersURL}/me`;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(form),
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
  const url = `${usersURL}/me/update-password`;

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
  const url = `${usersURL}/me`;
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

export const getAllUsers = async () => {
  const url = `${usersURL}`;
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
        error: error.message || 'Error getting all users! Please try again!',
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};
