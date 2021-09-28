import { Expense } from './expense';
import { Item } from './item';

export interface Paint extends Item {
  bikeDescription: string;
  color: string;
  status: 'En attente' | 'En peinture' | 'Client notifié' | 'Livré';
  expenses: Expense[];
}
