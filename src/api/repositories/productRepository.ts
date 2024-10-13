import { Product } from '../models';
import { products } from './productsData';

export class ProductRepository {
  // Initialize the repository with pre-existing product data
  private products: Product[] = Array.from(products);

  /**
   * Adds a new product to the repository.
   *
   * @param {Product} product - The product to be added.
   * @returns {Product} The newly added product.
   */
  addProduct = (product: Product): Product => {
    this.products.push(product);

    return product;
  };

  /**
   * Retrieves all products from the repository.
   *
   * @returns {Product[]} An array of all products.
   */
  getProducts = (): Product[] => {
    return this.products;
  };

  /**
   * Retrieves a product by its unique ID.
   *
   * @param {string} id - The ID of the product to retrieve.
   * @returns {Product | undefined} The product if found, otherwise undefined.
   */
  getProductById = (id: string): Product | undefined => {
    const product = this.products.find((product) => product.id === id);

    return product;
  };
}
