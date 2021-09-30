import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  newOrderForm = this.fb.group({
    products: this.fb.array([
      this.fb.group({
        name: ['', [Validators.required]],
        quantity: [1, [Validators.required]],
        price: [0, [Validators.required]],
        provider: [null, [Validators.required]],
      }),
    ]),
    status: ['A commander', [Validators.required]],
    targetDeliveryDate: [Date.now(), [Validators.required]],
    billRef: ['', [Validators.required]],
    comment: [''],
    commercialOpportunity: [''],
  });

  products = this.newOrderForm.get('products') as FormArray;

  minDate: Date;

  constructor(private fb: FormBuilder) { 
    this.minDate = new Date();
  }

  ngOnInit(): void {
  }

  onCreateOrder() {
    console.log(this.newOrderForm.value)
  }

  addProduct() {
    const product = this.fb.group({
      name: ['', [Validators.required]],
      quantity: [1, [Validators.required]],
      price: [0, [Validators.required]],
      provider: [null, [Validators.required]],
    })
    this.products.push(product);
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

}
