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
  filteredStatus$: Observable<string[]>;
  selectedState$: Observable<string>;
  canLoadMoreHistory$: Observable<boolean>;

  constructor(private orderService: OrderService) { 
    this.orders$ = this.orderService.getOrders();
    this.filteredStatus$ = this.orderService.getFilteredStatus();
    this.selectedState$ = this.orderService.getSelectedState();
    this.canLoadMoreHistory$ = this.orderService.getCanLoadMoreHistory();
  }

  updateStatusFilter(status: string) {
    this.orderService.updateStatusFilter(status);
  }

  updateStateFilter(status: 'ongoing' | 'closed') {
    this.orderService.setFilteredState(status);
  }

  updateOrder(updatedOrder: any) {
    this.orderService.updateOrder(updatedOrder.id, updatedOrder.updates);
  }

  searchOrders(searchInput: string) {
    this.orderService.searchOrders(searchInput);
  }

  loadMoreHistory() {
    this.orderService.fetchOrdersHistory();
  }

}
