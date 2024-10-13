import { Router, Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateRequest } from '../middlewares';
import {
  addProductSchema,
  getProductByIdSchema,
  searchWithPaginationSchema,
  paginationSchema,
} from '../schemas';
import { ProductRepository } from '../repositories/productRepository';
import { ProductService } from '../services/productService';
import { ProductController } from '../controllers/productController';

const productRouter: Router = Router();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

/**
 * Route to add a new product.
 * - Validates the request body using `addProductSchema`.
 * - Delegates the handling to `ProductController.addProduct`.
 */
productRouter.post(
  '/',
  validateRequest(addProductSchema),
  productController.addProduct,
);

/**
 * Route to search for products with pagination and fuzzy search.
 * - Validates the query parameters using `searchWithPaginationSchema`.
 * - Delegates the handling to `ProductController.searchProducts`.
 */
productRouter.get(
  '/search',
  validateRequest(searchWithPaginationSchema),
  productController.searchProducts,
);

/**
 * Route to retrieve a list of products with pagination.
 * - Validates the query parameters using `paginationSchema`.
 * - Delegates the handling to `ProductController.getProducts`.
 */
productRouter.get(
  '/',
  validateRequest(paginationSchema),
  productController.getProducts,
);

/**
 * Route to retrieve a product by its ID.
 * - Validates the `id` parameter using `getProductByIdSchema`.
 * - Delegates the handling to `ProductController.getProductById`.
 */
productRouter.get(
  '/:id',
  validateRequest(getProductByIdSchema),
  productController.getProductById,
);

/**
 * Fallback for all other routes/methods.
 * - If the method is not `POST` or `GET`, responds with a `405 Method Not Allowed` status.
 */
productRouter.all('*', (req: Request, res: Response, next: NextFunction) => {
  if (['POST', 'GET'].includes(req.method)) {
    return next();
  }

  res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ error: 'Method Not Allowed' });
});

export { productRouter };
