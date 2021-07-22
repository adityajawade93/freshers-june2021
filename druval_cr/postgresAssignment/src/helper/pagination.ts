/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

function isDataFetchable(page: number, size: number, total: number) {
  if (total === 0 || size <= 0) return false;
  const totalPages: number = Math.ceil(total / size);

  // page: [0, totalPages)
  return page >= 0 && page < totalPages;
}

export function pagenation(page: number, size: number, total: number) {
  // default value
  let offset = 0;
  let limit = 0;

  if (isDataFetchable(page, size, total)) {
    offset = page * size;
    limit = size;
  }

  return { offset, limit };
}

export function validQueryParams(query: { page?: string; size?: string } | null) {
  interface ResultI {
    page: number;
    size: number;
  }
  const result: ResultI = { page: -1, size: -1 };

  if (query) {
    if (query.page) {
      const page: number = parseInt(query.page, 10);
      if (!isNaN(page) && page >= 0) result.page = page;
    }
    if (query.size) {
      const size: number = parseInt(query.size, 10);
      if (!isNaN(size) && size > 0) result.size = size;
    }
  }
  return result;
}
