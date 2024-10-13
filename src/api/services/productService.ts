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

  /**
   * Initializes the ProductService with the provided ProductRepository.
   *
   * @param {ProductRepository} productRepository - The repository instance to interact with the product data.
   */
  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Adds a new product to the repository.
   *
   * - Generates a UUID for the product ID.
   * - Returns a ServiceResponse with the added product.
   *
   * @param {AddProductRequest} product - The product data to be added.
   * @returns {ServiceResponse<Product | null>} The response containing the added product or an error message.
   */
  addProduct = (
    product: AddProductRequest,
  ): ServiceResponse<Product | null> => {
    try {
      const repositoryResponse = this.productRepository.addProduct({
        ...product,
        id: randomUUID(), // Generate a unique identifier for the product
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

  /**
   * Retrieves all products from the repository with pagination.
   *
   * - Paginates the results based on the provided `page` and `limit` values.
   * - Returns a paginated result set wrapped in a ServiceResponse.
   *
   * @param {number | undefined} page - The page number for pagination.
   * @param {number | undefined} limit - The number of items per page for pagination.
   * @returns {ServiceResponse<PaginatedResult<Product> | null>} A paginated list of products or an error message.
   */
  getProducts = (
    page: number | undefined,
    limit: number | undefined,
  ): ServiceResponse<PaginatedResult<Product> | null> => {
    try {
      const repositoryResponse = this.productRepository.getProducts();

      // Paginate the list of products
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

  /**
   * Retrieves a product by its ID.
   *
   * - Returns a ServiceResponse with the product if found, or a null response if not found.
   *
   * @param {string} id - The unique identifier of the product.
   * @returns {ServiceResponse<Product | null>} The product if found, or an error message if not.
   */
  getProductById = (id: string): ServiceResponse<Product | null> => {
    try {
      const repositoryResponse = this.productRepository.getProductById(id);

      return ServiceResponse.success<Product | null>(
        `${repositoryResponse ? 'Product' : 'No product'} found.`,
        repositoryResponse ?? null, // Return the product or null if not found
        repositoryResponse ? StatusCodes.OK : StatusCodes.BAD_REQUEST, // Return 200 if found, 400 if not (because of the wrong given ID)
      );
    } catch (err) {
      return exceptionHandler(
        err,
        'An error occurred while getting the product by id.',
      );
    }
  };

  /**
   * Searches for products based on a search term using fuzzy search.
   *
   * - Uses the Damerau-Levenshtein distance algorithm to perform fuzzy matching on product names.
   * - Results are paginated based on `page` and `limit` values.
   *
   * @param {string} term - The search term to filter products.
   * @param {number | undefined} page - The page number for pagination.
   * @param {number | undefined} limit - The number of items per page for pagination.
   * @returns {ServiceResponse<PaginatedResult<Product> | null>} A paginated list of search results or an error message.
   */
  searchProducts = (
    term: string,
    page: number | undefined,
    limit: number | undefined,
  ): ServiceResponse<PaginatedResult<Product> | null> => {
    try {
      const repositoryResponse = this.productRepository.getProducts();

      // Get the fuzzy search distance from environment variables
      const maxAllowedFuzzySearchDistance =
        env.FUZZY_SEARCH_MAX_ALLOWED_DISTANCE;

      // Perform fuzzy search using product names
      const searchResults = fuzzySearch<Product>(
        term,
        repositoryResponse,
        maxAllowedFuzzySearchDistance,
        (product) => product.name, // Search based on product name
      );

      // Paginate the search results
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
