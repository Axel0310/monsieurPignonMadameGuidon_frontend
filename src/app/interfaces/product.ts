import { Provider } from './provider'
import { Expense } from './expense';

export interface Product extends Expense {
  reference: string;
  provider: Provider;
}
