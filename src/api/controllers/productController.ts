import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { serviceResponseHandler } from '../../utils/serviceResponseHandler';

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  addProduct = (req: Request, res: Response) => {
    const serviceResponse = this.productService.addProduct(req.body);
    return serviceResponseHandler(serviceResponse, res);
  };
}
