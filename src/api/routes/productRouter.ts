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
