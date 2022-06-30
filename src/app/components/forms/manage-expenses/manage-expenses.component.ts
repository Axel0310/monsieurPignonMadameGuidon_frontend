import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from 'src/app/interfaces/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProviderService } from 'src/app/services/provider.service';
import { Provider } from 'src/app/interfaces/provider';

@Component({
  selector: 'app-manage-expenses',
  templateUrl: './manage-expenses.component.html',
  styleUrls: ['./manage-expenses.component.scss'],
})
export class ManageExpensesComponent {

  public expenses$: Observable<Expense[]>;
  public providers$: Observable<Provider[]>;

  newExpenseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.min(0)),
    reference: new FormControl(''),
    provider: new FormControl(''),
  });

  updatedExpenseForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    reference: new FormControl(''),
    provider: new FormControl(''),
  });

  public expenseBeingUpdated: Expense | undefined = undefined;


  constructor(private expensesService: ExpenseService, private providerService: ProviderService) {
    this.expenses$ = this.expensesService.getExpenses();
    this.providers$ = this.providerService.getProviders();
    this.expenses$.subscribe(p => {
      console.log(p)
    })
  }

  createExpense() {
    const ref = this.newExpenseForm.value.reference;
    const provider = this.newExpenseForm.value.provider;
    const newExpense = {
      name: this.newExpenseForm.value.name,
      price: this.newExpenseForm.value.price,
      ...(ref && {reference: ref}),
      ...(provider && {provider: provider}),
    }
    this.expensesService.createExpense(newExpense).subscribe(createdExpense => {
      if(createdExpense) this.newExpenseForm.reset({
        name: '',
        price: 0,
        reference: '',
        provider: ''
      });
    });
  }

  deleteExpense(id: string) {
    this.expensesService.deleteExpense(id).subscribe();
  }

  updateExpense() {
    if(this.expenseBeingUpdated) {
      this.expensesService.updateExpense(this.expenseBeingUpdated._id, this.updatedExpenseForm.value).subscribe(updatedClient => {
        this.toggleEditing();
      })
    }
  }

  toggleEditing(expense?: Expense) {
    if(expense) {
      this.expenseBeingUpdated = expense;
      this.updatedExpenseForm.setValue({
        name: expense.name,
        price: expense.price,
        reference: expense.reference ? expense.reference : '',
        provider: expense.provider ? expense.provider._id : null,
      })
    } else {
      this.expenseBeingUpdated = undefined;
      this.updatedExpenseForm.reset();
    }
  }

}
