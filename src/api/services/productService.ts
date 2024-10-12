import { Product, ProductRepository } from '../repositories/productRepository';
import { ServiceResponse } from '../models/serviceResponse';
import { exceptionHandler } from '../../utils/exceptionHandler';
import { randomUUID } from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { paginate, PaginatedResult } from '../../utils/paginate';
import { AddProductRequest } from '../models/productModel';

export class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  addProduct = (
    product: AddProductRequest,
  ): ServiceResponse<Product | null> => {
    try {
      const repositoryResponse = this.productRepository.addProduct({
        ...product,
        id: randomUUID(),
      });

      return ServiceResponse.success<Product>(
        'The product has been added successfully!',
        repositoryResponse,
        StatusCodes.CREATED,
      );
    } catch (err) {
      return exceptionHandler(
        err,
        'An error occurred while adding the product.',
      );
    }
  };

  getProducts = (
    page: number | undefined,
    limit: number | undefined,
  ): ServiceResponse<PaginatedResult<Product> | null> => {
    try {
      const repositoryResponse = this.productRepository.getProducts();

      const paginatedResult = paginate(repositoryResponse, page, limit);

      return ServiceResponse.success<PaginatedResult<Product>>(
        `${repositoryResponse.length} Products found.`,
        paginatedResult,
        StatusCodes.OK,
      );
    } catch (err) {
      return exceptionHandler(
        err,
        'An error occurred while adding getting the products.',
      );
    }
  };
}
