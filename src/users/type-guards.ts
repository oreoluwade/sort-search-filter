export const isNumber = (input: number | string): input is number => {
  return typeof input === 'number';
};
