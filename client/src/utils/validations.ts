export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validated = emailRegex.test(email);
  return validated;
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};

export const validateName = (name: string) => {
  return name.length >= 1;
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex =
    /^(\+?[1-9]\d{0,2}[-.\s]?)?(\(?0?\d{1,4}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  const validated = phoneRegex.test(phoneNumber);
  return validated;
};

export const normalizePhoneNumber = (text: string) => {
  const normalized = text.replace(/[^\d+]/g, '');
  return normalized;
};
