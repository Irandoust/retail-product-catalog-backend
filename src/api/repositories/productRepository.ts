import { Product } from '../models/productModel';

export class ProductRepository {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }
}
