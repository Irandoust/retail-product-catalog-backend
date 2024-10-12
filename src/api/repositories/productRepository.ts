import { Product } from '../models/productModel';

export class ProductRepository {
  private products: Product[] = [];

  addProduct = (product: Product): Product => {
    this.products.push(product);

    return product;
  };
}
export { Product };
