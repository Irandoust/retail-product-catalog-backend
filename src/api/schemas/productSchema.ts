import { z } from 'zod';
import { paginationSchema } from './paginationSchema';

/**
 * Schema to validate the body of a request to add a new product.
 *
 * - `name`: The name of the product (required).
 * - `category`: The category of the product (required).
 * - `description`: A description of the product (required).
 * - `price`: The price of the product (must be a positive number).
 * - `imageUrl`: The URL for the product image (must be a valid URL).
 * - Uses `strict()` to disallow any additional fields beyond those defined.
 */
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

/**
 * Schema to validate the route parameters for getting a product by ID.
 *
 * - `id`: A valid UUID representing the product's ID.
 * - Uses `strict()` to disallow any additional parameters.
 */
export const getProductByIdSchema = z.object({
  params: z
    .object({
      id: z.string().uuid(),
    })
    .strict(),
});

/**
 * Schema to validate the search query parameter for searching products.
 *
 * - `term`: The search term must be at least 3 characters long.
 * - Uses `strict()` to disallow any additional query parameters.
 */
const searchProductSchema = z.object({
  query: z
    .object({
      term: z
        .string()
        .min(3, { message: 'Search term must be at least 3 characters' }),
    })
    .strict(),
});

/**
 * Schema to validate the search query along with pagination parameters.
 *
 * - Extends `searchProductSchema` to include pagination (`page`, `limit`) from `paginationSchema`.
 * - Validates the search term as well as pagination options.
 */
export const searchWithPaginationSchema = searchProductSchema.extend({
  query: searchProductSchema.shape.query.extend(
    paginationSchema.shape.query.shape,
  ),
});
