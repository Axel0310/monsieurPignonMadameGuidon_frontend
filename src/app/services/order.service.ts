import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_URL = `${environment.API_URL}/orders`;
  private _ongoingOrders: BehaviorSubject<Order[]> = new BehaviorSubject(
    [] as Order[]
  );
  private _closedOrders: BehaviorSubject<Order[]> = new BehaviorSubject(
    [] as Order[]
  );

  constructor(private http: HttpClient) {}

  getOrders(status: 'ongoing' | 'closed'): Observable<Order[]> {
    if (status === 'ongoing' && this._ongoingOrders.getValue().length === 0) {
      this.fetchOrders('ongoing');
    } else if (status === 'closed' && this._closedOrders.getValue().length === 0) {
      this.fetchOrders('closed');
    }
    return status === 'ongoing'
      ? this._ongoingOrders.asObservable()
      : this._closedOrders.asObservable();
  }

  fetchOrders(status: 'ongoing' | 'closed'): void {
    this.http
      .get<Order[]>(`${this.API_URL}/status/${status}`)
      .subscribe((fetchedOrders) => {
        if (status === 'ongoing') {
          this._ongoingOrders.next(fetchedOrders);
        } else {
          this._closedOrders.next(fetchedOrders);
        }
      });
  }
}
