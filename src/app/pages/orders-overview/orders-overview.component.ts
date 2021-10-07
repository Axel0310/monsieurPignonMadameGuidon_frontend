import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-overview',
  templateUrl: './orders-overview.component.html',
  styleUrls: ['./orders-overview.component.scss']
})
export class OrdersOverviewComponent {

  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) { 
    this.orders$ = this.orderService.getOrders();
  }

  filterByStatus(status: string) {
    this.orderService.fetchOrders(status);
  }

  updateOrder(updatedOrder: any) {
    this.orderService.updateOrder(updatedOrder.id, updatedOrder.updates);
  }

}
