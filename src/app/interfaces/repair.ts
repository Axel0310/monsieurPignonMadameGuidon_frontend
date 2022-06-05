import { Expense } from './expense';
import { Item } from './item';

export interface Repair extends Item {
  bikeDescription: string;
  localization: 'En boutique' | 'Attente pièce' | 'Entrepôt';
  status: 'A faire' | 'Fait' | 'Client notifié' | 'Livré';
  expenses: Expense[];
}
