import { Provider } from '@angular/core';

export interface Product {
  name: string;
  price: number;
  quantity: number;
  reference: string;
  provider: Provider;
}
