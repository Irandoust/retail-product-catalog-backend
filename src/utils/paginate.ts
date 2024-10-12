export interface PaginatedResult<T> {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  results: T[];
}

export const paginate = <T>(
  data: T[],
  page: number = 1,
  limit: number = 10,
): PaginatedResult<T> => {
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedData = data.slice(startIndex, endIndex);

  return {
    page,
    limit,
    totalItems,
    totalPages,
    results: paginatedData,
  };
};
