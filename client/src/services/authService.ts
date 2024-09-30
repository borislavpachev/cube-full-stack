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
      throw new Error('Email or password are not correct! Please try again!');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (form: SignUpFormState) => {
  const url = `${API_BASE_URL}users/signup`;
  const { firstName, lastName, email, phoneNumber, password, passwordConfirm } =
    form;

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
        phoneNumber,
        password,
        passwordConfirm,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Sign Up Failed! Please try again!');
    }

    const user = await response.json();
    console.log(user);
    
    return user;
  } catch (error) {
    console.log(error);
  }
};
