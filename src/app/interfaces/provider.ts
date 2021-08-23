import { Product } from './product';

export interface Provider {
  name: string;
  productsList: Product[];
}
