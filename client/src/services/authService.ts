import { normalizePhoneNumber } from '@/utils/validations';
import { SignUpFormState } from '../pages/SignUp/SignUp';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string) => {
  const url = `${API_BASE_URL}users/login`;

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

export const signUp = async (form: SignUpFormState) => {
  const url = `${API_BASE_URL}users/signup`;

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