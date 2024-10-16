import { normalizePhoneNumber } from '@/utils/validations';
import { SignUpForm } from '../pages/SignUp/SignUp';
import { usersURL } from '@/constants';

export const login = async (email: string, password: string) => {
  const url = `${usersURL}/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || 'Login failed! Please try again!' };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const signUp = async (form: SignUpForm) => {
  const url = `${usersURL}/signup`;

  const { firstName, lastName, email, phoneNumber, password, passwordConfirm } =
    form;

  const updatedPhoneNumber = normalizePhoneNumber(phoneNumber);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phoneNumber: updatedPhoneNumber,
        password,
        passwordConfirm,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message || 'Sign Up failed! Please try again!' };
    }

    const user = await response.json();
    return user;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};

export const authenticate = async () => {
  const url = `${usersURL}/auth`;

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
        error: error.message || 'User authentication fail! Please try again!',
      };
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: 'An unexpected error occurred. Please try again!' };
  }
};
