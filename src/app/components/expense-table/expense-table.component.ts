import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Expense } from 'src/app/interfaces/expense';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss']
})
export class ExpenseTableComponent implements OnInit, OnChanges {

@Input() products: Product[] | undefined = undefined;
@Input() expenses: Expense[] | undefined = undefined;

public totalPrice: number = 0;

ngOnInit() {
  if(this.products) {
    this.totalPrice = this.calculateTotalPrice(this.products);
  } else if(this.expenses) {
    this.totalPrice = this.calculateTotalPrice(this.expenses);
  }
}

ngOnChanges() {
  if(this.products) {
    this.totalPrice = this.calculateTotalPrice(this.products);
  } else if(this.expenses) {
    this.totalPrice = this.calculateTotalPrice(this.expenses);
  }
}

private calculateTotalPrice(list: any[]): number {
  return list.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0)
}

}
