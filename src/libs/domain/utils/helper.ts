export const capitalizeWord = (word: string) => {
  // const lower = word.toLowerCase();
  const res = word.charAt(0).toUpperCase() + word.slice(1);
  return res;
};
