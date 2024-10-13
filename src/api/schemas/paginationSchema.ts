import { z } from 'zod';

/**
 * Schema to validate pagination query parameters.
 *
 * - `page`: The current page number, coerced to a number, must be at least 1, and is optional.
 * - `limit`: The maximum number of items per page, coerced to a number, must be at least 1, and is optional.
 * - The `strict()` ensures no additional properties beyond `page` and `limit` are allowed in the query.
 */
export const paginationSchema = z.object({
  query: z
    .object({
      page: z.coerce.number().min(1).optional(),
      limit: z.coerce.number().min(1).optional(),
    })
    .strict(),
});
