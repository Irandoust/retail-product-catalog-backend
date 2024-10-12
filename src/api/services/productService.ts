import { randomUUID } from 'crypto';
import { StatusCodes } from 'http-status-codes';
import { ProductRepository } from '../repositories/productRepository';
import { ServiceResponse, Product, AddProductRequest } from '../models';
import { env } from '../../config';
import {
  exceptionHandler,
  paginate,
  PaginatedResult,
  fuzzySearch,
} from '../../utils';

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

  getProductById = (id: string): ServiceResponse<Product | null> => {
    try {
      const repositoryResponse = this.productRepository.getProductById(id);

      return ServiceResponse.success<Product | null>(
        `${repositoryResponse ? 'Product' : 'No product'} found.`,
        repositoryResponse ?? null,
        repositoryResponse ? StatusCodes.OK : StatusCodes.BAD_REQUEST,
      );
    } catch (err) {
      return exceptionHandler(
        err,
        'An error occurred while getting the product by id.',
      );
    }
  };

  searchProducts = (
    term: string,
    page: number | undefined,
    limit: number | undefined,
  ): ServiceResponse<PaginatedResult<Product> | null> => {
    try {
      const repositoryResponse = this.productRepository.getProducts();

      const maxAllowedFuzzySearchDistance =
        env.FUZZY_SEARCH_MAX_ALLOWED_DISTANCE;

      const searchResults = fuzzySearch<Product>(
        term,
        repositoryResponse,
        maxAllowedFuzzySearchDistance,
        (product) => product.name,
      );

      const paginatedResult = paginate(searchResults, page, limit);

      return ServiceResponse.success<PaginatedResult<Product>>(
        `${repositoryResponse.length} Products found.`,
        paginatedResult,
        StatusCodes.OK,
      );
    } catch (err) {
      return exceptionHandler(
        err,
        'An error occurred while searching for the products.',
      );
    }
  };
}
