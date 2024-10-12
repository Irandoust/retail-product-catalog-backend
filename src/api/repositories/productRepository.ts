import { Product } from '../models';
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

  getProductById = (id: string): Product | undefined => {
    const product = this.products.find((product) => product.id === id);

    return product;
  };
}
