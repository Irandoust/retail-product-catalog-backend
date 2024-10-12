import { Router, Request, Response, NextFunction } from 'express';
import { validateRequest } from '../middlewares/validation';
import { productSchema } from '../schemas/productSchema';
import { StatusCodes } from 'http-status-codes';
import { ProductRepository } from '../repositories/productRepository';
import { ProductService } from '../services/productService';
import { ProductController } from '../controllers/productController';

const productRouter: Router = Router();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

productRouter.post(
  '/',
  validateRequest(productSchema),
  productController.addProduct,
);

productRouter.all('*', (req: Request, res: Response, next: NextFunction) => {
  if (['POST'].includes(req.method)) {
    return next();
  }

  res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ error: 'Method Not Allowed' });
});

export { productRouter };
