import { Provider } from '@angular/core';

export interface Product {
  name: string;
  price: number;
  reference: string;
  provider: Provider;
}
