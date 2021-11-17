import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { RepairService } from 'src/app/services/repair.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Expense } from 'src/app/interfaces/expense';

@Component({
  selector: 'app-create-repair',
  templateUrl: './create-repair.component.html',
  styleUrls: ['./create-repair.component.scss']
})
export class CreateRepairComponent {

  @Output() isFormValid = new EventEmitter<boolean>();

  newRepairForm = this.fb.group({
    expenses: this.fb.array([
      this.fb.group({
        name: ['', [Validators.required]],
        quantity: [1, [Validators.required]],
        price: [0, [Validators.required]],
      }),
    ]),
    bikeDescription: ['', [Validators.required]],
    localization: ['En boutique', [Validators.required]],
    status: ['A faire', [Validators.required]],
    targetDeliveryDate: [new Date(), [Validators.required]],
    billRef: ['', [Validators.required]],
    comment: [''],
    commercialOpportunity: [''],
  });

  expenses = this.newRepairForm.get('expenses') as FormArray;

  minDate: Date;

  faTrashAlt = faTrashAlt;

  totalPrice: number = 0;

  constructor(private fb: FormBuilder, private repairService: RepairService) { 
    this.minDate = new Date();
  }

  addExpense() {
    const expense = this.fb.group({
      name: ['', [Validators.required]],
      quantity: [1, [Validators.required]],
      price: [0, [Validators.required]],
    })
    this.expenses.push(expense);
  }

  removeExpense(index: number) {
    this.expenses.removeAt(index);
    this.updateTotalPrice();
  }

  onRepairFormChange() {
    this.repairService.setRepairBeingCreated(this.newRepairForm.value);
    this.isFormValid.emit(this.newRepairForm.valid);
  }

  updateTotalPrice() {
    this.totalPrice = this.expenses.value.reduce((total: number, expense: Expense) => total + expense.price * expense.quantity, 0);
  }

}
