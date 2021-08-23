import { Client } from './client';
import { Expense } from './expense';
import { Shop } from './shop';

export interface Repair {
  shop: Shop;
  client: Client;
  bikeDescription: string;
  color: string;
  targetCompletionDate: Date;
  localization: 'En boutique' | 'Attente pièce' | 'Domicile gérant';
  status: 'A faire' | 'Fait' | 'Client notifié' | 'Livré';
  expenses: Expense[];
  billRef?: string;
  comment?: string;
  commercialOpportunity?: string;
}
