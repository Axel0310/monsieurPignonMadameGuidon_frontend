import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { PaintService } from 'src/app/services/paint.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-paint',
  templateUrl: './create-paint.component.html',
  styleUrls: ['./create-paint.component.scss']
})
export class CreatePaintComponent {

  @Output() isFormValid = new EventEmitter<boolean>();

  newPaintForm = this.fb.group({
    expenses: this.fb.array([
      this.fb.group({
        name: ['', [Validators.required]],
        quantity: [1, [Validators.required]],
        price: [0, [Validators.required]],
      }),
    ]),
    bikeDescription: ['', [Validators.required]],
    color: ['', [Validators.required]],
    status: ['En attente', [Validators.required]],
    targetDeliveryDate: [new Date(), [Validators.required]],
    billRef: ['', [Validators.required]],
    comment: [''],
    commercialOpportunity: [''],
  });

  expenses = this.newPaintForm.get('expenses') as FormArray;

  minDate: Date;

  faTrashAlt = faTrashAlt;

  constructor(private fb: FormBuilder, private paintService: PaintService) { 
    this.minDate = new Date();
  }

  addExpense() {
    const expense = this.fb.group({
      name: ['', [Validators.required]],
      quantity: [1, [Validators.required]],
      price: [0, [Validators.required]],
    })
    this.expenses.push(expense);
    this.onPaintFormChange();
  }

  removeExpense(index: number) {
    this.expenses.removeAt(index);
    this.onPaintFormChange();
  }

  onPaintFormChange() {
    this.paintService.setPaintBeingCreated(this.newPaintForm.value);
    this.isFormValid.emit(this.newPaintForm.valid);
  }

}
