export interface AddProductRequest {
  name: string;
  category: string;
  description?: string;
  price: number;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  imageUrl: string;
}
