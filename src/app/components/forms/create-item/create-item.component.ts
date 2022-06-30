import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepairService } from 'src/app/services/repair.service';
import { Expense } from 'src/app/interfaces/expense';
import { OrderService } from 'src/app/services/order.service';
import { PaintService } from 'src/app/services/paint.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Provider } from 'src/app/interfaces/provider';
import { ProviderService } from 'src/app/services/provider.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnChanges {

  @Input() itemType!: string
  @Output() isFormValid = new EventEmitter<boolean>();

  minDate: Date = new Date();
  defaultDate: Date = this.minDate;

  private existingExpenses$: Observable<Expense[]>;
  private expenseNameInput$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public filteredExpenses$: Observable<Expense[]>;
  private _filteredExpenses$: BehaviorSubject<Expense[]> = new BehaviorSubject<Expense[]>([]);

  public hasOneExpense = true;

  genericExpenseObj = {
    name: ['', [Validators.required]],
    quantity: [1, [Validators.required]],
    price: [0, [Validators.required]],
    provider: [''],
  }

  genericExpensesFormArray = this.fb.array([
    this.fb.group({
      ...this.genericExpenseObj,
    }),
  ])

  newItemForm: FormGroup = this.fb.group({
    expenses: this.genericExpensesFormArray,
    bikeDescription: ['', [Validators.required]],
    status: ['', [Validators.required]],
    deliveryDate: [this.defaultDate, [Validators.required]],
    billRef: [''],
    comment: [''],
    commercialOpportunity: ['']
  });

  public expensesFormArray: FormArray = this.newItemForm.get('expenses') as FormArray;

  totalPrice: number = 0;

  public providersList: Observable<Provider[]> | undefined;

  constructor(private fb: FormBuilder, private repairService: RepairService, private orderService: OrderService, private paintService: PaintService, private providerService: ProviderService, private expenseService: ExpenseService) {
    this.defaultDate.setMinutes(0);
    this.defaultDate.setHours(this.defaultDate.getHours() + 1);
    this.existingExpenses$ = this.expenseService.getExpenses();

    this.filteredExpenses$ = combineLatest([this.existingExpenses$, this.expenseNameInput$]).pipe(
      map(([existingExpenses, filterValue]) => this._filter(existingExpenses, filterValue)),
      tap(products => this._filteredExpenses$.next(products))
    )
  }
  
  ngOnChanges() {
    if(this.itemType === 'repair') {
      this.newItemForm.addControl('localization', this.fb.control('En boutique', [Validators.required]));
    } else if(this.itemType === 'paint') {
      this.newItemForm.addControl('color', this.fb.control('', [Validators.required]));
    }
    
    this.providersList = this.providerService.getProviders();
    const defaultStatus = this.itemType === 'order' ? 'A commander' : this.itemType === 'repair' ? 'A faire' : 'En attente';
    this.newItemForm.get('status')?.setValue(defaultStatus)
  }

  private _filter(expenses: Expense[], value: string): Expense[] {
    const filterValue = value.toLowerCase();
    return  expenses.filter(expense => expense.name.toLowerCase().includes(filterValue))
  }

  addExpense() {
    const newExpenseFormControl = this.fb.group({
      ...this.genericExpenseObj,
    })
    this.expensesFormArray.push(newExpenseFormControl);
    this.updateHasOneExpense();
  }

  removeExpense(index: number) {
    this.expensesFormArray.removeAt(index);
    this.updateTotalPrice();
    this.updateHasOneExpense();
  }

  onItemFormChange() {
    if(this.itemType === 'repair') {
      this.repairService.setRepairBeingCreated(this.newItemForm.value);
    } else if(this.itemType === 'order') {
      this.orderService.setOrderBeingCreated(this.newItemForm.value);
    } else {
      this.paintService.setPaintBeingCreated(this.newItemForm.value);
    }
    console.log('isFormValid => ', this.newItemForm)
    this.isFormValid.emit(this.newItemForm.valid);
  }

  updateTotalPrice() {
    this.totalPrice = this.expensesFormArray.value.reduce((total: number, expense: Expense) => total + expense.price * expense.quantity, 0);
  }

  onExpenseNameChange(nameInput: string) {
    this.expenseNameInput$.next(nameInput);
  }

  fillExpenseInfo(productId: string, index: number) {
    const selectedExpense = this._filteredExpenses$.value.find(prod => String(prod._id) === String(productId))
    const formControl = (this.expensesFormArray.controls[index] as FormGroup).controls
    formControl.name.setValue(selectedExpense?.name)
    formControl.price.setValue(selectedExpense?.price)
    formControl.provider.setValue(selectedExpense?.provider?._id)
    this.updateTotalPrice();
    this.onItemFormChange();
  }

  updateHasOneExpense() {
    this.hasOneExpense = this.expensesFormArray.length < 2;
  }

}
