import { Product } from './product';
import { Item } from './item';

export interface Order extends Item {
  status: 'A commander' | 'Panier' | 'Commandé' | 'Client notifié' | 'Livré';
  products: Product[];
}
