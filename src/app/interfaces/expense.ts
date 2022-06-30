import { Provider } from './provider'

export interface Expense {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  reference?: string;
  provider?: Provider;
}
