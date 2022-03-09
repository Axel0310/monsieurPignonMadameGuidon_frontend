export interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  history: {
    repairs: string[];
    paints: string[];
    orders: string[];
  }
}
