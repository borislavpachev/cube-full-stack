import toast from 'react-hot-toast';

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validated = emailRegex.test(email);

  if (!validated) {
    toast.error('Please provide a valid email');
  }

  return validated;
};

export const validatePassword = (password: string) => {
  if (password.length < 8) {
    toast.error('Password must be at least 8 characters');
  } else {
    return password;
  }
};
