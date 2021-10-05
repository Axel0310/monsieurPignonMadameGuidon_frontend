import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent {

  @Output() isFormValid = new EventEmitter<boolean>();

  newOrderForm = this.fb.group({
    products: this.fb.array([
      this.fb.group({
        name: ['', [Validators.required]],
        quantity: [1, [Validators.required]],
        price: [0, [Validators.required]],
        provider: ['60b355dbaa984223d8da3d23', [Validators.required]],
      }),
    ]),
    status: ['A commander', [Validators.required]],
    targetDeliveryDate: [new Date(), [Validators.required]],
    billRef: ['', [Validators.required]],
    comment: [''],
    commercialOpportunity: [''],
  });

  products = this.newOrderForm.get('products') as FormArray;

  minDate: Date;

  constructor(private fb: FormBuilder, private orderService: OrderService) { 
    this.minDate = new Date();
  }

  addProduct() {
    const product = this.fb.group({
      name: ['', [Validators.required]],
      quantity: [1, [Validators.required]],
      price: [0, [Validators.required]],
      provider: ['60b355dbaa984223d8da3d23', [Validators.required]],
    })
    this.products.push(product);
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  onOrderFormChange() {
    this.orderService.setOrderBeingCreated(this.newOrderForm.value);
    this.isFormValid.emit(this.newOrderForm.valid);
  }
}
