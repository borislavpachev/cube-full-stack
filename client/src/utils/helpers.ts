import debounce from 'lodash.debounce';

export const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const shuffleArray = (array: []) => {
  return array.sort(() => Math.random() - 0.5);
};

export const priceFormatted = (price: number | undefined) => {
  if (price) {
    return price.toFixed(2);
  }
};

export const debounceFn = (fn: () => void) =>
  debounce(fn, 1500, { leading: true, trailing: false });
