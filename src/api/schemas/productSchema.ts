import { z } from 'zod';

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

export const searchProductSchema = z.object({
  query: z.object({
    term: z.string().min(3, { message: 'Search term cannot be empty' }),
  }),
});
