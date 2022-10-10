import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Expense } from 'src/app/interfaces/expense';

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.scss'],
})
export class ExpenseTableComponent implements OnChanges {
  @Input() itemExpenses: Expense[] = [];
  @Output() sendUpdatedExpensesEvent: EventEmitter<{expenses?: Expense[]} > = new EventEmitter<{expenses?: Expense[]}>();

  public totalPrice: number = 0;
  public isEditEnabled = false;
  public hasOneExpense = true;

  expensesForm = this.fb.array([]);

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if(this.isEditEnabled) {
      this.disableEditing();
    }
    this.updateTotalPrice(this.itemExpenses);
  }

  private updateTotalPrice(list: Expense[]): void {
    this.totalPrice = list.reduce((total: number, item: Expense) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  enableEditing() {
    this.isEditEnabled = true;
    this.itemExpenses.forEach((item: Expense) => {
      this.expensesForm.push(this.fb.group({
        name: [item.name, [Validators.required]],
        quantity: [item.quantity, [Validators.required]],
        price: [item.price, [Validators.required]],
      }))
    })
    this.updateHasOneExpense();
  }

  disableEditing() {
    this.isEditEnabled = false;
    this.expensesForm.clear();
    this.updateTotalPrice(this.itemExpenses);
  }

  addExpense() {
    const newExpense = this.fb.group({
      name: ['', [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
    })
    this.expensesForm.push(newExpense);
    this.updateHasOneExpense();
  }

  removeExpense(index: number) {
    this.expensesForm.removeAt(index);
    this.updateTotalPrice(this.expensesForm.value);
    this.updateHasOneExpense();
  }

  updateHasOneExpense() {
    this.hasOneExpense = this.expensesForm.length < 2;
  }

  onUpdateValidation() {
    if(this.expensesForm.valid) {
      this.expensesForm.controls.forEach(expenseControl => {
        expenseControl.setValue(
          {
            ...expenseControl.value,
            name: expenseControl.value.name.trim(),
          }
        )
      })
      this.sendUpdatedExpensesEvent.emit({
        expenses: this.expensesForm.value,
      })
      this.disableEditing();
    }
  }
}
