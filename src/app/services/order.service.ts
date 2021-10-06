import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/client';
import { Order } from '../interfaces/order';
import { Shop } from '../interfaces/shop';
import { AuthenticationService } from './authentication.service';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_URL = `${environment.API_URL}/orders`;
  private _orderBeingCreated: BehaviorSubject<Order | undefined> =
    new BehaviorSubject<Order | undefined>(undefined);

  private _currentShop: Shop | undefined;
  private _currentClient: Client | undefined;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private clientService: ClientService
  ) {
    this._currentShop = this.authService.getLoggedShop().value;
    this.clientService.currentClient$.subscribe(
      (client) => (this._currentClient = client)
    );
  }

  getOrders(status: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.API_URL}/status/${status}`);
  }

  setOrderBeingCreated(order: Order) {
    this._orderBeingCreated.next(order);
  }

  getOrderBeingCreated(): Order | undefined {
    return this._orderBeingCreated.value;
  }

  createOrder() {
    return this.http.post<Order>(`${this.API_URL}/create`, {
      shop: this._currentShop?._id,
      client: this._currentClient?._id,
      ...this._orderBeingCreated.value,
    })
  }
}
