import { Provider } from '@angular/core';
import { Expense } from './expense';

export interface Product extends Expense {
  reference: string;
  provider: Provider;
}
