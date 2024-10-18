export const capitalizeFirstLetter = (string: string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const shuffleArray = (array: []) => {
  return array.sort(() => Math.random() - 0.5);
};