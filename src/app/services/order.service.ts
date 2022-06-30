import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';
import { AuthenticationService } from './authentication.service';
import { ClientService } from './client.service';
import { GenericItemService } from './genericItem.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends GenericItemService {
  
  constructor(
    http: HttpClient,
    authService: AuthenticationService,
    clientService: ClientService,
    notifService: NotificationService,
  ) {
    const orderUrl: string = 'orders';
    super(
      http,
      authService,
      clientService,
      notifService,
      orderUrl,
      )
  }

  getOrders(): Observable<Order[]> {
    return super.getItems() as Observable<Order[]>;
  }

  createOrder(): Observable<Order> {
    return super.createItem() as Observable<Order>;
  }

  updateOrder(id: string, updates: object): void {
    super.updateItem(id, updates)
  }

  searchOrders(query: string): void {
    super.searchItems(query);
  }

  fetchOrdersHistory(): void {
    super.fetchItemsHistory();
  }

  setOrderBeingCreated(order: Order) {
    super.setItemBeingCreated(order);
  }

  getOrderBeingCreated(): Order | undefined {
    return super.getItemBeingCreated() as Order;
  }
}
