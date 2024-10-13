/**
 * Interface representing the result of a paginated query.
 *
 * @template T - The type of data being paginated.
 * @property {number} page - The current page number.
 * @property {number} limit - The maximum number of items per page.
 * @property {number} totalItems - The total number of items across all pages.
 * @property {number} totalPages - The total number of pages.
 * @property {T[]} results - The array of items for the current page.
 */
export interface PaginatedResult<T> {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  results: T[];
}

/**
 * Paginates an array of data.
 * Splits the provided data into pages based on the specified page number and limit.
 * Returns a subset of the data for the current page, along with pagination metadata.
 *
 * @template T - The type of data being paginated.
 * @param {T[]} data - The array of data to paginate.
 * @param {number} [page=1] - The current page number (defaults to 1).
 * @param {number} [limit=10] - The maximum number of items per page (defaults to 10).
 * @returns {PaginatedResult<T>} An object containing the paginated data and pagination details (page, limit, totalItems, totalPages).
 */
export const paginate = <T>(
  data: T[],
  page: number = 1,
  limit: number = 10,
): PaginatedResult<T> => {
  const totalItems = data.length; // Total number of items in the dataset
  const totalPages = Math.ceil(totalItems / limit); // Calculate the total number of pages
  const startIndex = (page - 1) * limit; // Calculate the index of the first item on the current page
  const endIndex = startIndex + limit; // Calculate the index of the last item on the current page

  // Slice the data array to get only the items for the current page
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    page,
    limit,
    totalItems,
    totalPages,
    results: paginatedData,
  };
};
