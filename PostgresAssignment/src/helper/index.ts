export const validatePage = function(page: number, size: number) {
  if (
    typeof page === 'number' &&
    typeof size === 'number' &&
    page >= 0 &&
    size >= 0
  ) {
    return true;
  }
  return false;
};
