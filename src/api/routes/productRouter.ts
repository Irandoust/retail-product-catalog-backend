import express, { type Router, Request, Response, NextFunction } from 'express';
import { validateRequest } from '../../middlewares/validation';
import { productSchema } from '../schemas/productSchema';
import { StatusCodes } from 'http-status-codes';

export const productRouter: Router = express.Router();

productRouter.post('/', validateRequest(productSchema));

productRouter.all('*', (req: Request, res: Response, next: NextFunction) => {
  if (['POST'].includes(req.method)) {
    return next();
  }

  res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .send({ error: 'Method Not Allowed' });
});
