import { productsURL, usersURL } from '@/constants';
import {
  CreateProductFormWithQuantity,
  CreateUserForm,
} from '@/pages/AdminPage/components/types';
import { normalizePhoneNumber } from '@/utils/validations';

export const deleteUser = async (id: string) => {
  const url = `${usersURL}/${id}`;
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

export const blockUser = async (id: string) => {
  const url = `${usersURL}/block/${id}`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
    console.log(error);
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const unBlockUser = async (id: string) => {
  const url = `${usersURL}/unblock/${id}`;
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
    console.log(error);
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const createUser = async (form: CreateUserForm) => {
  const {
    firstName,
    lastName,
    email,
    role,
    phoneNumber,
    password,
    passwordConfirm,
  } = form;

  const updatedPhoneNumber = normalizePhoneNumber(phoneNumber);

  try {
    const response = await fetch(usersURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        role,
        phoneNumber: updatedPhoneNumber,
        password,
        passwordConfirm,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error.message || 'User create failed! Please try again!',
      };
    }

    const user = await response.json();
    return user;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const updateUser = async (id: string, role: string) => {
  try {
    const response = await fetch(`${usersURL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: role,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error.message || 'User create failed! Please try again!',
      };
    }

    const data = response.json();
    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const createNewProduct = async (form: CreateProductFormWithQuantity) => {
  try {
    const response = await fetch(productsURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error.message || 'Failed to create product! Please try again!',
      };
    }

    const product = await response.json();
    return product;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};
