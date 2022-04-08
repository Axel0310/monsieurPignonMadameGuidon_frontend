import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepairService } from 'src/app/services/repair.service';
import { Expense } from 'src/app/interfaces/expense';
import { OrderService } from 'src/app/services/order.service';
import { PaintService } from 'src/app/services/paint.service';
import { Observable } from 'rxjs';
import { Provider } from 'src/app/interfaces/provider';
import { ProviderService } from 'src/app/services/provider.service';

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

  genericExpenseObj = {
    name: ['', [Validators.required]],
    quantity: [1, [Validators.required]],
    price: [0, [Validators.required]],
  }

  genericProductObj = {
    ...this.genericExpenseObj,
    provider: ['', [Validators.required]],
  }

  expensesFormArray = this.fb.array([
      this.fb.group({
        ...this.genericExpenseObj,
      }),
    ])
  

  productsFormArray = this.fb.array([
      this.fb.group({
        ...this.genericProductObj,
      }),
    ])
  

  newItemForm: FormGroup = this.fb.group({
    expenses: this.expensesFormArray,
    products: this.productsFormArray,
    bikeDescription: ['', [Validators.required]],
    status: ['', [Validators.required]],
    deliveryDate: [this.defaultDate, [Validators.required]],
    billRef: ['', [Validators.required]],
    comment: [''],
    commercialOpportunity: ['']
  });

  expensesOrProducts: FormArray = this.newItemForm.get('expenses') as FormArray;
  expensesType: 'expenses' | 'products' = 'expenses';

  templateContext = {
    expenses: this.expensesFormArray,
  }

  totalPrice: number = 0;

  public providersList: Observable<Provider[]> | undefined;

  constructor(private fb: FormBuilder, private repairService: RepairService, private orderService: OrderService, private paintService: PaintService, private providerService: ProviderService) {
    this.defaultDate.setMinutes(0);
    this.defaultDate.setHours(this.defaultDate.getHours() + 1);
  }
  
  ngOnChanges() {
    if(this.itemType === 'order') {
      this.newItemForm.removeControl('expenses');
    } else {
      this.newItemForm.removeControl('products');
      if(this.itemType === 'repair') {
        this.newItemForm.addControl('localization', this.fb.control('En boutique', [Validators.required]));
      } else {
        this.newItemForm.addControl('color', this.fb.control('', [Validators.required]));
      }
    }

    this.providersList = this.itemType === 'order' ? this.providerService.getProviders() : undefined;
    this.expensesOrProducts = this.itemType === 'order' ? this.newItemForm.get('products') as FormArray : this.newItemForm.get('expenses') as FormArray;
    this.expensesType = this.itemType === 'order' ? 'products' : 'expenses';
    this.templateContext.expenses = this.expensesFormArray;
    const defaultStatus = this.itemType === 'order' ? 'A commander' : this.itemType === 'repair' ? 'A faire' : 'En attente';
    this.newItemForm.get('status')?.setValue(defaultStatus)
  }

  addExpense() {
    const newExpenseFormControl = this.fb.group({
      ...(this.itemType === 'order' && this.genericProductObj),
      ...(this.itemType !== 'order' && this.genericExpenseObj),
    })
    this.expensesOrProducts.push(newExpenseFormControl);
  }

  removeExpense(index: number) {
    this.expensesOrProducts.removeAt(index);
    this.updateTotalPrice();
  }

  onItemFormChange() {
    if(this.itemType === 'repair') {
      this.repairService.setRepairBeingCreated(this.newItemForm.value);
    } else if(this.itemType === 'order') {
      this.orderService.setOrderBeingCreated(this.newItemForm.value);
    } else {
      this.paintService.setPaintBeingCreated(this.newItemForm.value);
    }
    this.isFormValid.emit(this.newItemForm.valid);
  }

  updateTotalPrice() {
    this.totalPrice = this.expensesOrProducts.value.reduce((total: number, expense: Expense) => total + expense.price * expense.quantity, 0);
  }

}

// export class CreateRepairComponent {

//   @Output() isFormValid = new EventEmitter<boolean>();

//   minDate: Date = new Date();
//   defaultDate: Date = this.minDate;

  

//   newItemForm = this.fb.group({
//     expenses: this.fb.array([
//       this.fb.group({
//         name: ['', [Validators.required]],
//         quantity: [1, [Validators.required]],
//         price: [0, [Validators.required]],
//       }),
//     ]),
//     bikeDescription: ['', [Validators.required]],
//     localization: ['En boutique', [Validators.required]],
//     status: ['A faire', [Validators.required]],
//     deliveryDate: [this.defaultDate, [Validators.required]],
//     billRef: ['', [Validators.required]],
//     comment: [''],
//     commercialOpportunity: [''],
//   });

//   expenses = this.newItemForm.get('expenses') as FormArray;

  

//   faTrashAlt = faTrashAlt;

//   totalPrice: number = 0;

//   constructor(private fb: FormBuilder, private repairService: RepairService) {
//     this.defaultDate.setMinutes(0);
//     this.defaultDate.setHours(this.defaultDate.getHours() + 1);
//   }

//   addExpense() {
//     const expense = this.fb.group({
//       name: ['', [Validators.required]],
//       quantity: [1, [Validators.required]],
//       price: [0, [Validators.required]],
//     })
//     this.expenses.push(expense);
//   }

//   removeExpense(index: number) {
//     this.expenses.removeAt(index);
//     this.updateTotalPrice();
//   }

//   onRepairFormChange() {
//     this.repairService.setRepairBeingCreated(this.newItemForm.value);
//     this.isFormValid.emit(this.newItemForm.valid);
//   }

//   updateTotalPrice() {
//     this.totalPrice = this.expenses.value.reduce((total: number, expense: Expense) => total + expense.price * expense.quantity, 0);
//   }

// }
