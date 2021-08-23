import { Shop } from './shop';
import { Client } from './client';
import { Product } from './product';
import { Expense } from './expense';

export interface Paint {
  shop: Shop;
  client: Client;
  bikeDescription: string;
  color: string;
  targetCompletionDate: Date;
  status: 'En attente' | 'En peinture' | 'Client notifié' | 'Livré';
  expenses: Expense[];
  billRef?: string;
  comment?: string;
  commercialOpportunity?: string;
}
