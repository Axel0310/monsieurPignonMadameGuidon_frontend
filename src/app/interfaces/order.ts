import { Shop } from './shop';
import { Client } from './client';
import { Product } from './product';

export interface Order {
  shop: Shop;
  client: Client;
  targetDeliveryDate: Date;
  status: 'A commander' | 'Panier' | 'Commandé' | 'Client notifié' | 'Livré';
  products: [
    {
      product: Product;
      quantity: number;
    }
  ];
  billRef?: string;
  comment?: string;
  commercialOpportunity?: string;
}
