import { z } from 'zod';
import { paginationSchema } from './paginationSchema';

export const addProductSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, { message: 'Name is required' }),
      category: z.string().min(1, { message: 'Category is required' }),
      description: z.string().min(1, { message: 'Description is required' }),
      price: z.number().min(0, { message: 'Price must be a positive number' }),
      imageUrl: z.string().url({ message: 'Image is required' }),
    })
    .strict(),
});

export const getProductByIdSchema = z.object({
  params: z
    .object({
      id: z.string().uuid(),
    })
    .strict(),
});

const searchProductSchema = z.object({
  query: z
    .object({
      term: z
        .string()
        .min(3, { message: 'Search term must be at least 3 characters' }),
    })
    .strict(),
});

export const searchWithPaginationSchema = searchProductSchema.extend({
  query: searchProductSchema.shape.query.extend(
    paginationSchema.shape.query.shape,
  ),
});
