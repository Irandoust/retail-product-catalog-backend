import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'Name is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  description: z.string().optional(),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  imageUrl: z.string().url().optional(),
});
