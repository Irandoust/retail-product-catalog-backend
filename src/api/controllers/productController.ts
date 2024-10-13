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

  /**
   * Initializes the ProductController with the provided ProductService.
   *
   * @param {ProductService} productService - The service responsible for handling product-related business logic.
   */
  constructor(productService: ProductService) {
    this.productService = productService;
  }

  /**
   * Handles the request to add a new product.
   *
   * - Validates the incoming request body using `addProductSchema`.
   * - Passes the validated data to the ProductService to add the product.
   * - Sends the service response back to the client.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  addProduct = (req: Request, res: Response) => {
    const { body } = addProductSchema.parse({ body: req.body });
    const serviceResponse = this.productService.addProduct(body);
    return serviceResponseHandler(serviceResponse, res);
  };

  /**
   * Handles the request to get a list of products with pagination.
   *
   * - Validates the query parameters using `paginationSchema`.
   * - Passes the validated pagination data to the ProductService.
   * - Sends the paginated result back to the client.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  getProducts = (req: Request, res: Response) => {
    const { query } = paginationSchema.parse({ query: req.query });
    const { page, limit } = query;
    const serviceResponse = this.productService.getProducts(page, limit);
    return serviceResponseHandler(serviceResponse, res);
  };

  /**
   * Handles the request to retrieve a product by its ID.
   *
   * - Validates the route parameters using `getProductByIdSchema`.
   * - Passes the validated ID to the ProductService.
   * - Sends the product data or an error message back to the client.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
  getProductById = (req: Request, res: Response) => {
    const { params } = getProductByIdSchema.parse({ params: req.params });
    const { id } = params;
    const serviceResponse = this.productService.getProductById(id);
    return serviceResponseHandler(serviceResponse, res);
  };

  /**
   * Handles the request to search for products with pagination and fuzzy search.
   *
   * - Validates the query parameters using `searchWithPaginationSchema`.
   * - Passes the validated search term and pagination data to the ProductService.
   * - Sends the paginated search results back to the client.
   *
   * @param {Request} req - The Express request object.
   * @param {Response} res - The Express response object.
   */
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
