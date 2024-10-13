/**
 * Represents the data required to add a new product.
 *
 * @property {string} name - The name of the product.
 * @property {string} category - The category to which the product belongs.
 * @property {string} [description] - The description of the product.
 * @property {number} price - The price of the product.
 * @property {string} imageUrl - The URL of the product's image.
 */
export interface AddProductRequest {
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
}

/**
 * Represents a product in the catalog.
 *
 * @property {string} id - The unique identifier for the product.
 * @property {string} name - The name of the product.
 * @property {string} category - The category to which the product belongs.
 * @property {string} [description] - The description of the product.
 * @property {number} price - The price of the product.
 * @property {string} imageUrl - The URL of the product's image.
 */
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  imageUrl: string;
}
