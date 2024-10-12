import { Product, ProductRepository } from '../repositories/productRepository';
import { ServiceResponse } from '../models/serviceResponse';
import { exceptionHandler } from '../../utils/exceptionHandler';
import { randomUUID } from 'crypto';
import { StatusCodes } from 'http-status-codes';

export class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  addProduct = (product: Product): ServiceResponse<Product | null> => {
    try {
      product.id = randomUUID();

      const productResponse = this.productRepository.addProduct(product);

      return ServiceResponse.success<Product>(
        'The product has been added successfully!',
        productResponse,
        StatusCodes.CREATED,
      );
    } catch (err) {
      return exceptionHandler(
        err,
        'An error occurred while adding the product.',
      );
    }
  };
}
