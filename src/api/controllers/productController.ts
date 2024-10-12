import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { serviceResponseHandler } from '../../utils/serviceResponseHandler';
import { paginationSchema } from '../schemas/paginationSchema';
import { productSchema } from '../schemas/productSchema';

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  addProduct = (req: Request, res: Response) => {
    const { body } = productSchema.parse({ body: req.body });
    const serviceResponse = this.productService.addProduct(body);
    return serviceResponseHandler(serviceResponse, res);
  };

  getProducts = (req: Request, res: Response) => {
    const { query } = paginationSchema.parse({ query: req.query });
    const { page, limit } = query;
    const serviceResponse = this.productService.getProducts(page, limit);
    return serviceResponseHandler(serviceResponse, res);
  };
}
