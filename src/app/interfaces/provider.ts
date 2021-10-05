import { Product } from './product';

export interface Provider {
  _id: string;
  name: string;
  productsList: Product[];
}
