import { Client } from "./client";
import { Shop } from "./shop";

export interface Item {
  _id: string;
  shop: Shop;
  client: Client;
  targetDeliveryDate: Date;
  billRef: string;
  comment?: string;
  commercialOpportunity?: string;
  createdAt: Date;
  updatedAt: Date;
}
