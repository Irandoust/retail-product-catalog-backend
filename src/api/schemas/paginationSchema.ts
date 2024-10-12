import { z } from 'zod';

export const paginationSchema = z.object({
  query: z
    .object({
      page: z.coerce.number().min(1).optional(),
      limit: z.coerce.number().min(1).optional(),
    })
    .strict(),
});
