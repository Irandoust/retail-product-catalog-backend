import { Router, Request, Response, NextFunction } from 'express';
import { validateRequest } from '../middlewares/validation';
import {
  addProductSchema,
  getProductByIdSchema,
  searchWithPaginationSchema,
} from '../schemas/productSchema';
import { StatusCodes } from 'http-status-codes';
import { ProductRepository } from '../repositories/productRepository';
import { ProductService } from '../services/productService';
import { ProductController } from '../controllers/productController';
import { paginationSchema } from '../schemas/paginationSchema';

const productRouter: Router = Router();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

productRouter.post(
  '/',
  validateRequest(addProductSchema),
  productController.addProduct,
);

productRouter.get(
  '/search',
  validateRequest(searchWithPaginationSchema),
  productController.searchProducts,
);

productRouter.get(
  '/',
  validateRequest(paginationSchema),
  productController.getProducts,
);

productRouter.get(
  '/:id',
  validateRequest(getProductByIdSchema),
  productController.getProductById,
);

productRouter.all('*', (req: Request, res: Response, next: NextFunction) => {
  if (['POST', 'GET'].includes(req.method)) {
    return next();
  }

  res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ error: 'Method Not Allowed' });
});

export { productRouter };
