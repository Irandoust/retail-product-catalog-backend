import { Product } from '../models/productModel';
import { products } from './productsData';

export class ProductRepository {
  private products: Product[] = Array.from(products);

  addProduct = (product: Product): Product => {
    this.products.push(product);

    return product;
  };

  getProducts = (): Product[] => {
    return this.products;
  };
}
export { Product };
