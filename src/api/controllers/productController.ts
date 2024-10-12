import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { serviceResponseHandler } from '../../utils';
import { paginationSchema } from '../schemas';
import {
  addProductSchema,
  getProductByIdSchema,
  searchWithPaginationSchema,
} from '../schemas/productSchema';

export class ProductController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  addProduct = (req: Request, res: Response) => {
    const { body } = addProductSchema.parse({ body: req.body });
    const serviceResponse = this.productService.addProduct(body);
    return serviceResponseHandler(serviceResponse, res);
  };

  getProducts = (req: Request, res: Response) => {
    const { query } = paginationSchema.parse({ query: req.query });
    const { page, limit } = query;
    const serviceResponse = this.productService.getProducts(page, limit);
    return serviceResponseHandler(serviceResponse, res);
  };

  getProductById = (req: Request, res: Response) => {
    const { params } = getProductByIdSchema.parse({ params: req.params });
    const { id } = params;
    const serviceResponse = this.productService.getProductById(id);
    return serviceResponseHandler(serviceResponse, res);
  };

  searchProducts = (req: Request, res: Response) => {
    const { query } = searchWithPaginationSchema.parse({ query: req.query });
    const { term, page, limit } = query;
    const serviceResponse = this.productService.searchProducts(
      term,
      page,
      limit,
    );
    return serviceResponseHandler(serviceResponse, res);
  };
}
